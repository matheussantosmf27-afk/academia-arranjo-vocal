"use client";

import { PPQ } from "@/domain/music/duration";
import type { VoiceId } from "@/domain/music/formations";
import { type Pitch, midiToFrequency, toMidi } from "@/domain/music/pitch";
import type { Score } from "@/domain/music/score";
import { type PlaybackNote, buildPlaybackNotes, ticksToSeconds } from "./schedule";

/**
 * Síntese simples via Web Audio (sem amostras): osciladores com envelope e filtro,
 * para um timbre neutro tipo "oo". LIMITAÇÃO: não imita vozes humanas, vogais,
 * vibrato nem afinação justa — serve para conferir alturas, ritmo e condução.
 */
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

const VOICE_PAN: Partial<Record<VoiceId, number>> = { S: -0.3, A: -0.1, T: 0.1, B: 0.3, T1: -0.3, T2: -0.1, B1: 0.1, B2: 0.3 };

function scheduleTone(ctx: AudioContext, dest: AudioNode, midi: number, start: number, duration: number, pan = 0, gain = 0.16) {
  const osc = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const env = ctx.createGain();
  const panner = ctx.createStereoPanner();
  const freq = midiToFrequency(midi);
  osc.type = "triangle";
  osc.frequency.value = freq;
  osc2.type = "sine";
  osc2.frequency.value = freq * 2;
  const mix2 = ctx.createGain();
  mix2.gain.value = 0.15;
  filter.type = "lowpass";
  filter.frequency.value = Math.min(4000, freq * 4);
  filter.Q.value = 0.7;
  panner.pan.value = pan;
  const attack = 0.04;
  const release = Math.min(0.12, duration * 0.3);
  const end = start + duration;
  env.gain.setValueAtTime(0, start);
  env.gain.linearRampToValueAtTime(gain, start + attack);
  env.gain.setValueAtTime(gain, Math.max(start + attack, end - release));
  env.gain.linearRampToValueAtTime(0, end);
  osc.connect(filter);
  osc2.connect(mix2).connect(filter);
  filter.connect(env).connect(panner).connect(dest);
  osc.start(start);
  osc2.start(start);
  osc.stop(end + 0.05);
  osc2.stop(end + 0.05);
}

export interface PlayerCallbacks {
  /** Chamado a cada quadro com a posição atual em ticks. */
  onPosition?: (ticks: number) => void;
  onEnd?: () => void;
}

/** Reprodutor de partituras com início, pausa (retomada da posição) e reinício. */
export class ScorePlayer {
  private master: GainNode | null = null;
  private raf = 0;
  private startedAt = 0;
  private startTicks = 0;
  private endTicks = 0;
  private bpm = 72;
  private _playing = false;

  get playing(): boolean {
    return this._playing;
  }

  async play(score: Score, voices: ReadonlySet<VoiceId>, fromTicks: number, cb: PlayerCallbacks = {}): Promise<void> {
    this.stop();
    const ctx = audioContext();
    if (ctx.state === "suspended") await ctx.resume();
    const notes: PlaybackNote[] = buildPlaybackNotes(score, voices);
    this.bpm = score.tempoBpm;
    this.master = ctx.createGain();
    this.master.gain.value = Math.min(1, 1.2 / Math.max(1, voices.size * 0.6));
    this.master.connect(ctx.destination);
    const t0 = ctx.currentTime + 0.08;
    this.startedAt = t0;
    this.startTicks = fromTicks;
    this.endTicks = Math.max(fromTicks, ...notes.map((n) => n.end));
    for (const n of notes) {
      if (n.end <= fromTicks) continue;
      const s = Math.max(n.onset, fromTicks);
      scheduleTone(ctx, this.master, n.midi, t0 + ticksToSeconds(s - fromTicks, this.bpm), ticksToSeconds(n.end - s, this.bpm), VOICE_PAN[n.voice] ?? 0);
    }
    this._playing = true;
    const tick = () => {
      if (!this._playing) return;
      const pos = this.position();
      cb.onPosition?.(pos);
      if (pos >= this.endTicks) {
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
    if (!this._playing || !sharedCtx) return this.startTicks;
    const elapsed = Math.max(0, sharedCtx.currentTime - this.startedAt);
    return this.startTicks + (elapsed / (60 / this.bpm)) * PPQ;
  }

  /** Interrompe o áudio e devolve a posição para retomada. */
  pause(): number {
    const pos = this.position();
    this.stop();
    this.startTicks = pos;
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
export async function playPitches(pitches: readonly Pitch[], mode: "melodico" | "harmonico", seconds = 1): Promise<void> {
  const ctx = audioContext();
  if (ctx.state === "suspended") await ctx.resume();
  const t0 = ctx.currentTime + 0.05;
  pitches.forEach((p, i) => {
    const start = mode === "melodico" ? t0 + i * seconds : t0;
    scheduleTone(ctx, ctx.destination, toMidi(p), start, seconds * 0.95, 0, mode === "harmonico" ? 0.12 : 0.18);
  });
}
