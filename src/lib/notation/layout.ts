import { computeDisplayedAccidentals } from "@/domain/music/accidentals";
import { measureTicks } from "@/domain/music/duration";
import { type Clef, type VoiceId, getFormation, writtenPitch } from "@/domain/music/formations";
import { keyFifths } from "@/domain/music/key";
import type { Alter, Pitch } from "@/domain/music/pitch";
import { type Score, type TimedEvent, voiceTimeline } from "@/domain/music/score";

/**
 * Preparação independente de biblioteca: transforma o modelo em dados de notação
 * (altura ESCRITA, acidente a exibir, compasso, haste). Testável sem DOM.
 */
export interface NotationEvent {
  readonly timed: TimedEvent;
  readonly voice: VoiceId;
  readonly staff: 0 | 1;
  readonly stem: 1 | -1;
  readonly clef: Clef;
  /** Altura escrita (null para pausa). */
  readonly written: Pitch | null;
  /** Acidente a desenhar (null = nenhum). */
  readonly accidental: Alter | null;
  /** Índice do compasso (0-based) em que o evento começa. */
  readonly measureIndex: number;
  readonly tiedFromPrevious: boolean;
}

export interface NotationMeasure {
  readonly index: number;
  /** Eventos por voz neste compasso, na ordem. */
  readonly voices: ReadonlyMap<VoiceId, readonly NotationEvent[]>;
}

export function prepareNotation(score: Score): NotationMeasure[] {
  const formation = getFormation(score.formation);
  const mt = measureTicks(score.timeSignature);
  const fifths = keyFifths(score.key);
  const byVoice = new Map<VoiceId, NotationEvent[]>();
  for (const staffIndex of [0, 1] as const) {
    const staff = formation.staves[staffIndex];
    const entries: Array<{ te: TimedEvent; voice: VoiceId; tiedFromPrevious: boolean }> = [];
    for (const voice of staff.voices) {
      const part = score.parts.find((p) => p.voice === voice);
      if (!part) continue;
      const tl = voiceTimeline(part, score.timeSignature);
      tl.forEach((te, i) => {
        const prev = tl[i - 1];
        entries.push({ te, voice, tiedFromPrevious: !!(prev && prev.event.kind === "note" && prev.event.tieToNext) });
      });
    }
    const accidentals = computeDisplayedAccidentals(
      entries
        .filter((e) => e.te.event.kind === "note")
        .map((e) => ({
          id: e.te.event.id,
          onset: e.te.onset,
          measure: Math.floor(e.te.onset / mt),
          pitch: writtenPitch((e.te.event as { pitch: Pitch }).pitch, staff.clef),
          tiedFromPrevious: e.tiedFromPrevious,
        })),
      fifths,
    );
    for (const e of entries) {
      const spec = formation.voices.find((v) => v.id === e.voice)!;
      const ne: NotationEvent = {
        timed: e.te,
        voice: e.voice,
        staff: staffIndex,
        stem: spec.stem,
        clef: staff.clef,
        written: e.te.event.kind === "note" ? writtenPitch(e.te.event.pitch, staff.clef) : null,
        accidental: accidentals.get(e.te.event.id) ?? null,
        measureIndex: Math.floor(e.te.onset / mt),
        tiedFromPrevious: e.tiedFromPrevious,
      };
      const list = byVoice.get(e.voice) ?? [];
      list.push(ne);
      byVoice.set(e.voice, list);
    }
  }
  const measures: NotationMeasure[] = [];
  for (let m = 0; m < score.measureCount; m++) {
    const voices = new Map<VoiceId, NotationEvent[]>();
    for (const v of formation.voices) voices.set(v.id, (byVoice.get(v.id) ?? []).filter((e) => e.measureIndex === m));
    measures.push({ index: m, voices });
  }
  return measures;
}

export function vexKey(p: Pitch): string {
  return `${p.step.toLowerCase()}/${p.octave}`;
}

export function vexAccidental(a: Alter): string {
  return { [-2]: "bb", [-1]: "b", 0: "n", 1: "#", 2: "##" }[a];
}

export function vexClef(clef: Clef): "treble" | "bass" {
  return clef === "bass" ? "bass" : "treble";
}

/** Posição vertical (em altura escrita) das pausas de cada voz, para não colidirem. */
export function restKey(clef: Clef, stem: 1 | -1): string {
  if (clef === "bass") return stem === 1 ? "f/3" : "a/2";
  return stem === 1 ? "d/5" : "f/4";
}
