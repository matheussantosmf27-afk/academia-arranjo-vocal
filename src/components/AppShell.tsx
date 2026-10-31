"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { AccountLink } from "./AccountLink";
import { AccountSync } from "./AccountSync";
import styles from "./AppShell.module.css";

const NAV: Array<{ href: string; label: string; short: string; icon: ReactNode }> = [
  { href: "/", label: "Início", short: "Início", icon: <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /> },
  { href: "/curriculo", label: "Grade curricular", short: "Grade", icon: <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4zm4 4v2h8V8zm0 4v2h6v-2z" /> },
  { href: "/laboratorio", label: "Laboratório auditivo", short: "Auditivo", icon: <path d="M12 3a7 7 0 0 0-7 7v5a3 3 0 0 0 3 3h1v-7H7v-1a5 5 0 0 1 10 0v1h-2v7h1a3 3 0 0 0 3-3v-5a7 7 0 0 0-7-7z" /> },
  { href: "/repertorio", label: "Repertório", short: "Repertório", icon: <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="none" stroke="currentColor" strokeWidth="1.6" /> },
  { href: "/projetos", label: "Trabalhos práticos", short: "Trabalhos", icon: <path d="M3 5h7l2 2h9v12H3z" /> },
  { href: "/estudio", label: "Laboratório de escrita", short: "Escrita", icon: <path d="M3 6h18M3 9h18M3 12h18M3 15h18M3 18h18M8 4v10" fill="none" stroke="currentColor" strokeWidth="1.6" /> },
  { href: "/perfil", label: "Competências", short: "Competências", icon: <path d="M12 2l2.9 6.3L22 9.2l-5.2 4.7L18.2 21 12 17.3 5.8 21l1.4-7.1L2 9.2l7.1-.9z" /> },
];

/** Logotipo: quatro barras de equalizador nas cores das vozes. */
function BrandMark() {
  return (
    <svg className={styles.brandMark} viewBox="0 0 40 40" aria-hidden="true">
      <defs>
        <linearGradient id="brandBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c2185b" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#brandBg)" />
      {[
        { x: 8, h: 14, c: "#ff4d9d" },
        { x: 15.5, h: 22, c: "#ffb547" },
        { x: 23, h: 17, c: "#2ee6ff" },
        { x: 30.5, h: 10, c: "#a3e635" },
      ].map((b, i) => (
        <rect key={b.x} className={styles.bar} style={{ animationDelay: `${i * 0.18}s` }} x={b.x - 2} y={20 - b.h / 2} width="4" height={b.h} rx="2" fill={b.c} />
      ))}
    </svg>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href) || (href === "/curriculo" && (pathname.startsWith("/licoes") || pathname.startsWith("/disciplinas")));
  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header className={styles.topbar}>
        <div className={styles.topInner}>
          <Link href="/" className={styles.brand}>
            <BrandMark />
            <span className={styles.brandText}>
              Academia de Arranjo Vocal
              <small>Curso de arranjo vocal</small>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Navegação principal">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink} aria-label={item.label} aria-current={isActive(item.href) ? "page" : undefined}>
                <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {item.icon}
                </svg>
                <span>{item.short}</span>
              </Link>
            ))}
          </nav>
          <AccountLink className={styles.account} />
        </div>
      </header>
      <AccountSync />
      <main id="conteudo" className={styles.main} tabIndex={-1}>
        {children}
      </main>
      <footer className={styles.footer}>
        <span>Academia de Arranjo Vocal</span>
        <span>Sem conta, progresso e rascunhos ficam salvos apenas neste navegador.</span>
      </footer>
    </div>
  );
}
