"use client";

import { type FormEvent, useState } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import { getBrowserSupabase } from "@/lib/supabase/client";

export function AuthForm() {
  const { configured, loading, user } = useAuth();
  const [mode, setMode] = useState<"entrar" | "criar">("entrar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "erro"; text: string } | null>(null);
  const supabase = getBrowserSupabase();

  if (!configured || !supabase) {
    return <p className="notice">A persistência na conta não está configurada neste ambiente. O app funciona no modo local (dados neste navegador).</p>;
  }
  if (loading) return <p className="muted">Carregando…</p>;

  if (user) {
    return (
      <div className="card stack">
        <p style={{ margin: 0 }}>
          Conectado como <strong>{user.email}</strong>.
        </p>
        <button
          type="button"
          className="btn"
          style={{ alignSelf: "flex-start" }}
          onClick={async () => {
            await supabase.auth.signOut();
            setMessage({ tone: "ok", text: "Você saiu da conta." });
          }}
        >
          Sair
        </button>
        {message && <p role="status">{message.text}</p>}
      </div>
    );
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    const { error, data } =
      mode === "entrar"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/entrar` } });
    setBusy(false);
    if (error) {
      const text = /invalid login/i.test(error.message) ? "E-mail ou senha incorretos." : /already registered/i.test(error.message) ? "Este e-mail já tem conta." : error.message;
      setMessage({ tone: "erro", text });
      return;
    }
    if (mode === "criar" && !data.session) setMessage({ tone: "ok", text: "Conta criada. Confirme pelo link enviado ao seu e-mail e depois entre." });
  };

  return (
    <form className="card stack" onSubmit={submit} noValidate={false}>
      <div className="row" role="tablist" aria-label="Modo">
        <button type="button" role="tab" aria-selected={mode === "entrar"} className="btn btn-sm" onClick={() => setMode("entrar")}>
          Entrar
        </button>
        <button type="button" role="tab" aria-selected={mode === "criar"} className="btn btn-sm" onClick={() => setMode("criar")}>
          Criar conta
        </button>
      </div>
      <label className="stack" style={{ gap: 2 }}>
        E-mail
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="stack" style={{ gap: 2 }}>
        Senha {mode === "criar" && <small>(mínimo de 8 caracteres)</small>}
        <input type="password" required minLength={mode === "criar" ? 8 : 1} autoComplete={mode === "entrar" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" className="btn btn-accent" disabled={busy} style={{ alignSelf: "flex-start" }}>
        {busy ? "Aguarde…" : mode === "entrar" ? "Entrar" : "Criar conta"}
      </button>
      {message && (
        <p role={message.tone === "erro" ? "alert" : "status"} style={{ color: message.tone === "erro" ? "var(--erro)" : "var(--ok)", margin: 0 }}>
          {message.text}
        </p>
      )}
    </form>
  );
}
