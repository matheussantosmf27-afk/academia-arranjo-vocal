import { transposeByInterval } from "./interval";
import {
  type Alter,
  type Pitch,
  type PitchClass,
  type Step,
  STEP_NAMES_PT,
  alterSymbol,
  stepIndex,
  stepAt,
  pitchClassNumber,
} from "./pitch";

export type Mode = "major" | "minor";

export interface Key {
  readonly tonic: PitchClass;
  readonly mode: Mode;
}

const FIFTHS_OF_STEP: Readonly<Record<Step, number>> = {
  F: -1,
  C: 0,
  G: 1,
  D: 2,
  A: 3,
  E: 4,
  B: 5,
};

/** Ordem dos sustenidos na armadura; os bemóis seguem a ordem inversa. */
const SHARP_ORDER: readonly Step[] = ["F", "C", "G", "D", "A", "E", "B"];

/** Número de quintas da armadura: positivo = sustenidos, negativo = bemóis. */
export function keyFifths(key: Key): number {
  const base = FIFTHS_OF_STEP[key.tonic.step] + key.tonic.alter * 7;
  return key.mode === "major" ? base : base - 3;
}

/** Alterações de cada letra impostas pela armadura. */
export function keySignatureAlters(fifths: number): Record<Step, Alter> {
  const result: Record<Step, Alter> = { C: 0, D: 0, E: 0, F: 0, G: 0, A: 0, B: 0 };
  if (fifths > 0) {
    for (let i = 0; i < Math.min(fifths, 7); i++) result[SHARP_ORDER[i] as Step] = 1;
  } else if (fifths < 0) {
    for (let i = 0; i < Math.min(-fifths, 7); i++) result[SHARP_ORDER[6 - i] as Step] = -1;
  }
  return result;
}

export function isSupportedKey(key: Key): boolean {
  return Math.abs(keyFifths(key)) <= 7;
}

export type MinorForm = "natural" | "harmonic" | "melodic";

/** Escala diatônica grafada a partir da tônica (7 classes de altura). */
export function scale(key: Key, minorForm: MinorForm = "natural"): PitchClass[] {
  const sig = keySignatureAlters(keyFifths(key));
  const start = stepIndex(key.tonic.step);
  const degrees: PitchClass[] = [];
  for (let i = 0; i < 7; i++) {
    const step = stepAt(start + i);
    degrees.push({ step, alter: sig[step] });
  }
  if (key.mode === "minor" && minorForm !== "natural") {
    const raise = (pc: PitchClass): PitchClass => ({ step: pc.step, alter: (pc.alter + 1) as Alter });
    degrees[6] = raise(degrees[6] as PitchClass);
    if (minorForm === "melodic") degrees[5] = raise(degrees[5] as PitchClass);
  }
  return degrees;
}

/**
 * Grau (1–7) de uma classe de altura na tonalidade, com a alteração cromática
 * relativa à escala natural da tonalidade (ex.: sensível em lá menor = grau 7, +1).
 */
export function scaleDegree(pc: PitchClass, key: Key): { degree: number; chromatic: number } {
  const degree = ((stepIndex(pc.step) - stepIndex(key.tonic.step) + 7) % 7) + 1;
  const natural = scale(key, "natural")[degree - 1] as PitchClass;
  return { degree, chromatic: pc.alter - natural.alter };
}

/** Sensível (grau 7 a um semitom da tônica). Em menor, é o 7º grau elevado. */
export function leadingTone(key: Key): PitchClass {
  return scale(key, "harmonic")[6] as PitchClass;
}

export function isLeadingTone(pc: PitchClass, key: Key): boolean {
  const lt = leadingTone(key);
  return pc.step === lt.step && pc.alter === lt.alter;
}

export function keyNamePt(key: Key): string {
  const name = `${STEP_NAMES_PT[key.tonic.step]}${alterSymbol(key.tonic.alter)}`;
  return key.mode === "major" ? `${name} maior` : `${name.toLowerCase()} menor`;
}

/** Nome da tônica no formato aceito pelo VexFlow para armaduras ("Bb", "F#m"). */
export function keyToVexFlowSpec(key: Key): string {
  const acc = key.tonic.alter === 1 ? "#" : key.tonic.alter === -1 ? "b" : "";
  return `${key.tonic.step}${acc}${key.mode === "minor" ? "m" : ""}`;
}

/**
 * Grafa um número MIDI dentro da tonalidade: prefere a nota diatônica; senão,
 * a sensível/7º elevado em menor; senão, sustenidos em tonalidades de sustenido
 * e bemóis em tonalidades de bemol.
 */
export function spellInKey(midi: number, key: Key): Pitch {
  const pc = ((midi % 12) + 12) % 12;
  const candidates = [...scale(key, "natural"), ...scale(key, "harmonic"), ...scale(key, "melodic")];
  const found = candidates.find((c) => pitchClassNumber(c) === pc);
  const fifths = keyFifths(key);
  let chosen: PitchClass;
  if (found) chosen = found;
  else {
    const sharps: Array<[Step, Alter]> = [
      ["C", 0], ["C", 1], ["D", 0], ["D", 1], ["E", 0], ["F", 0],
      ["F", 1], ["G", 0], ["G", 1], ["A", 0], ["A", 1], ["B", 0],
    ];
    const flats: Array<[Step, Alter]> = [
      ["C", 0], ["D", -1], ["D", 0], ["E", -1], ["E", 0], ["F", 0],
      ["G", -1], ["G", 0], ["A", -1], ["A", 0], ["B", -1], ["B", 0],
    ];
    const [step, alter] = (fifths < 0 ? flats : sharps)[pc] as [Step, Alter];
    chosen = { step, alter };
  }
  // Calcula a oitava pela letra: ajusta para que o MIDI resultante seja exatamente `midi`.
  const approxOctave = Math.floor(midi / 12) - 1;
  for (const oct of [approxOctave - 1, approxOctave, approxOctave + 1]) {
    const p: Pitch = { ...chosen, octave: oct };
    if ((oct + 1) * 12 + [0, 2, 4, 5, 7, 9, 11][stepIndex(p.step)]! + p.alter === midi) return p;
  }
  throw new Error(`Não foi possível grafar MIDI ${midi} em ${keyNamePt(key)}`);
}

/** Move uma altura N graus na escala natural da tonalidade (setas ↑/↓ do editor). */
export function moveDiatonic(p: Pitch, steps: number, key: Key): Pitch {
  if (steps === 0) return p;
  const sc = scale(key, "natural");
  const targetIndex = stepIndex(p.step) + steps;
  const step = stepAt(targetIndex);
  const octave = p.octave + Math.floor(targetIndex / 7);
  const inScale = sc.find((d) => d.step === step) as PitchClass;
  return { step, alter: inScale.alter, octave };
}

/** Desloca um semitom mantendo grafia razoável (♯ para cima, ♭ para baixo, sem dobrados). */
export function moveChromatic(p: Pitch, direction: 1 | -1): Pitch {
  if (direction === 1 && p.alter < 1) return { ...p, alter: (p.alter + 1) as Alter };
  if (direction === -1 && p.alter > -1) return { ...p, alter: (p.alter - 1) as Alter };
  return transposeByInterval(p, 2, "m", direction);
}
