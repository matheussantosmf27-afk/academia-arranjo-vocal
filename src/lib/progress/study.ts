import { type ProgressState, isReviewAttempt } from "./model";

const DAY = 86_400_000;

export interface RetentionPoint {
  readonly days: number;
  /** Aulas dominadas há pelo menos `days` dias (podem ter sido revisadas nesse prazo). */
  readonly eligible: number;
  /** Aulas com revisão feita pelo menos `days` dias depois do domínio. */
  readonly tested: number;
  /** Dessas, quantas tiveram a primeira revisão nesse prazo aprovada. */
  readonly passed: number;
}

/**
 * Retenção aos `days` dias: para cada aula dominada, a primeira revisão feita a pelo menos
 * `days` dias do domínio. Mede o que ficou depois de um intervalo real, só com tentativas registradas.
 */
export function retentionAt(state: ProgressState, days: number, now: Date = new Date()): RetentionPoint {
  const byLesson = new Map<string, typeof state.attempts>();
  for (const a of state.attempts) byLesson.set(a.lessonId, [...(byLesson.get(a.lessonId) ?? []), a]);
  let eligible = 0;
  let tested = 0;
  let passed = 0;
  for (const list of byLesson.values()) {
    const sorted = [...list].sort((x, y) => x.finishedAt.localeCompare(y.finishedAt));
    const mastery = sorted.find((a) => !isReviewAttempt(a) && a.result.passed);
    if (!mastery) continue;
    const t0 = Date.parse(mastery.finishedAt);
    if (now.getTime() - t0 < days * DAY) continue;
    eligible++;
    const review = sorted.find((a) => isReviewAttempt(a) && Date.parse(a.finishedAt) - t0 >= days * DAY);
    if (!review) continue;
    tested++;
    if (review.result.passed) passed++;
  }
  return { days, eligible, tested, passed };
}
