import { describe, expect, it } from "vitest";
import { TRANSFER_MELODIES } from "@/content/transfer-melodies";
import { setDynamic } from "@/domain/music/operations";
import type { Score } from "@/domain/music/score";
import { scoreFromText } from "@/domain/music/text-notation";
import { type StageInput, checkStage, melodyOnly, prependBars } from "../cumulative";

const m = TRANSFER_MELODIES[0]!;
const full = scoreFromText({ id: "p", title: "Melodia", formation: "SATB", key: m.key, time: "4/4", voices: m.voices });
const melody = melodyOnly(full);
const withIntro = scoreFromText({ id: "p", title: "Melodia", formation: "SATB", key: m.key, time: "4/4", voices: { S: `${m.intro.S} | ${m.voices.S}`, A: `${m.intro.A} | ${m.voices.A}`, T: `${m.intro.T} | ${m.voices.T}`, B: `${m.intro.B} | ${m.voices.B}` } });
const input = (over: Partial<StageInput> = {}): StageInput => ({
  melody,
  previous: null,
  analysis: { key: m.key, lowest: "", highest: "", phrases: "", climax: "" },
  notes: {},
  ...over,
});

describe("projeto cumulativo", () => {
  it("etapa 1: confere tonalidade e extensão; texto obrigatório", () => {
    expect(checkStage("analise", melody, input()).passed).toBe(false);
    const ns = melody.parts[0]!.events.flatMap((e) => (e.kind === "note" ? [e.pitch] : []));
    const name = (p: (typeof ns)[number]) => `${p.step}${p.alter === 1 ? "#" : p.alter === -1 ? "b" : ""}${p.octave}`;
    const sorted = [...ns].sort((a, b) => a.octave * 12 + "CDEFGAB".indexOf(a.step) * 2 + a.alter - (b.octave * 12 + "CDEFGAB".indexOf(b.step) * 2 + b.alter));
    const r = checkStage("analise", melody, input({ analysis: { key: m.key, lowest: name(sorted[0]!), highest: name(sorted[sorted.length - 1]!), phrases: "Uma frase só, que termina na fermata do último compasso.", climax: "Na nota mais aguda." } }));
    expect(r.checks.map((c) => [c.label, c.ok])).toEqual(r.checks.map((c) => [c.label, true]));
    const wrongKey = checkStage("analise", melody, input({ analysis: { key: "F#", lowest: "C4", highest: "C5", phrases: "x".repeat(40), climax: "x".repeat(20) } }));
    expect(wrongKey.passed).toBe(false);
  });

  it("etapas 2 e 3: baixo e depois as quatro vozes, sem erros; a melodia sozinha não passa", () => {
    expect(checkStage("harmonizacao", melody, input()).passed).toBe(false);
    expect(checkStage("harmonizacao", full, input()).passed).toBe(true);
    expect(checkStage("distribuicao", full, input()).passed).toBe(true);
    const onlyBass: Score = { ...full, parts: full.parts.map((p) => (p.voice === "A" || p.voice === "T" ? melodyOnly(full, "B").parts.find((x) => x.voice === p.voice)! : p)) };
    expect(checkStage("distribuicao", onlyBass, input()).passed).toBe(false);
  });

  it("etapa 4: introdução de dois compassos antes da melodia", () => {
    expect(checkStage("desenvolvimento", prependBars(full, 2), input()).passed).toBe(false);
    expect(checkStage("desenvolvimento", withIntro, input()).passed).toBe(true);
  });

  it("etapas 5 e 6: dinâmicas, revisão escrita, título, arranjador e memorial", () => {
    expect(checkStage("refinamento", withIntro, input({ notes: { refinamento: "Revisei respirações e corrigi a duplicação no compasso 3." } })).passed).toBe(false);
    let s = withIntro;
    for (const p of s.parts) s = setDynamic(s, p.events.find((e) => e.kind === "note")!.id, "mf");
    expect(checkStage("refinamento", s, input({ notes: { refinamento: "Revisei respirações e corrigi a duplicação no compasso 3." } })).passed).toBe(true);
    const notes = { refinamento: "Revisei respirações e corrigi a duplicação no compasso 3.", finalizacao: "Harmonia diatônica com meia cadência; introdução I–V; o coro deve respirar a cada frase e manter o baixo legato." };
    expect(checkStage("finalizacao", s, input({ notes })).passed).toBe(false);
    const named = { ...s, title: "Meu coral", metadata: { ...s.metadata, arranger: "Aluno" } };
    expect(checkStage("finalizacao", named, input({ notes })).passed).toBe(true);
  });
});
