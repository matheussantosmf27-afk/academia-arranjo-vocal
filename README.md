# Academia de Arranjo Vocal

Plataforma web de formação em arranjo vocal **SATB** e **TTBB**: currículo progressivo com critério de domínio, notação musical real, reprodução por voz e um motor determinístico de validação de condução de vozes. Produto independente (repositório e futuro projeto Supabase próprios).

> **Situação:** etapas 1–7 concluídas. Projeto Supabase exclusivo `academia-arranjo-vocal` criado, com migrations, catálogo e RLS aplicados (ver `docs/supabase.md`). Sem as variáveis de ambiente, o app funciona em modo local (navegador). Plano completo em `docs/arquitetura.md`.

## O que já funciona
- **Painel**, **Currículo** (5 níveis, 8 unidades, 22 lições; 3 publicadas com conteúdo completo) e **Competências** (desempenho por habilidade, histórico com semente reprodutível).
- **Lições completas:** *Vozes, claves e extensões (SATB/TTBB)*, *Intervalos*, *Tríades e inversões* — objetivos mensuráveis, explicações, exemplos corretos e incorretos validados pelo motor, escuta guiada por voz, exercícios gerados com respostas comentadas, critério de domínio com itens essenciais, aplicação no Estúdio. Lições seguintes só liberam exercícios após domínio dos pré-requisitos; novas tentativas são ilimitadas.
- **Estúdio:** notação VexFlow gerada do modelo (duas vozes por pauta, clave de sol oitavada para tenores); edição de altura, ritmo, pausas, ligaduras, letra, articulações e dinâmicas; dividir/juntar/mover eventos; seleção de trecho com copiar/colar; tonalidade (transpor ou só armadura), compasso e número de compassos editáveis; desfazer/refazer, zoom, rascunhos e versões na conta; cifragem romana com dominantes secundárias; diagnósticos ao vivo por estilo.
- **Reprodução:** conjunto, voz isolada, pares ou qualquer combinação; tocar/pausar/parar/reiniciar/tocar da seleção; cursor sincronizado; metrônomo, contagem, trecho em loop; dinâmicas, acentos, staccato e fermatas interpretados; timbres neutro e de vogal.
- **Motor de validação v0.2.0:** 28 regras determinísticas, incluindo redução harmônica e classificação de notas estranhas (ver `docs/motor-de-validacao.md`).
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
- `supabase/migrations/` — esquema com RLS (aplicado no projeto `academia-arranjo-vocal`)
