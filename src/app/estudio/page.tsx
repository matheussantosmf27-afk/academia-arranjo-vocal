import type { Metadata } from "next";
import { Suspense } from "react";
import { StudioFallback } from "@/components/studio/Studio";
import { StudioGate } from "@/components/studio/StudioGate";
import { resolveTask } from "@/content/tasks";

export const metadata: Metadata = { title: "Laboratório de escrita" };

export default async function StudioPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const taskId = typeof sp.tarefa === "string" ? sp.tarefa : null;
  const task = taskId ? (resolveTask(taskId) ?? null) : null;
  return (
    <div className="page page-wide">
      <header className="page-header">
        <p className="eyebrow">Laboratório de escrita</p>
        <h1 className="visually-hidden">Laboratório de escrita</h1>
        <p className="muted" style={{ margin: 0 }}>
          Onde você pratica o que aprende nas aulas: escreva a quatro vozes, ouça cada naipe e receba o diagnóstico do motor em tempo real. Em telas pequenas, a edição funciona,
          mas o uso confortável é no computador.
        </p>
      </header>
      <Suspense fallback={<StudioFallback />}>
        <StudioGate task={task} />
      </Suspense>
    </div>
  );
}
