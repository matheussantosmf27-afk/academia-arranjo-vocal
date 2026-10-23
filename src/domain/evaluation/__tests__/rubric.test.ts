import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/content/projects";
import { CHORALE_SATB_C, CHORALE_TTBB_G, PARALLELS_FIXED_SATB, PARALLELS_SATB } from "../../music/examples";
import { parseScore } from "../../music/schema";
import { compareVersions, evaluateRubric } from "../rubric";

const crit = (r: ReturnType<typeof evaluateRubric>, id: string) => r.criteria.find((c) => c.id === id)!;

describe("rubrica de avaliação", () => {
  it("tem nove critérios, nenhuma nota global, e evidências em cada critério automático", () => {
    const r = evaluateRubric({ score: CHORALE_SATB_C, style: "coral-tradicional" });
    expect(r.criteria).toHaveLength(9);
    expect(r).not.toHaveProperty("score");
    for (const c of r.criteria.filter((x) => x.source === "automatica")) expect(c.comment.length).toBeGreaterThan(0);
  });
  it("coral de referência: técnica, coerência e equilíbrio no nível máximo", () => {
    const r = evaluateRubric({ score: CHORALE_SATB_C, style: "coral-tradicional" });
    expect(crit(r, "correcao-tecnica").level).toBe(4);
    expect(crit(r, "coerencia-harmonica").level).toBe(4);
    expect(crit(r, "equilibrio").level).toBe(4);
    expect(crit(r, "cantabilidade").level).toBe(4);
    expect(r.strengths).toContain("Correção técnica");
  });
  it("criatividade nunca é automática; usa autoavaliação com indicadores", () => {
    const sem = evaluateRubric({ score: CHORALE_SATB_C, style: "coral-tradicional" });
    expect(crit(sem, "criatividade")).toMatchObject({ level: null, source: "autoavaliacao" });
    expect(crit(sem, "criatividade").evidence.join(" ")).toMatch(/acordes diferentes/);
    const com = evaluateRubric({ score: CHORALE_SATB_C, style: "coral-tradicional", selfAssessment: { criatividade: 3 } });
    expect(crit(com, "criatividade").level).toBe(3);
  });
  it("paralelas derrubam técnica e independência, com os diagnósticos como evidência", () => {
    const r = evaluateRubric({ score: PARALLELS_SATB, style: "coral-tradicional" });
    expect(crit(r, "correcao-tecnica").level).toBeLessThanOrEqual(2);
    expect(crit(r, "correcao-tecnica").diagnosticIds.length).toBe(3);
    expect(crit(r, "independencia").level).toBeLessThanOrEqual(2);
  });
  it("o estilo muda a avaliação técnica, não os fatos", () => {
    const pop = evaluateRubric({ score: PARALLELS_SATB, style: "popular-a-cappella" });
    expect(crit(pop, "correcao-tecnica").level).toBe(4);
  });
  it("requisitos: vozes vazias, melodia alterada e justificativas", () => {
    const p = PROJECTS[0]!;
    const inicio = evaluateRubric({ score: p.starting, style: p.style, starting: p.starting, melodyVoice: p.melodyVoice, justifications: ["", "", ""] });
    expect(crit(inicio, "requisitos").level).toBe(1);
    expect(crit(inicio, "requisitos").evidence).toContain("Melodia dada preservada");
    const alterada = { ...p.starting, parts: p.starting.parts.map((x) => (x.voice === "S" ? { ...x, events: x.events.map((e, i) => (i === 0 && e.kind === "note" ? { ...e, pitch: { ...e.pitch, step: "A" as const } } : e)) } : x)) };
    expect(crit(evaluateRubric({ score: alterada, style: p.style, starting: p.starting, melodyVoice: "S" }), "requisitos").evidence).toContain("A melodia dada foi alterada");
  });
  it("TTBB de referência é adequado à formação", () => {
    expect(crit(evaluateRubric({ score: CHORALE_TTBB_G, style: "coral-tradicional" }), "adequacao-formacao").level).toBe(4);
  });
  it("comparação de versões mostra problemas resolvidos e mudança de nível", () => {
    const c = compareVersions({ score: PARALLELS_SATB, style: "coral-tradicional" }, { score: PARALLELS_FIXED_SATB, style: "coral-tradicional" });
    expect(c.resolved.length).toBe(3);
    expect(c.introduced).toEqual([]);
    const tech = c.criteria.find((x) => x.id === "correcao-tecnica")!;
    expect(tech.after! > tech.before!).toBe(true);
  });
  it("partituras iniciais dos projetos são válidas e a melodia está na voz indicada", () => {
    for (const p of PROJECTS) {
      expect(parseScore(p.starting).ok, p.id).toBe(true);
      expect(p.starting.parts.find((x) => x.voice === p.melodyVoice)!.events.some((e) => e.kind === "note")).toBe(true);
    }
  });
});
