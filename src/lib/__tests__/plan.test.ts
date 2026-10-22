import { describe, expect, it } from "vitest";
import { PPQ } from "@/domain/music/duration";
import { CHORALE_SATB_C } from "@/domain/music/examples";
import { setDynamic, toggleArticulation, toggleTie } from "@/domain/music/operations";
import { scoreFromText } from "@/domain/music/text-notation";
import { DYNAMIC_GAIN, buildPlaybackPlan } from "../audio/plan";

const ALL = new Set(["S", "A", "T", "B"] as const);
const q = 60 / 72; // segundos por semínima a ♩ = 72

describe("plano de reprodução", () => {
  it("toca só as vozes pedidas, com tempo em segundos", () => {
    const plan = buildPlaybackPlan(CHORALE_SATB_C, { voices: new Set(["S", "B"]) });
    expect(new Set(plan.notes.map((n) => n.voice))).toEqual(new Set(["S", "B"]));
    const s = plan.notes.filter((n) => n.voice === "S");
    expect(s).toHaveLength(13);
    expect(s[1]!.startSec).toBeCloseTo(q);
    expect(plan.totalSec).toBeCloseTo(16 * q);
  });
  it("funde notas ligadas", () => {
    const plan = buildPlaybackPlan(toggleTie(CHORALE_SATB_C, "S-3"), { voices: new Set(["S"]) });
    expect(plan.notes).toHaveLength(12);
    expect(plan.notes[2]).toMatchObject({ onset: 2 * PPQ, end: 4 * PPQ, eventIds: ["S-3", "S-4"] });
  });
  it("dinâmica vale até a próxima marcação; acento reforça", () => {
    let s = setDynamic(CHORALE_SATB_C, "S-2", "p");
    s = setDynamic(s, "S-5", "f");
    s = toggleArticulation(s, "S-6", "accent");
    const n = buildPlaybackPlan(s, { voices: new Set(["S"]) }).notes;
    expect(n[0]!.gain).toBe(DYNAMIC_GAIN.mf);
    expect(n[1]!.gain).toBe(DYNAMIC_GAIN.p);
    expect(n[3]!.gain).toBe(DYNAMIC_GAIN.p);
    expect(n[4]!.gain).toBe(DYNAMIC_GAIN.f);
    expect(n[5]!.gain).toBeCloseTo(DYNAMIC_GAIN.f * 1.35);
  });
  it("staccato encurta a nota sem mudar o tempo das seguintes", () => {
    const s = toggleArticulation(CHORALE_SATB_C, "S-1", "staccato");
    const n = buildPlaybackPlan(s, { voices: new Set(["S"]) }).notes;
    expect(n[0]!.durSec).toBeCloseTo(q * 0.5);
    expect(n[1]!.startSec).toBeCloseTo(q);
  });
  it("fermata sustenta todas as vozes e atrasa o restante", () => {
    const s = toggleArticulation(CHORALE_SATB_C, "S-4", "fermata"); // fim do compasso 1
    const plan = buildPlaybackPlan(s, { voices: ALL });
    const bassBeat4 = plan.notes.find((n) => n.voice === "B" && n.onset === 3 * PPQ)!;
    expect(bassBeat4.durSec).toBeCloseTo(2 * q * 0.92); // o baixo também segura
    const m2 = plan.notes.find((n) => n.voice === "S" && n.onset === 4 * PPQ)!;
    expect(m2.startSec).toBeCloseTo(5 * q);
    expect(plan.totalSec).toBeCloseTo(17 * q);
    // durante a fermata, o cursor fica parado no fim da nota
    expect(plan.tickAtSec(4.5 * q)).toBe(4 * PPQ);
    expect(plan.tickAtSec(5.5 * q)).toBeCloseTo(4.5 * PPQ);
  });
  it("trecho, metrônomo e contagem", () => {
    const plan = buildPlaybackPlan(CHORALE_SATB_C, { voices: ALL, from: 4 * PPQ, to: 8 * PPQ, metronome: true, countIn: true });
    expect(plan.leadInSec).toBeCloseTo(4 * q);
    expect(plan.notes.every((n) => n.onset >= 4 * PPQ && n.end <= 8 * PPQ)).toBe(true);
    expect(plan.notes[0]!.startSec).toBeCloseTo(4 * q);
    expect(plan.clicks).toHaveLength(8);
    expect(plan.clicks.filter((c) => c.accent)).toHaveLength(2);
    expect(plan.tickAtSec(2 * q)).toBe(4 * PPQ);
    expect(plan.tickAtSec(5 * q)).toBeCloseTo(5 * PPQ);
  });
  it("nota que atravessa o início do trecho soa só a parte de dentro", () => {
    const s = scoreFromText({ id: "x", title: "x", formation: "SATB", key: "C", time: "4/4", voices: { S: "C5:w", A: "r:w", T: "r:w", B: "r:w" } });
    const n = buildPlaybackPlan(s, { voices: new Set(["S"]), from: PPQ }).notes;
    expect(n[0]).toMatchObject({ onset: PPQ, end: 4 * PPQ });
    expect(n[0]!.startSec).toBeCloseTo(0);
  });
});
