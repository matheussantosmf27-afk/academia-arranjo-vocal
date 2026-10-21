import type { Metadata } from "next";
import { Suspense } from "react";
import { Studio, StudioFallback } from "@/components/studio/Studio";

export const metadata: Metadata = { title: "Estúdio" };

export default function StudioPage() {
  return (
    <div className="page page-wide">
      <header className="page-header">
        <p className="eyebrow">Estúdio experimental</p>
        <h1 className="visually-hidden">Estúdio</h1>
        <p className="muted" style={{ margin: 0 }}>
          Editor de quatro vozes com notação gerada pelo modelo musical, reprodução por voz e diagnóstico em tempo real. Em telas pequenas, a edição funciona,
          mas o uso confortável é no computador.
        </p>
      </header>
      <Suspense fallback={<StudioFallback />}>
        <Studio />
      </Suspense>
    </div>
  );
}
