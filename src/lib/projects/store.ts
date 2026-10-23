"use client";

import { parseScore } from "@/domain/music/schema";
import type { Score } from "@/domain/music/score";

/**
 * Rascunhos de arranjos salvos NO NAVEGADOR (etapa 3/4). Na etapa 7 passam a
 * ser persistidos no Supabase com versões. Toda leitura é validada pelo esquema.
 */
export interface DraftSummary {
  readonly id: string;
  readonly title: string;
  readonly formation: Score["formation"];
  readonly updatedAt: string;
}

const PREFIX = "aav:draft:";
const INDEX = "aav:drafts";

function readIndex(): DraftSummary[] {
  try {
    const raw = window.localStorage.getItem(INDEX);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as DraftSummary[]).filter((d) => typeof d?.id === "string") : [];
  } catch {
    return [];
  }
}

export function listDrafts(): DraftSummary[] {
  return readIndex().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function saveDraft(score: Score): { ok: true; updatedAt: string } | { ok: false; error: string } {
  const valid = parseScore(score);
  if (!valid.ok) return { ok: false, error: valid.errors.join("; ") };
  const updatedAt = new Date().toISOString();
  try {
    window.localStorage.setItem(PREFIX + score.id, JSON.stringify(score));
    const index = readIndex().filter((d) => d.id !== score.id);
    index.push({ id: score.id, title: score.title, formation: score.formation, updatedAt });
    window.localStorage.setItem(INDEX, JSON.stringify(index));
    return { ok: true, updatedAt };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Armazenamento indisponível" };
  }
}

export function loadDraft(id: string): { ok: true; score: Score } | { ok: false; error: string } {
  try {
    const raw = window.localStorage.getItem(PREFIX + id);
    if (!raw) return { ok: false, error: "Rascunho não encontrado neste navegador." };
    const parsed = parseScore(JSON.parse(raw));
    return parsed.ok ? { ok: true, score: parsed.score } : { ok: false, error: `Rascunho inválido: ${parsed.errors[0] ?? ""}` };
  } catch {
    return { ok: false, error: "Não foi possível ler o rascunho." };
  }
}

export function deleteDraft(id: string): void {
  try {
    window.localStorage.removeItem(PREFIX + id);
    window.localStorage.setItem(INDEX, JSON.stringify(readIndex().filter((d) => d.id !== id)));
  } catch {
    /* ignore */
  }
}
