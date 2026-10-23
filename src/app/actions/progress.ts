"use server";

import { z } from "zod";
import { getLesson } from "@/content/curriculum/curriculum";
import { buildExerciseSet, checkAnswer, evaluateMastery } from "@/domain/exercises/engine";
import type { Attempt } from "@/lib/progress/model";
import { requireUser } from "@/lib/supabase/server";
import type { ActionResult } from "./arrangements";

const attemptInput = z.object({
  lessonId: z.string().max(100),
  seed: z.number().int().min(0).max(2 ** 31),
  startedAt: z.string().datetime(),
  answers: z.array(z.object({ itemId: z.string().max(100), chosenOptionId: z.string().max(100) })).max(200),
});

/**
 * Registra uma tentativa. O servidor NÃO confia no resultado enviado: reconstrói os itens
 * pela semente, corrige as respostas e recalcula o domínio. Também verifica os pré-requisitos.
 */
export async function recordAttemptRemote(input: unknown): Promise<ActionResult<{ attempt: Attempt }>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  const parsed = attemptInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Tentativa inválida." };
  const { lessonId, seed, startedAt, answers } = parsed.data;
  const lesson = getLesson(lessonId);
  if (!lesson?.exercises || lesson.status !== "disponivel") return { ok: false, error: "Lição sem exercícios." };
  const { supabase, user } = auth;

  if (lesson.prerequisites.length) {
    const { data } = await supabase.from("lesson_progress").select("lesson_id").in("lesson_id", [...lesson.prerequisites]).not("mastered_at", "is", null);
    if ((data?.length ?? 0) < lesson.prerequisites.length) return { ok: false, error: "Pré-requisitos ainda não dominados na sua conta." };
  }

  const items = buildExerciseSet(lesson.exercises, seed);
  const records = answers.flatMap((a) => {
    const item = items.find((i) => i.id === a.itemId);
    return item ? [checkAnswer(item, a.chosenOptionId)] : [];
  });
  const result = evaluateMastery(lesson.exercises, items, records);
  const finishedAt = new Date().toISOString();

  const { data, error } = await supabase
    .from("exercise_attempts")
    .insert({
      lesson_id: lessonId,
      exercise_set_id: lesson.exercises.id,
      seed,
      answers: records,
      score: Number(result.score.toFixed(4)),
      correct: result.correct,
      total: result.total,
      passed: result.passed,
      missing_required: result.missingRequired,
      by_skill: result.bySkill,
      started_at: startedAt,
      finished_at: finishedAt,
    })
    .select("id")
    .single();
  if (error || !data) return { ok: false, error: "Não foi possível registrar a tentativa." };

  const progress: Record<string, unknown> = { user_id: user.id, lesson_id: lessonId, read_at: finishedAt };
  if (result.passed) Object.assign(progress, { mastered_at: finishedAt, mastery_attempt_id: data.id });
  const { data: existing } = await supabase.from("lesson_progress").select("mastered_at").eq("lesson_id", lessonId).maybeSingle();
  if (existing?.mastered_at && !result.passed) delete progress.mastered_at; // domínio já demonstrado não é perdido
  await supabase.from("lesson_progress").upsert(progress, { onConflict: "user_id,lesson_id" });

  return {
    ok: true,
    attempt: { id: data.id as string, lessonId, exerciseSetId: lesson.exercises.id, seed, startedAt, finishedAt, answers: records, result },
  };
}

/** Tentativas da conta (para sincronizar com o progresso exibido). */
export async function listAttemptsRemote(): Promise<ActionResult<{ attempts: Attempt[] }>> {
  const auth = await requireUser();
  if ("error" in auth) return { ok: false, error: auth.error };
  const { data, error } = await auth.supabase
    .from("exercise_attempts")
    .select("id, lesson_id, exercise_set_id, seed, answers, score, correct, total, passed, missing_required, by_skill, started_at, finished_at")
    .order("finished_at", { ascending: true })
    .limit(2000);
  if (error) return { ok: false, error: "Não foi possível carregar as tentativas." };
  return {
    ok: true,
    attempts: (data ?? []).map((r) => ({
      id: r.id as string,
      lessonId: r.lesson_id as string,
      exerciseSetId: r.exercise_set_id as string,
      seed: Number(r.seed),
      startedAt: r.started_at as string,
      finishedAt: r.finished_at as string,
      answers: r.answers as Attempt["answers"],
      result: {
        score: Number(r.score),
        correct: r.correct as number,
        total: r.total as number,
        passed: r.passed as boolean,
        missingRequired: r.missing_required as string[],
        bySkill: r.by_skill as Attempt["result"]["bySkill"],
      },
    })),
  };
}
