"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Score } from "@/domain/music/score";
import { ASSISTANCE_PT, type ProductionAttempt, type ProductionTask, type TaskResult, assistanceLevel, checkTask } from "@/domain/production/task";
import { TRANSFER_KIND_PT, parseTransferId } from "@/domain/production/transfer";
import { useAuth } from "@/lib/auth/useAuth";
import { type TaskSession, clearTaskSession, loadTaskSession, newSession, recordProductionAttempt, saveTaskSession } from "@/lib/production/store";
import { recordProductionAttemptRemote } from "@/app/actions/production";
import { DiagnosticList } from "../diagnostics/DiagnosticList";
import { ExampleBlock } from "../lesson/ExampleBlock";
import styles from "./ProjectPanel.module.css";

export type TaskContext = "producao" | "transferencia" | "pre-teste" | "pos-teste";

/** Chave da sessão: a mesma tarefa no pré-teste e na prática livre são sessões distintas. */
export const sessionKey = (task: ProductionTask, ctx: TaskContext) => (ctx === "pre-teste" || ctx === "pos-teste" ? `${ctx}:${task.id}` : task.id);

const uid = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);

/**
 * Modo tarefa do laboratório: enunciado, restrições, dicas progressivas, demonstração e
 * "Conferir". Cada conferência é registrada com a ajuda usada até ali; a solução de
 * referência só aparece depois da primeira conferência e, se aberta antes do acerto,
 * o acerto deixa de contar como autônomo.
 */
export function TaskPanel({ task, context, score, onLoad, onStatus, onFocusEvents }: {
  task: ProductionTask;
  context: TaskContext;
  score: Score;
  onLoad: (s: Score, message: string) => void;
  onStatus: (m: string) => void;
  onFocusEvents?: (eventIds: readonly string[]) => void;
}) {
  const key = sessionKey(task, context);
  const { user } = useAuth();
  const [session, setSession] = useState<TaskSession>(() => (typeof window === "undefined" ? newSession() : (loadTaskSession(key) ?? newSession())));
  const [result, setResult] = useState<TaskResult | null>(null);
  const [checking, setChecking] = useState(false);
  const [showSolution, setShowSolution] = useState(session.log.solutionOpened);
  const resultRef = useRef<HTMLDivElement>(null);
  const transfer = parseTransferId(task.id);
  const isTest = context === "pre-teste" || context === "pos-teste";

  // Ajuda aberta e conferências são gravadas na hora (recarregar a página não apaga o registro de ajuda);
  // a partitura, com um pequeno atraso enquanto o aluno edita.
  const scoreRef = useRef(score);
  useEffect(() => {
    saveTaskSession(key, { ...session, score: scoreRef.current });
  }, [key, session]);
  useEffect(() => {
    scoreRef.current = score;
    const t = setTimeout(() => saveTaskSession(key, { ...session, score }), 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- a sessão já é gravada pelo efeito acima
  }, [key, score]);

  const update = (fn: (s: TaskSession) => TaskSession) => setSession((s) => fn(s));
  const level = assistanceLevel(session.log);
  const hintsShown = session.log.hintsOpened;

  const conferir = async () => {
    setChecking(true);
    const r = checkTask(task, score);
    setResult(r);
    const failedChecks = r.checks.filter((c) => !c.ok).map((c) => c.id);
    const attempt: ProductionAttempt = {
      id: uid(),
      taskId: task.id,
      kind: context,
      ...(task.lessonId ? { lessonId: task.lessonId } : {}),
      competency: task.competency,
      ...(task.seed !== undefined ? { seed: task.seed } : {}),
      startedAt: session.startedAt,
      finishedAt: new Date().toISOString(),
      passed: r.passed,
      assistance: level,
      hintsUsed: hintsShown,
      corrections: session.failed,
      failedChecks,
      ruleIds: [...new Set(r.serious.map((d) => d.ruleId))].slice(0, 60),
    };
    // Uma vez resolvida, novas conferências não geram novas evidências (evita inflar o histórico).
    if (!session.solvedAt) recordProductionAttempt(attempt);
    const next: TaskSession = { ...session, checked: session.checked + 1, failed: session.failed + (r.passed ? 0 : 1), solvedAt: session.solvedAt ?? (r.passed ? attempt.finishedAt : null) };
    setSession(next);
    if (user && !session.solvedAt) {
      const remote = await recordProductionAttemptRemote({ attemptId: attempt.id, taskId: task.id, context, score, log: session.log, startedAt: session.startedAt, corrections: session.failed });
      if (!remote.ok) onStatus(`Conferência registrada neste navegador; a conta não recebeu: ${remote.error}`);
    }
    setChecking(false);
    onStatus(r.passed ? `Tarefa resolvida (${ASSISTANCE_PT[level].toLowerCase()}).` : `${failedChecks.length} critério(s) ainda não atendido(s). Corrija e confira de novo.`);
    requestAnimationFrame(() => resultRef.current?.focus());
  };

  const restart = () => {
    if (!window.confirm("Recomeçar a tarefa? A partitura volta ao material de partida. As conferências já registradas continuam no seu histórico.")) return;
    clearTaskSession(key);
    const fresh = newSession();
    setSession(fresh);
    setResult(null);
    setShowSolution(false);
    onLoad(task.start, "Tarefa recomeçada a partir do material de partida.");
  };

  const openSolution = () => {
    if (!session.solvedAt && !window.confirm("Ver a solução antes de resolver: a tarefa continua aberta, mas um acerto depois disso conta como \"com solução\" (não como domínio autônomo). Continuar?")) return;
    if (!session.solvedAt) update((s) => ({ ...s, log: { ...s.log, solutionOpened: true } }));
    setShowSolution(true);
  };

  const sorted = useMemo(() => result?.serious ?? [], [result]);

  return (
    <section className={styles.panel} aria-labelledby="tarefa-titulo" data-testid="task-panel">
      <div className={styles.head}>
        <div>
          <p className="eyebrow" style={{ margin: 0 }}>
            {context === "pre-teste" ? "Pré-teste" : context === "pos-teste" ? "Pós-teste" : transfer ? "Avaliação de transferência" : "Tarefa de produção"} · correção automática
          </p>
          <h2 id="tarefa-titulo" className={styles.title}>
            {transfer ? TRANSFER_KIND_PT[transfer.kind] : task.title}
          </h2>
        </div>
        <div className={styles.inline}>
          {session.solvedAt ? <span className="chip chip-ok">Resolvida · {ASSISTANCE_PT[level].toLowerCase()}</span> : <span className="chip">Em andamento · {session.checked} conferência(s)</span>}
        </div>
      </div>
      <p style={{ margin: 0 }}>{task.prompt}</p>
      <details className={styles.block} open>
        <summary>Restrições conferidas</summary>
        <ul>{task.constraints.map((c) => <li key={c}>{c}</li>)}</ul>
      </details>
      {task.reference && (
        <details className={styles.block}>
          <summary>{task.reference.label} (consulta)</summary>
          <ExampleBlock score={task.reference.score} verdict="observacao" caption={task.reference.label} commentary="Material de consulta para a adaptação." />
        </details>
      )}

      <div className={styles.block}>
        <strong>Ajuda</strong>{" "}
        <span className="muted" style={{ fontSize: "0.88rem" }}>
          (registrada: {ASSISTANCE_PT[level]})
        </span>
        {hintsShown > 0 && (
          <ol>
            {task.hints.slice(0, hintsShown).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ol>
        )}
        <div className={styles.inline} style={{ flexWrap: "wrap", marginTop: 6 }}>
          {hintsShown < task.hints.length && (
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => update((s) => ({ ...s, log: { ...s.log, hintsOpened: s.log.hintsOpened + 1 } }))}>
              {hintsShown === 0 ? "Preciso de uma dica" : `Mais uma dica (${hintsShown + 1} de ${task.hints.length})`}
            </button>
          )}
          {task.demo && (
            <Link className="btn btn-sm btn-ghost" href={task.demo.href} target="_blank" onClick={() => !session.solvedAt && update((s) => ({ ...s, log: { ...s.log, demoOpened: true } }))}>
              {task.demo.label} (abre em nova aba)
            </Link>
          )}
        </div>
      </div>

      <div className={styles.inline} style={{ flexWrap: "wrap" }}>
        <button type="button" className="btn btn-accent" onClick={() => void conferir()} disabled={checking} aria-busy={checking}>
          {checking ? "Conferindo…" : session.checked ? "Conferir de novo" : "Conferir"}
        </button>
        <button type="button" className="btn btn-sm btn-ghost" onClick={restart}>
          Recomeçar
        </button>
        {task.solution && session.checked > 0 && !showSolution && (
          <button type="button" className="btn btn-sm btn-ghost" onClick={openSolution}>
            Ver solução de referência
          </button>
        )}
        {task.solution && session.checked === 0 && <span className="muted" style={{ fontSize: "0.88rem" }}>A solução de referência fica disponível depois da primeira conferência.</span>}
      </div>

      {result && (
        <div ref={resultRef} tabIndex={-1} className={styles.rubric} aria-live="polite" data-testid="task-result">
          <h3>{result.passed ? "Todos os critérios atendidos" : "Ainda não: veja o que falta"}</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {result.checks.map((c) => (
              <li key={c.id} className={styles.check}>
                <span className={`chip ${c.ok ? "chip-ok" : "chip-erro"}`}>{c.ok ? "ok" : "falta"}</span>
                <span>
                  <strong>{c.label}.</strong> {c.detail}
                </span>
              </li>
            ))}
          </ul>
          {sorted.length > 0 && (
            <>
              <p className="muted" style={{ fontSize: "0.88rem", margin: "8px 0 4px" }}>
                Pontos que impedem a aprovação neste estilo (clique para destacar na partitura):
              </p>
              <DiagnosticList diagnostics={sorted} onFocus={(d) => onFocusEvents?.(d.location.eventIds)} />
            </>
          )}
          {result.passed && (
            <p style={{ margin: "8px 0 0" }}>
              O motor confere só o que é verificável. Antes de dar por terminado, ouça cada voz sozinha e cante as linhas internas: cantabilidade e expressão ficam com você{isTest ? "" : " e com o seu professor"}.
            </p>
          )}
        </div>
      )}

      {showSolution && task.solution && (
        <div className={styles.rubric}>
          <h3>Solução de referência</h3>
          {task.solution.score ? (
            <ExampleBlock score={task.solution.score} verdict="correto" caption={task.solution.score.title} commentary={task.solution.commentary} />
          ) : (
            <p>{task.solution.commentary}</p>
          )}
          <p className="muted" style={{ fontSize: "0.88rem" }}>
            Compare com a sua versão: diferenças não são erros se a sua passa nos critérios. Há muitas soluções corretas.
          </p>
        </div>
      )}
    </section>
  );
}
