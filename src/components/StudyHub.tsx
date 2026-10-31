"use client";

import Link from "next/link";
import { useState } from "react";
import { saveMusicalProfileRemote } from "@/app/actions/study";
import { summarize, taskOutcomes } from "@/domain/production/evidence";
import { ASSISTANCE_PT } from "@/domain/production/task";
import { TRANSFER_KIND_PT, parseTransferId } from "@/domain/production/transfer";
import { useAuth } from "@/lib/auth/useAuth";
import { useProductionAttempts } from "@/lib/production/store";
import { retentionAt } from "@/lib/progress/study";
import { useProgress } from "@/lib/progress/useProgress";
import { useHumanEvaluations } from "@/lib/evaluation/human-store";
import { loadCumulative } from "@/lib/projects/cumulative";
import { type MusicalProfile, PROFILE_QUESTIONS, type ProfileQuestion, saveProfile, useMusicalProfile } from "@/lib/study/profile";

const QUESTIONS = Object.entries(PROFILE_QUESTIONS) as [ProfileQuestion, (typeof PROFILE_QUESTIONS)[ProfileQuestion]][];

function ProfileForm({ initial, onSaved }: { initial: MusicalProfile | null; onSaved: (m: string) => void }) {
  const { user } = useAuth();
  const [answers, setAnswers] = useState<Partial<Record<ProfileQuestion, number>>>(initial?.answers ?? {});
  const [goal, setGoal] = useState(initial?.goal ?? "");
  const [consent, setConsent] = useState(initial?.consent ?? false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const submit = async () => {
    if (QUESTIONS.some(([k]) => answers[k] === undefined)) {
      setError("Responda todas as perguntas.");
      return;
    }
    setError(null);
    setSaving(true);
    const p: MusicalProfile = { answers: answers as MusicalProfile["answers"], goal: goal.trim(), consent, at: initial?.at ?? new Date().toISOString() };
    saveProfile(p);
    let msg = "Perfil salvo neste navegador.";
    if (user) {
      const r = await saveMusicalProfileRemote(p);
      msg = r.ok ? "Perfil salvo neste navegador e na sua conta." : `Perfil salvo neste navegador; a conta não recebeu: ${r.error}`;
    }
    setSaving(false);
    onSaved(msg);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void submit();
      }}
      style={{ display: "grid", gap: 10 }}
    >
      {QUESTIONS.map(([k, q]) => (
        <fieldset key={k} style={{ border: "1px solid var(--line)", borderRadius: 8, padding: "6px 10px" }}>
          <legend>{q.label}</legend>
          {q.options.map((o, i) => (
            <label key={o} style={{ display: "flex", gap: 6, fontSize: "0.92rem" }}>
              <input type="radio" name={`perfil-${k}`} checked={answers[k] === i} onChange={() => setAnswers((s) => ({ ...s, [k]: i }))} />
              {o}
            </label>
          ))}
        </fieldset>
      ))}
      <label style={{ display: "grid", gap: 2 }}>
        O que você quer conseguir escrever ao fim do curso? (opcional)
        <textarea rows={2} maxLength={1000} value={goal} onChange={(e) => setGoal(e.target.value)} />
      </label>
      <label style={{ display: "flex", gap: 6, fontSize: "0.92rem" }}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        Autorizo o uso anônimo destes dados em pesquisa sobre o curso (opcional; nada é enviado sem conta).
      </label>
      {error && (
        <p role="alert" style={{ color: "var(--erro)", margin: 0 }}>
          {error}
        </p>
      )}
      <button type="submit" className="btn btn-accent btn-sm" disabled={saving} aria-busy={saving} style={{ justifySelf: "start" }}>
        {saving ? "Salvando…" : "Salvar perfil"}
      </button>
    </form>
  );
}

/** Estrutura de validação pedagógica: perfil inicial, pré/pós-teste, retenção e indicadores de processo. Só dados reais do aluno. */
export interface TestItem {
  readonly id: string;
}

export function StudyHub({ pre, post }: { pre: readonly TestItem[]; post: readonly TestItem[] }) {
  const profile = useMusicalProfile();
  const { state, hydrated } = useProgress();
  const attempts = useProductionAttempts();
  const humans = useHumanEvaluations();
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  if (!hydrated) return <p className="muted">Carregando…</p>;

  const outcomes = taskOutcomes(attempts);
  const of = (ctx: "pre-teste" | "pos-teste", id: string) => outcomes.find((o) => o.kind === ctx && o.taskId === id);
  const preS = summarize(outcomes.filter((o) => o.kind === "pre-teste"));
  const postS = summarize(outcomes.filter((o) => o.kind === "pos-teste"));
  const preDone = pre.every((t) => of("pre-teste", t.id));
  const r7 = retentionAt(state, 7);
  const r21 = retentionAt(state, 21);
  const totalHints = [...new Map(attempts.map((a) => [`${a.kind}|${a.taskId}`, a.hintsUsed])).values()].reduce((s, n) => s + n, 0);

  const exportData = () => {
    const blob = new Blob(
      [JSON.stringify({ exportedAt: new Date().toISOString(), profile, verifications: state.attempts, production: attempts, humanEvaluations: humans, cumulative: loadCumulative()?.versions.map((v) => ({ stage: v.stage, at: v.at, label: v.label })) ?? [] }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `academia-arranjo-vocal-dados-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const testTable = (ctx: "pre-teste" | "pos-teste", tasks: readonly TestItem[]) => (
    <div className="table-wrap">
      <table className="data">
        <caption className="sr-only">{ctx === "pre-teste" ? "Pré-teste" : "Pós-teste"}</caption>
        <thead>
          <tr>
            <th scope="col">Situação</th>
            <th scope="col">Resultado</th>
            <th scope="col">Conferências</th>
            <th scope="col">Tempo</th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => {
            const o = of(ctx, t.id);
            const kind = parseTransferId(t.id)!.kind;
            return (
              <tr key={t.id}>
                <th scope="row">{TRANSFER_KIND_PT[kind]}</th>
                <td>{!o ? <span className="muted">não iniciada</span> : o.solved ? ASSISTANCE_PT[o.assistance] : "não resolvida"}</td>
                <td>{o?.checks ?? "—"}</td>
                <td>{o?.minutes != null ? `${Math.round(o.minutes)} min` : "—"}</td>
                <td>
                  <Link className="btn btn-sm" href={`/estudio?tarefa=${encodeURIComponent(t.id)}&teste=${ctx === "pre-teste" ? "pre" : "pos"}`}>
                    {o ? "Abrir" : "Começar"}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 20 }}>
      {status && <p role="status">{status}</p>}
      <section className="card" aria-labelledby="perfil-ini">
        <h2 id="perfil-ini" style={{ marginTop: 0 }}>
          1. Perfil musical inicial
        </h2>
        {profile && !editing ? (
          <>
            <ul>
              {QUESTIONS.map(([k, q]) => (
                <li key={k}>
                  {q.label} <strong>{q.options[profile.answers[k]]}</strong>
                </li>
              ))}
            </ul>
            <p className="muted" style={{ fontSize: "0.88rem" }}>
              Respondido em {new Date(profile.at).toLocaleDateString("pt-BR")}.
            </p>
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => setEditing(true)}>
              Corrigir respostas
            </button>
          </>
        ) : (
          <ProfileForm
            initial={profile}
            onSaved={(m) => {
              setStatus(m);
              setEditing(false);
            }}
          />
        )}
      </section>

      <section className="card" aria-labelledby="pre">
        <h2 id="pre" style={{ marginTop: 0 }}>
          2. Pré-teste
        </h2>
        <p>Cinco situações de escrita, as mesmas para todos os alunos. Faça antes de estudar as aulas, sem consultar material. As dicas ficam disponíveis, mas o uso é registrado.</p>
        {testTable("pre-teste", pre)}
      </section>

      <section className="card" aria-labelledby="pos">
        <h2 id="pos" style={{ marginTop: 0 }}>
          3. Pós-teste
        </h2>
        <p>Cinco situações do mesmo tipo, com outras melodias. Faça ao fim do percurso (ou de um bloco de aulas).{!preDone && " Recomendado: conclua o pré-teste antes, para ter com o que comparar."}</p>
        {testTable("pos-teste", post)}
        {(preS.attempted > 0 || postS.attempted > 0) && (
          <div className="table-wrap" style={{ marginTop: 10 }}>
            <table className="data" data-testid="pre-pos">
              <caption>Comparação (só situações iniciadas)</caption>
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">Resolvidas</th>
                  <th scope="col">Sem ajuda</th>
                  <th scope="col">Domínio ponderado</th>
                  <th scope="col">Correções por acerto</th>
                  <th scope="col">Tempo mediano</th>
                </tr>
              </thead>
              <tbody>
                {([["Pré-teste", preS], ["Pós-teste", postS]] as const).map(([label, s]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>
                      {s.solved}/{s.attempted}
                    </td>
                    <td>{s.autonomous}</td>
                    <td>{s.weightedMastery === null ? "—" : `${Math.round(s.weightedMastery * 100)}%`}</td>
                    <td>{s.meanCorrections === null ? "—" : s.meanCorrections.toFixed(1)}</td>
                    <td>{s.medianMinutes === null ? "—" : `${Math.round(s.medianMinutes)} min`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card" aria-labelledby="ret">
        <h2 id="ret" style={{ marginTop: 0 }}>
          4. Retenção e processo
        </h2>
        <ul>
          {[r7, r21].map((r) => (
            <li key={r.days}>
              Retenção aos {r.days} dias:{" "}
              {r.eligible === 0 ? <span className="muted">nenhuma aula dominada há {r.days} dias ou mais</span> : `${r.tested} de ${r.eligible} aula(s) revisada(s) depois de ${r.days} dias; ${r.passed} aprovada(s)`}
            </li>
          ))}
          <li>Tarefas de escrita conferidas: {outcomes.length}; dicas abertas: {totalHints}; correções antes do acerto (média): {summarize(outcomes).meanCorrections?.toFixed(1) ?? "—"}.</li>
          <li>Avaliações humanas registradas: {humans.length}.</li>
        </ul>
        <p className="muted" style={{ fontSize: "0.88rem" }}>
          As revisões espaçadas aparecem no início e em cada aula quando vencem (1, 3, 7, 21 e 60 dias depois do domínio).
        </p>
      </section>

      <section className="card" aria-labelledby="exp">
        <h2 id="exp" style={{ marginTop: 0 }}>
          5. Seus dados
        </h2>
        <p>Baixe tudo o que foi registrado neste navegador (perfil, verificações, tarefas, avaliações humanas e versões do projeto) em JSON, para entregar a um professor ou pesquisador.</p>
        <button type="button" className="btn btn-sm" onClick={exportData}>
          Baixar meus dados (JSON)
        </button>
      </section>
    </div>
  );
}
