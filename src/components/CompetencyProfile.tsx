"use client";

import { useState } from "react";
import { getLesson } from "@/content/curriculum/curriculum";
import { skillSummary } from "@/lib/progress/model";
import { useProgress } from "@/lib/progress/useProgress";

const SKILL_NAMES: Record<string, string> = {
  "leitura-vocal": "Leitura e escrita vocal",
  intervalos: "Intervalos (leitura)",
  "percepcao-intervalos": "Intervalos (ouvido)",
  acordes: "Acordes",
  "harmonia-funcional": "Harmonia funcional",
  "escrita-satb": "Escrita SATB",
  "escrita-ttbb": "Escrita TTBB",
  conceito: "Conceitos",
};

export function CompetencyProfile() {
  const { state, hydrated, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);
  if (!hydrated) return <p className="muted">Carregando…</p>;
  const skills = Object.entries(skillSummary(state));
  return (
    <div className="stack" style={{ gap: 20 }}>
      <section className="card" aria-labelledby="hab">
        <h2 id="hab" style={{ marginTop: 0 }}>
          Por habilidade
        </h2>
        {skills.length === 0 ? (
          <p className="muted">Faça os exercícios de uma lição para gerar seu perfil.</p>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Habilidade</th>
                  <th scope="col">Acertos</th>
                  <th scope="col">Desempenho</th>
                </tr>
              </thead>
              <tbody>
                {skills.map(([skill, v]) => (
                  <tr key={skill}>
                    <td>{SKILL_NAMES[skill] ?? skill}</td>
                    <td>
                      {v.correct}/{v.total}
                    </td>
                    <td style={{ minWidth: 140 }}>
                      <div className="progress-bar" role="img" aria-label={`${Math.round((v.correct / v.total) * 100)}%`}>
                        <span style={{ width: `${(v.correct / v.total) * 100}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <section className="card" aria-labelledby="hist">
        <h2 id="hist" style={{ marginTop: 0 }}>
          Histórico de tentativas
        </h2>
        {state.attempts.length === 0 ? (
          <p className="muted">Nenhuma tentativa ainda.</p>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Lição</th>
                  <th scope="col">Resultado</th>
                  <th scope="col">Semente</th>
                </tr>
              </thead>
              <tbody>
                {[...state.attempts].reverse().map((a) => (
                  <tr key={a.id}>
                    <td>{new Date(a.finishedAt).toLocaleString("pt-BR")}</td>
                    <td>{getLesson(a.lessonId)?.title ?? a.lessonId}</td>
                    <td>
                      {a.result.correct}/{a.result.total} {a.result.passed ? <span className="chip chip-ok">domínio</span> : null}
                    </td>
                    <td>
                      <code>{a.seed}</code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="muted" style={{ fontSize: "0.85rem" }}>
          A semente permite reconstruir exatamente os itens apresentados em cada tentativa.
        </p>
      </section>
      <section className="card" aria-labelledby="dados">
        <h2 id="dados" style={{ marginTop: 0 }}>
          Dados neste navegador
        </h2>
        <p>Nesta versão, o progresso fica salvo apenas neste navegador. A sincronização com sua conta chega com a integração do banco de dados.</p>
        {confirming ? (
          <div className="row" role="alertdialog" aria-label="Confirmar exclusão do progresso">
            <span>Apagar todas as tentativas registradas? Esta ação não pode ser desfeita.</span>
            <button
              type="button"
              className="btn btn-accent btn-sm"
              onClick={() => {
                reset();
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
            Apagar progresso local…
          </button>
        )}
      </section>
    </div>
  );
}
