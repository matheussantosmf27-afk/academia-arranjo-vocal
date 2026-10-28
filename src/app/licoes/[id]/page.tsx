import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  COMPETENCIES,
  LESSONS,
  LEVELS,
  getLesson,
} from "@/content/curriculum/curriculum";
import { LessonContent, sectionId } from "@/components/lesson/LessonContent";
import { LessonGuide } from "@/components/lesson/LessonGuide";
import {
  LessonExercises,
  LessonStatusBadge,
  PrerequisiteNotice,
} from "@/components/lesson/LessonProgress";
import styles from "@/components/lesson/Lesson.module.css";

export function generateStaticParams() {
  return LESSONS.map((l) => ({ id: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return { title: getLesson(id)?.title ?? "Aula" };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  const level = LEVELS.find((l) => l.id === lesson.levelId);
  const unit = level?.units.find((u) => u.id === lesson.unitId);
  const index = LESSONS.findIndex((l) => l.id === lesson.id);
  const next = LESSONS.slice(index + 1).find((l) => l.status === "disponivel");
  const position = unit ? unit.lessonIds.indexOf(lesson.id) + 1 : 0;

  return (
    <article className={`page page-wide ${styles.lessonPage}`}>
      <nav
        aria-label="Trilha"
        className="muted"
        style={{ fontSize: "0.88rem", marginBottom: 8 }}
      >
        <Link href="/curriculo">Grade curricular</Link> › {level?.number}º
        semestre ›{" "}
        {unit && (
          <Link href={`/disciplinas/${unit.id}`}>
            {unit.code} {unit.title}
          </Link>
        )}
      </nav>
      <header className={`page-header ${styles.hero}`}>
        {unit && (
          <p className="eyebrow">
            {unit.code} · Aula {position} de {unit.lessonIds.length}
          </p>
        )}
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
          <h2 style={{ marginTop: 0 }}>Aula em preparação</h2>
          <p>
            A estrutura desta aula está definida na grade; o conteúdo completo,
            os exemplos e os exercícios serão publicados numa próxima etapa.
          </p>
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
          <div className={styles.layout}>
            <div className={styles.main}>
              <PrerequisiteNotice lesson={lesson} />
              <section
                className={`card ${styles.objectivesCard}`}
                aria-labelledby="objetivos"
                style={{ marginBottom: 16 }}
              >
                <h2 id="objetivos" style={{ marginTop: 0 }}>
                  Objetivos
                </h2>
                <p className="muted">
                  Ao final desta aula, você deverá ser capaz de:
                </p>
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
                    Abrir o laboratório de escrita
                  </Link>
                </section>
              )}
            </div>
            <LessonGuide
              sections={lesson.sections.map((sec, i) => ({
                id: sectionId(i),
                title: sec.title,
              }))}
            />
          </div>
        </>
      )}
      {next && (
        <p style={{ marginTop: 32 }}>
          Próxima aula na grade:{" "}
          <Link href={`/licoes/${next.id}`}>{next.title}</Link> (liberada após a
          conclusão desta e dos demais pré-requisitos).
        </p>
      )}
    </article>
  );
}
