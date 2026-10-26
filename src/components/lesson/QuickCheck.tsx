"use client";

import { useState } from "react";
import type { ChoiceItem } from "@/domain/exercises/types";
import { ItemMedia } from "./ExercisePanel";
import styles from "./Exercise.module.css";

/**
 * "Pare e pense": uma pergunta rápida no meio da aula, com resposta comentada
 * imediata. Usa itens de prática gerados (nunca os da verificação) e não conta
 * para o domínio — serve para fixar antes de seguir.
 */
export function QuickCheck({ item }: { item: ChoiceItem }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const answered = chosen !== null;
  const correct = chosen === item.correctOptionId;
  return (
    <aside className={styles.quick} aria-label="Pare e pense">
      <div className={styles.quickHead}>
        <span aria-hidden="true">⚡</span> Pare e pense
      </div>
      <p className={styles.prompt}>{item.prompt}</p>
      <ItemMedia item={item} answered={answered} />
      <div className={styles.options} role="group" aria-label="Alternativas">
        {item.options.map((o) => {
          const cls = answered ? (o.id === item.correctOptionId ? styles.correct : o.id === chosen ? styles.wrong : "") : "";
          return (
            <button key={o.id} type="button" className={`${styles.option} ${cls}`} aria-pressed={chosen === o.id} disabled={answered} onClick={() => setChosen(o.id)}>
              {o.label}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`${styles.feedback} ${correct ? styles.ok : styles.bad}`} role="status">
          <strong>{correct ? "Isso!" : "Quase."}</strong> {!correct && item.optionFeedback?.[chosen!] ? `${item.optionFeedback[chosen!]} ` : ""}
          {item.explanation}{" "}
          {!correct && (
            <button type="button" className="btn btn-sm" onClick={() => setChosen(null)}>
              Tentar de novo
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
