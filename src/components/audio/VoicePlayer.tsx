"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { type VoiceId, getFormation } from "@/domain/music/formations";
import type { Score } from "@/domain/music/score";
import { ScorePlayer, isAudioSupported } from "@/lib/audio/player";

export const SYNTH_NOTICE =
  "Áudio sintetizado no navegador (timbre neutro, sem vogais nem vibrato): útil para conferir alturas, ritmo e condução — não representa o timbre de um coro real.";

/**
 * Controles de reprodução com seleção de vozes: completo, voz isolada, pares ou qualquer combinação.
 * `onPosition` permite sincronizar um cursor na partitura.
 */
export function VoicePlayer({
  score,
  presets,
  onPosition,
  voices: controlledVoices,
  onVoicesChange,
  compact = false,
}: {
  score: Score;
  presets?: readonly (readonly VoiceId[])[];
  onPosition?: (ticks: number | null) => void;
  voices?: ReadonlySet<VoiceId>;
  onVoicesChange?: (v: Set<VoiceId>) => void;
  compact?: boolean;
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
  const [playedScore, setPlayedScore] = useState(score);

  // A partitura mudou: volta ao estado parado (o áudio é interrompido no efeito abaixo).
  if (playedScore !== score) {
    setPlayedScore(score);
    setState("parado");
  }

  useEffect(() => () => player.current?.stop(), []);

  useEffect(() => {
    player.current?.stop();
    resumeAt.current = 0;
    onPosition?.(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  const start = async (from: number, vs: ReadonlySet<VoiceId> = voices) => {
    if (vs.size === 0) return;
    player.current ??= new ScorePlayer();
    await player.current.play(score, vs, from, {
      onPosition: (t) => onPosition?.(t),
      onEnd: () => {
        setState("parado");
        resumeAt.current = 0;
        onPosition?.(null);
      },
    });
    setState("tocando");
  };

  const pause = () => {
    if (!player.current) return;
    resumeAt.current = player.current.pause();
    setState("pausado");
  };

  const restart = () => {
    player.current?.stop();
    resumeAt.current = 0;
    void start(0);
  };

  const toggle = (id: VoiceId) => {
    const next = new Set(voices);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setVoices(next);
    if (state === "tocando" && player.current) {
      const pos = player.current.pause();
      void start(pos, next);
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
          <button type="button" className="btn btn-primary btn-sm" onClick={() => void start(state === "pausado" ? resumeAt.current : 0)} disabled={voices.size === 0}>
            ▶ {state === "pausado" ? "Continuar" : "Tocar"}
          </button>
        )}
        <button type="button" className="btn btn-sm" onClick={restart} disabled={voices.size === 0}>
          ⟲ Reiniciar
        </button>
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
              void start(0, next);
            }}
          >
            ▶ {p.length === all.length ? "Todas" : p.map((id) => formation.voices.find((v) => v.id === id)?.shortName).join(" + ")}
          </button>
        ))}
      </div>
      {!compact && <small>{SYNTH_NOTICE}</small>}
    </div>
  );
}
