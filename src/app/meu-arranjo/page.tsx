import type { Metadata } from "next";
import { CumulativeHub } from "@/components/CumulativeHub";

export const metadata: Metadata = { title: "Meu arranjo" };

export default function MeuArranjoPage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Projeto cumulativo</p>
        <h1>Meu arranjo</h1>
        <p>
          Um arranjo completo, do zero, em seis etapas: análise da melodia, harmonização, distribuição de vozes, desenvolvimento, refinamento e finalização. Cada etapa tem uma conferência própria e,
          ao ser concluída, guarda uma versão que você pode comparar com as anteriores. No fim, peça a um professor ou regente a avaliação humana.
        </p>
      </header>
      <CumulativeHub />
    </div>
  );
}
