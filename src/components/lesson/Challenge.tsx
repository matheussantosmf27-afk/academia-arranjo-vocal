"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { ChallengeBlock } from "@/content/curriculum/types";
import { analyzeHarmony } from "@/domain/validation";
import { ScoreView } from "../notation/ScoreView";
import { VoicePlayer } from "../audio/VoicePlayer";
import { ExampleBlock } from "./ExampleBlock";
import styles from "./Lesson.module.css";

const NO_FLAGS = new Map<string, "erro" | "alerta" | "sugestao" | "info">();

/**
 * Exercício independente. As dicas abrem uma de cada vez, da mais geral à mais
 * específica; a solução comentada fica fechada até o aluno declarar que tentou.
 * Nada aqui conta para o domínio: é prática de produção, conferida pelos critérios.
 */
export function Challenge({ block }: { block: ChallengeBlock }) {
  const [hints, setHints] = useState(0);
  const [tried, setTried] = useState(false);
  const [open, setOpen] = useState(false);
  const [playhead, setPlayhead] = useState<number | null>(null);
  const harmony = useMemo(() => (block.start ? analyzeHarmony(block.start) : undefined), [block.start]);
  const id = useId();
  const total = block.hints.length;
  return (
    <section className={styles.challenge} aria-labelledby={`${id}-t`}>
      <div className={styles.challengeHead}>
        <span className={styles.badge} aria-hidden="true">✍</span>
        <div>
          <p className={styles.challengeKind}>Exercício independente</p>
          <h3 id={`${id}-t`}>{block.title}</h3>
        </div>
      </div>
      <p className={styles.challengeTask}>{block.task}</p>
      {block.start && (
        <figure className={styles.challengeStart}>
          <figcaption className="muted">Material de partida: {block.start.title}</figcaption>
          <ScoreView score={block.start} flagged={NO_FLAGS} {...(harmony ? { harmony } : {})} playhead={playhead} />
          <VoicePlayer score={block.start} onPosition={setPlayhead} compact />
          <Link className="btn btn-sm" href={`/estudio?exemplo=${block.start.id}`} style={{ alignSelf: "flex-start" }}>
            Abrir no laboratório de escrita
          </Link>
        </figure>
      )}
      <div className={styles.challengeCols}>
        <div>
          <h4>Restrições</h4>
          <ul>{block.constraints.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <div>
          <h4>Confira antes de abrir a solução</h4>
          <ul>{block.criteria.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
      </div>
      {total > 0 && (
        <div>
          <h4>Dicas ({hints} de {total} abertas)</h4>
          {hints > 0 && (
            <ol className={styles.hints}>
              {block.hints.slice(0, hints).map((h) => <li key={h}>{h}</li>)}
            </ol>
          )}
          {hints < total && (
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => setHints((n) => n + 1)}>
              {hints === 0 ? "Preciso de uma dica" : "Mais uma dica"}
            </button>
          )}
        </div>
      )}
      <div>
        {!open && (
          <>
            <label className={styles.tried}>
              <input type="checkbox" checked={tried} onChange={(e) => setTried(e.target.checked)} />
              Já escrevi a minha versão e conferi pelos critérios acima.
            </label>
            <button type="button" className="btn btn-sm" disabled={!tried} onClick={() => setOpen(true)} aria-disabled={!tried}>
              Mostrar a solução comentada
            </button>
            {!tried && <p className="muted" style={{ margin: "6px 0 0", fontSize: "0.88rem" }}>A solução fica disponível depois que você marcar que tentou.</p>}
          </>
        )}
        {open && (
          <div className={styles.solution}>
            <h4>Solução comentada</h4>
            {block.solution.score ? (
              <ExampleBlock score={block.solution.score} verdict="correto" caption={block.solution.score.title} commentary={block.solution.commentary} />
            ) : (
              <p>{block.solution.commentary}</p>
            )}
            {block.solution.alternatives && block.solution.alternatives.length > 0 && (
              <>
                <h4>Outras soluções válidas</h4>
                <ul>{block.solution.alternatives.map((a) => <li key={a}>{a}</li>)}</ul>
              </>
            )}
            <button type="button" className="btn btn-sm btn-ghost" onClick={() => setOpen(false)}>
              Ocultar a solução
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
