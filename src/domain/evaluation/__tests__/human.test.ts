import { describe, expect, it } from "vitest";
import { HUMAN_RUBRIC, validateHumanEvaluation } from "../human";

describe("rubrica humana", () => {
  it("tem os dez critérios pedidos, cada um com quatro descritores", () => {
    expect(HUMAN_RUBRIC.map((c) => c.id)).toEqual(["correcao-harmonica", "conducao", "cantabilidade", "tessitura", "prosodia", "equilibrio", "criatividade", "coerencia-estilistica", "expressividade", "adequacao"]);
    for (const c of HUMAN_RUBRIC) expect(Object.keys(c.levels)).toEqual(["1", "2", "3", "4"]);
  });

  it("exige avaliador, todos os níveis e comentário geral; nada é preenchido automaticamente", () => {
    expect(validateHumanEvaluation({ evaluatorName: "", levels: {}, general: "" })).toHaveLength(3);
    const levels = Object.fromEntries(HUMAN_RUBRIC.map((c) => [c.id, 3]));
    expect(validateHumanEvaluation({ evaluatorName: "Profa. Ana", levels, general: "Boa condução; trabalhar o clímax." })).toEqual([]);
  });
});
