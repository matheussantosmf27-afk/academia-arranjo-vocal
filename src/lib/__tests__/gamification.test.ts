import { describe, expect, it } from "vitest";
import { LESSONS } from "@/content/curriculum/curriculum";
import { EMPTY_PROGRESS, type Attempt, REVIEW_SUFFIX, isMastered } from "../progress/model";
import { XP, gameStats, levelThreshold, studyDays } from "../progress/gamification";
import { REVIEW_INTERVALS_DAYS, dueReviews, reviewStatus } from "../progress/review";

const attempt = (lessonId: string, passed: boolean, finishedAt: string, review = false): Attempt => ({
  id: `${lessonId}-${finishedAt}${review ? "-r" : ""}`,
  lessonId,
  exerciseSetId: review ? `x${REVIEW_SUFFIX}` : "x",
  seed: 1,
  startedAt: finishedAt,
  finishedAt,
  answers: [],
  result: { score: passed ? 1 : 0.5, correct: 1, total: 2, passed, missingRequired: [], bySkill: {} },
});
const day = (d: number) => new Date(Date.UTC(2026, 9, 1 + d, 10)).toISOString();

describe("XP, nível e dias de estudo", () => {
  it("níveis crescem de forma monotônica", () => {
    expect(levelThreshold(1)).toBe(0);
    for (let l = 1; l < 10; l++) expect(levelThreshold(l + 1)).toBeGreaterThan(levelThreshold(l));
  });
  it("XP soma domínio, dias de prática e leituras", () => {
    const s = { ...EMPTY_PROGRESS, attempts: [attempt("intervalos", true, "2026-10-20T10:00:00Z"), attempt("intervalos", false, "2026-10-19T10:00:00Z")], lessonsRead: ["intervalos"] };
    const g = gameStats(s, LESSONS, new Date("2026-10-20T12:00:00Z"));
    expect(g.xp).toBe(XP.mastered + 2 * XP.practiceDay + XP.read);
    expect(g.masteredCount).toBe(1);
    expect(g.levelProgress).toBeGreaterThanOrEqual(0);
    expect(g.levelProgress).toBeLessThan(1);
  });
  it("repetir a mesma verificação no mesmo dia não rende XP extra", () => {
    const repetidas = Array.from({ length: 20 }, (_, i) => attempt("intervalos", false, `2026-10-20T10:${String(i).padStart(2, "0")}:00Z`));
    const g = gameStats({ ...EMPTY_PROGRESS, attempts: repetidas }, LESSONS, new Date("2026-10-20T12:00:00Z"));
    expect(g.xp).toBe(XP.practiceDay);
  });
  it("dias de estudo contam a janela recente e não zeram com uma pausa", () => {
    const s = { ...EMPTY_PROGRESS, attempts: ["2026-10-10", "2026-10-12", "2026-10-18"].map((d) => attempt("intervalos", false, `${d}T09:00:00Z`)) };
    expect(studyDays(s, 14, new Date("2026-10-20T20:00:00Z"))).toBe(3);
    expect(studyDays(s, 7, new Date("2026-10-20T20:00:00Z"))).toBe(1);
    expect(studyDays(EMPTY_PROGRESS)).toBe(0);
  });
});

describe("revisão espaçada", () => {
  it("só aulas dominadas entram na revisão; a primeira vence em 1 dia", () => {
    expect(reviewStatus({ ...EMPTY_PROGRESS, attempts: [attempt("intervalos", false, day(0))] }, "intervalos")).toBeUndefined();
    const s = { ...EMPTY_PROGRESS, attempts: [attempt("intervalos", true, day(0))] };
    expect(reviewStatus(s, "intervalos", new Date(day(0)))!.isDue).toBe(false);
    const r = reviewStatus(s, "intervalos", new Date(day(1)))!;
    expect(r.isDue).toBe(true);
    expect(r.stage).toBe(0);
  });

  it("revisão aprovada no prazo aumenta o intervalo; antes do prazo não conta", () => {
    const s = {
      ...EMPTY_PROGRESS,
      attempts: [attempt("intervalos", true, day(0)), attempt("intervalos", true, day(0), true), attempt("intervalos", true, day(1), true), attempt("intervalos", true, day(4), true)],
    };
    const r = reviewStatus(s, "intervalos", new Date(day(5)))!;
    expect(r.reviewsDone).toBe(3);
    expect(r.retained).toBe(2);
    expect(r.stage).toBe(2);
    expect(r.due.toISOString()).toBe(new Date(Date.parse(day(4)) + REVIEW_INTERVALS_DAYS[2] * 86_400_000).toISOString());
  });

  it("revisão reprovada volta ao início e conta lapso, sem tirar o domínio", () => {
    const s = { ...EMPTY_PROGRESS, attempts: [attempt("intervalos", true, day(0)), attempt("intervalos", true, day(1), true), attempt("intervalos", false, day(5), true)] };
    const r = reviewStatus(s, "intervalos", new Date(day(5)))!;
    expect(r.lapses).toBe(1);
    expect(r.stage).toBe(0);
    expect(r.retained).toBe(1);
    expect(isMastered(s, "intervalos")).toBe(true);
    expect(dueReviews(s, LESSONS, new Date(day(6)))[0]?.lessonId).toBe("intervalos");
  });

  it("uma revisão aprovada não conta como domínio de aula ainda não verificada", () => {
    const s = { ...EMPTY_PROGRESS, attempts: [attempt("intervalos", true, day(0), true)] };
    expect(isMastered(s, "intervalos")).toBe(false);
  });

  it("revisões no prazo valem XP de retenção", () => {
    const s = { ...EMPTY_PROGRESS, attempts: [attempt("intervalos", true, day(0)), attempt("intervalos", true, day(1), true)] };
    const g = gameStats(s, LESSONS, new Date(day(1)));
    expect(g.retainedReviews).toBe(1);
    expect(g.xp).toBe(XP.mastered + XP.practiceDay + XP.review);
  });
});
