"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { type CloudArrangement, deleteArrangement, listArrangements } from "@/app/actions/arrangements";
import { useAuth } from "@/lib/auth/useAuth";
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
      <CloudArrangements />
      <section aria-labelledby="rasc">
        <h2 id="rasc">Rascunhos neste navegador</h2>
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

function CloudArrangements() {
  const { configured, user, loading } = useAuth();
  const [items, setItems] = useState<CloudArrangement[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    if (!user) return;
    let active = true;
    void listArrangements().then((r) => {
      if (!active) return;
      if (r.ok) setItems(r.items);
      else setError(r.error);
    });
    return () => {
      active = false;
    };
  }, [user, version]);
  if (!configured) return null;
  return (
    <section aria-labelledby="conta">
      <h2 id="conta">Na minha conta</h2>
      {loading ? (
        <p className="muted">Carregando…</p>
      ) : !user ? (
        <p className="muted">
          <Link href="/entrar">Entre na sua conta</Link> para salvar arranjos com histórico de versões.
        </p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : items === null ? (
        <p className="muted">Carregando…</p>
      ) : items.length === 0 ? (
        <p className="muted">Nenhum arranjo salvo na conta. No Estúdio, use “Salvar na conta”.</p>
      ) : (
        <ul className="stack" style={{ listStyle: "none", padding: 0 }}>
          {items.map((a) => (
            <li key={a.id} className="card row">
              <span className={`chip ${a.formation === "SATB" ? "chip-satb" : "chip-ttbb"}`}>{a.formation}</span>
              <strong>{a.title}</strong>
              <span className="muted">
                {a.versions} versão(ões) · {new Date(a.updatedAt).toLocaleString("pt-BR")}
              </span>
              <span className="spacer" />
              <Link className="btn btn-sm btn-primary" href={`/estudio?arranjo=${a.id}`}>
                Abrir
              </Link>
              {confirm === a.id ? (
                <>
                  <button
                    type="button"
                    className="btn btn-sm btn-accent"
                    onClick={async () => {
                      const r = await deleteArrangement(a.id);
                      if (!r.ok) setError(r.error);
                      setConfirm(null);
                      setVersion((v) => v + 1);
                    }}
                  >
                    Confirmar exclusão (todas as versões)
                  </button>
                  <button type="button" className="btn btn-sm" onClick={() => setConfirm(null)}>
                    Cancelar
                  </button>
                </>
              ) : (
                <button type="button" className="btn btn-sm" onClick={() => setConfirm(a.id)}>
                  Excluir…
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
