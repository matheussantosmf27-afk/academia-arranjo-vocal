"use client";

import { useMemo, useState } from "react";
import { type VoiceId, getFormation } from "@/domain/music/formations";
import type { Score } from "@/domain/music/score";
import { ScoreView } from "../notation/ScoreView";
import { VoicePlayer } from "../audio/VoicePlayer";
import { PianoRoll } from "../visual/PianoRoll";
import styles from "./Lesson.module.css";

export function ListeningBlock({ title, score, instructions, focus }: { title: string; score: Score; instructions: readonly string[]; focus?: readonly (readonly VoiceId[])[] }) {
  const [playhead, setPlayhead] = useState<number | null>(null);
  const all = useMemo(() => getFormation(score.formation).voices.map((v) => v.id), [score]);
  const [voices, setVoices] = useState<Set<VoiceId>>(() => new Set(all));
  const dimmed = useMemo(() => new Set(all.filter((v) => !voices.has(v))), [all, voices]);
  const [done, setDone] = useState<Set<number>>(new Set());
  return (
    <section className={styles.listening} aria-label={`Escuta: ${title}`}>
      <div className={styles.listeningHead}>
        <span className={styles.badge} aria-hidden="true">
          🎧
        </span>
        <h4>{title}</h4>
      </div>
      <ol className={styles.steps}>
        {instructions.map((i, k) => (
          <li key={i}>
            <label className={done.has(k) ? styles.stepDone : undefined}>
              <input
                type="checkbox"
                checked={done.has(k)}
                onChange={() => {
                  const next = new Set(done);
                  if (next.has(k)) next.delete(k);
                  else next.add(k);
                  setDone(next);
                }}
              />{" "}
              {i}
            </label>
          </li>
        ))}
      </ol>
      <VoicePlayer score={score} presets={focus ?? []} onPosition={setPlayhead} voices={voices} onVoicesChange={setVoices} />
      <PianoRoll score={score} playhead={playhead} voices={voices} />
      <ScoreView score={score} playhead={playhead} dimmedVoices={dimmed} />
    </section>
  );
}
