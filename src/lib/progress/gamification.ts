import type { Lesson } from "@/content/curriculum/types";
import { type ProgressState, isMastered } from "./model";

/** Pontos de experiência: domínio pesa mais que tentativa; leitura também conta. */
export const XP = { mastered: 100, attempt: 10, read: 15 } as const;

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
  /** Dias consecutivos com estudo (tentativas), terminando hoje ou ontem. */
  readonly streak: number;
  readonly masteredCount: number;
}

const dayKey = (iso: string) => iso.slice(0, 10);

export function studyStreak(state: ProgressState, today: Date = new Date()): number {
  const days = new Set(state.attempts.map((a) => dayKey(a.finishedAt)));
  if (days.size === 0) return 0;
  const cursor = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
  const key = () => cursor.toISOString().slice(0, 10);
  // A sequência continua válida até o fim do dia seguinte ao último estudo.
  if (!days.has(key())) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let n = 0;
  while (days.has(key())) {
    n++;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return n;
}

export function gameStats(state: ProgressState, lessons: readonly Lesson[], today: Date = new Date()): GameStats {
  const masteredCount = lessons.filter((l) => isMastered(state, l.id)).length;
  const xp = masteredCount * XP.mastered + state.attempts.length * XP.attempt + state.lessonsRead.length * XP.read;
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
    streak: studyStreak(state, today),
    masteredCount,
  };
}
