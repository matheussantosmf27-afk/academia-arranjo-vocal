"use client";

import { useSyncExternalStore } from "react";
import { z } from "zod";
import { parseScore } from "@/domain/music/schema";
import type { Score } from "@/domain/music/score";
import { type AnalysisAnswers, STAGES, type StageId } from "@/domain/production/cumulative";

/** Estado do projeto cumulativo no navegador (versões imutáveis por etapa). */
export interface CumulativeVersion {
  readonly stage: StageId;
  readonly at: string;
  readonly label: string;
  readonly score: Score;
}

export interface CumulativeState {
  readonly melodyId: string;
  readonly startedAt: string;
  readonly analysis: AnalysisAnswers;
  readonly notes: Partial<Record<StageId, string>>;
  readonly versions: readonly CumulativeVersion[];
  /** Trabalho em andamento na etapa atual (rascunho, não é versão). */
  readonly working: Score | null;
  /** Id do arranjo na conta, quando as versões também são salvas lá. */
  readonly arrangementId: string | null;
}

const KEY = "aav:meu-arranjo:v1";
const EVENT = "aav:meu-arranjo";
const stageIds = STAGES.map((s) => s.id) as [StageId, ...StageId[]];

const schema = z.object({
  melodyId: z.string().max(80),
  startedAt: z.string(),
  analysis: z.object({ key: z.string().max(10), lowest: z.string().max(10), highest: z.string().max(10), phrases: z.string().max(4000), climax: z.string().max(2000) }),
  notes: z.partialRecord(z.enum(stageIds), z.string().max(4000)),
  versions: z.array(z.object({ stage: z.enum(stageIds), at: z.string(), label: z.string().max(120), score: z.unknown() })).max(60),
  working: z.unknown().nullable(),
  arrangementId: z.string().uuid().nullable(),
});

export const EMPTY_ANALYSIS: AnalysisAnswers = { key: "", lowest: "", highest: "", phrases: "", climax: "" };

let cache: { raw: string | null; value: CumulativeState | null } = { raw: null, value: null };

function read(): CumulativeState | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cache.raw) return cache.value;
    let value: CumulativeState | null = null;
    if (raw) {
      const p = schema.safeParse(JSON.parse(raw));
      if (p.success) {
        const versions = p.data.versions.flatMap((v) => {
          const r = parseScore(v.score);
          return r.ok ? [{ stage: v.stage, at: v.at, label: v.label, score: r.score }] : [];
        });
        const w = p.data.working ? parseScore(p.data.working) : null;
        value = { ...p.data, versions, working: w && w.ok ? w.score : null };
      }
    }
    cache = { raw, value };
    return value;
  } catch {
    return null;
  }
}

export function loadCumulative(): CumulativeState | null {
  return read();
}

export function saveCumulative(s: CumulativeState | null): void {
  try {
    if (s) window.localStorage.setItem(KEY, JSON.stringify(s));
    else window.localStorage.removeItem(KEY);
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

export function useCumulative(): { state: CumulativeState | null; hydrated: boolean } {
  const state = useSyncExternalStore(subscribe, read, () => null);
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  return { state, hydrated };
}

/** Etapa atual: a primeira ainda sem versão concluída. */
export function currentStage(s: CumulativeState): StageId | null {
  const done = new Set(s.versions.map((v) => v.stage));
  return STAGES.find((st) => !done.has(st.id))?.id ?? null;
}
