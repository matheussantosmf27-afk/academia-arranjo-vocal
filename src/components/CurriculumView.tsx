"use client";

import Link from "next/link";
import { LESSONS, LEVELS, unitHours } from "@/content/curriculum/curriculum";
import type { Unit } from "@/content/curriculum/types";
import { PROJECTS } from "@/content/projects";
import { type ProgressState, lessonStatus } from "@/lib/progress/model";
import { useProgress } from "@/lib/progress/useProgress";
import styles from "./CurriculumView.module.css";

export const STATUS_LABEL = {
  bloqueada: ["🔒 Bloqueada", "chip-lock"],
  disponivel: ["Disponível", ""],
  "em-andamento": ["Em andamento", "chip-alerta"],
  dominada: ["✓ Concluída", "chip-ok"],
  "em-preparacao": ["Em preparação", "chip-lock"],
} as const;

export function unitDone(state: ProgressState, unit: Unit): number {
  return unit.lessonIds.filter((id) => {
    const l = LESSONS.find((x) => x.id === id);
    return l && lessonStatus(state, l) === "dominada";
  }).length;
}

export function LessonList({ unit }: { unit: Unit }) {
  const { state, hydrated } = useProgress();
  return (
    <ol className={styles.lessons}>
      {unit.lessonIds.map((id, i) => {
        const lesson = LESSONS.find((l) => l.id === id)!;
        const status = hydrated ? lessonStatus(state, lesson) : lesson.status === "em-preparacao" ? "em-preparacao" : "disponivel";
        const [label, cls] = STATUS_LABEL[status];
        return (
          <li key={id} className={styles.lesson}>
            <span className={styles.lessonIndex} aria-hidden="true">
              {i + 1}
            </span>
            <Link href={`/licoes/${id}`} className={styles.lessonLink}>
              <span className={styles.lessonTitle}>
                <span className="visually-hidden">Aula {i + 1}: </span>
                {lesson.title}
              </span>
              <span className={styles.lessonSummary}>{lesson.summary}</span>
            </Link>
            <span className={`chip ${cls}`}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

export function CurriculumView() {
  const { state, hydrated } = useProgress();
  return (
    <div className="stack" style={{ gap: 28 }}>
      {LEVELS.map((level) => (
        <section key={level.id} aria-labelledby={`semestre-${level.id}`} className={styles.level}>
          <div className={styles.levelHead}>
            <span className={styles.levelNumber} aria-hidden="true">
              {level.number}º
            </span>
            <div>
              <h2 id={`semestre-${level.id}`} style={{ margin: 0 }}>
                {level.number}º semestre — {level.title}
              </h2>
              <p className="muted" style={{ margin: 0 }}>
                {level.description}
              </p>
            </div>
          </div>
          {level.units.map((unit) => (
            <div key={unit.id} className={styles.unit}>
              <div className={styles.unitHead}>
                <h3>
                  <Link href={`/disciplinas/${unit.id}`}>
                    <span className={styles.code}>{unit.code}</span> {unit.title}
                  </Link>
                </h3>
                <span className="muted" style={{ fontSize: "0.85rem" }}>
                  {unit.lessonIds.length} aulas · ≈ {unitHours(unit)} h{hydrated ? ` · ${unitDone(state, unit)}/${unit.lessonIds.length} concluídas` : ""}
                </span>
              </div>
              <p className="muted" style={{ marginTop: 2 }}>
                <strong>Ementa:</strong> {unit.description}
              </p>
              <LessonList unit={unit} />
              {unit.project && (
                <p className={styles.project}>
                  <strong>Trabalho da disciplina:</strong> {unit.project.title} — {unit.project.description}
                </p>
              )}
            </div>
          ))}
          <p className={styles.final}>
            <strong>{level.finalProject.title}:</strong> {level.finalProject.description}{" "}
            {PROJECTS.some((p) => p.level === level.number) ? (
              <Link href="/projetos">Abrir em Trabalhos práticos (avaliação por rubrica)</Link>
            ) : (
              <em>(faça no laboratório de escrita, revisando com o motor)</em>
            )}
          </p>
        </section>
      ))}
    </div>
  );
}
