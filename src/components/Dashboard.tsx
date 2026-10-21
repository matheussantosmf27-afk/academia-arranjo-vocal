"use client";

import Link from "next/link";
import { COMPETENCIES, LESSONS, LEVELS, getLesson } from "@/content/curriculum/curriculum";
import { lessonStatus, itemsToReview } from "@/lib/progress/model";
import { useProgress } from "@/lib/progress/useProgress";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  const { state, hydrated } = useProgress();
  const available = LESSONS.filter((l) => l.status === "disponivel");
  const mastered = hydrated ? available.filter((l) => lessonStatus(state, l) === "dominada") : [];
  const nextLesson = hydrated
    ? available.find((l) => ["disponivel", "em-andamento"].includes(lessonStatus(state, l)))
    : available[0];
  const review = hydrated ? itemsToReview(state) : [];
  const recent = hydrated ? [...state.attempts].sort((a, b) => b.finishedAt.localeCompare(a.finishedAt)).slice(0, 5) : [];

  return (
    <div className="page">
      <header className={styles.hero}>
        <div>
          <p className="eyebrow">Academia de Arranjo Vocal</p>
          <h1>Escreva para vozes reais.</h1>
          <p className={styles.lead}>
            Harmonia, condução de vozes, percepção e escrita coral para <span className="chip chip-satb">SATB</span> e <span className="chip chip-ttbb">TTBB</span>, com
            diagnósticos explicados e reproduzíveis.
          </p>
          <div className="row">
            {nextLesson && (
              <Link className="btn btn-accent" href={`/licoes/${nextLesson.id}`}>
                {mastered.length === 0 ? "Começar" : "Continuar"}: {nextLesson.title}
              </Link>
            )}
            <Link className="btn" href="/estudio">
              Abrir o Estúdio
            </Link>
          </div>
        </div>
      </header>

      <div className="grid">
        <section className="card" aria-labelledby="dash-progresso">
          <h2 id="dash-progresso" className={styles.cardTitle}>
            Progresso
          </h2>
          <p className={styles.big}>
            {mastered.length}/{available.length}
          </p>
          <p className="muted">lições publicadas com domínio demonstrado</p>
          <div className="progress-bar" aria-hidden="true">
            <span style={{ width: `${available.length ? (mastered.length / available.length) * 100 : 0}%` }} />
          </div>
          <p className="muted" style={{ marginTop: 10, marginBottom: 0 }}>
            {LESSONS.length} lições planejadas em {LEVELS.length} níveis; {available.length} já publicadas.
          </p>
        </section>

        <section className="card" aria-labelledby="dash-revisao">
          <h2 id="dash-revisao" className={styles.cardTitle}>
            Revisão de erros
          </h2>
          {review.length === 0 ? (
            <p className="muted">Nenhum item pendente. Os erros da última tentativa de cada lição aparecem aqui.</p>
          ) : (
            <ul className={styles.list}>
              {Object.entries(
                review.reduce<Record<string, number>>((acc, r) => {
                  acc[r.lessonId] = (acc[r.lessonId] ?? 0) + 1;
                  return acc;
                }, {}),
              ).map(([lessonId, n]) => (
                <li key={lessonId}>
                  <Link href={`/licoes/${lessonId}#exercicios`}>{getLesson(lessonId)?.title}</Link> — {n} item(ns) a revisar
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card" aria-labelledby="dash-recentes">
          <h2 id="dash-recentes" className={styles.cardTitle}>
            Tentativas recentes
          </h2>
          {recent.length === 0 ? (
            <p className="muted">Ainda não há tentativas registradas.</p>
          ) : (
            <ul className={styles.list}>
              {recent.map((a) => (
                <li key={a.id}>
                  {getLesson(a.lessonId)?.title}: {Math.round(a.result.score * 100)}% {a.result.passed ? "✓" : ""}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <h2>Ambientes</h2>
      <div className="grid">
        {[
          { href: "/curriculo", title: "Currículo", text: "Níveis, unidades, pré-requisitos e projetos — do intervalo ao arranjo completo." },
          { href: "/estudio", title: "Estúdio", text: "Editor de quatro vozes com notação real, reprodução por voz e diagnóstico de condução." },
          { href: "/laboratorio", title: "Laboratório auditivo", text: "Treino de intervalos e acordes de ouvido, com prática ilimitada." },
          { href: "/projetos", title: "Projetos", text: "Rascunhos salvos e exemplos para abrir no Estúdio." },
          { href: "/perfil", title: "Competências", text: `Desempenho por habilidade: ${Object.values(COMPETENCIES).slice(0, 4).join(", ")}…` },
        ].map((c) => (
          <Link key={c.href} href={c.href} className={`card ${styles.tile}`}>
            <h3>{c.title}</h3>
            <p className="muted">{c.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
