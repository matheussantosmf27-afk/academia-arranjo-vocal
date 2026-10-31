"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { saveArrangementVersion } from "@/app/actions/arrangements";
import { getCumulativeMelody } from "@/content/cumulative";
import type { Score } from "@/domain/music/score";
import { STAGES, type StageResult, checkStage, prependBars } from "@/domain/production/cumulative";
import { useAuth } from "@/lib/auth/useAuth";
import { type CumulativeState, currentStage, loadCumulative, saveCumulative, useCumulative } from "@/lib/projects/cumulative";
import { DiagnosticList } from "../diagnostics/DiagnosticList";
import { HumanEvaluationForm } from "../HumanEvaluationForm";
import styles from "./ProjectPanel.module.css";

/** Painel do projeto cumulativo no laboratório: a etapa atual, sua conferência e o registro da versão. */
export function CumulativePanel({ score, onLoad, onStatus }: { score: Score; onLoad: (s: Score, m: string) => void; onStatus: (m: string) => void }) {
  const { state, hydrated } = useCumulative();
  const { user } = useAuth();
  const [result, setResult] = useState<StageResult | null>(null);
  const [saving, setSaving] = useState(false);
  const lastSaved = useRef<Score | null>(null);

  // Rascunho da etapa atual salvo a cada mudança da partitura (não a cada mudança do estado).
  useEffect(() => {
    if (lastSaved.current === score) return;
    const t = setTimeout(() => {
      const cur = loadCumulative();
      if (!cur) return;
      lastSaved.current = score;
      saveCumulative({ ...cur, working: score });
    }, 500);
    return () => clearTimeout(t);
  }, [score]);

  if (!hydrated) return null;
  const melody = state ? getCumulativeMelody(state.melodyId) : undefined;
  if (!state || !melody) {
    return (
      <section className={styles.panel}>
        <p style={{ margin: 0 }}>
          Nenhum projeto cumulativo em andamento. <Link href="/meu-arranjo">Escolha uma melodia em Meu arranjo</Link>.
        </p>
      </section>
    );
  }
  const stageId = currentStage(state);
  const stage = STAGES.find((s) => s.id === stageId);
  const previous = state.versions[state.versions.length - 1]?.score ?? null;
  const input = { melody: melody.score, previous, analysis: state.analysis, notes: state.notes };
  const set = (patch: Partial<CumulativeState>) => saveCumulative({ ...state, ...patch });

  const conferir = () => {
    if (!stage) return;
    const r = checkStage(stage.id, score, input);
    setResult(r);
    onStatus(r.passed ? `Etapa ${stage.n} pronta para ser concluída.` : `Etapa ${stage.n}: ${r.checks.filter((c) => !c.ok).length} critério(s) ainda não atendido(s).`);
  };

  const concluir = async () => {
    if (!stage) return;
    const r = checkStage(stage.id, score, input);
    setResult(r);
    if (!r.passed) return;
    setSaving(true);
    const label = `Etapa ${stage.n} — ${stage.title}`;
    let arrangementId = state.arrangementId;
    let msg = `${label}: versão guardada neste navegador.`;
    if (user) {
      const saved = await saveArrangementVersion(score, arrangementId, label);
      if (saved.ok) {
        arrangementId = saved.arrangementId;
        msg = `${label}: versão ${saved.versionNumber} guardada neste navegador e na sua conta.`;
      } else msg = `${label}: versão guardada neste navegador; a conta não recebeu: ${saved.error}`;
    }
    const versions = [...state.versions, { stage: stage.id, at: new Date().toISOString(), label, score }];
    const next = STAGES[stage.n];
    const working = next?.id === "desenvolvimento" ? prependBars(score, 2) : score;
    saveCumulative({ ...state, versions, arrangementId, working });
    setSaving(false);
    setResult(null);
    if (working !== score) onLoad(working, `${msg} Dois compassos foram abertos antes da melodia para a introdução.`);
    else onStatus(msg);
  };

  return (
    <section className={styles.panel} aria-labelledby="cum-t" data-testid="cumulative-panel">
      <div className={styles.head}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>
            Meu arranjo · {melody.title}
          </p>
          <h2 id="cum-t" className={styles.title}>
            {stage ? `Etapa ${stage.n} de 6: ${stage.title}` : "Projeto concluído"}
          </h2>
        </div>
        <Link className="btn btn-sm btn-ghost" href="/meu-arranjo">
          Etapas e versões
        </Link>
      </div>
      {!stage ? (
        <>
          <p style={{ margin: 0 }}>As seis etapas estão concluídas e cada uma guardou uma versão. Exporte a partitura pelo menu do laboratório e peça uma avaliação humana.</p>
          <HumanEvaluationForm target="meu-arranjo" score={score} title={score.title} />
        </>
      ) : (
        <>
          <p style={{ margin: 0 }}>{stage.goal}</p>
          <ol style={{ margin: "4px 0" }}>
            {stage.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p style={{ margin: 0, fontSize: "0.9rem" }}>
            Aula de apoio:{" "}
            <Link href={stage.lesson.href} target="_blank">
              {stage.lesson.label}
            </Link>
          </p>
          {stage.id === "analise" && (
            <div className="grid" style={{ gap: 8 }}>
              <label className={styles.field}>
                Tonalidade (ex.: G, Em, Bb)
                <input type="text" value={state.analysis.key} maxLength={10} onChange={(e) => set({ analysis: { ...state.analysis, key: e.target.value } })} />
              </label>
              <label className={styles.field}>
                Nota mais grave (ex.: D4)
                <input type="text" value={state.analysis.lowest} maxLength={10} onChange={(e) => set({ analysis: { ...state.analysis, lowest: e.target.value } })} />
              </label>
              <label className={styles.field}>
                Nota mais aguda (ex.: E5)
                <input type="text" value={state.analysis.highest} maxLength={10} onChange={(e) => set({ analysis: { ...state.analysis, highest: e.target.value } })} />
              </label>
              <label className={styles.field}>
                Frases: onde terminam e que cadência pedem
                <textarea rows={3} maxLength={4000} value={state.analysis.phrases} onChange={(e) => set({ analysis: { ...state.analysis, phrases: e.target.value } })} />
              </label>
              <label className={styles.field}>
                Clímax: onde está e como prepará-lo
                <textarea rows={2} maxLength={2000} value={state.analysis.climax} onChange={(e) => set({ analysis: { ...state.analysis, climax: e.target.value } })} />
              </label>
            </div>
          )}
          {(stage.id === "refinamento" || stage.id === "finalizacao") && (
            <label className={styles.field}>
              {stage.id === "refinamento" ? "O que você mudou nesta revisão e por quê" : "Memorial do arranjo"}
              <textarea rows={4} maxLength={4000} value={state.notes[stage.id] ?? ""} onChange={(e) => set({ notes: { ...state.notes, [stage.id]: e.target.value } })} />
            </label>
          )}
          <div className={styles.inline} style={{ flexWrap: "wrap" }}>
            <button type="button" className="btn btn-sm" onClick={conferir}>
              Conferir etapa
            </button>
            <button type="button" className="btn btn-sm btn-accent" onClick={() => void concluir()} disabled={saving || !result?.passed} aria-busy={saving}>
              {saving ? "Guardando…" : "Concluir etapa e guardar versão"}
            </button>
            {!result?.passed && <span className="muted" style={{ fontSize: "0.86rem" }}>Concluir fica disponível quando a conferência passar.</span>}
          </div>
          {result && (
            <div className={styles.rubric} aria-live="polite">
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {result.checks.map((c) => (
                  <li key={c.id + c.label} className={styles.check}>
                    <span className={`chip ${c.ok ? "chip-ok" : "chip-erro"}`}>{c.ok ? "ok" : "falta"}</span>
                    <span>
                      <strong>{c.label}.</strong> {c.detail}
                    </span>
                  </li>
                ))}
              </ul>
              {result.task && result.task.serious.length > 0 && <DiagnosticList diagnostics={result.task.serious} />}
            </div>
          )}
        </>
      )}
    </section>
  );
}
