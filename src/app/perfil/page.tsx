import type { Metadata } from "next";
import { CompetencyProfile } from "@/components/CompetencyProfile";

export const metadata: Metadata = { title: "Competências" };

export default function ProfilePage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Perfil</p>
        <h1>Competências</h1>
        <p>Desempenho calculado a partir da melhor tentativa de cada lição. Cada número tem como evidência as respostas registradas.</p>
      </header>
      <CompetencyProfile />
    </div>
  );
}
