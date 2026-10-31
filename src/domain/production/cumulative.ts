import { measureTicks, ticksToDurations } from "../music/duration";
import type { VoiceId } from "../music/formations";
import { keyNamePt } from "../music/key";
import { parsePitch, toMidi } from "../music/pitch";
import type { MusicEvent, Score } from "../music/score";
import { parseKey } from "../music/text-notation";
import { validateScore } from "../validation/engine";
import { type CheckResult, type ProductionTask, checkTask } from "./task";

/**
 * Projeto cumulativo "Meu arranjo": uma melodia real atravessa seis etapas. Cada etapa tem
 * uma conferência própria (o que é verificável) e, ao ser concluída, guarda uma versão.
 * O que não é verificável (escolhas, intenção, expressão) fica registrado por escrito e vai
 * para a avaliação humana na finalização.
 */
export type StageId = "analise" | "harmonizacao" | "distribuicao" | "desenvolvimento" | "refinamento" | "finalizacao";

export interface Stage {
  readonly id: StageId;
  readonly n: number;
  readonly title: string;
  readonly goal: string;
  readonly steps: readonly string[];
  readonly lesson: { readonly label: string; readonly href: string };
}

export const STAGES: readonly Stage[] = [
  {
    id: "analise",
    n: 1,
    title: "Análise da melodia",
    goal: "Conhecer a melodia antes de escrever qualquer nota: tonalidade, extensão, frases, respirações e clímax.",
    steps: ["Cante ou ouça a melodia sozinha várias vezes.", "Identifique a tonalidade e as notas mais grave e mais aguda.", "Marque onde cada frase termina e qual cadência ela pede; localize o clímax."],
    lesson: { label: "Análise melódica", href: "/licoes/analise-melodica" },
  },
  {
    id: "harmonizacao",
    n: 2,
    title: "Harmonização (baixo)",
    goal: "Escolher os acordes e escrever o baixo: o esqueleto soprano–baixo precisa funcionar sozinho.",
    steps: ["Escolha os acordes das cadências primeiro, depois o resto da frase.", "Escreva o baixo inteiro, em movimento contrário ao soprano sempre que der.", "Confira: o motor não pode apontar erros nem alertas entre soprano e baixo."],
    lesson: { label: "Harmonização de melodias em SATB", href: "/licoes/harmonizacao-satb" },
  },
  {
    id: "distribuicao",
    n: 3,
    title: "Distribuição de vozes",
    goal: "Completar contralto e tenor: acordes completos, condução econômica e espaçamento correto.",
    steps: ["Para cada acorde, decida o que dobrar (em geral, a fundamental).", "Mantenha notas comuns e mova as outras vozes para a nota mais próxima.", "Ouça cada voz sozinha: ela precisa ser cantável."],
    lesson: { label: "Quintas e oitavas paralelas", href: "/licoes/paralelas" },
  },
  {
    id: "desenvolvimento",
    n: 4,
    title: "Desenvolvimento",
    goal: "Ir além do bloco de acordes: uma introdução de dois compassos que estabeleça a tonalidade e prepare a entrada do coro.",
    steps: ["Dois compassos foram abertos antes da melodia.", "Escreva a introdução nas quatro vozes, terminando na dominante (ou na tônica).", "Se quiser, varie a textura dentro da melodia (notas de passagem, contracanto) mantendo o soprano."],
    lesson: { label: "Acompanhamento, introduções e interlúdios", href: "/licoes/acompanhamento-introducoes" },
  },
  {
    id: "refinamento",
    n: 5,
    title: "Refinamento",
    goal: "Revisar como quem vai ensaiar: dinâmicas, respirações, cantabilidade e cada diagnóstico do motor.",
    steps: ["Indique uma dinâmica no início de cada voz (e onde a forma pedir mudança).", "Releia cada sugestão do motor e decida: corrigir ou justificar.", "Escreva o que você mudou nesta revisão e por quê."],
    lesson: { label: "Planejar o ensaio e revisar a partitura", href: "/licoes/reg-revisao-planejamento" },
  },
  {
    id: "finalizacao",
    n: 6,
    title: "Finalização",
    goal: "Entregar uma partitura que um coro possa ler: título, autoria, memorial e exportação.",
    steps: ["Dê um título ao arranjo e preencha o campo de arranjador.", "Escreva um memorial curto: escolhas de harmonia, textura e o que o coro precisa saber.", "Exporte (MusicXML, MIDI ou PDF) e peça uma avaliação humana."],
    lesson: { label: "Análise estilística, revisão e preparação de partituras", href: "/licoes/analise-estilistica-revisao" },
  },
];

export interface AnalysisAnswers {
  readonly key: string;
  readonly lowest: string;
  readonly highest: string;
  readonly phrases: string;
  readonly climax: string;
}

export interface StageInput {
  readonly melody: Score;
  /** Versão concluída da etapa anterior (para conferir o que precisa ser preservado). */
  readonly previous: Score | null;
  readonly analysis: AnalysisAnswers;
  readonly notes: Readonly<Partial<Record<StageId, string>>>;
}

export interface StageResult {
  readonly passed: boolean;
  readonly checks: readonly CheckResult[];
  readonly task?: ReturnType<typeof checkTask>;
}

const restAll = (events: readonly MusicEvent[]): MusicEvent[] => events.map((e) => (e.kind === "note" ? { id: e.id, kind: "rest", duration: e.duration } : e));

/** Só a melodia (soprano); as outras vozes em pausa. */
export function melodyOnly(score: Score, melodyVoice: VoiceId = "S"): Score {
  return { ...score, parts: score.parts.map((p) => (p.voice === melodyVoice ? p : { ...p, events: restAll(p.events) })) };
}

/** Abre `bars` compassos vazios no início de todas as vozes (para a introdução). */
export function prependBars(score: Score, bars: number): Score {
  const durs = ticksToDurations(measureTicks(score.timeSignature) * bars);
  return {
    ...score,
    measureCount: score.measureCount + bars,
    parts: score.parts.map((p) => ({ ...p, events: [...durs.map((d, i) => ({ id: `intro-${p.voice}-${i}`, kind: "rest" as const, duration: d })), ...p.events] })),
  };
}

const ok = (id: CheckResult["id"], label: string, pass: boolean, good: string, bad: string): CheckResult => ({ id, label, ok: pass, detail: pass ? good : bad });

function melodyRange(m: Score): [number, number] {
  const ns = m.parts[0]!.events.flatMap((e) => (e.kind === "note" ? [toMidi(e.pitch)] : []));
  return [Math.min(...ns), Math.max(...ns)];
}

const midiOf = (t: string): number | null => {
  try {
    return toMidi(parsePitch(t.trim().replace(/♯/g, "#").replace(/♭/g, "b")));
  } catch {
    return null;
  }
};

/** Tarefa equivalente à etapa (para reaproveitar a conferência das tarefas de produção). */
export function stageTask(stage: StageId, input: StageInput): ProductionTask | null {
  const base = { kind: "producao" as const, competency: "arranjo", title: stage, prompt: "", style: input.melody.metadata.style, constraints: [], hints: [] };
  switch (stage) {
    case "harmonizacao":
      return { ...base, id: `meu-arranjo:${stage}`, start: melodyOnly(input.melody), keepVoices: ["S"], writeVoices: ["B"] };
    case "distribuicao":
      return { ...base, id: `meu-arranjo:${stage}`, start: melodyOnly(input.melody), keepVoices: ["S"], writeVoices: ["A", "T", "B"] };
    case "desenvolvimento":
      return { ...base, id: `meu-arranjo:${stage}`, start: prependBars(melodyOnly(input.melody), 2), keepVoices: ["S"], writeVoices: ["A", "T", "B"], introBars: 2 };
    default:
      return null;
  }
}

/** Conferência de uma etapa sobre a partitura atual. */
export function checkStage(stage: StageId, score: Score, input: StageInput): StageResult {
  const checks: CheckResult[] = [];
  const minChars = (t: string | undefined, n: number) => (t ?? "").trim().length >= n;
  if (stage === "analise") {
    const a = input.analysis;
    let keyOk = false;
    try {
      const k = parseKey(a.key.trim());
      keyOk = k.mode === input.melody.key.mode && k.tonic.step === input.melody.key.tonic.step && k.tonic.alter === input.melody.key.tonic.alter;
    } catch {
      keyOk = false;
    }
    checks.push(ok("formacao", "Tonalidade", keyOk, `Correto: ${keyNamePt(input.melody.key)}.`, "A tonalidade não confere. Olhe a armadura, a última nota e o acorde que a melodia pede no fim (use, por exemplo, G para Sol maior e Em para Mi menor)."));
    const [lo, hi] = melodyRange(input.melody);
    const rangeOk = midiOf(a.lowest) === lo && midiOf(a.highest) === hi;
    checks.push(ok("escreve", "Extensão da melodia", rangeOk, "Nota mais grave e mais aguda corretas.", "A nota mais grave ou a mais aguda não confere. Escreva com a oitava, por exemplo D4 e E5, e confira a melodia inteira."));
    checks.push(ok("preserva", "Frases e cadências descritas", minChars(a.phrases, 30) && minChars(a.climax, 15), "Análise escrita registrada.", "Descreva onde as frases terminam e qual cadência pedem (30 caracteres ou mais) e onde está o clímax."));
    return { passed: checks.every((c) => c.ok), checks };
  }
  if (stage === "refinamento") {
    const t = stageTask("distribuicao", input)!;
    const intro = prependBars(t.start, 2);
    const r = checkTask({ ...t, start: intro, writeMeasures: {} }, score);
    const dynamicsOk = score.parts.every((p) => {
      const first = p.events.find((e) => e.kind === "note");
      return !!first && first.kind === "note" && !!first.dynamic;
    });
    checks.push(...r.checks.filter((c) => c.id === "preserva" || c.id === "sem-erros"));
    checks.push(ok("introducao", "Dinâmica inicial em cada voz", dynamicsOk, "Todas as vozes começam com uma indicação de dinâmica.", "Selecione a primeira nota de cada voz e escolha uma dinâmica no inspetor."));
    checks.push(ok("escreve", "Revisão registrada", minChars(input.notes.refinamento, 40), "Revisão descrita.", "Escreva o que mudou nesta revisão e por quê (40 caracteres ou mais)."));
    return { passed: checks.every((c) => c.ok), checks, task: r };
  }
  if (stage === "finalizacao") {
    const report = checkStage("refinamento", score, input);
    checks.push(...report.checks.filter((c) => c.id !== "escreve"));
    checks.push(ok("formacao", "Título e arranjador", score.title.trim().length >= 3 && score.title !== input.melody.title && !!score.metadata.arranger?.trim(), "Partitura identificada.", "Dê ao arranjo um título próprio e preencha o arranjador (campo no cabeçalho do laboratório)."));
    checks.push(ok("cadencia-final", "Memorial do arranjo", minChars(input.notes.finalizacao, 80), "Memorial registrado.", "Escreva um memorial de pelo menos 80 caracteres: escolhas de harmonia e textura e o que o coro precisa saber."));
    return { passed: checks.every((c) => c.ok), checks };
  }
  const task = stageTask(stage, input)!;
  const r = checkTask(task, stage === "harmonizacao" ? { ...score, parts: score.parts.map((p) => (p.voice === "A" || p.voice === "T" ? { ...p, events: restAll(p.events) } : p)) } : score);
  return { passed: r.passed, checks: r.checks, task: r };
}

export interface ScoreComparison {
  readonly before: { readonly erro: number; readonly alerta: number; readonly sugestao: number };
  readonly after: { readonly erro: number; readonly alerta: number; readonly sugestao: number };
  readonly resolved: readonly string[];
  readonly introduced: readonly string[];
  readonly measures: readonly [number, number];
  readonly voicesWritten: readonly [number, number];
}

/**
 * Compara duas versões pelo que o motor mede: contagens por gravidade e pontos resolvidos
 * ou novos (mesma regra, mesmas vozes, mesmo compasso). `offset` desloca os compassos da
 * versão anterior (por exemplo, +2 quando a introdução foi aberta entre as duas).
 */
export function compareScores(a: Score, b: Score, style: Score["metadata"]["style"], offset = 0): ScoreComparison {
  const diags = (s: Score) => validateScore(s, { style }).diagnostics.filter((d) => d.severity !== "info");
  const da = diags(a);
  const db = diags(b);
  const key = (d: (typeof da)[number], shift: number) => `${d.ruleId}|${d.location.voices.join("-")}|${d.location.measure + shift}`;
  const ka = new Map(da.map((d) => [key(d, offset), d]));
  const kb = new Map(db.map((d) => [key(d, 0), d]));
  const counts = (ds: typeof da) => ({ erro: ds.filter((d) => d.severity === "erro").length, alerta: ds.filter((d) => d.severity === "alerta").length, sugestao: ds.filter((d) => d.severity === "sugestao").length });
  const written = (s: Score) => s.parts.filter((p) => p.events.some((e) => e.kind === "note")).length;
  return {
    before: counts(da),
    after: counts(db),
    resolved: [...ka.entries()].filter(([k]) => !kb.has(k)).map(([, d]) => `c. ${d.location.measure + offset}: ${d.title}`),
    introduced: [...kb.entries()].filter(([k]) => !ka.has(k)).map(([, d]) => `c. ${d.location.measure}: ${d.title}`),
    measures: [a.measureCount, b.measureCount],
    voicesWritten: [written(a), written(b)],
  };
}
