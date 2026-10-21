# Academia de Arranjo Vocal

Plataforma web de formação em arranjo vocal **SATB** e **TTBB**: currículo progressivo com critério de domínio, notação musical real, reprodução por voz e um motor determinístico de validação de condução de vozes. Produto independente (repositório e futuro projeto Supabase próprios).

> **Situação:** etapas 1–3 concluídas; etapa 7 (Supabase) implementada e testada contra a stack local — o projeto remoto ainda não existe (limite do plano gratuito; ver `docs/supabase.md`). Sem configuração, o app funciona em modo local (navegador). Plano completo em `docs/arquitetura.md`.

## O que já funciona
- **Painel**, **Currículo** (5 níveis, 8 unidades, 22 lições; 3 publicadas com conteúdo completo) e **Competências** (desempenho por habilidade, histórico com semente reprodutível).
- **Lições completas:** *Vozes, claves e extensões (SATB/TTBB)*, *Intervalos*, *Tríades e inversões* — objetivos mensuráveis, explicações, exemplos corretos e incorretos validados pelo motor, escuta guiada por voz, exercícios gerados com respostas comentadas, critério de domínio com itens essenciais, aplicação no Estúdio. Lições seguintes só liberam exercícios após domínio dos pré-requisitos; novas tentativas são ilimitadas.
- **Estúdio experimental:** notação VexFlow gerada do modelo (duas vozes por pauta, clave de sol oitavada para tenores), seleção por clique ou teclado, edição de altura (grau, semitom, oitava, letra), duração/ponto, nota↔pausa, ligaduras, letra, andamento, desfazer/refazer, zoom, novo arranjo SATB/TTBB, rascunhos locais, exportação/importação JSON validada, cifragem romana, diagnósticos ao vivo por estilo, reprodução completa / por voz / pares com cursor.
- **Laboratório auditivo:** intervalos e acordes de ouvido (prática livre).
- **Conta (quando o Supabase está configurado):** cadastro/entrada por e-mail e senha, tentativas registradas e **recorrigidas no servidor**, domínio por lição, arranjos com histórico de versões e relatório do motor, RLS em todas as tabelas.

## Ainda não disponível (identificado na interface)
MusicXML, MIDI e PDF (etapa 9) · projetos com rubrica (etapa 8) · tutor de IA (etapa 9, somente sobre diagnósticos existentes).

## Áudio
Síntese Web Audio com timbre neutro: confere alturas, ritmo e condução, mas **não representa** vozes reais (sem vogais, vibrato ou afinação justa).

## Desenvolvimento
```bash
npm install
npm run dev            # http://localhost:3000
npm run lint
npm run typecheck
npm test               # Vitest — domínio, motor, exercícios, conteúdo, progresso
npm run build
npm run test:e2e       # Playwright (requer `npm run build`; sobe `next start` na porta 3100)
npm run check          # lint + typecheck + testes + build
npm run test:integration  # RLS/persistência (requer AAV_TEST_DATABASE_URL)
npm run db:catalog     # regenera o seed do catálogo a partir do currículo
```
Variáveis de ambiente: veja `.env.example` (opcionais — sem elas, modo local).

## Documentação
- `docs/estado-inicial.md` — inspeção inicial e confirmação de independência
- `docs/arquitetura.md` — arquitetura, decisões, estrutura, modelo de dados e plano
- `docs/convencoes-musicais.md` — oitavas, MIDI, altura escrita × sonora, pautas
- `docs/motor-de-validacao.md` — regras, categorias, estilos e limitações
- `docs/supabase.md` — banco, segurança, desenvolvimento local e ativação do projeto remoto
- `supabase/migrations/` — esquema com RLS (aplicado e testado localmente; **não aplicado em nenhum projeto remoto**)
