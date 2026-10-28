import { type ChordQuality, chordQualityPt, harmonicFunction, identifyChord, inversionPt, romanNumeral } from "../music/chord";
import { type IntervalQuality, intervalNamePt, transposeByInterval } from "../music/interval";
import { type Key, keyFifths, keyNamePt, scale, scaleDegree } from "../music/key";
import { type Alter, type Pitch, type Step, formatPitchAscii, formatPitchClassPt, formatPitchPt, parsePitch, toMidi } from "../music/pitch";
import type { Score } from "../music/score";
import { changeKey } from "../music/timeline-ops";
import { parseKey, scoreFromText } from "../music/text-notation";
import { RULES, validateScore } from "../validation/engine";
import { buildContext } from "../validation/context";
import { classifyMotion, MOTION_PT, type MotionType } from "../validation/motion";
import { NCT_PT, analyzeNonChordTones } from "../validation/rules/nct";
import { chordScore } from "./generators";
import { CADENCE_PT, CADENCE_SNIPPETS, ERROR_SNIPPETS, NCT_SNIPPETS, REALIZATION_PROBLEMS, REHARM_PROBLEMS, type RealizationProblem, realizationScore, reharmScore } from "./library";
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

const VOICE_PT = { S: "Soprano", A: "Contralto", T: "Tenor", B: "Baixo" } as const;

/** Notas de uma voz, por extenso ("Mi5 – Ré5 – Dó5"). */
function voiceLine(score: Score, voice: "S" | "A" | "T" | "B"): string {
  const part = score.parts.find((p) => p.voice === voice)!;
  return part.events.flatMap((e) => (e.kind === "note" ? [formatPitchPt(e.pitch)] : [])).join(" – ");
}

/**
 * Baixo dado / canto dado: mostra a voz dada e pede a realização correta das
 * outras três. A certa é limpa no motor; cada errada traz o diagnóstico que a
 * reprova como comentário específico.
 */
export function generateRealizationItems(rng: Rng, count: number, mode?: RealizationProblem["mode"]): ChoiceItem[] {
  const pool = REALIZATION_PROBLEMS.filter((p) => !mode || p.mode === mode);
  const items: ChoiceItem[] = [];
  for (const p of shuffle(rng, pool).slice(0, count)) {
    const given = p.mode === "baixo-dado" ? "B" : "S";
    const others = (["S", "A", "T", "B"] as const).filter((v) => v !== given);
    const correct = realizationScore(p, p.correct);
    if (validateScore(correct).diagnostics.some((d) => d.severity !== "info")) continue;
    const wrong = p.wrong.map((w) => realizationScore(p, w)).map((sc) => ({ sc, d: validateScore(sc).diagnostics.find((d) => d.severity === "erro" || d.severity === "alerta") }));
    if (wrong.some((w) => !w.d)) continue;
    const label = (sc: Score) => others.map((v) => `${VOICE_PT[v]}: ${voiceLine(sc, v)}`).join(" · ");
    const entries = shuffle(rng, [{ label: label(correct), ok: true, feedback: "" }, ...wrong.map((w) => ({ label: label(w.sc), ok: false, feedback: `${w.d!.message} ${w.d!.explanation}` }))]);
    const options: ChoiceOption[] = entries.map((e, i) => ({ id: `o${i}`, label: e.label }));
    const optionFeedback: Record<string, string> = {};
    entries.forEach((e, i) => {
      if (!e.ok) optionFeedback[`o${i}`] = e.feedback;
    });
    const notation: Score = {
      ...correct,
      parts: correct.parts.map((part) =>
        part.voice === given ? part : { ...part, events: part.events.map((e) => ({ id: e.id, kind: "rest" as const, duration: e.duration })) },
      ),
    };
    items.push({
      id: `real-${items.length + 1}`,
      kind: "choice",
      skill: "conducao-de-vozes",
      prompt: `${p.mode === "baixo-dado" ? "Baixo dado" : "Canto dado"} em ${keyNamePt(correct.key)}: qual realização das outras vozes não tem erros de condução?`,
      options,
      correctOptionId: options[entries.findIndex((e) => e.ok)]!.id,
      explanation: `A realização correta completa cada acorde (fundamental, terça e quinta, com a dobra adequada), resolve a sensível e evita paralelas: ${label(correct)}.`,
      optionFeedback,
      notation,
    });
  }
  return items;
}

/** Intervalos acima do baixo (número, qualidade); oitava/décima etc. compostos. */
type Above = readonly [number, IntervalQuality];
const TTBB_VOICINGS: { readonly correct: readonly (readonly [Above, Above, Above])[]; readonly wrong: readonly { readonly bassDown?: boolean; readonly upper: readonly [Above, Above, Above] }[] } = {
  // Barítono, Tenor II, Tenor I (acima do baixo): fundamental e quinta embaixo, terça nos tenores.
  correct: [
    [[5, "P"], [8, "P"], [10, "M"]],
    [[5, "P"], [10, "M"], [12, "P"]],
    [[8, "P"], [10, "M"], [12, "P"]],
  ],
  wrong: [
    { upper: [[3, "M"], [5, "P"], [8, "P"]] }, // terça colada no baixo, no grave
    { bassDown: true, upper: [[12, "P"], [15, "P"], [17, "M"]] }, // baixo uma oitava abaixo
    { upper: [[5, "P"], [10, "M"], [8, "P"]] }, // Tenor I abaixo do Tenor II
    { upper: [[5, "P"], [8, "P"], [17, "M"]] }, // Tenor I longe demais do Tenor II
  ],
};
/** O problema que melhor explica a reprovação: erros e alertas primeiro; tessitura por último. */
function mainProblem<D extends { severity: string; ruleId: string }>(ds: readonly D[]): D | undefined {
  const rank = (d: D) => ({ erro: 0, alerta: 1, sugestao: 2 })[d.severity as "erro"] ?? 3;
  return ds.filter((d) => d.severity !== "info").sort((a, b) => rank(a) - rank(b) || Number(a.ruleId === "extensao.fora-da-tessitura") - Number(b.ruleId === "extensao.fora-da-tessitura"))[0];
}
const TTBB_ROOTS = ["F2", "G2", "A2", "Bb2", "C3", "D3"];
const TTBB_VOICE_PT = { B2: "Baixo", B1: "Barítono", T2: "Tenor II", T1: "Tenor I" } as const;

/**
 * Distribuição TTBB: qual voicing de um acorde maior soa claro no coro masculino?
 * A certa é limpa no motor (coral tradicional); cada errada traz o diagnóstico
 * que a reprova como comentário específico.
 */
export function generateTtbbVoicingItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  let guard = 0;
  while (items.length < count && guard++ < count * 20) {
    const root = parsePitch(pick(rng, TTBB_ROOTS));
    const build = (bass: Pitch, upper: readonly [Above, Above, Above]) => {
      const [b1, t2, t1] = upper.map(([n, q]) => transposeByInterval(bass, n, q, 1)) as [Pitch, Pitch, Pitch];
      const pitches = { B2: bass, B1: b1, T2: t2, T1: t1 };
      const score = scoreFromText({
        id: `ttbb-voicing-${items.length + 1}`,
        title: "Acorde em TTBB",
        formation: "TTBB",
        key: "C",
        time: "4/4",
        voices: { T1: `${formatPitchAscii(t1)}:w`, T2: `${formatPitchAscii(t2)}:w`, B1: `${formatPitchAscii(b1)}:w`, B2: `${formatPitchAscii(bass)}:w` },
      });
      const label = (["B2", "B1", "T2", "T1"] as const).map((v) => `${TTBB_VOICE_PT[v]}: ${formatPitchPt(pitches[v])}`).join(" · ");
      return { score, label, pitches: [bass, b1, t2, t1] };
    };
    const correct = build(root, pick(rng, TTBB_VOICINGS.correct));
    if (validateScore(correct.score).diagnostics.some((d) => d.severity !== "info")) continue;
    const wrong = shuffle(rng, [...TTBB_VOICINGS.wrong])
      .slice(0, 3)
      .map((w) => build(w.bassDown ? transposeByInterval(root, 8, "P", -1) : root, w.upper))
      .map((w) => ({ ...w, d: mainProblem(validateScore(w.score).diagnostics) }));
    if (wrong.some((w) => !w.d)) continue;
    const entries = shuffle(rng, [{ label: correct.label, feedback: "" }, ...wrong.map((w) => ({ label: w.label, feedback: `${w.d!.message} ${w.d!.explanation}` }))]);
    const options: ChoiceOption[] = entries.map((e, i) => ({ id: `o${i}`, label: e.label }));
    const optionFeedback: Record<string, string> = {};
    entries.forEach((e, i) => {
      if (e.feedback) optionFeedback[`o${i}`] = e.feedback;
    });
    items.push({
      id: `ttbb-voicing-${items.length + 1}`,
      kind: "choice",
      skill: "escrita-ttbb",
      prompt: `Acorde de ${formatPitchClassPt(root)} maior para quarteto masculino (TTBB), com a fundamental no baixo: qual distribuição soa clara e respeita as vozes?`,
      options,
      correctOptionId: options[entries.findIndex((e) => e.label === correct.label)]!.id,
      explanation: `Fundamental e quinta entre baixo e barítono, terça nos tenores, tudo dentro das extensões: o acorde soa claro no grave. (${correct.label})`,
      optionFeedback,
      audio: { pitches: correct.pitches, mode: "harmonico" },
    });
  }
  return items;
}

const SSAA_VOICINGS: { readonly correct: readonly (readonly [Above, Above, Above])[]; readonly wrong: readonly { readonly bass?: "oitava-abaixo" | "quinta"; readonly upper: readonly [Above, Above, Above] }[] } = {
  // Contralto I, Soprano II, Soprano I (acima do Contralto II, que tem a fundamental).
  correct: [
    [[3, "M"], [5, "P"], [8, "P"]],
    [[5, "P"], [8, "P"], [10, "M"]],
    [[5, "P"], [10, "M"], [12, "P"]],
  ],
  wrong: [
    { bass: "oitava-abaixo", upper: [[10, "M"], [12, "P"], [15, "P"]] }, // Contralto II escrita como baixo de coro misto
    { bass: "quinta", upper: [[4, "P"], [6, "M"], [8, "P"]] }, // quinta na voz mais grave: acorde em segunda inversão
    { upper: [[5, "P"], [10, "M"], [8, "P"]] }, // Soprano I abaixo do Soprano II
    { upper: [[3, "M"], [12, "P"], [15, "P"]] }, // buraco entre contraltos e sopranos
  ],
};
const SSAA_ROOTS = ["G3", "A3", "Bb3", "C4", "D4"];
const SSAA_VOICE_PT = { A2: "Contralto II", A1: "Contralto I", S2: "Soprano II", S1: "Soprano I" } as const;

/**
 * Distribuição SSAA: qual voicing de um acorde maior funciona em vozes iguais
 * agudas, sem baixo real? A certa é limpa no motor; cada errada traz o
 * diagnóstico que a reprova.
 */
export function generateSsaaVoicingItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  let guard = 0;
  while (items.length < count && guard++ < count * 20) {
    const root = parsePitch(pick(rng, SSAA_ROOTS));
    const build = (bass: Pitch, upper: readonly [Above, Above, Above]) => {
      const [a1, s2, s1] = upper.map(([n, q]) => transposeByInterval(bass, n, q, 1)) as [Pitch, Pitch, Pitch];
      const pitches = { A2: bass, A1: a1, S2: s2, S1: s1 };
      const score = scoreFromText({
        id: `ssaa-voicing-${items.length + 1}`,
        title: "Acorde em SSAA",
        formation: "SSAA",
        key: "C",
        time: "4/4",
        voices: { S1: `${formatPitchAscii(s1)}:w`, S2: `${formatPitchAscii(s2)}:w`, A1: `${formatPitchAscii(a1)}:w`, A2: `${formatPitchAscii(bass)}:w` },
      });
      const label = (["A2", "A1", "S2", "S1"] as const).map((v) => `${SSAA_VOICE_PT[v]}: ${formatPitchPt(pitches[v])}`).join(" · ");
      return { score, label, pitches: [bass, a1, s2, s1] };
    };
    const correct = build(root, pick(rng, SSAA_VOICINGS.correct));
    if (validateScore(correct.score).diagnostics.some((d) => d.severity !== "info")) continue;
    const wrong = shuffle(rng, [...SSAA_VOICINGS.wrong])
      .slice(0, 3)
      .map((w) => build(w.bass === "oitava-abaixo" ? transposeByInterval(root, 8, "P", -1) : w.bass === "quinta" ? transposeByInterval(root, 4, "P", -1) : root, w.upper))
      .map((w) => ({ ...w, d: mainProblem(validateScore(w.score).diagnostics) }));
    if (wrong.some((w) => !w.d)) continue;
    const entries = shuffle(rng, [{ label: correct.label, feedback: "" }, ...wrong.map((w) => ({ label: w.label, feedback: `${w.d!.message} ${w.d!.explanation}` }))]);
    const options: ChoiceOption[] = entries.map((e, i) => ({ id: `o${i}`, label: e.label }));
    const optionFeedback: Record<string, string> = {};
    entries.forEach((e, i) => {
      if (e.feedback) optionFeedback[`o${i}`] = e.feedback;
    });
    items.push({
      id: `ssaa-voicing-${items.length + 1}`,
      kind: "choice",
      skill: "escrita-ssaa",
      prompt: `Acorde de ${formatPitchClassPt(root)} maior para coro feminino (SSAA), com a fundamental no Contralto II: qual distribuição funciona sem baixo real?`,
      options,
      correctOptionId: options[entries.findIndex((e) => e.label === correct.label)]!.id,
      explanation: `Fundamental na voz mais grave, acorde completo e vozes próximas (no máximo uma oitava entre vizinhas), tudo dentro das extensões. (${correct.label})`,
      optionFeedback,
      audio: { pitches: correct.pitches, mode: "harmonico" },
    });
  }
  return items;
}

/**
 * Rearmonização: a melodia do soprano fica e a harmonia muda. Mostra a harmonia
 * original e pede a rearmonização que passa limpa no motor; cada alternativa
 * errada traz o diagnóstico que a reprova.
 */
export function generateReharmItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  for (const p of shuffle(rng, [...REHARM_PROBLEMS]).slice(0, count)) {
    const original = reharmScore(p, p.original);
    if (validateScore(reharmScore(p, p.correct)).diagnostics.some((d) => d.severity !== "info")) continue;
    const wrong = p.wrong.map((w) => ({ w, d: mainProblem(validateScore(reharmScore(p, w)).diagnostics) }));
    if (wrong.some((x) => !x.d || (x.d.severity !== "erro" && x.d.severity !== "alerta"))) continue;
    const entries = shuffle(rng, [{ label: p.correct.label, feedback: "" }, ...wrong.map((x) => ({ label: x.w.label, feedback: `${x.d!.message} ${x.d!.explanation}` }))]);
    const options: ChoiceOption[] = entries.map((e, i) => ({ id: `o${i}`, label: e.label }));
    const optionFeedback: Record<string, string> = {};
    entries.forEach((e, i) => {
      if (e.feedback) optionFeedback[`o${i}`] = e.feedback;
    });
    items.push({
      id: `rearm-${items.length + 1}`,
      kind: "choice",
      skill: "harmonia-funcional",
      prompt: `A melodia do soprano (${voiceLine(original, "S")}) está harmonizada com ${p.original.label}. Qual rearmonização mantém a melodia e passa sem erros no coral tradicional?`,
      options,
      correctOptionId: options[entries.findIndex((e) => e.label === p.correct.label)]!.id,
      explanation: `${p.correct.label}: cada nota da melodia pertence ao acorde novo e as vozes resolvem sensíveis e sétimas por grau.`,
      optionFeedback,
      notation: original,
    });
  }
  return items;
}

/** Intervalos harmônicos do contraponto a duas vozes (simples e compostos). */
const CP_INTERVALS: readonly (readonly [number, IntervalQuality])[] = [
  [1, "P"], [8, "P"], [5, "P"], [12, "P"], [15, "P"],
  [3, "M"], [3, "m"], [6, "M"], [6, "m"], [10, "M"], [10, "m"], [13, "m"],
  [2, "M"], [2, "m"], [4, "P"], [4, "A"], [5, "d"], [7, "m"], [7, "M"], [9, "M"], [11, "P"],
];
const CP_CLASS = {
  perfeita: "Consonância perfeita",
  imperfeita: "Consonância imperfeita",
  dissonancia: "Dissonância",
} as const;

/** Classe de um intervalo no contraponto a duas vozes (a 4ª justa conta como dissonância). */
export function counterpointClass(number: number, quality: IntervalQuality): keyof typeof CP_CLASS {
  const simple = ((number - 1) % 7) + 1;
  if (quality === "P" && (simple === 1 || simple === 5)) return "perfeita";
  if ((simple === 3 || simple === 6) && (quality === "M" || quality === "m")) return "imperfeita";
  return "dissonancia";
}

/**
 * Contraponto: classificar o intervalo harmônico entre duas vozes (consonância
 * perfeita, imperfeita ou dissonância), com escuta das duas notas juntas.
 */
export function generateCounterpointIntervalItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  const lows = ["C3", "D3", "E3", "F3", "G3", "A3"].map(parsePitch);
  for (const [n, q] of shuffle(rng, [...CP_INTERVALS]).slice(0, count)) {
    const low = pick(rng, lows);
    const high = transposeByInterval(low, n, q, 1);
    const cls = counterpointClass(n, q);
    const options: ChoiceOption[] = (Object.keys(CP_CLASS) as (keyof typeof CP_CLASS)[]).map((k) => ({ id: k, label: CP_CLASS[k] }));
    items.push({
      id: `cp-int-${items.length + 1}`,
      kind: "choice",
      skill: "contraponto",
      prompt: `Contraponto a duas vozes: ${formatPitchPt(low)} no baixo e ${formatPitchPt(high)} em cima (${intervalNamePt({ number: n, quality: q })}). Como esse intervalo se classifica?`,
      options,
      correctOptionId: cls,
      explanation: {
        perfeita: "Uníssono, quinta e oitava justas (e seus compostos) são consonâncias perfeitas: estáveis, mas não podem andar em paralelo.",
        imperfeita: "Terças e sextas (e seus compostos) são consonâncias imperfeitas: podem andar em paralelo e dão independência às vozes.",
        dissonancia: "Segundas, sétimas, nonas, trítono e, a duas vozes, também a quarta justa são dissonâncias: entram como nota de passagem, bordadura ou retardo e resolvem por grau.",
      }[cls],
      audio: { pitches: [low, high], mode: "harmonico" },
    });
  }
  return items;
}

type Gesture = "baixo" | "dentro" | "fora" | "cima";
const GESTURE_PT: Record<Gesture, string> = { baixo: "Para baixo", dentro: "Para dentro (esquerda)", fora: "Para fora (direita)", cima: "Para cima" };
/** Padrões de regência da mão direita (a direção de cada tempo). */
export const CONDUCTING_PATTERNS: Readonly<Record<string, readonly Gesture[]>> = {
  "2/4": ["baixo", "cima"],
  "3/4": ["baixo", "fora", "cima"],
  "4/4": ["baixo", "dentro", "fora", "cima"],
  "6/8": ["baixo", "dentro", "dentro", "fora", "fora", "cima"],
};
/** Limite de frase sem respiração usado pelo motor (regra escrita.respiracao), em segundos. */
const BREATH_LIMIT_S = 15;

/**
 * Regência e ensaio: direção do gesto em cada tempo, tempo da preparação
 * numa anacruse e duração de uma frase em segundos a partir do andamento.
 */
export function generateConductingItems(rng: Rng, count: number): ChoiceItem[] {
  const items: ChoiceItem[] = [];
  const kinds = shuffle(rng, ["padrao", "anacruse", "duracao"] as const);
  for (let k = 0; items.length < count && k < count * 10; k++) {
    const kind = kinds[items.length % kinds.length]!;
    const id = `reg-${items.length + 1}`;
    if (kind === "padrao") {
      const time = pick(rng, Object.keys(CONDUCTING_PATTERNS));
      const pattern = CONDUCTING_PATTERNS[time]!;
      const beat = 1 + Math.floor(rng() * pattern.length);
      const answer = pattern[beat - 1]!;
      items.push({
        id,
        kind: "choice",
        skill: "regencia",
        prompt: `Regendo em ${time}${time === "6/8" ? " (em seis)" : ""} com a mão direita: para onde vai o gesto do tempo ${beat}?`,
        options: (Object.keys(GESTURE_PT) as Gesture[]).map((g) => ({ id: g, label: GESTURE_PT[g] })),
        correctOptionId: answer,
        explanation: `Padrão de ${time}: ${pattern.map((g, i) => `${i + 1} ${GESTURE_PT[g].toLowerCase()}`).join(", ")}. O primeiro tempo sempre desce e o último sempre sobe, preparando o compasso seguinte.`,
      });
    } else if (kind === "anacruse") {
      const time = pick(rng, ["3/4", "4/4"]);
      const beats = CONDUCTING_PATTERNS[time]!.length;
      const entry = beats - Math.floor(rng() * 2); // entrada no último ou penúltimo tempo
      const prep = entry - 1;
      items.push({
        id,
        kind: "choice",
        skill: "regencia",
        prompt: `Uma música em ${time} começa com anacruse no tempo ${entry}. Em qual tempo o regente faz o gesto de preparação (a respiração do coro)?`,
        options: Array.from({ length: beats }, (_, i) => ({ id: `t${i + 1}`, label: `Tempo ${i + 1}` })),
        correctOptionId: `t${prep}`,
        explanation: `A preparação é o tempo imediatamente anterior à entrada: o coro respira junto com esse gesto e canta no tempo ${entry}. Começar a reger do tempo 1 confunde quem entra na anacruse.`,
      });
    } else {
      const bpm = pick(rng, [60, 72, 80, 90, 120]);
      const beatsPerBar = pick(rng, [3, 4]);
      const bars = pick(rng, [2, 4, 8]);
      const seconds = (bars * beatsPerBar * 60) / bpm;
      const fmt = (s: number) => `${Number.isInteger(s) ? s : s.toFixed(1).replace(".", ",")} s`;
      const correct = fmt(seconds);
      const distractors = [fmt(seconds * 2), fmt(seconds / 2), fmt((bars * 60) / bpm), fmt((bars * beatsPerBar * bpm) / 60)].filter((d) => d !== correct);
      const fits = seconds <= BREATH_LIMIT_S;
      items.push(
        choice(id, "regencia", `Uma frase de ${bars} compassos em ${beatsPerBar}/4, a ♩ = ${bpm}, cantada sem pausa: quanto tempo ela dura?`, correct, distractors, rng, {
          explanation: `${bars} compassos × ${beatsPerBar} tempos = ${bars * beatsPerBar} tempos; cada tempo dura 60/${bpm} s, então a frase dura ${correct}. ${fits ? `Cabe numa respiração (o motor alerta a partir de ${BREATH_LIMIT_S} s).` : `Passa de ${BREATH_LIMIT_S} s: o regente precisa marcar uma respiração (ou respiração escalonada) ou escolher um andamento mais rápido.`}`,
        }),
      );
    }
  }
  return items;
}
