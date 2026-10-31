"use client";

import { useSyncExternalStore } from "react";
import { z } from "zod";
import { HUMAN_RUBRIC, type HumanEvaluation } from "@/domain/evaluation/human";

const KEY = "aav:avaliacoes-humanas:v1";
const EVENT = "aav:avaliacoes-humanas";
const ids = HUMAN_RUBRIC.map((c) => c.id) as [string, ...string[]];

export const humanEvaluationSchema = z.object({
  id: z.string().max(80),
  at: z.string(),
  evaluatorName: z.string().min(1).max(120),
  role: z.enum(["professor", "regente", "colega"]),
  target: z.string().max(200),
  levels: z.partialRecord(z.enum(ids), z.number().int().min(1).max(4)),
  comments: z.partialRecord(z.enum(ids), z.string().max(2000)),
  general: z.string().max(4000),
});

const EMPTY: readonly HumanEvaluation[] = [];
let cache: { raw: string | null; value: readonly HumanEvaluation[] } = { raw: null, value: EMPTY };

function read(): readonly HumanEvaluation[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.value;
    const parsed = raw ? z.array(humanEvaluationSchema).max(500).safeParse(JSON.parse(raw)) : null;
    cache = { raw, value: parsed?.success ? (parsed.data as HumanEvaluation[]) : EMPTY };
    return cache.value;
  } catch {
    return EMPTY;
  }
}

export function addHumanEvaluation(e: HumanEvaluation): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...read(), e]));
  } catch {
    /* indisponível */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

export function useHumanEvaluations(target?: string): readonly HumanEvaluation[] {
  const all = useSyncExternalStore(subscribe, read, () => EMPTY);
  return target ? all.filter((e) => e.target === target) : all;
}
