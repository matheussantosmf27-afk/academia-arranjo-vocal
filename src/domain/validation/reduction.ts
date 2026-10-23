import { type ChordIdentification, chordMembers, identifyChord } from "../music/chord";
import type { VoiceId } from "../music/formations";
import { intervalBetween } from "../music/interval";
import { type Pitch, toMidi } from "../music/pitch";
import type { TimedEvent } from "../music/score";

/**
 * Redução harmônica de uma sonoridade: quando as notas soando não formam um acorde
 * terciano, procura o acorde subjacente removendo uma ou duas vozes (candidatas a
 * notas estranhas). A escolha é determinística e prefere:
 *   1) remover menos notas;
 *   2) notas que chegam ou saem por grau conjunto (comportamento típico de nota estranha);
 *   3) não remover o baixo;
 *   4) acordes mais completos.
 * Além das notas restantes, considera:
 *   - a nota de RESOLUÇÃO das removidas que resolvem por grau (retardo 4–3: a terça ainda não soou);
 *   - a PERSISTÊNCIA da harmonia anterior, se as notas restantes pertencem a ela (antecipação, escapada).
 * Nunca "força" uma leitura: se nada funcionar, devolve null.
 */
export interface Reduction {
  readonly chord: ChordIdentification;
  readonly nonChordVoices: readonly VoiceId[];
}

export interface MelodicNeighbors {
  readonly prev: Pitch | null;
  readonly next: Pitch | null;
}

function combos<T>(items: readonly T[], k: number): T[][] {
  if (k === 0) return [[]];
  const out: T[][] = [];
  items.forEach((it, i) => {
    for (const rest of combos(items.slice(i + 1), k - 1)) out.push([it, ...rest]);
  });
  return out;
}

const isStepTo = (a: Pitch | null, b: Pitch): boolean => !!a && intervalBetween(a, b).number === 2;

export function reduceSonority(
  pitches: ReadonlyMap<VoiceId, Pitch | null>,
  order: readonly VoiceId[],
  neighbors: (voice: VoiceId) => MelodicNeighbors,
  previousHarmony: ChordIdentification | null = null,
  attacked: (voice: VoiceId) => boolean = () => true,
): Reduction | null {
  const sounding = order.filter((v) => pitches.get(v));
  // Sonoridade incompleta (ex.: sem terça) formada só por notas da harmonia anterior: continua essa harmonia.
  if (previousHarmony) {
    const prevMembers = chordMembers(previousHarmony);
    if (sounding.length >= 2 && sounding.every((v) => {
      const p = pitches.get(v) as Pitch;
      return prevMembers.some((m) => m.step === p.step && m.alter === p.alter);
    })) return { chord: previousHarmony, nonChordVoices: [] };
  }
  if (sounding.length < 3) return null;
  const bass = sounding[sounding.length - 1];
  let best: { r: Reduction; score: number } | null = null;
  for (const k of [1, 2]) {
    if (sounding.length - k < 2) break;
    for (const removed of combos(sounding, k)) {
      const rest = sounding.filter((v) => !removed.includes(v)).map((v) => pitches.get(v) as Pitch);
      let chord = identifyChord(rest);
      let score = 0;
      if (!chord) {
        // acorde completado pela resolução das notas removidas
        const resolutions = removed.map((v) => neighbors(v).next).filter((n, i): n is Pitch => !!n && isStepTo(pitches.get(removed[i] as VoiceId) as Pitch, n));
        if (resolutions.length) chord = identifyChord([...rest, ...resolutions]);
        if (chord) {
          const bassPitch = rest.reduce((lo, p) => (toMidi(p) < toMidi(lo) ? p : lo));
          chord = { ...chord, bass: { step: bassPitch.step, alter: bassPitch.alter } };
          score -= 1;
        }
      }
      if (previousHarmony) {
        const members = chordMembers(previousHarmony);
        const inPrevious = rest.every((p) => members.some((m) => m.step === p.step && m.alter === p.alter));
        const restHeld = sounding.filter((v) => !removed.includes(v)).every((v) => !attacked(v));
        if (inPrevious && restHeld) {
          // nenhuma nota do acorde foi rearticulada: a harmonia anterior continua (antecipação, escapada…)
          chord = previousHarmony;
          score += 3;
        } else if (!chord && inPrevious) {
          chord = previousHarmony;
          score -= 2;
        }
      }
      if (!chord) continue;
      // uma nota do próprio acorde nunca é "estranha"
      const members = chordMembers(chord);
      if (removed.some((v) => {
        const p = pitches.get(v) as Pitch;
        return members.some((m) => m.step === p.step && m.alter === p.alter);
      })) continue;
      for (const v of removed) {
        const p = pitches.get(v) as Pitch;
        const n = neighbors(v);
        if (isStepTo(n.prev, p)) score += 2;
        if (n.next && intervalBetween(p, n.next).number === 2) score += 2;
        if (n.prev && n.prev.step === p.step && n.prev.alter === p.alter && n.prev.octave === p.octave) score += 2; // preparação (retardo)
        if (v === bass) score -= 3;
      }
      score -= chord.missing.length;
      if (!best || score > best.score) best = { r: { chord, nonChordVoices: removed }, score };
    }
    if (best) break; // prefere remover menos notas
  }
  return best?.r ?? null;
}

/** Notas vizinhas de um evento na mesma voz (null se pausa ou início/fim). */
export function melodicNeighbors(timeline: readonly TimedEvent[], te: TimedEvent | null | undefined): MelodicNeighbors {
  if (!te) return { prev: null, next: null };
  const p = timeline[te.index - 1]?.event;
  const n = timeline[te.index + 1]?.event;
  return { prev: p && p.kind === "note" ? p.pitch : null, next: n && n.kind === "note" ? n.pitch : null };
}

/**
 * "Sétima" que é só movimento melódico: se exatamente UMA voz foi rearticulada, ela chega
 * por grau conjunto e as demais seguram notas da harmonia anterior, a sonoridade é a
 * harmonia anterior com uma nota estranha (ex.: G–A–B–C no soprano sobre Dó maior
 * formaria "vi⁶₅" e "I7M"). Prevalece a leitura de nota estranha.
 */
export function passingSeventhReading(
  pitches: ReadonlyMap<VoiceId, Pitch | null>,
  order: readonly VoiceId[],
  previousHarmony: ChordIdentification | null,
  attacked: (voice: VoiceId) => boolean,
  neighbors: (voice: VoiceId) => MelodicNeighbors,
): Reduction | null {
  if (!previousHarmony) return null;
  const sounding = order.filter((v) => pitches.get(v));
  const moved = sounding.filter(attacked);
  if (moved.length !== 1) return null;
  const v = moved[0] as VoiceId;
  const p = pitches.get(v) as Pitch;
  if (!isStepTo(neighbors(v).prev, p)) return null;
  const members = chordMembers(previousHarmony);
  if (members.some((m) => m.step === p.step && m.alter === p.alter)) return null;
  const rest = sounding.filter((x) => x !== v).map((x) => pitches.get(x) as Pitch);
  if (!rest.every((q) => members.some((m) => m.step === q.step && m.alter === q.alter))) return null;
  return { chord: previousHarmony, nonChordVoices: [v] };
}
