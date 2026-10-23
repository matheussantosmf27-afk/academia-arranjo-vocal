import type { Lesson } from "@/content/curriculum/types";
import type { AnswerRecord, MasteryResult } from "@/domain/exercises/types";

/** Tentativa registrada (evidência do domínio). */
export interface Attempt {
  readonly id: string;
  readonly lessonId: string;
  readonly exerciseSetId: string;
  /** Semente: permite reconstruir exatamente os itens apresentados. */
  readonly seed: number;
  readonly startedAt: string;
  readonly finishedAt: string;
  readonly answers: readonly AnswerRecord[];
  readonly result: MasteryResult;
}

export interface ProgressState {
  readonly version: 1;
  readonly attempts: readonly Attempt[];
  /** Lições cuja leitura foi marcada como concluída (não equivale a domínio). */
  readonly lessonsRead: readonly string[];
}

export const EMPTY_PROGRESS: ProgressState = { version: 1, attempts: [], lessonsRead: [] };

export type LessonStatus = "bloqueada" | "disponivel" | "em-andamento" | "dominada" | "em-preparacao";

export function isMastered(state: ProgressState, lessonId: string): boolean {
  return state.attempts.some((a) => a.lessonId === lessonId && a.result.passed);
}

/** Pré-requisitos não dominados (bloqueiam a lição). */
export function missingPrerequisites(state: ProgressState, lesson: Lesson): string[] {
  return lesson.prerequisites.filter((p) => !isMastered(state, p));
}

export function lessonStatus(state: ProgressState, lesson: Lesson): LessonStatus {
  if (lesson.status === "em-preparacao") return "em-preparacao";
  if (isMastered(state, lesson.id)) return "dominada";
  if (missingPrerequisites(state, lesson).length > 0) return "bloqueada";
  if (state.attempts.some((a) => a.lessonId === lesson.id) || state.lessonsRead.includes(lesson.id)) return "em-andamento";
  return "disponivel";
}

export function bestAttempt(state: ProgressState, lessonId: string): Attempt | undefined {
  return [...state.attempts].filter((a) => a.lessonId === lessonId).sort((a, b) => b.result.score - a.result.score)[0];
}

/** Desempenho agregado por habilidade, a partir da MELHOR tentativa de cada lição. */
export function skillSummary(state: ProgressState): Record<string, { correct: number; total: number }> {
  const out: Record<string, { correct: number; total: number }> = {};
  const lessonIds = [...new Set(state.attempts.map((a) => a.lessonId))];
  for (const id of lessonIds) {
    const best = bestAttempt(state, id);
    if (!best) continue;
    for (const [skill, v] of Object.entries(best.result.bySkill)) {
      const s = (out[skill] ??= { correct: 0, total: 0 });
      s.correct += v.correct;
      s.total += v.total;
    }
  }
  return out;
}

/** Erros recentes para revisão: itens errados na última tentativa de cada lição. */
export function itemsToReview(state: ProgressState): Array<{ lessonId: string; itemId: string; skill: string }> {
  const latest = new Map<string, Attempt>();
  for (const a of state.attempts) {
    const cur = latest.get(a.lessonId);
    if (!cur || cur.finishedAt < a.finishedAt) latest.set(a.lessonId, a);
  }
  return [...latest.values()].flatMap((a) => a.answers.filter((x) => !x.correct).map((x) => ({ lessonId: a.lessonId, itemId: x.itemId, skill: x.skill })));
}
