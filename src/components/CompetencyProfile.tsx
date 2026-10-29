"use client";

import { useState } from "react";
import { COMPETENCIES, LESSONS, getLesson } from "@/content/curriculum/curriculum";
import type { CompetencyId } from "@/content/curriculum/types";
import { PROJECTS } from "@/content/projects";
import { loadPractice } from "@/lib/projects/practice";
import { competencyReports } from "@/lib/progress/competency";
import { isReviewAttempt } from "@/lib/progress/model";
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
  "escrita-ssaa": "Escrita SSA/SSAA",
  regencia: "Regência e ensaio",
  conceito: "Conceitos",
  contraponto: "Contraponto",
  "conducao-de-vozes": "Condução de vozes",
  arranjo: "Arranjo",
  "texto-e-prosodia": "Texto e prosódia",
  percepcao: "Percepção auditiva",
};

export function CompetencyProfile() {
  const { state, hydrated, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);
  if (!hydrated) return <p className="muted">Carregando…</p>;
  const skills = Object.entries(skillSummary(state));
  const projects = PROJECTS.map((p) => {
    const last = loadPractice(p.id, p.justificationPrompts.length).lastRubric;
    return { projectId: p.id, lessonId: p.lessonId, evaluated: !!last, proficient: !!last?.proficient };
  });
  const reports = competencyReports(state, LESSONS, Object.keys(COMPETENCIES) as CompetencyId[], projects).filter((c) => c.lessons > 0);
  const pct = (a: number, b: number) => `${Math.round((a / b) * 100)}%`;
  return (
    <div className="stack" style={{ gap: 20 }}>
      <section className="card" aria-labelledby="comp">
        <h2 id="comp" style={{ marginTop: 0 }}>
          Competências em quatro dimensões
        </h2>
        <p className="muted">
          Concluir uma aula mostra o domínio de hoje. Para saber se você aprendeu de verdade, o curso olha também se o conteúdo ficou (retenção), se você o aplica em
          contexto novo (transferência) e se consegue produzir um arranjo que atende a rubrica (prática). Todos os números vêm das suas tentativas e projetos
          registrados; nenhum vem de tempo de página ou de aulas lidas.
        </p>
        <dl className="muted" style={{ fontSize: "0.88rem" }}>
          <dt>
            <strong>Imediato</strong>
          </dt>
          <dd>aulas da competência com a verificação aprovada.</dd>
          <dt>
            <strong>Retenção</strong>
          </dt>
          <dd>revisões espaçadas aprovadas no prazo (itens novos, dias depois). Lapso: revisão reprovada, que volta ao início.</dd>
          <dt>
            <strong>Transferência</strong>
          </dt>
          <dd>acerto na primeira resposta em itens com notas, tonalidades e acordes sorteados, em outras aulas da competência, depois do seu primeiro domínio nela.</dd>
          <dt>
            <strong>Prática</strong>
          </dt>
          <dd>projetos ligados à competência com todos os critérios automáticos da rubrica em Proficiente ou acima.</dd>
        </dl>
        <div className="table-wrap">
          <table className="data">
            <caption className="sr-only">Competências: imediato, retenção, transferência e prática</caption>
            <thead>
              <tr>
                <th scope="col">Competência</th>
                <th scope="col">Imediato</th>
                <th scope="col">Retenção</th>
                <th scope="col">Transferência</th>
                <th scope="col">Prática</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((c) => (
                <tr key={c.id}>
                  <th scope="row">{COMPETENCIES[c.id]}</th>
                  <td>
                    {c.mastered}/{c.lessons} aulas
                  </td>
                  <td>
                    {c.mastered === 0 ? (
                      <span className="muted">sem dados</span>
                    ) : (
                      <>
                        {c.retained} no prazo{c.lapses > 0 ? ` · ${c.lapses} lapso(s)` : ""}
                        {c.reviewsDue > 0 && (
                          <span className="chip chip-alerta" style={{ marginLeft: 6 }}>
                            {c.reviewsDue} vencida(s)
                          </span>
                        )}
                      </>
                    )}
                  </td>
                  <td>{c.transferTotal === 0 ? <span className="muted">sem dados</span> : `${pct(c.transferCorrect, c.transferTotal)} em ${c.transferTotal} itens`}</td>
                  <td>
                    {c.projects === 0 ? (
                      <span className="muted">sem projeto</span>
                    ) : c.projectsEvaluated === 0 ? (
                      <span className="muted">0/{c.projects} avaliado(s)</span>
                    ) : (
                      `${c.projectsProficient}/${c.projects} proficiente(s)`
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="card" aria-labelledby="hab">
        <h2 id="hab" style={{ marginTop: 0 }}>
          Por habilidade
        </h2>
        {skills.length === 0 ? (
          <p className="muted">Faça as verificações de uma aula para gerar seu perfil.</p>
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
                  <th scope="col">Aula</th>
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
                      {a.result.correct}/{a.result.total}{" "}
                      {isReviewAttempt(a) ? (
                        <span className={`chip ${a.result.passed ? "chip-ok" : "chip-alerta"}`}>{a.result.passed ? "revisão aprovada" : "revisão"}</span>
                      ) : a.result.passed ? (
                        <span className="chip chip-ok">domínio</span>
                      ) : null}
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
        <p>
          Sem conta, o progresso fica só neste navegador. Com conta, cada tentativa e cada revisão é recorrigida no servidor e guardada; ao entrar em outro navegador,
          elas voltam. As avaliações de projeto pela rubrica ficam neste navegador (a entrega final é salva na conta).
        </p>
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
