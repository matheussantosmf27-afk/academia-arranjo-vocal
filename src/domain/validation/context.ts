import { type ChordIdentification, identifyChord } from "../music/chord";
import { type FormationSpec, type PitchRange, type VoiceId, getFormation } from "../music/formations";
import type { Pitch } from "../music/pitch";
import { type Score, type Sonority, type TimedEvent, sonorities, voiceTimeline } from "../music/score";
import type { ValidationConfig } from "./types";

export interface VoicedSonority {
  readonly sonority: Sonority;
  /** Altura soando em cada voz (null = pausa). */
  readonly pitches: ReadonlyMap<VoiceId, Pitch | null>;
  /** Evento soando em cada voz (para localizar diagnósticos). */
  readonly events: ReadonlyMap<VoiceId, TimedEvent | null>;
  /** Acorde identificado com todas as notas soando (null se não terciano ou incompleto). */
  readonly chord: ChordIdentification | null;
  /** Todas as vozes têm nota (sem pausas). */
  readonly complete: boolean;
}

export interface ValidationContext {
  readonly score: Score;
  readonly config: ValidationConfig;
  readonly formation: FormationSpec;
  /** Vozes de cima para baixo. */
  readonly voices: readonly VoiceId[];
  readonly timelines: ReadonlyMap<VoiceId, readonly TimedEvent[]>;
  readonly sonorities: readonly VoicedSonority[];
  rangeOf(voice: VoiceId): PitchRange;
  tessituraOf(voice: VoiceId): PitchRange;
  voiceName(voice: VoiceId): string;
}

export function buildContext(score: Score, config: ValidationConfig): ValidationContext {
  const formation = getFormation(score.formation);
  const voices = formation.voices.map((v) => v.id);
  const timelines = new Map<VoiceId, TimedEvent[]>();
  for (const part of score.parts) timelines.set(part.voice, voiceTimeline(part, score.timeSignature));

  const voiced: VoicedSonority[] = sonorities(score).map((s) => {
    const pitches = new Map<VoiceId, Pitch | null>();
    const events = new Map<VoiceId, TimedEvent | null>();
    for (const v of voices) {
      const entry = s.voices.get(v) ?? null;
      events.set(v, entry ? entry.timed : null);
      pitches.set(v, entry && entry.timed.event.kind === "note" ? entry.timed.event.pitch : null);
    }
    const sounding = [...pitches.values()].filter((p): p is Pitch => p !== null);
    return {
      sonority: s,
      pitches,
      events,
      chord: sounding.length >= 2 ? identifyChord(sounding) : null,
      complete: sounding.length === voices.length,
    };
  });

  const specOf = (voice: VoiceId) => {
    const spec = formation.voices.find((v) => v.id === voice);
    if (!spec) throw new Error(`Voz ${voice} fora da formação`);
    return spec;
  };

  return {
    score,
    config,
    formation,
    voices,
    timelines,
    sonorities: voiced,
    rangeOf: (v) => config.rangeOverrides?.[v]?.range ?? specOf(v).range,
    tessituraOf: (v) => config.rangeOverrides?.[v]?.tessitura ?? specOf(v).tessitura,
    voiceName: (v) => specOf(v).name,
  };
}
