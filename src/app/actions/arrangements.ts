"use server";

import { z } from "zod";
import { parseScore } from "@/domain/music/schema";
import type { Score } from "@/domain/music/score";
import type { FormationId } from "@/domain/music/formations";
import { validateScore } from "@/domain/validation";
import { requireUser } from "@/lib/supabase/server";

export type ActionResult<T> = ({ ok: true } & T) | { ok: false; error: string };

const uuid = z.string().uuid();

export interface CloudArrangement {
  id: string;
  title: string;
  formation: FormationId;
  updatedAt: string;
  versions: number;
}

/**
 * Salva uma NOVA versão (versões são imutáveis). Valida a partitura no servidor,
 * executa o motor de validação e grava o relatório junto com a versão.
 */
export async function saveArrangementVersion(input: unknown, arrangementId: string | null, note?: string): Promise<ActionResult<{ arrangementId: string; versionNumber: number; versionId: string }>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  const parsed = parseScore(input);
  if (!parsed.ok) return { ok: false, error: `Partitura inválida: ${parsed.errors.slice(0, 3).join("; ")}` };
  const score = parsed.score;
  if (arrangementId !== null && !uuid.safeParse(arrangementId).success) return { ok: false, error: "Identificador inválido." };
  const { supabase } = auth;

  let id = arrangementId;
  if (id) {
    const { error } = await supabase.from("arrangements").update({ title: score.title, style: score.metadata.style }).eq("id", id).select("id").single();
    if (error) return { ok: false, error: "Arranjo não encontrado na sua conta." };
  } else {
    const { data, error } = await supabase.from("arrangements").insert({ title: score.title, formation: score.formation, style: score.metadata.style }).select("id").single();
    if (error || !data) return { ok: false, error: "Não foi possível criar o arranjo." };
    id = data.id as string;
  }

  const { data: last } = await supabase.from("arrangement_versions").select("version_number").eq("arrangement_id", id).order("version_number", { ascending: false }).limit(1);
  const versionNumber = ((last?.[0]?.version_number as number | undefined) ?? 0) + 1;
  const { data: ver, error: verErr } = await supabase
    .from("arrangement_versions")
    .insert({ arrangement_id: id, version_number: versionNumber, schema_version: score.schemaVersion, score, note: note?.slice(0, 2000) ?? null })
    .select("id")
    .single();
  if (verErr || !ver) return { ok: false, error: "Não foi possível salvar a versão." };

  const report = validateScore(score);
  await supabase.from("validation_reports").insert({
    version_id: ver.id,
    engine_version: report.engineVersion,
    config: report.config,
    diagnostics: report.diagnostics,
    counts: { severity: report.countsBySeverity, category: report.countsByCategory },
  });
  await supabase.from("arrangements").update({ current_version_id: ver.id }).eq("id", id);
  return { ok: true, arrangementId: id, versionNumber, versionId: ver.id as string };
}

export async function listArrangements(): Promise<ActionResult<{ items: CloudArrangement[] }>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  const { data, error } = await auth.supabase
    .from("arrangements")
    .select("id, title, formation, updated_at, arrangement_versions!arrangement_versions_arrangement_id_fkey(count)")
    .order("updated_at", { ascending: false })
    .limit(200);
  if (error) return { ok: false, error: "Não foi possível listar os arranjos." };
  return {
    ok: true,
    items: (data ?? []).map((r) => ({
      id: r.id as string,
      title: r.title as string,
      formation: r.formation as FormationId,
      updatedAt: r.updated_at as string,
      versions: (r.arrangement_versions as unknown as Array<{ count: number }> | null)?.[0]?.count ?? 0,
    })),
  };
}

export async function loadArrangement(arrangementId: string): Promise<ActionResult<{ score: Score; versionNumber: number }>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  if (!uuid.safeParse(arrangementId).success) return { ok: false, error: "Identificador inválido." };
  const { data, error } = await auth.supabase
    .from("arrangement_versions")
    .select("score, version_number")
    .eq("arrangement_id", arrangementId)
    .order("version_number", { ascending: false })
    .limit(1)
    .single();
  if (error || !data) return { ok: false, error: "Arranjo não encontrado na sua conta." };
  const parsed = parseScore(data.score);
  if (!parsed.ok) return { ok: false, error: "A versão salva não passou na validação do esquema." };
  return { ok: true, score: parsed.score, versionNumber: data.version_number as number };
}

export async function deleteArrangement(arrangementId: string): Promise<ActionResult<object>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  if (!uuid.safeParse(arrangementId).success) return { ok: false, error: "Identificador inválido." };
  const { error, count } = await auth.supabase.from("arrangements").delete({ count: "exact" }).eq("id", arrangementId);
  if (error || count === 0) return { ok: false, error: "Arranjo não encontrado na sua conta." };
  return { ok: true };
}
