import { describe, expect, it } from "vitest";
import { LESSONS, getLesson } from "@/content/curriculum/curriculum";
import { competencyReports } from "../progress/competency";
import { EMPTY_PROGRESS, type Attempt, REVIEW_SUFFIX } from "../progress/model";

const intervalLessons = LESSONS.filter((l) => l.status === "disponivel" && l.exercises && l.competencies.includes("intervalos"));
const [a, b] = intervalLessons as [(typeof LESSONS)[number], (typeof LESSONS)[number]];

const attempt = (lessonId: string, passed: boolean, finishedAt: string, answers: Attempt["answers"], review = false): Attempt => ({
  id: `${lessonId}-${finishedAt}-${review}`,
  lessonId,
  exerciseSetId: review ? `x${REVIEW_SUFFIX}` : "x",
  seed: 1,
  startedAt: finishedAt,
  finishedAt,
  answers,
  result: { score: passed ? 1 : 0, correct: 0, total: 0, passed, missingRequired: [], bySkill: {} },
});

describe("competência em quatro dimensões", () => {
  it("sem tentativas, nenhuma dimensão tem dado", () => {
    const [r] = competencyReports(EMPTY_PROGRESS, LESSONS, ["intervalos"]);
    expect(r).toMatchObject({ mastered: 0, retained: 0, transferTotal: 0, projectsEvaluated: 0 });
    expect(r!.lessons).toBe(intervalLessons.length);
  });

  it("transferência conta só itens gerados de OUTRAS aulas, depois do primeiro domínio", () => {
    expect(b).toBeDefined();
    const staticId = getLesson(b.id)!.exercises!.staticItems[0]!.id;
    const state = {
      ...EMPTY_PROGRESS,
      attempts: [
        // antes do primeiro domínio: não conta
        attempt(b.id, false, "2026-10-01T09:00:00Z", [{ itemId: "gerado-5", skill: "intervalos", chosenOptionId: "o1", correct: true }]),
        attempt(a.id, true, "2026-10-02T09:00:00Z", [{ itemId: "gerado-3", skill: "intervalos", chosenOptionId: "o1", correct: true }]),
        // outra aula, depois do domínio: só o item gerado conta
        attempt(b.id, false, "2026-10-03T09:00:00Z", [
          { itemId: staticId, skill: "conceito", chosenOptionId: "a", correct: true },
          { itemId: "gerado-4", skill: "intervalos", chosenOptionId: "o2", correct: false },
          { itemId: "gerado-5", skill: "intervalos", chosenOptionId: "o1", correct: true },
        ]),
      ],
    };
    const [r] = competencyReports(state, LESSONS, ["intervalos"]);
    expect(r!.mastered).toBe(1);
    expect(r!.transferTotal).toBe(2);
    expect(r!.transferCorrect).toBe(1);
  });

  it("retenção e prática vêm de revisões no prazo e de projetos avaliados", () => {
    const state = {
      ...EMPTY_PROGRESS,
      attempts: [attempt(a.id, true, "2026-10-01T09:00:00Z", []), attempt(a.id, true, "2026-10-02T10:00:00Z", [], true)],
    };
    const [r] = competencyReports(state, LESSONS, ["intervalos"], [{ projectId: "p", lessonId: a.id, evaluated: true, proficient: true }], new Date("2026-10-03T00:00:00Z"));
    expect(r!.retained).toBe(1);
    expect(r!.projects).toBe(1);
    expect(r!.projectsProficient).toBe(1);
  });
});
