import { EXAMPLE_SCORES } from "@/domain/music/examples";
import type { Score } from "@/domain/music/score";
import { LESSONS } from "./curriculum/curriculum";
import { EXA } from "./curriculum/examples-arranjo";

/** Exemplos que o laboratório de escrita oferece em "Abrir exemplo" (referenciados pelas aulas). */
export const LAB_EXAMPLES: readonly Score[] = [
  ...EXAMPLE_SCORES,
  EXA.exercicioBaixoDado,
  EXA.exercicioCantoDado,
  EXA.duetoTercas,
  EXA.contracantoAtivo,
  EXA.melodiaHarmonizada,
  EXA.melodiaPad,
  EXA.melodiaNoTenor,
  EXA.tresVozes,
  EXA.coralSuspensao,
  EXA.popLeadBacking,
  EXA.baixoVocal,
  EXA.gospelBloco,
  EXA.bossa,
  EXA.quartas,
  EXA.emprestimo,
  // Material de partida dos exercícios independentes das aulas.
  ...LESSONS.flatMap((l) => l.sections.flatMap((s) => s.blocks)).flatMap((b) => (b.type === "challenge" && b.start ? [b.start] : [])),
];
