import { getLesson } from "@/content/curriculum/curriculum";
import { getLessonTask } from "@/content/production-tasks";
import { TRANSFER_MELODIES } from "@/content/transfer-melodies";
import type { ProductionTask } from "@/domain/production/task";
import { type TransferKind, buildTransferTask, generateTransferTask, parseTransferId, transferBattery } from "@/domain/production/transfer";

/**
 * Sementes fixas do pré-teste e do pós-teste: as mesmas para todos os alunos, para que
 * os resultados sejam comparáveis. As melodias de cada teste são diferentes entre si.
 */
export const PRE_TEST_SEED = 20261;
export const POST_TEST_SEED = 20262;

export const preTest = () => transferBattery(TRANSFER_MELODIES, PRE_TEST_SEED);
/** O pós-teste exclui as melodias do pré-teste: nenhuma melodia é vista duas vezes. */
export const postTest = () => {
  const used = new Set(preTest().map((t) => parseTransferId(t.id)!.melodyId));
  return transferBattery(TRANSFER_MELODIES, POST_TEST_SEED, used);
};

export type TestContext = "pre-teste" | "pos-teste";

/** Uma tarefa só vale como pré ou pós-teste se pertence à bateria fixa correspondente. */
export function isTestTask(context: TestContext, taskId: string): boolean {
  return (context === "pre-teste" ? preTest() : postTest()).some((t) => t.id === taskId);
}

/** Cópia da tarefa para o navegador: sem a solução de referência (revelada por ação de servidor após conferir). */
export function publicTask(task: ProductionTask): ProductionTask {
  const { solution, ...rest } = task;
  void solution;
  return rest;
}

/** Nova situação de transferência gerada no servidor (o banco de melodias e as soluções não vão ao navegador). */
export function newTransferTaskId(kind: TransferKind, seed: number, lessonId?: string): string | null {
  if (lessonId && !getLesson(lessonId)) return null;
  return generateTransferTask(kind, TRANSFER_MELODIES, seed, lessonId)?.id ?? null;
}

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
