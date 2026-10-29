"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { saveProjectEvaluation } from "@/app/actions/evaluations";
import type { ProjectSpec } from "@/content/projects";
import { type CriterionId, LEVEL_PT, type Level, type RubricResult, type VersionComparison, compareVersions, evaluateRubric, meetsPracticalStandard } from "@/domain/evaluation/rubric";
import { getFormation } from "@/domain/music/formations";
import type { Score, StyleProfileId } from "@/domain/music/score";
import { useAuth } from "@/lib/auth/useAuth";
import { LISTENING_CHECKLIST, type PracticeState, loadPractice, savePractice } from "@/lib/projects/practice";
import styles from "./ProjectPanel.module.css";

const SELF: Array<{ id: CriterionId; label: string }> = [
  { id: "criatividade", label: "Criatividade" },
  { id: "prosodia", label: "Prosódia" },
];

export function ProjectPanel({ project, score, style, onStatus }: { project: ProjectSpec; score: Score; style: StyleProfileId; onStatus: (s: string) => void }) {
  const [state, setState] = useState<PracticeState>(() => loadPractice(project.id, project.justificationPrompts.length));
  const [result, setResult] = useState<RubricResult | null>(null);
  const [comparison, setComparison] = useState<VersionComparison | null>(null);
  const [compareWith, setCompareWith] = useState("");
  const [cloudId, setCloudId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const melodyName = useMemo(() => getFormation(project.starting.formation).voices.find((v) => v.id === project.melodyVoice)?.name, [project]);

  const update = (next: PracticeState) => {
    setState(next);
    savePractice(project.id, next);
  };
  const rubricInput = (s: Score) => ({
    score: s,
    style,
    starting: project.starting,
    melodyVoice: project.melodyVoice,
    justifications: state.justifications,
    selfAssessment: state.selfAssessment,
  });

  return (
    <section className={styles.panel} aria-labelledby="proj-title">
      <div className={styles.head}>
        <div>
          <p className="eyebrow">Trabalho prático · {project.level}º semestre</p>
          <h2 id="proj-title" className={styles.title}>
            {project.title}
          </h2>
          <p style={{ margin: 0 }}>{project.summary}</p>
        </div>
        <Link href={`/licoes/${project.lessonId}`} className="btn btn-sm">
          Aula de referência
        </Link>
      </div>
      <details open className={styles.block}>
        <summary>Etapas</summary>
        <ol>
          {project.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="muted" style={{ fontSize: "0.85rem" }}>
          A melodia dada está no {melodyName}. Preserve-a: a rubrica verifica.
        </p>
      </details>
      <details className={styles.block}>
        <summary>Justificativas ({state.justifications.filter((j) => j.trim().length >= 40).length}/{project.justificationPrompts.length})</summary>
        {project.justificationPrompts.map((q, i) => (
          <label key={q} className={styles.field}>
            {q}
            <textarea
              rows={3}
              maxLength={4000}
              value={state.justifications[i] ?? ""}
              onChange={(e) => {
                const j = [...state.justifications];
                j[i] = e.target.value;
                update({ ...state, justifications: j });
              }}
            />
          </label>
        ))}
        <div className="row">
          {SELF.map((c) => (
            <label key={c.id} className={styles.inline}>
              Autoavaliação — {c.label}
              <select
                value={state.selfAssessment[c.id] ?? ""}
                onChange={(e) => {
                  const v = e.target.value ? (Number(e.target.value) as Level) : undefined;
                  const sa = { ...state.selfAssessment };
                  if (v) sa[c.id] = v;
                  else delete sa[c.id];
                  update({ ...state, selfAssessment: sa });
                }}
              >
                <option value="">—</option>
                {([1, 2, 3, 4] as Level[]).map((l) => (
                  <option key={l} value={l}>
                    {l} · {LEVEL_PT[l]}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </details>
      <details className={styles.block} open={!state.draftAt}>
        <summary>
          Rascunho e escuta ({state.draftAt ? "rascunho registrado" : `${state.checklist.length}/${LISTENING_CHECKLIST.length}`})
        </summary>
        <p className="muted" style={{ fontSize: "0.85rem", margin: "6px 0" }}>
          Como nas aulas de arranjo das faculdades, o trabalho passa por um rascunho ouvido e cantado antes da entrega. Confirme cada item (autodeclarado) e
          registre o rascunho: ele fica guardado para você comparar com a versão final.
        </p>
        {LISTENING_CHECKLIST.map((c) => (
          <label key={c.id} className={styles.check}>
            <input
              type="checkbox"
              checked={state.checklist.includes(c.id)}
              onChange={(e) => update({ ...state, checklist: e.target.checked ? [...state.checklist, c.id] : state.checklist.filter((x) => x !== c.id) })}
            />
            {c.label}
          </label>
        ))}
        <div className="row" style={{ marginTop: 6 }}>
          <button
            type="button"
            className="btn btn-sm"
            disabled={state.checklist.length < LISTENING_CHECKLIST.length}
            onClick={() => {
              const at = new Date().toISOString();
              const label = `Rascunho ${state.snapshots.filter((x) => x.label.startsWith("Rascunho")).length + 1}`;
              update({ ...state, draftAt: at, snapshots: [...state.snapshots, { at, label, score }].slice(-20) });
              setCompareWith(at);
              onStatus(`${label} registrado. Continue revisando e compare com a versão final.`);
            }}
          >
            Registrar rascunho
          </button>
          {state.draftAt && <span className="muted">Último rascunho: {new Date(state.draftAt).toLocaleString("pt-BR")}</span>}
        </div>
      </details>
      <div className="row" style={{ marginTop: 8 }}>
        <button
          type="button"
          className="btn btn-sm btn-accent"
          onClick={() => {
            const r = evaluateRubric(rubricInput(score));
            setResult(r);
            const levels: Partial<Record<CriterionId, Level>> = {};
            for (const c of r.criteria) if (c.source === "automatica" && c.level !== null) levels[c.id] = c.level;
            update({ ...state, lastRubric: { at: new Date().toISOString(), proficient: meetsPracticalStandard(r), levels } });
          }}
        >
          Avaliar com a rubrica
        </button>
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => {
            const label = `Versão ${state.snapshots.length + 1}`;
            update({ ...state, snapshots: [...state.snapshots, { at: new Date().toISOString(), label, score }].slice(-20) });
            onStatus(`${label} guardada para comparação.`);
          }}
        >
          Guardar versão para comparar
        </button>
        <label className={styles.inline}>
          Comparar com
          <select value={compareWith} onChange={(e) => setCompareWith(e.target.value)} aria-label="Versão anterior para comparar">
            <option value="">—</option>
            {state.snapshots.map((s) => (
              <option key={s.at} value={s.at}>
                {s.label} ({new Date(s.at).toLocaleTimeString("pt-BR")})
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="btn btn-sm"
          disabled={!compareWith}
          onClick={() => {
            const snap = state.snapshots.find((s) => s.at === compareWith);
            if (snap) setComparison(compareVersions(rubricInput(snap.score), rubricInput(score)));
          }}
        >
          Comparar
        </button>
        {user && (
          <button
            type="button"
            className="btn btn-sm btn-primary"
            disabled={saving || !state.draftAt}
            title={state.draftAt ? undefined : "Registre um rascunho antes da entrega final"}
            onClick={async () => {
              setSaving(true);
              const r = await saveProjectEvaluation({ ...score, metadata: { ...score.metadata, style } }, { projectId: project.id, arrangementId: cloudId, justifications: state.justifications, selfAssessment: state.selfAssessment });
              setSaving(false);
              if (r.ok) {
                setCloudId(r.arrangementId);
                onStatus(`Versão ${r.versionNumber} e avaliação salvas na sua conta (recalculadas no servidor).`);
              } else onStatus(`Falha ao salvar a avaliação: ${r.error}`);
            }}
          >
            {saving ? "Salvando…" : state.draftAt ? "Entregar: salvar avaliação na conta" : "Entrega final (registre o rascunho antes)"}
          </button>
        )}
      </div>
      {result && <RubricView result={result} />}
      {comparison && <ComparisonView c={comparison} />}
    </section>
  );
}

function RubricView({ result }: { result: RubricResult }) {
  return (
    <div className={styles.rubric} aria-live="polite">
      <h3>Avaliação por rubrica</h3>
      <p className="muted" style={{ fontSize: "0.85rem" }}>
        Cada critério é avaliado separadamente, com as evidências usadas. Não há nota única. Motor de validação v{result.engineVersion}.
      </p>
      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th scope="col">Critério</th>
              <th scope="col">Nível</th>
              <th scope="col">Comentário e evidências</th>
            </tr>
          </thead>
          <tbody>
            {result.criteria.map((c) => (
              <tr key={c.id}>
                <td>
                  <strong>{c.name}</strong>
                  <br />
                  <small className="muted">{c.source === "automatica" ? "automático" : "autoavaliação"}</small>
                </td>
                <td>{c.level ? <span className={`chip ${c.level >= 3 ? "chip-ok" : c.level === 2 ? "chip-alerta" : "chip-erro"}`}>{c.level} · {LEVEL_PT[c.level]}</span> : <span className="chip">não avaliado</span>}</td>
                <td>
                  {c.comment}
                  {c.evidence.length > 0 && (
                    <ul className={styles.evidence}>
                      {c.evidence.map((e) => (
                        <li key={e}>{e}</li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {result.improvements.length > 0 && (
        <>
          <h4>A melhorar</h4>
          <ul>
            {result.improvements.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function ComparisonView({ c }: { c: VersionComparison }) {
  return (
    <div className={styles.rubric}>
      <h3>Comparação com a versão anterior</h3>
      <div className="grid">
        <div>
          <strong>Resolvidos ({c.resolved.length})</strong>
          <ul>{c.resolved.length ? c.resolved.map((r) => <li key={r}>{r}</li>) : <li className="muted">nenhum</li>}</ul>
        </div>
        <div>
          <strong>Novos ({c.introduced.length})</strong>
          <ul>{c.introduced.length ? c.introduced.map((r) => <li key={r}>{r}</li>) : <li className="muted">nenhum</li>}</ul>
        </div>
      </div>
      <ul className={styles.evidence}>
        {c.criteria
          .filter((x) => x.before !== x.after)
          .map((x) => (
            <li key={x.id}>
              {x.name}: {x.before ?? "—"} → {x.after ?? "—"}
            </li>
          ))}
      </ul>
    </div>
  );
}
