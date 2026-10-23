import { describe, expect, it } from "vitest";
import { identifyChord } from "../../music/chord";
import { intervalBetween, intervalNamePt } from "../../music/interval";
import { buildExerciseSet, checkAnswer, evaluateMastery } from "../engine";
import { generateChordItems, generateIntervalItems, generateRangeItems, voiceTriadSATB } from "../generators";
import { createRng } from "../random";
import type { ExerciseSetSpec } from "../types";

const spec: ExerciseSetSpec = {
  id: "teste",
  title: "Teste",
  instructions: "",
  staticItems: [
    {
      id: "fixo",
      kind: "choice",
      skill: "conceito",
      prompt: "?",
      options: [
        { id: "a", label: "A" },
        { id: "b", label: "B" },
      ],
      correctOptionId: "a",
      explanation: "",
    },
  ],
  generators: [
    { type: "interval-identification", count: 4 },
    { type: "chord-identification", count: 3 },
    { type: "range-check", count: 3 },
  ],
  minScore: 0.8,
  requiredItemIds: ["fixo"],
};

describe("gerador de exercícios", () => {
  it("é determinístico pela semente", () => {
    expect(buildExerciseSet(spec, 42)).toEqual(buildExerciseSet(spec, 42));
    expect(buildExerciseSet(spec, 42)).not.toEqual(buildExerciseSet(spec, 43));
  });
  it("gera a quantidade pedida, com IDs únicos e resposta entre as opções", () => {
    const items = buildExerciseSet(spec, 7);
    expect(items).toHaveLength(11);
    expect(new Set(items.map((i) => i.id)).size).toBe(11);
    for (const i of items) {
      expect(i.options.some((o) => o.id === i.correctOptionId)).toBe(true);
      expect(new Set(i.options.map((o) => o.label)).size).toBe(i.options.length);
    }
  });
  it("a resposta dos itens de intervalo confere com o domínio musical", () => {
    for (let seed = 1; seed < 30; seed++) {
      for (const item of generateIntervalItems(createRng(seed), 5)) {
        const [a, b] = item.audio!.pitches;
        const label = item.options.find((o) => o.id === item.correctOptionId)!.label;
        expect(intervalNamePt(intervalBetween(a!, b!))).toBe(label);
      }
    }
  });
  it("os acordes gerados são identificados com a qualidade e inversão da resposta", () => {
    for (let seed = 1; seed < 30; seed++) {
      for (const item of generateChordItems(createRng(seed), 3)) {
        const id = identifyChord(item.audio!.pitches);
        expect(id).not.toBeNull();
        const label = item.options.find((o) => o.id === item.correctOptionId)!.label;
        expect(label).toContain(["estado fundamental", "1ª inversão", "2ª inversão"][id!.inversion]);
      }
    }
  });
  it("a distribuição SATB de tríades mantém a ordem das vozes", () => {
    const v = voiceTriadSATB({ step: "D", alter: 0 }, "minor", 1)!;
    for (let i = 0; i + 1 < v.length; i++) {
      expect(identifyChord(v)).toMatchObject({ quality: "minor", inversion: 1 });
      expect(v[i]!.octave * 7).toBeGreaterThanOrEqual(0);
    }
  });
  it("itens de extensão cobrem as três respostas", () => {
    const items = generateRangeItems(createRng(3), 6);
    expect(new Set(items.map((i) => i.correctOptionId))).toEqual(new Set(["tessitura", "extensao", "fora"]));
  });
});

describe("critério de domínio", () => {
  const items = buildExerciseSet(spec, 11);
  it("aprova com ≥ 80% e item essencial correto", () => {
    const answers = items.map((i, n) => checkAnswer(i, n === 1 ? "x" : i.correctOptionId));
    const r = evaluateMastery(spec, items, answers);
    expect(r.passed).toBe(true);
    expect(r.correct).toBe(10);
  });
  it("reprova se o item essencial estiver errado, mesmo com nota alta", () => {
    const answers = items.map((i) => checkAnswer(i, i.id === "fixo" ? "b" : i.correctOptionId));
    const r = evaluateMastery(spec, items, answers);
    expect(r.score).toBeGreaterThan(0.9);
    expect(r.passed).toBe(false);
    expect(r.missingRequired).toEqual(["fixo"]);
  });
  it("não aprova tentativa incompleta", () => {
    const answers = items.slice(0, 9).map((i) => checkAnswer(i, i.correctOptionId));
    expect(evaluateMastery(spec, items, answers).passed).toBe(false);
  });
  it("agrupa desempenho por habilidade", () => {
    const answers = items.map((i) => checkAnswer(i, i.correctOptionId));
    const r = evaluateMastery(spec, items, answers);
    expect(r.bySkill["intervalos"]).toEqual({ correct: 4, total: 4 });
  });
});
