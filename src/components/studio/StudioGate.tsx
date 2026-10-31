"use client";

import { useSyncExternalStore } from "react";
import type { ProductionTask } from "@/domain/production/task";
import { Studio, StudioFallback } from "./Studio";
import type { TaskContext } from "./TaskPanel";

const noop = () => () => {};

/** O laboratório lê rascunhos e sessões do navegador: renderiza só no cliente (o servidor mostra o carregamento). */
export function StudioGate({ task, context, hasSolution }: { task: ProductionTask | null; context: TaskContext; hasSolution: boolean }) {
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  return mounted ? <Studio task={task} taskContext={context} hasSolution={hasSolution} /> : <StudioFallback />;
}
