import { PPQ, beatTicks, measureTicks } from "@/domain/music/duration";
import type { VoiceId } from "@/domain/music/formations";
import { toMidi } from "@/domain/music/pitch";
import { type Dynamic, type Score, voiceTimeline } from "@/domain/music/score";

/**
 * Plano de reprodução PURO (sem Web Audio): converte a partitura em notas com
 * tempo em segundos e intensidade, aplicando a interpretação básica da notação.
 *
 * Convenções de interpretação (documentadas para o aluno):
 * - dinâmica vale a partir da nota marcada até a próxima marcação na mesma voz (padrão: mf);
 * - acento: +35% de intensidade; staccato: 50% da duração; tenuto: duração cheia
 *   (as demais notas soam 92% para separar articulações repetidas);
 * - fermata: a sonoridade é sustentada por mais uma vez a sua duração — todas as vozes seguram.
 */
export const DYNAMIC_GAIN: Readonly<Record<Dynamic, number>> = { pp: 0.35, p: 0.5, mp: 0.65, mf: 0.8, f: 0.95, ff: 1.1 };

export interface PlannedNote {
  readonly voice: VoiceId;
  readonly midi: number;
  readonly onset: number;
  readonly end: number;
  readonly startSec: number;
  readonly durSec: number;
  readonly gain: number;
  readonly eventIds: readonly string[];
}

export interface PlannedClick {
  readonly timeSec: number;
  readonly accent: boolean;
}

export interface PlaybackOptions {
  readonly voices: ReadonlySet<VoiceId>;
  /** Trecho em ticks [from, to). */
  readonly from?: number;
  readonly to?: number;
  readonly metronome?: boolean;
  /** Compasso de contagem antes do início. */
  readonly countIn?: boolean;
}

export interface PlaybackPlan {
  readonly notes: readonly PlannedNote[];
  readonly clicks: readonly PlannedClick[];
  /** Duração total em segundos (inclui contagem). */
  readonly totalSec: number;
  /** Segundos da contagem inicial. */
  readonly leadInSec: number;
  /** Converte ticks absolutos em segundos do plano (para o cursor). */
  readonly tickAtSec: (sec: number) => number;
}

interface Pending {
  midi: number;
  onset: number;
  end: number;
  ids: string[];
  gain: number;
  staccato: boolean;
  tenuto: boolean;
  tied: boolean;
}

interface Hold {
  readonly tick: number;
  readonly sec: number;
}

/** Pausas de fermata: no fim de cada nota com fermata, insere a duração dela. */
function fermataHolds(score: Score): Hold[] {
  const holds = new Map<number, number>();
  for (const part of score.parts) {
    for (const te of voiceTimeline(part, score.timeSignature)) {
      if (te.event.kind === "note" && te.event.articulations?.includes("fermata")) {
        const sec = ((te.end - te.onset) / PPQ) * (60 / score.tempoBpm);
        holds.set(te.end, Math.max(holds.get(te.end) ?? 0, sec));
      }
    }
  }
  return [...holds.entries()].map(([tick, sec]) => ({ tick, sec })).sort((a, b) => a.tick - b.tick);
}

export function buildPlaybackPlan(score: Score, opts: PlaybackOptions): PlaybackPlan {
  const secPerTick = 60 / score.tempoBpm / PPQ;
  const total = score.measureCount * measureTicks(score.timeSignature);
  const from = Math.max(0, Math.min(opts.from ?? 0, total));
  const to = Math.max(from, Math.min(opts.to ?? total, total));
  const holds = fermataHolds(score).filter((h) => h.tick > from && h.tick <= to);
  const leadIn = opts.countIn ? measureTicks(score.timeSignature) * secPerTick : 0;
  /** Segundos desde `from` até `tick`, incluindo fermatas com tick ≤ alvo. */
  const sec = (tick: number) => leadIn + (tick - from) * secPerTick + holds.filter((h) => h.tick <= tick).reduce((s, h) => s + h.sec, 0);

  const notes: PlannedNote[] = [];
  for (const part of score.parts) {
    if (!opts.voices.has(part.voice)) continue;
    let dynamic: Dynamic = "mf";
    let pending: Pending | null = null;
    const flush = () => {
      if (!pending) return;
      const s = Math.max(pending.onset, from);
      const e = Math.min(pending.end, to);
      if (e > s) {
        const startSec = sec(s);
        const full = sec(e) - startSec;
        const factor = pending.staccato ? 0.5 : pending.tenuto ? 1 : 0.92;
        notes.push({ voice: part.voice, midi: pending.midi, onset: s, end: e, startSec, durSec: full * factor, gain: pending.gain, eventIds: pending.ids });
      }
      pending = null;
    };
    for (const te of voiceTimeline(part, score.timeSignature)) {
      const ev = te.event;
      if (ev.kind === "note" && ev.dynamic) dynamic = ev.dynamic;
      if (ev.kind !== "note") {
        flush();
        continue;
      }
      const midi = toMidi(ev.pitch);
      const arts = ev.articulations ?? [];
      // nota ligada à anterior de mesma altura: prolonga em vez de rearticular
      if (pending && pending.midi === midi && pending.end === te.onset && pending.tied) {
        pending.end = te.end;
        pending.ids.push(ev.id);
        pending.tied = !!ev.tieToNext;
        if (!pending.tied) flush();
        continue;
      }
      flush();
      pending = {
        midi,
        onset: te.onset,
        end: te.end,
        ids: [ev.id],
        gain: DYNAMIC_GAIN[dynamic] * (arts.includes("accent") ? 1.35 : 1),
        staccato: arts.includes("staccato"),
        tenuto: arts.includes("tenuto"),
        tied: !!ev.tieToNext,
      };
      if (!ev.tieToNext) flush();
    }
    flush();
  }
  notes.sort((a, b) => a.startSec - b.startSec || b.midi - a.midi);

  const clicks: PlannedClick[] = [];
  const bt = beatTicks(score.timeSignature);
  const mt = measureTicks(score.timeSignature);
  if (opts.countIn) {
    const beats = Math.round(mt / bt);
    for (let i = 0; i < beats; i++) clicks.push({ timeSec: i * bt * secPerTick, accent: i === 0 });
  }
  if (opts.metronome) {
    for (let t = Math.ceil(from / bt) * bt; t < to; t += bt) clicks.push({ timeSec: sec(t), accent: t % mt === 0 });
  }

  const totalSec = sec(to);
  const tickAtSec = (s: number) => {
    if (s <= leadIn) return from;
    // inverte sec(): percorre as fermatas
    let t = from + (s - leadIn) / secPerTick;
    for (const h of holds) {
      const atHold = sec(h.tick) - h.sec; // instante em que a fermata começa a ser sustentada
      if (s >= atHold && s < atHold + h.sec) return h.tick;
      if (s >= atHold + h.sec) t -= h.sec / secPerTick;
    }
    return Math.min(to, t);
  };
  return { notes, clicks, totalSec, leadInSec: leadIn, tickAtSec };
}

export const totalTicks = (score: Score) => score.measureCount * measureTicks(score.timeSignature);
