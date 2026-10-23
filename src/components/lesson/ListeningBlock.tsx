"use client";

import { useState } from "react";
import type { VoiceId } from "@/domain/music/formations";
import type { Score } from "@/domain/music/score";
import { ScoreView } from "../notation/ScoreView";
import { VoicePlayer } from "../audio/VoicePlayer";
import styles from "./Lesson.module.css";

export function ListeningBlock({ title, score, instructions, focus }: { title: string; score: Score; instructions: readonly string[]; focus?: readonly (readonly VoiceId[])[] }) {
  const [playhead, setPlayhead] = useState<number | null>(null);
  return (
    <section className={styles.listening} aria-label={`Escuta: ${title}`}>
      <h4>🎧 {title}</h4>
      <ol>
        {instructions.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ol>
      <VoicePlayer score={score} presets={focus ?? []} onPosition={setPlayhead} />
      <ScoreView score={score} playhead={playhead} />
    </section>
  );
}
