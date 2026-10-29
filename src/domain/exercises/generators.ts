import { type ChordQuality, chordQualityPt, identifyChord, inversionPt } from "../music/chord";
import { type FormationId, FORMATIONS, type VoiceId, clefNamePt } from "../music/formations";
import { type IntervalQuality, intervalBetween, intervalNamePt, transposeByInterval } from "../music/interval";
import { type Alter, type Pitch, type Step, formatPitch, formatPitchClassPt, formatPitchPt, toMidi } from "../music/pitch";
import type { Score } from "../music/score";
import { pick, shuffle } from "./random";
import type { ChoiceItem, ChoiceOption } from "./types";

type Rng = () => number;

const INTERVAL_POOL: ReadonlyArray<[number, IntervalQuality]> = [
  [2, "m"], [2, "M"], [3, "m"], [3, "M"], [4, "P"], [4, "A"], [5, "d"], [5, "P"],
  [6, "m"], [6, "M"], [7, "m"], [7, "M"], [8, "P"],
];

const LOWER_NOTES: readonly Pitch[] = (["C", "D", "E", "F", "G", "A", "B"] as Step[]).flatMap((step) =>
  ([-1, 0, 1] as Alter[]).flatMap((alter) => [3, 4].map((octave) => ({ step, alter, octave }))),
).filter((p) => !["E#", "B#", "Fb", "Cb"].includes(`${p.step}${p.alter === 1 ? "#" : p.alter === -1 ? "b" : ""}`));

function intervalLabel(n: number, q: IntervalQuality): string {
  return intervalNamePt({ number: n, quality: q });
}

/** Distratores plausíveis: mesmo número com outra qualidade e o enarmônico. */
function intervalDistractors(rng: Rng, n: number, q: IntervalQuality): string[] {
  const correct = intervalLabel(n, q);
  const cands = new Set<string>();
  for (const [nn, qq] of INTERVAL_POOL) {
    if (nn === n && qq !== q) cands.add(intervalLabel(nn, qq));
  }
  // vizinhos por número (erro típico de contagem)
  for (const [nn, qq] of INTERVAL_POOL) if (Math.abs(nn - n) === 1) cands.add(intervalLabel(nn, qq));
  cands.delete(correct);
  return shuffle(rng, [...cands]).slice(0, 3);
}

export function generateIntervalItems(rng: Rng, count: number, opts: { earOnly?: boolean; maxNumber?: number } = {}): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  const pool = INTERVAL_POOL.filter(([n]) => n <= (opts.maxNumber ?? 8));
  let guard = 0;
  while (items.length < count && guard++ < count * 50) {
    const [n, q] = pick(rng, pool);
    const low = pick(rng, LOWER_NOTES);
    let high: Pitch;
    try {
      high = transposeByInterval(low, n, q, 1);
    } catch {
      continue;
    }
    if (Math.abs(high.alter) > 1) continue;
    const check = intervalBetween(low, high);
    if (check.number !== n || check.quality !== q) continue;
    const harmonic = rng() < 0.4;
    const correctLabel = intervalLabel(n, q);
    const labels = shuffle(rng, [correctLabel, ...intervalDistractors(rng, n, q)]);
    const options: ChoiceOption[] = labels.map((label, i) => ({ id: `o${i}`, label }));
    const correctOptionId = options.find((o) => o.label === correctLabel)!.id;
    const clef = toMidi(low) < 57 ? "bass" : "treble";
    items.push({
      id: `int-${items.length + 1}`,
      kind: "choice",
      skill: opts.earOnly ? "percepcao-intervalos" : "intervalos",
      prompt: opts.earOnly
        ? `Ouça o intervalo ${harmonic ? "harmônico" : "melódico"} e identifique-o.`
        : `Classifique o intervalo ${harmonic ? "harmônico" : "melódico"} ${formatPitch(low)} – ${formatPitch(high)}.`,
      options,
      correctOptionId,
      explanation: `${formatPitchPt(low)} → ${formatPitchPt(high)}: contando as letras de ${low.step} até ${high.step} temos uma ${n}ª; são ${check.semitones} semitons, o que faz dela uma ${correctLabel}.`,
      staff: { clef, attacks: harmonic ? [[low, high]] : [[low], [high]] },
      audio: { pitches: [low, high], mode: harmonic ? "harmonico" : "melodico" },
      ...(opts.earOnly ? { earOnly: true } : {}),
    });
  }
  return items;
}

const ROOTS: readonly { step: Step; alter: Alter }[] = [
  { step: "C", alter: 0 }, { step: "D", alter: 0 }, { step: "E", alter: 0 }, { step: "F", alter: 0 },
  { step: "G", alter: 0 }, { step: "A", alter: 0 }, { step: "B", alter: 0 }, { step: "B", alter: -1 },
  { step: "E", alter: -1 }, { step: "A", alter: -1 }, { step: "F", alter: 1 }, { step: "C", alter: 1 },
];

const TRIAD_INTERVALS: Record<"major" | "minor" | "diminished" | "augmented", [IntervalQuality, IntervalQuality]> = {
  major: ["M", "P"],
  minor: ["m", "P"],
  diminished: ["m", "d"],
  augmented: ["M", "A"],
};

/** Distribui uma tríade em quatro vozes SATB (posição fechada nas vozes superiores, dobrando a fundamental; em 2ª inversão, o baixo). */
export function voiceTriadSATB(root: { step: Step; alter: Alter }, quality: keyof typeof TRIAD_INTERVALS, inversion: 0 | 1 | 2): Pitch[] | null {
  const r: Pitch = { ...root, octave: 3 };
  const [tq, fq] = TRIAD_INTERVALS[quality];
  let third: Pitch;
  let fifth: Pitch;
  try {
    third = transposeByInterval(r, 3, tq, 1);
    fifth = transposeByInterval(r, 5, fq, 1);
  } catch {
    return null;
  }
  if ([third, fifth].some((p) => Math.abs(p.alter) > 1)) return null;
  const members = [r, third, fifth];
  const bassPc = members[inversion] as Pitch;
  const upperOrder: Pitch[] =
    inversion === 0 ? [third, fifth, r] : inversion === 1 ? [r, fifth, r] : [r, third, fifth];
  // baixo entre G2 e F3
  let bass: Pitch = { ...bassPc, octave: 2 };
  while (toMidi(bass) < 43) bass = { ...bass, octave: bass.octave + 1 };
  while (toMidi(bass) > 53) bass = { ...bass, octave: bass.octave - 1 };
  const above = (pc: Pitch, min: number): Pitch => {
    let p: Pitch = { ...pc, octave: 1 };
    while (toMidi(p) <= min) p = { ...p, octave: p.octave + 1 };
    return p;
  };
  const tenor = above(upperOrder[0] as Pitch, Math.max(toMidi(bass) + 2, 49));
  const alto = above(upperOrder[1] as Pitch, toMidi(tenor));
  const sop = above(upperOrder[2] as Pitch, toMidi(alto));
  let upper = [sop, alto, tenor];
  if (toMidi(sop) < 64 && toMidi(tenor) + 12 <= 67) upper = upper.map((p) => ({ ...p, octave: p.octave + 1 }));
  return [...upper, bass];
}

export function chordScore(pitches: readonly Pitch[], id: string, formation: FormationId = "SATB"): Score {
  const voices = FORMATIONS[formation].voices.map((v) => v.id);
  return {
    schemaVersion: 1,
    id,
    title: "Acorde",
    formation,
    key: { tonic: { step: "C", alter: 0 }, mode: "major" },
    timeSignature: { beats: 4, beatType: 4 },
    tempoBpm: 60,
    measureCount: 1,
    parts: voices.map((voice, i) => ({
      voice,
      events: [{ id: `${id}-${voice}`, kind: "note" as const, pitch: pitches[i] as Pitch, duration: { type: "w" as const, dots: 0 as const } }],
    })),
    metadata: { style: "coral-tradicional" },
  };
}

export function generateChordItems(rng: Rng, count: number, opts: { earOnly?: boolean } = {}): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  const qualities: Array<keyof typeof TRIAD_INTERVALS> = ["major", "major", "minor", "minor", "diminished", "augmented"];
  let guard = 0;
  while (items.length < count && guard++ < count * 50) {
    const root = pick(rng, ROOTS);
    const quality = pick(rng, qualities);
    const inversion = pick(rng, [0, 1, 2] as const);
    const pitches = voiceTriadSATB(root, quality, inversion);
    if (!pitches) continue;
    const id = identifyChord(pitches);
    if (!id || id.quality !== quality || id.inversion !== inversion) continue;
    const label = (q: ChordQuality, inv: number) => `${chordQualityPt(q)} — ${inversionPt(inv)}`;
    const correct = label(quality, inversion);
    const distract = new Set<string>();
    for (const inv of [0, 1, 2]) if (inv !== inversion) distract.add(label(quality, inv));
    for (const q of ["major", "minor", "diminished", "augmented"] as const) if (q !== quality) distract.add(label(q, inversion));
    const labels = shuffle(rng, [correct, ...shuffle(rng, [...distract]).slice(0, 3)]);
    const options = labels.map((l, i) => ({ id: `o${i}`, label: l }));
    const sorted = [...pitches].sort((a, b) => toMidi(a) - toMidi(b)).map(formatPitch).join(", ");
    items.push({
      id: `acorde-${items.length + 1}`,
      kind: "choice",
      skill: opts.earOnly ? "percepcao" : "acordes",
      prompt: opts.earOnly
        ? "Ouça o acorde a quatro vozes (a partitura aparece depois da resposta): qual a qualidade e a inversão? Dica: cante a nota mais grave."
        : "Identifique a qualidade e a inversão do acorde (leia do baixo para cima).",
      options,
      correctOptionId: options.find((o) => o.label === correct)!.id,
      explanation: `Notas (do grave ao agudo): ${sorted}. Empilhando em terças a partir de ${formatPitchClassPt(root)}, obtemos uma ${chordQualityPt(quality)}. O baixo é a ${["fundamental", "terça", "quinta"][inversion]}, portanto: ${inversionPt(inversion)}.`,
      notation: chordScore(pitches, `ac${items.length + 1}`),
      audio: { pitches, mode: "harmonico" },
      ...(opts.earOnly ? { earOnly: true } : {}),
    });
  }
  return items;
}

type RangeAnswer = "tessitura" | "extensao" | "fora";

export function generateRangeItems(rng: Rng, count: number, formations: readonly FormationId[] = ["SATB", "TTBB"]): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  const all: Array<{ formation: FormationId; voice: VoiceId }> = formations.flatMap((f) =>
    FORMATIONS[f].voices.map((v) => ({ formation: f, voice: v.id })),
  );
  const labels: Record<RangeAnswer, string> = {
    tessitura: "Dentro da tessitura (região confortável)",
    extensao: "Na extensão, mas fora da tessitura",
    fora: "Fora da extensão recomendada",
  };
  const targets: RangeAnswer[] = ["tessitura", "extensao", "fora"];
  let guard = 0;
  while (items.length < count && guard++ < count * 100) {
    const { formation, voice } = pick(rng, all);
    const spec = FORMATIONS[formation].voices.find((v) => v.id === voice)!;
    const want = targets[items.length % 3] as RangeAnswer;
    const lo = toMidi(spec.range.low) - 4;
    const hi = toMidi(spec.range.high) + 4;
    const midi = lo + Math.floor(rng() * (hi - lo + 1));
    const inRange = midi >= toMidi(spec.range.low) && midi <= toMidi(spec.range.high);
    const inTess = midi >= toMidi(spec.tessitura.low) && midi <= toMidi(spec.tessitura.high);
    const answer: RangeAnswer = inTess ? "tessitura" : inRange ? "extensao" : "fora";
    if (answer !== want) continue;
    const naturals: Record<number, [Step, Alter]> = { 0: ["C", 0], 1: ["C", 1], 2: ["D", 0], 3: ["E", -1], 4: ["E", 0], 5: ["F", 0], 6: ["F", 1], 7: ["G", 0], 8: ["A", -1], 9: ["A", 0], 10: ["B", -1], 11: ["B", 0] };
    const [step, alter] = naturals[((midi % 12) + 12) % 12] as [Step, Alter];
    const p: Pitch = { step, alter, octave: Math.floor(midi / 12) - 1 };
    const staffSpec = FORMATIONS[formation].staves[spec.staff];
    const options = targets.map((t) => ({ id: t, label: labels[t] }));
    items.push({
      id: `ext-${items.length + 1}`,
      kind: "choice",
      skill: { SATB: "escrita-satb", TTBB: "escrita-ttbb", SSAA: "escrita-ssaa" }[formation],
      prompt: `Pela referência do curso para ${spec.name} em ${formation} (coro amador ou intermediário), a nota ${formatPitch(p)} (altura sonora) está…`,
      options,
      correctOptionId: answer,
      explanation: `${spec.name} em ${formation}: extensão ${formatPitch(spec.range.low)}–${formatPitch(spec.range.high)}, tessitura ${formatPitch(spec.tessitura.low)}–${formatPitch(spec.tessitura.high)}. ${formatPitch(p)} → ${labels[answer].toLowerCase()}. Na partitura, essa voz é escrita em ${clefNamePt(staffSpec.clef)}${staffSpec.clef === "treble8vb" ? `, ou seja, aparece uma oitava acima (${formatPitch({ ...p, octave: p.octave + 1 })})` : ""}. Essas faixas são uma referência didática, não um limite universal: treino, idade e repertório mudam a extensão de cada cantor, e uma nota isolada não diz tudo (o que pesa é quanto tempo a linha fica na região e em que dinâmica).`,
      staff: { clef: staffSpec.clef, attacks: [[p]] },
      audio: { pitches: [p], mode: "melodico" },
    });
  }
  return items;
}
