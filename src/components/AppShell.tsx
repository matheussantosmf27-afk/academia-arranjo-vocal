"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./AppShell.module.css";

const NAV: Array<{ href: string; label: string; icon: ReactNode }> = [
  { href: "/", label: "Painel", icon: <path d="M3 13h7V3H3zm11 8h7V11h-7zM3 21h7v-6H3zm11-18v6h7V3z" /> },
  { href: "/curriculo", label: "Currículo", icon: <path d="M4 4h12a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4zm4 4v2h8V8zm0 4v2h6v-2z" /> },
  { href: "/estudio", label: "Estúdio", icon: <path d="M2 6h20M2 9h20M2 12h20M2 15h20M2 18h20M8 4v10" fill="none" stroke="currentColor" strokeWidth="1.6" /> },
  { href: "/laboratorio", label: "Laboratório auditivo", icon: <path d="M12 3a7 7 0 0 0-7 7v5a3 3 0 0 0 3 3h1v-7H7v-1a5 5 0 0 1 10 0v1h-2v7h1a3 3 0 0 0 3-3v-5a7 7 0 0 0-7-7z" /> },
  { href: "/projetos", label: "Projetos", icon: <path d="M3 5h7l2 2h9v12H3z" /> },
  { href: "/perfil", label: "Competências", icon: <path d="M12 2l2.9 6.3L22 9.2l-5.2 4.7L18.2 21 12 17.3 5.8 21l1.4-7.1L2 9.2l7.1-.9z" /> },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href) || (href === "/curriculo" && pathname.startsWith("/licoes")));
  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <aside className={styles.sidebar} aria-label="Navegação principal">
        <Link href="/" className={styles.brand}>
          <svg className={styles.brandMark} viewBox="0 0 40 40" aria-hidden="true">
            <rect width="40" height="40" rx="9" fill="#b4235a" />
            {[12, 17, 22, 27].map((y) => (
              <line key={y} x1="7" x2="33" y1={y} y2={y} stroke="#fff" strokeOpacity="0.45" strokeWidth="1" />
            ))}
            <ellipse cx="14" cy="22" rx="3.6" ry="2.6" fill="#fff" transform="rotate(-20 14 22)" />
            <ellipse cx="26" cy="14.5" rx="3.6" ry="2.6" fill="#fff" transform="rotate(-20 26 14.5)" />
            <path d="M17.3 21.2V9.5h12" stroke="#fff" strokeWidth="1.6" fill="none" />
            <path d="M29.3 13.6V9.5" stroke="#fff" strokeWidth="1.6" />
          </svg>
          <span className={styles.brandText}>
            Academia de Arranjo Vocal
            <small>SATB · TTBB</small>
          </span>
        </Link>
        <nav className={styles.nav}>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink} aria-current={isActive(item.href) ? "page" : undefined}>
              <svg className={styles.navIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                {item.icon}
              </svg>
              {item.label}
            </Link>
          ))}
        </nav>
        <p className={styles.footer}>
          Versão inicial (etapa 3). Progresso e rascunhos ficam salvos neste navegador até a integração com a conta.
        </p>
      </aside>
      <main id="conteudo" className={styles.main} tabIndex={-1}>
        {children}
      </main>
    </div>
  );
}
