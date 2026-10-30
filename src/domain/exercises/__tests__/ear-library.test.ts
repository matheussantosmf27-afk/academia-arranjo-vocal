import { describe, expect, it } from "vitest";
import { validateScore } from "../../validation/engine";
import { EAR_COMPARISONS, comparisonScore, generateEarComparisonItems, versionScore } from "../ear-library";
import { buildExerciseSet, buildReviewSet } from "../engine";
import { createRng } from "../random";

const has = (c: (typeof EAR_COMPARISONS)[number], which: "marked" | "plain") =>
  validateScore(versionScore(c, which)).diagnostics.some((d) => d.ruleId === c.rule!.id && (!c.rule!.message || d.message.includes(c.rule!.message)));

describe("comparações auditivas", () => {
  it("cada tema aparece uma vez e as duas versões têm as mesmas vozes", () => {
    expect(new Set(EAR_COMPARISONS.map((c) => c.topic)).size).toBe(EAR_COMPARISONS.length);
    for (const c of EAR_COMPARISONS) expect(Object.keys(c.marked).sort()).toEqual(Object.keys(c.plain).sort());
  });

  it("as versões se leem e a comparação junta as duas com um compasso de pausa", () => {
    for (const c of EAR_COMPARISONS) {
      const a = versionScore(c, "marked");
      const b = versionScore(c, "plain");
      const both = comparisonScore(c, true);
      expect(both.measureCount, c.topic).toBe(a.measureCount + 1 + b.measureCount);
      // mesma duração nas duas versões: o tamanho do trecho não pode servir de pista
      expect(b.measureCount, c.topic).toBe(a.measureCount);
    }
  });

  it.each(EAR_COMPARISONS.filter((c) => c.rule).map((c) => [c.topic, c] as const))("%s: o motor encontra o fenômeno só na versão marcada", (_, c) => {
    expect(has(c, "marked")).toBe(true);
    expect(has(c, "plain")).toBe(false);
  });

  it("a versão de comparação não tem erros do motor", () => {
    // Exceções: no contracanto e na imitação, a comparação é justamente o movimento paralelo que a aula mostra como problema.
    for (const c of EAR_COMPARISONS.filter((x) => x.topic !== "contracanto" && x.topic !== "imitacao")) {
      const serious = validateScore(versionScore(c, "plain")).diagnostics.filter((d) => d.severity === "erro");
      expect(serious.map((d) => `${c.topic}: ${d.ruleId}`)).toEqual([]);
    }
  });

  it("o item é só de ouvido, com a resposta na versão marcada, e a ordem varia", () => {
    const items = generateEarComparisonItems(createRng(7), 12, ["paralelas", "sensivel"]);
    expect(items).toHaveLength(12);
    expect(new Set(items.map((i) => i.correctOptionId))).toEqual(new Set(["primeira", "segunda"]));
    for (const i of items) {
      expect(i.earOnly).toBe(true);
      expect(i.notation).toBeDefined();
      expect(i.options.map((o) => o.id)).toContain(i.correctOptionId);
    }
  });

  it("entra na verificação e na revisão espaçada", () => {
    const spec = { id: "t", title: "", instructions: "", staticItems: [], generators: [{ type: "ear-comparison" as const, count: 2, topics: ["oitavas" as const] }], minScore: 0.8 };
    expect(buildExerciseSet(spec, 1).filter((i) => i.earOnly)).toHaveLength(2);
    expect(buildReviewSet(spec, 1).every((i) => i.earOnly)).toBe(true);
  });
});
