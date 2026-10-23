"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/useAuth";

export function AccountLink({ className }: { className?: string }) {
  const { configured, loading, user } = useAuth();
  if (!configured) return <span className={className}>Modo local (sem conta)</span>;
  if (loading) return <span className={className}>…</span>;
  return (
    <Link href="/entrar" className={className}>
      {user ? `Conta: ${user.email ?? "conectado"}` : "Entrar / criar conta"}
    </Link>
  );
}
