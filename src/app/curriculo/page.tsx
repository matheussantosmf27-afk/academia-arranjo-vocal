import type { Metadata } from "next";
import { CurriculumView } from "@/components/CurriculumView";
import { LESSONS, LEVELS } from "@/content/curriculum/curriculum";

export const metadata: Metadata = { title: "Grade curricular" };

export default function CurriculumPage() {
  const disciplines = LEVELS.reduce((n, l) => n + l.units.length, 0);
  const hours = Math.round(LESSONS.reduce((m, l) => m + l.estimatedMinutes, 0) / 60);
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Grade curricular</p>
        <h1>Curso de Arranjo Vocal</h1>
        <p>
          {LEVELS.length} semestres, {disciplines} disciplinas e {LESSONS.length} aulas (≈ {hours} horas de estudo, sem contar a prática). O curso parte de teoria
          básica e vai até o arranjo completo em estilo coral, pop a cappella, gospel e música popular brasileira. Cada aula termina com uma verificação: o
          domínio demonstrado libera as aulas seguintes. Você pode refazer as verificações quantas vezes quiser.
        </p>
      </header>
      <CurriculumView />
    </div>
  );
}
