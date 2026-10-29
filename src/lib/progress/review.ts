import type { Lesson } from "@/content/curriculum/types";
import { type Attempt, type ProgressState, isReviewAttempt } from "./model";

/**
 * Revisão espaçada. Depois que uma aula é dominada, ela volta em intervalos
 * crescentes, com itens NOVOS (gerados de novo, nunca os fixos da verificação):
 *
 * - revisão aprovada no prazo (≥ 80%) → o intervalo seguinte é maior;
 * - revisão reprovada → o intervalo volta ao início (1 dia) e conta como lapso;
 * - revisão feita antes do prazo → vale como prática, mas não avança o intervalo
 *   (rever no mesmo dia não demonstra retenção).
 *
 * O domínio da aula não é retirado por uma revisão reprovada: a aula continua
 * liberando as seguintes, mas a retenção aparece como pendente no perfil.
 */
export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 21, 60] as const;
const DAY = 86_400_000;

export interface ReviewStatus {
  readonly lessonId: string;
  /** Primeira verificação aprovada. */
  readonly masteredAt: string;
  /** Quantas revisões no prazo foram aprovadas desde o último lapso. */
  readonly stage: number;
  readonly due: Date;
  readonly isDue: boolean;
  /** Dias de atraso (0 se ainda não venceu). */
  readonly overdueDays: number;
  readonly reviewsDone: number;
  readonly reviewsPassed: number;
  /** Revisões aprovadas no prazo (cada uma demonstrou retenção e avançou o intervalo). */
  readonly retained: number;
  /** Revisões reprovadas (o conteúdo foi esquecido e voltou ao início). */
  readonly lapses: number;
  readonly last?: Attempt;
}

const intervalFor = (stage: number) => REVIEW_INTERVALS_DAYS[Math.min(stage, REVIEW_INTERVALS_DAYS.length - 1)]! * DAY;

/** Situação de revisão de uma aula dominada (undefined se ainda não dominada). */
export function reviewStatus(state: ProgressState, lessonId: string, now: Date = new Date()): ReviewStatus | undefined {
  const mine = state.attempts.filter((a) => a.lessonId === lessonId).sort((a, b) => a.finishedAt.localeCompare(b.finishedAt));
  const mastery = mine.find((a) => !isReviewAttempt(a) && a.result.passed);
  if (!mastery) return undefined;
  let anchor = Date.parse(mastery.finishedAt);
  let stage = 0;
  let lapses = 0;
  let done = 0;
  let passed = 0;
  let retained = 0;
  let last: Attempt | undefined;
  for (const r of mine.filter(isReviewAttempt)) {
    const at = Date.parse(r.finishedAt);
    if (at < anchor) continue;
    done++;
    last = r;
    if (r.result.passed) {
      passed++;
      if (at >= anchor + intervalFor(stage)) {
        stage++;
        retained++;
        anchor = at;
      }
    } else {
      lapses++;
      stage = 0;
      anchor = at;
    }
  }
  const due = new Date(anchor + intervalFor(stage));
  const late = now.getTime() - due.getTime();
  return {
    lessonId,
    masteredAt: mastery.finishedAt,
    stage,
    due,
    isDue: late >= 0,
    overdueDays: late > 0 ? Math.floor(late / DAY) : 0,
    reviewsDone: done,
    reviewsPassed: passed,
    retained,
    lapses,
    ...(last ? { last } : {}),
  };
}

/**
 * Revisões vencidas, das mais urgentes para as menos: primeiro as que já foram
 * esquecidas uma vez (lapsos), depois as mais atrasadas.
 */
export function dueReviews(state: ProgressState, lessons: readonly Lesson[], now: Date = new Date()): ReviewStatus[] {
  return lessons
    .filter((l) => l.exercises && l.status === "disponivel")
    .flatMap((l) => {
      const r = reviewStatus(state, l.id, now);
      return r?.isDue ? [r] : [];
    })
    .sort((a, b) => b.lapses - a.lapses || b.overdueDays - a.overdueDays || a.due.getTime() - b.due.getTime());
}

/** Texto curto para o prazo da próxima revisão. */
export function dueLabel(r: ReviewStatus, now: Date = new Date()): string {
  if (r.isDue) return r.overdueDays === 0 ? "revisão para hoje" : `revisão atrasada há ${r.overdueDays} dia(s)`;
  const days = Math.ceil((r.due.getTime() - now.getTime()) / DAY);
  return days <= 1 ? "próxima revisão amanhã" : `próxima revisão em ${days} dias`;
}
