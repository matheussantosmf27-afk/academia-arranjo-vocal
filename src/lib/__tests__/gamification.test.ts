import { describe, expect, it } from "vitest";
import { LESSONS } from "@/content/curriculum/curriculum";
import { EMPTY_PROGRESS, type Attempt } from "../progress/model";
import { XP, gameStats, levelThreshold, studyStreak } from "../progress/gamification";

const attempt = (lessonId: string, passed: boolean, finishedAt: string): Attempt => ({
  id: `${lessonId}-${finishedAt}`,
  lessonId,
  exerciseSetId: "x",
  seed: 1,
  startedAt: finishedAt,
  finishedAt,
  answers: [],
  result: { score: passed ? 1 : 0.5, correct: 1, total: 2, passed, missingRequired: [], bySkill: {} },
});

describe("XP, nível e sequência de estudo", () => {
  it("níveis crescem de forma monotônica", () => {
    expect(levelThreshold(1)).toBe(0);
    for (let l = 1; l < 10; l++) expect(levelThreshold(l + 1)).toBeGreaterThan(levelThreshold(l));
  });
  it("XP soma domínio, tentativas e leituras", () => {
    const s = { ...EMPTY_PROGRESS, attempts: [attempt("intervalos", true, "2026-10-20T10:00:00Z"), attempt("intervalos", false, "2026-10-19T10:00:00Z")], lessonsRead: ["intervalos"] };
    const g = gameStats(s, LESSONS, new Date("2026-10-20T12:00:00Z"));
    expect(g.xp).toBe(XP.mastered + 2 * XP.attempt + XP.read);
    expect(g.masteredCount).toBe(1);
    expect(g.levelProgress).toBeGreaterThanOrEqual(0);
    expect(g.levelProgress).toBeLessThan(1);
  });
  it("sequência conta dias consecutivos até hoje ou ontem", () => {
    const days = ["2026-10-18", "2026-10-19", "2026-10-20"].map((d) => attempt("intervalos", false, `${d}T09:00:00Z`));
    const s = { ...EMPTY_PROGRESS, attempts: days };
    expect(studyStreak(s, new Date("2026-10-20T20:00:00Z"))).toBe(3);
    expect(studyStreak(s, new Date("2026-10-21T08:00:00Z"))).toBe(3);
    expect(studyStreak(s, new Date("2026-10-23T08:00:00Z"))).toBe(0);
    expect(studyStreak(EMPTY_PROGRESS)).toBe(0);
  });
});
