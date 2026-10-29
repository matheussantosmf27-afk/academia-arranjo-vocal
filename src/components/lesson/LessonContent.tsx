import type { ContentBlock, Lesson } from "@/content/curriculum/types";
import { buildPracticeItems } from "@/domain/exercises/engine";
import type { ChoiceItem } from "@/domain/exercises/types";
import { Challenge } from "./Challenge";
import { ExampleBlock } from "./ExampleBlock";
import { ListeningBlock } from "./ListeningBlock";
import { QuickCheck } from "./QuickCheck";
import styles from "./Lesson.module.css";

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;
    case "list":
      return block.ordered ? (
        <ol>{block.items.map((i) => <li key={i}>{i}</li>)}</ol>
      ) : (
        <ul>{block.items.map((i) => <li key={i}>{i}</li>)}</ul>
      );
    case "callout":
      return (
        <aside className={`callout callout-${block.tone}`}>
          <strong>{block.title}</strong>
          {block.text}
        </aside>
      );
    case "table":
      return (
        <div className="table-wrap" style={{ margin: "0 0 1em" }}>
          <table className="data">
            <caption>{block.caption}</caption>
            <thead>
              <tr>{block.headers.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((r) => (
                <tr key={r.join("|")}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "example":
      return <ExampleBlock score={block.score} verdict={block.verdict} caption={block.caption} commentary={block.commentary} />;
    case "listening":
      return <ListeningBlock title={block.title} score={block.score} instructions={block.instructions} {...(block.focus ? { focus: block.focus } : {})} />;
    case "challenge":
      return <Challenge block={block} />;
  }
}

export const sectionId = (i: number) => `secao-${i + 1}`;

/** Semente fixa por aula: a página renderiza igual no servidor e no cliente. */
function lessonSeed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) h = Math.imul(h ^ id.charCodeAt(i), 16777619);
  return h >>> 0;
}

/**
 * Perguntas rápidas intercaladas, uma ao fim de cada seção. Vêm dos geradores da
 * aula (prática nova), nunca dos itens estáticos pontuados na verificação.
 */
export function quickChecksFor(lesson: Lesson): (ChoiceItem | null)[] {
  const pool = lesson.exercises ? buildPracticeItems(lesson.exercises, lessonSeed(lesson.id), lesson.sections.length) : [];
  return lesson.sections.map((_, i) => pool[i] ?? null);
}

export function LessonContent({ lesson }: { lesson: Lesson }) {
  const checks = quickChecksFor(lesson);
  return (
    <div className={styles.body}>
      {lesson.sections.map((s, i) => (
        <section key={s.title} id={sectionId(i)} aria-labelledby={`${sectionId(i)}-t`} data-lesson-section>
          <h2 id={`${sectionId(i)}-t`}>{s.title}</h2>
          {s.blocks.map((b, k) => (
            <Block key={k} block={b} />
          ))}
          {checks[i] && <QuickCheck item={checks[i]} />}
        </section>
      ))}
    </div>
  );
}
