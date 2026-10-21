import type { DurationType } from "@/domain/music/duration";
import { type VoiceId, getFormation } from "@/domain/music/formations";
import { keySignatureAlters, keyFifths } from "@/domain/music/key";
import { type Pitch, type Step, toMidi } from "@/domain/music/pitch";
import type { Score } from "@/domain/music/score";
import { voiceTimeline } from "@/domain/music/score";

/** Altura padrão ao transformar pausa em nota: centro da tessitura, ajustada à armadura. */
export function defaultPitchFor(score: Score, voice: VoiceId): Pitch {
  const spec = getFormation(score.formation).voices.find((v) => v.id === voice)!;
  const center = Math.round((toMidi(spec.tessitura.low) + toMidi(spec.tessitura.high)) / 2);
  return nearestWithLetter(score, "C", center);
}

/** Nota com a letra pedida (alteração da armadura) mais próxima da referência. */
export function nearestWithLetter(score: Score, step: Step, referenceMidi: number): Pitch {
  const alter = keySignatureAlters(keyFifths(score.key))[step];
  let best: Pitch | null = null;
  for (let octave = 1; octave <= 7; octave++) {
    const p: Pitch = { step, alter, octave };
    if (!best || Math.abs(toMidi(p) - referenceMidi) < Math.abs(toMidi(best) - referenceMidi)) best = p;
  }
  return best!;
}

/** Evento vizinho (anterior/seguinte) na mesma voz. */
export function neighborEvent(score: Score, eventId: string, delta: 1 | -1): string | null {
  for (const part of score.parts) {
    const i = part.events.findIndex((e) => e.id === eventId);
    if (i >= 0) return part.events[i + delta]?.id ?? null;
  }
  return null;
}

/** Evento soando no mesmo instante na voz vizinha (acima/abaixo). */
export function verticalNeighbor(score: Score, eventId: string, delta: 1 | -1): string | null {
  const order = getFormation(score.formation).voices.map((v) => v.id);
  for (const part of score.parts) {
    const tl = voiceTimeline(part, score.timeSignature);
    const te = tl.find((t) => t.event.id === eventId);
    if (!te) continue;
    const target = order[order.indexOf(part.voice) + delta];
    if (!target) return null;
    const other = score.parts.find((p) => p.voice === target)!;
    const hit = voiceTimeline(other, score.timeSignature).find((t) => t.onset <= te.onset && te.onset < t.end);
    return hit?.event.id ?? null;
  }
  return null;
}

export const DURATION_KEYS: Record<string, DurationType> = { "1": "w", "2": "h", "3": "q", "4": "8", "5": "16" };
