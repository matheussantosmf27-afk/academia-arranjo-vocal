import { describe, expect, it, vi } from "vitest";
import { PARALLELS_SATB } from "../../music/examples";
import { buildTutorUserContent, groundTutorResponse, TUTOR_SYSTEM_PROMPT } from "../grounding";
import { recommendLessons } from "../recommend";

vi.mock("server-only", () => ({}));

describe("fundamentação do tutor", () => {
  it("envia ao modelo exatamente o relatório do motor e a cifragem", () => {
    const { content, evidence, report } = buildTutorUserContent(PARALLELS_SATB, "coral-tradicional", "Por que está errado?", "explicar");
    expect(evidence.diagnosticIds).toEqual(report.diagnostics.map((d) => d.id));
    for (const id of evidence.diagnosticIds) expect(content).toContain(id);
    expect(content).toContain("Por que está errado?");
    expect(evidence.harmony.join(" ")).toMatch(/I.*ii/);
    expect(TUTOR_SYSTEM_PROMPT).toMatch(/única fonte de diagnósticos/);
  });
  it("remove referências inventadas e avisa", () => {
    const { evidence } = buildTutorUserContent(PARALLELS_SATB, "coral-tradicional", "", "revisar");
    const real = evidence.diagnosticIds[0]!;
    const g = groundTutorResponse(
      {
        answer: "x",
        socraticQuestions: [],
        revisions: [
          { diagnosticId: real, suggestion: "mova o baixo" },
          { diagnosticId: "regra-inventada@0:S", suggestion: "?" },
        ],
        citedDiagnosticIds: [real, "outro-inventado"],
        suggestedLessonIds: ["paralelas", "licao-que-nao-existe"],
      },
      evidence,
      "revisar",
    );
    expect(g.response.citedDiagnosticIds).toEqual([real]);
    expect(g.response.revisions).toHaveLength(1);
    expect(g.response.suggestedLessonIds).toEqual(["paralelas"]);
    expect(g.warnings).toHaveLength(3);
  });
  it("no modo socrático, oculta revisões prontas", () => {
    const { evidence } = buildTutorUserContent(PARALLELS_SATB, "coral-tradicional", "", "socratico");
    const g = groundTutorResponse({ answer: "", socraticQuestions: ["Que intervalo há entre S e B?"], revisions: [{ diagnosticId: evidence.diagnosticIds[0]!, suggestion: "x" }], citedDiagnosticIds: [], suggestedLessonIds: [] }, evidence, "socratico");
    expect(g.response.revisions).toEqual([]);
    expect(g.response.socraticQuestions).toHaveLength(1);
  });
});

describe("executor do tutor (cliente simulado)", () => {
  it("chama o modelo com saída estruturada e fallback, e fundamenta a resposta", async () => {
    const { runTutor, TUTOR_MODEL } = await import("@/lib/tutor/run");
    const { evidence } = buildTutorUserContent(PARALLELS_SATB, "coral-tradicional", "", "explicar");
    const parse = vi.fn().mockResolvedValue({
      stop_reason: "end_turn",
      model: TUTOR_MODEL,
      parsed_output: { answer: "As vozes andam juntas.", socraticQuestions: [], revisions: [], citedDiagnosticIds: [evidence.diagnosticIds[0], "falso"], suggestedLessonIds: [] },
    });
    const client = { beta: { messages: { parse } } } as never;
    const out = await runTutor(client, PARALLELS_SATB, "coral-tradicional", "Explique", "explicar");
    expect(out.ok).toBe(true);
    if (out.ok) {
      expect(out.response.citedDiagnosticIds).toEqual([evidence.diagnosticIds[0]]);
      expect(out.warnings).toHaveLength(1);
    }
    const req = parse.mock.calls[0]![0];
    expect(req).toMatchObject({ model: "claude-opus-5-5", fallbacks: "default", betas: ["server-side-fallback-2026-07-01"], thinking: { type: "adaptive" } });
    expect(req.output_config.format).toBeDefined();
  });
  it("trata recusa e resposta sem conteúdo estruturado", async () => {
    const { runTutor } = await import("@/lib/tutor/run");
    const refused = { beta: { messages: { parse: vi.fn().mockResolvedValue({ stop_reason: "refusal", parsed_output: null, model: "x" }) } } } as never;
    expect((await runTutor(refused, PARALLELS_SATB, "coral-tradicional", "", "explicar")).ok).toBe(false);
    const empty = { beta: { messages: { parse: vi.fn().mockResolvedValue({ stop_reason: "end_turn", parsed_output: null, model: "x" }) } } } as never;
    const r = await runTutor(empty, PARALLELS_SATB, "coral-tradicional", "", "explicar");
    expect(r).toMatchObject({ ok: false, error: expect.stringMatching(/formato inesperado/) });
  });
});

describe("recomendação de revisão (determinística)", () => {
  it("aponta lições das habilidades abaixo de 70%", () => {
    const r = recommendLessons({ intervalos: { correct: 2, total: 6 }, acordes: { correct: 9, total: 10 } });
    expect(r).toHaveLength(1);
    expect(r[0]!.skill).toBe("intervalos");
    expect(r[0]!.lessonIds).toContain("intervalos");
  });
});
