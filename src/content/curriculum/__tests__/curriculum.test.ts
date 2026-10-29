import { describe, expect, it } from "vitest";
import { validateScore } from "@/domain/validation";
import { buildExerciseSet } from "@/domain/exercises/engine";
import { quickChecksFor } from "@/components/lesson/LessonContent";
import { parseScore } from "@/domain/music/schema";
import { LAB_EXAMPLES } from "@/content/lab-examples";
import type { Score } from "@/domain/music/score";
import { LESSONS, LEVELS } from "../curriculum";
import type { ChallengeBlock } from "../types";

/** Notas (altura e duração) das vozes que o material de partida já preenche. */
const givenVoices = (s: Score) =>
  s.parts
    .filter((p) => p.events.some((e) => e.kind === "note"))
    .map((p) => ({ voice: p.voice, notes: JSON.stringify(p.events.map((e) => (e.kind === "note" ? [e.pitch, e.duration] : ["r", e.duration]))) }));

describe("integridade do currículo", () => {
  it("IDs únicos e pré-requisitos existentes, sem ciclos", () => {
    const ids = new Set(LESSONS.map((l) => l.id));
    expect(ids.size).toBe(LESSONS.length);
    for (const l of LESSONS) for (const p of l.prerequisites) expect(ids.has(p)).toBe(true);
    const visiting = new Set<string>();
    const done = new Set<string>();
    const visit = (id: string) => {
      if (done.has(id)) return;
      expect(visiting.has(id)).toBe(false);
      visiting.add(id);
      for (const p of LESSONS.find((l) => l.id === id)!.prerequisites) visit(p);
      visiting.delete(id);
      done.add(id);
    };
    LESSONS.forEach((l) => visit(l.id));
  });
  it("toda lição pertence a uma unidade e toda unidade lista lições existentes", () => {
    const unitIds = LEVELS.flatMap((lv) => lv.units.map((u) => u.id));
    for (const l of LESSONS) expect(unitIds).toContain(l.unitId);
    for (const u of LEVELS.flatMap((lv) => lv.units)) for (const id of u.lessonIds) expect(LESSONS.some((l) => l.id === id)).toBe(true);
  });
  it("lições disponíveis têm todos os componentes pedagógicos", () => {
    const available = LESSONS.filter((l) => l.status === "disponivel");
    expect(available.length).toBeGreaterThanOrEqual(3);
    for (const l of available) {
      expect(l.objectives.length).toBeGreaterThan(0);
      expect(l.sections.length).toBeGreaterThan(0);
      expect(l.exercises).toBeDefined();
      expect(l.masteryDescription).toBeTruthy();
      expect(l.application?.steps.length).toBeGreaterThan(0);
      const blocks = l.sections.flatMap((s) => s.blocks);
      expect(blocks.some((b) => b.type === "example" && b.verdict === "correto"), `${l.id}: exemplo correto`).toBe(true);
      expect(blocks.some((b) => b.type === "example" && b.verdict !== "correto"), `${l.id}: exemplo incorreto/observação`).toBe(true);
      expect(blocks.some((b) => b.type === "listening"), `${l.id}: escuta`).toBe(true);
    }
  });
  it("o veredito de cada exemplo é coerente com o motor de validação", () => {
    for (const l of LESSONS) {
      for (const b of l.sections.flatMap((s) => s.blocks)) {
        if (b.type !== "example") continue;
        expect(parseScore(b.score).ok).toBe(true);
        const r = validateScore(b.score);
        const serious = r.diagnostics.filter((d) => d.severity === "erro" || d.severity === "alerta");
        const relevant = r.diagnostics.filter((d) => d.severity !== "info");
        const ctx = `${l.id} / ${b.caption}: ${r.diagnostics.map((d) => d.message).join(" | ")}`;
        if (b.verdict === "correto") expect(relevant, ctx).toEqual([]);
        if (b.verdict === "incorreto") expect(serious.length, ctx).toBeGreaterThan(0);
        if (b.verdict === "observacao") expect(r.diagnostics.length, ctx).toBeGreaterThan(0);
      }
    }
  });
  it("os conjuntos de exercícios das lições são gerados com itens essenciais presentes", () => {
    for (const l of LESSONS) {
      if (!l.exercises) continue;
      const items = buildExerciseSet(l.exercises, 123);
      expect(items.length).toBeGreaterThanOrEqual(8);
      for (const req of l.exercises.requiredItemIds ?? []) expect(items.some((i) => i.id === req)).toBe(true);
    }
  });
  it("as perguntas rápidas das aulas são prática gerada, nunca itens estáticos da verificação", () => {
    for (const l of LESSONS) {
      if (!l.exercises) continue;
      const checks = quickChecksFor(l).filter((c) => c !== null);
      expect(checks.length, l.id).toBeGreaterThan(0);
      for (const c of checks) {
        expect(l.exercises.staticItems.some((s) => s.id === c.id || s.prompt === c.prompt), `${l.id}: ${c.prompt}`).toBe(false);
      }
    }
  });
  it("exercícios independentes: dicas progressivas, critérios e solução conferida pelo motor", () => {
    const challenges = LESSONS.flatMap((l) => l.sections.flatMap((s) => s.blocks).filter((b): b is ChallengeBlock => b.type === "challenge").map((b) => ({ l, b })));
    for (const { l, b } of challenges) {
      const ctx = `${l.id} / ${b.title}`;
      expect(b.hints.length, ctx).toBeGreaterThanOrEqual(2);
      expect(b.criteria.length, ctx).toBeGreaterThanOrEqual(2);
      expect(b.constraints.length, ctx).toBeGreaterThanOrEqual(1);
      expect(b.solution.commentary.length, ctx).toBeGreaterThan(80);
      if (b.start) {
        expect(parseScore(b.start).ok, ctx).toBe(true);
        expect(LAB_EXAMPLES.filter((e) => e.id === b.start!.id).length, `${ctx}: partida abre no Estúdio com id único`).toBe(1);
      }
      if (b.solution.score) {
        const sol = b.solution.score;
        expect(parseScore(sol).ok, ctx).toBe(true);
        const r = validateScore(sol);
        expect(r.diagnostics.filter((d) => d.severity !== "info"), `${ctx}: ${r.diagnostics.map((d) => d.message).join(" | ")}`).toEqual([]);
        // A solução respeita o material dado (ex.: o soprano a harmonizar).
        if (b.start) for (const g of givenVoices(b.start)) {
          const part = sol.parts.find((p) => p.voice === g.voice);
          expect(part && JSON.stringify(part.events.map((e) => (e.kind === "note" ? [e.pitch, e.duration] : ["r", e.duration]))), `${ctx}: voz ${g.voice} dada`).toBe(g.notes);
        }
      }
    }
  });
});
