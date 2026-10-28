"use client";

import { useMemo } from "react";
import { durationTicks, measureTicks } from "@/domain/music/duration";
import { type VoiceId, getFormation } from "@/domain/music/formations";
import { formatPitchPt, toMidi } from "@/domain/music/pitch";
import { type Score, voiceTimeline } from "@/domain/music/score";
import { VOICE_UI_COLOR } from "@/lib/voice-colors";
import styles from "./PianoRoll.module.css";

interface Bar {
  readonly voice: VoiceId;
  readonly onset: number;
  readonly end: number;
  readonly midi: number;
  readonly label: string;
}

/**
 * Rolo de piano: cada nota é uma barra na cor da sua voz (altura × tempo).
 * Mostra de relance o desenho de cada linha, cruzamentos, distâncias e
 * movimento contrário; durante a reprodução, as notas que soam acendem.
 */
export function PianoRoll({ score, playhead, voices }: { score: Score; playhead?: number | null; voices?: ReadonlySet<VoiceId> }) {
  const formation = getFormation(score.formation);
  const mt = measureTicks(score.timeSignature);
  const total = score.measureCount * mt;
  const bars = useMemo<Bar[]>(() => {
    const out: Bar[] = [];
    for (const part of score.parts) {
      const tl = voiceTimeline(part, score.timeSignature);
      for (let i = 0; i < tl.length; i++) {
        const t = tl[i]!;
        const e = t.event;
        if (e.kind !== "note") continue;
        const prev = out[out.length - 1];
        const tiedFromPrev = i > 0 && tl[i - 1]!.event.kind === "note" && (tl[i - 1]!.event as { tieToNext?: boolean }).tieToNext;
        const end = t.onset + durationTicks(e.duration);
        if (tiedFromPrev && prev && prev.voice === part.voice) {
          out[out.length - 1] = { ...prev, end };
          continue;
        }
        out.push({ voice: part.voice, onset: t.onset, end, midi: toMidi(e.pitch), label: formatPitchPt(e.pitch) });
      }
    }
    return out;
  }, [score]);

  if (bars.length === 0) return null;
  const lo = Math.min(...bars.map((b) => b.midi)) - 2;
  const hi = Math.max(...bars.map((b) => b.midi)) + 2;
  const W = 1000;
  const rowH = Math.max(6, Math.min(14, 220 / (hi - lo + 1)));
  const H = (hi - lo + 1) * rowH;
  const x = (t: number) => (t / total) * W;
  const y = (m: number) => (hi - m) * rowH;
  const active = (v: VoiceId) => !voices || voices.has(v);

  return (
    <figure className={styles.roll}>
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label={`Rolo de piano de ${score.title}: cada voz em uma cor`} className={styles.svg} style={{ height: Math.min(260, Math.max(120, H)) }}>
        {Array.from({ length: hi - lo + 1 }, (_, i) => hi - i)
          .filter((m) => [1, 3, 6, 8, 10].includes(((m % 12) + 12) % 12))
          .map((m) => (
            <rect key={m} x={0} y={y(m)} width={W} height={rowH} className={styles.blackKey} />
          ))}
        {Array.from({ length: score.measureCount + 1 }, (_, i) => (
          <line key={i} x1={x(i * mt)} x2={x(i * mt)} y1={0} y2={H} className={styles.measure} vectorEffect="non-scaling-stroke" />
        ))}
        {bars.map((b, i) => {
          const on = playhead != null && b.onset <= playhead && playhead < b.end && active(b.voice);
          return (
            <rect
              key={i}
              x={x(b.onset) + 1}
              y={y(b.midi) + 1}
              width={Math.max(2, x(b.end) - x(b.onset) - 2)}
              height={rowH - 2}
              rx={Math.min(4, rowH / 2)}
              fill={VOICE_UI_COLOR[b.voice]}
              className={`${styles.note} ${on ? styles.on : ""}`}
              opacity={active(b.voice) ? (on ? 1 : 0.78) : 0.15}
            >
              <title>{`${formation.voices.find((v) => v.id === b.voice)?.name}: ${b.label}`}</title>
            </rect>
          );
        })}
        {playhead != null && <line x1={x(playhead)} x2={x(playhead)} y1={0} y2={H} className={styles.head} vectorEffect="non-scaling-stroke" />}
      </svg>
      <figcaption className={styles.legend}>
        {formation.voices.map((v) => (
          <span key={v.id} className={styles.key} style={{ opacity: active(v.id) ? 1 : 0.4 }}>
            <i style={{ background: VOICE_UI_COLOR[v.id] }} aria-hidden="true" />
            {v.name}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
