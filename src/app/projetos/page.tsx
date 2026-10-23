import type { Metadata } from "next";
import { ProjectLibrary } from "@/components/ProjectLibrary";

export const metadata: Metadata = { title: "Trabalhos práticos" };

export default function ProjectsPage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Trabalhos práticos</p>
        <h1>Trabalhos e arranjos</h1>
        <p>Os trabalhos dos semestres, avaliados por rubrica (não por uma nota única), seus rascunhos e arranjos salvos, e os exemplos usados nas aulas.</p>
      </header>
      <ProjectLibrary />
    </div>
  );
}
