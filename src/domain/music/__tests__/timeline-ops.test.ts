import { describe, expect, it } from "vitest";
import { PPQ } from "../duration";
import { CHORALE_SATB_C, CHORALE_TTBB_G } from "../examples";
import { setDynamic, toggleArticulation } from "../operations";
import { formatPitch, parsePitch } from "../pitch";
import { parseScore } from "../schema";
import { type Score, findEvent, partLengthTicks, scoreLengthTicks, voiceTimeline } from "../score";
import { parseKey, scoreFromText } from "../text-notation";
import {
  changeKey,
  eventRange,
  insertAt,
  mergeWithNext,
  normalizeBarlines,
  overwriteRange,
  pasteAt,
  setMeasureCount,
  setTimeSignature,
  splitEvent,
  swapWithNext,
} from "../timeline-ops";

const ids = () => {
  let n = 0;
  return () => `n${++n}`;
};

function assertIntegrity(s: Score) {
  const r = parseScore(s);
  expect(r.ok, r.ok ? "" : r.errors.join("; ")).toBe(true);
  for (const p of s.parts) expect(partLengthTicks(p), p.voice).toBe(scoreLengthTicks(s));
}

const pitches = (s: Score, voice: string) =>
  voiceTimeline(s.parts.find((p) => p.voice === voice)!, s.timeSignature).map((t) =>
    t.event.kind === "note" ? `${formatPitch(t.event.pitch)}:${t.event.duration.type}${".".repeat(t.event.duration.dots)}${t.event.tieToNext ? "~" : ""}` : `r:${t.event.duration.type}${".".repeat(t.event.duration.dots)}`,
  );

describe("inserção e sobrescrita", () => {
  it("insere nota no meio de uma semibreve, dividindo-a em pedaços ligados", () => {
    const s = scoreFromText({ id: "x", title: "x", formation: "SATB", key: "C", time: "4/4", voices: { S: "C5:w", A: "r:w", T: "r:w", B: "r:w" } });
    const { score, eventId } = insertAt(s, "S", PPQ, { type: "q", dots: 0 }, parsePitch("D5"), ids());
    assertIntegrity(score);
    expect(pitches(score, "S")).toEqual(["C5:q", "D5:q", "C5:h"]);
    expect(findEvent(score, eventId)?.event.kind).toBe("note");
  });
  it("sobrescreve atravessando eventos e corta o excesso no fim da voz", () => {
    const s = overwriteRange(CHORALE_SATB_C, "S", 14 * PPQ, [{ id: "z", kind: "note", pitch: parsePitch("E5"), duration: { type: "w", dots: 0 } }], ids());
    assertIntegrity(s);
    expect(pitches(s, "S").slice(-3)).toEqual(["B4:q", "C5:h", "E5:h"]);
  });
  it("remove ligadura que apontaria para conteúdo substituído", () => {
    const s = scoreFromText({ id: "x", title: "x", formation: "SATB", key: "C", time: "4/4", voices: { S: "C5:h~ C5:h", A: "r:w", T: "r:w", B: "r:w" } });
    const r = overwriteRange(s, "S", 2 * PPQ, [{ id: "z", kind: "note", pitch: parsePitch("D5"), duration: { type: "h", dots: 0 } }], ids());
    expect(pitches(r, "S")).toEqual(["C5:h", "D5:h"]);
  });
});

describe("dividir, juntar e mover", () => {
  it("divide e junta de volta", () => {
    const split = splitEvent(CHORALE_SATB_C, "S-13", ids());
    assertIntegrity(split);
    expect(pitches(split, "S").slice(-2)).toEqual(["C5:h", "C5:h"]);
    const merged = mergeWithNext(split, "S-13");
    expect(pitches(merged, "S").slice(-1)).toEqual(["C5:w"]);
  });
  it("divide figura pontuada em pedaços representáveis", () => {
    const s = scoreFromText({ id: "x", title: "x", formation: "SATB", key: "C", time: "3/4", voices: { S: "G4:h.", A: "r:h.", T: "r:h.", B: "r:h." } });
    const r = splitEvent(s, "S-1", ids());
    assertIntegrity(r);
    // 3 tempos → 1½ + 1½: semínima pontuada + semínima pontuada, sem ligadura entre as metades
    expect(pitches(r, "S")).toEqual(["G4:q.", "G4:q."]);
  });
  it("recusa juntar notas diferentes ou soma não representável", () => {
    expect(() => mergeWithNext(CHORALE_SATB_C, "S-1")).toThrow(/mesma altura/);
    const s = scoreFromText({ id: "x", title: "x", formation: "SATB", key: "C", time: "4/4", voices: { S: "C5:h C5:q r:q", A: "r:w", T: "r:w", B: "r:w" } });
    expect(mergeWithNext(s, "S-1").parts[0]!.events[0]!.duration).toEqual({ type: "h", dots: 1 });
  });
  it("troca evento com o seguinte", () => {
    const r = swapWithNext(CHORALE_SATB_C, "S-1");
    expect(pitches(r, "S").slice(0, 2)).toEqual(["F4:q", "G4:q"]);
    assertIntegrity(r);
  });
});

describe("copiar e colar", () => {
  it("cola um trecho do soprano no contralto, com novos IDs", () => {
    const clip = eventRange(CHORALE_SATB_C, "S-1", "S-4")!;
    expect(clip.events).toHaveLength(4);
    const r = pasteAt(CHORALE_SATB_C, "A-5", clip.events, ids());
    assertIntegrity(r);
    expect(pitches(r, "A").slice(4, 8)).toEqual(["G4:q", "F4:q", "G4:q", "G4:q"]);
    const all = r.parts.flatMap((p) => p.events.map((e) => e.id));
    expect(new Set(all).size).toBe(all.length);
  });
  it("não aceita intervalo entre vozes diferentes", () => {
    expect(eventRange(CHORALE_SATB_C, "S-1", "A-2")).toBeNull();
  });
});

describe("estrutura da partitura", () => {
  it("acrescenta e remove compassos", () => {
    const more = setMeasureCount(CHORALE_SATB_C, 6, ids());
    assertIntegrity(more);
    expect(more.measureCount).toBe(6);
    const less = setMeasureCount(CHORALE_SATB_C, 2, ids());
    assertIntegrity(less);
    expect(pitches(less, "S")).toHaveLength(8);
  });
  it("troca 4/4 por 3/4 corrigindo barras com ligaduras", () => {
    const r = setTimeSignature(CHORALE_TTBB_G, { beats: 3, beatType: 4 }, ids());
    assertIntegrity(r);
    expect(r.measureCount).toBe(4);
    // a semibreve final (tempos 9–12) atravessa a barra do 3/4: semínima ligada + mínima pontuada
    expect(pitches(r, "T1").slice(7)).toEqual(["D4:q~", "D4:h."]);
  });
  it("normaliza figuras que atravessam a barra", () => {
    const s = scoreFromText({ id: "x", title: "x", formation: "SATB", key: "C", time: "4/4", voices: { S: "C5:h. C5:h r:h.", A: "r:w r:w", T: "r:w r:w", B: "r:w r:w" } });
    const r = normalizeBarlines(s, ids());
    expect(pitches(r, "S")).toEqual(["C5:h.", "C5:q~", "C5:q", "r:h."]);
  });
  it("transpõe mudando a tonalidade pelo caminho mais curto e preserva a grafia", () => {
    const r = changeKey(CHORALE_SATB_C, parseKey("D"), "transpor");
    expect(pitches(r, "S")[0]).toBe("A4:q");
    expect(pitches(r, "T")[2]).toBe("C♯4:q");
    const down = changeKey(CHORALE_SATB_C, parseKey("A"), "transpor");
    expect(pitches(down, "S")[0]).toBe("E4:q");
    const keep = changeKey(CHORALE_SATB_C, parseKey("F"), "manter");
    expect(keep.parts).toBe(CHORALE_SATB_C.parts);
    expect(() => changeKey(CHORALE_SATB_C, parseKey("Am"), "transpor")).toThrow(/modo/);
  });
});

describe("articulações e dinâmica", () => {
  it("liga e desliga articulação; define e remove dinâmica", () => {
    let s = toggleArticulation(CHORALE_SATB_C, "S-1", "fermata");
    expect(findEvent(s, "S-1")!.event).toMatchObject({ articulations: ["fermata"] });
    s = toggleArticulation(s, "S-1", "fermata");
    expect(findEvent(s, "S-1")!.event).not.toHaveProperty("articulations");
    s = setDynamic(s, "S-1", "mf");
    expect(findEvent(s, "S-1")!.event).toMatchObject({ dynamic: "mf" });
    expect(findEvent(setDynamic(s, "S-1", null), "S-1")!.event).not.toHaveProperty("dynamic");
  });
});
