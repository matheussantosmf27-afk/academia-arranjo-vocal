"use client";

import { CATEGORY_PT, type Diagnostic, type RuleMeta, SEVERITY_PT, STYLE_PROFILES, ruleCatalog } from "@/domain/validation";
import type { StyleProfileId } from "@/domain/music/score";
import styles from "./DiagnosticList.module.css";

const RULES = new Map<string, RuleMeta>(ruleCatalog().map((r) => [r.id, r]));
const STYLES = Object.keys(STYLE_PROFILES) as StyleProfileId[];
const STYLE_SHORT: Record<StyleProfileId, string> = { "coral-tradicional": "Coral tradicional", "coral-contemporaneo": "Coral contemporâneo", "popular-a-cappella": "Popular a cappella" };

const CATEGORY_NOTE: Partial<Record<Diagnostic["category"], string>> = {
  "erro-objetivo": "Erro objetivo: vale em qualquer estilo (é físico ou de escrita, não de gosto).",
  "convencao-estilistica": "Convenção do estilo: em outro estilo pode ser um recurso intencional. Veja abaixo como cada estilo julga esta escrita.",
  "escolha-estetica": "Escolha estética: o motor só aponta; a decisão é sua (ouça e justifique).",
};

/** Como cada estilo julga a regra: a mesma escrita pode ser erro num estilo e recurso em outro. */
function StyleVerdicts({ ruleId }: { ruleId: string }) {
  const meta = RULES.get(ruleId);
  if (!meta) return null;
  const values = STYLES.map((s) => meta.severityByStyle[s]);
  if (values.every((v) => v === values[0])) return null;
  return (
    <p className={styles.styles}>
      <strong>Como cada estilo julga: </strong>
      {STYLES.map((s, i) => {
        const v = meta.severityByStyle[s];
        return (
          <span key={s}>
            {i > 0 && " · "}
            {STYLE_SHORT[s]}: {v === "off" ? "não se aplica" : SEVERITY_PT[v].toLowerCase()}
          </span>
        );
      })}
    </p>
  );
}

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
    return <p className={styles.empty}>Nenhum diagnóstico para o estilo e as extensões configurados. Isso quer dizer que nenhuma regra verificável foi violada, não que o arranjo esteja bom: ouça cada voz, cante as linhas internas e confira o texto.</p>;
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
              {d.location.voices.length > 0 && (
                <p className={styles.meta}>
                  <strong>Vozes: </strong>
                  {d.location.voices.join(" e ")}
                </p>
              )}
              <p className={styles.meta}>
                <span className="chip">{CATEGORY_PT[d.category]}</span> <code className={styles.rule}>{d.ruleId}</code>
              </p>
              {CATEGORY_NOTE[d.category] && <p className={styles.meta}>{CATEGORY_NOTE[d.category]}</p>}
              <StyleVerdicts ruleId={d.ruleId} />
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
