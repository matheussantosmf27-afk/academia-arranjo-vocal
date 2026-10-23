"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { askTutor, tutorStatus } from "@/app/actions/tutor";
import { getLesson } from "@/content/curriculum/curriculum";
import type { Score, StyleProfileId } from "@/domain/music/score";
import { TUTOR_MODES, type TutorMode } from "@/domain/tutor/grounding";
import type { Diagnostic } from "@/domain/validation";
import { useAuth } from "@/lib/auth/useAuth";
import type { TutorOutcome } from "@/lib/tutor/run";
import styles from "./Studio.module.css";

/** Tutor de IA fundamentado nos diagnósticos do motor (nunca os substitui). */
export function TutorPanel({ score, style, diagnostics, onFocus }: { score: Score; style: StyleProfileId; diagnostics: readonly Diagnostic[]; onFocus: (d: Diagnostic) => void }) {
  const { user } = useAuth();
  const [status, setStatus] = useState<{ available: boolean; reason?: string } | null>(null);
  const [mode, setMode] = useState<TutorMode>("socratico");
  const [question, setQuestion] = useState("");
  const [busy, setBusy] = useState(false);
  const [out, setOut] = useState<TutorOutcome | null>(null);

  useEffect(() => {
    let active = true;
    void tutorStatus().then((s) => active && setStatus(s));
    return () => {
      active = false;
    };
  }, []);

  const byId = new Map(diagnostics.map((d) => [d.id, d]));

  return (
    <section className={styles.panel} aria-labelledby="tutor">
      <h2 id="tutor" className={styles.panelTitle}>
        Tutor
      </h2>
      <p className="muted" style={{ fontSize: "0.8rem", marginTop: 0 }}>
        O tutor explica e questiona com base nos diagnósticos do motor; ele não cria nem altera diagnósticos.
      </p>
      {status === null ? (
        <p className="muted">Verificando…</p>
      ) : !status.available ? (
        <p className="notice">{status.reason}</p>
      ) : !user ? (
        <p className="notice">
          <Link href="/entrar">Entre na sua conta</Link> para usar o tutor.
        </p>
      ) : (
        <form
          className="stack"
          style={{ gap: 6 }}
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setOut(await askTutor({ ...score, metadata: { ...score.metadata, style } }, { question, mode, style }));
            setBusy(false);
          }}
        >
          <label className="stack" style={{ gap: 2 }}>
            Modo
            <select value={mode} onChange={(e) => setMode(e.target.value as TutorMode)}>
              {(Object.keys(TUTOR_MODES) as TutorMode[]).map((m) => (
                <option key={m} value={m}>
                  {TUTOR_MODES[m]}
                </option>
              ))}
            </select>
          </label>
          <label className="stack" style={{ gap: 2 }}>
            Pergunta
            <textarea rows={3} maxLength={2000} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ex.: por que o motor aponta o compasso 2?" />
          </label>
          <button type="submit" className="btn btn-sm btn-primary" disabled={busy} style={{ alignSelf: "flex-start" }}>
            {busy ? "Pensando…" : "Perguntar"}
          </button>
        </form>
      )}
      {out && !out.ok && (
        <p className="notice" role="alert">
          {out.error}
        </p>
      )}
      {out && out.ok && (
        <div className="stack" style={{ gap: 6, marginTop: 8 }} aria-live="polite">
          {out.response.answer && <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{out.response.answer}</p>}
          {out.response.socraticQuestions.length > 0 && (
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              {out.response.socraticQuestions.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          )}
          {out.response.revisions.length > 0 && (
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {out.response.revisions.map((r) => (
                <li key={r.diagnosticId + r.suggestion}>{r.suggestion}</li>
              ))}
            </ul>
          )}
          {out.response.citedDiagnosticIds.length > 0 && (
            <div className="row">
              <small className="muted">Evidências:</small>
              {out.response.citedDiagnosticIds.map((id) => {
                const d = byId.get(id);
                return d ? (
                  <button key={id} type="button" className="btn btn-sm btn-ghost" onClick={() => onFocus(d)}>
                    c.{d.location.measure} · {d.title}
                  </button>
                ) : null;
              })}
            </div>
          )}
          {out.response.suggestedLessonIds.length > 0 && (
            <p style={{ margin: 0, fontSize: "0.88rem" }}>
              Revise:{" "}
              {out.response.suggestedLessonIds.map((id, i) => (
                <span key={id}>
                  {i > 0 && ", "}
                  <Link href={`/licoes/${id}`}>{getLesson(id)?.title}</Link>
                </span>
              ))}
            </p>
          )}
          {out.warnings.length > 0 && <small className="muted">Verificação de fundamentação: {out.warnings.join(" ")}</small>}
          <small className="muted">
            Motor v{out.evidence.engineVersion} · {out.evidence.diagnosticIds.length} diagnóstico(s) enviados como evidência · modelo {out.servedBy}
          </small>
        </div>
      )}
    </section>
  );
}
