import { describe, expect, it } from "vitest";
import { CHORALE_SATB_C, CHORALE_TTBB_G } from "../../music/examples";
import { scoreFromText } from "../../music/text-notation";
import { type Score, voiceTimeline } from "../../music/score";
import { toMidi } from "../../music/pitch";
import { exportMusicXml, importMusicXml } from "../musicxml";
import { exportMidi, importMidi } from "../midi";

/** Sequência (onset, midi|rest, ticks, tie) por voz — independe de ids. */
function signature(score: Score) {
  return score.parts.map((p) =>
    voiceTimeline(p, score.timeSignature).map((t) =>
      t.event.kind === "note" ? `${t.onset}:${toMidi(t.event.pitch)}${t.event.tieToNext ? "~" : ""}:${t.event.lyric ?? ""}` : `${t.onset}:r`,
    ),
  );
}

const RICH = scoreFromText({
  id: "rico",
  title: "Teste & <ida>",
  formation: "SATB",
  key: "Eb",
  time: "3/4",
  tempo: 84,
  voices: {
    S: 'G4:h."Glo- | G4:q~ G4:q Ab4:q"ri- | Bb4:h."a',
    A: "Eb4:h. | Eb4:h D4:q | Eb4:h.",
    T: "Bb3:q r:q Bb3:q | Bb3:h Bb3:q | G3:h.",
    B: "Eb3:h. | Eb3:h Bb2:q | Eb3:h.",
  },
});

describe("MusicXML", () => {
  it.each([CHORALE_SATB_C, CHORALE_TTBB_G, RICH])("ida e volta preserva alturas, ritmo, ligaduras e letra ($title)", (score) => {
    const xml = exportMusicXml(score);
    const back = importMusicXml(xml);
    expect(back.errors).toEqual([]);
    expect(back.ok).toBe(true);
    const s = back.score!;
    expect(s.formation).toBe(score.formation);
    expect(s.key).toEqual(score.key);
    expect(s.timeSignature).toEqual(score.timeSignature);
    expect(s.tempoBpm).toBe(score.tempoBpm);
    expect(s.title).toBe(score.title);
    expect(signature(s)).toEqual(signature(score));
  });

  it("exporta tenor com clave oitavada e escapa texto", () => {
    expect(exportMusicXml(CHORALE_TTBB_G)).toContain("<clef-octave-change>-1</clef-octave-change>");
    const xml = exportMusicXml(RICH);
    expect(xml).toContain("Teste &amp; &lt;ida&gt;");
    expect(xml).toContain("<divisions>480</divisions>");
    expect(xml).toContain("<fifths>-3</fifths>");
  });

  it("importa partitura com duas vozes por pauta (backup)", () => {
    const n = (step: string, oct: number, voice: number) => `<note><pitch><step>${step}</step><octave>${oct}</octave></pitch><duration>4</duration><voice>${voice}</voice><type>whole</type></note>`;
    const xml = `<?xml version="1.0"?><score-partwise version="4.0"><part-list><score-part id="P1"><part-name>Soprano Alto</part-name></score-part><score-part id="P2"><part-name>Tenor Baixo</part-name></score-part></part-list>
      <part id="P1"><measure number="1"><attributes><divisions>1</divisions><key><fifths>0</fifths></key><time><beats>4</beats><beat-type>4</beat-type></time></attributes>${n("E", 5, 1)}<backup><duration>4</duration></backup>${n("G", 4, 2)}</measure></part>
      <part id="P2"><measure number="1">${n("C", 4, 1)}<backup><duration>4</duration></backup>${n("C", 3, 2)}</measure></part></score-partwise>`;
    const r = importMusicXml(xml);
    expect(r.errors).toEqual([]);
    expect(r.score!.formation).toBe("SATB");
    expect(r.score!.parts.map((p) => p.events[0]!.kind === "note" && toMidi(p.events[0]!.pitch))).toEqual([76, 67, 60, 48]);
  });

  it("recusa quiálteras e arquivos que não são partwise", () => {
    expect(importMusicXml("<score-timewise/>").ok).toBe(false);
    expect(importMusicXml("isto não é xml").ok).toBe(false);
    const xml = `<score-partwise><part-list/><part id="P1"><measure number="1"><attributes><divisions>3</divisions></attributes><note><pitch><step>C</step><octave>4</octave></pitch><duration>1</duration><voice>1</voice><time-modification><actual-notes>3</actual-notes><normal-notes>2</normal-notes></time-modification></note></measure></part></score-partwise>`;
    const r = importMusicXml(xml);
    expect(r.ok).toBe(false);
    expect(r.errors.join(" ")).toMatch(/Quiálteras/);
  });
});

describe("MIDI", () => {
  it.each([CHORALE_SATB_C, CHORALE_TTBB_G, RICH])("ida e volta preserva alturas, ritmo, armadura e andamento ($title)", (score) => {
    const bytes = exportMidi(score);
    expect(String.fromCharCode(...bytes.slice(0, 4))).toBe("MThd");
    const back = importMidi(bytes);
    expect(back.errors).toEqual([]);
    const s = back.score!;
    expect(s.formation).toBe(score.formation);
    expect(s.key).toEqual(score.key);
    expect(s.timeSignature).toEqual(score.timeSignature);
    expect(s.tempoBpm).toBe(score.tempoBpm);
    // MIDI não carrega letra nem distingue nota ligada de nota longa: compara os ataques
    const attacks = (sc: Score) =>
      sc.parts.map((p) => {
        const tl = voiceTimeline(p, sc.timeSignature);
        return tl.flatMap((t, i) => (t.event.kind === "note" && !(tl[i - 1]?.event.kind === "note" && (tl[i - 1]!.event as { tieToNext?: boolean }).tieToNext) ? [`${t.onset}:${toMidi(t.event.pitch)}`] : []));
      });
    expect(attacks(s)).toEqual(attacks(score));
  });

  it("grafa alturas pela armadura (Mi♭ maior usa bemóis)", () => {
    const s = importMidi(exportMidi(RICH)).score!;
    const first = s.parts[0]!.events[0]!;
    expect(first.kind === "note" && first.pitch).toEqual({ step: "G", alter: 0, octave: 4 });
    const ab = s.parts[0]!.events.find((e) => e.kind === "note" && e.pitch.step === "A");
    expect(ab && ab.kind === "note" && ab.pitch.alter).toBe(-1);
  });

  it("recusa bytes inválidos", () => {
    expect(importMidi(new Uint8Array([1, 2, 3])).ok).toBe(false);
  });
});
