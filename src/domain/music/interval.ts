import {
  type Alter,
  type Pitch,
  type PitchClass,
  diatonicIndex,
  stepAt,
  stepIndex,
  toMidi,
} from "./pitch";

export type IntervalQuality = "dd" | "d" | "m" | "P" | "M" | "A" | "AA";

/**
 * Intervalo grafado entre duas alturas.
 * - `number`: número genérico (1 = uníssono, 8 = oitava, 10 = décima…), sempre ≥ 1.
 * - `semitones`: distância absoluta em semitons.
 * - `direction`: 1 ascendente, -1 descendente, 0 uníssono.
 */
export interface Interval {
  readonly number: number;
  readonly quality: IntervalQuality;
  readonly semitones: number;
  readonly direction: 1 | -1 | 0;
}

const PERFECT_CLASS = new Set([1, 4, 5]);
/** Semitons do intervalo maior/justo para os números simples 1–7. */
const BASE_SEMITONES = [0, 2, 4, 5, 7, 9, 11] as const;

/** Número simples 1–7 (oitava → 1, décima → 3). */
export function simpleNumber(n: number): number {
  return ((n - 1) % 7) + 1;
}

export function isPerfectClass(n: number): boolean {
  return PERFECT_CLASS.has(simpleNumber(n));
}

function qualityFromDelta(perfect: boolean, delta: number): IntervalQuality | null {
  if (perfect) {
    const map: Record<string, IntervalQuality> = { "-2": "dd", "-1": "d", "0": "P", "1": "A", "2": "AA" };
    return map[String(delta)] ?? null;
  }
  const map: Record<string, IntervalQuality> = { "-3": "dd", "-2": "d", "-1": "m", "0": "M", "1": "A", "2": "AA" };
  return map[String(delta)] ?? null;
}

/** Intervalo de `a` para `b`. A direção vem da grafia (índice diatônico), desempatada pelo som. */
export function intervalBetween(a: Pitch, b: Pitch): Interval {
  const da = diatonicIndex(a);
  const db = diatonicIndex(b);
  const ma = toMidi(a);
  const mb = toMidi(b);
  let direction: 1 | -1 | 0;
  if (db !== da) direction = db > da ? 1 : -1;
  else direction = mb === ma ? 0 : mb > ma ? 1 : -1;

  const low = direction === -1 ? b : a;
  const high = direction === -1 ? a : b;
  const generic = Math.abs(db - da) + 1;
  const signedSemis = toMidi(high) - toMidi(low);
  const octaves = Math.floor((generic - 1) / 7);
  const simple = simpleNumber(generic);
  const expected = (BASE_SEMITONES[simple - 1] as number) + 12 * octaves;
  const delta = signedSemis - expected;
  const quality = qualityFromDelta(PERFECT_CLASS.has(simple), delta);
  if (quality === null) {
    throw new Error(`Intervalo fora do suporte (${generic}ª com desvio ${delta})`);
  }
  return { number: generic, quality, semitones: Math.abs(mb - ma), direction };
}

const QUALITY_PT: Record<IntervalQuality, string> = {
  dd: "duplamente diminuta",
  d: "diminuta",
  m: "menor",
  P: "justa",
  M: "maior",
  A: "aumentada",
  AA: "duplamente aumentada",
};

const QUALITY_SHORT_PT: Record<IntervalQuality, string> = {
  dd: "dd",
  d: "d",
  m: "m",
  P: "J",
  M: "M",
  A: "A",
  AA: "AA",
};

/** "5ª justa", "3ª maior", "8ª justa", "uníssono justo". */
export function intervalNamePt(i: Pick<Interval, "number" | "quality">): string {
  if (i.number === 1) {
    if (i.quality === "P") return "uníssono justo";
    return `uníssono ${QUALITY_PT[i.quality].replace(/a$/, "o")}`;
  }
  return `${i.number}ª ${QUALITY_PT[i.quality]}`;
}

/** "5J", "3M", "4A", "7d" */
export function intervalShortPt(i: Pick<Interval, "number" | "quality">): string {
  return `${i.number}${QUALITY_SHORT_PT[i.quality]}`;
}

export function isPerfectFifthLike(i: Interval): boolean {
  return simpleNumber(i.number) === 5 && i.quality === "P";
}

/** Uníssono justo, oitava justa ou oitavas compostas justas. */
export function isPerfectOctaveLike(i: Interval): boolean {
  return simpleNumber(i.number) === 1 && i.quality === "P";
}

export function isStep(i: Interval): boolean {
  return i.number === 2;
}

export function isLeap(i: Interval): boolean {
  return i.number >= 3;
}

/**
 * Transpõe uma altura por um intervalo grafado (ascendente ou descendente).
 * Ex.: transposeByInterval(C4, 3, "M", 1) → E4.
 */
export function transposeByInterval(
  p: Pitch,
  number: number,
  quality: IntervalQuality,
  direction: 1 | -1,
): Pitch {
  const steps = (number - 1) * direction;
  const targetDiatonic = diatonicIndex(p) + steps;
  const step = stepAt(targetDiatonic);
  const octave = Math.floor(targetDiatonic / 7);
  const octaves = Math.floor((number - 1) / 7);
  const simple = simpleNumber(number);
  const perfect = PERFECT_CLASS.has(simple);
  const deltaTable: Record<IntervalQuality, number> = perfect
    ? { dd: -2, d: -1, m: Number.NaN, P: 0, M: Number.NaN, A: 1, AA: 2 }
    : { dd: -3, d: -2, m: -1, P: Number.NaN, M: 0, A: 1, AA: 2 };
  const delta = deltaTable[quality];
  if (Number.isNaN(delta)) throw new Error(`Qualidade ${quality} inválida para ${number}ª`);
  const semis = (BASE_SEMITONES[simple - 1] as number) + 12 * octaves + delta;
  const targetMidi = toMidi(p) + semis * direction;
  const natural: Pitch = { step, alter: 0, octave };
  const alter = targetMidi - toMidi(natural);
  if (alter < -2 || alter > 2) throw new Error("Transposição exigiria acidente além de dobrado");
  return { step, alter: alter as Alter, octave };
}

/** Intervalo ascendente entre duas classes de altura (dentro da oitava). */
export function pitchClassInterval(from: PitchClass, to: PitchClass): Interval {
  const a: Pitch = { ...from, octave: 4 };
  let b: Pitch = { ...to, octave: 4 };
  if (stepIndex(to.step) < stepIndex(from.step) || (to.step === from.step && toMidi(b) < toMidi(a))) {
    b = { ...to, octave: 5 };
  }
  return intervalBetween(a, b);
}
