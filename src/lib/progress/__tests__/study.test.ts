import { describe, expect, it } from "vitest";
import type { Attempt, ProgressState } from "../model";
import { REVIEW_SUFFIX } from "../model";
import { retentionAt } from "../study";

const DAY = 86_400_000;
const t0 = Date.UTC(2026, 8, 1);
const att = (lessonId: string, day: number, passed: boolean, review = false): Attempt => ({
  id: `${lessonId}-${day}-${review}`,
  lessonId,
  exerciseSetId: review ? `ex-${lessonId}${REVIEW_SUFFIX}` : `ex-${lessonId}`,
  seed: 1,
  startedAt: new Date(t0 + day * DAY).toISOString(),
  finishedAt: new Date(t0 + day * DAY).toISOString(),
  answers: [],
  result: { score: passed ? 1 : 0, correct: passed ? 1 : 0, total: 1, passed, missingRequired: [], bySkill: {} },
});

describe("retenção aos 7 e 21 dias", () => {
  it("conta só revisões feitas depois do intervalo, e só aulas dominadas há tempo suficiente", () => {
    const state: ProgressState = {
      version: 1,
      lessonsRead: [],
      attempts: [att("a", 0, true), att("a", 3, true, true), att("a", 8, true, true), att("b", 0, true), att("b", 22, false, true), att("c", 25, true)],
    };
    const now = new Date(t0 + 30 * DAY);
    expect(retentionAt(state, 7, now)).toEqual({ days: 7, eligible: 2, tested: 2, passed: 1 });
    expect(retentionAt(state, 21, now)).toEqual({ days: 21, eligible: 2, tested: 1, passed: 0 });
  });
});
