import { DOMParser } from "@xmldom/xmldom";
import { computeDisplayedAccidentals } from "../music/accidentals";
import { type DurationType, PPQ, durationTicks, measureTicks } from "../music/duration";
import { type FormationId, getFormation, staffOfVoice, writtenPitch } from "../music/formations";
import { type Key, keyFifths } from "../music/key";
import { type Alter, type Pitch, type Step, STEPS, isAlter } from "../music/pitch";
import { type Articulation, type Dynamic, type Score, voiceTimeline } from "../music/score";
import { normalizeBarlines } from "../music/timeline-ops";
import { type ImportResult, type RawLine, assembleScore } from "./assemble";

export type { ImportResult } from "./assemble";

/**
 * MusicXML 4.0 (score-partwise). Exporta uma parte por voz — o formato mais
 * compatível para corais (MuseScore, Finale, Sibelius, Dorico). Convenções:
 * - divisions = 480 (PPQ do modelo);
 * - <pitch> é a altura SONORA; tenores usam clave de sol com <clef-octave-change>-1
 *   (é a convenção do MusicXML para claves oitavadas);
 * - figuras que atravessariam a barra são divididas com ligaduras antes de exportar.
 */
const TYPE_XML: Record<DurationType, string> = { w: "whole", h: "half", q: "quarter", "8": "eighth", "16": "16th" };
const XML_TYPE: Record<string, DurationType> = { whole: "w", half: "h", quarter: "q", eighth: "8", "16th": "16" };
const ACC_XML: Record<Alter, string> = { [-2]: "flat-flat", [-1]: "flat", 0: "natural", 1: "sharp", 2: "double-sharp" };

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function exportMusicXml(input: Score): string {
  const score = normalizeBarlines(input);
  const formation = getFormation(score.formation);
  const mt = measureTicks(score.timeSignature);
  const fifths = keyFifths(score.key);
  const out: string[] = [];
  out.push('<?xml version="1.0" encoding="UTF-8" standalone="no"?>');
  out.push('<!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 4.0 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd">');
  out.push('<score-partwise version="4.0">');
  out.push(`  <work><work-title>${esc(score.title)}</work-title></work>`);
  out.push("  <identification>");
  if (score.metadata.arranger) out.push(`    <creator type="arranger">${esc(score.metadata.arranger)}</creator>`);
  if (score.metadata.composer) out.push(`    <creator type="composer">${esc(score.metadata.composer)}</creator>`);
  out.push("    <encoding><software>Academia de Arranjo Vocal</software></encoding>");
  out.push("  </identification>");
  out.push("  <part-list>");
  formation.voices.forEach((v, i) => out.push(`    <score-part id="P${i + 1}"><part-name>${esc(v.name)}</part-name><part-abbreviation>${esc(v.shortName)}</part-abbreviation></score-part>`));
  out.push("  </part-list>");

  formation.voices.forEach((spec, pi) => {
    const part = score.parts.find((p) => p.voice === spec.id)!;
    const clef = staffOfVoice(score.formation, spec.id).clef;
    const tl = voiceTimeline(part, score.timeSignature);
    const acc = computeDisplayedAccidentals(
      tl.flatMap((t, i) =>
        t.event.kind === "note"
          ? [{ id: t.event.id, onset: t.onset, measure: Math.floor(t.onset / mt), pitch: writtenPitch(t.event.pitch, clef), tiedFromPrevious: !!(tl[i - 1]?.event.kind === "note" && (tl[i - 1]!.event as { tieToNext?: boolean }).tieToNext) }]
          : [],
      ),
      fifths,
    );
    out.push(`  <part id="P${pi + 1}">`);
    for (let m = 0; m < score.measureCount; m++) {
      out.push(`    <measure number="${m + 1}">`);
      if (m === 0) {
        out.push("      <attributes>");
        out.push(`        <divisions>${PPQ}</divisions>`);
        out.push(`        <key><fifths>${fifths}</fifths><mode>${score.key.mode}</mode></key>`);
        out.push(`        <time><beats>${score.timeSignature.beats}</beats><beat-type>${score.timeSignature.beatType}</beat-type></time>`);
        out.push(clef === "bass" ? "        <clef><sign>F</sign><line>4</line></clef>" : `        <clef><sign>G</sign><line>2</line>${clef === "treble8vb" ? "<clef-octave-change>-1</clef-octave-change>" : ""}</clef>`);
        out.push("      </attributes>");
        if (pi === 0) out.push(`      <direction placement="above"><direction-type><metronome><beat-unit>quarter</beat-unit><per-minute>${score.tempoBpm}</per-minute></metronome></direction-type><sound tempo="${score.tempoBpm}"/></direction>`);
      }
      const inMeasure = tl.filter((t) => Math.floor(t.onset / mt) === m);
      inMeasure.forEach((t) => {
        const e = t.event;
        if (e.kind === "note" && e.dynamic) out.push(`      <direction placement="below"><direction-type><dynamics><${e.dynamic}/></dynamics></direction-type></direction>`);
        const prev = tl[t.index - 1]?.event;
        const tiedFrom = prev?.kind === "note" && !!prev.tieToNext;
        const lines: string[] = [];
        if (e.kind === "rest") {
          const whole = durationTicks(e.duration) === mt;
          lines.push(whole ? '<rest measure="yes"/>' : "<rest/>");
        } else {
          lines.push(`<pitch><step>${e.pitch.step}</step>${e.pitch.alter ? `<alter>${e.pitch.alter}</alter>` : ""}<octave>${e.pitch.octave}</octave></pitch>`);
        }
        lines.push(`<duration>${durationTicks(e.duration)}</duration>`);
        if (e.kind === "note") {
          if (tiedFrom) lines.push('<tie type="stop"/>');
          if (e.tieToNext) lines.push('<tie type="start"/>');
        }
        lines.push("<voice>1</voice>");
        const isWholeRest = e.kind === "rest" && durationTicks(e.duration) === mt;
        if (!isWholeRest) lines.push(`<type>${TYPE_XML[e.duration.type]}</type>`);
        for (let d = 0; d < e.duration.dots; d++) lines.push("<dot/>");
        if (e.kind === "note") {
          const a = acc.get(e.id);
          if (a !== null && a !== undefined) lines.push(`<accidental>${ACC_XML[a]}</accidental>`);
          lines.push(`<stem>${spec.stem === 1 ? "up" : "down"}</stem>`);
          const nots: string[] = [];
          if (tiedFrom) nots.push('<tied type="stop"/>');
          if (e.tieToNext) nots.push('<tied type="start"/>');
          const arts = (e.articulations ?? []).filter((x) => x !== "fermata");
          if (arts.length) nots.push(`<articulations>${arts.map((x) => `<${x === "accent" ? "accent" : x}/>`).join("")}</articulations>`);
          if (e.articulations?.includes("fermata")) nots.push('<fermata type="upright"/>');
          if (nots.length) lines.push(`<notations>${nots.join("")}</notations>`);
          if (e.lyric) {
            const text = e.lyric.replace(/-$/, "");
            const prevNote = [...tl.slice(0, t.index)].reverse().find((x) => x.event.kind === "note" && x.event.lyric);
            const continues = !!prevNote && prevNote.event.kind === "note" && !!prevNote.event.lyric?.endsWith("-");
            const syllabic = e.lyric.endsWith("-") ? (continues ? "middle" : "begin") : continues ? "end" : "single";
            lines.push(`<lyric number="1"><syllabic>${syllabic}</syllabic><text>${esc(text)}</text></lyric>`);
          }
        }
        out.push(`      <note>${lines.join("")}</note>`);
      });
      if (m === score.measureCount - 1) out.push('      <barline location="right"><bar-style>light-heavy</bar-style></barline>');
      out.push("    </measure>");
    }
    out.push("  </part>");
  });
  out.push("</score-partwise>");
  return out.join("\n");
}

const childText = (el: Element, name: string): string | null => {
  const c = el.getElementsByTagName(name)[0];
  return c?.textContent?.trim() ?? null;
};
const children = (el: Element, name: string): Element[] => Array.from(el.childNodes).filter((n): n is Element => n.nodeType === 1 && (n as Element).nodeName === name);

export function keyFromFifths(fifths: number, mode: string): Key {
  const majors: Array<[Step, Alter]> = [["C", -1], ["G", -1], ["D", -1], ["A", -1], ["E", -1], ["B", -1], ["F", 0], ["C", 0], ["G", 0], ["D", 0], ["A", 0], ["E", 0], ["B", 0], ["F", 1], ["C", 1]];
  const minors: Array<[Step, Alter]> = [["A", -1], ["E", -1], ["B", -1], ["F", 0], ["C", 0], ["G", 0], ["D", 0], ["A", 0], ["E", 0], ["B", 0], ["F", 1], ["C", 1], ["G", 1], ["D", 1], ["A", 1]];
  const [step, alter] = (mode === "minor" ? minors : majors)[Math.max(0, Math.min(14, fifths + 7))]!;
  return { tonic: { step, alter }, mode: mode === "minor" ? "minor" : "major" };
}

/**
 * Importa MusicXML partwise. Aceita (a) quatro partes com uma voz cada ou
 * (b) partes com duas vozes (<voice>) — como a redução em duas pautas de hinários.
 * Quiálteras e acordes dentro de uma voz não são suportados: o importador avisa
 * em vez de inventar dados.
 */
export function importMusicXml(xml: string, opts: { formation?: FormationId } = {}): ImportResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  let doc: Document;
  try {
    doc = new DOMParser({ onError: () => undefined }).parseFromString(xml, "text/xml") as unknown as Document;
  } catch {
    return { ok: false, warnings, errors: ["XML inválido."] };
  }
  const root = doc.documentElement;
  if (!root || root.nodeName !== "score-partwise") return { ok: false, warnings, errors: ["Apenas MusicXML 'score-partwise' é suportado (exporte como MusicXML não comprimido, .musicxml/.xml)."] };
  const title = childText(root, "work-title") ?? childText(root, "movement-title") ?? "Partitura importada";
  const partNames = new Map<string, string>();
  for (const sp of Array.from(root.getElementsByTagName("score-part"))) partNames.set(sp.getAttribute("id") ?? "", childText(sp, "part-name") ?? "");

  let divisions = 1;
  let key: Key | null = null;
  let ts: Score["timeSignature"] | null = null;
  let tempo = 72;
  /** Linhas monofônicas encontradas: (parte, voz) → notas. */
  const lines = new Map<string, RawLine>();

  for (const part of children(root, "part")) {
    const pid = part.getAttribute("id") ?? "";
    let pos = 0;
    let measureStart = 0;
    let pendingDynamic: Dynamic | undefined;
    for (const measure of children(part, "measure")) {
      let maxPos = measureStart;
      pos = measureStart;
      for (const el of Array.from(measure.childNodes).filter((n): n is Element => n.nodeType === 1)) {
        if (el.nodeName === "attributes") {
          const div = childText(el, "divisions");
          if (div) divisions = Number(div);
          const f = childText(el, "fifths");
          if (f !== null && !key) key = keyFromFifths(Number(f), childText(el, "mode") ?? "major");
          const b = childText(el, "beats");
          const bt = childText(el, "beat-type");
          if (b && bt && !ts) ts = { beats: Number(b), beatType: Number(bt) as Score["timeSignature"]["beatType"] };
        } else if (el.nodeName === "direction") {
          const sound = el.getElementsByTagName("sound")[0];
          if (sound?.getAttribute("tempo")) tempo = Math.round(Number(sound.getAttribute("tempo")));
          const dyn = el.getElementsByTagName("dynamics")[0];
          const dname = dyn ? Array.from(dyn.childNodes).find((n) => n.nodeType === 1)?.nodeName : undefined;
          if (dname && ["pp", "p", "mp", "mf", "f", "ff"].includes(dname)) pendingDynamic = dname as Dynamic;
        } else if (el.nodeName === "backup") {
          pos -= Math.round((Number(childText(el, "duration")) / divisions) * PPQ);
        } else if (el.nodeName === "forward") {
          pos += Math.round((Number(childText(el, "duration")) / divisions) * PPQ);
        } else if (el.nodeName === "note") {
          if (el.getElementsByTagName("grace").length) {
            warnings.push("Apojaturas breves (grace notes) foram ignoradas.");
            continue;
          }
          const isChord = el.getElementsByTagName("chord").length > 0;
          const dur = Math.round((Number(childText(el, "duration") ?? 0) / divisions) * PPQ);
          const voice = childText(el, "voice") ?? "1";
          const staff = childText(el, "staff") ?? "1";
          const lineKey = `${pid}|${staff}|${voice}`;
          if (!lines.has(lineKey)) lines.set(lineKey, { label: `${partNames.get(pid) || pid} (pauta ${staff}, voz ${voice})`, notes: [] });
          const line = lines.get(lineKey)!;
          if (el.getElementsByTagName("time-modification").length) errors.push(`Quiálteras não são suportadas (${line.label}, compasso ${measure.getAttribute("number")}).`);
          const pitchEl = el.getElementsByTagName("pitch")[0];
          let pitch: Pitch | null = null;
          if (pitchEl) {
            const step = childText(pitchEl, "step") as Step;
            const alter = Number(childText(pitchEl, "alter") ?? 0);
            const octave = Number(childText(pitchEl, "octave"));
            if (!STEPS.includes(step) || !isAlter(alter) || !Number.isFinite(octave)) {
              errors.push(`Altura inválida em ${line.label}.`);
              continue;
            }
            pitch = { step, alter, octave };
          }
          if (isChord) {
            // nota de acorde dentro da mesma voz: mantém a mais aguda
            const last = line.notes[line.notes.length - 1];
            if (last && last.pitch && pitch && pitch.octave * 12 + STEPS.indexOf(pitch.step) > last.pitch.octave * 12 + STEPS.indexOf(last.pitch.step)) last.pitch = pitch;
            warnings.push(`Acorde dentro de uma voz (${line.label}): mantida a nota mais aguda.`);
            continue;
          }
          const typeName = childText(el, "type");
          const dots = Math.min(2, el.getElementsByTagName("dot").length) as 0 | 1 | 2;
          const ties = Array.from(el.getElementsByTagName("tie"));
          const notations = el.getElementsByTagName("notations")[0];
          const arts: Articulation[] = [];
          if (notations) {
            for (const a of ["staccato", "accent", "tenuto"] as const) if (notations.getElementsByTagName(a).length) arts.push(a);
            if (notations.getElementsByTagName("fermata").length) arts.push("fermata");
          }
          const lyricEl = el.getElementsByTagName("lyric")[0];
          let lyric: string | undefined;
          if (lyricEl) {
            const text = childText(lyricEl, "text") ?? "";
            const syl = childText(lyricEl, "syllabic");
            lyric = syl === "begin" || syl === "middle" ? `${text}-` : text;
          }
          line.notes.push({
            onset: pos,
            dur,
            pitch,
            ...(typeName && XML_TYPE[typeName] ? { type: XML_TYPE[typeName] } : {}),
            dots,
            tieStart: ties.some((t) => t.getAttribute("type") === "start"),
            ...(lyric ? { lyric: lyric.slice(0, 64) } : {}),
            arts,
            ...(pitch && pendingDynamic ? { dynamic: pendingDynamic } : {}),
          });
          if (pitch && pendingDynamic) pendingDynamic = undefined;
          pos += dur;
          maxPos = Math.max(maxPos, pos);
        }
      }
      measureStart = Math.max(maxPos, measureStart);
    }
  }
  if (errors.length) return { ok: false, warnings: [...new Set(warnings)], errors: [...new Set(errors)] };
  return assembleScore({ title, key, timeSignature: ts, tempo, lines: [...lines.values()], ...(opts.formation ? { formation: opts.formation } : {}), warnings });
}
