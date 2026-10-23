import { EXAMPLE_SCORES } from "@/domain/music/examples";
import type { Score } from "@/domain/music/score";
import { EXA } from "./curriculum/examples-arranjo";

/** Exemplos que o laboratório de escrita oferece em "Abrir exemplo" (referenciados pelas aulas). */
export const LAB_EXAMPLES: readonly Score[] = [
  ...EXAMPLE_SCORES,
  EXA.melodiaHarmonizada,
  EXA.melodiaPad,
  EXA.melodiaNoTenor,
  EXA.tresVozes,
  EXA.coralSuspensao,
  EXA.popLeadBacking,
  EXA.baixoVocal,
  EXA.gospelBloco,
  EXA.bossa,
];
