"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTransferTask } from "@/app/actions/production";
import { ASSISTANCE_PT } from "@/domain/production/task";
import { TRANSFER_KIND_PT, type TransferKind, parseTransferId } from "@/domain/production/transfer";
import { useProductionAttempts } from "@/lib/production/store";

/** Prática corrigida com melodia inédita, creditada à aula (registro de ajuda incluído). */
export function LessonPractice({ lessonId, kind }: { lessonId: string; kind: TransferKind }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mine = useProductionAttempts().filter((a) => parseTransferId(a.taskId)?.lessonId === lessonId);
  const tasks = new Set(mine.map((a) => a.taskId));
  const solved = mine.filter((a) => a.passed);
  const firstPassPerTask = [...tasks].flatMap((id) => mine.filter((a) => a.taskId === id && a.passed).slice(0, 1));
  const autonomous = firstPassPerTask.filter((a) => a.assistance === "autonomo").length;
  return (
    <section aria-labelledby="pratica-corrigida" data-testid="lesson-practice">
      <h2 id="pratica-corrigida">Prática corrigida: situação inédita</h2>
      <p>
        <strong>{TRANSFER_KIND_PT[kind]}</strong>, com uma melodia de coral que não aparece nas aulas. Você escreve no laboratório e o motor confere; cada situação é nova, e a ajuda que você usar
        (dica, demonstração, solução) fica registrada.
      </p>
      <p className="muted" style={{ fontSize: "0.9rem" }}>
        {tasks.size === 0
          ? "Nenhuma situação feita a partir desta aula."
          : `${tasks.size} situação(ões) iniciada(s), ${firstPassPerTask.length} resolvida(s), ${autonomous} sem ajuda.${solved.length ? ` Última: ${ASSISTANCE_PT[firstPassPerTask[firstPassPerTask.length - 1]?.assistance ?? "autonomo"].toLowerCase()}.` : ""}`}
      </p>
      <button
        type="button"
        className="btn btn-accent"
        disabled={busy}
        aria-busy={busy}
        onClick={() => {
          setBusy(true);
          setError(null);
          void createTransferTask(kind, lessonId).then((r) => {
            if (r.ok) router.push(`/estudio?tarefa=${encodeURIComponent(r.taskId)}`);
            else {
              setError(r.error);
              setBusy(false);
            }
          });
        }}
      >
        {busy ? "Preparando…" : "Nova situação no laboratório"}
      </button>
      {error && (
        <p role="alert" style={{ color: "var(--erro)" }}>
          {error}
        </p>
      )}
    </section>
  );
}
