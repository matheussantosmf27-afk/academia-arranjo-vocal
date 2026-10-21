import type { VoiceId } from "../music/formations";
import { type Pitch, toMidi } from "../music/pitch";
import type { TimedEvent } from "../music/score";
import type { ValidationContext, VoicedSonority } from "./context";

export type MotionType = "paralelo" | "semelhante" | "contrario" | "obliquo" | "estatico";

export interface PairStep {
  readonly prev: VoicedSonority;
  readonly cur: VoicedSonority;
  readonly upperFrom: Pitch;
  readonly upperTo: Pitch;
  readonly lowerFrom: Pitch;
  readonly lowerTo: Pitch;
  readonly upperEvent: TimedEvent;
  readonly lowerEvent: TimedEvent;
  readonly motion: MotionType;
}

/**
 * Classifica o movimento relativo de duas vozes.
 * "paralelo" = mesma direção e mesmo intervalo em semitons; "semelhante" = mesma direção, intervalo diferente.
 */
export function classifyMotion(u0: Pitch, u1: Pitch, l0: Pitch, l1: Pitch): MotionType {
  const du = toMidi(u1) - toMidi(u0);
  const dl = toMidi(l1) - toMidi(l0);
  if (du === 0 && dl === 0) return "estatico";
  if (du === 0 || dl === 0) return "obliquo";
  if (Math.sign(du) !== Math.sign(dl)) return "contrario";
  return du === dl ? "paralelo" : "semelhante";
}

export const MOTION_PT: Record<MotionType, string> = {
  paralelo: "movimento paralelo",
  semelhante: "movimento direto (semelhante)",
  contrario: "movimento contrário",
  obliquo: "movimento oblíquo",
  estatico: "sem movimento",
};

/** Passos consecutivos em que as duas vozes têm notas e ao menos uma delas ataca nova nota. */
export function pairSteps(ctx: ValidationContext, upper: VoiceId, lower: VoiceId): PairStep[] {
  const out: PairStep[] = [];
  const ss = ctx.sonorities;
  for (let i = 1; i < ss.length; i++) {
    const prev = ss[i - 1] as VoicedSonority;
    const cur = ss[i] as VoicedSonority;
    const u0 = prev.pitches.get(upper);
    const u1 = cur.pitches.get(upper);
    const l0 = prev.pitches.get(lower);
    const l1 = cur.pitches.get(lower);
    const ue = cur.events.get(upper);
    const le = cur.events.get(lower);
    if (!u0 || !u1 || !l0 || !l1 || !ue || !le) continue;
    const attackedU = cur.sonority.voices.get(upper)?.attacked ?? false;
    const attackedL = cur.sonority.voices.get(lower)?.attacked ?? false;
    if (!attackedU && !attackedL) continue;
    out.push({
      prev,
      cur,
      upperFrom: u0,
      upperTo: u1,
      lowerFrom: l0,
      lowerTo: l1,
      upperEvent: ue,
      lowerEvent: le,
      motion: classifyMotion(u0, u1, l0, l1),
    });
  }
  return out;
}

/** Todos os pares de vozes (superior, inferior), de cima para baixo. */
export function voicePairs(voices: readonly VoiceId[]): Array<[VoiceId, VoiceId]> {
  const pairs: Array<[VoiceId, VoiceId]> = [];
  for (let i = 0; i < voices.length; i++) {
    for (let j = i + 1; j < voices.length; j++) pairs.push([voices[i] as VoiceId, voices[j] as VoiceId]);
  }
  return pairs;
}
