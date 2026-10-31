import { getLesson } from "@/content/curriculum/curriculum";
import { getLessonTask } from "@/content/production-tasks";
import { TRANSFER_MELODIES } from "@/content/transfer-melodies";
import type { ProductionTask } from "@/domain/production/task";
import { buildTransferTask, parseTransferId, transferBattery } from "@/domain/production/transfer";

/**
 * Sementes fixas do pré-teste e do pós-teste: as mesmas para todos os alunos, para que
 * os resultados sejam comparáveis. As melodias de cada teste são diferentes entre si.
 */
export const PRE_TEST_SEED = 20261;
export const POST_TEST_SEED = 20262;

export const preTest = () => transferBattery(TRANSFER_MELODIES, PRE_TEST_SEED);
export const postTest = () => transferBattery(TRANSFER_MELODIES, POST_TEST_SEED);

/** Resolve qualquer tarefa corrigida pelo id: das aulas ("aula:exercicio") ou de transferência ("transf:…"). */
export function resolveTask(id: string): ProductionTask | undefined {
  const t = parseTransferId(id);
  if (t) {
    const m = TRANSFER_MELODIES.find((x) => x.id === t.melodyId);
    if (t.lessonId && !getLesson(t.lessonId)) return undefined;
    return m ? (buildTransferTask(t.kind, m, t.seed, t.lessonId) ?? undefined) : undefined;
  }
  return getLessonTask(id);
}
