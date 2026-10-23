"use client";

import Link from "next/link";
import { LESSONS, LEVELS, getLesson } from "@/content/curriculum/curriculum";
import { recommendLessons } from "@/domain/tutor/recommend";
import { itemsToReview, lessonStatus, skillSummary } from "@/lib/progress/model";
import { useProgress } from "@/lib/progress/useProgress";
import styles from "./Dashboard.module.css";

export function Dashboard() {
  const { state, hydrated } = useProgress();
  const available = LESSONS.filter((l) => l.status === "disponivel");
  const done = (id: string) => hydrated && lessonStatus(state, getLesson(id)!) === "dominada";
  const mastered = hydrated ? available.filter((l) => lessonStatus(state, l) === "dominada") : [];
  const nextLesson = hydrated ? available.find((l) => ["disponivel", "em-andamento"].includes(lessonStatus(state, l))) : available[0];
  const nextUnit = nextLesson ? LEVELS.flatMap((lv) => lv.units).find((u) => u.id === nextLesson.unitId) : undefined;
  const review = hydrated ? itemsToReview(state) : [];
  const recommendations = hydrated ? recommendLessons(skillSummary(state)) : [];
  const hours = Math.round(LESSONS.reduce((m, l) => m + l.estimatedMinutes, 0) / 60);

  return (
    <div className="page">
      <header className={styles.hero}>
        <div>
          <p className="eyebrow">Curso de Arranjo Vocal</p>
          <h1>Aprenda a escrever, estruturar e criar arranjos vocais.</h1>
          <p className={styles.lead}>
            Um curso em {LEVELS.length} semestres, com aulas em texto, exemplos para ouvir voz por voz, verificações com resposta comentada e trabalhos avaliados
            por rubrica — do papel do arranjador ao arranjo completo para coro, pop a cappella, gospel e música popular brasileira.
          </p>
          <div className="row">
            {nextLesson && (
              <Link className="btn btn-accent" href={`/licoes/${nextLesson.id}`}>
                {mastered.length === 0 ? "Começar o curso" : "Continuar"}: {nextLesson.title}
              </Link>
            )}
            <Link className="btn" href="/curriculo">
              Ver a grade curricular
            </Link>
          </div>
          {nextUnit && hydrated && mastered.length > 0 && (
            <p className="muted" style={{ marginTop: 10, marginBottom: 0 }}>
              Você está em {nextUnit.code} — {nextUnit.title}.
            </p>
          )}
        </div>
      </header>

      <h2>Seu percurso</h2>
      <div className={styles.semesters}>
        {LEVELS.map((level) => {
          const ids = level.units.flatMap((u) => u.lessonIds);
          const n = ids.filter(done).length;
          return (
            <section key={level.id} className="card" aria-labelledby={`dash-${level.id}`}>
              <p className="eyebrow" style={{ margin: 0 }}>
                {level.number}º semestre
              </p>
              <h3 id={`dash-${level.id}`} className={styles.cardTitle}>
                {level.title}
              </h3>
              <ul className={styles.list}>
                {level.units.map((u) => (
                  <li key={u.id}>
                    <Link href={`/disciplinas/${u.id}`}>
                      <span className={styles.code}>{u.code}</span> {u.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="progress-bar" aria-hidden="true">
                <span style={{ width: `${(n / ids.length) * 100}%` }} />
              </div>
              <p className="muted" style={{ margin: "6px 0 0", fontSize: "0.85rem" }}>
                {n}/{ids.length} aulas concluídas
              </p>
            </section>
          );
        })}
      </div>

      <div className="grid" style={{ marginTop: 16 }}>
        <section className="card" aria-labelledby="dash-progresso">
          <h2 id="dash-progresso" className={styles.cardTitle}>
            Progresso no curso
          </h2>
          <p className={styles.big}>
            {mastered.length}/{available.length}
          </p>
          <p className="muted">aulas concluídas (≈ {hours} h de estudo no total)</p>
          <div className="progress-bar" aria-hidden="true">
            <span style={{ width: `${available.length ? (mastered.length / available.length) * 100 : 0}%` }} />
          </div>
        </section>

        <section className="card" aria-labelledby="dash-revisao">
          <h2 id="dash-revisao" className={styles.cardTitle}>
            Revisão de erros
          </h2>
          {review.length === 0 ? (
            <p className="muted">Nenhum item pendente. Os erros da última verificação de cada aula aparecem aqui.</p>
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

        <section className="card" aria-labelledby="dash-recomendacoes">
          <h2 id="dash-recomendacoes" className={styles.cardTitle}>
            Recomendações de estudo
          </h2>
          {recommendations.length === 0 ? (
            <p className="muted">Sem habilidades abaixo de 70% nas suas verificações. Siga a grade.</p>
          ) : (
            <ul className={styles.list}>
              {recommendations.map((r) => (
                <li key={r.skill}>
                  {r.skill} ({Math.round(r.rate * 100)}%):{" "}
                  {r.lessonIds.map((id, i) => (
                    <span key={id}>
                      {i > 0 && ", "}
                      <Link href={`/licoes/${id}`}>{getLesson(id)?.title}</Link>
                    </span>
                  ))}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <h2>Como o curso funciona</h2>
      <div className="grid">
        {[
          { href: "/curriculo", title: "Aulas", text: "Cada aula tem objetivos, explicação, exemplos certos e errados para ouvir, e uma verificação. Concluir libera as aulas seguintes." },
          { href: "/projetos", title: "Trabalhos práticos", text: "Ao fim de cada semestre, um arranjo avaliado por rubrica em nove critérios, com comparação entre versões." },
          { href: "/estudio", title: "Laboratório de escrita", text: "Onde você pratica: escreva a quatro vozes, ouça cada naipe e receba o diagnóstico do motor." },
          { href: "/laboratorio", title: "Laboratório auditivo", text: "Treino de intervalos e acordes de ouvido, com prática ilimitada." },
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
