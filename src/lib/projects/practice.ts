"use client";

import { z } from "zod";
import type { CriterionId, Level } from "@/domain/evaluation/rubric";
import { parseScore } from "@/domain/music/schema";
import type { Score } from "@/domain/music/score";

/** Estado local de um projeto prático: justificativas, autoavaliação e versões para comparar. */
export interface PracticeState {
  readonly justifications: string[];
  readonly selfAssessment: Partial<Record<CriterionId, Level>>;
  readonly snapshots: Array<{ at: string; label: string; score: Score }>;
}

const KEY = (id: string) => `aav:pratica:${id}`;
const schema = z.object({
  justifications: z.array(z.string().max(4000)).max(10),
  selfAssessment: z.record(z.string(), z.number().int().min(1).max(4)),
  snapshots: z.array(z.object({ at: z.string(), label: z.string().max(120), score: z.unknown() })).max(20),
});

export function loadPractice(projectId: string, prompts: number): PracticeState {
  const empty: PracticeState = { justifications: Array.from({ length: prompts }, () => ""), selfAssessment: {}, snapshots: [] };
  try {
    const raw = window.localStorage.getItem(KEY(projectId));
    if (!raw) return empty;
    const parsed = schema.safeParse(JSON.parse(raw));
    if (!parsed.success) return empty;
    const snapshots = parsed.data.snapshots.flatMap((s) => {
      const r = parseScore(s.score);
      return r.ok ? [{ at: s.at, label: s.label, score: r.score }] : [];
    });
    const just = Array.from({ length: prompts }, (_, i) => parsed.data.justifications[i] ?? "");
    return { justifications: just, selfAssessment: parsed.data.selfAssessment as PracticeState["selfAssessment"], snapshots };
  } catch {
    return empty;
  }
}

export function savePractice(projectId: string, state: PracticeState): void {
  try {
    window.localStorage.setItem(KEY(projectId), JSON.stringify(state));
  } catch {
    /* armazenamento indisponível */
  }
}
