"use client";

import Link from "next/link";
import { useState } from "react";
import { recordAttemptRemote } from "@/app/actions/progress";
import { useAuth } from "@/lib/auth/useAuth";
import { getLesson } from "@/content/curriculum/curriculum";
import type { Lesson } from "@/content/curriculum/types";
import { type Attempt, bestAttempt, isReviewAttempt, isMastered, lessonStatus, missingPrerequisites } from "@/lib/progress/model";
import { dueLabel, reviewStatus } from "@/lib/progress/review";
import { useProgress } from "@/lib/progress/useProgress";
import { ExercisePanel } from "./ExercisePanel";

const STATUS_LABEL = {
  bloqueada: { label: "Bloqueada", cls: "chip-lock" },
  disponivel: { label: "Disponível", cls: "" },
  "em-andamento": { label: "Em andamento", cls: "chip-alerta" },
  dominada: { label: "Concluída", cls: "chip-ok" },
  "em-preparacao": { label: "Em preparação", cls: "chip-lock" },
} as const;

export function LessonStatusBadge({ lesson }: { lesson: Lesson }) {
  const { state, hydrated } = useProgress();
  if (!hydrated) return null;
  const s = STATUS_LABEL[lessonStatus(state, lesson)];
  return <span className={`chip ${s.cls}`}>{s.label}</span>;
}

export function PrerequisiteNotice({ lesson }: { lesson: Lesson }) {
  const { state, hydrated } = useProgress();
  if (!hydrated) return null;
  const missing = missingPrerequisites(state, lesson);
  if (missing.length === 0) return null;
  return (
    <div className="callout callout-atencao" role="note">
      <strong>Aulas pré-requisito ainda não concluídas</strong>
      Você pode ler esta aula, mas os exercícios — e o avanço no curso — dependem da conclusão de:{" "}
      {missing.map((id, i) => (
        <span key={id}>
          {i > 0 && ", "}
          <Link href={`/licoes/${id}`}>{getLesson(id)?.title ?? id}</Link>
        </span>
      ))}
      .
    </div>
  );
}

/**
 * Registra uma tentativa: sem conta, só neste navegador; com conta, o servidor recorrige
 * pela semente e devolve o resultado oficial (verificação ou revisão).
 */
function useSubmitAttempt(lessonId: string, mode: "verificacao" | "revisao") {
  const { recordAttempt, markRead } = useProgress();
  const { user } = useAuth();
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const submit = async (a: Attempt) => {
    if (mode === "verificacao") markRead(lessonId);
    if (!user) {
      recordAttempt(a);
      setSyncMsg("Registrada neste navegador. Entre na conta para guardá-la com segurança.");
      return;
    }
    const r = await recordAttemptRemote({
      lessonId: a.lessonId,
      seed: a.seed,
      startedAt: a.startedAt,
      answers: a.answers.map((x) => ({ itemId: x.itemId, chosenOptionId: x.chosenOptionId })),
      mode,
    });
    if (r.ok) {
      recordAttempt(r.attempt);
      setSyncMsg(mode === "revisao" ? "Revisão registrada na sua conta." : "Tentativa registrada na sua conta.");
    } else {
      recordAttempt(a);
      setSyncMsg(`Registrada só neste navegador: ${r.error}`);
    }
  };
  return { submit, syncMsg };
}

export function LessonExercises({ lesson }: { lesson: Lesson }) {
  const { state, hydrated } = useProgress();
  const { submit, syncMsg } = useSubmitAttempt(lesson.id, "verificacao");
  if (!lesson.exercises) return null;
  const locked = !hydrated || missingPrerequisites(state, lesson).length > 0;
  const best = bestAttempt(state, lesson.id);
  const attempts = state.attempts.filter((a) => a.lessonId === lesson.id && !isReviewAttempt(a)).length;
  return (
    <section aria-labelledby="exercicios">
      <h2 id="exercicios">Verificação da aula</h2>
      <p>
        <strong>Critério:</strong> {lesson.masteryDescription}
      </p>
      {hydrated && attempts > 0 && (
        <p className="muted">
          {attempts} tentativa(s) registrada(s). Melhor resultado: {Math.round((best?.result.score ?? 0) * 100)}%{best?.result.passed ? " (aula concluída)" : ""}.
        </p>
      )}
      <ExercisePanel spec={lesson.exercises} lessonId={lesson.id} locked={locked} onAttempt={submit} />
      {syncMsg && (
        <p className="muted" role="status" style={{ fontSize: "0.85rem" }}>
          {syncMsg}
        </p>
      )}
      <LessonReview lesson={lesson} />
    </section>
  );
}

/**
 * Revisão espaçada da aula: aparece depois do domínio, com itens novos e prazos que
 * crescem a cada revisão aprovada no prazo (1, 3, 7, 21 e 60 dias).
 */
export function LessonReview({ lesson }: { lesson: Lesson }) {
  const { state, hydrated } = useProgress();
  const { submit, syncMsg } = useSubmitAttempt(lesson.id, "revisao");
  if (!hydrated || !lesson.exercises || !isMastered(state, lesson.id)) return null;
  const r = reviewStatus(state, lesson.id)!;
  return (
    <section aria-labelledby="revisao-t" id="revisao" style={{ marginTop: 24 }}>
      <h3 id="revisao-t">Revisão espaçada</h3>
      <p>
        <span className={`chip ${r.isDue ? "chip-alerta" : "chip-ok"}`}>{dueLabel(r)}</span>{" "}
        <span className="muted">
          {r.retained} revisão(ões) no prazo aprovada(s){r.lapses > 0 ? `, ${r.lapses} esquecida(s) e retomada(s)` : ""}. Concluir a aula mostra o domínio de hoje;
          a revisão, dias depois e com itens novos, mostra se ele ficou.
        </span>
      </p>
      <ExercisePanel spec={lesson.exercises} lessonId={lesson.id} onAttempt={submit} review />
      {syncMsg && (
        <p className="muted" role="status" style={{ fontSize: "0.85rem" }}>
          {syncMsg}
        </p>
      )}
    </section>
  );
}
