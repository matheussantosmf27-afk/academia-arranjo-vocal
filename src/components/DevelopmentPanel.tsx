"use client";

import Link from "next/link";
import { COMPETENCIES, LESSONS } from "@/content/curriculum/curriculum";
import type { CompetencyId } from "@/content/curriculum/types";
import { STAGES } from "@/domain/production/cumulative";
import { COMPETENCY_STATUS_PT, type CompetencyStatus, competencyStatus, recurringErrors, summarize, taskOutcomes } from "@/domain/production/evidence";
import { ASSISTANCE_PT, type Assistance } from "@/domain/production/task";
import { ruleCatalog } from "@/domain/validation";
import { useProductionAttempts } from "@/lib/production/store";
import { currentStage, useCumulative } from "@/lib/projects/cumulative";
import { competencyReports } from "@/lib/progress/competency";
import { skillSummary } from "@/lib/progress/model";
import { useProgress } from "@/lib/progress/useProgress";

const RULE_NAME = new Map(ruleCatalog().map((r) => [r.id, r.name]));
const STATUS_CHIP: Record<CompetencyStatus, string> = { dominada: "chip-ok", "em-desenvolvimento": "chip-alerta", revisar: "chip-erro", "sem-dados": "" };
const pct = (x: number | null) => (x === null ? "—" : `${Math.round(x * 100)}%`);

/**
 * Painel de desenvolvimento: o que o aluno já domina, o que está em desenvolvimento e o que
 * precisa revisar, com produção, autonomia, percepção, projeto e erros recorrentes.
 * Só dados registrados pelo próprio aluno; sem dados, o painel diz isso.
 */
export function DevelopmentPanel() {
  const { state, hydrated } = useProgress();
  const attempts = useProductionAttempts();
  const { state: cumulative } = useCumulative();
  if (!hydrated) return <p className="muted">Carregando…</p>;

  const outcomes = taskOutcomes(attempts);
  const practice = outcomes.filter((o) => o.kind === "producao");
  const transfer = outcomes.filter((o) => o.kind !== "producao");
  const all = summarize(outcomes);
  const reports = competencyReports(state, LESSONS, Object.keys(COMPETENCIES) as CompetencyId[]).filter((c) => c.lessons > 0);
  const status = reports.map((c) => ({ c, s: competencyStatus({ ...c, outcomes: outcomes.filter((o) => o.competency === c.id) }) }));
  const group = (s: CompetencyStatus) => status.filter((x) => x.s === s);
  const skills = skillSummary(state);
  const ear = ["percepcao", "percepcao-intervalos"].flatMap((k) => (skills[k] ? [{ k, ...skills[k]! }] : []));
  const errors = recurringErrors(attempts);
  const stage = cumulative ? currentStage(cumulative) : null;

  return (
    <section className="card" aria-labelledby="dev" data-testid="development-panel">
      <h2 id="dev" style={{ marginTop: 0 }}>
        Painel de desenvolvimento
      </h2>
      <p className="muted" style={{ fontSize: "0.9rem" }}>
        Uma competência está <strong>dominada</strong> quando todas as aulas dela foram verificadas e, se houver tarefas de escrita ligadas a ela, pelo menos uma foi resolvida sem ajuda e o domínio
        ponderado pela ajuda chega a 75%. Fica em <strong>revisar</strong> quando há revisão vencida, mais lapsos que revisões no prazo, ou uma tarefa conferida três vezes sem resolver.
      </p>

      <div className="grid" style={{ gap: 12 }}>
        {(["dominada", "em-desenvolvimento", "revisar"] as const).map((s) => (
          <div key={s}>
            <h3 style={{ fontSize: "1rem", margin: "0 0 4px" }}>
              <span className={`chip ${STATUS_CHIP[s]}`}>{COMPETENCY_STATUS_PT[s]}</span> {group(s).length}
            </h3>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: "0.9rem" }}>
              {group(s).length ? group(s).map(({ c }) => <li key={c.id}>{COMPETENCIES[c.id]}</li>) : <li className="muted">nenhuma</li>}
            </ul>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: "1.05rem" }}>Produção e autonomia</h3>
      {outcomes.length === 0 ? (
        <p className="muted">
          Nenhuma tarefa de escrita conferida ainda. Abra um exercício independente numa aula e use &ldquo;Resolver no laboratório&rdquo;, ou faça uma situação da <Link href="/avaliacao">avaliação de transferência</Link>.
        </p>
      ) : (
        <>
          <div className="table-wrap">
            <table className="data">
              <caption className="sr-only">Tarefas de escrita conferidas</caption>
              <thead>
                <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">Iniciadas</th>
                  <th scope="col">Resolvidas</th>
                  <th scope="col">Sem ajuda</th>
                  <th scope="col">Domínio ponderado</th>
                  <th scope="col">Correções por acerto</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tarefas das aulas", summarize(practice)],
                  ["Transferência e testes", summarize(transfer)],
                ].map(([label, s]) => {
                  const x = s as ReturnType<typeof summarize>;
                  return (
                    <tr key={label as string}>
                      <th scope="row">{label as string}</th>
                      <td>{x.attempted}</td>
                      <td>{x.solved}</td>
                      <td>{x.solved ? `${x.autonomous} (${pct(x.autonomousShare)})` : "—"}</td>
                      <td>{pct(x.weightedMastery)}</td>
                      <td>{x.meanCorrections === null ? "—" : x.meanCorrections.toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: "0.9rem" }}>
            Das {all.solved} tarefa(s) resolvida(s):{" "}
            {(Object.keys(all.byAssistance) as Assistance[])
              .filter((k) => all.byAssistance[k] > 0)
              .map((k) => `${all.byAssistance[k]} ${ASSISTANCE_PT[k].toLowerCase()}`)
              .join("; ") || "nenhuma"}
            .
          </p>
        </>
      )}

      <h3 style={{ fontSize: "1.05rem" }}>Erros recorrentes</h3>
      {errors.length === 0 ? (
        <p className="muted">Nenhuma regra apareceu em duas tarefas ou mais.</p>
      ) : (
        <ul>
          {errors.map((e) => (
            <li key={e.ruleId}>
              {RULE_NAME.get(e.ruleId) ?? e.ruleId}: em {e.tasks} tarefas
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ fontSize: "1.05rem" }}>Percepção auditiva</h3>
      {ear.length === 0 ? (
        <p className="muted">Sem itens auditivos respondidos nas verificações.</p>
      ) : (
        <ul>
          {ear.map((e) => (
            <li key={e.k}>
              {e.k === "percepcao" ? "Escuta de arranjos (naipes, comparações)" : "Intervalos de ouvido"}: {e.correct}/{e.total} ({pct(e.correct / e.total)})
            </li>
          ))}
        </ul>
      )}

      <h3 style={{ fontSize: "1.05rem" }}>Projeto cumulativo</h3>
      {!cumulative ? (
        <p className="muted">
          Não iniciado. <Link href="/meu-arranjo">Começar Meu arranjo</Link>.
        </p>
      ) : (
        <p>
          {cumulative.versions.length} de {STAGES.length} etapas concluídas{stage ? `; etapa atual: ${STAGES.find((s) => s.id === stage)?.title}` : " (projeto concluído)"}. <Link href="/meu-arranjo">Ver etapas e versões</Link>.
        </p>
      )}
    </section>
  );
}
