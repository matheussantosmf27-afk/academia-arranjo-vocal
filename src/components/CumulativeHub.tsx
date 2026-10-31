"use client";

import Link from "next/link";
import { useState } from "react";
import { CUMULATIVE_MELODIES, getCumulativeMelody } from "@/content/cumulative";
import { STAGES, compareScores } from "@/domain/production/cumulative";
import { EMPTY_ANALYSIS, type CumulativeVersion, currentStage, saveCumulative, useCumulative } from "@/lib/projects/cumulative";
import { ExampleBlock } from "./lesson/ExampleBlock";

const introIndex = STAGES.findIndex((s) => s.id === "desenvolvimento");
const hasIntro = (v: CumulativeVersion) => STAGES.findIndex((s) => s.id === v.stage) >= introIndex;

/** Projeto cumulativo: escolha da melodia, etapas, versões e comparação. */
export function CumulativeHub() {
  const { state, hydrated } = useCumulative();
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const [confirming, setConfirming] = useState(false);
  if (!hydrated) return <p className="muted">Carregando…</p>;

  if (!state) {
    return (
      <div style={{ display: "grid", gap: 16 }}>
        <p>Escolha a melodia do seu arranjo. Todas são do Repertório, em domínio público; você começa só com a melodia (as outras vozes em branco).</p>
        <p className="muted">
          Dica: não consulte a harmonização original na página Repertório até concluir a etapa 3. Depois, compare: a de Bach (ou de Dykes, ou de Gruber) é uma solução, não a única.
        </p>
        {CUMULATIVE_MELODIES.map((m) => (
          <section key={m.id} className="card" aria-labelledby={`mel-${m.id}`}>
            <h2 id={`mel-${m.id}`} style={{ marginTop: 0, fontSize: "1.15rem" }}>
              {m.title}
            </h2>
            <p className="muted" style={{ fontSize: "0.9rem" }}>
              {m.about} {m.score.measureCount} compassos.
            </p>
            <button
              type="button"
              className="btn btn-accent btn-sm"
              onClick={() => saveCumulative({ melodyId: m.id, startedAt: new Date().toISOString(), analysis: EMPTY_ANALYSIS, notes: {}, versions: [], working: m.score, arrangementId: null })}
            >
              Começar com esta melodia
            </button>
          </section>
        ))}
      </div>
    );
  }

  const melody = getCumulativeMelody(state.melodyId);
  const cur = currentStage(state);
  const versions = state.versions;
  const va = versions[a];
  const vb = versions[b];
  const cmp = va && vb && a !== b && melody ? compareScores(va.score, vb.score, melody.score.metadata.style, (hasIntro(vb) ? 2 : 0) - (hasIntro(va) ? 2 : 0)) : null;

  return (
    <div style={{ display: "grid", gap: 20 }}>
      <section className="card" aria-labelledby="etapas">
        <h2 id="etapas" style={{ marginTop: 0 }}>
          {melody?.title ?? state.melodyId}: etapas
        </h2>
        <ol style={{ display: "grid", gap: 6, paddingLeft: 20 }}>
          {STAGES.map((s) => {
            const v = versions.find((x) => x.stage === s.id);
            return (
              <li key={s.id}>
                <strong>{s.title}</strong>{" "}
                {v ? <span className="chip chip-ok">concluída em {new Date(v.at).toLocaleDateString("pt-BR")}</span> : s.id === cur ? <span className="chip chip-alerta">etapa atual</span> : <span className="chip">pendente</span>}
                <div className="muted" style={{ fontSize: "0.88rem" }}>
                  {s.goal}
                </div>
              </li>
            );
          })}
        </ol>
        <Link className="btn btn-accent" href="/estudio?meu-arranjo=1">
          {cur ? "Continuar no laboratório" : "Abrir o arranjo final no laboratório"}
        </Link>
      </section>

      <section className="card" aria-labelledby="versoes">
        <h2 id="versoes" style={{ marginTop: 0 }}>
          Versões ({versions.length})
        </h2>
        {versions.length === 0 ? (
          <p className="muted">Cada etapa concluída guarda uma versão aqui.</p>
        ) : (
          <>
            <ul>
              {versions.map((v, i) => (
                <li key={v.at}>
                  {i + 1}. {v.label} <span className="muted">({new Date(v.at).toLocaleString("pt-BR")})</span>
                </li>
              ))}
            </ul>
            {versions.length >= 2 && (
              <div style={{ display: "grid", gap: 8 }}>
                <div className="row" style={{ gap: 12, flexWrap: "wrap" }}>
                  <label>
                    Comparar{" "}
                    <select value={a} onChange={(e) => setA(Number(e.target.value))}>
                      {versions.map((v, i) => (
                        <option key={v.at} value={i}>
                          {i + 1}. {v.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    com{" "}
                    <select value={b} onChange={(e) => setB(Number(e.target.value))}>
                      {versions.map((v, i) => (
                        <option key={v.at} value={i}>
                          {i + 1}. {v.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {cmp && (
                  <div data-testid="comparison">
                    <p style={{ margin: 0 }}>
                      Vozes escritas: {cmp.voicesWritten[0]} → {cmp.voicesWritten[1]} · compassos: {cmp.measures[0]} → {cmp.measures[1]} · erros: {cmp.before.erro} → {cmp.after.erro} · alertas: {cmp.before.alerta} →{" "}
                      {cmp.after.alerta} · sugestões: {cmp.before.sugestao} → {cmp.after.sugestao}
                    </p>
                    <div className="grid">
                      <div>
                        <strong>Resolvidos ({cmp.resolved.length})</strong>
                        <ul>{cmp.resolved.length ? cmp.resolved.slice(0, 20).map((r) => <li key={r}>{r}</li>) : <li className="muted">nenhum</li>}</ul>
                      </div>
                      <div>
                        <strong>Novos ({cmp.introduced.length})</strong>
                        <ul>{cmp.introduced.length ? cmp.introduced.slice(0, 20).map((r) => <li key={r}>{r}</li>) : <li className="muted">nenhum</li>}</ul>
                      </div>
                    </div>
                    {vb && <ExampleBlock score={vb.score} verdict="observacao" caption={vb.label} commentary="Ouça as duas versões e compare o que o motor não mede: cantabilidade, cor e expressão." />}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>

      <section className="card" aria-labelledby="recomecar">
        <h2 id="recomecar" style={{ marginTop: 0, fontSize: "1.05rem" }}>
          Trocar de melodia
        </h2>
        {confirming ? (
          <div className="row" role="alertdialog" aria-label="Confirmar">
            <span>Apagar este projeto e todas as versões guardadas neste navegador? As versões salvas na conta continuam lá.</span>
            <button
              type="button"
              className="btn btn-accent btn-sm"
              onClick={() => {
                saveCumulative(null);
                setConfirming(false);
              }}
            >
              Sim, apagar
            </button>
            <button type="button" className="btn btn-sm" onClick={() => setConfirming(false)}>
              Cancelar
            </button>
          </div>
        ) : (
          <button type="button" className="btn btn-sm" onClick={() => setConfirming(true)}>
            Recomeçar com outra melodia…
          </button>
        )}
      </section>
    </div>
  );
}
