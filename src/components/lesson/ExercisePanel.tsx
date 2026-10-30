"use client";

import { useMemo, useState } from "react";
import { REVIEW_MIN_SCORE, REVIEW_SIZE, buildExerciseSet, buildReviewSet, checkAnswer, evaluateMastery, evaluateReview } from "@/domain/exercises/engine";
import { newSeed } from "@/domain/exercises/random";
import type { AnswerRecord, ExerciseItem, ExerciseSetSpec, MasteryResult } from "@/domain/exercises/types";
import { playPitches } from "@/lib/audio/player";
import { type Attempt, REVIEW_SUFFIX } from "@/lib/progress/model";
import { ScoreView } from "../notation/ScoreView";
import { StaffSnippet } from "../notation/StaffSnippet";
import { VoicePlayer } from "../audio/VoicePlayer";
import styles from "./Exercise.module.css";

type Phase = { kind: "idle" } | { kind: "running"; seed: number; items: ExerciseItem[]; index: number; answers: AnswerRecord[]; startedAt: string } | { kind: "done"; items: ExerciseItem[]; answers: AnswerRecord[]; result: MasteryResult };

export function ExercisePanel({
  spec,
  lessonId,
  onAttempt,
  locked = false,
  practice = false,
  review = false,
}: {
  spec: ExerciseSetSpec;
  lessonId: string;
  onAttempt?: (a: Attempt) => void | Promise<void>;
  locked?: boolean;
  practice?: boolean;
  /** Revisão espaçada: itens novos, gerados de novo, sem os itens fixos da verificação. */
  review?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [chosen, setChosen] = useState<string | null>(null);
  const [retry, setRetry] = useState<RetryState>(NO_RETRY);

  const start = () => {
    const seed = newSeed();
    setChosen(null);
    setRetry(NO_RETRY);
    setPhase({ kind: "running", seed, items: review ? buildReviewSet(spec, seed) : buildExerciseSet(spec, seed), index: 0, answers: [], startedAt: new Date().toISOString() });
  };

  if (phase.kind === "idle") {
    return (
      <div className={styles.panel}>
        <h3>{review ? "Revisão com itens novos" : spec.title}</h3>
        <p>{review ? `${REVIEW_SIZE} itens novos, sorteados agora (nenhum é repetição da verificação). Aprovação: ${Math.round(REVIEW_MIN_SCORE * 100)}%.` : spec.instructions}</p>
        {locked ? (
          <p className="notice">Os exercícios desta aula ficam disponíveis quando as aulas pré-requisito forem concluídas.</p>
        ) : (
          <button type="button" className="btn btn-accent" onClick={start}>
            Iniciar {practice ? "prática" : review ? "revisão" : "tentativa"}
          </button>
        )}
      </div>
    );
  }

  if (phase.kind === "done") {
    const wrong = phase.items.filter((i) => !phase.answers.find((a) => a.itemId === i.id)?.correct);
    const r = phase.result;
    return (
      <div className={styles.panel} aria-live="polite">
        <h3>Resultado</h3>
        <p className={styles.score}>
          {r.correct} de {r.total} ({Math.round(r.score * 100)}%) —{" "}
          {practice ? (
            <span>prática concluída</span>
          ) : review ? (
            r.passed ? (
              <span className="chip chip-ok">Retenção demonstrada</span>
            ) : (
              <span className="chip chip-alerta">Revisão não aprovada</span>
            )
          ) : r.passed ? (
            <span className="chip chip-ok">Domínio demonstrado</span>
          ) : (
            <span className="chip chip-alerta">Domínio ainda não demonstrado</span>
          )}
        </p>
        {review && (
          <p>
            {r.passed
              ? "Se a revisão estava no prazo, a próxima fica mais espaçada. Revisões feitas antes do prazo valem como prática."
              : "A aula continua concluída, mas volta para revisão amanhã. Releia os comentários dos erros abaixo."}
          </p>
        )}
        {!practice && !review && !r.passed && (
          <p>
            Critério: {Math.round(spec.minScore * 100)}% de acerto{spec.requiredItemIds?.length ? " e todos os itens essenciais" : ""}.{" "}
            {r.missingRequired.length > 0 && "Itens essenciais ainda não acertados aparecem na revisão abaixo. "}
            Revise os comentários e faça uma nova tentativa — os itens gerados mudam a cada tentativa.
          </p>
        )}
        <div className={styles.skills}>
          {Object.entries(r.bySkill).map(([skill, v]) => (
            <span key={skill} className="chip">
              {skill}: {v.correct}/{v.total}
            </span>
          ))}
        </div>
        {wrong.length > 0 && (
          <>
            <h4>Revisão dos erros</h4>
            <ol className={styles.review}>
              {wrong.map((item) => {
                const ans = phase.answers.find((a) => a.itemId === item.id);
                const chosenLabel = item.options.find((o) => o.id === ans?.chosenOptionId)?.label;
                const correctLabel = item.options.find((o) => o.id === item.correctOptionId)?.label;
                return (
                  <li key={item.id}>
                    <p>
                      <strong>{item.prompt}</strong>
                      {r.missingRequired.includes(item.id) && <span className="chip chip-erro"> essencial</span>}
                    </p>
                    <p>
                      Sua resposta: {chosenLabel} · Correta: <strong>{correctLabel}</strong>
                    </p>
                    <p className="muted">{item.explanation}</p>
                  </li>
                );
              })}
            </ol>
          </>
        )}
        <button type="button" className="btn btn-accent" onClick={start}>
          {review ? "Revisar de novo" : "Nova tentativa"}
        </button>
      </div>
    );
  }

  const item = phase.items[phase.index]!;
  const record = chosen !== null ? checkAnswer(item, chosen) : null;
  const done = record !== null && (record.correct || retry.revealed);

  const next = () => {
    if (!record) return;
    const answers = [...phase.answers, record];
    setChosen(null);
    setRetry(NO_RETRY);
    if (phase.index + 1 < phase.items.length) {
      setPhase({ ...phase, index: phase.index + 1, answers });
      return;
    }
    const result = review ? evaluateReview(phase.items, answers) : evaluateMastery(spec, phase.items, answers);
    if (!practice && onAttempt) {
      void onAttempt({
        id: `${lessonId}-${Date.now()}`,
        lessonId,
        exerciseSetId: review ? `${spec.id}${REVIEW_SUFFIX}` : spec.id,
        seed: phase.seed,
        startedAt: phase.startedAt,
        finishedAt: new Date().toISOString(),
        answers,
        result,
      });
    }
    setPhase({ kind: "done", items: phase.items, answers, result });
  };

  return (
    <div className={styles.panel}>
      <div className="row">
        <h3 style={{ margin: 0 }}>{review ? "Revisão com itens novos" : spec.title}</h3>
        <span className="spacer" />
        <span className="muted">
          Item {phase.index + 1} de {phase.items.length}
        </span>
      </div>
      <div className="progress-bar" aria-hidden="true" style={{ margin: "10px 0 16px" }}>
        <span style={{ width: `${(phase.index / phase.items.length) * 100}%` }} />
      </div>
      <AnswerFlow
        item={item}
        first={chosen}
        retry={retry}
        onFirst={(id) => chosen === null && setChosen(id)}
        onRetry={(id) => setRetry({ second: id, revealed: true })}
        onReveal={() => setRetry({ ...retry, revealed: true })}
      />
      <div className="row" style={{ marginTop: 12 }}>
        <span className="spacer" />
        <button type="button" className="btn btn-primary" onClick={next} disabled={!done}>
          {phase.index + 1 < phase.items.length ? "Próximo" : "Ver resultado"}
        </button>
      </div>
    </div>
  );
}

/** Segunda chance de um item: a nova escolha e se a resposta já foi revelada. */
export interface RetryState {
  readonly second: string | null;
  readonly revealed: boolean;
}
export const NO_RETRY: RetryState = { second: null, revealed: false };

/** Dica exibida depois de um erro, sem revelar a resposta. */
export function hintFor(item: ExerciseItem, chosen: string): string {
  return item.optionFeedback?.[chosen] ?? "Releia o enunciado e o que a aula diz sobre isso, e tente de novo.";
}

/**
 * Responder um item em duas etapas: depois de um erro, o aluno recebe uma dica (sem a
 * resposta) e pode tentar de novo ou pedir a resposta. Só a primeira escolha conta para a
 * nota; a segunda serve para corrigir o raciocínio antes de ver a explicação.
 */
export function AnswerFlow({
  item,
  first,
  retry,
  onFirst,
  onRetry,
  onReveal,
  scored = true,
}: {
  item: ExerciseItem;
  first: string | null;
  retry: RetryState;
  onFirst: (id: string) => void;
  onRetry: (id: string) => void;
  onReveal: () => void;
  scored?: boolean;
}) {
  const firstCorrect = first !== null && first === item.correctOptionId;
  const revealed = firstCorrect || retry.revealed;
  const waitingRetry = first !== null && !firstCorrect && !retry.revealed;
  const secondCorrect = retry.second !== null && retry.second === item.correctOptionId;
  return (
    <>
      <fieldset className={styles.item}>
        <legend className={styles.prompt}>{item.prompt}</legend>
        <ItemMedia item={item} answered={revealed} />
        <div className={styles.options} role="group" aria-label="Alternativas">
          {item.options.map((o) => {
            const isCorrect = o.id === item.correctOptionId;
            const pickedWrong = (o.id === first && !firstCorrect) || (o.id === retry.second && !secondCorrect);
            const state = revealed && isCorrect ? styles.correct : pickedWrong ? styles.wrong : "";
            const disabled = revealed ? !isCorrect && !pickedWrong : waitingRetry ? o.id === first : false;
            return (
              <button
                key={o.id}
                type="button"
                className={`${styles.option} ${state}`}
                aria-pressed={first === o.id || retry.second === o.id}
                disabled={disabled}
                onClick={() => (first === null ? onFirst(o.id) : waitingRetry ? onRetry(o.id) : undefined)}
              >
                {o.label}
                {revealed && isCorrect && <span className="sr-only"> (resposta correta)</span>}
                {pickedWrong && <span className="sr-only"> (sua escolha, incorreta)</span>}
              </button>
            );
          })}
        </div>
      </fieldset>
      {waitingRetry && (
        <div className={`${styles.feedback} ${styles.bad}`} role="status" aria-live="polite">
          <strong>Ainda não.</strong> {hintFor(item, first!)}{" "}
          {scored && <span className="muted">Pode tentar de novo: esta segunda escolha não muda a nota, mas ajuda a corrigir o raciocínio.</span>}
          <div className="row" style={{ marginTop: 8 }}>
            <button type="button" className="btn btn-sm" onClick={onReveal}>
              Mostrar a resposta
            </button>
          </div>
        </div>
      )}
      {revealed && first !== null && (
        <div className={`${styles.feedback} ${firstCorrect || secondCorrect ? styles.ok : styles.bad}`} role="status" aria-live="polite">
          <strong>{firstCorrect ? "Correto." : secondCorrect ? "Correto na segunda tentativa." : retry.second ? "Ainda não: veja a resposta destacada." : "Resposta destacada acima."}</strong>{" "}
          {!firstCorrect && retry.second && !secondCorrect ? `${hintFor(item, retry.second)} ` : ""}
          {item.explanation}
        </div>
      )}
    </>
  );
}

/** Áudio, pauta e partitura de um item; itens auditivos ocultam a notação até a resposta. */
export function ItemMedia({ item, answered }: { item: ExerciseItem; answered: boolean }) {
  const showNotation = !item.earOnly || answered;
  const audio = item.audio;
  const staff = useMemo(() => item.staff, [item]);
  if (!audio && !staff && !item.notation) return null;
  return (
    <div className={styles.media}>
      {audio && (
        <button type="button" className="btn btn-sm" onClick={() => void playPitches(audio.pitches, audio.mode)}>
          🔊 Ouvir
        </button>
      )}
      {showNotation && staff && <StaffSnippet clef={staff.clef} attacks={staff.attacks} label="Notas do exercício" />}
      {item.notation && !audio && <VoicePlayer score={item.notation} compact />}
      {showNotation && item.notation && <ScoreView score={item.notation} label="Trecho do exercício" />}
      {!showNotation && <span className="muted">Notação oculta até a resposta (exercício auditivo).</span>}
    </div>
  );
}
