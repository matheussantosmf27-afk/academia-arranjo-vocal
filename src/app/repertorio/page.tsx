import type { Metadata } from "next";
import Link from "next/link";
import { ExampleBlock } from "@/components/lesson/ExampleBlock";
import { REPERTORIO } from "@/content/repertorio";

export const metadata: Metadata = { title: "Repertório" };

export default function RepertorioPage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Repertório em domínio público</p>
        <h1>Hinos e corais de verdade</h1>
        <p>
          Peças que coros cantam, com as notas da fonte citada em cada uma. Todas estão em domínio público: os autores morreram há mais de 70 anos (Lei 9.610/98, art. 41). As letras estão no idioma
          original, porque traduções e arranjos de hinários atuais podem ser protegidos.
        </p>
      </header>
      {REPERTORIO.map((p) => (
        <section key={p.id} id={p.id} aria-labelledby={`${p.id}-t`} className="card" style={{ marginBottom: 24 }}>
          <h2 id={`${p.id}-t`}>{p.titulo}</h2>
          <p className="muted">{p.conhecidoComo}.</p>
          <p>{p.autoria}</p>
          <ExampleBlock score={p.score} verdict="observacao" caption={p.titulo} commentary={p.analise} />
          <p>
            <Link className="btn btn-sm" href={`/estudio?exemplo=${p.score.id}`}>
              Abrir no laboratório de escrita
            </Link>
          </p>
          <details>
            <summary>Fonte e direitos</summary>
            <p>
              Fonte: <a href={p.fonte.url}>{p.fonte.descricao}</a>.
            </p>
            <p>{p.dominioPublico}</p>
          </details>
        </section>
      ))}
    </div>
  );
}
