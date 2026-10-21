import type { Metadata } from "next";
import { EarLab } from "@/components/EarLab";

export const metadata: Metadata = { title: "Laboratório auditivo" };

export default function LabPage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Laboratório auditivo</p>
        <h1>Treino de ouvido</h1>
        <p>Prática livre e ilimitada: os resultados aqui não contam para o domínio das lições. Use fones para perceber melhor intervalos harmônicos.</p>
      </header>
      <EarLab />
    </div>
  );
}
