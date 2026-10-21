"use client";

import { z } from "zod";
import { type Attempt, EMPTY_PROGRESS, type ProgressState } from "./model";

/**
 * Repositório de progresso. Nesta etapa, os dados ficam no navegador
 * (localStorage). A interface é a mesma que a implementação Supabase usará
 * (etapa 7), para que a troca não afete a interface.
 */
export interface ProgressRepository {
  load(): ProgressState;
  recordAttempt(attempt: Attempt): ProgressState;
  markRead(lessonId: string): ProgressState;
  reset(): ProgressState;
}

const KEY = "aav:progress:v1";

const attemptSchema = z.object({
  id: z.string(),
  lessonId: z.string(),
  exerciseSetId: z.string(),
  seed: z.number(),
  startedAt: z.string(),
  finishedAt: z.string(),
  answers: z.array(z.object({ itemId: z.string(), skill: z.string(), chosenOptionId: z.string(), correct: z.boolean() })),
  result: z.object({
    score: z.number(),
    correct: z.number(),
    total: z.number(),
    passed: z.boolean(),
    missingRequired: z.array(z.string()),
    bySkill: z.record(z.string(), z.object({ correct: z.number(), total: z.number() })),
  }),
});

const stateSchema = z.object({
  version: z.literal(1),
  attempts: z.array(attemptSchema).max(5000),
  lessonsRead: z.array(z.string()).max(1000),
});

function read(): ProgressState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = stateSchema.safeParse(JSON.parse(raw));
    return parsed.success ? (parsed.data as ProgressState) : EMPTY_PROGRESS;
  } catch {
    return EMPTY_PROGRESS;
  }
}

function write(state: ProgressState): ProgressState {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* armazenamento indisponível (modo privado, cota): o estado vale só nesta sessão */
  }
  window.dispatchEvent(new CustomEvent("aav:progress"));
  return state;
}

export const localProgressRepository: ProgressRepository = {
  load: read,
  recordAttempt(attempt) {
    const s = read();
    return write({ ...s, attempts: [...s.attempts, attempt] });
  },
  markRead(lessonId) {
    const s = read();
    if (s.lessonsRead.includes(lessonId)) return s;
    return write({ ...s, lessonsRead: [...s.lessonsRead, lessonId] });
  },
  reset() {
    return write(EMPTY_PROGRESS);
  },
};
