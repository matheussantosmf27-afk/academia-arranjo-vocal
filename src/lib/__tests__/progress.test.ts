import { describe, expect, it } from "vitest";
import { getLesson } from "@/content/curriculum/curriculum";
import { type Attempt, EMPTY_PROGRESS, itemsToReview, lessonStatus, missingPrerequisites, skillSummary } from "../progress/model";

const attempt = (lessonId: string, passed: boolean, finishedAt: string): Attempt => ({
  id: `${lessonId}-${finishedAt}`,
  lessonId,
  exerciseSetId: "x",
  seed: 1,
  startedAt: finishedAt,
  finishedAt,
  answers: [
    { itemId: "a", skill: "intervalos", chosenOptionId: "o1", correct: true },
    { itemId: "b", skill: "intervalos", chosenOptionId: "o2", correct: passed },
  ],
  result: { score: passed ? 1 : 0.5, correct: passed ? 2 : 1, total: 2, passed, missingRequired: [], bySkill: { intervalos: { correct: passed ? 2 : 1, total: 2 } } },
});

describe("progresso e domínio", () => {
  const vozes = getLesson("vozes-claves-extensoes")!;
  const intervalos = getLesson("intervalos")!;
  it("lição com pré-requisito não dominado fica bloqueada", () => {
    expect(lessonStatus(EMPTY_PROGRESS, vozes)).toBe("disponivel");
    expect(lessonStatus(EMPTY_PROGRESS, intervalos)).toBe("bloqueada");
    expect(missingPrerequisites(EMPTY_PROGRESS, intervalos)).toEqual(["vozes-claves-extensoes"]);
  });
  it("tentativa sem domínio não libera a próxima lição", () => {
    const s = { ...EMPTY_PROGRESS, attempts: [attempt("vozes-claves-extensoes", false, "2026-01-01")] };
    expect(lessonStatus(s, vozes)).toBe("em-andamento");
    expect(lessonStatus(s, intervalos)).toBe("bloqueada");
    expect(itemsToReview(s)).toEqual([{ lessonId: "vozes-claves-extensoes", itemId: "b", skill: "intervalos" }]);
  });
  it("domínio libera a próxima lição; perfil usa a melhor tentativa", () => {
    const s = { ...EMPTY_PROGRESS, attempts: [attempt("vozes-claves-extensoes", false, "2026-01-01"), attempt("vozes-claves-extensoes", true, "2026-01-02")] };
    expect(lessonStatus(s, vozes)).toBe("dominada");
    expect(lessonStatus(s, intervalos)).toBe("disponivel");
    expect(skillSummary(s)).toEqual({ intervalos: { correct: 2, total: 2 } });
    expect(itemsToReview(s)).toEqual([]);
  });
  it("lições em preparação nunca aparecem como disponíveis", () => {
    expect(lessonStatus(EMPTY_PROGRESS, getLesson("tetrades")!)).toBe("em-preparacao");
  });
});
