/**
 * Altura musical grafada (spelled pitch).
 *
 * Convenções (ver docs/convencoes-musicais.md):
 * - Notação científica: C4 = Dó central = MIDI 60. A4 = 440 Hz = MIDI 69.
 * - A oitava acompanha a LETRA, não o som: B#3 soa como C4 (MIDI 60),
 *   Cb4 soa como B3 (MIDI 59).
 * - Todas as alturas guardadas no modelo de partitura são SONORAS. A altura
 *   escrita é derivada da clave da pauta (ver formations.ts / writtenPitch).
 */

export const STEPS = ["C", "D", "E", "F", "G", "A", "B"] as const;
export type Step = (typeof STEPS)[number];
export type Alter = -2 | -1 | 0 | 1 | 2;

export interface PitchClass {
  readonly step: Step;
  readonly alter: Alter;
}

export interface Pitch extends PitchClass {
  readonly octave: number;
}

const STEP_SEMITONES: Readonly<Record<Step, number>> = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

export const STEP_NAMES_PT: Readonly<Record<Step, string>> = {
  C: "Dó",
  D: "Ré",
  E: "Mi",
  F: "Fá",
  G: "Sol",
  A: "Lá",
  B: "Si",
};

const ALTER_SYMBOLS: Readonly<Record<Alter, string>> = {
  [-2]: "𝄫",
  [-1]: "♭",
  0: "",
  1: "♯",
  2: "𝄪",
};

const ALTER_ASCII: Readonly<Record<Alter, string>> = {
  [-2]: "bb",
  [-1]: "b",
  0: "",
  1: "#",
  2: "##",
};

export function stepIndex(step: Step): number {
  return STEPS.indexOf(step);
}

export function stepAt(index: number): Step {
  const i = ((index % 7) + 7) % 7;
  return STEPS[i] as Step;
}

export function isAlter(n: number): n is Alter {
  return Number.isInteger(n) && n >= -2 && n <= 2;
}

/** Número MIDI (C4 = 60). */
export function toMidi(p: Pitch): number {
  return (p.octave + 1) * 12 + STEP_SEMITONES[p.step] + p.alter;
}

/** Classe de altura cromática 0–11 (C = 0). */
export function pitchClassNumber(p: PitchClass): number {
  return (((STEP_SEMITONES[p.step] + p.alter) % 12) + 12) % 12;
}

/** Índice diatônico absoluto (C0 = 0, D0 = 1 … C4 = 28). Base dos intervalos genéricos. */
export function diatonicIndex(p: Pitch): number {
  return p.octave * 7 + stepIndex(p.step);
}

export function pitch(step: Step, alter: Alter, octave: number): Pitch {
  return { step, alter, octave };
}

const PITCH_RE = /^([A-Ga-g])(##|#|x|bb|b|♯|♭|𝄪|𝄫)?(-?\d+)$/;

/** Converte "C4", "F#3", "Bb2", "Ebb5", "C##4" em Pitch. Lança erro se inválido. */
export function parsePitch(text: string): Pitch {
  const m = PITCH_RE.exec(text.trim());
  if (!m) throw new Error(`Altura inválida: "${text}"`);
  const step = (m[1] as string).toUpperCase() as Step;
  const acc = m[2] ?? "";
  const alterMap: Record<string, Alter> = {
    "": 0,
    "#": 1,
    "♯": 1,
    "##": 2,
    x: 2,
    "𝄪": 2,
    b: -1,
    "♭": -1,
    bb: -2,
    "𝄫": -2,
  };
  const alter = alterMap[acc];
  if (alter === undefined) throw new Error(`Acidente inválido em "${text}"`);
  return { step, alter, octave: Number(m[3]) };
}

/** "F♯4" */
export function formatPitch(p: Pitch): string {
  return `${p.step}${ALTER_SYMBOLS[p.alter]}${p.octave}`;
}

/** "F#4" (ASCII, útil para chaves e MusicXML). */
export function formatPitchAscii(p: Pitch): string {
  return `${p.step}${ALTER_ASCII[p.alter]}${p.octave}`;
}

/** "Fá♯4" */
export function formatPitchPt(p: Pitch): string {
  return `${STEP_NAMES_PT[p.step]}${ALTER_SYMBOLS[p.alter]}${p.octave}`;
}

export function formatPitchClassPt(p: PitchClass): string {
  return `${STEP_NAMES_PT[p.step]}${ALTER_SYMBOLS[p.alter]}`;
}

export function alterSymbol(a: Alter): string {
  return ALTER_SYMBOLS[a];
}

export function samePitch(a: Pitch, b: Pitch): boolean {
  return a.step === b.step && a.alter === b.alter && a.octave === b.octave;
}

export function samePitchClass(a: PitchClass, b: PitchClass): boolean {
  return a.step === b.step && a.alter === b.alter;
}

/** Desloca a altura por oitavas inteiras, preservando a grafia. */
export function shiftOctave(p: Pitch, octaves: number): Pitch {
  return { ...p, octave: p.octave + octaves };
}

/**
 * Grafa um número MIDI. Por padrão usa sustenidos; `preferFlats` usa bemóis.
 * Para grafia dependente da tonalidade, use `spellInKey` (key.ts).
 */
export function pitchFromMidi(midi: number, preferFlats = false): Pitch {
  const pc = ((midi % 12) + 12) % 12;
  const octave = Math.floor(midi / 12) - 1;
  const sharps: Array<[Step, Alter]> = [
    ["C", 0], ["C", 1], ["D", 0], ["D", 1], ["E", 0], ["F", 0],
    ["F", 1], ["G", 0], ["G", 1], ["A", 0], ["A", 1], ["B", 0],
  ];
  const flats: Array<[Step, Alter]> = [
    ["C", 0], ["D", -1], ["D", 0], ["E", -1], ["E", 0], ["F", 0],
    ["G", -1], ["G", 0], ["A", -1], ["A", 0], ["B", -1], ["B", 0],
  ];
  const [step, alter] = (preferFlats ? flats : sharps)[pc] as [Step, Alter];
  return { step, alter, octave };
}

/** Frequência em Hz (temperamento igual, A4 = 440 Hz). */
export function midiToFrequency(midi: number, a4 = 440): number {
  return a4 * Math.pow(2, (midi - 69) / 12);
}
