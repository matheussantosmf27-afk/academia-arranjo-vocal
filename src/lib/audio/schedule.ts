import { PPQ } from "@/domain/music/duration";
import type { VoiceId } from "@/domain/music/formations";
import { toMidi } from "@/domain/music/pitch";
import { type Score, voiceTimeline } from "@/domain/music/score";

/** Nota a ser tocada, em ticks (independente de andamento). Notas ligadas são fundidas. */
export interface PlaybackNote {
  readonly voice: VoiceId;
  readonly midi: number;
  readonly onset: number;
  readonly end: number;
  readonly eventIds: readonly string[];
}

export function buildPlaybackNotes(score: Score, voices: ReadonlySet<VoiceId>): PlaybackNote[] {
  const out: PlaybackNote[] = [];
  for (const part of score.parts) {
    if (!voices.has(part.voice)) continue;
    let pending: { midi: number; onset: number; end: number; ids: string[] } | null = null;
    for (const te of voiceTimeline(part, score.timeSignature)) {
      const ev = te.event;
      if (ev.kind !== "note") {
        if (pending) out.push({ voice: part.voice, midi: pending.midi, onset: pending.onset, end: pending.end, eventIds: pending.ids });
        pending = null;
        continue;
      }
      const midi = toMidi(ev.pitch);
      if (pending && pending.midi === midi && pending.end === te.onset) {
        pending.end = te.end;
        pending.ids.push(ev.id);
      } else {
        if (pending) out.push({ voice: part.voice, midi: pending.midi, onset: pending.onset, end: pending.end, eventIds: pending.ids });
        pending = { midi, onset: te.onset, end: te.end, ids: [ev.id] };
      }
      if (!ev.tieToNext) {
        out.push({ voice: part.voice, midi: pending.midi, onset: pending.onset, end: pending.end, eventIds: pending.ids });
        pending = null;
      }
    }
    if (pending) out.push({ voice: part.voice, midi: pending.midi, onset: pending.onset, end: pending.end, eventIds: pending.ids });
  }
  return out.sort((a, b) => a.onset - b.onset || b.midi - a.midi);
}

export function ticksToSeconds(ticks: number, bpm: number): number {
  return (ticks / PPQ) * (60 / bpm);
}
