# Arquitetura e plano

## Princípios

1. **O modelo musical é a fonte única de verdade.** Notação, áudio, validação, exercícios e persistência leem o mesmo `Score` tipado. Nada é desenhado "à mão".
2. **Domínio puro e testável.** `src/domain` não importa React, DOM nem bibliotecas de UI. Tudo ali roda em Node e é coberto por testes unitários.
3. **Validação determinística antes de IA.** O tutor (etapa 9) só poderá explicar diagnósticos que o motor produziu, citando as evidências registradas.
4. **Honestidade de interface.** Funcionalidades futuras aparecem desabilitadas e rotuladas com a etapa em que chegam.

## Estrutura de pastas

```
src/
  domain/
    music/          altura, intervalo, tonalidade, acorde, duração, formações SATB/TTBB,
                    modelo de partitura, esquema Zod, operações de edição, histórico,
                    acidentes de exibição, notação textual, exemplos
    validation/     motor de regras determinísticas (contexto, regras, relatório, análise harmônica)
    exercises/      geradores determinísticos (semente), correção e critério de domínio
  content/curriculum/  níveis, unidades, lições (conteúdo pedagógico tipado)
  lib/
    notation/       adaptador VexFlow (layout independente + renderização SVG)
    audio/          agendamento (puro) + síntese Web Audio
    progress/       modelo de progresso (puro) + repositório local
    projects/       rascunhos locais validados pelo esquema
  components/       interface (painel, currículo, lição, exercícios, estúdio, laboratório…)
  app/              rotas Next.js (App Router)
supabase/migrations/  SQL versionado (não aplicado)
e2e/                  testes de interface (Playwright)
docs/                 decisões e convenções
```

## Decisões técnicas

| Tema | Decisão | Motivo |
|---|---|---|
| Framework | Next.js 16 (App Router), React 19, TypeScript estrito (`strict`, `noUncheckedIndexedAccess`) | Pedido do projeto; páginas de conteúdo estáticas (SSG), editor no cliente |
| Notação | **VexFlow 5** (entrada `vexflow/bravura`, fonte SMuFL Bravura embutida) | Biblioteca madura de gravação musical em SVG, permite controle fino (duas vozes por pauta, hastes, acidentes, ligaduras, IDs por nota para seleção). Alternativas avaliadas: abcjs (modelo ABC próprio, menos controle sobre vozes), OpenSheetMusicDisplay (excelente para MusicXML, mas exibição — não edição; será considerado para pré-visualização de importações), Verovio (WASM pesado, orientado a MEI) |
| Layout da notação | Calculado no domínio (`lib/notation/layout.ts`): altura escrita, acidentes por compasso/pauta/armadura | Testável sem DOM; a correspondência notação ↔ dados não depende da biblioteca |
| Áudio | Web Audio nativo, síntese por osciladores com envelope | Sem dependências nem downloads; latência baixa. **Limitação:** timbre neutro, não vocal. Soundfonts (ex.: `soundfont-player`/`smplr`) podem ser avaliados na etapa 5 |
| Validação de entrada | Zod 4 | Toda partitura vinda de armazenamento/arquivo passa por `parseScore` |
| Testes | Vitest (unidade), Playwright (interface) | Rápidos; Chromium já disponível no ambiente |
| Estilo | CSS global com tokens + CSS Modules | Identidade própria, sem framework de UI |
| Persistência | Sem conta: `localStorage`. Com conta: Supabase via ações de servidor (`@supabase/ssr`, chave publicável + RLS) | O app funciona sem login; com login, o servidor valida e recorrige tudo |

## Modelo musical (resumo)

- `Pitch { step, alter, octave }` — grafada, notação científica, **C4 = MIDI 60**; a oitava acompanha a letra (B♯3 = C4).
- Alturas guardadas são **sonoras**. A altura escrita deriva da clave (`treble8vb`: escrita = sonora + 8ª).
- `Duration { type: w|h|q|8|16, dots }`, `PPQ = 480`.
- `Score { formation, key, timeSignature, tempoBpm, measureCount, parts[voice].events[], metadata.style }`.
- Eventos de cada voz são contíguos; posição métrica (compasso/tempo/onset) é **derivada** — não há como criar sobreposição ou lacuna inválida dentro de uma voz.
- Ver `docs/convencoes-musicais.md`.

## Modelo de dados (Supabase, etapa 7)

Ver `supabase/migrations/20261022170550_esquema_inicial.sql`:

- `profiles` (1:1 com `auth.users`)
- Catálogo somente leitura: `levels`, `units`, `lessons`, `lesson_prerequisites`
- `exercise_attempts` (evidência imutável: semente, respostas, resultado), `lesson_progress`
- `arrangements` → `arrangement_versions` (imutáveis, JSON do `Score` com `schema_version`)
- `validation_reports` (versão do motor + configuração + diagnósticos — reprodutível)
- `evaluations` (rubrica por critério + evidências; origem automática, autoavaliação ou tutor)
- RLS em todas as tabelas; dados privados restritos a `auth.uid() = user_id`; triggers impedem apontar para versões de outro usuário.

## Plano de implementação

| Etapa | Entrega | Situação |
|---|---|---|
| 1 | Inspeção do repositório | ✅ `docs/estado-inicial.md` |
| 2 | Arquitetura, decisões, estrutura, dados | ✅ este documento |
| 3 | Versão executável: painel, currículo, 3 lições completas, estúdio experimental, testes | ✅ |
| 4 | Editor completo: inserir/mover eventos entre posições, colar, seleção múltipla, quiálteras, dinâmicas/articulações na notação, compassos e tonalidade editáveis | parcial (edição de altura, duração, pausas, ligaduras, letra, desfazer/refazer já funcionam) |
| 5 | Reprodução: cursor sincronizado, metrônomo, soundfont vocal, loop de trecho | parcial (tocar/pausar/reiniciar, vozes isoladas/combinadas e cursor por onset já funcionam) |
| 6 | Motor de validação: notas estranhas (passagem, bordadura, retardo), paralelas entre tempos fortes, ritmo harmônico, prosódia | parcial (21 regras implementadas e testadas) |
| 7 | Supabase exclusivo: Auth, migrations, RLS, repositórios no servidor, testes de integração | ✅ projeto exclusivo criado, migrations e catálogo aplicados, advisors limpos — ver `docs/supabase.md` |
| 8 | Lições restantes, exercícios de condução, projetos com rubrica | estrutura pronta |
| 9 | MusicXML e MIDI (import/export), PDF, tutor de IA baseado em diagnósticos | pendente |
| 10 | Revisão de segurança, acessibilidade, responsividade, documentação, implantação | pendente |
