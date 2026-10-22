import { pitchClassInterval, transposeByInterval } from "./interval";
import { type Key, scale, scaleDegree } from "./key";
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

/** Numeral (com caixa e símbolo) do acorde diatônico de cada grau: I ii iii IV V vi vii° / i ii° III iv V VI vii°. */
function diatonicNumeral(degree: number, key: Key): string {
  const major = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];
  const minor = ["i", "ii°", "III", "iv", "V", "VI", "vii°"];
  return (key.mode === "major" ? major : minor)[degree - 1] ?? "?";
}

/** Notas diatônicas da tonalidade (em menor, inclui a sensível da forma harmônica). */
function isDiatonic(members: readonly PitchClass[], key: Key): boolean {
  const pool = [...scale(key, "natural"), ...(key.mode === "minor" ? [scale(key, "harmonic")[6] as PitchClass] : [])];
  return members.every((m) => pool.some((p) => samePitchClass(p, m)));
}

/** Classes de altura do acorde (sem a quinta, se omitida). */
export function chordMembers(chord: ChordIdentification): PitchClass[] {
  const r = { ...chord.root, octave: 4 };
  const q: Record<ChordQuality, Array<[number, "P" | "M" | "m" | "d" | "A"]>> = {
    major: [[3, "M"], [5, "P"]],
    minor: [[3, "m"], [5, "P"]],
    diminished: [[3, "m"], [5, "d"]],
    augmented: [[3, "M"], [5, "A"]],
    dominant7: [[3, "M"], [5, "P"], [7, "m"]],
    major7: [[3, "M"], [5, "P"], [7, "M"]],
    minor7: [[3, "m"], [5, "P"], [7, "m"]],
    halfDiminished7: [[3, "m"], [5, "d"], [7, "m"]],
    diminished7: [[3, "m"], [5, "d"], [7, "d"]],
    minorMajor7: [[3, "m"], [5, "P"], [7, "M"]],
  };
  const out: PitchClass[] = [chord.root];
  for (const [n, qual] of q[chord.quality]) {
    if (n === 5 && chord.missing.includes("fifth")) continue;
    try {
      const p = transposeByInterval(r, n, qual, 1);
      out.push({ step: p.step, alter: p.alter });
    } catch {
      /* acidente além de dobrado: ignora o membro */
    }
  }
  return out;
}

/**
 * Função secundária ("V/V", "V⁶₅/IV", "vii°7/ii"): acorde de dominante ou de sensível
 * com nota cromática, cuja resolução esperada é um grau diatônico consonante (≠ I e ≠ vii°).
 */
export function secondaryFunction(chord: ChordIdentification, key: Key): { kind: "V" | "vii"; targetDegree: number } | null {
  if (isDiatonic(chordMembers(chord), key)) return null;
  let target: PitchClass;
  let kind: "V" | "vii";
  if (chord.quality === "major" || chord.quality === "dominant7") {
    const t = transposeByInterval({ ...chord.root, octave: 4 }, 5, "P", -1);
    target = { step: t.step, alter: t.alter };
    kind = "V";
  } else if (chord.quality === "diminished" || chord.quality === "diminished7" || chord.quality === "halfDiminished7") {
    const t = transposeByInterval({ ...chord.root, octave: 4 }, 2, "m", 1);
    target = { step: t.step, alter: t.alter };
    kind = "vii";
  } else return null;
  const { degree, chromatic } = scaleDegree(target, key);
  const diatonicTarget = chromatic === 0 || (key.mode === "minor" && degree === 7 && chromatic === 1);
  if (!diatonicTarget || degree === 1) return null;
  if (diatonicNumeral(degree, key).includes("°")) return null; // não se tonicaliza acorde diminuto
  return { kind, targetDegree: degree };
}

/** Cifragem romana com inversão em baixo cifrado: "V7", "ii⁶", "vii°", "I⁶₄", "V⁶₅", "V⁷/V". */
export function romanNumeral(chord: ChordIdentification, key: Key): string {
  const sec = secondaryFunction(chord, key);
  if (sec) {
    const figures = chord.isSeventh ? ["7", "⁶₅", "⁴₃", "⁴₂"] : ["", "⁶", "⁶₄"];
    const fig = figures[chord.inversion] ?? "";
    const head = sec.kind === "V" ? `V${fig}` : `vii${chord.quality === "halfDiminished7" ? "ø" : "°"}${fig}`;
    return `${head}/${diatonicNumeral(sec.targetDegree, key)}`;
  }
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
