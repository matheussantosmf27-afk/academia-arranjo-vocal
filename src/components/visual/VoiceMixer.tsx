"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { measureTicks } from "@/domain/music/duration";
import { type VoiceId, getFormation } from "@/domain/music/formations";
import type { Score } from "@/domain/music/score";
import { ScorePlayer, isAudioSupported } from "@/lib/audio/player";
import { VOICE_UI_COLOR } from "@/lib/voice-colors";
import { PianoRoll } from "./PianoRoll";
import styles from "./VoiceMixer.module.css";

const ROLE: Partial<Record<VoiceId, string>> = {
  S: "a melodia",
  A: "o recheio de cima",
  T: "o recheio de baixo",
  B: "o chão harmônico",
};

/**
 * Mesa de vozes: liga e desliga cada naipe enquanto o coral toca em loop,
 * com o rolo de piano mostrando o que cada voz faz. É a forma mais rápida de
 * entender o que é um arranjo: camadas que se somam.
 */
export function VoiceMixer({ score }: { score: Score }) {
  const formation = getFormation(score.formation);
  const all = formation.voices.map((v) => v.id);
  const [voices, setVoices] = useState<Set<VoiceId>>(() => new Set(all));
  const [playing, setPlaying] = useState(false);
  const [playhead, setPlayhead] = useState<number | null>(null);
  const player = useRef<ScorePlayer | null>(null);
  const supported = useSyncExternalStore(
    () => () => {},
    isAudioSupported,
    () => true,
  );
  const total = score.measureCount * measureTicks(score.timeSignature);

  useEffect(() => () => player.current?.stop(), []);

  const play = async (vs: ReadonlySet<VoiceId>, from = 0) => {
    if (vs.size === 0) {
      player.current?.stop();
      setPlaying(false);
      setPlayhead(null);
      return;
    }
    player.current ??= new ScorePlayer();
    await player.current.play(score, { voices: vs, from, to: total, timbre: "u", loop: true }, { onPosition: setPlayhead, onEnd: () => setPlaying(false) });
    setPlaying(true);
  };

  const toggle = (id: VoiceId) => {
    const next = new Set(voices);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setVoices(next);
    if (playing && player.current) {
      const pos = player.current.pause();
      void play(next, pos);
    }
  };

  return (
    <div className={styles.mixer}>
      <div className={styles.channels} role="group" aria-label="Vozes do coral">
        {formation.voices.map((v) => {
          const on = voices.has(v.id);
          return (
            <button
              key={v.id}
              type="button"
              className={`${styles.channel} ${on ? styles.on : ""}`}
              style={{ ["--c" as string]: VOICE_UI_COLOR[v.id] }}
              aria-pressed={on}
              onClick={() => toggle(v.id)}
            >
              <span className={`${styles.meter} ${playing && on ? styles.live : ""}`} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className={styles.name}>{v.name}</span>
              <span className={styles.role}>{ROLE[v.id] ?? v.shortName}</span>
            </button>
          );
        })}
      </div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        {supported ? (
          <button
            type="button"
            className="btn btn-accent"
            onClick={() => {
              if (playing) {
                player.current?.stop();
                setPlaying(false);
                setPlayhead(null);
              } else void play(voices);
            }}
          >
            {playing ? "■ Parar o coral" : "▶ Ouvir o coral"}
          </button>
        ) : (
          <span className="muted">Este navegador não reproduz áudio.</span>
        )}
        <span className="muted" style={{ fontSize: "0.85rem" }}>
          Toque nas vozes para ligá-las e desligá-las durante a música.
        </span>
      </div>
      <PianoRoll score={score} playhead={playhead} voices={voices} />
    </div>
  );
}
