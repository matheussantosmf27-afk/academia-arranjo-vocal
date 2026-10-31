import type { VoiceId } from "../music/formations";
import { scaleDegree } from "../music/key";
import { type Score, type StyleProfileId, voiceTimeline } from "../music/score";
import { analyzeHarmony, validateScore } from "../validation/engine";
import type { Diagnostic } from "../validation/types";

/**
 * Tarefa de produção: o aluno escreve música e o motor confere critérios explícitos.
 * A conferência é determinística (mesma partitura ⇒ mesmo resultado), roda no navegador
 * e no servidor, e nunca dá nota de qualidade artística: só verifica o que é verificável.
 */
export type TaskKind = "producao" | "transferencia";

export interface ProductionTask {
  readonly id: string;
  readonly kind: TaskKind;
  /** Aula de origem (tarefas de produção) ou aula de referência (transferência). */
  readonly lessonId?: string;
  readonly competency: string;
  readonly title: string;
  readonly prompt: string;
  readonly start: Score;
  readonly style: StyleProfileId;
  /** Vozes dadas: toda nota do material de partida precisa continuar no lugar. */
  readonly keepVoices: readonly VoiceId[];
  /** Vozes que o aluno escreve. */
  readonly writeVoices: readonly VoiceId[];
  /** Exige cadência final V – I (ou vii° – I). */
  readonly requireCadence?: boolean;
  /** Número de compassos de introdução que o aluno escreve antes da melodia (todas as vozes). */
  readonly introBars?: number;
  /** Compassos em que cada voz escrita precisa ter notas (padrão: onde há material dado). */
  readonly writeMeasures?: Readonly<Partial<Record<VoiceId, readonly number[]>>>;
  readonly constraints: readonly string[];
  readonly hints: readonly string[];
  /** Material de consulta que acompanha o enunciado (por exemplo, o original a adaptar). */
  readonly reference?: { readonly label: string; readonly score: Score };
  /** Link para a demonstração (exemplo resolvido de uma aula). */
  readonly demo?: { readonly label: string; readonly href: string };
  /** Solução de referência: só aparece depois de pelo menos uma conferência. */
  readonly solution?: { readonly score?: Score; readonly commentary: string };
  /** Semente, quando a tarefa foi gerada. */
  readonly seed?: number;
}

export type CheckId = "formacao" | "preserva" | "escreve" | "introducao" | "sem-erros" | "cadencia-final";

export interface CheckResult {
  readonly id: CheckId;
  readonly label: string;
  readonly ok: boolean;
  readonly detail: string;
}

export interface TaskResult {
  readonly passed: boolean;
  readonly checks: readonly CheckResult[];
  /** Erros e alertas do motor no estilo da tarefa (o que impede a aprovação). */
  readonly serious: readonly Diagnostic[];
  /** Todos os diagnósticos (inclusive sugestões e observações), para o feedback. */
  readonly diagnostics: readonly Diagnostic[];
}

const noteKeys = (score: Score, voice: VoiceId) => {
  const part = score.parts.find((p) => p.voice === voice);
  if (!part) return [];
  return voiceTimeline(part, score.timeSignature).flatMap((t) => (t.event.kind === "note" ? [`${t.onset}:${t.event.pitch.step}${t.event.pitch.alter}${t.event.pitch.octave}`] : []));
};

/** Compassos (1-based) em que a voz tem pelo menos uma nota. */
function measuresWithNotes(score: Score, voice: VoiceId): Set<number> {
  const part = score.parts.find((p) => p.voice === voice);
  const out = new Set<number>();
  if (!part) return out;
  for (const t of voiceTimeline(part, score.timeSignature)) if (t.event.kind === "note") out.add(t.measure);
  return out;
}

const AUTHENTIC_PENULT = /^(V|vii)/;
const TONIC = /^[Ii](?![iIvV])/;

export function checkTask(task: ProductionTask, score: Score): TaskResult {
  const checks: CheckResult[] = [];
  const formationOk = score.formation === task.start.formation;
  checks.push({
    id: "formacao",
    label: `Formação ${task.start.formation}`,
    ok: formationOk,
    detail: formationOk ? "A partitura usa a formação pedida." : `A tarefa é para ${task.start.formation}; a partitura está em ${score.formation}.`,
  });

  if (task.keepVoices.length) {
    const changed = task.keepVoices.filter((v) => {
      const now = new Set(noteKeys(score, v));
      return !noteKeys(task.start, v).every((n) => now.has(n));
    });
    checks.push({
      id: "preserva",
      label: "Material dado preservado",
      ok: changed.length === 0,
      detail: changed.length === 0 ? "Todas as notas dadas continuam no lugar." : `Notas dadas foram alteradas em: ${changed.join(", ")}. Desfaça a mudança: a tarefa pede que você escreva em volta delas.`,
    });
  }

  // Compassos que o aluno precisa preencher: onde há material dado (ou o arranjo todo, se nada é dado).
  const given = new Set<number>();
  for (const v of task.keepVoices) for (const m of measuresWithNotes(task.start, v)) given.add(m);
  const target = given.size ? given : new Set(Array.from({ length: score.measureCount }, (_, i) => i + 1));
  if (task.writeVoices.length) {
    const missing = task.writeVoices.flatMap((v) => {
      const have = measuresWithNotes(score, v);
      const gaps = [...(task.writeMeasures?.[v] ?? target)].filter((m) => !have.has(m));
      return gaps.length ? [`${v} (c. ${gaps.slice(0, 6).join(", ")}${gaps.length > 6 ? "…" : ""})`] : [];
    });
    checks.push({
      id: "escreve",
      label: `Vozes escritas: ${task.writeVoices.join(", ")}`,
      ok: missing.length === 0,
      detail: missing.length === 0 ? "As vozes pedidas têm notas em todos os compassos com material." : `Ainda faltam notas em ${missing.join("; ")}.`,
    });
  }

  if (task.introBars) {
    const bars = Array.from({ length: task.introBars }, (_, i) => i + 1);
    const voices = score.parts.map((p) => p.voice);
    const empty = voices.filter((v) => {
      const have = measuresWithNotes(score, v);
      return !bars.every((m) => have.has(m));
    });
    const harm = analyzeHarmony(score).filter((h) => h.measure <= task.introBars! && h.roman);
    const last = harm[harm.length - 1]?.roman ?? "";
    const prepares = AUTHENTIC_PENULT.test(last) || TONIC.test(last);
    const ok = empty.length === 0 && prepares;
    checks.push({
      id: "introducao",
      label: `Introdução de ${task.introBars} compasso(s)`,
      ok,
      detail:
        empty.length > 0
          ? `A introdução precisa de todas as vozes nos compassos ${bars.join(" e ")}: faltam ${empty.join(", ")}.`
          : prepares
            ? `A introdução termina em ${last}, preparando a entrada da melodia.`
            : `A introdução termina em ${last || "um acorde não identificado"}; termine na dominante (V) ou na tônica para preparar a entrada.`,
    });
  }

  const report = validateScore(score, { style: task.style });
  const serious = report.diagnostics.filter((d) => d.severity === "erro" || d.severity === "alerta");
  checks.push({
    id: "sem-erros",
    label: "Nenhum erro nem alerta do motor",
    ok: serious.length === 0,
    detail: serious.length === 0 ? "O motor não aponta erros nem alertas neste estilo." : `${serious.length} ponto(s) a corrigir: abra cada um abaixo para entender o problema.`,
  });

  if (task.requireCadence) {
    // Pelo baixo (vale também para esqueletos de duas vozes): 5 → 1 ou 7 → 1; com três vozes ou mais, confere também a harmonia.
    const lowest = score.parts[score.parts.length - 1]!;
    const bass = voiceTimeline(lowest, score.timeSignature).flatMap((t) => (t.event.kind === "note" ? [t.event.pitch] : []));
    const [b1, b2] = [bass[bass.length - 2], bass[bass.length - 1]];
    const d1 = b1 ? scaleDegree(b1, score.key).degree : 0;
    const d2 = b2 ? scaleDegree(b2, score.key).degree : 0;
    const bassOk = (d1 === 5 || d1 === 7) && d2 === 1;
    const sounding = score.parts.filter((p) => p.events.some((e) => e.kind === "note")).length;
    const harm = analyzeHarmony(score).filter((h) => h.roman);
    const [pen, fin] = [harm[harm.length - 2]?.roman ?? "", harm[harm.length - 1]?.roman ?? ""];
    const harmOk = sounding < 3 || (AUTHENTIC_PENULT.test(pen) && TONIC.test(fin));
    const ok = bassOk && harmOk;
    checks.push({
      id: "cadencia-final",
      label: "Cadência final dominante → tônica",
      ok,
      detail: ok
        ? `O baixo termina ${d1}º → 1º grau${sounding >= 3 ? ` (${pen} → ${fin})` : ""}.`
        : !bassOk
          ? `O baixo termina no ${d1 || "?"}º → ${d2 || "?"}º grau; a cadência autêntica pede 5º (ou 7º) → 1º.`
          : `Os acordes finais são ${pen || "?"} → ${fin || "?"}; a tarefa pede dominante (V ou vii°) seguida da tônica.`,
    });
  }

  return { passed: checks.every((c) => c.ok), checks, serious, diagnostics: report.diagnostics };
}

/**
 * Ajuda usada antes de resolver. A ordem importa: a ajuda mais forte prevalece.
 * O domínio é ponderado por ela — acertar depois de ver a solução não é o mesmo que acertar sozinho.
 */
export type Assistance = "autonomo" | "dica" | "demonstracao" | "solucao";

export const ASSISTANCE_PT: Record<Assistance, string> = {
  autonomo: "Resolvido sem ajuda",
  dica: "Resolvido depois de uma dica",
  demonstracao: "Resolvido depois de consultar a demonstração",
  solucao: "Resolvido depois de ver a solução",
};

/** Peso de cada nível no domínio: só a resolução autônoma vale como domínio pleno. */
export const ASSISTANCE_CREDIT: Record<Assistance, number> = { autonomo: 1, dica: 0.75, demonstracao: 0.5, solucao: 0 };

export interface AssistanceLog {
  readonly hintsOpened: number;
  readonly demoOpened: boolean;
  readonly solutionOpened: boolean;
}

export const NO_ASSISTANCE: AssistanceLog = { hintsOpened: 0, demoOpened: false, solutionOpened: false };

export function assistanceLevel(log: AssistanceLog): Assistance {
  if (log.solutionOpened) return "solucao";
  if (log.demoOpened) return "demonstracao";
  if (log.hintsOpened > 0) return "dica";
  return "autonomo";
}

/** Uma conferência registrada (evidência de produção). */
export interface ProductionAttempt {
  readonly id: string;
  readonly taskId: string;
  readonly kind: TaskKind | "pre-teste" | "pos-teste";
  readonly lessonId?: string;
  readonly competency: string;
  readonly seed?: number;
  readonly startedAt: string;
  readonly finishedAt: string;
  readonly passed: boolean;
  readonly assistance: Assistance;
  readonly hintsUsed: number;
  /** Conferências reprovadas antes desta, na mesma tarefa. */
  readonly corrections: number;
  readonly failedChecks: readonly CheckId[];
  /** Regras que o motor apontou como erro/alerta (para o histórico de erros recorrentes). */
  readonly ruleIds: readonly string[];
}
