import type { Metadata } from "next";
import { Suspense } from "react";
import { Studio, StudioFallback } from "@/components/studio/Studio";

export const metadata: Metadata = { title: "Laboratório de escrita" };

export default function StudioPage() {
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
        <Studio />
      </Suspense>
    </div>
  );
}
