"use server";

import { z } from "zod";
import { getProject } from "@/content/projects";
import { evaluateRubric } from "@/domain/evaluation/rubric";
import { parseScore } from "@/domain/music/schema";
import { requireUser } from "@/lib/supabase/server";
import { type ActionResult, saveArrangementVersion } from "./arrangements";

const input = z.object({
  projectId: z.string().max(64),
  arrangementId: z.string().uuid().nullable(),
  justifications: z.array(z.string().max(4000)).max(10),
  selfAssessment: z.record(z.string(), z.number().int().min(1).max(4)),
});

/**
 * Salva uma versão do arranjo do projeto e a avaliação por rubrica RECALCULADA no servidor
 * (o resultado enviado pelo navegador não é usado). As evidências ficam registradas.
 */
export async function saveProjectEvaluation(score: unknown, meta: unknown): Promise<ActionResult<{ arrangementId: string; versionNumber: number }>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  const m = input.safeParse(meta);
  if (!m.success) return { ok: false, error: "Dados da avaliação inválidos." };
  const project = getProject(m.data.projectId);
  if (!project) return { ok: false, error: "Projeto desconhecido." };
  const parsed = parseScore(score);
  if (!parsed.ok) return { ok: false, error: "Partitura inválida." };

  const saved = await saveArrangementVersion(parsed.score, m.data.arrangementId, `Avaliação do projeto ${project.title}`);
  if (!saved.ok) return saved;
  const rubric = evaluateRubric({
    score: parsed.score,
    style: parsed.score.metadata.style,
    starting: project.starting,
    melodyVoice: project.melodyVoice,
    justifications: m.data.justifications,
    selfAssessment: m.data.selfAssessment as never,
  });
  const { error } = await auth.supabase.from("evaluations").insert({
    version_id: saved.versionId,
    project_id: project.id,
    rubric: { criteria: rubric.criteria.map(({ id, level, source, comment }) => ({ id, level, source, comment })), engineVersion: rubric.engineVersion },
    evidence: { criteria: rubric.criteria.map(({ id, evidence, diagnosticIds }) => ({ id, evidence, diagnosticIds })), justifications: m.data.justifications },
    source: "automatica",
  });
  if (error) return { ok: false, error: "Versão salva, mas não foi possível registrar a avaliação." };
  return { ok: true, arrangementId: saved.arrangementId, versionNumber: saved.versionNumber };
}
