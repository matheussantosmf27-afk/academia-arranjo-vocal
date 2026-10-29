"use client";

import type { VoiceId } from "@/domain/music/formations";
import { type Pitch, midiToFrequency, toMidi } from "@/domain/music/pitch";
import type { Score } from "@/domain/music/score";
import { type PlaybackOptions, buildPlaybackPlan } from "./plan";

/**
 * Síntese via Web Audio, sem amostras. Timbres:
 * - "neutro": triângulo filtrado (alturas claras, bom para conferir condução);
 * - "u" / "a": dente-de-serra com dois formantes de vogal — sugere uma voz, mas NÃO
 *   imita cantores reais (sem vibrato, consoantes, respiração ou afinação expressiva).
 */
export type Timbre = "neutro" | "u" | "a";

export const TIMBRE_PT: Record<Timbre, string> = { neutro: "Neutro", u: "Vogal “u”", a: "Vogal “a”" };

/** Formantes aproximados (Hz) de vogais cantadas. */
const FORMANTS: Record<Exclude<Timbre, "neutro">, [number, number]> = { u: [350, 750], a: [750, 1150] };

let sharedCtx: AudioContext | null = null;

export function isAudioSupported(): boolean {
  return typeof window !== "undefined" && ("AudioContext" in window || "webkitAudioContext" in window);
}

function audioContext(): AudioContext {
  if (!sharedCtx) {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedCtx = new Ctor();
  }
  return sharedCtx;
}

const VOICE_PAN: Partial<Record<VoiceId, number>> = { S: -0.3, A: -0.1, T: 0.1, B: 0.3, T1: -0.3, T2: -0.1, B1: 0.1, B2: 0.3, S1: -0.3, S2: -0.1, A1: 0.1, A2: 0.3 };

function scheduleTone(ctx: AudioContext, dest: AudioNode, midi: number, start: number, duration: number, opts: { pan?: number; gain?: number; timbre?: Timbre } = {}) {
  const timbre = opts.timbre ?? "neutro";
  const gain = (opts.gain ?? 0.8) * 0.2;
  const freq = midiToFrequency(midi);
  const env = ctx.createGain();
  const panner = ctx.createStereoPanner();
  panner.pan.value = opts.pan ?? 0;
  const attack = Math.min(0.06, duration * 0.3);
  const release = Math.min(0.12, duration * 0.3);
  const end = start + Math.max(duration, 0.03);
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(gain, start + attack);
  env.gain.setValueAtTime(gain, Math.max(start + attack, end - release));
  env.gain.linearRampToValueAtTime(0, end);
  env.connect(panner).connect(dest);

  const oscs: OscillatorNode[] = [];
  if (timbre === "neutro") {
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = Math.min(4000, freq * 4);
    osc.connect(lp).connect(env);
    oscs.push(osc);
  } else {
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = freq;
    for (const [i, f] of FORMANTS[timbre].entries()) {
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = f;
      bp.Q.value = 5;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 1.4 : 0.7;
      osc.connect(bp).connect(g).connect(env);
    }
    oscs.push(osc);
  }
  for (const o of oscs) {
    o.start(start);
    o.stop(end + 0.05);
  }
}

function scheduleClick(ctx: AudioContext, dest: AudioNode, time: number, accent: boolean) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = accent ? 1760 : 1320;
  g.gain.setValueAtTime(accent ? 0.18 : 0.11, time);
  g.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
  osc.connect(g).connect(dest);
  osc.start(time);
  osc.stop(time + 0.06);
}

export interface PlayerCallbacks {
  /** Chamado a cada quadro com a posição atual em ticks. */
  onPosition?: (ticks: number) => void;
  onEnd?: () => void;
}

export interface PlayRequest extends PlaybackOptions {
  readonly timbre?: Timbre;
  /** Repete o trecho [from, to) até parar. */
  readonly loop?: boolean;
}

/** Reprodutor com tocar, pausar (retomada), parar, trecho em loop, metrônomo e contagem. */
export class ScorePlayer {
  private master: GainNode | null = null;
  private raf = 0;
  private startedAt = 0;
  private position_ = 0;
  private _playing = false;
  private tickAt: (sec: number) => number = () => 0;

  get playing(): boolean {
    return this._playing;
  }

  async play(score: Score, req: PlayRequest, cb: PlayerCallbacks = {}): Promise<void> {
    this.stop();
    const ctx = audioContext();
    if (ctx.state === "suspended") await ctx.resume();
    const plan = buildPlaybackPlan(score, req);
    this.master = ctx.createGain();
    this.master.gain.value = Math.min(1, 1.2 / Math.max(1, req.voices.size * 0.6));
    this.master.connect(ctx.destination);
    const t0 = ctx.currentTime + 0.08;
    this.startedAt = t0;
    this.tickAt = plan.tickAtSec;
    this.position_ = req.from ?? 0;
    for (const n of plan.notes) {
      scheduleTone(ctx, this.master, n.midi, t0 + n.startSec, n.durSec, { pan: VOICE_PAN[n.voice] ?? 0, gain: n.gain, timbre: req.timbre ?? "neutro" });
    }
    for (const c of plan.clicks) scheduleClick(ctx, this.master, t0 + c.timeSec, c.accent);
    this._playing = true;
    const tick = () => {
      if (!this._playing || !sharedCtx) return;
      const elapsed = sharedCtx.currentTime - this.startedAt;
      this.position_ = this.tickAt(Math.max(0, elapsed));
      cb.onPosition?.(this.position_);
      if (elapsed >= plan.totalSec) {
        if (req.loop && plan.notes.length > 0) {
          // recomeça o trecho (sem contagem nas repetições)
          void this.play(score, { ...req, countIn: false }, cb);
          return;
        }
        this.stop();
        cb.onEnd?.();
        return;
      }
      this.raf = requestAnimationFrame(tick);
    };
    this.raf = requestAnimationFrame(tick);
  }

  /** Posição atual (ticks). */
  position(): number {
    return this.position_;
  }

  /** Interrompe o áudio e devolve a posição para retomada. */
  pause(): number {
    const pos = this.position_;
    this.stop();
    return pos;
  }

  stop(): void {
    this._playing = false;
    cancelAnimationFrame(this.raf);
    if (this.master) {
      try {
        this.master.disconnect();
      } catch {
        /* já desconectado */
      }
      this.master = null;
    }
  }
}

/** Toca alturas soltas (exercícios): em sequência ou simultâneas. */
/** melodico: uma nota de cada vez; harmonico: todas juntas; pares: duas notas juntas de cada vez (ex.: duas vozes passando de um intervalo a outro). */
export async function playPitches(pitches: readonly Pitch[], mode: "melodico" | "harmonico" | "pares", seconds = 1): Promise<void> {
  const ctx = audioContext();
  if (ctx.state === "suspended") await ctx.resume();
  const t0 = ctx.currentTime + 0.05;
  pitches.forEach((p, i) => {
    const start = mode === "melodico" ? t0 + i * seconds : mode === "pares" ? t0 + Math.floor(i / 2) * seconds : t0;
    scheduleTone(ctx, ctx.destination, toMidi(p), start, seconds * 0.95, { gain: mode === "melodico" ? 0.9 : mode === "pares" ? 0.75 : 0.6 });
  });
}
