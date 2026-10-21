import type { Duration, DurationType, TimeSignature } from "./duration";
import { DURATION_TYPES, durationTicks, measureTicks } from "./duration";
import { type FormationId, type VoiceId, getFormation } from "./formations";
import type { Key, Mode } from "./key";
import { type Alter, type Step, parsePitch } from "./pitch";
import type { MusicEvent, Score, StyleProfileId } from "./score";

/**
 * Notação textual compacta usada para escrever exemplos didáticos e testes:
 *
 *   "C4:q D4:q E4:h | F4:q~ F4:q r:h"
 *
 * - `<altura>:<duração>` com duração w|h|q|8|16 e pontos opcionais ("q." "h..").
 * - `r:<duração>` = pausa.
 * - `~` no final = ligadura para a próxima nota.
 * - `"texto"` após a duração = sílaba de letra: C4:q"Glo-
 * - `|` é apenas visual (barras) e é verificado: cada compasso deve somar o compasso.
 */
export function parseVoiceText(text: string, voice: VoiceId, ts?: TimeSignature): MusicEvent[] {
  const events: MusicEvent[] = [];
  const measures = text.split("|");
  measures.forEach((measureText, mi) => {
    const tokens = measureText.trim().split(/\s+/).filter(Boolean);
    let measureLen = 0;
    for (const token of tokens) {
      const m = /^([^:]+):(w|h|q|8|16)(\.{0,2})(~)?(?:"(.*))?$/.exec(token);
      if (!m) throw new Error(`Token inválido "${token}" na voz ${voice}`);
      const type = m[2] as DurationType;
      if (!DURATION_TYPES.includes(type)) throw new Error(`Duração inválida em "${token}"`);
      const duration: Duration = { type, dots: (m[3] ?? "").length as 0 | 1 | 2 };
      const id = `${voice}-${events.length + 1}`;
      measureLen += durationTicks(duration);
      if (m[1] === "r") {
        events.push({ id, kind: "rest", duration });
      } else {
        const lyric = m[5];
        events.push({
          id,
          kind: "note",
          pitch: parsePitch(m[1] as string),
          duration,
          ...(m[4] ? { tieToNext: true } : {}),
          ...(lyric ? { lyric } : {}),
        });
      }
    }
    if (ts && measures.length > 1 && tokens.length > 0 && measureLen !== measureTicks(ts)) {
      throw new Error(`Voz ${voice}, compasso ${mi + 1}: soma ${measureLen} ticks, esperado ${measureTicks(ts)}`);
    }
  });
  return events;
}

export function parseKey(text: string): Key {
  const m = /^([A-G])(#|b)?(m)?$/.exec(text.trim());
  if (!m) throw new Error(`Tonalidade inválida "${text}"`);
  const alter: Alter = m[2] === "#" ? 1 : m[2] === "b" ? -1 : 0;
  const mode: Mode = m[3] ? "minor" : "major";
  return { tonic: { step: m[1] as Step, alter }, mode };
}

export function parseTimeSignature(text: string): TimeSignature {
  const m = /^(\d+)\/(1|2|4|8|16)$/.exec(text.trim());
  if (!m) throw new Error(`Compasso inválido "${text}"`);
  return { beats: Number(m[1]), beatType: Number(m[2]) as TimeSignature["beatType"] };
}

export interface ScoreTextSpec {
  readonly id: string;
  readonly title: string;
  readonly formation: FormationId;
  readonly key: string;
  readonly time: string;
  readonly tempo?: number;
  readonly style?: StyleProfileId;
  readonly voices: Partial<Record<VoiceId, string>>;
  readonly notes?: string;
}

/** Constrói uma partitura a partir de texto. O número de compassos é inferido da voz mais longa. */
export function scoreFromText(spec: ScoreTextSpec): Score {
  const ts = parseTimeSignature(spec.time);
  const formation = getFormation(spec.formation);
  const parts = formation.voices.map((v) => {
    const text = spec.voices[v.id];
    if (text === undefined) throw new Error(`Voz ${v.id} ausente em "${spec.title}"`);
    return { voice: v.id, events: parseVoiceText(text, v.id, ts) };
  });
  const longest = Math.max(...parts.map((p) => p.events.reduce((s, e) => s + durationTicks(e.duration), 0)));
  return {
    schemaVersion: 1,
    id: spec.id,
    title: spec.title,
    formation: spec.formation,
    key: parseKey(spec.key),
    timeSignature: ts,
    tempoBpm: spec.tempo ?? 72,
    measureCount: Math.max(1, Math.ceil(longest / measureTicks(ts))),
    parts,
    metadata: { style: spec.style ?? "coral-tradicional", ...(spec.notes ? { notes: spec.notes } : {}) },
  };
}
