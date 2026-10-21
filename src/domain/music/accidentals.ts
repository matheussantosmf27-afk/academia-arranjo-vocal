import { keySignatureAlters } from "./key";
import type { Alter, Pitch } from "./pitch";

/**
 * Acidentes a exibir numa pauta, seguindo a convenção usual:
 * - a armadura define o estado inicial de cada letra (em todas as oitavas);
 * - um acidente vale até o fim do compasso, para a mesma linha/espaço (letra + oitava escrita);
 * - vozes que compartilham a pauta compartilham o estado;
 * - notas ligadas vindas do compasso anterior não repetem o acidente (Gould, *Behind Bars*).
 * Retorna, por ID de evento, o acidente a desenhar (null = nenhum).
 */
export interface StaffNoteForAccidentals {
  readonly id: string;
  readonly onset: number;
  readonly measure: number;
  /** Altura ESCRITA. */
  readonly pitch: Pitch;
  readonly tiedFromPrevious: boolean;
}

export function computeDisplayedAccidentals(
  notes: readonly StaffNoteForAccidentals[],
  keyFifths: number,
): Map<string, Alter | null> {
  const sig = keySignatureAlters(keyFifths);
  const result = new Map<string, Alter | null>();
  const sorted = [...notes].sort((a, b) => a.onset - b.onset || a.id.localeCompare(b.id));
  let currentMeasure = -1;
  let state = new Map<string, Alter>();
  for (const n of sorted) {
    if (n.measure !== currentMeasure) {
      currentMeasure = n.measure;
      state = new Map();
    }
    const slot = `${n.pitch.step}${n.pitch.octave}`;
    const current = state.get(slot) ?? sig[n.pitch.step];
    if (n.tiedFromPrevious && !state.has(slot)) {
      // Nota ligada vinda do compasso anterior: não repete o acidente, e o estado do
      // compasso não muda — uma nota posterior não ligada precisa do acidente de novo.
      result.set(n.id, null);
      continue;
    }
    if (current === n.pitch.alter) {
      result.set(n.id, null);
    } else {
      result.set(n.id, n.pitch.alter);
      state.set(slot, n.pitch.alter);
    }
  }
  return result;
}
