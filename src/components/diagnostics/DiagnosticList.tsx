"use client";

import { CATEGORY_PT, type Diagnostic, SEVERITY_PT } from "@/domain/validation";
import styles from "./DiagnosticList.module.css";

export function DiagnosticList({
  diagnostics,
  onFocus,
  activeId,
}: {
  diagnostics: readonly Diagnostic[];
  onFocus?: (d: Diagnostic) => void;
  activeId?: string | null;
}) {
  if (diagnostics.length === 0) {
    return <p className={styles.empty}>Nenhum diagnóstico para o estilo e as extensões configurados.</p>;
  }
  return (
    <ol className={styles.list}>
      {diagnostics.map((d) => (
        <li key={d.id} className={`${styles.item} ${d.id === activeId ? styles.active : ""}`}>
          <details>
            <summary
              className={styles.summary}
              onClick={() => {
                onFocus?.(d);
              }}
            >
              <span className={`chip chip-${d.severity}`}>{SEVERITY_PT[d.severity]}</span>
              <span className={styles.where}>
                c. {d.location.measure}, t. {d.location.beat}
              </span>
              <span className={styles.title}>{d.title}</span>
            </summary>
            <div className={styles.body}>
              <p className={styles.message}>{d.message}</p>
              <p className={styles.meta}>
                <span className="chip">{CATEGORY_PT[d.category]}</span> <code className={styles.rule}>{d.ruleId}</code>
              </p>
              <p>
                <strong>A regra: </strong>
                {d.explanation}
              </p>
              {d.suggestions.length > 0 && (
                <>
                  <strong>Como corrigir</strong>
                  <ul>
                    {d.suggestions.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </>
              )}
              {d.exceptions && (
                <p className={styles.exception}>
                  <strong>Quando pode ser aceitável: </strong>
                  {d.exceptions}
                </p>
              )}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}
