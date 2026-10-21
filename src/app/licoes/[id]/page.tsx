import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPETENCIES, LESSONS, LEVELS, getLesson } from "@/content/curriculum/curriculum";
import { LessonContent } from "@/components/lesson/LessonContent";
import { LessonExercises, LessonStatusBadge, PrerequisiteNotice } from "@/components/lesson/LessonProgress";
import styles from "@/components/lesson/Lesson.module.css";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: getLesson(id)?.title ?? "Lição" };
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  const level = LEVELS.find((l) => l.id === lesson.levelId);
  const unit = level?.units.find((u) => u.id === lesson.unitId);
  const index = LESSONS.findIndex((l) => l.id === lesson.id);
  const next = LESSONS.slice(index + 1).find((l) => l.status === "disponivel");

  return (
    <article className="page">
      <nav aria-label="Trilha" className="muted" style={{ fontSize: "0.88rem", marginBottom: 8 }}>
        <Link href="/curriculo">Currículo</Link> › Nível {level?.number} — {level?.title} › {unit?.title}
      </nav>
      <header className="page-header">
        <h1>{lesson.title}</h1>
        <div className={styles.meta}>
          <LessonStatusBadge lesson={lesson} />
          <span className="chip">≈ {lesson.estimatedMinutes} min</span>
          {lesson.competencies.map((c) => (
            <span key={c} className="chip">
              {COMPETENCIES[c]}
            </span>
          ))}
        </div>
        <p>{lesson.summary}</p>
      </header>

      {lesson.status === "em-preparacao" ? (
        <div className="card">
          <h2 style={{ marginTop: 0 }}>Lição em preparação</h2>
          <p>A estrutura desta lição está definida no currículo; o conteúdo completo, os exemplos e os exercícios serão publicados numa próxima etapa.</p>
          {lesson.plannedTopics && (
            <>
              <h3>Tópicos previstos</h3>
              <ul>
                {lesson.plannedTopics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </>
          )}
          {lesson.prerequisites.length > 0 && (
            <p>
              Pré-requisitos:{" "}
              {lesson.prerequisites.map((p, i) => (
                <span key={p}>
                  {i > 0 && ", "}
                  <Link href={`/licoes/${p}`}>{getLesson(p)?.title}</Link>
                </span>
              ))}
            </p>
          )}
        </div>
      ) : (
        <>
          <PrerequisiteNotice lesson={lesson} />
          <section className="card" aria-labelledby="objetivos" style={{ marginBottom: 16 }}>
            <h2 id="objetivos" style={{ marginTop: 0 }}>
              Objetivos
            </h2>
            <p className="muted">Ao final desta lição, você deverá ser capaz de:</p>
            <ul className={styles.objectives}>
              {lesson.objectives.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            {lesson.prerequisites.length > 0 && (
              <p style={{ marginTop: 10, marginBottom: 0 }}>
                <strong>Pré-requisitos:</strong>{" "}
                {lesson.prerequisites.map((p, i) => (
                  <span key={p}>
                    {i > 0 && ", "}
                    <Link href={`/licoes/${p}`}>{getLesson(p)?.title}</Link>
                  </span>
                ))}
              </p>
            )}
          </section>
          <LessonContent lesson={lesson} />
          <LessonExercises lesson={lesson} />
          {lesson.application && (
            <section aria-labelledby="aplicacao">
              <h2 id="aplicacao">{lesson.application.title}</h2>
              <ol>
                {lesson.application.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <Link className="btn btn-primary" href="/estudio">
                Abrir o Estúdio
              </Link>
            </section>
          )}
        </>
      )}
      {next && (
        <p style={{ marginTop: 32 }}>
          Próxima lição no currículo: <Link href={`/licoes/${next.id}`}>{next.title}</Link> (liberada após o domínio desta e dos demais pré-requisitos).
        </p>
      )}
    </article>
  );
}
