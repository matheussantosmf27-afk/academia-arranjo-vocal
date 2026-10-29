import type { Lesson } from "@/content/curriculum/types";
import { type ProgressState, isMastered, isReviewAttempt } from "./model";
import { reviewStatus } from "./review";

/**
 * Pontos de experiência. Recompensam demonstração de aprendizagem, não consumo:
 * - aula dominada (verificação aprovada): 100, uma vez por aula;
 * - revisão aprovada no prazo (retenção): 30 cada;
 * - dia de prática numa aula: 10, no máximo uma vez por aula e por dia — repetir a
 *   mesma verificação várias vezes no mesmo dia não rende pontos;
 * - leitura marcada: 5 (ler não é dominar).
 */
export const XP = { mastered: 100, review: 30, practiceDay: 10, read: 5 } as const;

/** XP necessário para cada nível (progressão suave: 0, 250, 600, 1050, …). */
export function levelThreshold(level: number): number {
  return level <= 1 ? 0 : 50 * (level - 1) * (level + 3);
}

export const LEVEL_NAMES = ["Ouvinte", "Corista", "Naipe", "Harmonizador", "Arranjador", "Arranjador sênior", "Regente-arranjador", "Mestre do coro"] as const;

export interface GameStats {
  readonly xp: number;
  readonly level: number;
  readonly levelName: string;
  /** Progresso dentro do nível atual (0–1). */
  readonly levelProgress: number;
  readonly nextLevelXp: number;
  /** Dias com estudo (tentativas) nos últimos 14 dias. */
  readonly studyDays: number;
  readonly masteredCount: number;
  /** Revisões aprovadas no prazo. */
  readonly retainedReviews: number;
}

const dayKey = (iso: string) => iso.slice(0, 10);

/**
 * Dias com estudo numa janela recente. Substitui a "sequência de dias seguidos": pausas
 * legítimas (fim de semana, viagem) não zeram o indicador.
 */
export function studyDays(state: ProgressState, windowDays = 14, today: Date = new Date()): number {
  const start = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()) - (windowDays - 1) * 86_400_000;
  return new Set(state.attempts.filter((a) => Date.parse(dayKey(a.finishedAt)) >= start).map((a) => dayKey(a.finishedAt))).size;
}

export function gameStats(state: ProgressState, lessons: readonly Lesson[], today: Date = new Date()): GameStats {
  const masteredCount = lessons.filter((l) => isMastered(state, l.id)).length;
  const practiceDays = new Set(state.attempts.filter((a) => !isReviewAttempt(a)).map((a) => `${a.lessonId}@${dayKey(a.finishedAt)}`)).size;
  const retainedReviews = lessons.reduce((n, l) => n + (reviewStatus(state, l.id, today)?.retained ?? 0), 0);
  const xp = masteredCount * XP.mastered + retainedReviews * XP.review + practiceDays * XP.practiceDay + state.lessonsRead.length * XP.read;
  let level = 1;
  while (xp >= levelThreshold(level + 1)) level++;
  const base = levelThreshold(level);
  const next = levelThreshold(level + 1);
  return {
    xp,
    level,
    levelName: LEVEL_NAMES[Math.min(level, LEVEL_NAMES.length) - 1]!,
    levelProgress: (xp - base) / (next - base),
    nextLevelXp: next,
    studyDays: studyDays(state, 14, today),
    masteredCount,
    retainedReviews,
  };
}
