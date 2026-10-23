import { secondaryFunction } from "../music/chord";
import { getFormation } from "../music/formations";
import { type Score, voiceTimeline } from "../music/score";
import { buildContext } from "../validation/context";
import { type ValidationReport, validateScore } from "../validation/engine";
import { pairSteps } from "../validation/motion";
import { analyzeNonChordTones } from "../validation/rules/nct";
import { scaleDegree } from "../music/key";
import type { StyleProfileId } from "../music/score";

/**
 * Avaliação por rubrica de um arranjo. NÃO produz nota única: cada critério tem
 * nível 1–4 e as evidências objetivas que o sustentam. Critérios que dependem de
 * julgamento (criatividade, prosódia sem marcação de tônicas) ficam explícitos
 * como autoavaliação, com indicadores para orientar o aluno.
 */
export type CriterionId =
  | "correcao-tecnica"
  | "cantabilidade"
  | "independencia"
  | "coerencia-harmonica"
  | "prosodia"
  | "equilibrio"
  | "criatividade"
  | "adequacao-formacao"
  | "requisitos";

export type Level = 1 | 2 | 3 | 4;

export const LEVEL_PT: Record<Level, string> = { 1: "Inicial", 2: "Em desenvolvimento", 3: "Proficiente", 4: "Avançado" };

export interface CriterionResult {
  readonly id: CriterionId;
  readonly name: string;
  /** null = não avaliável automaticamente (requer autoavaliação). */
  readonly level: Level | null;
  readonly source: "automatica" | "autoavaliacao";
  readonly comment: string;
  readonly evidence: readonly string[];
  /** IDs de diagnósticos usados como evidência. */
  readonly diagnosticIds: readonly string[];
}

export interface RubricInput {
  readonly score: Score;
  readonly style: StyleProfileId;
  /** Partitura inicial do projeto (para verificar a melodia preservada). */
  readonly starting?: Score;
  readonly melodyVoice?: string;
  readonly justifications?: readonly string[];
  /** Autoavaliação do aluno para critérios não automáticos. */
  readonly selfAssessment?: Partial<Record<CriterionId, Level>>;
}

export interface RubricResult {
  readonly engineVersion: string;
  readonly criteria: readonly CriterionResult[];
  readonly strengths: readonly string[];
  readonly improvements: readonly string[];
}

const NAMES: Record<CriterionId, string> = {
  "correcao-tecnica": "Correção técnica",
  cantabilidade: "Cantabilidade das linhas",
  independencia: "Independência das vozes",
  "coerencia-harmonica": "Coerência harmônica",
  prosodia: "Prosódia e respiração",
  equilibrio: "Equilíbrio e espaçamento",
  criatividade: "Criatividade",
  "adequacao-formacao": "Adequação à formação",
  requisitos: "Requisitos do projeto",
};

const byRules = (r: ValidationReport, ids: readonly string[]) => r.diagnostics.filter((d) => ids.includes(d.ruleId) && d.severity !== "info");
const levelByCount = (n: number, thresholds: [number, number, number]): Level => (n <= thresholds[0] ? 4 : n <= thresholds[1] ? 3 : n <= thresholds[2] ? 2 : 1);

export function evaluateRubric(input: RubricInput): RubricResult {
  const { score, style } = input;
  const report = validateScore(score, { style });
  const ctx = buildContext(score, { style });
  const criteria: CriterionResult[] = [];
  const push = (c: Omit<CriterionResult, "name">) => criteria.push({ ...c, name: NAMES[c.id] });

  // 1. Correção técnica
  const errs = report.diagnostics.filter((d) => d.severity === "erro");
  const warns = report.diagnostics.filter((d) => d.severity === "alerta");
  const tech: Level = errs.length === 0 && warns.length === 0 ? 4 : errs.length === 0 && warns.length <= 2 ? 3 : errs.length <= 2 ? 2 : 1;
  push({
    id: "correcao-tecnica",
    level: tech,
    source: "automatica",
    comment: `${errs.length} erro(s) e ${warns.length} alerta(s) no estilo ${style}.`,
    evidence: [...errs, ...warns].slice(0, 6).map((d) => `c.${d.location.measure} t.${d.location.beat}: ${d.message}`),
    diagnosticIds: [...errs, ...warns].map((d) => d.id),
  });

  // 2. Cantabilidade
  const sing = byRules(report, ["melodia.salto-grande", "melodia.intervalo-aumentado", "melodia.compensacao-de-salto", "melodia.saltos-consecutivos", "extensao.fora-da-tessitura"]);
  push({
    id: "cantabilidade",
    level: levelByCount(sing.length, [0, 2, 5]),
    source: "automatica",
    comment: sing.length === 0 ? "Linhas por grau ou saltos compensados, dentro da tessitura." : `${sing.length} ponto(s) que dificultam o canto.`,
    evidence: sing.slice(0, 6).map((d) => d.message),
    diagnosticIds: sing.map((d) => d.id),
  });

  // 3. Independência (vozes extremas)
  const voices = ctx.voices;
  const steps = pairSteps(ctx, voices[0]!, voices[voices.length - 1]!);
  const moving = steps.filter((s) => s.motion !== "estatico");
  const contrary = moving.filter((s) => s.motion === "contrario" || s.motion === "obliquo").length;
  const ratio = moving.length ? contrary / moving.length : 0;
  const par = byRules(report, ["conducao.paralelas", "conducao.quintas-oitavas-diretas", "conducao.paralelas-em-tempos-fortes"]);
  let ind: Level = ratio >= 0.5 ? 4 : ratio >= 0.35 ? 3 : ratio >= 0.2 ? 2 : 1;
  if (par.length > 0 && ind > 2) ind = (ind - 1) as Level;
  push({
    id: "independencia",
    level: moving.length ? ind : null,
    source: "automatica",
    comment: moving.length ? `${Math.round(ratio * 100)}% dos movimentos entre as vozes extremas são contrários ou oblíquos.` : "Sem movimentos simultâneos suficientes para avaliar.",
    evidence: [`${moving.length} movimentos analisados entre ${ctx.voiceName(voices[0]!)} e ${ctx.voiceName(voices[voices.length - 1]!)}`, ...par.slice(0, 3).map((d) => d.message)],
    diagnosticIds: par.map((d) => d.id),
  });

  // 4. Coerência harmônica
  const harmonized = ctx.sonorities.filter((s) => s.complete);
  const identified = harmonized.filter((s) => s.harmony).length;
  const coverage = harmonized.length ? identified / harmonized.length : 0;
  const last = [...ctx.sonorities].reverse().find((s) => s.harmony);
  const prevHarm = last ? [...ctx.sonorities].reverse().find((s) => s.harmony && s.sonority.onset < last.sonority.onset && !(s.harmony.root.step === last.harmony!.root.step && s.harmony.root.alter === last.harmony!.root.alter)) : undefined;
  const finalDeg = last?.harmony ? scaleDegree(last.harmony.root, score.key).degree : 0;
  const prevDeg = prevHarm?.harmony ? scaleDegree(prevHarm.harmony.root, score.key).degree : 0;
  const authentic = finalDeg === 1 && (prevDeg === 5 || prevDeg === 7);
  const harmIssues = byRules(report, ["harmonia.retrogressao", "harmonia.sincope-harmonica", "harmonia.seis-quatro", "harmonia.sonoridade-nao-terciana", "harmonia.resolucao-da-sensivel", "harmonia.resolucao-da-setima"]);
  let coh: Level = coverage >= 0.95 && authentic ? 4 : coverage >= 0.85 ? 3 : coverage >= 0.6 ? 2 : 1;
  if (harmIssues.length > 2 && coh > 1) coh = (coh - 1) as Level;
  push({
    id: "coerencia-harmonica",
    level: harmonized.length ? coh : null,
    source: "automatica",
    comment: `${Math.round(coverage * 100)}% das sonoridades completas têm harmonia reconhecida; final ${authentic ? "com cadência autêntica" : "sem cadência autêntica"}.`,
    evidence: harmIssues.slice(0, 4).map((d) => d.message),
    diagnosticIds: harmIssues.map((d) => d.id),
  });

  // 5. Prosódia e respiração
  const hasLyrics = score.parts.some((p) => p.events.some((e) => e.kind === "note" && e.lyric));
  const breath = byRules(report, ["escrita.respiracao"]);
  const selfPros = input.selfAssessment?.prosodia ?? null;
  push({
    id: "prosodia",
    level: hasLyrics ? (selfPros ?? null) : breath.length ? 2 : (selfPros ?? null),
    source: "autoavaliacao",
    comment: hasLyrics
      ? "O motor ainda não lê a acentuação das sílabas: confira a prosódia em voz alta e registre sua autoavaliação."
      : "Sem letra no arranjo. A respiração foi verificada; a prosódia depende do texto.",
    evidence: [`${breath.length} trecho(s) longo(s) sem respiração`, hasLyrics ? "Letra presente" : "Sem letra"],
    diagnosticIds: breath.map((d) => d.id),
  });

  // 6. Equilíbrio
  const bal = byRules(report, ["vozes.espacamento", "vozes.cruzamento", "vozes.sobreposicao", "vozes.limite-grave-de-intervalo", "vozes.duplicacao", "harmonia.sensivel-dobrada"]);
  push({
    id: "equilibrio",
    level: levelByCount(bal.length, [0, 2, 5]),
    source: "automatica",
    comment: bal.length === 0 ? "Espaçamento, duplicações e registro equilibrados." : `${bal.length} ponto(s) de espaçamento, cruzamento ou duplicação.`,
    evidence: bal.slice(0, 5).map((d) => d.message),
    diagnosticIds: bal.map((d) => d.id),
  });

  // 7. Criatividade (autoavaliação com indicadores)
  const chords = new Set(ctx.sonorities.filter((s) => s.harmony).map((s) => `${s.harmony!.root.step}${s.harmony!.root.alter}${s.harmony!.quality}`));
  const inversions = ctx.sonorities.filter((s) => s.harmony && s.harmony.inversion > 0).length;
  const ncts = analyzeNonChordTones(ctx).filter((n) => n.kind !== "nao-classificada" && n.kind !== "retardo-sem-resolucao").length;
  const secondaries = ctx.sonorities.filter((s) => s.harmony && secondaryFunction(s.harmony, score.key)).length;
  push({
    id: "criatividade",
    level: input.selfAssessment?.criatividade ?? null,
    source: "autoavaliacao",
    comment: "Criatividade não é avaliada automaticamente. Os indicadores abaixo descrevem recursos usados — não são uma nota.",
    evidence: [`${chords.size} acordes diferentes`, `${inversions} sonoridades invertidas`, `${ncts} notas estranhas tratadas`, `${secondaries} funções secundárias`],
    diagnosticIds: [],
  });

  // 8. Adequação à formação
  const fit = byRules(report, ["extensao.fora-da-extensao", "vozes.limite-grave-de-intervalo", "extensao.fora-da-tessitura"]);
  const formation = getFormation(score.formation);
  push({
    id: "adequacao-formacao",
    level: levelByCount(fit.filter((d) => d.ruleId === "extensao.fora-da-extensao").length * 3 + fit.length, [0, 2, 6]),
    source: "automatica",
    comment: `Extensões e limites de ${formation.name}.`,
    evidence: fit.slice(0, 5).map((d) => d.message),
    diagnosticIds: fit.map((d) => d.id),
  });

  // 9. Requisitos do projeto
  const req: string[] = [];
  let reqLevel: Level = 4;
  if (input.starting && input.melodyVoice) {
    const a = input.starting.parts.find((p) => p.voice === input.melodyVoice);
    const b = score.parts.find((p) => p.voice === input.melodyVoice);
    const sig = (p: typeof a) => (p ? voiceTimeline(p, score.timeSignature).filter((t) => t.event.kind === "note").map((t) => `${t.onset}:${t.event.kind === "note" ? `${t.event.pitch.step}${t.event.pitch.alter}${t.event.pitch.octave}` : ""}`).join(",") : "");
    const preserved = sig(a) === sig(b);
    req.push(preserved ? "Melodia dada preservada" : "A melodia dada foi alterada");
    if (!preserved) reqLevel = 2;
  }
  const silent = score.parts.filter((p) => !p.events.some((e) => e.kind === "note"));
  if (silent.length) {
    req.push(`Vozes sem nenhuma nota: ${silent.map((p) => p.voice).join(", ")}`);
    reqLevel = 1;
  }
  const just = (input.justifications ?? []).filter((j) => j.trim().length >= 40).length;
  const needed = input.justifications?.length ?? 0;
  if (needed) {
    req.push(`${just} de ${needed} justificativas com pelo menos 40 caracteres`);
    if (just < needed && reqLevel > 2) reqLevel = just === 0 ? 2 : 3;
  }
  push({ id: "requisitos", level: reqLevel, source: "automatica", comment: "Melodia, vozes completas e justificativas.", evidence: req, diagnosticIds: [] });

  const strengths = criteria.filter((c) => c.level === 4 && c.source === "automatica").map((c) => c.name);
  const improvements = criteria.filter((c) => c.level !== null && c.level <= 2).map((c) => `${c.name}: ${c.comment}`);
  return { engineVersion: report.engineVersion, criteria, strengths, improvements };
}

export interface VersionComparison {
  readonly resolved: readonly string[];
  readonly introduced: readonly string[];
  readonly criteria: ReadonlyArray<{ id: CriterionId; name: string; before: Level | null; after: Level | null }>;
}

/** Compara duas versões: diagnósticos resolvidos/introduzidos (por regra e posição) e níveis por critério. */
export function compareVersions(before: RubricInput, after: RubricInput): VersionComparison {
  const key = (d: { ruleId: string; location: { onset: number; voices: readonly string[] } }) => `${d.ruleId}@${d.location.onset}:${d.location.voices.join("-")}`;
  const ra = validateScore(before.score, { style: before.style }).diagnostics.filter((d) => d.severity !== "info");
  const rb = validateScore(after.score, { style: after.style }).diagnostics.filter((d) => d.severity !== "info");
  const ka = new Map(ra.map((d) => [key(d), d]));
  const kb = new Map(rb.map((d) => [key(d), d]));
  const ea = evaluateRubric(before);
  const eb = evaluateRubric(after);
  return {
    resolved: [...ka.entries()].filter(([k]) => !kb.has(k)).map(([, d]) => `c.${d.location.measure}: ${d.title}`),
    introduced: [...kb.entries()].filter(([k]) => !ka.has(k)).map(([, d]) => `c.${d.location.measure}: ${d.title}`),
    criteria: eb.criteria.map((c) => ({ id: c.id, name: c.name, before: ea.criteria.find((x) => x.id === c.id)?.level ?? null, after: c.level })),
  };
}
