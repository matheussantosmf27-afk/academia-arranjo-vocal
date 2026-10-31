# Evolução pedagógica — auditoria e plano

## Etapa 1 — Diagnóstico

### O que já existe e será reaproveitado

| Peça | Onde | Uso na evolução |
|---|---|---|
| Modelo musical único (`Score`), esquema Zod, notação textual | `src/domain/music` | partitura de toda tarefa, projeto e avaliação |
| Motor de validação (28 regras, severidade por estilo, categoria "erro objetivo" × "convenção estilística", mensagem com notas e intervalos, explicação, sugestões, exceções, vozes e eventos envolvidos) | `src/domain/validation` | base da correção automática e do feedback didático |
| Laboratório de escrita (edição, áudio por naipe, diagnóstico ao vivo, MusicXML/MIDI/PDF, tutor) | `src/components/studio` | onde o aluno produz; ganha um "modo tarefa" |
| Exercícios independentes (enunciado, restrições, critérios, dicas progressivas, solução comentada) | `ChallengeBlock` | 37 têm partitura de partida e solução: viram tarefas corrigidas |
| Verificações com itens gerados, revisão espaçada, perfil de competências em 4 dimensões | `src/domain/exercises`, `src/lib/progress` | o painel ganha produção e autonomia |
| Trabalhos práticos com rubrica de 9 critérios, autoavaliação, versões e comparação | `src/content/projects.ts`, `src/domain/evaluation/rubric.ts`, `ProjectPanel` | base do projeto cumulativo e da avaliação humana |
| Supabase com RLS (tentativas recorrigidas no servidor, arranjos e versões imutáveis, avaliações) | `supabase/migrations`, `src/app/actions` | novas tabelas seguem o mesmo padrão |
| Itens auditivos (comparações, escuta por naipe) | `ear-library.ts`, `ListeningBlock` | mantidos; recebem aviso sobre o áudio sintetizado |

### Lacunas

1. **Produção não é corrigida.** O curso tem 83 aulas de escrita, todas com exercício independente: 37 com partitura e 46 só escritos. Mas o aluno mesmo confere o que escreveu e abre a solução. Nada registra se ele resolveu, nem se resolveu sozinho.
2. **Não há avaliação de transferência por produção.** A "transferência" do perfil mede acertos em itens de múltipla escolha gerados, não a capacidade de escrever diante de um problema novo.
3. **Autonomia não é medida.** Abrir dica, demonstração ou solução não fica registrado e não muda o nível de domínio.
4. **Projeto cumulativo inexistente.** Os trabalhos práticos são independentes, ligados a uma aula. Não há um arranjo que atravesse análise → harmonização → distribuição → desenvolvimento → refinamento → finalização.
5. **Feedback rico, mas não guiado.** O diagnóstico já traz notas, regra e sugestões. Falta ligá-lo a uma tentativa ("corrija e confira de novo") e mostrar como a mesma escrita é julgada em cada estilo.
6. **Avaliação humana ausente.** A rubrica é automática ou autoavaliação; não há onde registrar o parecer de um professor ou regente.
7. **Painel centrado em aulas.** Ainda não há produção, autonomia, erros recorrentes nem evolução de projeto.
8. **Sem estrutura para estudo com alunos reais.** Não há como registrar perfil inicial, pré-teste e pós-teste.

## Etapa 2 — Plano

| Prioridade | Entrega | Peças |
|---|---|---|
| 1 | **Tarefas de produção corrigidas.** Cada exercício independente com partitura vira uma tarefa que o aluno resolve no laboratório (`/estudio?tarefa=…`). O motor confere critérios explícitos (vozes dadas preservadas, vozes pedidas escritas, nenhum erro nem alerta no estilo, cadência final quando exigida). Registra a ajuda usada e permite corrigir e conferir de novo. | `src/domain/production/` (tarefas, conferência, autonomia), modo tarefa no Estúdio, `Challenge` |
| 2 | **Avaliação de transferência.** Situações inéditas geradas por semente: harmonizar melodia de coral nunca vista nas aulas, corrigir partitura com erros, adaptar SATB para TTBB em outra tonalidade, criar segunda voz, escrever introdução. Sem solução antes da tentativa; distingue autônomo, com dica, com demonstração e com solução. | página `/avaliacao`, geradores no domínio, melodias de corais de Bach (domínio público) |
| 3 | **Registro de autonomia e domínio ponderado.** As tentativas de produção têm nível de ajuda. Só acerto autônomo conta como domínio pleno; com dica, parcial; após solução, não conta. Ficam no navegador e, com conta, numa tabela nova com RLS, e o servidor recorrige a partitura enviada. | migração `production_attempts`, ação de servidor, sincronização |
| 4 | **Feedback didático.** Em cada diagnóstico: vozes envolvidas, antes → depois, como cada estilo julga a mesma escrita (erro objetivo × convenção), sugestão e "conferir de novo" no modo tarefa. | `DiagnosticList`, painel da tarefa |
| 5 | **Avaliação humana com rubrica de 10 critérios.** Formulário para professor ou regente, com descritores por nível e comentários, nos trabalhos práticos e no projeto cumulativo. Nada de nota automática de qualidade artística. | `src/domain/evaluation/human.ts`, `evaluations.source = 'professor'` (migração) |
| 6 | **Projeto cumulativo "Meu arranjo".** O aluno escolhe uma melodia do repertório em domínio público e avança pelas seis etapas no laboratório. Cada etapa tem conferência própria, e cada conclusão salva uma versão. As versões podem ser comparadas, e a finalização usa as exportações existentes. | `src/domain/projeto-cumulativo/`, página `/meu-arranjo`, painel no Estúdio |
| 7 | **Painel de desenvolvimento.** Competências dominadas, em desenvolvimento e a revisar; produção; percentual autônomo; percepção; erros recorrentes; etapas do projeto. | `CompetencyProfile` / `/perfil` |
| 8 | **Estrutura de validação pedagógica.** Perfil musical inicial, pré-teste e pós-teste (tarefas de transferência fixas), retenção (revisões em 7 e 21 dias), tempo, dicas e correções. Os dados vêm só do próprio aluno; não há dados simulados. | página `/estudo`, migração `musical_profiles` |
| 9 | **Matriz de cobertura pedagógica** com as oito perguntas por aula, e complemento das aulas incompletas. | `scripts/audit-curriculum.ts`, `docs/auditoria/matriz-das-aulas.md` |

**Banco de dados:** são três migrações novas, todas com RLS de dono:

- `production_attempts`, com as tentativas de produção;
- `musical_profiles`, com o perfil inicial;
- a ampliação de `evaluations.source` para aceitar `professor`.

Nenhuma tabela existente perde colunas. Os dados salvos continuam válidos.

**Limites conhecidos desde já:**

- O motor não avalia qualidade artística: criatividade, expressividade e adequação ao repertório ficam com a avaliação humana e a autoavaliação.
- Prosódia só é conferida onde há sílabas marcadas.
- O áudio é sintetizado e não substitui um quarteto real.

## Etapa 3 — Implementação

### 1. Tarefas de produção corrigidas

- Domínio em `src/domain/production/task.ts`: `ProductionTask` e `checkTask`.
  - Seis critérios explícitos: formação; material dado preservado; vozes pedidas escritas; introdução; nenhum erro nem alerta no estilo; cadência final 5→1 no baixo (e V→I quando soam três vozes ou mais).
  - Mesma partitura, mesmo resultado, no navegador e no servidor.
- **35 exercícios independentes de 35 aulas** viram tarefas (`src/content/production-tasks.ts`).
  - As vozes a preservar e a escrever saem da comparação partida × solução.
  - Um teste confere que toda solução passa e que nenhuma partida passa.
- Modo tarefa no laboratório (`/estudio?tarefa=…`, painel `TaskPanel`):
  - enunciado e restrições;
  - dicas uma a uma e link para a demonstração (aula);
  - "Conferir" e "Conferir de novo", com os critérios atendidos e os pontos do motor, que destacam a nota na partitura;
  - "Recomeçar";
  - a solução de referência só aparece depois da primeira conferência e, se aberta antes do acerto, rebaixa o registro para "com solução".
  - A sessão (partitura e ajuda usada) sobrevive a recarregar a página. A ajuda é gravada na hora.
- O exercício independente da aula ganhou "Resolver no laboratório (correção automática)", com a situação do aluno: não conferida, N conferências, ou resolvida com o nível de ajuda.
  - Os exercícios que o motor não mede (prosódia, cor, escolha de formação) dizem isso e continuam com autoconferência por critérios.

### 2. Avaliação de transferência (`/avaliacao`)

- **Banco de 50 melodias inéditas** (`src/content/transfer-melodies.ts`): primeiras frases de corais de Bach do corpus do music21 que não aparecem nas aulas nem no Repertório.
  - Foram extraídas 330 frases. Ficaram as 87 cuja harmonização de Bach passa no motor sem erros nem alertas. Depois de tirar as melodias repetidas e as já usadas, sobraram 50.
  - Por isso a versão de Bach serve de solução de referência conferida.
- Cinco tipos gerados por semente (`src/domain/production/transfer.ts`):
  - harmonizar a melodia;
  - criar uma segunda voz;
  - adaptar SATB → TTBB em outra tonalidade (20 melodias em que a transposição cabe nas extensões masculinas sem alertas);
  - corrigir uma partitura com erros introduzidos de propósito (pelo menos um erro objetivo e três pontos graves, nunca no soprano);
  - escrever uma introdução de dois compassos (referência I–V conferida).
- O id da tarefa (`transf:tipo:melodia:semente`) reconstrói a mesma tarefa no servidor.
- **Prática corrigida por aula:** 83 aulas ganharam "Prática corrigida: situação inédita".
  - O tipo vem da competência principal da aula. A tarefa é a mesma, creditada à aula (`…@aula`).
  - Seis aulas sem competência de escrita (regência do gesto, aquecimento, afinação, respiração, ritmo e intervalos) não recebem prática gerada.

### 3. Autonomia e domínio ponderado

- Cada conferência registra:
  - o nível de ajuda (autônomo, dica, demonstração ou solução: a mais forte prevalece);
  - as dicas abertas;
  - as correções antes do acerto;
  - os critérios que faltaram;
  - as regras apontadas.
- Peso no domínio: autônomo 1; dica 0,75; demonstração 0,5; solução 0 (`src/domain/production/evidence.ts`). Uma tarefa conta uma vez, pela primeira aprovação.
- Fica no navegador (`src/lib/production/store.ts`). Com conta, a ação `recordProductionAttemptRemote` faz o seguinte:
  - reconstrói a tarefa pelo id;
  - **recorrige a partitura enviada**;
  - grava em `production_attempts`.
  - A sincronização (`AccountSync`) une as tentativas por id.
- O nível de ajuda é declarado pelo navegador, porque dicas e solução não passam pelo servidor. Isso está documentado na ação.

### 4. Feedback didático

Cada diagnóstico (`DiagnosticList`) mostra agora:

- as vozes envolvidas;
- o que a categoria significa (erro objetivo vale em qualquer estilo; convenção de estilo pode ser recurso em outro);
- **como cada estilo julga a mesma regra**, por exemplo "Coral tradicional: erro · Coral contemporâneo: alerta · Popular a cappella: não se aplica";
- como corrigir e quando pode ser aceitável (isto já existia).

### 5. Avaliação humana

- Rubrica de 10 critérios (`src/domain/evaluation/human.ts`): correção harmônica, condução, cantabilidade, tessitura, prosódia, equilíbrio, criatividade, coerência estilística, expressividade e adequação ao repertório.
  - Cada critério tem pergunta e descritores dos quatro níveis. Onde o motor mede algo relacionado, isso aparece como referência, nunca como nota.
- O formulário (`HumanEvaluationForm`) tem: avaliador, papel, nível e comentário por critério, comentário geral.
  - Nada é pré-preenchido.
  - Está nos trabalhos práticos e no fim do projeto cumulativo.
  - Com conta, salva a versão avaliada e a avaliação com `source = 'professor'`.

### 6. Projeto cumulativo "Meu arranjo" (`/meu-arranjo`)

- O aluno escolhe uma das sete peças do Repertório e começa só com a melodia.
- Seis etapas (`src/domain/production/cumulative.ts`), cada uma com conferência:

  | Etapa | O que é conferido |
  |---|---|
  | Análise | tonalidade e extensão, conferidas contra a partitura; frases e clímax por escrito |
  | Harmonização | baixo em todos os compassos, sem erros entre soprano e baixo |
  | Distribuição | quatro vozes sem erros |
  | Desenvolvimento | dois compassos abertos automaticamente para a introdução, que termina em V ou I |
  | Refinamento | dinâmica no início de cada voz e revisão escrita |
  | Finalização | título próprio, arranjador (campo novo no laboratório) e memorial |

- "Concluir etapa" só se habilita quando a conferência passa. Cada conclusão guarda uma versão no navegador e, com conta, uma nova versão do arranjo.
- Versões comparáveis: vozes escritas, compassos, contagens por gravidade e pontos resolvidos e novos, com a introdução descontada no deslocamento.

### 7. Painel de desenvolvimento (`/perfil`)

O painel reúne:

- competências dominadas, em desenvolvimento e a revisar, com regra explícita na página;
- produção e autonomia (tarefas das aulas × transferência e testes): iniciadas, resolvidas, sem ajuda, domínio ponderado e correções por acerto;
- distribuição pelos níveis de ajuda;
- erros recorrentes (regras que impediram a aprovação em duas tarefas ou mais);
- percepção auditiva (itens de escuta das verificações);
- etapa do projeto cumulativo.

O perfil em quatro dimensões continua abaixo.

### 8. Validação pedagógica (`/estudo`)

- Perfil musical inicial com 6 perguntas, objetivo e consentimento opcional para pesquisa. Fica no navegador e, com conta, em `musical_profiles`.
- **Pré-teste e pós-teste fixos:** cinco situações de transferência com sementes fixas, as mesmas para todos os alunos, com melodias diferentes entre si e entre os testes. Para cada situação aparecem resultado, nível de ajuda, conferências e tempo, e há uma tabela pré × pós.
- Retenção aos 7 e aos 21 dias: primeira revisão feita depois do intervalo, por aula dominada.
- Dicas, correções e avaliações humanas.
- "Baixar meus dados (JSON)" para entregar a um professor ou pesquisador.
- Sem dados, cada quadro diz isso. Nada é simulado.

### 9. Escuta

O reprodutor já isolava vozes, pares e combinações. Ganhou o quadro "Áudio sintetizado × quarteto real", que explica o que o sintetizador não mostra:

- afinação justa;
- equilíbrio natural dos registros;
- cansaço e tessitura;
- consoantes e respiração.

A comparação de versões está no projeto cumulativo e na solução de referência das tarefas.

## Etapa 4 — Conteúdo: matriz de cobertura

Gerada por `npm run audit:curriculum` em `docs/auditoria/cobertura-pedagogica.md`, com critério verificável para cada uma das oito perguntas.

| Pergunta | ✔ | ◐ | ✘ |
|---|---|---|---|
| Explicação | 89 | 0 | 0 |
| Demonstração | 89 | 0 | 0 |
| Exemplo | 89 | 0 | 0 |
| Compreensão | 89 | 0 | 0 |
| Produção | 39 | 50 | 0 |
| Aplicação real | 89 | 0 | 0 |
| Feedback | 85 | 4 | 0 |
| Autonomia | 85 | 4 | 0 |

Antes desta etapa, Feedback e Autonomia estavam em 35. Produção continua ◐ em 50 aulas: o exercício da própria aula é escrito, e a produção corrigida vem da prática relacionada, que não trata do tema específico da aula. Ver pendências.

## Etapa 5 — Testes

- **Unitários (Vitest):** 23 arquivos, 274 testes aprovados. Entre os novos:
  - tarefas das aulas: toda solução passa e nenhuma partida passa;
  - transferência: mais de 200 combinações melodia × tipo resolvíveis; melodias inéditas e distintas; mesma semente, mesma tarefa; pré e pós-teste; erros introduzidos; prática ligada à aula;
  - projeto cumulativo: as seis etapas;
  - evidências: autonomia, ponderação, erros recorrentes e situação da competência;
  - rubrica humana;
  - retenção aos 7 e 21 dias.
- **E2E (Playwright), 70 aprovados e 1 pulado.** O pulado é o fluxo com conta, que exige Supabase local. Os fluxos novos:
  - tarefa da aula: reprovar, dica registrada, solução só depois de conferir, sessão após recarregar, painel;
  - acerto autônomo contado na avaliação e no painel;
  - nova situação gerada;
  - projeto cumulativo: análise errada recusada, certa aceita, versão guardada;
  - estudo: perfil e pré-teste;
  - avaliação humana: validação e registro;
  - acessibilidade (axe, WCAG 2.1 AA) em `/avaliacao`, `/meu-arranjo`, `/estudo` e no modo tarefa.
- **Banco:** RLS conferido na tabela nova, numa transação desfeita (ver `docs/supabase.md`).
- Lint, typecheck e build sem erros.

## Etapa 6 — Auditoria final e pendências

O aluno consegue agora, sozinho:

1. receber uma melodia que nunca viu, em `/avaliacao` ou no projeto cumulativo;
2. analisá-la (etapa 1, conferida);
3. harmonizá-la (baixo conferido);
4. distribuir as vozes (SATB sem erros);
5. desenvolvê-la (introdução conferida);
6. refiná-la e entregar uma partitura identificada, exportável e com memorial.

O registro mostra se ele fez isso sem ajuda.

**Pendências e limites (não resolvidos aqui):**

- **Produção específica do tema.** Em 50 aulas, o exercício da própria aula ainda é escrito, por exemplo prosódia, cor de acordes e rearmonização modal. Transformá-los em tarefas conferidas exige escrever partitura de partida e solução para cada um e revisá-las musicalmente.
- **Estilos.** As tarefas de transferência usam coral tradicional. Ainda não há melodias inéditas para popular a cappella nem para SSAA.
- **Avaliação humana sem papel de professor no sistema.** O parecer é registrado no dispositivo e na conta do aluno, não por uma conta de professor. Um papel de professor com acesso a turmas exigiria um modelo de permissões próprio.
- **Nível de ajuda declarado pelo navegador.** O servidor recorrige a partitura, mas não pode provar que a dica não foi aberta.
- **Validação com alunos reais.** A estrutura de pré-teste, pós-teste e retenção está pronta, mas nenhum dado foi coletado. Nenhum resultado de eficácia é afirmado.
- **Revisão musical humana** das 50 frases e das introduções I–V de referência, e da escolha de tipo de prática por aula.
