"use client";

import { useSyncExternalStore } from "react";
import { z } from "zod";
import { parseScore } from "@/domain/music/schema";
import type { Score } from "@/domain/music/score";
import { type AssistanceLog, NO_ASSISTANCE, type ProductionAttempt } from "@/domain/production/task";

/**
 * Evidências de produção no navegador: cada conferência de tarefa vira uma tentativa com o
 * nível de ajuda usado. Com conta, as tentativas também vão para o Supabase (recorrigidas no servidor).
 */
const KEY = "aav:producao:v1";
const EVENT = "aav:producao";

const attemptSchema = z.object({
  id: z.string().max(80),
  taskId: z.string().max(200),
  kind: z.enum(["producao", "transferencia", "pre-teste", "pos-teste"]),
  lessonId: z.string().max(120).optional(),
  competency: z.string().max(80),
  seed: z.number().int().optional(),
  startedAt: z.string(),
  finishedAt: z.string(),
  passed: z.boolean(),
  assistance: z.enum(["autonomo", "dica", "demonstracao", "solucao"]),
  hintsUsed: z.number().int().min(0).max(20),
  corrections: z.number().int().min(0).max(1000),
  failedChecks: z.array(z.enum(["formacao", "preserva", "escreve", "introducao", "sem-erros", "cadencia-final"])).max(10),
  ruleIds: z.array(z.string().max(80)).max(60),
});
const stateSchema = z.object({ version: z.literal(1), attempts: z.array(attemptSchema).max(5000) });

export const productionAttemptSchema = attemptSchema;

const EMPTY: readonly ProductionAttempt[] = [];
let cache: { raw: string | null; value: readonly ProductionAttempt[] } = { raw: null, value: EMPTY };

function read(): readonly ProductionAttempt[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.value;
    const parsed = raw ? stateSchema.safeParse(JSON.parse(raw)) : null;
    cache = { raw, value: parsed?.success ? (parsed.data.attempts as ProductionAttempt[]) : EMPTY };
    return cache.value;
  } catch {
    return EMPTY;
  }
}

function write(attempts: readonly ProductionAttempt[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ version: 1, attempts }));
  } catch {
    /* armazenamento indisponível: vale só nesta sessão */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function loadProductionAttempts(): readonly ProductionAttempt[] {
  return read();
}

export function recordProductionAttempt(a: ProductionAttempt): void {
  write([...read(), a]);
}

/** Incorpora tentativas vindas da conta (união por id). */
export function mergeProductionAttempts(incoming: readonly ProductionAttempt[]): void {
  const cur = read();
  const known = new Set(cur.map((a) => a.id));
  const fresh = incoming.filter((a) => !known.has(a.id));
  if (fresh.length) write([...cur, ...fresh].sort((x, y) => x.finishedAt.localeCompare(y.finishedAt)));
}

export function resetProductionAttempts(): void {
  write([]);
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProductionAttempts(): readonly ProductionAttempt[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

/** Sessão de trabalho numa tarefa: o que o aluno escreveu e a ajuda que abriu (sobrevive a recarregar a página). */
export interface TaskSession {
  readonly startedAt: string;
  readonly log: AssistanceLog;
  /** Conferências reprovadas desde o início. */
  readonly failed: number;
  readonly checked: number;
  readonly solvedAt: string | null;
  readonly score: Score | null;
}

const sessionSchema = z.object({
  startedAt: z.string(),
  log: z.object({ hintsOpened: z.number().int().min(0).max(20), demoOpened: z.boolean(), solutionOpened: z.boolean() }),
  failed: z.number().int().min(0),
  checked: z.number().int().min(0),
  solvedAt: z.string().nullable(),
  score: z.unknown().nullable(),
});

const SKEY = (taskId: string) => `aav:tarefa:${taskId}`;

export function newSession(): TaskSession {
  return { startedAt: new Date().toISOString(), log: NO_ASSISTANCE, failed: 0, checked: 0, solvedAt: null, score: null };
}

export function loadTaskSession(taskId: string): TaskSession | null {
  try {
    const raw = window.localStorage.getItem(SKEY(taskId));
    if (!raw) return null;
    const p = sessionSchema.safeParse(JSON.parse(raw));
    if (!p.success) return null;
    const sc = p.data.score ? parseScore(p.data.score) : null;
    return { ...p.data, score: sc && sc.ok ? sc.score : null };
  } catch {
    return null;
  }
}

export function saveTaskSession(taskId: string, s: TaskSession): void {
  try {
    window.localStorage.setItem(SKEY(taskId), JSON.stringify(s));
  } catch {
    /* indisponível */
  }
}

export function clearTaskSession(taskId: string): void {
  try {
    window.localStorage.removeItem(SKEY(taskId));
  } catch {
    /* indisponível */
  }
}
