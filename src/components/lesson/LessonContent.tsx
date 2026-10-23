import type { ContentBlock, Lesson } from "@/content/curriculum/types";
import { ExampleBlock } from "./ExampleBlock";
import { ListeningBlock } from "./ListeningBlock";
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
  }
}

export function LessonContent({ lesson }: { lesson: Lesson }) {
  return (
    <div className={styles.body}>
      {lesson.sections.map((s) => (
        <section key={s.title} aria-labelledby={`sec-${s.title}`}>
          <h2 id={`sec-${s.title}`}>{s.title}</h2>
          {s.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </section>
      ))}
    </div>
  );
}
