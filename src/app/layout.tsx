import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Academia de Arranjo Vocal", template: "%s · Academia de Arranjo Vocal" },
  description: "Curso de arranjo vocal: aprenda a escrever, estruturar e criar arranjos para coro, pop a cappella, gospel e MPB, com exemplos para ouvir voz por voz.",
};

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display-loaded", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body-loaded", display: "swap" });

export const viewport: Viewport = {
  themeColor: "#0b0918",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
