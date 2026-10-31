import type { CompetencyId, Lesson } from "@/content/curriculum/types";
import type { TransferKind } from "@/domain/production/transfer";

/**
 * Prática corrigida relacionada a cada aula: uma situação de escrita gerada com melodia
 * inédita, escolhida pela competência principal da aula. Complementa (não substitui) os
 * exercícios da própria aula; aulas sem competência de escrita (regência, voz, percepção)
 * não recebem prática gerada.
 */
const BY_COMPETENCY: Partial<Record<CompetencyId, TransferKind>> = {
  "escrita-ttbb": "adaptar-ttbb",
  contraponto: "segunda-voz",
  "conducao-de-vozes": "corrigir",
  "escrita-satb": "harmonizar",
  "harmonia-funcional": "harmonizar",
  acordes: "harmonizar",
  arranjo: "introducao",
  "escrita-ssaa": "segunda-voz",
};

export function lessonPracticeKind(lesson: Lesson): TransferKind | null {
  for (const c of lesson.competencies) {
    const k = BY_COMPETENCY[c];
    if (k) return k;
  }
  return null;
}
