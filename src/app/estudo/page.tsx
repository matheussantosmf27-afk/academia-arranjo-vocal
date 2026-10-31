import type { Metadata } from "next";
import { StudyHub } from "@/components/StudyHub";
import { postTest, preTest } from "@/content/tasks";

export const metadata: Metadata = { title: "Acompanhamento do estudo" };

export default function EstudoPage() {
  const pre = preTest().map((t) => ({ id: t.id }));
  const post = postTest().map((t) => ({ id: t.id }));
  return (
    <div className="page">
      <header className="page-header">
        <p className="eyebrow">Validação pedagógica</p>
        <h1>Acompanhamento do estudo</h1>
        <p>
          Para saber se o curso funciona, é preciso medir antes e depois. Esta página reúne o seu perfil musical inicial, um pré-teste e um pós-teste de escrita (as mesmas situações para todos), a
          retenção depois de 7 e 21 dias e os indicadores de processo: tempo, dicas e correções. Tudo vem das suas próprias tentativas; nada aqui é simulado ou estimado.
        </p>
      </header>
      <StudyHub pre={pre} post={post} />
    </div>
  );
}
