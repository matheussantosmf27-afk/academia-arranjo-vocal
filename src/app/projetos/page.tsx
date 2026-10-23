import type { Metadata } from "next";
import { ProjectLibrary } from "@/components/ProjectLibrary";

export const metadata: Metadata = { title: "Projetos" };

export default function ProjectsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Biblioteca</p>
        <h1>Projetos</h1>
        <p>Rascunhos salvos neste navegador e exemplos de referência. Projetos práticos guiados com rubrica de avaliação, rascunhos e arranjos salvos.</p>
      </header>
      <ProjectLibrary />
    </div>
  );
}
