"use client";

import { useEffect, useRef, useState } from "react";
import type { Score } from "@/domain/music/score";
import type { HarmonicLabel } from "@/domain/validation";
import { type OnsetPosition, loadVexFlow, renderScore } from "@/lib/notation/render";

export interface ScoreViewProps {
  readonly score: Score;
  readonly zoom?: number;
  readonly selectedEventId?: string | null;
  readonly rangeEventIds?: ReadonlySet<string>;
  readonly flagged?: ReadonlyMap<string, "erro" | "alerta" | "sugestao" | "info">;
  readonly harmony?: readonly HarmonicLabel[];
  readonly dimmedVoices?: ReadonlySet<string>;
  /** `extend` = Shift pressionado (estende a seleção). */
  readonly onSelectEvent?: (eventId: string, extend: boolean) => void;
  /** Posição de reprodução em ticks (null = sem cursor). */
  readonly playhead?: number | null;
  readonly label?: string;
}

/** Partitura renderizada a partir do modelo (VexFlow/SVG). Clique numa nota para selecioná-la. */
export function ScoreView({ score, zoom = 1, selectedEventId, rangeEventIds, flagged, harmony, dimmedVoices, onSelectEvent, playhead, label }: ScoreViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [onsets, setOnsets] = useState<readonly OnsetPosition[]>([]);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.floor(entries[0]?.contentRect.width ?? 0);
      setWidth((prev) => (Math.abs(prev - w) > 8 ? w : prev));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!ref.current || width === 0) return;
    let cancelled = false;
    loadVexFlow()
      .then((VF) => {
        if (cancelled || !ref.current) return;
        try {
          const result = renderScore(VF, ref.current, score, {
            width,
            zoom,
            selectedEventId: selectedEventId ?? null,
            ...(rangeEventIds ? { rangeEventIds } : {}),
            ...(flagged ? { flagged } : {}),
            ...(harmony ? { harmony } : {}),
            ...(dimmedVoices ? { dimmedVoices } : {}),
            showLyrics: true,
          });
          setOnsets(result.onsets);
          setStatus("ready");
          setError(null);
        } catch (e) {
          setStatus("error");
          setError(e instanceof Error ? e.message : String(e));
        }
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => {
      cancelled = true;
    };
  }, [score, width, zoom, selectedEventId, rangeEventIds, flagged, harmony, dimmedVoices]);

  const cursor = playhead == null ? null : ([...onsets].reverse().find((o) => o.onset <= playhead) ?? onsets[0]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTop = cursor?.top;
  // Ao mudar de sistema (linha), rola apenas o necessário para manter o cursor visível.
  useEffect(() => {
    if (cursorTop != null) cursorRef.current?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [cursorTop]);

  return (
    <div className="score-surface" aria-label={label ?? `Partitura: ${score.title}`}>
      {status === "loading" && <div className="score-loading">Carregando notação…</div>}
      {status === "error" && (
        <div className="score-loading" role="alert">
          Não foi possível desenhar a partitura{error ? `: ${error}` : ""}. Os dados continuam disponíveis na lista de eventos.
        </div>
      )}
      <div
        ref={ref}
        onClick={(e) => {
          if (!onSelectEvent) return;
          const target = (e.target as Element).closest('[id^="vf-"]');
          const id = target?.id.replace(/^vf-/, "");
          if (id && score.parts.some((p) => p.events.some((ev) => ev.id === id))) onSelectEvent(id, e.shiftKey);
        }}
      />
      {cursor && (
        <div ref={cursorRef} className="play-cursor" aria-hidden="true" style={{ left: cursor.x, top: cursor.top, height: cursor.bottom - cursor.top }} />
      )}
    </div>
  );
}
