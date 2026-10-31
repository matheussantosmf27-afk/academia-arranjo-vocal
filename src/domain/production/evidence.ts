import { ASSISTANCE_CREDIT, type Assistance, type ProductionAttempt } from "./task";

/**
 * Resumos das evidências de produção. Funções puras sobre as tentativas registradas:
 * nada é estimado, e uma tarefa conta uma vez (pela primeira conferência aprovada).
 */
export interface TaskOutcome {
  readonly taskId: string;
  readonly kind: ProductionAttempt["kind"];
  readonly competency: string;
  readonly lessonId?: string;
  readonly checks: number;
  readonly solved: boolean;
  /** Ajuda usada até a primeira aprovação (ou até a última conferência, se não resolvida). */
  readonly assistance: Assistance;
  readonly corrections: number;
  /** Tempo da abertura até a primeira aprovação, em minutos (só tarefas resolvidas). */
  readonly minutes: number | null;
}

export function taskOutcomes(attempts: readonly ProductionAttempt[]): TaskOutcome[] {
  const byTask = new Map<string, ProductionAttempt[]>();
  for (const a of [...attempts].sort((x, y) => x.finishedAt.localeCompare(y.finishedAt))) {
    const key = `${a.kind}|${a.taskId}`;
    byTask.set(key, [...(byTask.get(key) ?? []), a]);
  }
  return [...byTask.values()].map((list) => {
    const firstPass = list.find((a) => a.passed);
    const ref = firstPass ?? list[list.length - 1]!;
    const minutes = firstPass ? Math.max(0, (Date.parse(firstPass.finishedAt) - Date.parse(firstPass.startedAt)) / 60000) : null;
    return {
      taskId: ref.taskId,
      kind: ref.kind,
      competency: ref.competency,
      ...(ref.lessonId ? { lessonId: ref.lessonId } : {}),
      checks: firstPass ? list.indexOf(firstPass) + 1 : list.length,
      solved: !!firstPass,
      assistance: ref.assistance,
      corrections: ref.corrections,
      minutes,
    };
  });
}

export interface ProductionSummary {
  readonly attempted: number;
  readonly solved: number;
  readonly autonomous: number;
  /** Fração de tarefas resolvidas sem ajuda, entre as resolvidas (null sem dados). */
  readonly autonomousShare: number | null;
  /** Domínio ponderado pela ajuda: média do crédito (autônomo 1, dica 0,75, demonstração 0,5, solução 0; não resolvida 0). */
  readonly weightedMastery: number | null;
  readonly byAssistance: Readonly<Record<Assistance, number>>;
  readonly meanCorrections: number | null;
  readonly medianMinutes: number | null;
}

export function summarize(outcomes: readonly TaskOutcome[]): ProductionSummary {
  const solved = outcomes.filter((o) => o.solved);
  const byAssistance: Record<Assistance, number> = { autonomo: 0, dica: 0, demonstracao: 0, solucao: 0 };
  for (const o of solved) byAssistance[o.assistance]++;
  const mins = solved.flatMap((o) => (o.minutes === null ? [] : [o.minutes])).sort((a, b) => a - b);
  return {
    attempted: outcomes.length,
    solved: solved.length,
    autonomous: byAssistance.autonomo,
    autonomousShare: solved.length ? byAssistance.autonomo / solved.length : null,
    weightedMastery: outcomes.length ? outcomes.reduce((s, o) => s + (o.solved ? ASSISTANCE_CREDIT[o.assistance] : 0), 0) / outcomes.length : null,
    byAssistance,
    meanCorrections: solved.length ? solved.reduce((s, o) => s + o.corrections, 0) / solved.length : null,
    medianMinutes: mins.length ? mins[Math.floor((mins.length - 1) / 2)]! : null,
  };
}

/** Regras que mais impediram a aprovação (contadas uma vez por tarefa, para não punir quem confere muitas vezes). */
export function recurringErrors(attempts: readonly ProductionAttempt[], limit = 6): Array<{ ruleId: string; tasks: number }> {
  const tasksByRule = new Map<string, Set<string>>();
  for (const a of attempts) for (const r of a.ruleIds) tasksByRule.set(r, (tasksByRule.get(r) ?? new Set()).add(`${a.kind}|${a.taskId}`));
  return [...tasksByRule.entries()]
    .map(([ruleId, s]) => ({ ruleId, tasks: s.size }))
    .filter((r) => r.tasks >= 2)
    .sort((a, b) => b.tasks - a.tasks || a.ruleId.localeCompare(b.ruleId))
    .slice(0, limit);
}

export type CompetencyStatus = "dominada" | "em-desenvolvimento" | "revisar" | "sem-dados";

export const COMPETENCY_STATUS_PT: Record<CompetencyStatus, string> = {
  dominada: "Dominada",
  "em-desenvolvimento": "Em desenvolvimento",
  revisar: "Revisar",
  "sem-dados": "Sem dados",
};

/**
 * Situação de uma competência, com regra explícita:
 * - revisar: há revisão vencida, mais lapsos que revisões no prazo, ou tarefas da competência
 *   conferidas três vezes ou mais sem resolver;
 * - dominada: todas as aulas verificadas e, se houver tarefas, ao menos uma resolvida sem ajuda
 *   e domínio ponderado de pelo menos 0,75;
 * - em desenvolvimento: qualquer outra evidência; sem dados: nenhuma.
 */
export function competencyStatus(input: {
  lessons: number;
  mastered: number;
  reviewsDue: number;
  retained: number;
  lapses: number;
  outcomes: readonly TaskOutcome[];
}): CompetencyStatus {
  const { lessons, mastered, reviewsDue, retained, lapses, outcomes } = input;
  const stuck = outcomes.some((o) => !o.solved && o.checks >= 3);
  if (reviewsDue > 0 || lapses > retained || stuck) return "revisar";
  const s = summarize(outcomes);
  const productionOk = outcomes.length === 0 || (s.autonomous > 0 && (s.weightedMastery ?? 0) >= 0.75);
  if (lessons > 0 && mastered === lessons && productionOk) return "dominada";
  if (mastered > 0 || outcomes.length > 0) return "em-desenvolvimento";
  return "sem-dados";
}
