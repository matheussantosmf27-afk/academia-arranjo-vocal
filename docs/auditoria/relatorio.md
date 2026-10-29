# Auditoria pedagógica e técnica — Academia de Arranjo Vocal

Data: 29/10/2026. Escopo: as 89 aulas publicadas (20 disciplinas, 4 semestres), o motor de exercícios, a avaliação de domínio, o progresso, a gamificação, o laboratório auditivo, os projetos práticos e a persistência no Supabase.

Como ler este documento: tudo o que aparece como **evidência** foi medido no código ou no conteúdo do repositório; a matriz completa das aulas é gerada por `npm run audit:curriculum` em [`matriz-das-aulas.md`](./matriz-das-aulas.md). Nada aqui afirma eficácia pedagógica comprovada: ainda não há dados de estudantes (ver seção F e o protocolo de validação).

---

## A. Diagnóstico inicial

### O que já funcionava (classificação dos recursos)

| Recurso | Situação | Evidência |
|---|---|---|
| Motor de validação com categorias (erro objetivo, convenção estilística, recomendação, escolha estética) e perfis de estilo | funcional | `src/domain/validation/types.ts`; as mesmas quintas paralelas são erro no coral tradicional e sugestão no popular a cappella |
| Exemplos certos e errados das aulas conferidos pelo motor | funcional | teste de integridade do currículo (`src/content/curriculum/__tests__`) |
| Correção no servidor pela semente (o cliente não decide o resultado) | funcional | `src/app/actions/progress.ts` reconstrói os itens e recorrige |
| Políticas RLS (aluno só vê e cria o que é seu; tentativas imutáveis) | funcional | `tests/integration/rls.test.ts` |
| Rubrica de projeto sem nota única, com autoavaliação explícita no que o motor não mede | funcional | `src/domain/evaluation/rubric.ts` |
| Rascunho obrigatório e comparação entre versões nos projetos | funcional | `ProjectPanel`, `practice.ts` |
| Pré-requisitos que bloqueiam a verificação | funcional | `missingPrerequisites` |
| Laboratório auditivo | parcial | só intervalos de ouvido; acordes com a partitura à vista |
| Revisão de erros no início | parcial | lista os erros da última tentativa; não há retorno espaçado nem itens novos |
| Perfil de competências | parcial | só acertos por habilidade na **melhor** tentativa; mistura conclusão com competência |
| Gamificação | incompleto do ponto de vista pedagógico | XP por tentativa sem limite; sequência de dias zera com qualquer pausa |

### Problemas encontrados

| # | Problema | Evidência | Gravidade | Situação |
|---|---|---|---|---|
| 1 | A resposta certa dos itens escritos à mão estava quase sempre na 1ª alternativa | em 82 das 89 aulas, mais de 60% dos itens fixos tinham a certa na 1ª posição | alta (a verificação podia ser aprovada por padrão de posição) | **corrigido**: alternativas embaralhadas por tentativa; agora o aluno vê a certa na 1ª posição em 26% das vezes (acaso: 25–33%) |
| 2 | O exercício revelava a resposta logo no primeiro erro, sem chance de corrigir o raciocínio | `ExercisePanel` e `QuickCheck` mostravam a certa e a explicação ao primeiro clique | média | **corrigido**: dica sem a resposta, segunda chance e "Mostrar a resposta"; só a primeira escolha conta para a nota |
| 3 | Domínio permanente a partir de uma única aprovação; nenhuma medida de retenção | `isMastered` = qualquer tentativa aprovada | alta | **corrigido**: revisão espaçada (seção C) |
| 4 | XP aumentava indefinidamente ao repetir a mesma verificação | `xp = … + attempts.length × 10` | média | **corrigido**: 10 XP por aula e por dia de prática; domínio 100; revisão no prazo 30; leitura 5 |
| 5 | "Sequência de dias" zerava com uma pausa | `studyStreak` exigia dias consecutivos | baixa | **corrigido**: dias de estudo nos últimos 14 dias |
| 6 | 71 aulas sem nenhum item auditivo na verificação | matriz | alta | **parcial**: variantes só de ouvido em 6 tipos de exercício, que voltam assim na revisão; aulas sem escuta em lugar nenhum caíram de 71 para 27 |
| 7 | 47 aulas sem decisão de escrita avaliada (realizar, distribuir, localizar e corrigir o erro) nem projeto | matriz | alta | **parcial**: piloto em 3 aulas (ver B); 44 restantes, priorizadas na matriz |
| 8 | "Localize o erro" tem só 1 trecho-modelo por regra (8 no total) | `ERROR_SNIPPETS` em `library.ts`; pedir 2 itens da mesma regra rende 1 | média | **pendente** (precisa de trechos novos conferidos pelo motor) |
| 9 | Exercício de extensão sem dizer qual referência usa (ex.: F3 para Tenor II) | enunciado só com a voz e a nota | média | **corrigido**: o enunciado diz "pela referência do curso (coro amador ou intermediário)" e a explicação lembra que a faixa varia com treino, idade e repertório |
| 10 | Regras de dobramento apresentadas como absolutas ("nunca dobre a sensível nem a sétima") | `nivel2.ts` (Duplicações) | média | **corrigido**: contexto da prática comum, razão (oitavas na resolução) e exceções; novo quadro "regra didática, convenção e exceção" |
| 11 | "Nota fora da extensão do cantor é erro objetivo" sem dizer que a extensão depende do grupo | `s1-arranjo.ts` | baixa | **corrigido** |
| 12 | Modelo de três camadas sem aviso de que é didático | `s1-arranjo.ts` | baixa | **corrigido**: quadro com as dimensões que o curso acrescenta depois (forma, prosódia, timbre, dinâmica, densidade, articulação, interação) e onde |
| 13 | "Nenhum diagnóstico" podia ser lido como "arranjo bom" | `DiagnosticList` | baixa | **corrigido**: a mensagem diz que só significa nenhuma regra verificável violada |
| 14 | Objetivos com verbo não observável | 5 objetivos em 4 aulas | baixa | **corrigido** (0 restantes) |
| 15 | Texto do perfil dizia que o progresso só fica no navegador, mas a conta já sincroniza | `CompetencyProfile` | baixa | **corrigido** |
| 16 | A avaliação de projeto pela rubrica não ficava registrada | só existia na tela | baixa | **corrigido**: última avaliação guardada (neste navegador) e usada como evidência de prática |
| 17 | Itens fixos se repetem literalmente a cada tentativa (mesmo enunciado) | `staticItems` | média | **mitigado** (ordem das alternativas muda); variantes de enunciado pendentes |

### Riscos

- **Pedagógico:** antes das correções, um aluno podia "concluir" aulas reconhecendo posição de resposta e nunca mais rever o conteúdo; o perfil não distinguia concluir de saber. O curso ainda avalia sobretudo por múltipla escolha: a produção de arranjos só é avaliada nos projetos (8 projetos para 89 aulas).
- **Técnico:** revisões e tentativas usam a mesma tabela (`exercise_attempts`); a distinção é o sufixo `:revisao` em `exercise_set_id`. A avaliação de projeto pela rubrica continua só no navegador, exceto na entrega final.

---

## B. Auditoria das aulas

A matriz completa (89 aulas) está em [`matriz-das-aulas.md`](./matriz-das-aulas.md). Ela tem duas tabelas: as medidas (palavras, exemplos por veredito, escutas, itens fixos e gerados, itens auditivos na verificação e na revisão, itens de decisão de escrita, geradores, duração anunciada × estimada) e as recomendações (objetivo principal, competências, gravidade, alteração recomendada, critério de aprovação atual e dependência técnica).

### Resumo atual (depois das correções)

- Gravidade **alta** (sem escuta nem decisão de escrita em lugar nenhum): 11 aulas — `vozes-claves-extensoes`, `voz-cantada`, `escalas-tonalidades`, `graus-funcoes`, `silabas-de-apoio`, `a-cappella-pop`, `baixo-e-percussao-vocal`, `reg-gesto`, `reg-respiracao`, `reg-adaptacao-grupo`, `partitura-e-ensaio`.
- Gravidade **média** (falta uma das duas): 49 aulas. Gravidade **baixa**: 29.
- Todas as aulas têm contraexemplo, escuta guiada e verificação com critério de domínio.
- Duração: a estimativa automática é grosseira (leitura, exemplos, escutas e itens; não mede a prática no Estúdio). Só 1 aula ficou fora de 0,5×–1,5× (`harmonizacao-satb`: 75 min anunciados, 36 estimados — a diferença é o trabalho de escrita, que a estimativa não mede). Recomenda-se medir o tempo real com estudantes antes de mudar números.

### Piloto (conjunto representativo validado antes de expandir)

Três aulas de gravidade alta receberam escuta avaliada e "localize o erro" usando só geradores existentes, sem texto novo:

| Aula | Antes | Depois |
|---|---|---|
| `tetrades` | 7 tétrades lidas na partitura | 5 lidas + 2 só de ouvido + 1 erro de resolução da sétima (o objetivo 3 da aula pede resolver o V7) |
| `cp-segunda-terceira` | notas estranhas e classificação de intervalo lida | classificação de consonância **de ouvido** + 1 trecho com paralelas para localizar |
| `cp-quarta-especie` | idem | consonância de ouvido + 1 trecho com sétima mal resolvida |

Verificado em 299 sementes: toda tentativa tem pelo menos um item de ouvido e um de erro, e nenhuma fica abaixo de 8 itens. As outras aulas não foram alteradas em bloco: a recomendação é medir o piloto com estudantes (seção F) antes de expandir.

### Conteúdos corrigidos

- `duplicacoes` (HAR101): dobramento da sensível e da sétima com contexto, razão e exceções; resumo e objetivo reescritos.
- `triades-inversoes`: "Nunca dobre a sensível" → "Não dobre a sensível num acorde de dominante", dentro das diretrizes da prática comum.
- `oficio-do-arranjador` (ARV101): erro objetivo relativo à extensão do grupo; aviso sobre o modelo de três camadas.
- `cp-imitacao`, `rearm-subv`, `ssa-formacao`, `ssa-cores`: objetivos com verbo observável.
- Exercício de extensões (todas as aulas que o usam): referência explícita e ressalva sobre limites.

### Pontos que exigem validação humana

- As faixas de extensão e tessitura de referência (SATB, TTBB, SSAA) são consenso aproximado de manuais; um regente deve confirmar se servem ao público do curso.
- Os comentários dos exemplos musicais foram conferidos contra o motor, não contra uma escuta humana. O motor tem limites conhecidos: não aponta toda segunda inversão em SSA, nem todos os erros de contraponto de espécies a duas vozes.
- A dica genérica depois de um erro ("releia o enunciado…") aparece nos itens fixos sem comentário por alternativa (só 5 dos 270 itens fixos têm; os geradores de distribuição e rearmonização já trazem o diagnóstico do motor para cada alternativa errada). Escrever esses comentários exige revisão musical.
- Durações anunciadas.

---

## C. Implementações realizadas

### Avaliação e feedback

- `src/domain/exercises/engine.ts`: alternativas dos itens fixos embaralhadas por semente (gerador próprio, sem mudar os itens gerados de sementes já registradas); `buildReviewSet` (5 itens só gerados, com reconhecimento convertido para ouvido), `evaluateReview` (80%).
- `src/components/lesson/ExercisePanel.tsx`: componente `AnswerFlow` (dica → segunda chance → resposta; só a 1ª conta), modo `review`, rótulos acessíveis ("resposta correta", "sua escolha, incorreta") além da cor.
- `src/components/lesson/QuickCheck.tsx`: o mesmo fluxo no "Pare e pense".
- `src/domain/exercises/generators.ts`, `generators2.ts`, `types.ts`: variantes `earOnly` para acordes, tétrades, cadências, movimento entre vozes e consonâncias do contraponto (intervalos já tinham); áudio em "pares" para duas vozes passando de um intervalo a outro (`src/lib/audio/player.ts`); referência e ressalva no exercício de extensões.

### Retenção, competências e gamificação

- `src/lib/progress/review.ts` (novo): calendário de revisão (1, 3, 7, 21 e 60 dias); revisão aprovada no prazo avança, reprovada volta ao início (lapso), antecipada vale como prática. O domínio não é retirado.
- `src/lib/progress/model.ts`: revisões separadas das verificações (`isReviewAttempt`); domínio, melhor tentativa e perfil por habilidade usam só verificações.
- `src/lib/progress/competency.ts` (novo): quatro dimensões por competência.
- `src/lib/progress/gamification.ts`: novo cálculo de XP e dias de estudo.
- `src/components/lesson/LessonProgress.tsx`: seção "Revisão espaçada" na aula, registro na conta.
- `src/components/Dashboard.tsx`: card "Revisões espaçadas para hoje" e indicadores revistos.
- `src/components/CompetencyProfile.tsx`: tabela das quatro dimensões com a definição de cada uma; revisões marcadas no histórico.
- `src/components/EarLab.tsx`: acordes só de ouvido, cadências de ouvido, movimento entre duas vozes.
- `src/domain/evaluation/rubric.ts` (`meetsPracticalStandard`), `src/lib/projects/practice.ts`, `ProjectPanel.tsx`: última avaliação pela rubrica guardada como evidência de prática.

### Servidor e banco

- `src/app/actions/progress.ts`: `mode: "revisao"`. O servidor reconstrói os itens da revisão pela semente, recorrige e grava em `exercise_attempts` com `exercise_set_id` terminado em `:revisao`. Só aceita revisão de aula já dominada na conta e não altera `lesson_progress`.
- **Nenhuma migração.** A tabela e as políticas RLS existentes cobrem as revisões (teste novo em `tests/integration/rls.test.ts`).

### Ferramentas e documentação

- `scripts/audit-curriculum.ts` e `npm run audit:curriculum`: matriz reproduzível.
- `README.md`: recursos atualizados e seção de auditoria.

---

## D. Testes

Executados localmente nesta entrega:

| Verificação | Resultado |
|---|---|
| `tsc --noEmit` | sem erros |
| `eslint src e2e scripts tests` | sem erros |
| `vitest` (unitários) | 235 passaram, 16 arquivos |
| Integração (Postgres 16 + shim do Supabase + RLS) | 12 passaram |
| `next build` | ok |
| Playwright (desktop e mobile, inclui axe/WCAG 2.1 AA) | 57 passaram, 1 pulado (o teste de nuvem exige uma stack Supabase local) |

Testes novos ou alterados: embaralhamento determinístico das alternativas sem mudar a resposta; revisão só com itens gerados e critério de 80%; reconhecimento de ouvido na revisão; calendário de revisão (no prazo, antecipada, lapso, domínio preservado); XP sem ganho por repetição; dias de estudo; quatro dimensões de competência; padrão de prática da rubrica; revisões sob RLS; E2E do fluxo de segunda chance e do fluxo completo de revisão (painel inicial → aula → perfil).

Também conferido visualmente (capturas em desktop e 390 px): card de revisões, indicadores, seção de revisão na aula, dica depois do erro e tabela de competências, sem rolagem horizontal da página.

**Não verificado:** fluxo de revisão com conta real no Supabase (o teste de nuvem não roda sem a stack local; a lógica do servidor é a mesma da verificação, que já é testada); comportamento com estudantes reais.

---

## E. Pendências

| Pendência | Motivo | Dependência | Próxima ação |
|---|---|---|---|
| Comentário específico por alternativa nos 265 itens fixos que ainda não têm | exige texto revisado por um músico; texto automático foi evitado de propósito | conteúdo | escrever por disciplina, começando pelas 11 aulas de gravidade alta |
| Variantes de enunciado dos itens fixos | hoje só a ordem muda | conteúdo + campo `variants` | bancos de 3 enunciados por item essencial |
| Tarefas de produção dentro das aulas (escrever no Estúdio e o motor conferir restrições) | o Estúdio e a rubrica existem, mas não há "exercício de escrita" com critério automático por aula | novo tipo de item (partitura inicial, restrições, verificação pelo motor) | piloto numa aula de HAR101 |
| Mais trechos-modelo em "localize o erro" | 1 por regra limita a variedade | trechos conferidos pelo motor | 3 por regra |
| Ditado melódico e rítmico | precisa de entrada de notas dentro do exercício | componente de resposta em pauta | reaproveitar a edição do Estúdio |
| Expandir escuta e escrita às 44 e 27 aulas apontadas na matriz | o pedido é validar o piloto antes | dados do piloto | após o protocolo da seção F |
| Avaliação de execução humana (gravação) | a plataforma não grava nem analisa voz | upload de áudio e revisão humana | fora do escopo atual; a plataforma não afirma avaliar execução |
| Justificativa de exceção intencional avaliada por critério ou por um professor | o projeto coleta justificativas, mas não há revisão humana | papel de professor e fila de revisão | definir rubrica de justificativa |
| Rubrica de projeto sincronizada com a conta | hoje só a entrega final vai ao banco | coluna ou tabela de avaliações | migração aditiva |
| Recomendações do início por desempenho recente | ainda usam a melhor tentativa | — | ponderar por recência e lapsos |

---

## F. Indicadores de aprendizagem

### Disponíveis agora (calculados de dados reais)

| Indicador | Fonte |
|---|---|
| Domínio imediato por aula e por competência | verificações aprovadas (`exercise_attempts`, `lesson_progress`) |
| Retenção: revisões no prazo, lapsos, revisões vencidas | revisões (`exercise_set_id` com `:revisao`) e calendário |
| Transferência: acerto na 1ª resposta em itens gerados de outras aulas da competência, depois do 1º domínio | respostas por item com semente |
| Capacidade de corrigir: acerto na 2ª chance | **não registrado ainda** (a 2ª escolha não vai para o banco) |
| Competência prática: projetos com critérios automáticos em Proficiente | última rubrica (navegador) e entregas finais (conta) |
| Regularidade: dias de estudo em 14 dias | tentativas |

### Dependem de novas implementações

- Taxa de correção após a dica (registrar a 2ª escolha, sem afetar a nota).
- Evolução entre versões de um arranjo na conta (as versões existem; a rubrica de cada versão não é guardada no banco).
- Qualidade dos arranjos avaliada por pessoas (concordância entre a rubrica automática e um professor).
- Autonomia: proporção de itens resolvidos sem dica e de projetos entregues sem consultar o tutor.
- Tempo real por aula (para calibrar as durações), medido por sessão de estudo e não por tempo de página.

### Protocolo de validação com estudantes (pendente: ainda não há dados)

1. **Participantes:** pelo menos 12, em três perfis — sem formação, com prática coral, com formação em harmonia.
2. **Pré-teste:** para cada aula do piloto e para 3 aulas de controle (sem mudança), 6 itens inéditos: 2 de explicação com as próprias palavras (rubrica de 0 a 2), 2 de resolução e 2 de escuta.
3. **Estudo:** cada participante faz as aulas na plataforma, sem ajuda externa.
4. **Pós-teste imediato:** itens inéditos equivalentes.
5. **Correção sem solução:** um trecho com erro para localizar e corrigir no Estúdio. Medir se corrigiu sem ver a resposta.
6. **Transferência:** o mesmo conceito numa melodia, tonalidade ou formação diferente.
7. **Retenção:** repetir os itens equivalentes após 7 e 21 dias.
8. **Produção:** um arranjo curto avaliado pela rubrica automática e, às cegas, por dois professores. Medir a concordância.
9. **Questionário:** clareza, dificuldade, duração percebida, utilidade das dicas e da revisão.
10. **Análise:** comparar piloto × controle no ganho pré → pós, na retenção e na transferência, e registrar os resultados em `docs/auditoria/`. Só depois expandir as alterações às demais aulas.
