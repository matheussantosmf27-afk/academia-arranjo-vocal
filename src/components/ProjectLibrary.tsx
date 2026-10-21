"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EXAMPLE_SCORES } from "@/domain/music/examples";
import { deleteDraft, listDrafts } from "@/lib/projects/store";
import { useHydrated } from "@/lib/useHydrated";

export function ProjectLibrary() {
  const hydrated = useHydrated();
  const [version, setVersion] = useState(0);
  const drafts = useMemo(() => (hydrated ? listDrafts() : null), [hydrated, version]); // eslint-disable-line react-hooks/exhaustive-deps
  const [confirm, setConfirm] = useState<string | null>(null);
  return (
    <div className="stack" style={{ gap: 24 }}>
      <section aria-labelledby="rasc">
        <h2 id="rasc">Meus rascunhos</h2>
        {drafts === null ? (
          <p className="muted">Carregando…</p>
        ) : drafts.length === 0 ? (
          <p className="muted">
            Nenhum rascunho salvo. Crie um no <Link href="/estudio">Estúdio</Link> e use “Salvar rascunho”.
          </p>
        ) : (
          <ul className="stack" style={{ listStyle: "none", padding: 0 }}>
            {drafts.map((d) => (
              <li key={d.id} className="card row">
                <span className={`chip ${d.formation === "SATB" ? "chip-satb" : "chip-ttbb"}`}>{d.formation}</span>
                <strong>{d.title}</strong>
                <span className="muted">salvo em {new Date(d.updatedAt).toLocaleString("pt-BR")}</span>
                <span className="spacer" />
                <Link className="btn btn-sm btn-primary" href={`/estudio?projeto=${encodeURIComponent(d.id)}`}>
                  Abrir
                </Link>
                {confirm === d.id ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-sm btn-accent"
                      onClick={() => {
                        deleteDraft(d.id);
                        setVersion((v) => v + 1);
                        setConfirm(null);
                      }}
                    >
                      Confirmar exclusão
                    </button>
                    <button type="button" className="btn btn-sm" onClick={() => setConfirm(null)}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button type="button" className="btn btn-sm" onClick={() => setConfirm(d.id)}>
                    Excluir…
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section aria-labelledby="exs">
        <h2 id="exs">Exemplos de referência</h2>
        <div className="grid">
          {EXAMPLE_SCORES.map((s) => (
            <div key={s.id} className="card stack" style={{ gap: 6 }}>
              <span className={`chip ${s.formation === "SATB" ? "chip-satb" : "chip-ttbb"}`} style={{ alignSelf: "flex-start" }}>
                {s.formation}
              </span>
              <strong>{s.title}</strong>
              {s.metadata.notes && <p className="muted" style={{ margin: 0, fontSize: "0.88rem" }}>{s.metadata.notes}</p>}
              <Link className="btn btn-sm" href={`/estudio?exemplo=${s.id}`} style={{ alignSelf: "flex-start" }}>
                Abrir no Estúdio
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
