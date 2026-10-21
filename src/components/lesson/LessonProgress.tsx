"use client";

import Link from "next/link";
import { useState } from "react";
import { recordAttemptRemote } from "@/app/actions/progress";
import { useAuth } from "@/lib/auth/useAuth";
import { getLesson } from "@/content/curriculum/curriculum";
import type { Lesson } from "@/content/curriculum/types";
import { bestAttempt, lessonStatus, missingPrerequisites } from "@/lib/progress/model";
import { useProgress } from "@/lib/progress/useProgress";
import { ExercisePanel } from "./ExercisePanel";

const STATUS_LABEL = {
  bloqueada: { label: "Bloqueada", cls: "chip-lock" },
  disponivel: { label: "Disponível", cls: "" },
  "em-andamento": { label: "Em andamento", cls: "chip-alerta" },
  dominada: { label: "Dominada", cls: "chip-ok" },
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
      <strong>Pré-requisitos ainda não dominados</strong>
      Você pode ler esta lição, mas os exercícios — e o avanço no currículo — dependem do domínio de:{" "}
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

export function LessonExercises({ lesson }: { lesson: Lesson }) {
  const { state, hydrated, recordAttempt, markRead } = useProgress();
  const { user } = useAuth();
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  if (!lesson.exercises) return null;
  const locked = !hydrated || missingPrerequisites(state, lesson).length > 0;
  const best = bestAttempt(state, lesson.id);
  const attempts = state.attempts.filter((a) => a.lessonId === lesson.id).length;
  return (
    <section aria-labelledby="exercicios">
      <h2 id="exercicios">Exercícios e critério de domínio</h2>
      <p>
        <strong>Critério:</strong> {lesson.masteryDescription}
      </p>
      {hydrated && attempts > 0 && (
        <p className="muted">
          {attempts} tentativa(s) registrada(s). Melhor resultado: {Math.round((best?.result.score ?? 0) * 100)}%{best?.result.passed ? " (domínio demonstrado)" : ""}.
        </p>
      )}
      <ExercisePanel
        spec={lesson.exercises}
        lessonId={lesson.id}
        locked={locked}
        onAttempt={async (a) => {
          markRead(lesson.id);
          if (!user) {
            recordAttempt(a);
            setSyncMsg("Tentativa registrada neste navegador. Entre na conta para guardá-la com segurança.");
            return;
          }
          // Na conta, o servidor recorrige pela semente e devolve o resultado oficial.
          const r = await recordAttemptRemote({
            lessonId: a.lessonId,
            seed: a.seed,
            startedAt: a.startedAt,
            answers: a.answers.map((x) => ({ itemId: x.itemId, chosenOptionId: x.chosenOptionId })),
          });
          if (r.ok) {
            recordAttempt(r.attempt);
            setSyncMsg("Tentativa registrada na sua conta.");
          } else {
            recordAttempt(a);
            setSyncMsg(`Registrada só neste navegador: ${r.error}`);
          }
        }}
      />
      {syncMsg && (
        <p className="muted" role="status" style={{ fontSize: "0.85rem" }}>
          {syncMsg}
        </p>
      )}
    </section>
  );
}
