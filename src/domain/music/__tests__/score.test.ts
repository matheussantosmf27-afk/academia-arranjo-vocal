import { describe, expect, it } from "vitest";
import { computeDisplayedAccidentals } from "../accidentals";
import { CHORALE_SATB_C, CHORALE_SSAA_G, CHORALE_TTBB_G, EXAMPLE_SCORES } from "../examples";
import { clefOctaveShift, getFormation, soundingPitch, writtenPitch } from "../formations";
import { canRedo, canUndo, createHistory, pushHistory, redo, undo } from "../history";
import { emptyScore, setDuration, setLyric, toggleTie, transposeEventDiatonic } from "../operations";
import { formatPitch, parsePitch } from "../pitch";
import { parseScore } from "../schema";
import { findEvent, partLengthTicks, scoreLengthTicks, sonorities } from "../score";
import { parseVoiceText, parseKey } from "../text-notation";

const ids = () => {
  let n = 0;
  return () => `t${++n}`;
};

describe("modelo de partitura", () => {
  it("todas as vozes dos exemplos preenchem a partitura", () => {
    for (const s of EXAMPLE_SCORES) {
      for (const p of s.parts) expect(partLengthTicks(p)).toBe(scoreLengthTicks(s));
    }
  });
  it("calcula sonoridades verticais com posição métrica", () => {
    const ss = sonorities(CHORALE_SATB_C);
    expect(ss).toHaveLength(13);
    expect(ss[4]).toMatchObject({ measure: 2, beat: 1 });
  });
  it("tenores em clave de sol oitavada: escrita = sonora + 1 oitava", () => {
    expect(clefOctaveShift("treble8vb")).toBe(1);
    const sounding = parsePitch("D4");
    const written = writtenPitch(sounding, "treble8vb");
    expect(formatPitch(written)).toBe("D5");
    expect(soundingPitch(written, "treble8vb")).toEqual(sounding);
    expect(writtenPitch(sounding, "bass")).toEqual(sounding);
  });
  it("o exemplo SSAA usa as vozes femininas na ordem, com duas pautas em clave de sol", () => {
    expect(CHORALE_SSAA_G.parts.map((p) => p.voice)).toEqual(["S1", "S2", "A1", "A2"]);
    expect(getFormation("SSAA").staves.map((st) => st.clef)).toEqual(["treble", "treble"]);
  });
  it("o exemplo TTBB usa as vozes masculinas na ordem", () => {
    expect(CHORALE_TTBB_G.parts.map((p) => p.voice)).toEqual(["T1", "T2", "B1", "B2"]);
  });
  it("rejeita compasso com soma errada na notação textual", () => {
    expect(() => parseVoiceText("C4:q D4:q | E4:w", "S", { beats: 4, beatType: 4 })).toThrow(/compasso 1/);
  });
});

describe("validação estrutural (Zod)", () => {
  it("aceita os exemplos", () => {
    for (const s of EXAMPLE_SCORES) expect(parseScore(JSON.parse(JSON.stringify(s))).ok).toBe(true);
  });
  it("rejeita vozes fora de ordem, IDs duplicados e dados inválidos", () => {
    const bad = JSON.parse(JSON.stringify(CHORALE_SATB_C));
    bad.parts.reverse();
    bad.parts[0].events[1].id = bad.parts[0].events[0].id;
    bad.tempoBpm = 1000;
    const r = parseScore(bad);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.join("\n")).toMatch(/tempoBpm/);
    }
    const r2 = parseScore({ ...CHORALE_SATB_C, parts: [...CHORALE_SATB_C.parts].reverse() });
    expect(r2.ok).toBe(false);
  });
});

describe("operações de edição", () => {
  it("move uma nota por grau da escala", () => {
    const s = transposeEventDiatonic(CHORALE_SATB_C, "S-1", 1);
    const e = findEvent(s, "S-1")!.event;
    expect(e.kind === "note" && formatPitch(e.pitch)).toBe("A4");
    expect(findEvent(CHORALE_SATB_C, "S-1")!.event).not.toBe(e); // imutável
  });
  it("encurtar uma nota insere pausa e mantém o comprimento da voz", () => {
    const s = setDuration(CHORALE_SATB_C, "S-13", { type: "h", dots: 0 }, ids());
    const part = s.parts[0]!;
    expect(partLengthTicks(part)).toBe(scoreLengthTicks(s));
    expect(part.events.at(-1)).toMatchObject({ kind: "rest", duration: { type: "h" } });
  });
  it("alongar uma nota consome os eventos seguintes", () => {
    const s = setDuration(CHORALE_SATB_C, "S-1", { type: "h", dots: 1 }, ids());
    const part = s.parts[0]!;
    expect(partLengthTicks(part)).toBe(scoreLengthTicks(s));
    expect(part.events[1]!.id).toBe("S-4");
  });
  it("recusa duração que ultrapassa o fim da voz", () => {
    expect(() => setDuration(CHORALE_SATB_C, "S-13", { type: "w", dots: 1 }, ids())).toThrow();
  });
  it("ligadura e letra", () => {
    let s = toggleTie(CHORALE_SATB_C, "S-3");
    s = setLyric(s, "S-3", "  Ale-  ");
    const e = findEvent(s, "S-3")!.event;
    expect(e).toMatchObject({ tieToNext: true, lyric: "Ale-" });
    expect(findEvent(setLyric(s, "S-3", ""), "S-3")!.event).not.toHaveProperty("lyric");
  });
  it("cria partitura vazia com pausas de compasso", () => {
    const s = emptyScore({
      id: "x",
      title: "Novo",
      formation: "TTBB",
      key: parseKey("Bb"),
      timeSignature: { beats: 3, beatType: 4 },
      tempoBpm: 80,
      measureCount: 4,
      voices: ["T1", "T2", "B1", "B2"],
      idFactory: ids(),
    });
    expect(parseScore(s).ok).toBe(true);
    for (const p of s.parts) expect(partLengthTicks(p)).toBe(scoreLengthTicks(s));
  });
});

describe("histórico desfazer/refazer", () => {
  it("desfaz e refaz na ordem correta", () => {
    let h = createHistory(1);
    h = pushHistory(h, 2);
    h = pushHistory(h, 3);
    expect(canUndo(h)).toBe(true);
    h = undo(h);
    expect(h.present).toBe(2);
    expect(canRedo(h)).toBe(true);
    h = redo(h);
    expect(h.present).toBe(3);
    h = undo(undo(h));
    h = pushHistory(h, 9);
    expect(h.future).toHaveLength(0);
    expect(undo(createHistory(0)).present).toBe(0);
  });
});

describe("acidentes de exibição", () => {
  const n = (id: string, onset: number, measure: number, p: string, tiedFromPrevious = false) => ({
    id,
    onset,
    measure,
    pitch: parsePitch(p),
    tiedFromPrevious,
  });
  it("respeita armadura e validade no compasso", () => {
    const r = computeDisplayedAccidentals(
      [n("a", 0, 1, "F#4"), n("b", 1, 1, "F#4"), n("c", 2, 1, "F4"), n("d", 3, 1, "F#5"), n("e", 4, 2, "F#4")],
      0,
    );
    expect([...r.values()]).toEqual([1, null, 0, 1, 1]);
  });
  it("em Ré maior, F♯ não leva acidente e F natural leva bequadro", () => {
    const r = computeDisplayedAccidentals([n("a", 0, 1, "F#4"), n("b", 1, 1, "F4")], 2);
    expect(r.get("a")).toBeNull();
    expect(r.get("b")).toBe(0);
  });
  it("nota ligada através da barra não repete o acidente, mas a próxima repete", () => {
    const r = computeDisplayedAccidentals([n("a", 0, 1, "C#4"), n("b", 10, 2, "C#4", true), n("c", 11, 2, "C#4")], 0);
    expect(r.get("b")).toBeNull();
    expect(r.get("c")).toBe(1);
  });
});
