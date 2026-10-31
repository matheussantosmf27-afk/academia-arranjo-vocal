import type { Metadata } from "next";
import { CompetencyProfile } from "@/components/CompetencyProfile";
import { DevelopmentPanel } from "@/components/DevelopmentPanel";

export const metadata: Metadata = { title: "Competências" };

export default function ProfilePage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Perfil</p>
        <h1>Competências</h1>
        <p>Desempenho calculado a partir das suas tentativas registradas: verificações, revisões, tarefas de escrita e projetos. Cada número tem como evidência um registro seu.</p>
      </header>
      <div style={{ display: "grid", gap: 20 }}>
        <DevelopmentPanel />
        <CompetencyProfile />
      </div>
    </div>
  );
}
