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

const humanInput = z.object({
  target: z.string().max(200),
  arrangementId: z.string().uuid().nullable(),
  evaluatorName: z.string().min(1).max(120),
  role: z.enum(["professor", "regente", "colega"]),
  levels: z.record(z.string(), z.number().int().min(1).max(4)),
  comments: z.record(z.string(), z.string().max(2000)),
  general: z.string().min(20).max(4000),
});

/**
 * Registra na conta o parecer de um professor ou regente (preenchido no dispositivo do aluno).
 * Salva a versão avaliada e grava a avaliação com origem "professor". Os níveis são os escolhidos
 * pela pessoa: o servidor só confere que todos os critérios da rubrica humana foram preenchidos.
 */
export async function saveHumanEvaluation(score: unknown, meta: unknown): Promise<ActionResult<{ arrangementId: string; versionNumber: number }>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  const m = humanInput.safeParse(meta);
  if (!m.success) return { ok: false, error: "Avaliação incompleta." };
  const { HUMAN_RUBRIC, validateHumanEvaluation } = await import("@/domain/evaluation/human");
  const problems = validateHumanEvaluation({ evaluatorName: m.data.evaluatorName, levels: m.data.levels as never, general: m.data.general });
  if (problems.length) return { ok: false, error: problems.join(" ") };
  const parsed = parseScore(score);
  if (!parsed.ok) return { ok: false, error: "Partitura inválida." };
  const saved = await saveArrangementVersion(parsed.score, m.data.arrangementId, `Avaliação de ${m.data.evaluatorName}`);
  if (!saved.ok) return saved;
  const known = new Set(HUMAN_RUBRIC.map((c) => c.id));
  const { error } = await auth.supabase.from("evaluations").insert({
    version_id: saved.versionId,
    project_id: m.data.target,
    rubric: { criteria: Object.entries(m.data.levels).filter(([id]) => known.has(id as never)).map(([id, level]) => ({ id, level, comment: m.data.comments[id] ?? "" })), role: m.data.role, general: m.data.general },
    evidence: {},
    source: "professor",
    evaluator_name: m.data.evaluatorName,
  });
  if (error) return { ok: false, error: "Versão salva, mas não foi possível registrar a avaliação." };
  return { ok: true, arrangementId: saved.arrangementId, versionNumber: saved.versionNumber };
}
