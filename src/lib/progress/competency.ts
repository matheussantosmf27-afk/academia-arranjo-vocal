import type { CompetencyId, Lesson } from "@/content/curriculum/types";
import { type ProgressState, isMastered, isReviewAttempt } from "./model";
import { reviewStatus } from "./review";

/** Evidência de um projeto prático: a última avaliação pela rubrica. */
export interface ProjectEvidence {
  readonly projectId: string;
  readonly lessonId: string;
  readonly evaluated: boolean;
  readonly proficient: boolean;
}

/**
 * Competência em quatro dimensões, todas calculadas a partir de dados registrados:
 *
 * - imediato: aulas da competência com verificação aprovada;
 * - retenção: revisões espaçadas aprovadas no prazo (itens novos, dias depois);
 * - transferência: acerto, na primeira resposta, em itens GERADOS (notas, tonalidades e
 *   acordes sorteados) de outras aulas da mesma competência, respondidos depois do
 *   primeiro domínio nela — aplicar o conceito em contexto novo;
 * - prática: projetos ligados à competência avaliados pela rubrica no nível Proficiente.
 *
 * Nenhuma dimensão é deduzida de tempo de página ou de aulas lidas.
 */
export interface CompetencyReport {
  readonly id: CompetencyId;
  readonly lessons: number;
  readonly mastered: number;
  readonly reviewsDue: number;
  readonly retained: number;
  readonly lapses: number;
  readonly transferCorrect: number;
  readonly transferTotal: number;
  readonly projects: number;
  readonly projectsEvaluated: number;
  readonly projectsProficient: number;
}

export function competencyReports(
  state: ProgressState,
  lessons: readonly Lesson[],
  competencies: readonly CompetencyId[],
  projects: readonly ProjectEvidence[] = [],
  now: Date = new Date(),
): CompetencyReport[] {
  const order = new Map(lessons.map((l, i) => [l.id, i]));
  return competencies.map((id) => {
    const mine = lessons.filter((l) => l.status === "disponivel" && l.exercises && l.competencies.includes(id));
    const ids = new Set(mine.map((l) => l.id));
    const reviews = mine.map((l) => reviewStatus(state, l.id, now)).filter((r) => r !== undefined);
    // Primeiro domínio na competência: a partir dele, outras aulas dela contam como transferência.
    const first = reviews.map((r) => ({ lessonId: r.lessonId, at: r.masteredAt })).sort((a, b) => a.at.localeCompare(b.at) || (order.get(a.lessonId)! - order.get(b.lessonId)!))[0];
    let transferCorrect = 0;
    let transferTotal = 0;
    if (first) {
      for (const a of state.attempts) {
        if (!ids.has(a.lessonId) || a.lessonId === first.lessonId || a.finishedAt <= first.at) continue;
        const lesson = mine.find((l) => l.id === a.lessonId)!;
        const statics = new Set(lesson.exercises!.staticItems.map((i) => i.id));
        for (const ans of a.answers) {
          if (!isReviewAttempt(a) && statics.has(ans.itemId)) continue;
          transferTotal++;
          if (ans.correct) transferCorrect++;
        }
      }
    }
    const linked = projects.filter((p) => ids.has(p.lessonId));
    return {
      id,
      lessons: mine.length,
      mastered: mine.filter((l) => isMastered(state, l.id)).length,
      reviewsDue: reviews.filter((r) => r.isDue).length,
      retained: reviews.reduce((n, r) => n + r.retained, 0),
      lapses: reviews.reduce((n, r) => n + r.lapses, 0),
      transferCorrect,
      transferTotal,
      projects: linked.length,
      projectsEvaluated: linked.filter((p) => p.evaluated).length,
      projectsProficient: linked.filter((p) => p.proficient).length,
    };
  });
}
