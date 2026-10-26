"use client";

import { useEffect, useState } from "react";
import styles from "./LessonGuide.module.css";

/**
 * Guia lateral da aula: lista as seções, marca as já percorridas e mostra uma
 * barra de progresso de leitura no topo da página.
 */
export function LessonGuide({ sections }: { sections: readonly { id: string; title: string }[] }) {
  const [current, setCurrent] = useState<string | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setCurrent(e.target.id);
            setSeen((prev) => (prev.has(e.target.id) ? prev : new Set(prev).add(e.target.id)));
          }
        }
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  return (
    <>
      <div className={styles.readBar} aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <nav className={styles.guide} aria-label="Seções da aula">
        <p className={styles.title}>Nesta aula</p>
        <ol>
          {sections.map((s, i) => (
            <li key={s.id} className={current === s.id ? styles.current : seen.has(s.id) ? styles.seen : undefined}>
              <a href={`#${s.id}`}>
                <span className={styles.num} aria-hidden="true">
                  {seen.has(s.id) && current !== s.id ? "✓" : i + 1}
                </span>
                {s.title.replace(/^\d+\.\s*/, "")}
              </a>
            </li>
          ))}
          <li>
            <a href="#exercicios">
              <span className={styles.num} aria-hidden="true">
                ★
              </span>
              Verificação
            </a>
          </li>
        </ol>
      </nav>
    </>
  );
}
