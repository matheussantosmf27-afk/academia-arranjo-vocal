"use client";

import { useMemo, useState } from "react";
import type { Score } from "@/domain/music/score";
import { analyzeHarmony, validateScore } from "@/domain/validation";
import { DiagnosticList } from "../diagnostics/DiagnosticList";
import { ScoreView } from "../notation/ScoreView";
import { VoicePlayer } from "../audio/VoicePlayer";
import { PianoRoll } from "../visual/PianoRoll";
import styles from "./Lesson.module.css";

const VERDICT = {
  correto: { label: "Exemplo correto", cls: "chip-ok" },
  incorreto: { label: "Exemplo com problema", cls: "chip-erro" },
  observacao: { label: "Para observar", cls: "chip-alerta" },
} as const;

export function ExampleBlock({ score, verdict, caption, commentary }: { score: Score; verdict: keyof typeof VERDICT; caption: string; commentary: string }) {
  const report = useMemo(() => validateScore(score), [score]);
  const harmony = useMemo(() => analyzeHarmony(score), [score]);
  const flagged = useMemo(() => {
    const m = new Map<string, "erro" | "alerta" | "sugestao" | "info">();
    for (const d of report.diagnostics) for (const id of d.location.eventIds) if (!m.has(id)) m.set(id, d.severity);
    return m;
  }, [report]);
  const [playhead, setPlayhead] = useState<number | null>(null);
  const [showDiag, setShowDiag] = useState(verdict !== "correto");
  const [showRoll, setShowRoll] = useState(false);
  return (
    <figure className={styles.example}>
      <figcaption className={styles.exampleHead}>
        <span className={`chip ${VERDICT[verdict].cls}`}>{VERDICT[verdict].label}</span>
        <span className={`chip ${score.formation === "SATB" ? "chip-satb" : "chip-ttbb"}`}>{score.formation}</span>
        <strong>{caption}</strong>
      </figcaption>
      <ScoreView score={score} flagged={flagged} harmony={harmony} playhead={playhead} />
      <VoicePlayer score={score} onPosition={setPlayhead} compact />
      <button type="button" className={`btn btn-sm btn-ghost ${styles.rollToggle}`} onClick={() => setShowRoll((v) => !v)} aria-expanded={showRoll}>
        {showRoll ? "Ocultar" : "Ver"} rolo de piano (vozes em cores)
      </button>
      {showRoll && <PianoRoll score={score} playhead={playhead} />}
      <p className={styles.commentary}>{commentary}</p>
      <button type="button" className="btn btn-sm" onClick={() => setShowDiag((v) => !v)} aria-expanded={showDiag}>
        {showDiag ? "Ocultar" : "Ver"} diagnósticos do motor ({report.diagnostics.length})
      </button>
      {showDiag && (
        <div style={{ marginTop: 8 }}>
          <DiagnosticList diagnostics={report.diagnostics} />
        </div>
      )}
    </figure>
  );
}
