"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createTransferTask } from "@/app/actions/production";
import { ASSISTANCE_PT } from "@/domain/production/task";
import { TRANSFER_KINDS, TRANSFER_KIND_PT, type TransferKind, parseTransferId } from "@/domain/production/transfer";
import { useProductionAttempts } from "@/lib/production/store";

const WHAT: Record<TransferKind, string> = {
  harmonizar: "Uma melodia de coral que não aparece em nenhuma aula. Você analisa a frase, escolhe os acordes e escreve contralto, tenor e baixo.",
  "segunda-voz": "A mesma situação de um dueto: só a melodia e uma segunda voz que precisa soar completa sem acompanhamento.",
  "adaptar-ttbb": "Um coral SATB que um coro masculino vai cantar: a melodia já está no Tenor I, transposta; você adapta as outras vozes às extensões masculinas.",
  corrigir: "Uma harmonização com erros de condução introduzidos de propósito. Você encontra, entende e corrige mudando o mínimo.",
  introducao: "Uma frase pronta a quatro vozes: você escreve dois compassos de introdução que estabeleçam a tonalidade e preparem a entrada.",
};

/** Avaliação de transferência: gera situações inéditas e mostra o histórico de cada tipo (só dados do próprio aluno). */
export function TransferHub() {
  const router = useRouter();
  const attempts = useProductionAttempts().filter((a) => a.kind === "transferencia");
  const [busy, setBusy] = useState<TransferKind | null>(null);
  const [error, setError] = useState<string | null>(null);

  const start = (kind: TransferKind) => {
    setBusy(kind);
    setError(null);
    void createTransferTask(kind).then((r) => {
      if (r.ok) router.push(`/estudio?tarefa=${encodeURIComponent(r.taskId)}`);
      else {
        setError(r.error);
        setBusy(null);
      }
    });
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {error && (
        <p role="alert" style={{ color: "var(--erro)", margin: 0 }}>
          {error}
        </p>
      )}
      {TRANSFER_KINDS.map((kind) => {
        const mine = attempts.filter((a) => parseTransferId(a.taskId)?.kind === kind);
        const tasks = new Set(mine.map((a) => a.taskId));
        const solved = [...tasks].flatMap((id) => {
          const p = mine.find((a) => a.taskId === id && a.passed);
          return p ? [p] : [];
        });
        const autonomous = solved.filter((a) => a.assistance === "autonomo").length;
        const last = solved[solved.length - 1];
        return (
          <section key={kind} className="card" aria-labelledby={`tr-${kind}`}>
            <h2 id={`tr-${kind}`} style={{ marginTop: 0 }}>
              {TRANSFER_KIND_PT[kind]}
            </h2>
            <p>{WHAT[kind]}</p>
            <p className="muted" style={{ fontSize: "0.9rem" }} data-testid={`hist-${kind}`}>
              {tasks.size === 0
                ? "Você ainda não fez nenhuma situação deste tipo."
                : `${tasks.size} situação(ões) iniciada(s), ${solved.length} resolvida(s), ${autonomous} sem nenhuma ajuda.${last ? ` Última resolvida: ${ASSISTANCE_PT[last.assistance].toLowerCase()}.` : ""}`}
            </p>
            <button type="button" className="btn btn-accent" onClick={() => start(kind)} disabled={busy !== null} aria-busy={busy === kind}>
              {busy === kind ? "Preparando…" : "Nova situação"}
            </button>
          </section>
        );
      })}
    </div>
  );
}
