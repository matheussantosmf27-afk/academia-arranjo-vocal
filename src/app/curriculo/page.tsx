import type { Metadata } from "next";
import { CurriculumView } from "@/components/CurriculumView";

export const metadata: Metadata = { title: "Currículo" };

export default function CurriculumPage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Currículo</p>
        <h1>Do intervalo ao arranjo completo</h1>
        <p>
          Cinco níveis progressivos, com SATB e TTBB desde o início. Cada lição exige domínio demonstrado nos exercícios antes de liberar as seguintes — você pode
          revisar e refazer tentativas sempre que quiser.
        </p>
      </header>
      <CurriculumView />
    </div>
  );
}
