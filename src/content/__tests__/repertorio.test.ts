import { describe, expect, it } from "vitest";
import { parseScore } from "@/domain/music/schema";
import { validateScore } from "@/domain/validation/engine";
import { LESSONS } from "../curriculum/curriculum";
import { LAB_EXAMPLES } from "../lab-examples";
import { REPERTORIO } from "../repertorio";

describe("repertório em domínio público", () => {
  it("cada peça tem fonte, justificativa de domínio público, análise e partitura válida", () => {
    expect(REPERTORIO.length).toBeGreaterThanOrEqual(7);
    for (const p of REPERTORIO) {
      expect(p.fonte.url, p.id).toMatch(/^https:\/\//);
      expect(p.dominioPublico.length, p.id).toBeGreaterThan(60);
      expect(p.analise.length, p.id).toBeGreaterThan(120);
      expect(p.autoria, p.id).toMatch(/\d{4}/);
      expect(parseScore(p.score).ok, p.id).toBe(true);
      // peças reais: o motor sempre tem algo a comentar, e o exemplo aparece como "para observar"
      expect(validateScore(p.score).diagnostics.length, p.id).toBeGreaterThan(0);
    }
    expect(new Set(REPERTORIO.map((p) => p.score.id)).size).toBe(REPERTORIO.length);
  });

  it("todas as peças abrem no laboratório de escrita", () => {
    const ids = new Set(LAB_EXAMPLES.map((s) => s.id));
    for (const p of REPERTORIO) expect(ids.has(p.score.id), p.id).toBe(true);
  });

  it("as aulas usam o repertório real, e não sobram as canções fictícias antigas", () => {
    const blocks = LESSONS.flatMap((l) => l.sections.flatMap((s) => s.blocks));
    const ids = new Set(blocks.flatMap((b) => (b.type === "example" ? [b.score.id] : [])));
    expect(REPERTORIO.filter((p) => ids.has(p.score.id)).length).toBeGreaterThanOrEqual(6);
    const texto = JSON.stringify(LESSONS);
    for (const antiga of ["Canção do Caminho", "Luz da manhã", "Rio de Paz", "Mar sereno", "Sol vai nascer", "Cante o povo", "Passarinho"]) expect(texto).not.toContain(antiga);
  });
});
