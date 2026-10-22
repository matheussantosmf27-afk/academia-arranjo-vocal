import { type Duration, PPQ, durationTicks, measureTicks, ticksToDurations } from "./duration";
import type { VoiceId } from "./formations";
import { type IntervalQuality, intervalBetween, transposeByInterval } from "./interval";
import type { Key } from "./key";
import type { Pitch } from "./pitch";
import { type MusicEvent, type NoteEvent, type Score, type VoicePart, findEvent, partLengthTicks, voiceTimeline } from "./score";
import { type IdFactory, defaultIdFactory } from "./operations";

/**
 * Operações sobre a linha do tempo de uma voz. Todas preservam a contiguidade
 * dos eventos e o comprimento total da voz.
 */

/** Divide `ticks` em figuras; notas resultantes ficam ligadas entre si. */
function piecesOf(ev: MusicEvent, ticks: number, idf: IdFactory, keepId: boolean, tieAtEnd: boolean): MusicEvent[] {
  const durs = ticksToDurations(ticks);
  return durs.map((d, i) => {
    const id = i === 0 && keepId ? ev.id : idf();
    if (ev.kind === "rest") return { id, kind: "rest", duration: d };
    const last = i === durs.length - 1;
    const base: NoteEvent = { ...ev, id, duration: d };
    // letra, dinâmica e articulações ficam só no primeiro pedaço
    const clean: NoteEvent = i === 0 ? base : { id, kind: "note", pitch: ev.pitch, duration: d };
    const tie = last ? tieAtEnd : true;
    if (tie) return { ...clean, tieToNext: true };
    const { tieToNext: _t, ...rest } = clean;
    void _t;
    return rest;
  });
}

/** Garante uma fronteira de evento em `tick` (divide o evento que o atravessa). */
export function splitPartAt(part: VoicePart, tick: number, ts: Score["timeSignature"], idf: IdFactory = defaultIdFactory): VoicePart {
  const tl = voiceTimeline(part, ts);
  const te = tl.find((t) => t.onset < tick && tick < t.end);
  if (!te) return part;
  const ev = te.event;
  const originalTie = ev.kind === "note" && !!ev.tieToNext;
  const left = piecesOf(ev, tick - te.onset, idf, true, true);
  const right = piecesOf(ev, te.end - tick, idf, false, originalTie);
  return { ...part, events: [...part.events.slice(0, te.index), ...left, ...right, ...part.events.slice(te.index + 1)] };
}

/**
 * Substitui o trecho [start, start + duração dos novos eventos) da voz pelos eventos dados.
 * Trechos que passarem do fim da voz são cortados.
 */
export function overwriteRange(score: Score, voice: VoiceId, start: number, newEvents: readonly MusicEvent[], idf: IdFactory = defaultIdFactory): Score {
  const part = score.parts.find((p) => p.voice === voice);
  if (!part) throw new Error(`Voz ${voice} ausente`);
  const total = partLengthTicks(part);
  if (start < 0 || start >= total) throw new Error("Posição fora da voz");
  let len = newEvents.reduce((s, e) => s + durationTicks(e.duration), 0);
  let events = [...newEvents];
  if (start + len > total) {
    // corta o excesso
    const kept: MusicEvent[] = [];
    let acc = 0;
    for (const e of events) {
      const d = durationTicks(e.duration);
      if (acc + d <= total - start) {
        kept.push(e);
        acc += d;
      } else {
        if (total - start - acc > 0) kept.push(...piecesOf(e, total - start - acc, idf, true, false));
        break;
      }
    }
    events = kept;
    len = total - start;
  }
  let p = splitPartAt(part, start, score.timeSignature, idf);
  p = splitPartAt(p, start + len, score.timeSignature, idf);
  const tl = voiceTimeline(p, score.timeSignature);
  const before = tl.filter((t) => t.end <= start).map((t) => t.event);
  const after = tl.filter((t) => t.onset >= start + len).map((t) => t.event);
  // a nota imediatamente anterior não pode continuar ligada a algo que foi substituído
  const prev = before[before.length - 1];
  if (prev && prev.kind === "note" && prev.tieToNext) {
    const first = events[0];
    if (!first || first.kind !== "note" || first.pitch.step !== prev.pitch.step || first.pitch.alter !== prev.pitch.alter || first.pitch.octave !== prev.pitch.octave) {
      const { tieToNext: _t, ...rest } = prev;
      void _t;
      before[before.length - 1] = rest;
    }
  }
  const parts = score.parts.map((x) => (x.voice === voice ? { ...p, events: [...before, ...events, ...after] } : x));
  return { ...score, parts };
}

/** Insere uma nota (ou pausa) em qualquer posição, sobrescrevendo o que houver ali. */
export function insertAt(score: Score, voice: VoiceId, tick: number, duration: Duration, pitch: Pitch | null, idf: IdFactory = defaultIdFactory): { score: Score; eventId: string } {
  const id = idf();
  const ev: MusicEvent = pitch ? { id, kind: "note", pitch, duration } : { id, kind: "rest", duration };
  return { score: overwriteRange(score, voice, tick, [ev], idf), eventId: id };
}

/** Divide um evento em duas metades (nota → duas notas não ligadas). */
export function splitEvent(score: Score, eventId: string, idf: IdFactory = defaultIdFactory): Score {
  const loc = findEvent(score, eventId);
  if (!loc) throw new Error("Evento não encontrado");
  const len = durationTicks(loc.event.duration);
  const minUnit = PPQ / 4;
  if (len < 2 * minUnit) throw new Error("A figura é curta demais para dividir");
  const half = Math.floor(len / 2 / minUnit) * minUnit;
  const ev = loc.event;
  const first = piecesOf(ev, half, idf, true, false);
  const second = piecesOf(ev, len - half, idf, false, ev.kind === "note" && !!ev.tieToNext).map((e) => (e.kind === "note" ? stripAnnotations(e) : e));
  const part = loc.part;
  const events = [...part.events.slice(0, loc.index), ...first, ...second, ...part.events.slice(loc.index + 1)];
  return { ...score, parts: score.parts.map((p) => (p === part ? { ...p, events } : p)) };
}

function stripAnnotations(e: NoteEvent): NoteEvent {
  const out: NoteEvent = { id: e.id, kind: "note", pitch: e.pitch, duration: e.duration };
  return e.tieToNext ? { ...out, tieToNext: true } : out;
}

/** Junta um evento com o seguinte (pausas com pausas; notas de mesma altura). */
export function mergeWithNext(score: Score, eventId: string): Score {
  const loc = findEvent(score, eventId);
  if (!loc) throw new Error("Evento não encontrado");
  const next = loc.part.events[loc.index + 1];
  if (!next) throw new Error("Não há evento seguinte nesta voz");
  const a = loc.event;
  const samePitch = a.kind === "note" && next.kind === "note" && intervalBetween(a.pitch, next.pitch).semitones === 0 && a.pitch.step === next.pitch.step;
  if (!(a.kind === "rest" && next.kind === "rest") && !samePitch) throw new Error("Só é possível juntar pausas consecutivas ou notas de mesma altura");
  const durs = ticksToDurations(durationTicks(a.duration) + durationTicks(next.duration));
  if (durs.length !== 1) throw new Error("A soma não corresponde a uma única figura; use a ligadura");
  const merged: MusicEvent =
    a.kind === "note" && next.kind === "note"
      ? (() => {
          const base: NoteEvent = { ...a, duration: durs[0]! };
          const { tieToNext: _t, ...rest } = base;
          void _t;
          return next.tieToNext ? { ...rest, tieToNext: true } : rest;
        })()
      : { id: a.id, kind: "rest", duration: durs[0]! };
  const events = [...loc.part.events.slice(0, loc.index), merged, ...loc.part.events.slice(loc.index + 2)];
  return { ...score, parts: score.parts.map((p) => (p === loc.part ? { ...p, events } : p)) };
}

/** Troca a ordem de um evento com o seguinte (move no tempo). */
export function swapWithNext(score: Score, eventId: string): Score {
  const loc = findEvent(score, eventId);
  if (!loc) throw new Error("Evento não encontrado");
  const next = loc.part.events[loc.index + 1];
  if (!next) throw new Error("Não há evento seguinte nesta voz");
  const clearTie = (e: MusicEvent): MusicEvent => {
    if (e.kind !== "note" || !e.tieToNext) return e;
    const { tieToNext: _t, ...rest } = e;
    void _t;
    return rest;
  };
  const events = [...loc.part.events];
  events[loc.index] = clearTie(next);
  events[loc.index + 1] = clearTie(loc.event);
  return { ...score, parts: score.parts.map((p) => (p === loc.part ? { ...p, events } : p)) };
}

/** Divide toda figura que atravessa a barra em pedaços ligados (corrige a notação). */
export function normalizeBarlines(score: Score, idf: IdFactory = defaultIdFactory): Score {
  const mt = measureTicks(score.timeSignature);
  const parts = score.parts.map((part) => {
    let p = part;
    const total = partLengthTicks(part);
    for (let bar = mt; bar < total; bar += mt) p = splitPartAt(p, bar, score.timeSignature, idf);
    return p;
  });
  return { ...score, parts };
}

/** Eventos de uma voz entre dois eventos (inclusive), para copiar. */
export function eventRange(score: Score, fromId: string, toId: string): { voice: VoiceId; events: MusicEvent[]; start: number } | null {
  const a = findEvent(score, fromId);
  const b = findEvent(score, toId);
  if (!a || !b || a.part !== b.part) return null;
  const [i, j] = a.index <= b.index ? [a.index, b.index] : [b.index, a.index];
  const tl = voiceTimeline(a.part, score.timeSignature);
  return { voice: a.part.voice, events: a.part.events.slice(i, j + 1), start: tl[i]!.onset };
}

/** Cola eventos (com novos IDs) a partir do evento-alvo, sobrescrevendo. */
export function pasteAt(score: Score, targetId: string, clip: readonly MusicEvent[], idf: IdFactory = defaultIdFactory): Score {
  const loc = findEvent(score, targetId);
  if (!loc) throw new Error("Evento não encontrado");
  const start = voiceTimeline(loc.part, score.timeSignature)[loc.index]!.onset;
  const fresh = clip.map((e) => ({ ...e, id: idf() }) as MusicEvent);
  const last = fresh[fresh.length - 1];
  if (last && last.kind === "note" && last.tieToNext) fresh[fresh.length - 1] = stripTie(last);
  return overwriteRange(score, loc.part.voice, start, fresh, idf);
}

function stripTie(e: NoteEvent): NoteEvent {
  const { tieToNext: _t, ...rest } = e;
  void _t;
  return rest;
}

/** Altera o número de compassos: acrescenta pausas ou corta o final. */
export function setMeasureCount(score: Score, count: number, idf: IdFactory = defaultIdFactory): Score {
  if (!Number.isInteger(count) || count < 1 || count > 512) throw new Error("Número de compassos inválido");
  const mt = measureTicks(score.timeSignature);
  const target = count * mt;
  const parts = score.parts.map((part) => {
    const len = partLengthTicks(part);
    if (len === target) return part;
    if (len < target) {
      const pad: MusicEvent[] = [];
      let t = len;
      while (t < target) {
        const next = Math.min(target, (Math.floor(t / mt) + 1) * mt);
        for (const d of ticksToDurations(next - t)) pad.push({ id: idf(), kind: "rest", duration: d });
        t = next;
      }
      return { ...part, events: [...part.events, ...pad] };
    }
    const p = splitPartAt(part, target, score.timeSignature, idf);
    const tl = voiceTimeline(p, score.timeSignature);
    const kept = tl.filter((t) => t.end <= target).map((t) => t.event);
    const lastKept = kept[kept.length - 1];
    if (lastKept && lastKept.kind === "note" && lastKept.tieToNext) kept[kept.length - 1] = stripTie(lastKept);
    return { ...p, events: kept };
  });
  return { ...score, measureCount: count, parts };
}

/** Troca a fórmula de compasso mantendo o conteúdo; completa o último compasso com pausas e corrige barras. */
export function setTimeSignature(score: Score, ts: Score["timeSignature"], idf: IdFactory = defaultIdFactory): Score {
  const total = Math.max(...score.parts.map(partLengthTicks));
  const mt = measureTicks(ts);
  const count = Math.max(1, Math.ceil(total / mt));
  const withTs: Score = { ...score, timeSignature: ts, measureCount: count };
  return normalizeBarlines(setMeasureCount(withTs, count, idf), idf);
}

/** Transpõe todas as notas por um intervalo grafado. */
export function transposeScore(score: Score, number: number, quality: IntervalQuality, direction: 1 | -1): Score {
  const parts = score.parts.map((part) => ({
    ...part,
    events: part.events.map((e) => (e.kind === "note" ? { ...e, pitch: transposeByInterval(e.pitch, number, quality, direction) } : e)),
  }));
  return { ...score, parts };
}

/**
 * Muda a tonalidade. "manter": só a armadura muda (alturas preservadas; acidentes passam a aparecer).
 * "transpor": move todas as notas pelo intervalo entre as tônicas (mesmo modo), pelo caminho mais curto.
 */
export function changeKey(score: Score, key: Key, mode: "manter" | "transpor"): Score {
  if (mode === "manter") return { ...score, key };
  if (key.mode !== score.key.mode) throw new Error("Para transpor, mantenha o mesmo modo (maior/menor)");
  const from: Pitch = { ...score.key.tonic, octave: 4 };
  const up: Pitch = { ...key.tonic, octave: 4 };
  let iv = intervalBetween(from, up);
  let dir: 1 | -1 = iv.direction === -1 ? -1 : 1;
  if (iv.semitones > 6) {
    // caminho mais curto: tônica na outra oitava
    const alt: Pitch = { ...key.tonic, octave: iv.direction === -1 ? 5 : 3 };
    iv = intervalBetween(from, alt);
    dir = iv.direction === -1 ? -1 : 1;
  }
  const transposed = iv.semitones === 0 && iv.number === 1 ? score : transposeScore(score, iv.number, iv.quality, dir);
  return { ...transposed, key };
}
