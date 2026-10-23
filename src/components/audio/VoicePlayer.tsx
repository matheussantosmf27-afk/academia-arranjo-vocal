"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { measureTicks } from "@/domain/music/duration";
import { type VoiceId, getFormation } from "@/domain/music/formations";
import type { Score } from "@/domain/music/score";
import { ScorePlayer, TIMBRE_PT, type Timbre, isAudioSupported } from "@/lib/audio/player";
import styles from "./VoicePlayer.module.css";

export const SYNTH_NOTICE =
  "Áudio sintetizado no navegador: os timbres de vogal sugerem uma voz, mas não imitam cantores reais (sem vibrato, consoantes nem afinação expressiva). Serve para conferir alturas, ritmo, condução e equilíbrio aproximado.";

/**
 * Controles de reprodução com seleção de vozes (completo, voz isolada, pares ou qualquer combinação),
 * opções de estudo (metrônomo, contagem, timbre, trecho em loop) e cursor sincronizado via `onPosition`.
 */
export function VoicePlayer({
  score,
  presets,
  onPosition,
  voices: controlledVoices,
  onVoicesChange,
  compact = false,
  startTick,
}: {
  score: Score;
  presets?: readonly (readonly VoiceId[])[];
  onPosition?: (ticks: number | null) => void;
  voices?: ReadonlySet<VoiceId>;
  onVoicesChange?: (v: Set<VoiceId>) => void;
  compact?: boolean;
  /** Posição da nota selecionada (habilita "Tocar da seleção"). */
  startTick?: number | null;
}) {
  const formation = getFormation(score.formation);
  const all = formation.voices.map((v) => v.id);
  const [localVoices, setLocalVoices] = useState<Set<VoiceId>>(() => new Set(all));
  const voices = controlledVoices ?? localVoices;
  const setVoices = (v: Set<VoiceId>) => (onVoicesChange ? onVoicesChange(v) : setLocalVoices(v));
  const player = useRef<ScorePlayer | null>(null);
  const [state, setState] = useState<"parado" | "tocando" | "pausado">("parado");
  const resumeAt = useRef(0);
  const supported = useSyncExternalStore(
    () => () => {},
    isAudioSupported,
    () => true,
  );
  const [metronome, setMetronome] = useState(false);
  const [countIn, setCountIn] = useState(false);
  const [timbre, setTimbre] = useState<Timbre>("neutro");
  const [loopOn, setLoopOn] = useState(false);
  const [loopFrom, setLoopFrom] = useState(1);
  const [loopTo, setLoopTo] = useState(Math.min(2, score.measureCount));
  const [playedScore, setPlayedScore] = useState(score);

  // A partitura mudou: volta ao estado parado (o áudio é interrompido no efeito abaixo).
  if (playedScore !== score) {
    setPlayedScore(score);
    setState("parado");
    if (loopTo > score.measureCount) setLoopTo(score.measureCount);
    if (loopFrom > score.measureCount) setLoopFrom(1);
  }

  useEffect(() => () => player.current?.stop(), []);

  useEffect(() => {
    player.current?.stop();
    resumeAt.current = 0;
    onPosition?.(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  const mt = measureTicks(score.timeSignature);
  const range = loopOn ? { from: (Math.min(loopFrom, loopTo) - 1) * mt, to: Math.max(loopFrom, loopTo) * mt } : { from: 0, to: score.measureCount * mt };

  const start = async (from: number, vs: ReadonlySet<VoiceId> = voices, withCountIn = countIn) => {
    if (vs.size === 0) return;
    player.current ??= new ScorePlayer();
    const begin = Math.max(range.from, Math.min(from, range.to - 1));
    await player.current.play(
      score,
      { voices: vs, from: begin, to: range.to, metronome, countIn: withCountIn, timbre, loop: loopOn },
      {
        onPosition: (t) => onPosition?.(t),
        onEnd: () => {
          setState("parado");
          resumeAt.current = 0;
          onPosition?.(null);
        },
      },
    );
    setState("tocando");
  };

  const pause = () => {
    if (!player.current) return;
    resumeAt.current = player.current.pause();
    setState("pausado");
  };

  const stop = () => {
    player.current?.stop();
    resumeAt.current = 0;
    setState("parado");
    onPosition?.(null);
  };

  const restart = () => {
    player.current?.stop();
    resumeAt.current = 0;
    void start(range.from);
  };

  const toggle = (id: VoiceId) => {
    const next = new Set(voices);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setVoices(next);
    if (state === "tocando" && player.current) {
      const pos = player.current.pause();
      void start(pos, next, false);
    }
  };

  if (!supported) return <p className="notice">Este navegador não oferece Web Audio; a reprodução está indisponível.</p>;

  return (
    <div className="stack" style={{ gap: 8 }}>
      <div className="row" role="group" aria-label="Controles de reprodução">
        {state === "tocando" ? (
          <button type="button" className="btn btn-primary btn-sm" onClick={pause}>
            ❚❚ Pausar
          </button>
        ) : (
          <button type="button" className="btn btn-primary btn-sm" onClick={() => void start(state === "pausado" ? resumeAt.current : range.from)} disabled={voices.size === 0}>
            ▶ {state === "pausado" ? "Continuar" : "Tocar"}
          </button>
        )}
        <button type="button" className="btn btn-sm" onClick={stop} disabled={state === "parado"}>
          ■ Parar
        </button>
        <button type="button" className="btn btn-sm" onClick={restart} disabled={voices.size === 0}>
          ⟲ Reiniciar
        </button>
        {startTick != null && (
          <button type="button" className="btn btn-sm" onClick={() => void start(startTick)} disabled={voices.size === 0}>
            ▶ Da seleção
          </button>
        )}
        <span className="muted" style={{ fontSize: "0.85rem" }}>
          ♩ = {score.tempoBpm}
        </span>
      </div>
      <div className="row" role="group" aria-label="Vozes na reprodução">
        {formation.voices.map((v) => (
          <button key={v.id} type="button" className="btn btn-sm" aria-pressed={voices.has(v.id)} onClick={() => toggle(v.id)} title={`Incluir/excluir ${v.name}`}>
            {v.shortName}
          </button>
        ))}
        {presets?.map((p) => (
          <button
            key={p.join("-")}
            type="button"
            className="btn btn-sm btn-ghost"
            onClick={() => {
              const next = new Set(p);
              setVoices(next);
              player.current?.stop();
              resumeAt.current = 0;
              void start(range.from, next);
            }}
          >
            ▶ {p.length === all.length ? "Todas" : p.map((id) => formation.voices.find((v) => v.id === id)?.shortName).join(" + ")}
          </button>
        ))}
      </div>
      {!compact && (
        <details className={styles.options}>
          <summary>Opções de estudo</summary>
          <div className="row">
            <label className={styles.opt}>
              <input type="checkbox" checked={metronome} onChange={(e) => setMetronome(e.target.checked)} /> Metrônomo
            </label>
            <label className={styles.opt}>
              <input type="checkbox" checked={countIn} onChange={(e) => setCountIn(e.target.checked)} /> Compasso de contagem
            </label>
            <label className={styles.opt}>
              Timbre
              <select value={timbre} onChange={(e) => setTimbre(e.target.value as Timbre)}>
                {(Object.keys(TIMBRE_PT) as Timbre[]).map((t) => (
                  <option key={t} value={t}>
                    {TIMBRE_PT[t]}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.opt}>
              <input type="checkbox" checked={loopOn} onChange={(e) => setLoopOn(e.target.checked)} /> Repetir trecho: compassos
            </label>
            <input type="number" min={1} max={score.measureCount} value={loopFrom} onChange={(e) => setLoopFrom(Math.max(1, Math.min(score.measureCount, Number(e.target.value) || 1)))} aria-label="Primeiro compasso do trecho" className={styles.num} />
            <span>a</span>
            <input type="number" min={1} max={score.measureCount} value={loopTo} onChange={(e) => setLoopTo(Math.max(1, Math.min(score.measureCount, Number(e.target.value) || 1)))} aria-label="Último compasso do trecho" className={styles.num} />
          </div>
          <small>As opções valem a partir do próximo “Tocar”.</small>
        </details>
      )}
      {!compact && <small>{SYNTH_NOTICE}</small>}
    </div>
  );
}
