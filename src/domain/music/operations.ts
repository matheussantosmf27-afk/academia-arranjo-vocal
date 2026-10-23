import { type Duration, durationTicks, measureTicks, ticksToDurations } from "./duration";
import type { VoiceId } from "./formations";
import { type Key, moveChromatic, moveDiatonic } from "./key";
import type { Pitch } from "./pitch";
import { type Articulation, type Dynamic, type MusicEvent, type NoteEvent, type Score, findEvent } from "./score";

/**
 * Operações de edição PURAS e imutáveis: recebem uma partitura e devolvem outra.
 * O histórico (desfazer/refazer) é uma lista de partituras — ver history.ts.
 */

export type IdFactory = () => string;

let counter = 0;
/** Gerador padrão de IDs (único na sessão); testes injetam um determinístico. */
export const defaultIdFactory: IdFactory = () => {
  counter += 1;
  const rand = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().slice(0, 8) : String(Date.now());
  return `e${counter.toString(36)}${rand}`;
};

function mapEvent(score: Score, eventId: string, fn: (e: MusicEvent) => MusicEvent): Score {
  let found = false;
  const parts = score.parts.map((part) => {
    const idx = part.events.findIndex((e) => e.id === eventId);
    if (idx < 0) return part;
    found = true;
    const events = part.events.slice();
    events[idx] = fn(part.events[idx] as MusicEvent);
    return { ...part, events };
  });
  if (!found) throw new Error(`Evento ${eventId} não encontrado`);
  return { ...score, parts };
}

export function setPitch(score: Score, eventId: string, pitch: Pitch): Score {
  return mapEvent(score, eventId, (e) =>
    e.kind === "note" ? { ...e, pitch } : { id: e.id, kind: "note", pitch, duration: e.duration },
  );
}

export function transposeEventDiatonic(score: Score, eventId: string, steps: number, key: Key = score.key): Score {
  return mapEvent(score, eventId, (e) => (e.kind === "note" ? { ...e, pitch: moveDiatonic(e.pitch, steps, key) } : e));
}

export function transposeEventChromatic(score: Score, eventId: string, direction: 1 | -1): Score {
  return mapEvent(score, eventId, (e) => (e.kind === "note" ? { ...e, pitch: moveChromatic(e.pitch, direction) } : e));
}

export function transposeEventOctave(score: Score, eventId: string, direction: 1 | -1): Score {
  return mapEvent(score, eventId, (e) =>
    e.kind === "note" ? { ...e, pitch: { ...e.pitch, octave: e.pitch.octave + direction } } : e,
  );
}

/** Converte nota em pausa (mesma duração). */
export function toRest(score: Score, eventId: string): Score {
  return mapEvent(score, eventId, (e) => ({ id: e.id, kind: "rest", duration: e.duration }));
}

/** Converte pausa em nota, usando a altura informada. */
export function toNote(score: Score, eventId: string, pitch: Pitch): Score {
  return mapEvent(score, eventId, (e) => (e.kind === "rest" ? { id: e.id, kind: "note", pitch, duration: e.duration } : e));
}

export function toggleTie(score: Score, eventId: string): Score {
  return mapEvent(score, eventId, (e) => (e.kind === "note" ? { ...e, tieToNext: !e.tieToNext } : e));
}

export function setLyric(score: Score, eventId: string, lyric: string): Score {
  const clean = lyric.trim().slice(0, 64);
  return mapEvent(score, eventId, (e) => {
    if (e.kind !== "note") return e;
    const { lyric: _old, ...rest } = e;
    void _old;
    return clean ? { ...rest, lyric: clean } : rest;
  });
}

/**
 * Altera a duração de um evento preservando o comprimento total da voz:
 * - se a nova duração for menor, insere pausas logo depois;
 * - se for maior, consome os eventos seguintes (encurtando o último consumido
 *   e completando com pausas). Recusa se ultrapassar o fim da voz.
 */
export function setDuration(score: Score, eventId: string, duration: Duration, idFactory: IdFactory = defaultIdFactory): Score {
  const loc = findEvent(score, eventId);
  if (!loc) throw new Error(`Evento ${eventId} não encontrado`);
  const { part, index, event } = loc;
  const oldLen = durationTicks(event.duration);
  const newLen = durationTicks(duration);
  const events = part.events.slice();
  events[index] = { ...event, duration } as MusicEvent;

  if (newLen < oldLen) {
    const fill: MusicEvent[] = ticksToDurations(oldLen - newLen).map((d) => ({ id: idFactory(), kind: "rest", duration: d }));
    events.splice(index + 1, 0, ...fill);
  } else if (newLen > oldLen) {
    let needed = newLen - oldLen;
    const j = index + 1;
    while (needed > 0) {
      const next = events[j];
      if (!next) throw new Error("A nova duração ultrapassa o fim da voz");
      const len = durationTicks(next.duration);
      if (len <= needed) {
        events.splice(j, 1);
        needed -= len;
      } else {
        const remainder = ticksToDurations(len - needed).map((d, k) =>
          k === 0 ? ({ ...next, duration: d } as MusicEvent) : ({ id: idFactory(), kind: "rest", duration: d } as MusicEvent),
        );
        events.splice(j, 1, ...remainder);
        needed = 0;
      }
    }
  }
  const parts = score.parts.map((p) => (p === part ? { ...p, events } : p));
  return { ...score, parts };
}

/** Liga/desliga uma articulação na nota. */
export function toggleArticulation(score: Score, eventId: string, art: Articulation): Score {
  return mapEvent(score, eventId, (e) => {
    if (e.kind !== "note") return e;
    const cur = e.articulations ?? [];
    const next = cur.includes(art) ? cur.filter((a) => a !== art) : [...cur, art];
    const { articulations: _a, ...rest } = e;
    void _a;
    return next.length ? { ...rest, articulations: next } : rest;
  });
}

/** Define (ou remove, com null) a dinâmica a partir da nota. */
export function setDynamic(score: Score, eventId: string, dynamic: Dynamic | null): Score {
  return mapEvent(score, eventId, (e) => {
    if (e.kind !== "note") return e;
    const { dynamic: _d, ...rest } = e;
    void _d;
    return dynamic ? { ...rest, dynamic } : rest;
  });
}

/** Exclui um evento substituindo-o por pausa de mesma duração (mantém o alinhamento das vozes). */
export function deleteEvent(score: Score, eventId: string): Score {
  return toRest(score, eventId);
}

/** Cria uma partitura vazia (pausas de compasso inteiro) para a formação. */
export function emptyScore(params: {
  id: string;
  title: string;
  formation: Score["formation"];
  key: Key;
  timeSignature: Score["timeSignature"];
  tempoBpm: number;
  measureCount: number;
  voices: readonly VoiceId[];
  idFactory?: IdFactory;
}): Score {
  const idf = params.idFactory ?? defaultIdFactory;
  const mt = measureTicks(params.timeSignature);
  return {
    schemaVersion: 1,
    id: params.id,
    title: params.title,
    formation: params.formation,
    key: params.key,
    timeSignature: params.timeSignature,
    tempoBpm: params.tempoBpm,
    measureCount: params.measureCount,
    parts: params.voices.map((voice) => ({
      voice,
      events: Array.from({ length: params.measureCount }).flatMap(() =>
        ticksToDurations(mt).map((d): MusicEvent => ({ id: idf(), kind: "rest", duration: d })),
      ),
    })),
    metadata: { style: "coral-tradicional" },
  };
}

export function isNote(e: MusicEvent): e is NoteEvent {
  return e.kind === "note";
}
