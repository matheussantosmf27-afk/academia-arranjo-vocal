import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LessonList } from "@/components/CurriculumView";
import { COMPETENCIES, LESSONS, LEVELS, getUnit, unitHours } from "@/content/curriculum/curriculum";

export function generateStaticParams() {
  return LEVELS.flatMap((l) => l.units.map((u) => ({ id: u.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const found = getUnit(id);
  return { title: found ? `${found.unit.code} ${found.unit.title}` : "Disciplina" };
}

export default async function DisciplinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = getUnit(id);
  if (!found) notFound();
  const { level, unit } = found;
  const lessons = unit.lessonIds.map((lid) => LESSONS.find((l) => l.id === lid)!);
  const competencies = [...new Set(lessons.flatMap((l) => l.competencies))];
  const objectives = lessons.flatMap((l) => l.objectives.slice(0, 2));
  const firstPrereqs = [...new Set(lessons.flatMap((l) => l.prerequisites))].filter((p) => !unit.lessonIds.includes(p));

  return (
    <article className="page">
      <nav aria-label="Trilha" className="muted" style={{ fontSize: "0.88rem", marginBottom: 8 }}>
        <Link href="/curriculo">Grade curricular</Link> › {level.number}º semestre — {level.title}
      </nav>
      <header className="page-header">
        <p className="eyebrow">
          {unit.code} · {level.number}º semestre
        </p>
        <h1>{unit.title}</h1>
        <p>
          {unit.lessonIds.length} aulas · carga horária estimada ≈ {unitHours(unit)} h
        </p>
      </header>

      <section className="card" aria-labelledby="ementa" style={{ marginBottom: 16 }}>
        <h2 id="ementa" style={{ marginTop: 0 }}>
          Ementa
        </h2>
        <p>{unit.description}</p>
        <h3>Competências desenvolvidas</h3>
        <div className="row" style={{ gap: 6 }}>
          {competencies.map((c) => (
            <span key={c} className="chip">
              {COMPETENCIES[c]}
            </span>
          ))}
        </div>
        <h3>Objetivos</h3>
        <ul>
          {objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        {firstPrereqs.length > 0 && (
          <p style={{ marginBottom: 0 }}>
            <strong>Pré-requisitos de outras disciplinas:</strong>{" "}
            {firstPrereqs.map((p, i) => (
              <span key={p}>
                {i > 0 && ", "}
                <Link href={`/licoes/${p}`}>{LESSONS.find((l) => l.id === p)?.title}</Link>
              </span>
            ))}
          </p>
        )}
      </section>

      <section aria-labelledby="aulas">
        <h2 id="aulas">Aulas</h2>
        <LessonList unit={unit} />
      </section>

      {unit.project && (
        <section className="card" aria-labelledby="trabalho" style={{ marginTop: 16 }}>
          <h2 id="trabalho" style={{ marginTop: 0 }}>
            Trabalho da disciplina
          </h2>
          <p style={{ marginBottom: 0 }}>
            <strong>{unit.project.title}:</strong> {unit.project.description} Faça no <Link href="/estudio">laboratório de escrita</Link>, revisando com o motor.
          </p>
        </section>
      )}

      {unit.bibliography && unit.bibliography.length > 0 && (
        <section aria-labelledby="bibliografia" style={{ marginTop: 16 }}>
          <h2 id="bibliografia">Bibliografia e escuta recomendadas</h2>
          <ul>
            {unit.bibliography.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
