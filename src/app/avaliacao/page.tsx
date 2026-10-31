import type { Metadata } from "next";
import Link from "next/link";
import { TransferHub } from "@/components/TransferHub";

export const metadata: Metadata = { title: "Avaliação de transferência" };

export default function AvaliacaoPage() {
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Avaliação de transferência</p>
        <h1>Situações que você nunca viu</h1>
        <p>
          Aqui não há exemplo resolvido para copiar. Cada situação usa uma melodia que não aparece nas aulas (primeiras frases de corais luteranos, em domínio público) e é gerada na hora: você escreve
          no laboratório e o motor confere critérios explícitos. A solução de referência só aparece depois da primeira conferência.
        </p>
        <p className="muted">
          O registro distingue quatro níveis: resolvido <strong>sem ajuda</strong>, <strong>depois de uma dica</strong>, <strong>depois de consultar a demonstração</strong> e{" "}
          <strong>depois de ver a solução</strong>. Só o primeiro conta como domínio pleno no seu painel. Para medir a sua evolução com pré-teste e pós-teste fixos, use{" "}
          <Link href="/estudo">Acompanhamento do estudo</Link>.
        </p>
      </header>
      <TransferHub />
    </div>
  );
}
