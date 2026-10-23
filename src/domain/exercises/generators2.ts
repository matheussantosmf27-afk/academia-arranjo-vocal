import { type ChordQuality, chordQualityPt, harmonicFunction, identifyChord, inversionPt, romanNumeral } from "../music/chord";
import { type IntervalQuality, transposeByInterval } from "../music/interval";
import { type Key, keyFifths, keyNamePt, scale, scaleDegree } from "../music/key";
import { type Alter, type Pitch, type Step, formatPitchClassPt, toMidi } from "../music/pitch";
import type { Score } from "../music/score";
import { changeKey } from "../music/timeline-ops";
import { parseKey } from "../music/text-notation";
import { RULES, validateScore } from "../validation/engine";
import { buildContext } from "../validation/context";
import { classifyMotion, MOTION_PT, type MotionType } from "../validation/motion";
import { NCT_PT, analyzeNonChordTones } from "../validation/rules/nct";
import { chordScore } from "./generators";
import { CADENCE_PT, CADENCE_SNIPPETS, ERROR_SNIPPETS, NCT_SNIPPETS } from "./library";
import { pick, shuffle } from "./random";
import type { ChoiceItem, ChoiceOption } from "./types";

type Rng = () => number;

const MAJOR_KEYS = ["C", "G", "D", "A", "E", "B", "F#", "F", "Bb", "Eb", "Ab", "Db", "Gb"];
const MINOR_KEYS = ["Am", "Em", "Bm", "F#m", "C#m", "Dm", "Gm", "Cm", "Fm", "Bbm", "Ebm"];

function choice(id: string, skill: string, prompt: string, correct: string, distractors: readonly string[], rng: Rng, extra: Partial<ChoiceItem> & { explanation: string }): ChoiceItem {
  const labels = shuffle(rng, [correct, ...shuffle(rng, [...new Set(distractors)].filter((d) => d !== correct)).slice(0, 3)]);
  const options: ChoiceOption[] = labels.map((label, i) => ({ id: `o${i}`, label }));
  return { id, kind: "choice", skill, prompt, options, correctOptionId: options.find((o) => o.label === correct)!.id, ...extra };
}

const sigLabel = (f: number) => (f === 0 ? "Nenhum acidente" : `${Math.abs(f)} ${f > 0 ? (Math.abs(f) === 1 ? "sustenido" : "sustenidos") : Math.abs(f) === 1 ? "bemol" : "bemóis"}`);

/** Armaduras: tonalidade → acidentes, e armadura + modo → tonalidade. */
export function generateKeySignatureItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  for (let i = 0; i < count; i++) {
    const minor = rng() < 0.4;
    const key = parseKey(pick(rng, minor ? MINOR_KEYS : MAJOR_KEYS));
    const f = keyFifths(key);
    const relative = keyNamePt(parseKey(minor ? relativeMajor(key) : relativeMinor(key)));
    if (rng() < 0.5) {
      items.push(
        choice(`arm-${i + 1}`, "leitura-vocal", `Qual é a armadura de ${keyNamePt(key)}?`, sigLabel(f), [sigLabel(f + 1), sigLabel(f - 1), sigLabel(-f || 3), sigLabel(f + 3), sigLabel(f - 3)], rng, {
          explanation: `${keyNamePt(key)} tem ${sigLabel(f).toLowerCase()} (relativa: ${relative}). Pelo ciclo de quintas, cada quinta acima acrescenta um sustenido; cada quinta abaixo, um bemol.`,
        }),
      );
    } else {
      const other = keyNamePt(parseKey(minor ? relativeMajor(key) : relativeMinor(key)));
      items.push(
        choice(`arm-${i + 1}`, "leitura-vocal", `Uma peça em modo ${minor ? "menor" : "maior"} tem armadura com ${sigLabel(f).toLowerCase()}. Qual é a tonalidade?`, keyNamePt(key), [other, keyNamePt(parseKey(fifthNeighbor(key, 1))), keyNamePt(parseKey(fifthNeighbor(key, -1)))], rng, {
          explanation: `${sigLabel(f)} em modo ${minor ? "menor" : "maior"} = ${keyNamePt(key)}. Com a mesma armadura, o modo ${minor ? "maior" : "menor"} seria ${other} (tonalidade relativa).`,
        }),
      );
    }
  }
  return items;
}

const keyText = (k: Key) => `${k.tonic.step}${k.tonic.alter === 1 ? "#" : k.tonic.alter === -1 ? "b" : ""}${k.mode === "minor" ? "m" : ""}`;
function relativeMinor(k: Key): string {
  const t = transposeByInterval({ ...k.tonic, octave: 4 }, 3, "m", -1);
  return keyText({ tonic: { step: t.step, alter: t.alter }, mode: "minor" });
}
function relativeMajor(k: Key): string {
  const t = transposeByInterval({ ...k.tonic, octave: 4 }, 3, "m", 1);
  return keyText({ tonic: { step: t.step, alter: t.alter }, mode: "major" });
}
function fifthNeighbor(k: Key, dir: 1 | -1): string {
  const t = transposeByInterval({ ...k.tonic, octave: 4 }, 5, "P", dir);
  if (Math.abs(t.alter) > 1) return keyText(k);
  return keyText({ tonic: { step: t.step, alter: t.alter }, mode: k.mode });
}

const DEGREE_PT = ["1º", "2º", "3º", "4º", "5º", "6º", "7º"];
const DEGREE_NAME = ["tônica", "supertônica", "mediante", "subdominante", "dominante", "superdominante", "sensível"];

/** Graus da escala: qual nota é o grau N e qual grau é a nota X. */
export function generateScaleDegreeItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  for (let i = 0; i < count; i++) {
    const key = parseKey(pick(rng, MAJOR_KEYS.slice(0, 11)));
    const sc = scale(key);
    const d = Math.floor(rng() * 7);
    const pc = sc[d]!;
    if (rng() < 0.5) {
      items.push(
        choice(`grau-${i + 1}`, "harmonia-funcional", `Em ${keyNamePt(key)}, qual nota é o ${DEGREE_PT[d]} grau (${DEGREE_NAME[d]})?`, formatPitchClassPt(pc), sc.filter((_, j) => j !== d).map(formatPitchClassPt), rng, {
          explanation: `Escala de ${keyNamePt(key)}: ${sc.map(formatPitchClassPt).join(" – ")}. O ${DEGREE_PT[d]} grau é ${formatPitchClassPt(pc)}.`,
        }),
      );
    } else {
      items.push(
        choice(`grau-${i + 1}`, "harmonia-funcional", `Em ${keyNamePt(key)}, ${formatPitchClassPt(pc)} é qual grau?`, `${DEGREE_PT[d]} (${DEGREE_NAME[d]})`, DEGREE_PT.map((g, j) => `${g} (${DEGREE_NAME[j]})`), rng, {
          explanation: `Contando a partir da tônica ${formatPitchClassPt(key.tonic)}: ${sc.map((p, j) => `${DEGREE_PT[j]} ${formatPitchClassPt(p)}`).join(", ")}.`,
        }),
      );
    }
  }
  return items;
}

const SEVENTHS: ReadonlyArray<[ChordQuality, [IntervalQuality, IntervalQuality, IntervalQuality]]> = [
  ["dominant7", ["M", "P", "m"]],
  ["major7", ["M", "P", "M"]],
  ["minor7", ["m", "P", "m"]],
  ["halfDiminished7", ["m", "d", "m"]],
  ["diminished7", ["m", "d", "d"]],
];

/** Tétrade distribuída em SATB (baixo = membro da inversão; demais em posição fechada). */
export function voiceSeventhSATB(root: { step: Step; alter: Alter }, ivs: readonly [IntervalQuality, IntervalQuality, IntervalQuality], inversion: 0 | 1 | 2 | 3): Pitch[] | null {
  const r: Pitch = { ...root, octave: 3 };
  let members: Pitch[];
  try {
    members = [r, transposeByInterval(r, 3, ivs[0], 1), transposeByInterval(r, 5, ivs[1], 1), transposeByInterval(r, 7, ivs[2], 1)];
  } catch {
    return null;
  }
  if (members.some((p) => Math.abs(p.alter) > 1)) return null;
  const bassPc = members[inversion]!;
  let bass: Pitch = { ...bassPc, octave: 2 };
  while (toMidi(bass) < 43) bass = { ...bass, octave: bass.octave + 1 };
  while (toMidi(bass) > 53) bass = { ...bass, octave: bass.octave - 1 };
  const upper = [1, 2, 3].map((k) => members[(inversion + k) % 4]!);
  let prev = toMidi(bass);
  const placed = upper.map((pc) => {
    let p: Pitch = { ...pc, octave: 1 };
    while (toMidi(p) <= Math.max(prev, 49)) p = { ...p, octave: p.octave + 1 };
    prev = toMidi(p);
    return p;
  });
  const [t, a, s] = placed as [Pitch, Pitch, Pitch];
  return [s, a, t, bass];
}

export function generateSeventhItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  let guard = 0;
  const roots: Array<{ step: Step; alter: Alter }> = (["C", "D", "E", "F", "G", "A", "B"] as Step[]).map((step) => ({ step, alter: 0 as Alter }));
  while (items.length < count && guard++ < count * 60) {
    const [quality, ivs] = pick(rng, SEVENTHS);
    const inversion = pick(rng, [0, 1, 2, 3] as const);
    const pitches = voiceSeventhSATB(pick(rng, roots), ivs, inversion);
    if (!pitches) continue;
    const id = identifyChord(pitches);
    if (!id || id.quality !== quality || id.inversion !== inversion) continue;
    const label = (q: ChordQuality, inv: number) => `${chordQualityPt(q)} — ${inversionPt(inv)}`;
    const distract = [...SEVENTHS.map(([q]) => label(q, inversion)), ...[0, 1, 2, 3].map((inv) => label(quality, inv))];
    items.push(
      choice(`tetr-${items.length + 1}`, "acordes", "Identifique a tétrade (qualidade e inversão).", label(quality, inversion), distract, rng, {
        explanation: `Empilhando em terças a partir de ${formatPitchClassPt(id.root)}: ${chordQualityPt(quality)}. O baixo é a ${["fundamental", "terça", "quinta", "sétima"][inversion]} → ${inversionPt(inversion)} (cifra ${["7", "⁶₅", "⁴₃", "⁴₂"][inversion]}).`,
        notation: chordScore(pitches, `tt${items.length}`),
        audio: { pitches, mode: "harmonico" },
      }),
    );
  }
  return items;
}

const FUNC_PT = { T: "Tônica (T)", S: "Subdominante (S)", D: "Dominante (D)" } as const;

export function generateFunctionItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  const pool = [2, 4, 5, 6, 7, 1];
  for (let i = 0; i < count; i++) {
    const key = parseKey(pick(rng, ["C", "G", "D", "F", "Bb", "Am", "Dm", "Em"]));
    const degree = pick(rng, pool);
    const sc = scale(key, "harmonic");
    const third = sc[(degree + 1) % 7]!;
    const fifth = sc[(degree + 3) % 7]!;
    const root = sc[degree - 1]!;
    const pitches = voiceTriadFromPcs([root, third, fifth]);
    const chord = pitches ? identifyChord(pitches) : null;
    if (!pitches || !chord) continue;
    const roman = romanNumeral(chord, key);
    const fn = harmonicFunction(scaleDegree(chord.root, key).degree);
    items.push(
      choice(`func-${i + 1}`, "harmonia-funcional", `Em ${keyNamePt(key)}, qual é a função harmônica de ${roman} (${formatPitchClassPt(root)}–${formatPitchClassPt(third)}–${formatPitchClassPt(fifth)})?`, FUNC_PT[fn], Object.values(FUNC_PT), rng, {
        explanation: `${roman} pertence à função ${FUNC_PT[fn].toLowerCase()}: ${fn === "T" ? "I, vi (e iii) dão repouso" : fn === "S" ? "IV e ii afastam-se da tônica e preparam a dominante" : "V e vii° contêm a sensível e pedem resolução na tônica"}.`,
        notation: chordScore(pitches, `fn${i}`),
        audio: { pitches, mode: "harmonico" },
      }),
    );
  }
  return items;
}

function voiceTriadFromPcs(pcs: readonly { step: Step; alter: Alter }[]): Pitch[] | null {
  const [r, t, f] = pcs as [{ step: Step; alter: Alter }, { step: Step; alter: Alter }, { step: Step; alter: Alter }];
  let bass: Pitch = { ...r, octave: 2 };
  while (toMidi(bass) < 43) bass = { ...bass, octave: bass.octave + 1 };
  let prev = Math.max(toMidi(bass), 49);
  const up = [t, f, r].map((pc) => {
    let p: Pitch = { ...pc, octave: 1 };
    while (toMidi(p) <= prev) p = { ...p, octave: p.octave + 1 };
    prev = toMidi(p);
    return p;
  });
  return [up[2]!, up[1]!, up[0]!, bass];
}

/** Tipo de movimento entre duas vozes (pauta única, dois ataques). */
export function generateMotionItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  const white = (["C", "D", "E", "F", "G", "A", "B"] as Step[]).flatMap((step) => [4, 5].map((octave) => ({ step, alter: 0 as Alter, octave })));
  const targets: MotionType[] = ["paralelo", "semelhante", "contrario", "obliquo"];
  let guard = 0;
  while (items.length < count && guard++ < count * 200) {
    const want = targets[items.length % 4]!;
    const [l0, l1, u0, u1] = [pick(rng, white), pick(rng, white), pick(rng, white), pick(rng, white)];
    if (toMidi(u0) <= toMidi(l0) || toMidi(u1) <= toMidi(l1) || toMidi(u0) - toMidi(l0) > 12 || toMidi(u1) - toMidi(l1) > 12) continue;
    if (classifyMotion(u0, u1, l0, l1) !== want) continue;
    items.push(
      choice(`mov-${items.length + 1}`, "conducao-de-vozes", "Que tipo de movimento as duas vozes fazem?", MOTION_PT[want], targets.map((t) => MOTION_PT[t]), rng, {
        explanation: {
          paralelo: "As duas vozes vão na mesma direção mantendo o mesmo intervalo (em semitons).",
          semelhante: "As duas vozes vão na mesma direção, mas o intervalo entre elas muda (movimento direto).",
          contrario: "Uma voz sobe enquanto a outra desce.",
          obliquo: "Uma voz se move e a outra permanece na mesma nota.",
          estatico: "",
        }[want],
        staff: { clef: "treble", attacks: [[l0, u0], [l1, u1]] },
        audio: { pitches: [l0, u0, l1, u1], mode: "melodico" },
      }),
    );
  }
  return items;
}

const TRANSPOSE_KEYS = ["C", "D", "F", "G", "Bb", "A", "Eb"];

/** Transpõe um trecho (mesmo modo) e devolve o resultado só se o predicado continuar verdadeiro. */
function transposedVariant(rng: Rng, score: Score, ok: (s: Score) => boolean): Score | null {
  for (const k of shuffle(rng, score.key.mode === "minor" ? ["Am", "Dm", "Em", "Gm", "Cm"] : TRANSPOSE_KEYS)) {
    try {
      const t = changeKey(score, parseKey(k), "transpor");
      if (ok(t)) return t;
    } catch {
      /* tonalidade inviável para este trecho */
    }
  }
  return null;
}

const RULE_NAME = new Map(RULES.map((r) => [r.meta.id, r.meta.name]));

/** "Qual é o principal problema?" — trechos com um erro de condução conhecido, verificado pelo motor. */
export function generateErrorItems(rng: Rng, count: number, ruleIds?: readonly string[]): ChoiceItem[] {
  const pool = ERROR_SNIPPETS.filter((e) => !ruleIds || ruleIds.includes(e.ruleId));
  const items: ChoiceItem[] = [];
  for (const snip of shuffle(rng, pool).slice(0, count)) {
    const score = transposedVariant(rng, snip.score, (t) => {
      const serious = validateScore(t).diagnostics.filter((d) => d.severity === "erro" || d.severity === "alerta");
      return serious.length > 0 && serious.every((d) => d.ruleId === snip.ruleId);
    });
    if (!score) continue;
    const correct = RULE_NAME.get(snip.ruleId)!;
    const distract = ERROR_SNIPPETS.map((e) => RULE_NAME.get(e.ruleId)!).concat(["Nenhum problema de condução"]);
    const d = validateScore(score).diagnostics.find((x) => x.ruleId === snip.ruleId)!;
    items.push(
      choice(`erro-${items.length + 1}`, "conducao-de-vozes", `Trecho em ${keyNamePt(score.key)}: qual é o principal problema? (Dica: ${snip.hint})`, correct, distract, rng, {
        explanation: `${d.message} ${d.explanation}`,
        notation: score,
      }),
    );
  }
  return items;
}

export function generateCadenceItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  for (let i = 0; i < count; i++) {
    const snip = pick(rng, CADENCE_SNIPPETS);
    const score = transposedVariant(rng, snip.score, (t) => validateScore(t).diagnostics.every((d) => d.severity === "info"));
    if (!score) continue;
    items.push(
      choice(`cad-${i + 1}`, "harmonia-funcional", `Que cadência termina este trecho em ${keyNamePt(score.key)}? Ouça e leia o baixo.`, CADENCE_PT[snip.cadence], Object.values(CADENCE_PT), rng, {
        explanation: {
          autentica: "Dominante (V) resolvendo na tônica (I) com as fundamentais no baixo: a cadência mais conclusiva.",
          plagal: "Subdominante (IV) para a tônica: o 'Amém' — conclusivo, porém mais suave.",
          semicadencia: "A frase termina na dominante: pontuação suspensiva, como uma vírgula.",
          engano: "A dominante resolve em vi em vez de I: a sensível sobe, mas o baixo frustra a expectativa.",
        }[snip.cadence],
        notation: score,
      }),
    );
  }
  return items;
}

export function generateNctItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  for (const snip of shuffle(rng, NCT_SNIPPETS).slice(0, count)) {
    const score = transposedVariant(rng, snip.score, (t) => {
      const n = analyzeNonChordTones(buildContext(t, { style: "coral-tradicional" }));
      return n.length === 1 && n[0]!.kind === snip.kind && validateScore(t).diagnostics.every((d) => d.severity === "info");
    });
    if (!score) continue;
    const n = analyzeNonChordTones(buildContext(score, { style: "coral-tradicional" }))[0]!;
    const kinds = ["passagem", "bordadura", "retardo", "apojatura", "escapada", "antecipacao"] as const;
    items.push(
      choice(`nct-${items.length + 1}`, "conducao-de-vozes", `O soprano tem uma nota estranha ao acorde (${keyNamePt(score.key)}). Como ela se classifica?`, NCT_PT[snip.kind], kinds.map((k) => NCT_PT[k]), rng, {
        explanation: `A nota estranha é ${formatPitchClassPt(n.pitch)}${n.prev ? `, vinda de ${formatPitchClassPt(n.prev)}` : ""}${n.next ? ` e seguida de ${formatPitchClassPt(n.next)}` : ""}${n.figure ? ` (retardo ${n.figure})` : ""}. ${n.accented ? "Está em tempo forte." : "Está em tempo fraco."}`,
        notation: score,
      }),
    );
  }
  return items;
}
