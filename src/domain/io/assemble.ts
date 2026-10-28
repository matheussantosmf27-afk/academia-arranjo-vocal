import { type Duration, type DurationType, durationTicks, measureTicks, ticksToDurations } from "../music/duration";
import { type FormationId, FORMATIONS, type VoiceId } from "../music/formations";
import type { Key } from "../music/key";
import { type Pitch, toMidi } from "../music/pitch";
import { parseScore } from "../music/schema";
import type { Articulation, Dynamic, MusicEvent, Score } from "../music/score";
import { normalizeBarlines } from "../music/timeline-ops";

/** Nota (ou pausa, pitch=null) lida de um arquivo externo, em ticks do modelo (PPQ 480). */
export interface RawNote {
  onset: number;
  dur: number;
  pitch: Pitch | null;
  type?: DurationType;
  dots: 0 | 1 | 2;
  tieStart: boolean;
  lyric?: string;
  arts: Articulation[];
  dynamic?: Dynamic;
}

export interface RawLine {
  readonly label: string;
  readonly notes: RawNote[];
}

export interface ImportResult {
  readonly ok: boolean;
  readonly score?: Score;
  readonly warnings: readonly string[];
  readonly errors: readonly string[];
}

export interface AssembleInput {
  readonly title: string;
  readonly key: Key | null;
  readonly timeSignature: Score["timeSignature"] | null;
  readonly tempo: number;
  readonly lines: readonly RawLine[];
  readonly formation?: FormationId;
  readonly warnings: string[];
}

function averageMidi(line: RawLine): number {
  const ps = line.notes.filter((n) => n.pitch).map((n) => toMidi(n.pitch!));
  return ps.reduce((a, b) => a + b, 0) / Math.max(1, ps.length);
}

/**
 * Detecta a formação: nomes de parte explícitos têm prioridade; senão, a voz
 * mais aguda abaixo de G4 em média indica coro masculino (TTBB) e a mais grave
 * acima de A3 em média indica vozes iguais agudas (SSAA).
 */
export function detectFormation(lines: readonly RawLine[]): FormationId {
  const names = lines.map((l) => l.label.toLowerCase()).join(" ");
  if (/(sopr\w*|s) ?(ii|2)\b|(alto|contralto|a) ?(ii|2)\b/.test(names) && !/tenor|bass|baixo/.test(names)) return "SSAA";
  if (/sopr|alto|contralto/.test(names)) return "SATB";
  if (/tenor ?(i|1)\b|t1\b|barít|barit|baixo ?(i|1)|bass ?(i|1)\b/.test(names)) return "TTBB";
  const top = Math.max(...lines.map(averageMidi));
  const bottom = Math.min(...lines.map(averageMidi));
  if (top < 67) return "TTBB";
  // Linha mais grave acima de Sol3 em média: não há baixo real, vozes iguais agudas.
  return bottom >= 57 ? "SSAA" : "SATB";
}

/**
 * Converte quatro linhas monofônicas em Score: ordena da mais aguda para a mais
 * grave, preenche lacunas com pausas, divide figuras não representáveis com
 * ligaduras, completa o último compasso e valida com o schema do domínio.
 */
export function assembleScore(input: AssembleInput): ImportResult {
  const warnings = input.warnings;
  const lineList = input.lines.filter((l) => l.notes.some((n) => n.pitch));
  if (lineList.length !== 4)
    return { ok: false, warnings, errors: [`Foram encontradas ${lineList.length} linhas vocais com notas; são necessárias exatamente 4 (SATB, TTBB ou SSAA).`] };
  const sorted = [...lineList].sort((a, b) => averageMidi(b) - averageMidi(a));
  const formation = input.formation ?? detectFormation(sorted);
  const voices = FORMATIONS[formation].voices.map((v) => v.id);
  const timeSig = input.timeSignature ?? { beats: 4, beatType: 4 };
  if (!input.timeSignature) warnings.push("Fórmula de compasso não encontrada: assumido 4/4.");
  const mt = measureTicks(timeSig);
  const total = Math.max(...sorted.map((l) => Math.max(...l.notes.map((n) => n.onset + n.dur))));
  const measureCount = Math.max(1, Math.ceil(total / mt));
  let idn = 0;
  const id = (v: VoiceId) => `${v}-i${++idn}`;

  const parts = sorted.map((line, i) => {
    const voice = voices[i] as VoiceId;
    const events: MusicEvent[] = [];
    let t = 0;
    const pushRest = (ticks: number) => {
      for (const d of ticksToDurations(ticks)) events.push({ id: id(voice), kind: "rest", duration: d });
    };
    for (const n of [...line.notes].sort((a, b) => a.onset - b.onset)) {
      if (n.dur <= 0) continue;
      if (n.onset < t) {
        warnings.push(`Notas sobrepostas em ${line.label}: a nota que começava antes do fim da anterior foi descartada.`);
        continue;
      }
      if (n.onset > t) pushRest(n.onset - t);
      const exact: Duration | null = n.type && durationTicks({ type: n.type, dots: n.dots }) === n.dur ? { type: n.type, dots: n.dots } : null;
      const durs = exact ? [exact] : ticksToDurations(n.dur);
      durs.forEach((d, k) => {
        const lastPiece = k === durs.length - 1;
        if (!n.pitch) events.push({ id: id(voice), kind: "rest", duration: d });
        else
          events.push({
            id: id(voice),
            kind: "note",
            pitch: n.pitch,
            duration: d,
            ...(!lastPiece || n.tieStart ? { tieToNext: true } : {}),
            ...(k === 0 && n.lyric ? { lyric: n.lyric } : {}),
            ...(k === 0 && n.arts.length ? { articulations: n.arts } : {}),
            ...(k === 0 && n.dynamic ? { dynamic: n.dynamic } : {}),
          });
      });
      t = n.onset + n.dur;
    }
    if (t < measureCount * mt) pushRest(measureCount * mt - t);
    // ligadura pendente no fim da linha não tem destino
    const last = events[events.length - 1];
    if (last?.kind === "note" && last.tieToNext) events[events.length - 1] = { ...last, tieToNext: false };
    return { voice, events };
  });

  if (!input.key) warnings.push("Armadura não encontrada: assumido Dó maior.");
  const candidate = normalizeBarlines({
    schemaVersion: 1,
    id: `importado-${Date.now().toString(36)}`,
    title: (input.title || "Partitura importada").slice(0, 200),
    formation,
    key: input.key ?? { tonic: { step: "C", alter: 0 }, mode: "major" },
    timeSignature: timeSig,
    tempoBpm: Math.max(20, Math.min(300, Math.round(input.tempo))),
    measureCount,
    parts,
    metadata: { style: "coral-tradicional" },
  });
  const valid = parseScore(candidate);
  if (!valid.ok) return { ok: false, warnings, errors: valid.errors };
  return { ok: true, score: valid.score, warnings: [...new Set(warnings)], errors: [] };
}
