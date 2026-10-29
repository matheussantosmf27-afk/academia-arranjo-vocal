# Academia de Arranjo Vocal

Curso on-line de **arranjo vocal**, organizado como uma graduação: 4 semestres, 20 disciplinas (com código, ementa, trabalho e bibliografia) e 89 aulas que ensinam a escrever, estruturar e criar arranjos para coro (sacro, erudito e MPB), pop a cappella, gospel/louvor, quarteto masculino (TTBB), coro feminino e infantil (SSA/SSAA), grupo vocal a cappella gospel e música popular brasileira. Cada aula tem objetivos, explicação, exemplos certos e errados para ouvir voz por voz e uma verificação com resposta comentada; o laboratório de escrita (editor de partitura com motor de validação) é a ferramenta de prática. Produto independente, com repositório e projeto Supabase próprios.

> **Situação:** etapas 1–10 concluídas (plano em `docs/arquitetura.md`). Sem as variáveis de ambiente, o app funciona em modo local (progresso e rascunhos no navegador).

## Grade curricular
| Semestre | Disciplinas |
|---|---|
| 1º — Fundamentos do arranjo vocal | ARV101 Introdução ao Arranjo Vocal · VOZ101 A Voz como Instrumento · HAR101 Harmonia para Arranjadores I (revisão aplicada) |
| 2º — Escrita a quatro vozes | CDV201 Condução de Vozes · HMZ201 Harmonização de Melodias (duas vozes, baixo e canto dado, SATB, TTBB, três vozes) · TEX201 Texturas e Distribuição Vocal (bloco, contracanto ativo e passivo) |
| 3º — Forma, texto e linguagem harmônica | FOR301 Forma e Estrutura do Arranjo · TXT301 Texto e Contraponto · HAR301 Harmonia para Arranjadores II |
| 4º — Estilos e prática profissional | EST401 Arranjo Coral · EST402 Pop e A Cappella · EST403 Gospel e Louvor · EST404 Música Popular Brasileira · PRF401 Prática Profissional |

O conteúdo segue o que programas de graduação em música costumam ensinar em harmonia e arranjo vocal (escrita a duas, três e quatro vozes, baixo e canto dado, escrita em bloco, contracanto ativo e passivo, harmonia cromática e moderna, análise de repertório, rascunho ouvido antes da entrega). A grade, as disciplinas e os pré-requisitos estão em `src/content/curriculum/curriculum.ts`; as aulas, em `src/content/curriculum/lessons/`. Todo exemplo musical de aula é conferido pelo motor de validação no teste de integridade do currículo (o veredito "correto", "incorreto" ou "observação" do texto precisa coincidir com o diagnóstico, no estilo indicado). A disciplina EST405 (Quarteto Masculino) parte do estudo de partituras de quartetos gospel, spirituals e barbershop: as técnicas viraram aulas com exemplos originais, e as partituras de referência são só indicadas para estudo, sem reprodução (têm direitos autorais). A HAR402 (Rearmonização para Vozes) acompanha uma mesma melodia original com nove harmonizações diferentes, e tem um gerador de exercícios em que cada rearmonização errada é reprovada pelo motor. A EST406 (Grupo Vocal A Cappella Gospel) segue o mesmo princípio, com técnicas levantadas em partituras de grupos a cappella e na discografia do Ministério Vox. A CTP301 (Contraponto Vocal) percorre as cinco espécies sobre um cantus firmus original e chega ao cânone, ao contracanto, ao descant e ao quodlibet, com um gerador que classifica intervalos em consonância perfeita, imperfeita ou dissonância. A EST407 (Vozes Iguais) acrescenta a formação SSAA ao motor, ao estúdio, à importação e ao banco (Soprano I e II, Contralto I e II, duas pautas em clave de sol); SSA é escrito em SSAA com o Contralto II em pausa. A REG401 (Regência Coral e Preparação de Ensaio) leva o arranjo ao coro: gesto, aquecimento, afinação, ensino por naipe, respiração, equilíbrio, revisão da partitura e adaptação ao grupo, com um gerador de exercícios de padrões de regência, preparação de anacruse e duração de frase.

## Funcionalidades
- **Identidade visual "palco escuro"** com uma cor por voz (soprano magenta, contralto âmbar, tenor ciano, baixo lima) usada em toda a interface e nas notas da partitura; navegação superior; animações respeitam `prefers-reduced-motion`.
- **Interações de aprendizagem:** mesa de vozes no início (liga/desliga naipes durante a música), rolo de piano colorido sincronizado com a reprodução, perguntas rápidas "Pare e pense" no fim das seções, guia lateral com progresso de leitura, roteiros de escuta com checklist, XP e níveis (XP só por domínio, retenção e dias de prática, sem pontos por repetir a mesma verificação) e dias de estudo nas últimas duas semanas.
- **Início** com o percurso por semestre, progresso e recomendações de estudo derivadas dos seus erros; **Grade curricular** e página de cada **disciplina** (ementa, objetivos, aulas, trabalho, bibliografia); **Competências** em quatro dimensões calculadas das tentativas registradas (domínio imediato, retenção, transferência e prática em projetos), desempenho por habilidade e histórico com semente reprodutível.
- **Aulas:** objetivos mensuráveis, explicações, exemplos corretos e incorretos validados pelo motor, escuta guiada por voz, exercícios gerados (11 tipos: intervalos, acordes, sétimas, funções, cadências, notas estranhas, tipos de movimento, erros de condução, extensões…) com respostas comentadas e critério de domínio com itens essenciais. Depois de um erro, o aluno recebe uma dica e uma segunda chance antes de ver a resposta (só a primeira conta para a nota); as alternativas dos itens fixos são embaralhadas a cada tentativa. Cada aula concluída volta em **revisões espaçadas** (1, 3, 7, 21 e 60 dias) com itens novos, e os de reconhecimento voltam só de ouvido; revisão reprovada volta ao início, sem tirar o domínio.
- **Laboratório de escrita** (`/estudio`): notação VexFlow gerada do modelo (duas vozes por pauta; clave de sol oitavada para tenores); edição de altura, ritmo, pausas, ligaduras, letra, articulações e dinâmicas; dividir/juntar/mover; seleção com copiar/colar; tonalidade, compasso e tamanho editáveis; desfazer/refazer; cifragem romana; diagnósticos ao vivo por estilo.
- **Exportação e importação:** **PDF** A4 (mesmo motor de notação, paginado por sistemas), **MusicXML 4.0** (uma parte por voz; importa 4 partes ou 2 pautas com 2 vozes), **MIDI** tipo 1 (uma faixa por voz; importação quantizada à semicolcheia) e JSON nativo. Recursos não suportados (quiálteras, `.mxl` comprimido, acordes dentro de uma voz) geram erro ou aviso explícito — nada é inventado.
- **Reprodução:** conjunto, voz isolada, pares ou qualquer combinação; cursor sincronizado; metrônomo, contagem, loop; dinâmicas, acentos, staccato e fermatas; timbres neutro e de vogal.
- **Motor de validação v0.3.0:** 28 regras determinísticas com localização exata, explicação, gravidade, sugestões e exceções; distingue erro objetivo, convenção estilística, recomendação e escolha estética; perfis de estilo (ver `docs/motor-de-validacao.md`).
- **Trabalhos práticos** (`/projetos`): hino SATB, adaptação TTBB e arranjo completo, com justificativas, autoavaliação, **rascunho obrigatório após checklist de escuta** (vozes isoladas, vozes internas cantadas, andamento real, letra e respirações), **rubrica de 9 critérios** (não uma nota única) e comparação entre rascunho e versão final.
- **Baixo dado e canto dado**: exercícios em que a alternativa certa é conferida pelo motor e cada alternativa errada mostra o diagnóstico que a reprova; versões em branco no laboratório de escrita.
- **Tutor de IA** (no laboratório de escrita): recebe a partitura e **somente** os diagnósticos do motor; responde em formato estruturado (resposta, perguntas socráticas, revisões ligadas a diagnósticos, lições sugeridas). Citações de diagnósticos inexistentes são descartadas no servidor. Exige conta, `ANTHROPIC_API_KEY` no servidor e tem limite de 30 perguntas/hora por usuário; cada interação é registrada (`tutor_interactions`).
- **Laboratório auditivo:** intervalos, acordes e cadências só de ouvido e movimento entre duas vozes.
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
npm run audit:curriculum  # regenera docs/auditoria/matriz-das-aulas.md (auditoria das aulas)
```
Variáveis de ambiente: veja `.env.example` (todas opcionais — sem elas, modo local; sem `ANTHROPIC_API_KEY`, o tutor aparece indisponível).

A CI (`.github/workflows/ci.yml`) roda lint, tipos, testes unitários, build, integração com Postgres 16 e E2E.

## Documentação
- `docs/estado-inicial.md` — inspeção inicial e confirmação de independência
- `docs/arquitetura.md` — arquitetura, decisões, estrutura, modelo de dados e plano
- `docs/convencoes-musicais.md` — oitavas, MIDI, altura escrita × sonora, pautas, MusicXML
- `docs/motor-de-validacao.md` — regras, categorias, estilos e limitações
- `docs/supabase.md` — banco, segurança, desenvolvimento local e projeto remoto

## Auditoria pedagógica

`docs/auditoria/relatorio.md` traz o diagnóstico, o que foi corrigido, os testes, as pendências, os indicadores de aprendizagem e o protocolo de validação com estudantes. `docs/auditoria/matriz-das-aulas.md` é a matriz das 89 aulas, gerada do conteúdo por `npm run audit:curriculum`.
