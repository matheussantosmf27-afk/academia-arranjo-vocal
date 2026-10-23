import { describe, expect, it } from "vitest";
import { describeChordPt, identifyChord, romanNumeral } from "../chord";
import { durationTicks, measureTicks, metricPosition, PPQ, ticksToDurations } from "../duration";
import { intervalBetween, intervalNamePt, intervalShortPt, transposeByInterval } from "../interval";
import { isLeadingTone, keyFifths, keySignatureAlters, leadingTone, moveChromatic, moveDiatonic, scale, spellInKey } from "../key";
import { formatPitch, formatPitchPt, parsePitch, pitchFromMidi, toMidi } from "../pitch";
import { parseKey } from "../text-notation";

const P = parsePitch;

describe("alturas e convenção MIDI", () => {
  it("usa C4 = 60 e A4 = 69", () => {
    expect(toMidi(P("C4"))).toBe(60);
    expect(toMidi(P("A4"))).toBe(69);
    expect(toMidi(P("E2"))).toBe(40);
  });
  it("a oitava acompanha a letra (B#3 = C4, Cb4 = B3)", () => {
    expect(toMidi(P("B#3"))).toBe(60);
    expect(toMidi(P("Cb4"))).toBe(59);
  });
  it("faz parse e formatação em português", () => {
    expect(formatPitch(P("F#4"))).toBe("F♯4");
    expect(formatPitchPt(P("Bb3"))).toBe("Si♭3");
    expect(() => P("H4")).toThrow();
    expect(P("Ebb5")).toEqual({ step: "E", alter: -2, octave: 5 });
  });
  it("grafa MIDI com sustenidos ou bemóis", () => {
    expect(formatPitch(pitchFromMidi(61))).toBe("C♯4");
    expect(formatPitch(pitchFromMidi(61, true))).toBe("D♭4");
  });
});

describe("intervalos grafados", () => {
  const cases: Array<[string, string, string]> = [
    ["C4", "G4", "5J"],
    ["C4", "E4", "3M"],
    ["C4", "Eb4", "3m"],
    ["F4", "B4", "4A"],
    ["B3", "F4", "5d"],
    ["C4", "C5", "8J"],
    ["C3", "G4", "12J"],
    ["C4", "E5", "10M"],
    ["F4", "G#4", "2A"],
    ["E4", "D5", "7m"],
    ["C4", "C#4", "1A"],
    ["C4", "C4", "1J"],
  ];
  it.each(cases)("%s → %s = %s", (a, b, expected) => {
    expect(intervalShortPt(intervalBetween(P(a), P(b)))).toBe(expected);
  });
  it("distingue enarmonia: 4ª aumentada ≠ 5ª diminuta", () => {
    expect(intervalNamePt(intervalBetween(P("C4"), P("F#4")))).toBe("4ª aumentada");
    expect(intervalNamePt(intervalBetween(P("C4"), P("Gb4")))).toBe("5ª diminuta");
  });
  it("calcula direção descendente", () => {
    const i = intervalBetween(P("G4"), P("C4"));
    expect(i.direction).toBe(-1);
    expect(intervalShortPt(i)).toBe("5J");
  });
  it("transpõe por intervalo preservando grafia", () => {
    expect(formatPitch(transposeByInterval(P("C4"), 3, "M", 1))).toBe("E4");
    expect(formatPitch(transposeByInterval(P("E4"), 3, "m", -1))).toBe("C♯4");
    expect(formatPitch(transposeByInterval(P("Bb3"), 5, "P", 1))).toBe("F4");
  });
});

describe("tonalidades e escalas", () => {
  it("calcula armaduras", () => {
    expect(keyFifths(parseKey("C"))).toBe(0);
    expect(keyFifths(parseKey("G"))).toBe(1);
    expect(keyFifths(parseKey("Bb"))).toBe(-2);
    expect(keyFifths(parseKey("F#"))).toBe(6);
    expect(keyFifths(parseKey("Am"))).toBe(0);
    expect(keyFifths(parseKey("Cm"))).toBe(-3);
    expect(keyFifths(parseKey("C#m"))).toBe(4);
    expect(keySignatureAlters(-2)).toMatchObject({ B: -1, E: -1, A: 0 });
  });
  it("monta escalas maior e menor (natural, harmônica, melódica)", () => {
    const fmt = (pcs: ReturnType<typeof scale>) => pcs.map((p) => `${p.step}${p.alter === 1 ? "#" : p.alter === -1 ? "b" : ""}`).join(" ");
    expect(fmt(scale(parseKey("D")))).toBe("D E F# G A B C#");
    expect(fmt(scale(parseKey("Am"), "harmonic"))).toBe("A B C D E F G#");
    expect(fmt(scale(parseKey("Am"), "melodic"))).toBe("A B C D E F# G#");
    expect(fmt(scale(parseKey("Eb")))).toBe("Eb F G Ab Bb C D");
  });
  it("identifica a sensível (7º grau elevado em menor)", () => {
    expect(leadingTone(parseKey("Dm"))).toEqual({ step: "C", alter: 1 });
    expect(isLeadingTone({ step: "B", alter: 0 }, parseKey("C"))).toBe(true);
    expect(isLeadingTone({ step: "G", alter: 0 }, parseKey("Am"))).toBe(false);
  });
  it("grafa alturas de acordo com a tonalidade", () => {
    expect(formatPitch(spellInKey(70, parseKey("F")))).toBe("B♭4");
    expect(formatPitch(spellInKey(68, parseKey("Am")))).toBe("G♯4");
    expect(formatPitch(spellInKey(60, parseKey("C#m")))).toBe("B♯3");
  });
  it("move notas diatonicamente e cromaticamente", () => {
    expect(formatPitch(moveDiatonic(P("E4"), 1, parseKey("D")))).toBe("F♯4");
    expect(formatPitch(moveDiatonic(P("C4"), -1, parseKey("C")))).toBe("B3");
    expect(formatPitch(moveChromatic(P("F#4"), 1))).toBe("G4");
    expect(formatPitch(moveChromatic(P("Bb4"), -1))).toBe("A4");
  });
});

describe("identificação de acordes", () => {
  const chord = (...ps: string[]) => identifyChord(ps.map(P));
  it("tríades e inversões", () => {
    expect(chord("C3", "G3", "E4", "C5")).toMatchObject({ quality: "major", inversion: 0, root: { step: "C" } });
    expect(chord("E3", "G3", "C4", "G4")).toMatchObject({ quality: "major", inversion: 1 });
    expect(chord("G2", "C4", "E4", "G4")).toMatchObject({ quality: "major", inversion: 2 });
    expect(chord("B2", "D4", "F4", "B4")).toMatchObject({ quality: "diminished" });
  });
  it("tétrades, incluindo quinta omitida", () => {
    expect(chord("G2", "B3", "D4", "F4")).toMatchObject({ quality: "dominant7", inversion: 0 });
    expect(chord("F3", "G3", "B3", "D4")).toMatchObject({ quality: "dominant7", inversion: 3 });
    expect(chord("G2", "F3", "B3", "G4")).toMatchObject({ quality: "dominant7", missing: ["fifth"] });
    expect(chord("B2", "D3", "F3", "A3")).toMatchObject({ quality: "halfDiminished7" });
    expect(chord("G#3", "B3", "D4", "F4")).toMatchObject({ quality: "diminished7" });
  });
  it("não força leitura de sonoridades não tercianas", () => {
    expect(chord("C3", "D4", "G4", "C5")).toBeNull();
    expect(chord("C4", "C5")).toBeNull();
  });
  it("gera cifragem romana em maior e menor", () => {
    const C = parseKey("C");
    const Am = parseKey("Am");
    expect(romanNumeral(chord("G2", "B3", "D4", "G4")!, C)).toBe("V");
    expect(romanNumeral(chord("D3", "G3", "B3", "F4")!, C)).toBe("V⁴₃");
    expect(romanNumeral(chord("F3", "D4", "A4", "D5")!, C)).toBe("ii⁶");
    expect(romanNumeral(chord("E3", "G#3", "B3", "E4")!, Am)).toBe("V");
    expect(romanNumeral(chord("G#3", "B3", "D4", "F4")!, Am)).toBe("vii°7");
    expect(romanNumeral(chord("A2", "C4", "E4", "A4")!, Am)).toBe("i");
    expect(describeChordPt(chord("E3", "G3", "C4", "G4")!)).toContain("1ª inversão");
  });
});

describe("durações e métrica", () => {
  it("converte figuras em ticks (PPQ 480)", () => {
    expect(durationTicks({ type: "q", dots: 0 })).toBe(PPQ);
    expect(durationTicks({ type: "h", dots: 1 })).toBe(PPQ * 3);
    expect(durationTicks({ type: "8", dots: 2 })).toBe(PPQ * 0.875);
    expect(measureTicks({ beats: 6, beatType: 8 })).toBe(PPQ * 3);
  });
  it("calcula posição métrica, inclusive em compasso composto", () => {
    expect(metricPosition(PPQ * 5, { beats: 4, beatType: 4 })).toEqual({ measure: 2, beat: 2 });
    expect(metricPosition(PPQ * 1.5, { beats: 6, beatType: 8 })).toEqual({ measure: 1, beat: 2 });
  });
  it("decompõe ticks em figuras", () => {
    expect(ticksToDurations(PPQ * 3)).toEqual([{ type: "h", dots: 1 }]);
    expect(ticksToDurations(PPQ * 4 + PPQ / 4).map((d) => d.type)).toEqual(["w", "16"]);
  });
});

describe("dominantes secundárias", () => {
  const chord = (...ps: string[]) => identifyChord(ps.map(P))!;
  const C = parseKey("C");
  it("reconhece V/V, V⁷/IV, V⁶₅/ii e vii°7/V", () => {
    expect(romanNumeral(chord("D3", "F#3", "A3", "D4"), C)).toBe("V/V");
    expect(romanNumeral(chord("C3", "E3", "G3", "Bb3"), C)).toBe("V7/IV");
    expect(romanNumeral(chord("C#3", "E3", "G3", "A3"), C)).toBe("V⁶₅/ii");
    expect(romanNumeral(chord("F#3", "A3", "C4", "Eb4"), C)).toBe("vii°7/V");
  });
  it("acordes diatônicos continuam com o numeral comum", () => {
    expect(romanNumeral(chord("G2", "B3", "D4", "F4"), C)).toBe("V7");
    expect(romanNumeral(chord("F3", "A3", "C4"), C)).toBe("IV");
    expect(romanNumeral(chord("E3", "G#3", "B3"), parseKey("Am"))).toBe("V");
  });
  it("não tonicaliza a tônica nem acordes diminutos", () => {
    // B major em Dó: alvo seria E (iii) → V/iii
    expect(romanNumeral(chord("B2", "D#3", "F#3"), C)).toBe("V/iii");
    // E major em Lá menor é V diatônico (sensível da harmônica), não V/…
    expect(romanNumeral(chord("E3", "G#3", "B3", "D4"), parseKey("Am"))).toBe("V7");
  });
});
