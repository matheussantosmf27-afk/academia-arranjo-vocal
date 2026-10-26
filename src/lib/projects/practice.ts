"use client";

import { z } from "zod";
import type { CriterionId, Level } from "@/domain/evaluation/rubric";
import { parseScore } from "@/domain/music/schema";
import type { Score } from "@/domain/music/score";

/** Itens de escuta e revisão que o aluno confirma antes de registrar o rascunho. */
export const LISTENING_CHECKLIST = [
  { id: "vozes-isoladas", label: "Ouvi cada voz isolada no reprodutor" },
  { id: "vozes-cantadas", label: "Cantei (ou solfejei) as vozes internas" },
  { id: "andamento-real", label: "Ouvi o arranjo inteiro no andamento real" },
  { id: "texto-respiracoes", label: "Revisei letra, respirações e dinâmicas em todas as vozes" },
] as const;

/** Estado local de um projeto prático: justificativas, autoavaliação, escuta, rascunho e versões para comparar. */
export interface PracticeState {
  readonly justifications: string[];
  readonly selfAssessment: Partial<Record<CriterionId, Level>>;
  readonly snapshots: Array<{ at: string; label: string; score: Score }>;
  /** Itens do checklist de escuta confirmados. */
  readonly checklist: string[];
  /** Momento em que o rascunho foi registrado (etapa obrigatória antes da entrega final). */
  readonly draftAt: string | null;
}

const KEY = (id: string) => `aav:pratica:${id}`;
const schema = z.object({
  justifications: z.array(z.string().max(4000)).max(10),
  selfAssessment: z.record(z.string(), z.number().int().min(1).max(4)),
  snapshots: z.array(z.object({ at: z.string(), label: z.string().max(120), score: z.unknown() })).max(20),
  checklist: z.array(z.string().max(40)).max(10).optional(),
  draftAt: z.string().nullable().optional(),
});

export function loadPractice(projectId: string, prompts: number): PracticeState {
  const empty: PracticeState = { justifications: Array.from({ length: prompts }, () => ""), selfAssessment: {}, snapshots: [], checklist: [], draftAt: null };
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
    const known = new Set<string>(LISTENING_CHECKLIST.map((c) => c.id));
    return {
      justifications: just,
      selfAssessment: parsed.data.selfAssessment as PracticeState["selfAssessment"],
      snapshots,
      checklist: (parsed.data.checklist ?? []).filter((c) => known.has(c)),
      draftAt: parsed.data.draftAt ?? null,
    };
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
