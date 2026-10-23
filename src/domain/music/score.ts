import { type Duration, type TimeSignature, durationTicks, measureTicks, metricPosition } from "./duration";
import { type FormationId, type VoiceId, getFormation } from "./formations";
import type { Key } from "./key";
import type { Pitch } from "./pitch";

/**
 * Modelo de partitura. Fonte única de verdade para notação, áudio, validação e persistência.
 *
 * - Cada voz é uma sequência de eventos (nota ou pausa) contígua; a posição
 *   métrica de cada evento é DERIVADA da soma das durações anteriores
 *   (ver `voiceTimeline`). Isso elimina sobreposições e lacunas por construção.
 * - Alturas são SONORAS. A notação deriva a altura escrita pela clave.
 */
export const SCORE_SCHEMA_VERSION = 1 as const;

export type Articulation = "staccato" | "accent" | "tenuto" | "fermata";
export type Dynamic = "pp" | "p" | "mp" | "mf" | "f" | "ff";

export interface NoteEvent {
  readonly id: string;
  readonly kind: "note";
  readonly pitch: Pitch;
  readonly duration: Duration;
  /** Liga de prolongamento para o próximo evento da mesma voz (mesma altura). */
  readonly tieToNext?: boolean;
  readonly lyric?: string;
  readonly articulations?: readonly Articulation[];
  readonly dynamic?: Dynamic;
}

export interface RestEvent {
  readonly id: string;
  readonly kind: "rest";
  readonly duration: Duration;
}

export type MusicEvent = NoteEvent | RestEvent;

export interface VoicePart {
  readonly voice: VoiceId;
  readonly events: readonly MusicEvent[];
}

export type StyleProfileId = "coral-tradicional" | "coral-contemporaneo" | "popular-a-cappella";

export interface ScoreMetadata {
  readonly composer?: string;
  readonly arranger?: string;
  readonly style: StyleProfileId;
  readonly notes?: string;
}

export interface Score {
  readonly schemaVersion: typeof SCORE_SCHEMA_VERSION;
  readonly id: string;
  readonly title: string;
  readonly formation: FormationId;
  readonly key: Key;
  readonly timeSignature: TimeSignature;
  readonly tempoBpm: number;
  readonly measureCount: number;
  /** Vozes na ordem da formação, de cima para baixo. */
  readonly parts: readonly VoicePart[];
  readonly metadata: ScoreMetadata;
}

export interface TimedEvent {
  readonly event: MusicEvent;
  readonly voice: VoiceId;
  readonly index: number;
  readonly onset: number;
  readonly end: number;
  /** Compasso (1-based) e tempo (1-based, fracionário) do onset. */
  readonly measure: number;
  readonly beat: number;
}

export function voiceTimeline(part: VoicePart, ts: TimeSignature): TimedEvent[] {
  let onset = 0;
  return part.events.map((event, index) => {
    const len = durationTicks(event.duration);
    const pos = metricPosition(onset, ts);
    const te: TimedEvent = { event, voice: part.voice, index, onset, end: onset + len, measure: pos.measure, beat: pos.beat };
    onset += len;
    return te;
  });
}

export function partLengthTicks(part: VoicePart): number {
  return part.events.reduce((sum, e) => sum + durationTicks(e.duration), 0);
}

export function scoreLengthTicks(score: Score): number {
  return score.measureCount * measureTicks(score.timeSignature);
}

export function getPart(score: Score, voice: VoiceId): VoicePart {
  const part = score.parts.find((p) => p.voice === voice);
  if (!part) throw new Error(`Voz ${voice} ausente na partitura`);
  return part;
}

export function findEvent(score: Score, eventId: string): { part: VoicePart; index: number; event: MusicEvent } | null {
  for (const part of score.parts) {
    const index = part.events.findIndex((e) => e.id === eventId);
    if (index >= 0) return { part, index, event: part.events[index] as MusicEvent };
  }
  return null;
}

/**
 * Sonoridade vertical: estado de todas as vozes num instante em que pelo menos
 * uma voz ataca uma nota ou pausa.
 */
export interface Sonority {
  readonly onset: number;
  readonly measure: number;
  readonly beat: number;
  /** Por voz: o evento soando no instante (null se a voz já terminou). */
  readonly voices: ReadonlyMap<VoiceId, { readonly timed: TimedEvent; readonly attacked: boolean } | null>;
}

export function sonorities(score: Score): Sonority[] {
  const timelines = new Map<VoiceId, TimedEvent[]>();
  const onsets = new Set<number>();
  for (const part of score.parts) {
    const tl = voiceTimeline(part, score.timeSignature);
    timelines.set(part.voice, tl);
    for (const te of tl) onsets.add(te.onset);
  }
  const sorted = [...onsets].sort((a, b) => a - b);
  return sorted.map((onset) => {
    const voices = new Map<VoiceId, { timed: TimedEvent; attacked: boolean } | null>();
    for (const part of score.parts) {
      const tl = timelines.get(part.voice) ?? [];
      const te = tl.find((t) => t.onset <= onset && onset < t.end);
      voices.set(part.voice, te ? { timed: te, attacked: te.onset === onset } : null);
    }
    const pos = metricPosition(onset, score.timeSignature);
    return { onset, measure: pos.measure, beat: pos.beat, voices };
  });
}

/** Altura soando numa voz numa sonoridade (null para pausa/ausência). */
export function pitchAt(s: Sonority, voice: VoiceId): Pitch | null {
  const v = s.voices.get(voice);
  if (!v || v.timed.event.kind !== "note") return null;
  return v.timed.event.pitch;
}

export function voiceOrder(score: Score): VoiceId[] {
  return getFormation(score.formation).voices.map((v) => v.id);
}
