import { describe, expect, it } from "vitest";
import { competencyStatus, recurringErrors, summarize, taskOutcomes } from "../evidence";
import { type ProductionAttempt, assistanceLevel } from "../task";

const at = (min: number) => new Date(Date.UTC(2026, 9, 1, 12, min)).toISOString();
const a = (over: Partial<ProductionAttempt>): ProductionAttempt => ({
  id: Math.random().toString(36),
  taskId: "t1",
  kind: "producao",
  competency: "escrita-satb",
  startedAt: at(0),
  finishedAt: at(10),
  passed: false,
  assistance: "autonomo",
  hintsUsed: 0,
  corrections: 0,
  failedChecks: [],
  ruleIds: [],
  ...over,
});

describe("evidências de produção", () => {
  it("nível de ajuda: a mais forte prevalece", () => {
    expect(assistanceLevel({ hintsOpened: 0, demoOpened: false, solutionOpened: false })).toBe("autonomo");
    expect(assistanceLevel({ hintsOpened: 2, demoOpened: false, solutionOpened: false })).toBe("dica");
    expect(assistanceLevel({ hintsOpened: 2, demoOpened: true, solutionOpened: false })).toBe("demonstracao");
    expect(assistanceLevel({ hintsOpened: 0, demoOpened: true, solutionOpened: true })).toBe("solucao");
  });

  it("uma tarefa conta uma vez, pela primeira aprovação; domínio ponderado pela ajuda", () => {
    const list = [
      a({ taskId: "t1", finishedAt: at(5), ruleIds: ["vozes.paralelas"], failedChecks: ["sem-erros"] }),
      a({ taskId: "t1", finishedAt: at(9), passed: true, assistance: "dica", corrections: 1 }),
      a({ taskId: "t1", finishedAt: at(12), passed: true, assistance: "dica", corrections: 1 }),
      a({ taskId: "t2", finishedAt: at(20), passed: true }),
      a({ taskId: "t3", finishedAt: at(30), ruleIds: ["vozes.paralelas"] }),
    ];
    const o = taskOutcomes(list);
    expect(o).toHaveLength(3);
    const s = summarize(o);
    expect(s.solved).toBe(2);
    expect(s.autonomous).toBe(1);
    expect(s.autonomousShare).toBe(0.5);
    expect(s.weightedMastery).toBeCloseTo((0.75 + 1 + 0) / 3);
    expect(s.meanCorrections).toBe(0.5);
    expect(recurringErrors(list)).toEqual([{ ruleId: "vozes.paralelas", tasks: 2 }]);
  });

  it("acerto depois de ver a solução não vale domínio", () => {
    const s = summarize(taskOutcomes([a({ passed: true, assistance: "solucao" })]));
    expect(s.weightedMastery).toBe(0);
    expect(s.autonomous).toBe(0);
  });

  it("situação da competência com regra explícita", () => {
    const base = { lessons: 2, mastered: 2, reviewsDue: 0, retained: 1, lapses: 0 };
    expect(competencyStatus({ ...base, outcomes: [] })).toBe("dominada");
    expect(competencyStatus({ ...base, outcomes: taskOutcomes([a({ passed: true, assistance: "solucao" })]) })).toBe("em-desenvolvimento");
    expect(competencyStatus({ ...base, outcomes: taskOutcomes([a({ passed: true })]) })).toBe("dominada");
    expect(competencyStatus({ ...base, reviewsDue: 1, outcomes: [] })).toBe("revisar");
    expect(competencyStatus({ ...base, outcomes: taskOutcomes([a({}), a({}), a({})]) })).toBe("revisar");
    expect(competencyStatus({ lessons: 2, mastered: 0, reviewsDue: 0, retained: 0, lapses: 0, outcomes: [] })).toBe("sem-dados");
  });
});
