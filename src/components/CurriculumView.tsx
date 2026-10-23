"use client";

import Link from "next/link";
import { LESSONS, LEVELS } from "@/content/curriculum/curriculum";
import { PROJECTS } from "@/content/projects";
import { lessonStatus } from "@/lib/progress/model";
import { useProgress } from "@/lib/progress/useProgress";
import styles from "./CurriculumView.module.css";

const LABEL = {
  bloqueada: ["🔒 Bloqueada", "chip-lock"],
  disponivel: ["Disponível", ""],
  "em-andamento": ["Em andamento", "chip-alerta"],
  dominada: ["✓ Dominada", "chip-ok"],
  "em-preparacao": ["Em preparação", "chip-lock"],
} as const;

export function CurriculumView() {
  const { state, hydrated } = useProgress();
  return (
    <div className="stack" style={{ gap: 28 }}>
      {LEVELS.map((level) => (
        <section key={level.id} aria-labelledby={`nivel-${level.id}`} className={styles.level}>
          <div className={styles.levelHead}>
            <span className={styles.levelNumber} aria-hidden="true">
              {level.number}
            </span>
            <div>
              <h2 id={`nivel-${level.id}`} style={{ margin: 0 }}>
                Nível {level.number} — {level.title}
              </h2>
              <p className="muted" style={{ margin: 0 }}>
                {level.description}
              </p>
            </div>
          </div>
          {level.units.map((unit) => (
            <div key={unit.id} className={styles.unit}>
              <h3>{unit.title}</h3>
              <p className="muted">{unit.description}</p>
              <ol className={styles.lessons}>
                {unit.lessonIds.map((id) => {
                  const lesson = LESSONS.find((l) => l.id === id)!;
                  const status = hydrated ? lessonStatus(state, lesson) : lesson.status === "em-preparacao" ? "em-preparacao" : "disponivel";
                  const [label, cls] = LABEL[status];
                  return (
                    <li key={id} className={styles.lesson}>
                      <Link href={`/licoes/${id}`} className={styles.lessonLink}>
                        <span className={styles.lessonTitle}>{lesson.title}</span>
                        <span className={styles.lessonSummary}>{lesson.summary}</span>
                      </Link>
                      <span className={`chip ${cls}`}>{label}</span>
                    </li>
                  );
                })}
              </ol>
              {unit.project && (
                <p className={styles.project}>
                  <strong>Projeto da unidade:</strong> {unit.project.title} — {unit.project.description} <em>(faça no Estúdio, revisando com o motor)</em>
                </p>
              )}
            </div>
          ))}
          <p className={styles.final}>
            <strong>{level.finalProject.title}:</strong> {level.finalProject.description}{" "}
            {PROJECTS.some((p) => p.level === level.number) ? (
              <Link href="/projetos">Abrir nos projetos práticos com rubrica</Link>
            ) : (
              <em>(use o Estúdio e a revisão por diagnósticos)</em>
            )}
          </p>
        </section>
      ))}
    </div>
  );
}
