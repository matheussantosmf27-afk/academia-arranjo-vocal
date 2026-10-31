import { createRng, pick, shuffle } from "../exercises/random";
import type { VoiceId } from "../music/formations";
import { transposeByInterval } from "../music/interval";
import type { IntervalQuality } from "../music/interval";
import { keyNamePt } from "../music/key";
import { transposeEventDiatonic } from "../music/operations";
import type { Score } from "../music/score";
import { scoreFromText } from "../music/text-notation";
import { transposeScore } from "../music/timeline-ops";
import { validateScore } from "../validation/engine";
import type { ProductionTask } from "./task";

/**
 * Avaliação de transferência: situações que o aluno nunca viu nas aulas, geradas a partir
 * de uma semente e de um banco de melodias. A mesma semente gera sempre a mesma tarefa,
 * de modo que pré-teste e pós-teste são reprodutíveis e auditáveis. A solução de referência
 * não aparece antes da primeira conferência.
 */
export type TransferKind = "harmonizar" | "segunda-voz" | "adaptar-ttbb" | "corrigir" | "introducao";

export const TRANSFER_KINDS: readonly TransferKind[] = ["harmonizar", "segunda-voz", "adaptar-ttbb", "corrigir", "introducao"];

export const TRANSFER_KIND_PT: Record<TransferKind, string> = {
  harmonizar: "Harmonizar uma melodia desconhecida",
  "segunda-voz": "Criar uma segunda voz",
  "adaptar-ttbb": "Adaptar de SATB para TTBB em outra tonalidade",
  corrigir: "Corrigir uma partitura com erros",
  introducao: "Escrever uma introdução",
};

type SATB = Readonly<Record<"S" | "A" | "T" | "B", string>>;

export interface TransferMelody {
  readonly id: string;
  /** Origem (catálogo), revelada só junto com a solução. */
  readonly source: string;
  readonly key: string;
  /** A harmonização de referência termina em cadência autêntica conferível. */
  readonly cadence: boolean;
  /** Intervalo descendente que leva a referência para o TTBB; null se ela não cabe. */
  readonly ttbb: { readonly number: number; readonly quality: IntervalQuality } | null;
  readonly voices: SATB;
  /** Introdução de referência (dois compassos, I – V). */
  readonly intro: SATB;
}

const REST_ONLY = (v: string) => v.replace(/[A-G][#b]*\d:([\w.]+)~?/g, "r:$1");
const SOURCE_NOTE = (m: TransferMelody) =>
  `A melodia é a primeira frase de um coral luterano, na harmonização de J. S. Bach (${m.source}), em domínio público. A versão de Bach é uma solução possível, não a única.`;

const satb = (id: string, title: string, key: string, voices: SATB): Score =>
  scoreFromText({ id, title, formation: "SATB", key, time: "4/4", style: "coral-tradicional", voices });

/** Partitura de Bach transposta e reatribuída ao TTBB (Bach → TTBB: S→T1, A→T2, T→B1, B→B2). */
export function toTtbb(score: Score, iv: { number: number; quality: IntervalQuality }): Score {
  const t = transposeScore(score, iv.number, iv.quality, -1);
  const tonic = transposeByInterval({ ...score.key.tonic, octave: 4 }, iv.number, iv.quality, -1);
  const MAP: Record<string, VoiceId> = { S: "T1", A: "T2", T: "B1", B: "B2" };
  return {
    ...t,
    formation: "TTBB",
    key: { ...score.key, tonic: { step: tonic.step, alter: tonic.alter } },
    parts: t.parts.map((p) => ({ ...p, voice: MAP[p.voice] ?? p.voice })),
  };
}

/**
 * Introduz erros determinísticos nas vozes de contralto, tenor e baixo (nunca no soprano):
 * move de 2 a 3 notas por grau conjunto ou salto, até haver pelo menos um erro objetivo e
 * três pontos graves (erros ou alertas) no total.
 */
export function injectErrors(score: Score, seed: number): Score | null {
  const rng = createRng(seed);
  const candidates = score.parts
    .filter((p) => p.voice !== "S")
    .flatMap((p) =>
      p.events.flatMap((e, i) => {
        const prev = p.events[i - 1];
        const tied = e.kind === "note" && (e.tieToNext || (prev?.kind === "note" && prev.tieToNext));
        return e.kind === "note" && !tied ? [e.id] : [];
      }),
    );
  const STEPS = [-4, -3, -2, -1, 1, 2, 3, 4];
  for (let attempt = 0; attempt < 80; attempt++) {
    let s = score;
    for (const id of shuffle(rng, candidates).slice(0, 2 + Math.floor(rng() * 2))) s = transposeEventDiatonic(s, id, pick(rng, STEPS));
    const r = validateScore(s, { style: "coral-tradicional" });
    if (r.countsBySeverity.erro >= 1 && r.countsBySeverity.erro + r.countsBySeverity.alerta >= 3) return s;
  }
  return null;
}

/** Id reprodutível: tipo, melodia, semente e, na prática de uma aula, a aula ("@aula"). */
export function transferTaskId(kind: TransferKind, melodyId: string, seed: number, lessonId?: string): string {
  return `transf:${kind}:${melodyId}:${seed}${lessonId ? `@${lessonId}` : ""}`;
}

export function parseTransferId(id: string): { kind: TransferKind; melodyId: string; seed: number; lessonId?: string } | null {
  const m = /^transf:([a-z-]+):([a-z0-9-]+):(\d+)(?:@([a-z0-9-]{1,100}))?$/.exec(id);
  if (!m || !TRANSFER_KINDS.includes(m[1] as TransferKind)) return null;
  return { kind: m[1] as TransferKind, melodyId: m[2]!, seed: Number(m[3]), ...(m[4] ? { lessonId: m[4] } : {}) };
}

/** Melodias em que o tipo de tarefa tem solução de referência conferida. */
export function eligible(kind: TransferKind, pool: readonly TransferMelody[]): TransferMelody[] {
  return pool.filter((m) => (kind === "adaptar-ttbb" ? m.ttbb !== null : true));
}

export function buildTransferTask(kind: TransferKind, m: TransferMelody, seed: number, practiceLesson?: string): ProductionTask | null {
  const t = buildBase(kind, m, seed);
  if (!t || !practiceLesson) return t;
  // Prática ligada a uma aula: a mesma tarefa, creditada à aula de onde o aluno veio.
  return { ...t, id: transferTaskId(kind, m.id, seed, practiceLesson), lessonId: practiceLesson };
}

function buildBase(kind: TransferKind, m: TransferMelody, seed: number): ProductionTask | null {
  const id = transferTaskId(kind, m.id, seed);
  const original = satb(`${id}:ref`, "Referência", m.key, m.voices);
  const keyPt = keyNamePt(original.key);
  const base = { id, kind: "transferencia" as const, seed, style: "coral-tradicional" as const, title: TRANSFER_KIND_PT[kind] };
  const melodyOnly = satb(id, "Melodia desconhecida", m.key, { S: m.voices.S, A: REST_ONLY(m.voices.A), T: REST_ONLY(m.voices.T), B: REST_ONLY(m.voices.B) });

  switch (kind) {
    case "harmonizar":
      return {
        ...base,
        lessonId: "harmonizacao-satb",
        competency: "escrita-satb",
        prompt: `Esta melodia, em ${keyPt}, não aparece em nenhuma aula. Analise a frase (onde ela respira, quais notas pedem a tônica, a dominante ou a subdominante), escolha os acordes e escreva contralto, tenor e baixo.`,
        start: melodyOnly,
        keepVoices: ["S"],
        writeVoices: ["A", "T", "B"],
        requireCadence: m.cadence,
        constraints: [
          "Não altere o soprano.",
          "Contralto, tenor e baixo em todos os compassos com melodia.",
          "Nenhum erro nem alerta do motor em coral tradicional.",
          ...(m.cadence ? ["Termine com cadência autêntica: dominante (V) → tônica (I), com o baixo 5º → 1º grau."] : ["Termine a frase de acordo com a melodia: se ela para no 2º ou 7º grau, uma meia cadência (V) é natural."]),
        ],
        hints: [
          "Comece pelo fim: escolha o acorde da última nota e o anterior. Depois, o primeiro acorde (geralmente a tônica).",
          "Escreva o baixo inteiro antes das vozes internas, em movimento contrário ao soprano sempre que der.",
          "Para cada acorde, mantenha a nota comum na mesma voz e mova as outras para a nota mais próxima. Confira para ver onde o motor aponta paralelas.",
        ],
        demo: { label: "Rever: Harmonização de melodias em SATB", href: "/licoes/harmonizacao-satb" },
        solution: { score: satb(`${id}:sol`, "Solução de referência", m.key, m.voices), commentary: SOURCE_NOTE(m) },
      };
    case "segunda-voz": {
      const duo = { ...m.voices, T: REST_ONLY(m.voices.T), B: REST_ONLY(m.voices.B) };
      return {
        ...base,
        lessonId: "duas-vozes",
        competency: "contraponto",
        prompt: `Escreva uma segunda voz (contralto) para esta melodia em ${keyPt}. As duas vozes precisam soar completas sozinhas, sem tenor nem baixo.`,
        start: melodyOnly,
        keepVoices: ["S"],
        writeVoices: ["A"],
        constraints: [
          "Não altere o soprano; tenor e baixo ficam em pausa.",
          "Contralto em todos os compassos com melodia, abaixo do soprano.",
          "Nenhum erro nem alerta do motor em coral tradicional (sem quintas ou oitavas paralelas, sem cruzamento).",
        ],
        hints: [
          "Terças e sextas são as consonâncias imperfeitas que dão independência: use-as na maior parte da frase.",
          "Quando o soprano sobe por grau, experimente o contralto parado ou descendo (movimento oblíquo ou contrário).",
          "Comece e termine em consonância perfeita (uníssono, quinta ou oitava) ou em terça; evite chegar a uma quinta ou oitava por movimento direto.",
        ],
        demo: { label: "Rever: Escrita a duas vozes", href: "/licoes/duas-vozes" },
        solution: { score: satb(`${id}:sol`, "Solução de referência", m.key, duo), commentary: `${SOURCE_NOTE(m)} Aqui, só o contralto de Bach foi mantido.` },
      };
    }
    case "adaptar-ttbb": {
      if (!m.ttbb) return null;
      const target = toTtbb(original, m.ttbb);
      const melody: Score = { ...target, id, title: "Adaptação para TTBB", parts: target.parts.map((p) => (p.voice === "T1" ? p : { ...p, events: p.events.map((e) => (e.kind === "note" ? { id: e.id, kind: "rest" as const, duration: e.duration } : e)) })) };
      return {
        ...base,
        lessonId: "escrita-ttbb",
        competency: "escrita-ttbb",
        prompt: `Um coro masculino vai cantar este coral, originalmente SATB em ${keyPt}. A melodia já foi transposta para ${keyNamePt(target.key)} e está no Tenor I. Adapte as outras vozes para Tenor II, Barítono e Baixo, respeitando as extensões masculinas.`,
        start: melody,
        reference: { label: `Original SATB em ${keyPt}`, score: original },
        keepVoices: ["T1"],
        writeVoices: ["T2", "B1", "B2"],
        constraints: [
          "Não altere o Tenor I.",
          "Tenor II, Barítono e Baixo em todos os compassos com melodia.",
          "Extensões masculinas (o motor confere): nada abaixo de Mi2 no baixo, nem acima de Fá4 no Tenor II.",
          "Nenhum erro nem alerta do motor em coral tradicional.",
        ],
        hints: [
          `O intervalo entre ${keyPt} e ${keyNamePt(target.key)} é o mesmo para todas as vozes: transpor o original inteiro é um bom ponto de partida.`,
          "Depois de transpor, confira as extensões: se o baixo descer demais, suba uma oitava só no trecho e refaça a ligação com as vozes vizinhas.",
          "No TTBB as vozes ficam mais próximas: mantenha no máximo uma oitava entre Tenor I e Tenor II e entre Tenor II e Barítono.",
        ],
        demo: { label: "Rever: Escrita para TTBB", href: "/licoes/escrita-ttbb" },
        solution: { score: { ...target, id: `${id}:sol`, title: "Solução de referência" }, commentary: `${SOURCE_NOTE(m)} A solução é a harmonização de Bach transposta: o que ela mostra é que, com o intervalo certo, as quatro vozes cabem no quarteto masculino sem mudar nenhuma linha.` },
      };
    }
    case "corrigir": {
      const broken = injectErrors(original, seed);
      if (!broken) return null;
      return {
        ...base,
        lessonId: "paralelas",
        competency: "conducao-de-vozes",
        prompt: `Esta harmonização em ${keyPt} tem erros de condução nas vozes de baixo, tenor e contralto. Encontre-os, entenda por que são erros e corrija mudando o mínimo possível.`,
        start: { ...broken, id, title: "Partitura para corrigir" },
        keepVoices: ["S"],
        writeVoices: ["A", "T", "B"],
        constraints: ["Não altere o soprano.", "Mantenha todas as vozes em todos os compassos.", "Nenhum erro nem alerta do motor em coral tradicional."],
        hints: [
          "Antes de conferir, cante ou ouça cada voz sozinha: uma nota fora do acorde ou um salto estranho costuma ser o erro.",
          "Confira uma vez: o motor mostra o compasso, as vozes e as notas envolvidas. Corrija um ponto de cada vez.",
          "Corrigir não é reescrever: em geral basta mover uma nota um grau acima ou abaixo.",
        ],
        demo: { label: "Rever: Quintas e oitavas paralelas", href: "/licoes/paralelas" },
        solution: { score: satb(`${id}:sol`, "Solução de referência", m.key, m.voices), commentary: `${SOURCE_NOTE(m)} Os erros foram introduzidos pelo curso, movendo notas das vozes de baixo, tenor e contralto um grau.` },
      };
    }
    case "introducao": {
      const blank = (v: string) => `r:w | r:w | ${v}`;
      const start = satb(id, "Introdução", m.key, { S: blank(m.voices.S), A: blank(m.voices.A), T: blank(m.voices.T), B: blank(m.voices.B) });
      const sol = satb(`${id}:sol`, "Solução de referência", m.key, {
        S: `${m.intro.S} | ${m.voices.S}`,
        A: `${m.intro.A} | ${m.voices.A}`,
        T: `${m.intro.T} | ${m.voices.T}`,
        B: `${m.intro.B} | ${m.voices.B}`,
      });
      return {
        ...base,
        lessonId: "acompanhamento-introducoes",
        competency: "arranjo",
        prompt: `Escreva dois compassos de introdução a quatro vozes antes desta frase em ${keyPt}. A introdução precisa estabelecer a tonalidade e preparar a entrada do coro.`,
        start,
        keepVoices: ["S", "A", "T", "B"],
        writeVoices: [],
        introBars: 2,
        constraints: [
          "Não altere a frase a partir do compasso 3.",
          "As quatro vozes nos compassos 1 e 2.",
          "Termine a introdução na dominante (V) ou na tônica, preparando a entrada.",
          "Nenhum erro nem alerta do motor em coral tradicional, inclusive na ligação com a frase.",
        ],
        hints: [
          "Uma introdução curta e eficaz: tônica no 1º compasso, dominante no 2º.",
          "Olhe o primeiro acorde da frase e ligue a dominante a ele pelo caminho mais curto em cada voz.",
          "Use notas longas (semibreves ou mínimas): a introdução prepara, não compete com a melodia.",
        ],
        demo: { label: "Rever: Acompanhamento, introduções e interlúdios", href: "/licoes/acompanhamento-introducoes" },
        solution: { score: sol, commentary: `${SOURCE_NOTE(m)} A introdução I – V da referência foi escrita para o curso.` },
      };
    }
  }
}

/** Gera a tarefa de um tipo para uma semente (a melodia sai da semente). */
export function generateTransferTask(kind: TransferKind, pool: readonly TransferMelody[], seed: number, practiceLesson?: string): ProductionTask | null {
  const options = eligible(kind, pool);
  if (!options.length) return null;
  const rng = createRng(seed ^ 0x5bd1e995);
  return buildTransferTask(kind, pick(rng, options), seed, practiceLesson);
}

/** Bateria com um item de cada tipo e melodias diferentes entre si (e das melodias em `exclude`). */
export function transferBattery(pool: readonly TransferMelody[], seed: number, exclude: ReadonlySet<string> = new Set()): ProductionTask[] {
  const rng = createRng(seed);
  const used = new Set<string>(exclude);
  const out: ProductionTask[] = [];
  for (const kind of TRANSFER_KINDS) {
    const options = shuffle(rng, eligible(kind, pool).filter((m) => !used.has(m.id)));
    for (const m of options) {
      const t = buildTransferTask(kind, m, seed);
      if (t) {
        used.add(m.id);
        out.push(t);
        break;
      }
    }
  }
  return out;
}
