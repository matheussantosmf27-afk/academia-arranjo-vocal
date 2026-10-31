"use client";

import { useId, useState } from "react";
import { saveHumanEvaluation } from "@/app/actions/evaluations";
import { HUMAN_RUBRIC, type HumanCriterionId, type HumanEvaluation, ROLE_PT, validateHumanEvaluation } from "@/domain/evaluation/human";
import { LEVEL_PT, type Level } from "@/domain/evaluation/rubric";
import type { Score } from "@/domain/music/score";
import { useAuth } from "@/lib/auth/useAuth";
import { addHumanEvaluation, useHumanEvaluations } from "@/lib/evaluation/human-store";

const LEVELS: Level[] = [1, 2, 3, 4];

/**
 * Parecer humano com a rubrica de 10 critérios. Quem avalia escolhe cada nível; nada é
 * pré-preenchido pelo motor. Fica no navegador e, com conta, também na conta (versão + avaliação).
 */
export function HumanEvaluationForm({ target, score, title }: { target: string; score: Score; title: string }) {
  const id = useId();
  const { user } = useAuth();
  const previous = useHumanEvaluations(target);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<HumanEvaluation["role"]>("professor");
  const [levels, setLevels] = useState<Partial<Record<HumanCriterionId, Level>>>({});
  const [comments, setComments] = useState<Partial<Record<HumanCriterionId, string>>>({});
  const [general, setGeneral] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    const problems = validateHumanEvaluation({ evaluatorName: name, levels, general });
    setErrors(problems);
    if (problems.length) return;
    setSaving(true);
    const evaluation: HumanEvaluation = { id: crypto.randomUUID(), at: new Date().toISOString(), evaluatorName: name.trim(), role, target, levels, comments, general: general.trim() };
    addHumanEvaluation(evaluation);
    let msg = "Avaliação registrada neste navegador.";
    if (user) {
      const r = await saveHumanEvaluation(score, { target, arrangementId: null, evaluatorName: evaluation.evaluatorName, role, levels, comments, general: evaluation.general });
      msg = r.ok ? `Avaliação registrada neste navegador e na sua conta (versão ${r.versionNumber} do arranjo avaliado).` : `Registrada neste navegador; a conta não recebeu: ${r.error}`;
    }
    setSaving(false);
    setStatus(msg);
    setOpen(false);
    setLevels({});
    setComments({});
    setGeneral("");
  };

  return (
    <section aria-labelledby={`${id}-h`} style={{ borderTop: "1px solid var(--line)", paddingTop: 10 }} data-testid="human-eval">
      <h3 id={`${id}-h`} style={{ margin: "0 0 4px" }}>
        Avaliação humana (professor ou regente)
      </h3>
      <p className="muted" style={{ fontSize: "0.88rem", margin: 0 }}>
        Criatividade, expressividade e adequação ao repertório não são medidas pelo motor. Peça a um professor, regente ou colega experiente que ouça e leia &ldquo;{title}&rdquo; e preencha esta
        rubrica aqui, no seu dispositivo.
      </p>
      {status && (
        <p role="status" style={{ margin: "6px 0" }}>
          {status}
        </p>
      )}
      {previous.length > 0 && (
        <details style={{ margin: "6px 0" }}>
          <summary>{previous.length} avaliação(ões) registrada(s)</summary>
          {previous.map((e) => (
            <div key={e.id} style={{ margin: "8px 0" }}>
              <strong>
                {ROLE_PT[e.role]} {e.evaluatorName}
              </strong>{" "}
              <span className="muted">— {new Date(e.at).toLocaleDateString("pt-BR")}</span>
              <ul style={{ margin: "4px 0", fontSize: "0.9rem" }}>
                {HUMAN_RUBRIC.map((c) => (
                  <li key={c.id}>
                    {c.name}: {e.levels[c.id] ? LEVEL_PT[e.levels[c.id]!] : "—"}
                    {e.comments[c.id] ? ` — ${e.comments[c.id]}` : ""}
                  </li>
                ))}
              </ul>
              <p style={{ margin: 0 }}>{e.general}</p>
            </div>
          ))}
        </details>
      )}
      {!open ? (
        <button type="button" className="btn btn-sm" onClick={() => setOpen(true)}>
          Registrar uma avaliação humana
        </button>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          style={{ display: "grid", gap: 10, marginTop: 8 }}
        >
          <div className="row" style={{ gap: 12, flexWrap: "wrap" }}>
            <label style={{ display: "grid", gap: 2 }}>
              Nome de quem avalia
              <input type="text" value={name} maxLength={120} onChange={(e) => setName(e.target.value)} />
            </label>
            <label style={{ display: "grid", gap: 2 }}>
              Papel
              <select value={role} onChange={(e) => setRole(e.target.value as HumanEvaluation["role"])}>
                {(Object.keys(ROLE_PT) as HumanEvaluation["role"][]).map((r) => (
                  <option key={r} value={r}>
                    {ROLE_PT[r]}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {HUMAN_RUBRIC.map((c) => (
            <fieldset key={c.id} style={{ border: "1px solid var(--line)", borderRadius: 8, padding: "8px 10px" }}>
              <legend>
                <strong>{c.name}</strong>
              </legend>
              <p style={{ margin: "0 0 4px", fontSize: "0.9rem" }}>{c.question}</p>
              {c.engineHint && (
                <p className="muted" style={{ margin: "0 0 4px", fontSize: "0.84rem" }}>
                  Referência: {c.engineHint}
                </p>
              )}
              <div style={{ display: "grid", gap: 2 }}>
                {LEVELS.map((l) => (
                  <label key={l} style={{ display: "flex", gap: 6, alignItems: "flex-start", fontSize: "0.88rem" }}>
                    <input type="radio" name={`${id}-${c.id}`} checked={levels[c.id] === l} onChange={() => setLevels((s) => ({ ...s, [c.id]: l }))} />
                    <span>
                      <strong>{LEVEL_PT[l]}:</strong> {c.levels[l]}
                    </span>
                  </label>
                ))}
              </div>
              <label style={{ display: "grid", gap: 2, marginTop: 4, fontSize: "0.88rem" }}>
                Comentário (opcional)
                <textarea rows={2} maxLength={2000} value={comments[c.id] ?? ""} onChange={(e) => setComments((s) => ({ ...s, [c.id]: e.target.value }))} />
              </label>
            </fieldset>
          ))}
          <label style={{ display: "grid", gap: 2 }}>
            Comentário geral: o que está bom e o que trabalhar a seguir
            <textarea rows={3} maxLength={4000} value={general} onChange={(e) => setGeneral(e.target.value)} />
          </label>
          {errors.length > 0 && (
            <ul role="alert" style={{ color: "var(--erro)", margin: 0 }}>
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}
          <div className="row" style={{ gap: 8 }}>
            <button type="submit" className="btn btn-accent btn-sm" disabled={saving} aria-busy={saving}>
              {saving ? "Registrando…" : "Registrar avaliação"}
            </button>
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => setOpen(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
