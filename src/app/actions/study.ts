"use server";

import { requireUser } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/study/profile-schema";
import type { ActionResult } from "./arrangements";

/** Guarda (ou atualiza) o perfil musical inicial na conta. Só o próprio aluno lê e escreve (RLS). */
export async function saveMusicalProfileRemote(raw: unknown): Promise<ActionResult<object>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  const p = profileSchema.safeParse(raw);
  if (!p.success) return { ok: false, error: "Perfil inválido." };
  const { error } = await auth.supabase
    .from("musical_profiles")
    .upsert({ user_id: auth.user.id, answers: { ...p.data.answers, goal: p.data.goal, at: p.data.at }, consent_at: p.data.consent ? new Date().toISOString() : null }, { onConflict: "user_id" });
  if (error) return { ok: false, error: "Não foi possível salvar o perfil na conta." };
  return { ok: true };
}
