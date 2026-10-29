"use client";

import { useState } from "react";
import type { ChoiceItem } from "@/domain/exercises/types";
import { AnswerFlow, NO_RETRY, type RetryState } from "./ExercisePanel";
import styles from "./Exercise.module.css";

/**
 * "Pare e pense": uma pergunta rápida no meio da aula. Depois de um erro, mostra uma
 * dica (não a resposta) e deixa tentar de novo; a explicação vem depois. Usa itens de
 * prática gerados (nunca os da verificação) e não conta para o domínio.
 */
export function QuickCheck({ item }: { item: ChoiceItem }) {
  const [first, setFirst] = useState<string | null>(null);
  const [retry, setRetry] = useState<RetryState>(NO_RETRY);
  return (
    <aside className={styles.quick} aria-label="Pare e pense">
      <div className={styles.quickHead}>
        <span aria-hidden="true">⚡</span> Pare e pense
      </div>
      <AnswerFlow
        item={item}
        first={first}
        retry={retry}
        scored={false}
        onFirst={setFirst}
        onRetry={(id) => setRetry({ second: id, revealed: true })}
        onReveal={() => setRetry({ ...retry, revealed: true })}
      />
      {(retry.revealed || first === item.correctOptionId) && (
        <button
          type="button"
          className="btn btn-sm"
          style={{ marginTop: 8 }}
          onClick={() => {
            setFirst(null);
            setRetry(NO_RETRY);
          }}
        >
          Responder de novo
        </button>
      )}
    </aside>
  );
}
