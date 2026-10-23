import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";

export const metadata: Metadata = { title: "Conta" };

export default function SignInPage() {
  return (
    <div className="page" style={{ maxWidth: 560 }}>
      <header className="page-header">
        <p className="eyebrow">Conta</p>
        <h1>Entrar na Academia</h1>
        <p>Com a conta, suas tentativas, seu domínio das lições e seus arranjos (com versões) ficam salvos com segurança e acessíveis em qualquer dispositivo.</p>
      </header>
      <AuthForm />
    </div>
  );
}
