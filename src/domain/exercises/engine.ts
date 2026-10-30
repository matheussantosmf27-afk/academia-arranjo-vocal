import { generateChordItems, generateIntervalItems, generateRangeItems } from "./generators";
import {
  generateCadenceItems,
  generateErrorItems,
  generateFunctionItems,
  generateKeySignatureItems,
  generateMotionItems,
  generateNctItems,
  generateRealizationItems,
  generateScaleDegreeItems,
  generateSeventhItems,
  generateCounterpointIntervalItems,
  generateSsaaVoicingItems,
  generateConductingItems,
  generateReharmItems,
  generateTtbbVoicingItems,
} from "./generators2";
import { generateEarComparisonItems } from "./ear-library";
import { createRng, shuffle } from "./random";
import type { AnswerRecord, ExerciseItem, ExerciseSetSpec, GeneratorSpec, MasteryResult } from "./types";

function generateItems(generators: readonly GeneratorSpec[], rng: ReturnType<typeof createRng>): ExerciseItem[] {
  const generated: ExerciseItem[] = [];
  for (const g of generators) {
    if (g.type === "interval-identification") {
      generated.push(...generateIntervalItems(rng, g.count, { ...(g.earOnly ? { earOnly: true } : {}), ...(g.maxNumber ? { maxNumber: g.maxNumber } : {}) }));
    } else if (g.type === "chord-identification") generated.push(...generateChordItems(rng, g.count, g.earOnly ? { earOnly: true } : {}));
    else if (g.type === "range-check") generated.push(...generateRangeItems(rng, g.count, g.formations));
    else if (g.type === "key-signature") generated.push(...generateKeySignatureItems(rng, g.count));
    else if (g.type === "scale-degree") generated.push(...generateScaleDegreeItems(rng, g.count));
    else if (g.type === "seventh-identification") generated.push(...generateSeventhItems(rng, g.count, g.earOnly ? { earOnly: true } : {}));
    else if (g.type === "function-identification") generated.push(...generateFunctionItems(rng, g.count));
    else if (g.type === "motion-type") generated.push(...generateMotionItems(rng, g.count, g.earOnly ? { earOnly: true } : {}));
    else if (g.type === "voice-leading-error") generated.push(...generateErrorItems(rng, g.count, g.ruleIds));
    else if (g.type === "cadence-identification") generated.push(...generateCadenceItems(rng, g.count, g.earOnly ? { earOnly: true } : {}));
    else if (g.type === "realization") generated.push(...generateRealizationItems(rng, g.count, g.mode));
    else if (g.type === "ttbb-voicing") generated.push(...generateTtbbVoicingItems(rng, g.count));
    else if (g.type === "reharm-choice") generated.push(...generateReharmItems(rng, g.count));
    else if (g.type === "counterpoint-interval") generated.push(...generateCounterpointIntervalItems(rng, g.count, g.earOnly ? { earOnly: true } : {}));
    else if (g.type === "ssaa-voicing") generated.push(...generateSsaaVoicingItems(rng, g.count));
    else if (g.type === "conducting") generated.push(...generateConductingItems(rng, g.count));
    else if (g.type === "ear-comparison") generated.push(...generateEarComparisonItems(rng, g.count, g.topics));
    else generated.push(...generateNctItems(rng, g.count));
  }
  return generated;
}

/**
 * Embaralha as alternativas dos itens escritos à mão. Sem isso, a posição da resposta
 * certa vira pista (a auditoria encontrou a certa na 1ª posição na maioria deles) e uma
 * nova tentativa repete o item literalmente. Usa um gerador próprio, derivado da
 * semente, para não alterar os itens gerados de uma semente já registrada.
 */
function shuffleStaticOptions(items: readonly ExerciseItem[], seed: number): ExerciseItem[] {
  const rng = createRng((seed ^ 0x2545f491) >>> 0);
  return items.map((item) => ({ ...item, options: shuffle(rng, item.options) }));
}

/** Monta o conjunto de itens de uma tentativa. Mesma semente ⇒ mesmos itens, na mesma ordem. */
export function buildExerciseSet(spec: ExerciseSetSpec, seed: number): ExerciseItem[] {
  const rng = createRng(seed);
  const generated = generateItems(spec.generators, rng);
  // Itens estáticos mantêm a ordem pedagógica (com alternativas embaralhadas); gerados são embaralhados entre si.
  const statics = shuffleStaticOptions(spec.staticItems, seed);
  const shuffled = shuffle(rng, generated);
  return [...statics, ...shuffled.map((item, i) => ({ ...item, id: `${item.id}-${statics.length + i}` }))];
}

/** Exercícios de reconhecimento que têm variante só de ouvido e voltam assim na revisão. */
const EAR_IN_REVIEW = new Set<GeneratorSpec["type"]>(["interval-identification", "chord-identification", "cadence-identification", "motion-type", "seventh-identification", "counterpoint-interval"]);

/** Quantidade de itens de uma revisão espaçada. */
export const REVIEW_SIZE = 5;

/**
 * Revisão espaçada: só itens GERADOS (notas, tonalidades e acordes sorteados de novo),
 * nunca os itens fixos da verificação, para que a revisão não seja repetição literal.
 * Alterna entre os geradores da lição. Mesma semente ⇒ mesmos itens.
 */
export function buildReviewSet(spec: ExerciseSetSpec, seed: number): ExerciseItem[] {
  // Intervalos, acordes, tétrades, cadências, consonâncias e movimento entre vozes voltam de ouvido: mesmo conceito, outra forma de apresentação.
  const generators = spec.generators.map((g) => (EAR_IN_REVIEW.has(g.type) ? { ...g, earOnly: true } : g));
  return buildPracticeItems({ ...spec, generators }, seed, REVIEW_SIZE).map((item, i) => ({ ...item, id: `revisao-${i}` }));
}

/** Uma revisão é aprovada com 80% de acertos (4 de 5). */
export const REVIEW_MIN_SCORE = 0.8;

export function evaluateReview(items: readonly ExerciseItem[], answers: readonly AnswerRecord[]): MasteryResult {
  return evaluateMastery({ id: "revisao", title: "", instructions: "", staticItems: [], generators: [], minScore: REVIEW_MIN_SCORE }, items, answers);
}

/**
 * Itens de prática formativa ("Pare e pense"): só itens GERADOS, nunca os estáticos
 * da verificação — assim a resposta comentada não antecipa itens pontuados, que
 * são sorteados de novo a cada tentativa. Alterna entre os geradores da lição.
 */
export function buildPracticeItems(spec: ExerciseSetSpec, seed: number, count: number): ExerciseItem[] {
  const rng = createRng(seed);
  const perGenerator = Math.max(1, Math.ceil(count / Math.max(1, spec.generators.length)));
  const byGenerator = spec.generators.map((g) => generateItems([{ ...g, count: perGenerator }], rng));
  const out: ExerciseItem[] = [];
  for (let round = 0; out.length < count && byGenerator.some((list) => list.length > round); round++) {
    for (const list of byGenerator) {
      const item = list[round];
      if (item && out.length < count) out.push({ ...item, id: `pratica-${item.id}-${out.length}` });
    }
  }
  return out;
}

export function checkAnswer(item: ExerciseItem, chosenOptionId: string): AnswerRecord {
  return { itemId: item.id, skill: item.skill, chosenOptionId, correct: item.correctOptionId === chosenOptionId };
}

/**
 * Critério de domínio: proporção mínima de acertos E todos os itens essenciais corretos,
 * com todos os itens respondidos. Não há aprovação parcial "automática".
 */
export function evaluateMastery(spec: ExerciseSetSpec, items: readonly ExerciseItem[], answers: readonly AnswerRecord[]): MasteryResult {
  const byItem = new Map(answers.map((a) => [a.itemId, a]));
  const correct = items.filter((i) => byItem.get(i.id)?.correct).length;
  const total = items.length;
  const score = total === 0 ? 0 : correct / total;
  const missingRequired = (spec.requiredItemIds ?? []).filter((id) => !byItem.get(id)?.correct);
  const bySkill: Record<string, { correct: number; total: number }> = {};
  for (const item of items) {
    const s = (bySkill[item.skill] ??= { correct: 0, total: 0 });
    s.total += 1;
    if (byItem.get(item.id)?.correct) s.correct += 1;
  }
  const allAnswered = items.every((i) => byItem.has(i.id));
  return {
    score,
    correct,
    total,
    passed: allAnswered && score >= spec.minScore && missingRequired.length === 0,
    missingRequired,
    bySkill,
  };
}
