# Academia de Arranjo Vocal

Curso on-line de **arranjo vocal**, organizado como uma graduação: 4 semestres, 14 disciplinas (com código, ementa, trabalho e bibliografia) e 39 aulas que ensinam a escrever, estruturar e criar arranjos para coro (sacro, erudito e MPB), pop a cappella, gospel/louvor e música popular brasileira. Cada aula tem objetivos, explicação, exemplos certos e errados para ouvir voz por voz e uma verificação com resposta comentada; o laboratório de escrita (editor de partitura com motor de validação) é a ferramenta de prática. Produto independente, com repositório e projeto Supabase próprios.

> **Situação:** etapas 1–10 concluídas (plano em `docs/arquitetura.md`). Sem as variáveis de ambiente, o app funciona em modo local (progresso e rascunhos no navegador).

## Grade curricular
| Semestre | Disciplinas |
|---|---|
| 1º — Fundamentos do arranjo vocal | ARV101 Introdução ao Arranjo Vocal · VOZ101 A Voz como Instrumento · HAR101 Harmonia para Arranjadores I (revisão aplicada) |
| 2º — Escrita a quatro vozes | CDV201 Condução de Vozes · HMZ201 Harmonização de Melodias (SATB, TTBB, três vozes) · TEX201 Texturas e Distribuição Vocal |
| 3º — Forma, texto e linguagem harmônica | FOR301 Forma e Estrutura do Arranjo · TXT301 Texto e Contraponto · HAR301 Harmonia para Arranjadores II |
| 4º — Estilos e prática profissional | EST401 Arranjo Coral · EST402 Pop e A Cappella · EST403 Gospel e Louvor · EST404 Música Popular Brasileira · PRF401 Prática Profissional |

A grade, as disciplinas e os pré-requisitos estão em `src/content/curriculum/curriculum.ts`; as aulas, em `src/content/curriculum/lessons/`. Todo exemplo musical de aula é conferido pelo motor de validação no teste de integridade do currículo (o veredito "correto", "incorreto" ou "observação" do texto precisa coincidir com o diagnóstico, no estilo indicado).

## Funcionalidades
- **Início** com o percurso por semestre, progresso e recomendações de estudo derivadas dos seus erros; **Grade curricular** e página de cada **disciplina** (ementa, objetivos, aulas, trabalho, bibliografia); **Competências** (desempenho por habilidade, histórico com semente reprodutível).
- **Aulas:** objetivos mensuráveis, explicações, exemplos corretos e incorretos validados pelo motor, escuta guiada por voz, exercícios gerados (11 tipos: intervalos, acordes, sétimas, funções, cadências, notas estranhas, tipos de movimento, erros de condução, extensões…) com respostas comentadas e critério de domínio com itens essenciais.
- **Laboratório de escrita** (`/estudio`): notação VexFlow gerada do modelo (duas vozes por pauta; clave de sol oitavada para tenores); edição de altura, ritmo, pausas, ligaduras, letra, articulações e dinâmicas; dividir/juntar/mover; seleção com copiar/colar; tonalidade, compasso e tamanho editáveis; desfazer/refazer; cifragem romana; diagnósticos ao vivo por estilo.
- **Exportação e importação:** **PDF** A4 (mesmo motor de notação, paginado por sistemas), **MusicXML 4.0** (uma parte por voz; importa 4 partes ou 2 pautas com 2 vozes), **MIDI** tipo 1 (uma faixa por voz; importação quantizada à semicolcheia) e JSON nativo. Recursos não suportados (quiálteras, `.mxl` comprimido, acordes dentro de uma voz) geram erro ou aviso explícito — nada é inventado.
- **Reprodução:** conjunto, voz isolada, pares ou qualquer combinação; cursor sincronizado; metrônomo, contagem, loop; dinâmicas, acentos, staccato e fermatas; timbres neutro e de vogal.
- **Motor de validação v0.3.0:** 28 regras determinísticas com localização exata, explicação, gravidade, sugestões e exceções; distingue erro objetivo, convenção estilística, recomendação e escolha estética; perfis de estilo (ver `docs/motor-de-validacao.md`).
- **Projetos práticos** (`/projetos`): hino SATB, adaptação TTBB e arranjo completo, com justificativas, autoavaliação e **rubrica de 9 critérios** (não uma nota única) e comparação entre versões.
- **Tutor de IA** (no laboratório de escrita): recebe a partitura e **somente** os diagnósticos do motor; responde em formato estruturado (resposta, perguntas socráticas, revisões ligadas a diagnósticos, lições sugeridas). Citações de diagnósticos inexistentes são descartadas no servidor. Exige conta, `ANTHROPIC_API_KEY` no servidor e tem limite de 30 perguntas/hora por usuário; cada interação é registrada (`tutor_interactions`).
- **Laboratório auditivo:** intervalos e acordes de ouvido.
- **Conta (Supabase):** e-mail e senha; tentativas **recorrigidas no servidor** a partir da semente; arranjos com histórico de versões e relatório do motor; avaliações de projeto; RLS em todas as tabelas.

## Segurança e acessibilidade
- Somente chave *publishable* do Supabase no navegador; autorização por RLS; *server actions* validam entrada com Zod e recalculam correções e rubricas no servidor.
- CSP, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` e HSTS (`next.config.ts`).
- A chave da Claude API fica só no servidor (nunca em `NEXT_PUBLIC_*`).
- Testes automatizados com axe (WCAG 2.1 A/AA) em todas as páginas principais; navegação por teclado no editor; fluxos testados em viewport móvel.

## Limitações conhecidas
- Áudio sintetizado (Web Audio): confere alturas, ritmo e condução, mas não representa vozes reais.
- Sem quiálteras nem múltiplas vozes por naipe; importação MusicXML não lê `.mxl` comprimido.
- MIDI não carrega letra nem articulações (use MusicXML para isso).
- Prosódia depende da marcação de sílabas na letra.
- O tutor depende de um serviço pago (Claude API): só funciona com chave configurada por quem hospeda.

## Desenvolvimento
```bash
npm install
npm run dev               # http://localhost:3000
npm run lint
npm run typecheck
npm test                  # Vitest — domínio, motor, exercícios, rubrica, IO, tutor, conteúdo
npm run build
npm run test:e2e          # Playwright (requer build; sobe `next start` na porta 3100)
npm run test:integration  # RLS/persistência em Postgres (requer AAV_TEST_DATABASE_URL)
npm run check             # lint + typecheck + testes + build
npm run db:catalog        # regenera o seed do catálogo a partir do currículo
```
Variáveis de ambiente: veja `.env.example` (todas opcionais — sem elas, modo local; sem `ANTHROPIC_API_KEY`, o tutor aparece indisponível).

A CI (`.github/workflows/ci.yml`) roda lint, tipos, testes unitários, build, integração com Postgres 16 e E2E.

## Documentação
- `docs/estado-inicial.md` — inspeção inicial e confirmação de independência
- `docs/arquitetura.md` — arquitetura, decisões, estrutura, modelo de dados e plano
- `docs/convencoes-musicais.md` — oitavas, MIDI, altura escrita × sonora, pautas, MusicXML
- `docs/motor-de-validacao.md` — regras, categorias, estilos e limitações
- `docs/supabase.md` — banco, segurança, desenvolvimento local e projeto remoto
