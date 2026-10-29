import { describe, expect, it } from "vitest";
import { identifyChord } from "../../music/chord";
import { intervalBetween, intervalNamePt } from "../../music/interval";
import { REVIEW_SIZE, buildExerciseSet, buildReviewSet, checkAnswer, evaluateMastery, evaluateReview } from "../engine";
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

describe("itens fixos sem pista de posição e revisão sem repetição literal", () => {
  it("embaralha as alternativas dos itens fixos de forma determinística, sem mudar a resposta", () => {
    const firsts = new Set<string>();
    for (let seed = 1; seed <= 40; seed++) {
      const a = buildExerciseSet(spec, seed)[0]!;
      const b = buildExerciseSet(spec, seed)[0]!;
      expect(a.options).toEqual(b.options);
      expect(a.correctOptionId).toBe("a");
      expect([...a.options].map((o) => o.id).sort()).toEqual(["a", "b"]);
      firsts.add(a.options[0]!.id);
    }
    expect(firsts).toEqual(new Set(["a", "b"]));
  });

  it("os itens gerados de uma semente não mudam com o embaralhamento dos fixos", () => {
    const set = buildExerciseSet(spec, 99);
    const gerados = set.slice(spec.staticItems.length);
    expect(gerados.every((i, k) => i.id.endsWith(`-${spec.staticItems.length + k}`))).toBe(true);
    expect(buildExerciseSet(spec, 99).map((i) => i.prompt)).toEqual(set.map((i) => i.prompt));
  });

  it("a revisão usa só itens gerados, com o tamanho fixo e critério de 80%", () => {
    const items = buildReviewSet(spec, 5);
    expect(items).toHaveLength(REVIEW_SIZE);
    expect(items.some((i) => i.prompt === "?")).toBe(false);
    expect(buildReviewSet(spec, 5).map((i) => i.prompt)).toEqual(items.map((i) => i.prompt));
    const quatro = items.map((i, k) => checkAnswer(i, k < 4 ? i.correctOptionId : "x"));
    expect(evaluateReview(items, quatro).passed).toBe(true);
    const tres = items.map((i, k) => checkAnswer(i, k < 3 ? i.correctOptionId : "x"));
    expect(evaluateReview(items, tres).passed).toBe(false);
  });
});

describe("escuta na revisão espaçada", () => {
  it("acordes e intervalos voltam só de ouvido, com a partitura escondida até a resposta", () => {
    let ouvido = 0;
    for (let seed = 1; seed <= 10; seed++) {
      for (const i of buildReviewSet(spec, seed)) {
        if (i.skill === "acordes" || i.skill === "intervalos") throw new Error(`item de leitura na revisão: ${i.prompt}`);
        if (i.earOnly) ouvido++;
      }
    }
    expect(ouvido).toBeGreaterThan(0);
  });
});
