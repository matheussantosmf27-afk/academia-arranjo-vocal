"use server";

import { z } from "zod";
import { isTestTask, newTransferTaskId, resolveTask } from "@/content/tasks";
import { newSeed } from "@/domain/exercises/random";
import { TRANSFER_KINDS, type TransferKind } from "@/domain/production/transfer";
import { parseScore } from "@/domain/music/schema";
import { type ProductionAttempt, assistanceLevel, checkTask } from "@/domain/production/task";
import { ENGINE_VERSION } from "@/domain/validation";
import { requireUser } from "@/lib/supabase/server";
import type { ActionResult } from "./arrangements";

const input = z.object({
  attemptId: z.string().uuid(),
  taskId: z.string().min(1).max(200),
  context: z.enum(["producao", "transferencia", "pre-teste", "pos-teste"]),
  score: z.unknown(),
  log: z.object({ hintsOpened: z.number().int().min(0).max(20), demoOpened: z.boolean(), solutionOpened: z.boolean() }),
  startedAt: z.string().datetime(),
  corrections: z.number().int().min(0).max(1000),
});

/**
 * Registra uma conferência de tarefa na conta. O servidor NÃO usa o resultado do navegador:
 * reconstrói a tarefa pelo id (aula ou semente) e recorrige a partitura enviada com o motor.
 * O nível de ajuda é declarado pelo navegador (dicas e solução abertas não passam pelo servidor);
 * por isso o painel o trata como registro do próprio aluno, não como prova.
 */
export async function recordProductionAttemptRemote(raw: unknown): Promise<ActionResult<{ passed: boolean }>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  const parsed = input.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Conferência inválida." };
  const { attemptId, taskId, context, log, startedAt, corrections } = parsed.data;
  const task = resolveTask(taskId);
  if (!task) return { ok: false, error: "Tarefa desconhecida." };
  if ((context === "producao") !== (task.kind === "producao")) return { ok: false, error: "Contexto incompatível com a tarefa." };
  if ((context === "pre-teste" || context === "pos-teste") && !isTestTask(context, task.id)) return { ok: false, error: "Esta tarefa não faz parte do teste indicado." };
  const score = parseScore(parsed.data.score);
  if (!score.ok) return { ok: false, error: "Partitura inválida." };
  const r = checkTask(task, score.score);
  const { error } = await auth.supabase.from("production_attempts").insert({
    id: attemptId,
    task_id: task.id,
    kind: context,
    lesson_id: task.lessonId ?? null,
    competency: task.competency,
    seed: task.seed ?? null,
    passed: r.passed,
    assistance: assistanceLevel(log),
    hints_used: log.hintsOpened,
    corrections,
    failed_checks: r.checks.filter((c) => !c.ok).map((c) => c.id),
    rule_ids: [...new Set(r.serious.map((d) => d.ruleId))].slice(0, 60),
    engine_version: ENGINE_VERSION,
    score: score.score,
    started_at: startedAt,
  });
  if (error) return { ok: false, error: error.code === "23505" ? "Conferência já registrada." : "Não foi possível registrar a conferência." };
  return { ok: true, passed: r.passed };
}

/** Tentativas de produção da conta, para sincronizar com o navegador. */
export async function listProductionAttemptsRemote(): Promise<ActionResult<{ attempts: ProductionAttempt[] }>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  const { data, error } = await auth.supabase
    .from("production_attempts")
    .select("id, task_id, kind, lesson_id, competency, seed, passed, assistance, hints_used, corrections, failed_checks, rule_ids, started_at, finished_at")
    .order("finished_at", { ascending: true })
    .limit(3000);
  if (error) return { ok: false, error: "Não foi possível carregar as tentativas de produção." };
  return {
    ok: true,
    attempts: (data ?? []).map((r) => ({
      id: r.id as string,
      taskId: r.task_id as string,
      kind: r.kind as ProductionAttempt["kind"],
      ...(r.lesson_id ? { lessonId: r.lesson_id as string } : {}),
      competency: r.competency as string,
      ...(r.seed !== null ? { seed: Number(r.seed) } : {}),
      startedAt: r.started_at as string,
      finishedAt: r.finished_at as string,
      passed: r.passed as boolean,
      assistance: r.assistance as ProductionAttempt["assistance"],
      hintsUsed: r.hints_used as number,
      corrections: r.corrections as number,
      failedChecks: r.failed_checks as ProductionAttempt["failedChecks"],
      ruleIds: r.rule_ids as string[],
    })),
  };
}

/**
 * Solução de referência de uma tarefa. Não vai na página: o painel pede só depois da primeira
 * conferência (e o pedido conta como "com solução" no registro de ajuda).
 */
export async function getTaskSolution(taskId: unknown): Promise<ActionResult<{ solution: NonNullable<ReturnType<typeof resolveTask>>["solution"] | null }>> {
  const id = z.string().min(1).max(200).safeParse(taskId);
  if (!id.success) return { ok: false, error: "Tarefa inválida." };
  const task = resolveTask(id.data);
  if (!task) return { ok: false, error: "Tarefa desconhecida." };
  return { ok: true, solution: task.solution ?? null };
}

/** Gera no servidor uma situação de transferência nova (semente aleatória) e devolve o id. */
export async function createTransferTask(kind: unknown, lessonId?: unknown): Promise<ActionResult<{ taskId: string }>> {
  const k = z.enum(TRANSFER_KINDS as [TransferKind, ...TransferKind[]]).safeParse(kind);
  const l = z.string().max(100).optional().safeParse(lessonId ?? undefined);
  if (!k.success || !l.success) return { ok: false, error: "Tipo de situação inválido." };
  const id = newTransferTaskId(k.data, newSeed(), l.data);
  return id ? { ok: true, taskId: id } : { ok: false, error: "Não foi possível gerar a situação." };
}
