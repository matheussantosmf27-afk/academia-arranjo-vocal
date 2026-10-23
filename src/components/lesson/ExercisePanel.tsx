"use client";

import { useMemo, useState } from "react";
import { buildExerciseSet, checkAnswer, evaluateMastery } from "@/domain/exercises/engine";
import { newSeed } from "@/domain/exercises/random";
import type { AnswerRecord, ExerciseItem, ExerciseSetSpec, MasteryResult } from "@/domain/exercises/types";
import { playPitches } from "@/lib/audio/player";
import type { Attempt } from "@/lib/progress/model";
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
}: {
  spec: ExerciseSetSpec;
  lessonId: string;
  onAttempt?: (a: Attempt) => void | Promise<void>;
  locked?: boolean;
  practice?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [chosen, setChosen] = useState<string | null>(null);

  const start = () => {
    const seed = newSeed();
    setChosen(null);
    setPhase({ kind: "running", seed, items: buildExerciseSet(spec, seed), index: 0, answers: [], startedAt: new Date().toISOString() });
  };

  if (phase.kind === "idle") {
    return (
      <div className={styles.panel}>
        <h3>{spec.title}</h3>
        <p>{spec.instructions}</p>
        {locked ? (
          <p className="notice">Os exercícios desta lição ficam disponíveis quando os pré-requisitos forem dominados.</p>
        ) : (
          <button type="button" className="btn btn-accent" onClick={start}>
            Iniciar {practice ? "prática" : "tentativa"}
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
          ) : r.passed ? (
            <span className="chip chip-ok">Domínio demonstrado</span>
          ) : (
            <span className="chip chip-alerta">Domínio ainda não demonstrado</span>
          )}
        </p>
        {!practice && !r.passed && (
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
          Nova tentativa
        </button>
      </div>
    );
  }

  const item = phase.items[phase.index]!;
  const answered = chosen !== null;
  const record = answered ? checkAnswer(item, chosen) : null;

  const next = () => {
    if (!record) return;
    const answers = [...phase.answers, record];
    setChosen(null);
    if (phase.index + 1 < phase.items.length) {
      setPhase({ ...phase, index: phase.index + 1, answers });
      return;
    }
    const result = evaluateMastery(spec, phase.items, answers);
    if (!practice && onAttempt) {
      void onAttempt({
        id: `${lessonId}-${Date.now()}`,
        lessonId,
        exerciseSetId: spec.id,
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
        <h3 style={{ margin: 0 }}>{spec.title}</h3>
        <span className="spacer" />
        <span className="muted">
          Item {phase.index + 1} de {phase.items.length}
        </span>
      </div>
      <div className="progress-bar" aria-hidden="true" style={{ margin: "10px 0 16px" }}>
        <span style={{ width: `${(phase.index / phase.items.length) * 100}%` }} />
      </div>
      <ItemView item={item} chosen={chosen} onChoose={(id) => !answered && setChosen(id)} />
      {record && (
        <div className={`${styles.feedback} ${record.correct ? styles.ok : styles.bad}`} role="status" aria-live="polite">
          <strong>{record.correct ? "Correto." : "Ainda não."}</strong> {!record.correct && item.optionFeedback?.[chosen!] ? `${item.optionFeedback[chosen!]} ` : ""}
          {item.explanation}
        </div>
      )}
      <div className="row" style={{ marginTop: 12 }}>
        <span className="spacer" />
        <button type="button" className="btn btn-primary" onClick={next} disabled={!answered}>
          {phase.index + 1 < phase.items.length ? "Próximo" : "Ver resultado"}
        </button>
      </div>
    </div>
  );
}

function ItemView({ item, chosen, onChoose }: { item: ExerciseItem; chosen: string | null; onChoose: (id: string) => void }) {
  const answered = chosen !== null;
  const showNotation = !item.earOnly || answered;
  const audio = item.audio;
  const staff = useMemo(() => item.staff, [item]);
  return (
    <fieldset className={styles.item}>
      <legend className={styles.prompt}>{item.prompt}</legend>
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
      <div className={styles.options}>
        {item.options.map((o) => {
          const state = !answered ? "" : o.id === item.correctOptionId ? styles.correct : o.id === chosen ? styles.wrong : "";
          return (
            <button key={o.id} type="button" className={`${styles.option} ${state}`} aria-pressed={chosen === o.id} disabled={answered && chosen !== o.id && o.id !== item.correctOptionId} onClick={() => onChoose(o.id)}>
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
