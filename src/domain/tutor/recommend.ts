import { LESSONS } from "@/content/curriculum/curriculum";
import type { CompetencyId } from "@/content/curriculum/types";

/**
 * Recomendação determinística (sem IA) de lições para revisar, a partir do
 * desempenho por habilidade: habilidades abaixo de 70% apontam para as lições
 * disponíveis que trabalham aquela competência.
 */
const SKILL_TO_COMPETENCY: Record<string, CompetencyId> = {
  intervalos: "intervalos",
  "percepcao-intervalos": "percepcao",
  acordes: "acordes",
  "harmonia-funcional": "harmonia-funcional",
  "conducao-de-vozes": "conducao-de-vozes",
  "escrita-satb": "escrita-satb",
  "escrita-ttbb": "escrita-ttbb",
  "leitura-vocal": "leitura-vocal",
  contraponto: "contraponto",
  "texto-e-prosodia": "texto-e-prosodia",
  arranjo: "arranjo",
};

export interface Recommendation {
  readonly skill: string;
  readonly rate: number;
  readonly lessonIds: readonly string[];
}

export function recommendLessons(bySkill: Readonly<Record<string, { correct: number; total: number }>>, threshold = 0.7): Recommendation[] {
  return Object.entries(bySkill)
    .filter(([, v]) => v.total >= 2 && v.correct / v.total < threshold)
    .sort((a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total)
    .map(([skill, v]) => {
      const comp = SKILL_TO_COMPETENCY[skill];
      const lessonIds = LESSONS.filter((l) => l.status === "disponivel" && comp && l.competencies.includes(comp)).slice(0, 3).map((l) => l.id);
      return { skill, rate: v.correct / v.total, lessonIds };
    })
    .filter((r) => r.lessonIds.length > 0);
}
