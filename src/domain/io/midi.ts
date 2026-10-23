import { Midi } from "@tonejs/midi";
import { parseMidi, writeMidi } from "midi-file";
import { PPQ, durationTicks } from "../music/duration";
import { getFormation } from "../music/formations";
import { type Key, keyFifths, spellInKey } from "../music/key";
import type { Dynamic, Score } from "../music/score";
import { voiceTimeline } from "../music/score";
import { type ImportResult, type RawLine, assembleScore } from "./assemble";
import { keyFromFifths } from "./musicxml";

export type { ImportResult } from "./assemble";

const VELOCITY: Record<Dynamic, number> = { pp: 0.3, p: 0.42, mp: 0.55, mf: 0.68, f: 0.82, ff: 0.95 };

/**
 * Exporta um arquivo MIDI tipo 1: uma faixa por voz (altura SONORA), com
 * andamento, fórmula de compasso e armadura. Notas ligadas viram uma única nota.
 * Dinâmicas viram velocity; letra e articulações não são exportadas (o MIDI
 * não tem representação padrão confiável para elas — use MusicXML).
 */
export function exportMidi(score: Score): Uint8Array {
  const midi = new Midi();
  midi.header.setTempo(score.tempoBpm);
  midi.header.timeSignatures.push({ ticks: 0, timeSignature: [score.timeSignature.beats, score.timeSignature.beatType] });
  midi.header.name = score.title;
  midi.header.update();
  const formation = getFormation(score.formation);
  formation.voices.forEach((spec, channel) => {
    const part = score.parts.find((p) => p.voice === spec.id);
    if (!part) return;
    const track = midi.addTrack();
    track.name = spec.name;
    track.channel = channel;
    track.instrument.number = 52; // Choir Aahs
    let velocity = VELOCITY.mf;
    let pending: { midi: number; ticks: number; durationTicks: number; velocity: number } | null = null;
    for (const t of voiceTimeline(part, score.timeSignature)) {
      const e = t.event;
      if (e.kind === "rest") continue;
      if (e.dynamic) velocity = VELOCITY[e.dynamic];
      const ticks = durationTicks(e.duration);
      const m = 12 * (e.pitch.octave + 1) + [0, 2, 4, 5, 7, 9, 11]["CDEFGAB".indexOf(e.pitch.step)]! + e.pitch.alter;
      if (pending && pending.midi === m && pending.ticks + pending.durationTicks === t.onset) pending.durationTicks += ticks;
      else {
        if (pending) track.addNote(pending);
        pending = { midi: m, ticks: t.onset, durationTicks: ticks, velocity };
      }
      if (!e.tieToNext) {
        track.addNote(pending);
        pending = null;
      }
    }
    if (pending) track.addNote(pending);
  });
  // @tonejs/midi 2.0.28 grava a armadura com índice errado (keyIndex + 7);
  // inserimos o meta-evento diretamente com midi-file.
  const data = parseMidi(midi.toArray());
  const fifths = keyFifths(score.key);
  data.tracks[0]!.splice(1, 0, { deltaTime: 0, meta: true, type: "keySignature", key: fifths, scale: score.key.mode === "minor" ? 1 : 0 });
  return new Uint8Array(writeMidi(data));
}

/**
 * Importa MIDI: cada faixa com notas é uma linha vocal; início e duração são
 * quantizados à semicolcheia; a grafia das alturas segue a armadura do arquivo
 * (ou Dó maior). Faixas polifônicas mantêm a nota mais aguda e avisam.
 */
export function importMidi(bytes: Uint8Array, opts: { formation?: Score["formation"]; title?: string } = {}): ImportResult {
  const warnings: string[] = [];
  let midi: Midi;
  try {
    midi = new Midi(bytes);
  } catch {
    return { ok: false, warnings, errors: ["Arquivo MIDI inválido."] };
  }
  const q = PPQ / 4;
  const scale = PPQ / midi.header.ppq;
  const ks = midi.header.keySignatures[0];
  let key: Key | null = null;
  if (ks) {
    const fifths = ["Cb", "Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#"].indexOf(ks.key) - 7;
    if (fifths >= -7) key = keyFromFifths(fifths, ks.scale);
  }
  const effectiveKey: Key = key ?? { tonic: { step: "C", alter: 0 }, mode: "major" };
  const tsEv = midi.header.timeSignatures[0];
  const ts =
    tsEv && [2, 4, 8].includes(tsEv.timeSignature[1]!) && tsEv.timeSignature[0]! >= 1 && tsEv.timeSignature[0]! <= 12
      ? { beats: tsEv.timeSignature[0]!, beatType: tsEv.timeSignature[1] as Score["timeSignature"]["beatType"] }
      : null;
  const tempo = midi.header.tempos[0]?.bpm ?? 72;
  let quantized = false;
  const lines: RawLine[] = midi.tracks
    .filter((t) => t.notes.length > 0 && t.channel !== 9)
    .map((track, i) => {
      const byOnset = new Map<number, { midi: number; end: number; velocity: number }>();
      for (const n of track.notes) {
        const on = Math.round((n.ticks * scale) / q) * q;
        const end = Math.max(on + q, Math.round(((n.ticks + n.durationTicks) * scale) / q) * q);
        if (on !== n.ticks * scale || end !== (n.ticks + n.durationTicks) * scale) quantized = true;
        const prev = byOnset.get(on);
        if (prev) {
          warnings.push(`Faixa "${track.name || i + 1}" tem notas simultâneas: mantida a mais aguda.`);
          if (n.midi > prev.midi) byOnset.set(on, { midi: n.midi, end, velocity: n.velocity });
        } else byOnset.set(on, { midi: n.midi, end, velocity: n.velocity });
      }
      const onsets = [...byOnset.keys()].sort((a, b) => a - b);
      return {
        label: track.name || `Faixa ${i + 1}`,
        notes: onsets.map((on, k) => {
          const n = byOnset.get(on)!;
          const next = onsets[k + 1];
          const end = next !== undefined ? Math.min(n.end, next) : n.end;
          return { onset: on, dur: end - on, pitch: spellInKey(n.midi, effectiveKey), dots: 0 as const, tieStart: false, arts: [] };
        }),
      };
    });
  if (quantized) warnings.push("Inícios e durações foram quantizados à semicolcheia.");
  return assembleScore({
    title: opts.title ?? (midi.header.name || midi.name || "MIDI importado"),
    key,
    timeSignature: ts,
    tempo,
    lines,
    ...(opts.formation ? { formation: opts.formation } : {}),
    warnings,
  });
}
