import { type ChordIdentification, romanNumeral } from "../../music/chord";
import { beatTicks, isStrongBeat } from "../../music/duration";
import type { VoiceId } from "../../music/formations";
import { intervalBetween, simpleNumber } from "../../music/interval";
import { type Pitch, formatPitch, samePitch } from "../../music/pitch";
import type { TimedEvent } from "../../music/score";
import type { ValidationContext, VoicedSonority } from "../context";
import type { Rule } from "../rule";

export type NctKind =
  | "passagem"
  | "bordadura"
  | "retardo"
  | "retardo-ascendente"
  | "apojatura"
  | "escapada"
  | "antecipacao"
  | "nao-classificada"
  | "retardo-sem-resolucao";

export const NCT_PT: Record<NctKind, string> = {
  passagem: "Nota de passagem",
  bordadura: "Bordadura",
  retardo: "Retardo",
  "retardo-ascendente": "Retardo ascendente",
  apojatura: "Apojatura",
  escapada: "Escapada",
  antecipacao: "Antecipação",
  "nao-classificada": "Dissonância sem preparação ou resolução reconhecida",
  "retardo-sem-resolucao": "Retardo sem resolução por grau",
};

export interface NctAnalysis {
  readonly kind: NctKind;
  readonly voice: VoiceId;
  readonly pitch: Pitch;
  readonly accented: boolean;
  readonly sonority: VoicedSonority;
  readonly event: TimedEvent;
  readonly prev: Pitch | null;
  readonly next: Pitch | null;
  /** Para retardos: intervalo com o baixo antes e depois da resolução (ex.: "4–3"). */
  readonly figure?: string;
}

const step = (a: Pitch | null, b: Pitch | null) => !!a && !!b && intervalBetween(a, b).number === 2 && intervalBetween(a, b).semitones > 0;
const dirOf = (a: Pitch, b: Pitch) => intervalBetween(a, b).direction;
/** A classe de altura pertence às notas soando de uma sonoridade com harmonia reconhecida. */
const containsPc = (chord: ChordIdentification | null, p: Pitch, voicing: readonly (Pitch | null)[]) =>
  !!chord && voicing.some((q) => q && q.step === p.step && q.alter === p.alter);

/**
 * Classifica as notas estranhas de uma partitura pelo contexto melódico e métrico.
 * Determinístico; cada evento é classificado uma vez (na primeira sonoridade em que é estranho).
 */
export function analyzeNonChordTones(ctx: ValidationContext): NctAnalysis[] {
  const out: NctAnalysis[] = [];
  const seen = new Set<string>();
  const bt = beatTicks(ctx.score.timeSignature);
  const bassVoice = ctx.voices[ctx.voices.length - 1] as VoiceId;
  ctx.sonorities.forEach((s) => {
    for (const v of s.nonChordVoices) {
      const te = s.events.get(v);
      const pitch = s.pitches.get(v);
      if (!te || !pitch || seen.has(te.event.id)) continue;
      seen.add(te.event.id);
      const tl = ctx.timelines.get(v) ?? [];
      const prevEv = tl[te.index - 1]?.event;
      const nextEv = tl[te.index + 1]?.event;
      const prev = prevEv && prevEv.kind === "note" ? prevEv.pitch : null;
      const next = nextEv && nextEv.kind === "note" ? nextEv.pitch : null;
      const attacked = s.sonority.voices.get(v)?.attacked ?? false;
      // Acentuada: tempo forte do compasso, ou início de tempo quando a nota é mais curta que o tempo.
      const accented = isStrongBeat(s.sonority.onset, ctx.score.timeSignature) || (te.end - te.onset < bt && s.sonority.onset % bt === 0);
      const held = !attacked || (!!prev && samePitch(prev, pitch));
      const bass = s.pitches.get(bassVoice);
      let kind: NctKind;
      let figure: string | undefined;
      if (held) {
        // preparado: retardo se resolve por grau
        if (next && step(pitch, next)) {
          kind = dirOf(pitch, next) === -1 ? "retardo" : "retardo-ascendente";
          if (bass && v !== bassVoice) {
            const a = simpleNumber(intervalBetween(bass, pitch).number);
            const nextSon = ctx.sonorities.find((x) => x.sonority.onset === tl[te.index + 1]!.onset);
            const nb = nextSon?.pitches.get(bassVoice) ?? bass;
            const b = simpleNumber(intervalBetween(nb, next).number);
            const label = (n: number, orig: number) => (orig > 8 && n === 2 ? 9 : n);
            figure = `${label(a, intervalBetween(bass, pitch).number)}–${b === 1 ? 8 : b}`;
          }
        } else kind = "retardo-sem-resolucao";
      } else if (prev && next && step(prev, pitch) && step(pitch, next)) {
        kind = dirOf(prev, pitch) === dirOf(pitch, next) ? "passagem" : "bordadura";
      } else if (next && samePitch(pitch, next) && !accented) {
        const nextSon = ctx.sonorities.find((x) => x.sonority.onset === tl[te.index + 1]!.onset);
        kind = nextSon && containsPc(nextSon.harmony, pitch, [...nextSon.pitches.values()]) ? "antecipacao" : "nao-classificada";
      } else if (next && step(pitch, next) && (!prev || !step(prev, pitch))) {
        kind = "apojatura";
      } else if (prev && next && step(prev, pitch) && !step(pitch, next) && dirOf(prev, pitch) !== dirOf(pitch, next) && !accented) {
        kind = "escapada";
      } else kind = "nao-classificada";
      out.push({ kind, voice: v, pitch, accented, sonority: s, event: te, prev, next, ...(figure ? { figure } : {}) });
    }
  });
  return out;
}

const EXPLANATIONS: Record<NctKind, string> = {
  passagem: "Nota que liga, por grau conjunto e na mesma direção, duas notas do acorde. É a dissonância mais natural da escrita vocal.",
  bordadura: "Nota que sai de uma nota do acorde por grau conjunto e volta a ela (ou a outra nota do acorde) na direção oposta.",
  retardo: "Nota preparada no acorde anterior, mantida enquanto a harmonia muda e resolvida descendo por grau — preparação, dissonância, resolução.",
  "retardo-ascendente": "Retardo resolvido para cima (retardação). Comum quando a nota resolve na sensível ou na tônica.",
  apojatura: "Nota estranha atingida por salto (ou sem preparação) e resolvida por grau conjunto. Expressiva, especialmente em tempo forte.",
  escapada: "Nota que sai por grau de uma nota do acorde e abandona a dissonância por salto na direção oposta, em tempo fraco.",
  antecipacao: "Nota do acorde seguinte que soa antes da mudança de harmonia, em tempo fraco.",
  "nao-classificada":
    "Na prática comum, toda dissonância é preparada e/ou resolvida por grau conjunto. Esta nota não se encaixa em nenhum padrão reconhecido (passagem, bordadura, retardo, apojatura, escapada, antecipação).",
  "retardo-sem-resolucao": "A nota foi preparada (retardo), mas não resolve por grau conjunto: a tensão fica sem resolução.",
};

export const nonChordToneRule: Rule = {
  meta: {
    id: "harmonia.notas-estranhas",
    name: "Notas estranhas ao acorde",
    category: "escolha-estetica",
    severityByStyle: { "coral-tradicional": "info", "coral-contemporaneo": "info", "popular-a-cappella": "info" },
    summary: "Classifica notas estranhas (passagem, bordadura, retardo, apojatura, escapada, antecipação) e aponta dissonâncias sem tratamento.",
  },
  check(ctx, emit) {
    const key = ctx.score.key;
    const style = ctx.config.style;
    for (const n of analyzeNonChordTones(ctx)) {
      const problem = n.kind === "nao-classificada" || n.kind === "retardo-sem-resolucao";
      const harm = n.sonority.harmony ? romanNumeral(n.sonority.harmony, key) : "?";
      const ctxText = [n.prev && `vem de ${formatPitch(n.prev)}`, n.next && `vai para ${formatPitch(n.next)}`].filter(Boolean).join(", ");
      const severity = problem ? (style === "coral-tradicional" ? "alerta" : style === "coral-contemporaneo" ? "sugestao" : "info") : "info";
      emit({
        onset: n.sonority.sonority.onset,
        measure: n.sonority.sonority.measure,
        beat: n.sonority.sonority.beat,
        voices: [n.voice],
        events: [n.event],
        message: `${NCT_PT[n.kind]}${n.figure ? ` ${n.figure}` : ""}${n.accented ? " (acentuada)" : ""} em ${ctx.voiceName(n.voice)}: ${formatPitch(n.pitch)} sobre ${harm}${ctxText ? ` (${ctxText})` : ""}.`,
        explanation: EXPLANATIONS[n.kind],
        suggestions: problem
          ? ["Prepare a dissonância na mesma voz (nota comum ao acorde anterior) ou chegue a ela por grau.", "Resolva por grau conjunto — em geral descendente.", "Ou troque a nota por um membro do acorde."]
          : [],
        exceptions: problem
          ? "Estilos contemporâneos e populares usam dissonâncias livres (notas acrescentadas, clusters). Se for intencional, registre a intenção nas notas do arranjo."
          : "Classificação descritiva — não é um erro. Verifique se a dissonância tem o efeito expressivo desejado e se é cantável.",
        evidence: { tipo: n.kind, acentuada: n.accented, harmonia: harm, ...(n.figure ? { figura: n.figure } : {}) },
        severity,
        category: problem ? "convencao-estilistica" : "escolha-estetica",
        key: n.event.event.id,
      });
    }
  },
};
