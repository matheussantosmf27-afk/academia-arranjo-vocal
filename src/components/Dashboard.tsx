"use client";

import Link from "next/link";
import { EXA } from "@/content/curriculum/examples-arranjo";
import { LESSONS, LEVELS, getLesson } from "@/content/curriculum/curriculum";
import { recommendLessons } from "@/domain/tutor/recommend";
import { XP, gameStats } from "@/lib/progress/gamification";
import { dueLabel, dueReviews } from "@/lib/progress/review";
import { itemsToReview, lessonStatus, skillSummary } from "@/lib/progress/model";
import { useProgress } from "@/lib/progress/useProgress";
import { SoundWaves } from "./visual/SoundWaves";
import { VoiceMixer } from "./visual/VoiceMixer";
import styles from "./Dashboard.module.css";

function Ring({ value, label }: { value: number; label: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg className={styles.ring} viewBox="0 0 64 64" role="img" aria-label={label}>
      <circle cx="32" cy="32" r={r} className={styles.ringTrack} />
      <circle cx="32" cy="32" r={r} className={styles.ringValue} strokeDasharray={c} strokeDashoffset={c * (1 - Math.max(0, Math.min(1, value)))} />
    </svg>
  );
}

export function Dashboard() {
  const { state, hydrated } = useProgress();
  const available = LESSONS.filter((l) => l.status === "disponivel");
  const done = (id: string) => hydrated && lessonStatus(state, getLesson(id)!) === "dominada";
  const mastered = hydrated ? available.filter((l) => lessonStatus(state, l) === "dominada") : [];
  const nextLesson = hydrated ? available.find((l) => ["disponivel", "em-andamento"].includes(lessonStatus(state, l))) : available[0];
  const nextUnit = nextLesson ? LEVELS.flatMap((lv) => lv.units).find((u) => u.id === nextLesson.unitId) : undefined;
  const review = hydrated ? itemsToReview(state) : [];
  const recommendations = hydrated ? recommendLessons(skillSummary(state)) : [];
  const reviews = hydrated ? dueReviews(state, LESSONS) : [];
  const stats = gameStats(hydrated ? state : { version: 1, attempts: [], lessonsRead: [] }, LESSONS);
  const hours = Math.round(LESSONS.reduce((m, l) => m + l.estimatedMinutes, 0) / 60);

  return (
    <div className="page page-wide">
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <p className="eyebrow">Curso de Arranjo Vocal</p>
          <h1>
            Aprenda a escrever, estruturar e criar <span className="gradient-text">arranjos vocais.</span>
          </h1>
          <p className={styles.lead}>
            {LEVELS.length} semestres, {LESSONS.length} aulas e ≈ {hours} horas de estudo: você ouve cada voz separada, vê o desenho das linhas em cores, responde
            perguntas no meio da aula e pratica num editor que aponta os erros de condução.
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
        </div>
        <div className={styles.heroArt}>
          <SoundWaves />
          <div className={styles.voiceTags} aria-hidden="true">
            <span className="voice-S">Soprano</span>
            <span className="voice-A">Contralto</span>
            <span className="voice-T">Tenor</span>
            <span className="voice-B">Baixo</span>
          </div>
        </div>
      </header>

      <section className={styles.stats} aria-label="Seu desempenho">
        <div className={`card ${styles.stat}`}>
          <Ring value={stats.levelProgress} label={`Progresso no nível: ${Math.round(stats.levelProgress * 100)}%`} />
          <div>
            <p className={styles.statLabel}>Nível {stats.level}</p>
            <p className={styles.statValue}>{stats.levelName}</p>
            <p className={styles.statHint}>
              {stats.xp} XP · próximo nível em {stats.nextLevelXp} XP
            </p>
          </div>
        </div>
        <div className={`card ${styles.stat}`}>
          <span className={styles.statIcon} aria-hidden="true">
            📅
          </span>
          <div>
            <p className={styles.statLabel}>Dias de estudo (últimos 14)</p>
            <p className={styles.statValue}>
              {stats.studyDays} {stats.studyDays === 1 ? "dia" : "dias"}
            </p>
            <p className={styles.statHint}>Estudo regular ajuda a reter. Pausas não zeram o contador.</p>
          </div>
        </div>
        <div className={`card ${styles.stat}`}>
          <Ring value={available.length ? mastered.length / available.length : 0} label={`${mastered.length} de ${available.length} aulas concluídas`} />
          <div>
            <p className={styles.statLabel}>Aulas concluídas</p>
            <p className={styles.statValue}>
              {mastered.length}/{available.length}
            </p>
            <p className={styles.statHint}>
              Aula concluída: {XP.mastered} XP · revisão no prazo: {XP.review} XP · {stats.retainedReviews} revisão(ões) no prazo
            </p>
          </div>
        </div>
        {nextLesson && (
          <Link href={`/licoes/${nextLesson.id}`} className={`card ${styles.stat} ${styles.next}`}>
            <span className={styles.statIcon} aria-hidden="true">
              ▶
            </span>
            <div>
              <p className={styles.statLabel}>{nextUnit ? `${nextUnit.code} · próxima aula` : "Próxima aula"}</p>
              <p className={styles.statValueSm}>{nextLesson.title}</p>
              <p className={styles.statHint}>≈ {nextLesson.estimatedMinutes} min</p>
            </div>
          </Link>
        )}
      </section>

      <section className={`card ${styles.mixerCard}`} aria-labelledby="mixer-t">
        <div className={styles.sectionHead}>
          <p className="eyebrow">Experimente agora</p>
          <h2 id="mixer-t">Ouça um arranjo se formar, voz por voz</h2>
          <p className="muted">
            A melodia sozinha, depois o baixo, depois as vozes do meio: é assim que se pensa um arranjo. Ligue e desligue cada voz enquanto o coral toca.
          </p>
        </div>
        <VoiceMixer score={EXA.melodiaHarmonizada} />
      </section>

      <section aria-labelledby="percurso-t">
        <h2 id="percurso-t">Seu percurso</h2>
        <ol className={styles.path}>
          {LEVELS.map((level) => {
            const ids = level.units.flatMap((u) => u.lessonIds);
            const n = ids.filter(done).length;
            return (
              <li key={level.id} className={styles.node}>
                <span className={styles.nodeDot} aria-hidden="true">
                  {level.number}
                </span>
                <div className={`card ${styles.nodeCard}`}>
                  <p className="eyebrow" style={{ margin: 0 }}>
                    {level.number}º semestre
                  </p>
                  <h3 className={styles.cardTitle}>{level.title}</h3>
                  <ul className={styles.units}>
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
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="card" aria-labelledby="dash-espacada" style={{ marginTop: 20 }}>
        <h2 id="dash-espacada" className={styles.cardTitle}>
          Revisões espaçadas para hoje
        </h2>
        {!hydrated ? null : reviews.length === 0 ? (
          <p className="muted">
            Nenhuma revisão vencida. Cada aula concluída volta para revisão em 1, 3, 7, 21 e 60 dias, com itens novos; os prazos crescem só quando a revisão é
            aprovada no prazo.
          </p>
        ) : (
          <ul className={styles.list}>
            {reviews.slice(0, 8).map((r) => (
              <li key={r.lessonId}>
                <Link href={`/licoes/${r.lessonId}#revisao`}>{getLesson(r.lessonId)?.title}</Link> — {dueLabel(r)}
                {r.lapses > 0 ? ` · esquecida ${r.lapses}× antes` : ""}
              </li>
            ))}
            {reviews.length > 8 && <li className="muted">e mais {reviews.length - 8}.</li>}
          </ul>
        )}
      </section>

      <div className="grid" style={{ marginTop: 20 }}>
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
      <div className={styles.how}>
        {[
          { href: "/curriculo", icon: "🎓", title: "Aulas", text: "Objetivos, explicação, exemplos certos e errados para ouvir e perguntas rápidas no meio da aula. Concluir libera as próximas." },
          { href: "/projetos", icon: "🏆", title: "Trabalhos práticos", text: "Um arranjo por semestre, com rascunho ouvido antes da entrega e avaliação por rubrica em nove critérios." },
          { href: "/estudio", icon: "🎼", title: "Laboratório de escrita", text: "Escreva a quatro vozes, ouça cada naipe e receba o diagnóstico do motor em tempo real." },
          { href: "/laboratorio", icon: "🎧", title: "Laboratório auditivo", text: "Treino de intervalos e acordes de ouvido, com prática ilimitada." },
        ].map((c) => (
          <Link key={c.href} href={c.href} className={`card ${styles.tile}`}>
            <span className={styles.tileIcon} aria-hidden="true">
              {c.icon}
            </span>
            <h3>{c.title}</h3>
            <p className="muted">{c.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
