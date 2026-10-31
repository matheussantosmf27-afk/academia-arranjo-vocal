import { REPERTORIO } from "@/content/repertorio";
import type { Score } from "@/domain/music/score";
import { melodyOnly } from "@/domain/production/cumulative";

/** Melodias do projeto cumulativo: as peças do Repertório (domínio público), só com a melodia. */
export interface CumulativeMelody {
  readonly id: string;
  readonly title: string;
  readonly about: string;
  readonly score: Score;
}

export const CUMULATIVE_MELODIES: readonly CumulativeMelody[] = REPERTORIO.map((p) => ({
  id: p.id,
  title: p.titulo,
  about: p.autoria,
  score: { ...melodyOnly(p.score), id: `meu-arranjo-${p.id}`, title: p.titulo, metadata: { ...p.score.metadata, style: "coral-tradicional" } },
}));

export const getCumulativeMelody = (id: string) => CUMULATIVE_MELODIES.find((m) => m.id === id);
