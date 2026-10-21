import { pitchClassInterval } from "./interval";
import { type Key, scaleDegree } from "./key";
import {
  type Pitch,
  type PitchClass,
  formatPitchClassPt,
  samePitchClass,
  stepIndex,
  toMidi,
} from "./pitch";

export type ChordQuality =
  | "major"
  | "minor"
  | "diminished"
  | "augmented"
  | "dominant7"
  | "major7"
  | "minor7"
  | "halfDiminished7"
  | "diminished7"
  | "minorMajor7";

/** Membro do acorde: fundamental, terça, quinta, sétima. */
export type ChordMember = "root" | "third" | "fifth" | "seventh";

export interface ChordIdentification {
  readonly root: PitchClass;
  readonly quality: ChordQuality;
  readonly isSeventh: boolean;
  /** 0 = estado fundamental, 1 = 1ª inversão, 2 = 2ª, 3 = 3ª (só tétrades). */
  readonly inversion: number;
  /** Membros ausentes (ex.: quinta omitida). */
  readonly missing: readonly ChordMember[];
  readonly bass: PitchClass;
}

const MEMBER_BY_OFFSET: Record<number, ChordMember> = { 0: "root", 2: "third", 4: "fifth", 6: "seventh" };

/** Identifica o membro de uma classe de altura em relação a uma fundamental (por letra). */
export function memberOf(pc: PitchClass, root: PitchClass): ChordMember | null {
  const offset = (stepIndex(pc.step) - stepIndex(root.step) + 7) % 7;
  return MEMBER_BY_OFFSET[offset] ?? null;
}

function qualityFrom(third: string | null, fifth: string | null, seventh: string | null): ChordQuality | null {
  // `null` = membro ausente. Uma quinta ausente é interpretada como justa
  // (omissão usual), exceto quando a combinação só faz sentido como diminuta.
  const f = fifth ?? "P";
  if (seventh === null) {
    if (third === "M" && f === "P") return "major";
    if (third === "m" && f === "P") return "minor";
    if (third === "m" && f === "d") return "diminished";
    if (third === "M" && f === "A") return "augmented";
    return null;
  }
  if (third === "M" && f === "P" && seventh === "m") return "dominant7";
  if (third === "M" && f === "P" && seventh === "M") return "major7";
  if (third === "m" && f === "P" && seventh === "m") return "minor7";
  if (third === "m" && f === "d" && seventh === "m") return "halfDiminished7";
  if (third === "m" && f === "d" && seventh === "d") return "diminished7";
  if (third === "m" && f === "P" && seventh === "M") return "minorMajor7";
  return null;
}

function unique(pcs: readonly PitchClass[]): PitchClass[] {
  const out: PitchClass[] = [];
  for (const pc of pcs) if (!out.some((o) => samePitchClass(o, pc))) out.push(pc);
  return out;
}

/**
 * Identifica um acorde terciano a partir de alturas grafadas.
 * Exige terça presente; aceita quinta omitida. Retorna `null` para sonoridades
 * não tercianas (ex.: com nota estranha) — não "força" uma leitura.
 */
export function identifyChord(pitches: readonly Pitch[]): ChordIdentification | null {
  if (pitches.length === 0) return null;
  const sorted = [...pitches].sort((a, b) => toMidi(a) - toMidi(b));
  const bassPitch = sorted[0] as Pitch;
  const pcs = unique(pitches.map((p) => ({ step: p.step, alter: p.alter })));
  if (pcs.length < 2) return null;

  const candidates: ChordIdentification[] = [];
  for (const root of pcs) {
    const members = new Map<ChordMember, PitchClass>();
    let ok = true;
    for (const pc of pcs) {
      const m = memberOf(pc, root);
      if (m === null || members.has(m)) {
        ok = false;
        break;
      }
      members.set(m, pc);
    }
    if (!ok || !members.has("third")) continue;
    const q = (m: ChordMember): string | null => {
      const pc = members.get(m);
      return pc ? pitchClassInterval(root, pc).quality : null;
    };
    const quality = qualityFrom(q("third"), q("fifth"), q("seventh"));
    if (quality === null) continue;
    const bassMember = memberOf(bassPitch, root) as ChordMember;
    const inversion = { root: 0, third: 1, fifth: 2, seventh: 3 }[bassMember];
    const missing: ChordMember[] = [];
    if (!members.has("fifth")) missing.push("fifth");
    candidates.push({
      root,
      quality,
      isSeventh: members.has("seventh"),
      inversion,
      missing,
      bass: { step: bassPitch.step, alter: bassPitch.alter },
    });
  }
  if (candidates.length === 0) return null;
  // Preferência determinística: menos membros ausentes; depois, fundamental no baixo.
  candidates.sort((a, b) => a.missing.length - b.missing.length || a.inversion - b.inversion);
  return candidates[0] ?? null;
}

const QUALITY_PT: Record<ChordQuality, string> = {
  major: "tríade maior",
  minor: "tríade menor",
  diminished: "tríade diminuta",
  augmented: "tríade aumentada",
  dominant7: "sétima de dominante (7)",
  major7: "sétima maior (7M)",
  minor7: "menor com sétima (m7)",
  halfDiminished7: "meio-diminuto (m7♭5)",
  diminished7: "diminuto (°7)",
  minorMajor7: "menor com sétima maior (m7M)",
};

export function chordQualityPt(q: ChordQuality): string {
  return QUALITY_PT[q];
}

export function inversionPt(inv: number): string {
  return ["estado fundamental", "1ª inversão", "2ª inversão", "3ª inversão"][inv] ?? "?";
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"] as const;

/** Cifragem romana com inversão em baixo cifrado: "V7", "ii⁶", "vii°", "I⁶₄", "V⁶₅". */
export function romanNumeral(chord: ChordIdentification, key: Key): string {
  const { degree, chromatic } = scaleDegree(chord.root, key);
  let numeral: string = ROMAN[degree - 1] as string;
  const lower = ["minor", "diminished", "minor7", "halfDiminished7", "diminished7", "minorMajor7"].includes(chord.quality);
  if (lower) numeral = numeral.toLowerCase();
  const prefix = chromatic < 0 ? "♭" : chromatic > 0 && !(key.mode === "minor" && (degree === 7 || degree === 6)) ? "♯" : "";
  let suffix = "";
  if (chord.quality === "diminished" || chord.quality === "diminished7") suffix = "°";
  if (chord.quality === "halfDiminished7") suffix = "ø";
  if (chord.quality === "augmented") suffix = "+";
  if (chord.quality === "major7" || chord.quality === "minorMajor7") suffix += "M";
  const figures = chord.isSeventh ? ["7", "⁶₅", "⁴₃", "⁴₂"] : ["", "⁶", "⁶₄"];
  const fig = figures[chord.inversion] ?? "";
  return `${prefix}${numeral}${suffix}${fig}`;
}

export function describeChordPt(chord: ChordIdentification): string {
  const missing = chord.missing.length ? " (quinta omitida)" : "";
  return `${formatPitchClassPt(chord.root)} — ${chordQualityPt(chord.quality)}, ${inversionPt(chord.inversion)}${missing}`;
}

/** Função harmônica tonal básica do grau (T, S, D). */
export function harmonicFunction(degree: number): "T" | "S" | "D" {
  if (degree === 1 || degree === 3 || degree === 6) return "T";
  if (degree === 2 || degree === 4) return "S";
  return "D";
}
