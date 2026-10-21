import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Academia de Arranjo Vocal", template: "%s · Academia de Arranjo Vocal" },
  description: "Formação aprofundada em arranjo vocal SATB e TTBB: harmonia, condução de vozes, percepção e escrita coral.",
};

export const viewport: Viewport = {
  themeColor: "#211a33",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
