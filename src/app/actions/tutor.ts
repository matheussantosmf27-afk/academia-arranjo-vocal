"use server";

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { parseScore } from "@/domain/music/schema";
import type { TutorMode } from "@/domain/tutor/grounding";
import { requireUser } from "@/lib/supabase/server";
import { type TutorOutcome, runTutor } from "@/lib/tutor/run";

const HOURLY_LIMIT = 30;

const input = z.object({
  question: z.string().max(2000),
  mode: z.enum(["explicar", "socratico", "revisar"]),
  style: z.enum(["coral-tradicional", "coral-contemporaneo", "popular-a-cappella"]),
});

/** Disponibilidade do tutor (sem expor a credencial). */
export async function tutorStatus(): Promise<{ available: boolean; reason?: string }> {
  if (!process.env.ANTHROPIC_API_KEY) return { available: false, reason: "O tutor de IA não está configurado neste ambiente (ANTHROPIC_API_KEY ausente no servidor)." };
  return { available: true };
}

/**
 * Pergunta ao tutor. Exige conta (custo e auditoria), limita o uso por hora,
 * recalcula os diagnósticos no servidor e registra a interação com as evidências.
 */
export async function askTutor(score: unknown, meta: unknown): Promise<TutorOutcome> {
  const status = await tutorStatus();
  if (!status.available) return { ok: false, error: status.reason! };
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: `${auth.error} O tutor está disponível para alunos com conta.` };
  const m = input.safeParse(meta);
  if (!m.success) return { ok: false, error: "Pergunta inválida." };
  const parsed = parseScore(score);
  if (!parsed.ok) return { ok: false, error: "Partitura inválida." };
  const { supabase } = auth;

  const since = new Date(Date.now() - 3600_000).toISOString();
  const { count } = await supabase.from("tutor_interactions").select("id", { count: "exact", head: true }).gte("created_at", since);
  if ((count ?? 0) >= HOURLY_LIMIT) return { ok: false, error: `Limite de ${HOURLY_LIMIT} perguntas por hora atingido.` };

  const outcome = await runTutor(new Anthropic(), parsed.score, m.data.style, m.data.question, m.data.mode as TutorMode);
  await supabase.from("tutor_interactions").insert({
    mode: m.data.mode,
    question: m.data.question,
    engine_version: outcome.evidence?.engineVersion ?? "?",
    style: m.data.style,
    evidence: outcome.evidence ?? {},
    response: outcome.ok ? outcome.response : null,
    warnings: outcome.ok ? outcome.warnings : [outcome.error],
    model: outcome.ok ? outcome.servedBy : null,
    ok: outcome.ok,
  });
  return outcome;
}
