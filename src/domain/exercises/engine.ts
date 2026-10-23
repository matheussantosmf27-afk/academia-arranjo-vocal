import { generateChordItems, generateIntervalItems, generateRangeItems } from "./generators";
import {
  generateCadenceItems,
  generateErrorItems,
  generateFunctionItems,
  generateKeySignatureItems,
  generateMotionItems,
  generateNctItems,
  generateScaleDegreeItems,
  generateSeventhItems,
} from "./generators2";
import { createRng, shuffle } from "./random";
import type { AnswerRecord, ExerciseItem, ExerciseSetSpec, MasteryResult } from "./types";

/** Monta o conjunto de itens de uma tentativa. Mesma semente ⇒ mesmos itens, na mesma ordem. */
export function buildExerciseSet(spec: ExerciseSetSpec, seed: number): ExerciseItem[] {
  const rng = createRng(seed);
  const generated: ExerciseItem[] = [];
  for (const g of spec.generators) {
    if (g.type === "interval-identification") {
      generated.push(...generateIntervalItems(rng, g.count, { ...(g.earOnly ? { earOnly: true } : {}), ...(g.maxNumber ? { maxNumber: g.maxNumber } : {}) }));
    } else if (g.type === "chord-identification") generated.push(...generateChordItems(rng, g.count));
    else if (g.type === "range-check") generated.push(...generateRangeItems(rng, g.count));
    else if (g.type === "key-signature") generated.push(...generateKeySignatureItems(rng, g.count));
    else if (g.type === "scale-degree") generated.push(...generateScaleDegreeItems(rng, g.count));
    else if (g.type === "seventh-identification") generated.push(...generateSeventhItems(rng, g.count));
    else if (g.type === "function-identification") generated.push(...generateFunctionItems(rng, g.count));
    else if (g.type === "motion-type") generated.push(...generateMotionItems(rng, g.count));
    else if (g.type === "voice-leading-error") generated.push(...generateErrorItems(rng, g.count, g.ruleIds));
    else if (g.type === "cadence-identification") generated.push(...generateCadenceItems(rng, g.count));
    else generated.push(...generateNctItems(rng, g.count));
  }
  // Itens estáticos mantêm a ordem pedagógica; gerados são embaralhados entre si.
  const items = [...spec.staticItems, ...shuffle(rng, generated)];
  return items.map((item, i) => (spec.staticItems.includes(item) ? item : { ...item, id: `${item.id}-${i}` }));
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
