# Supabase (etapa 7)

## Situação
- **Projeto exclusivo:** `academia-arranjo-vocal` (ref `ixdydyinjruesjjpswxe`, região sa-east-1), criado em 2026-10-22. Para liberar a vaga do plano gratuito, o projeto `vozes-em-harmonia` foi **pausado** por decisão do responsável (pode ser reativado no painel do Supabase; reativá-lo exige pausar outro projeto ou mudar de plano).
- **Migrations aplicadas** (os nomes dos arquivos coincidem com as versões remotas): esquema + RLS + triggers, índices de FKs e revogação de RPC da função de trigger.
- **Catálogo** carregado: 5 níveis, 8 unidades, 22 lições (3 publicadas), 21 pré-requisitos. Gerado do código: `npm run db:catalog` → `supabase/seed/catalog.sql`.
- **Advisors:** segurança sem alertas; performance apenas "índice não usado" (esperado com o banco vazio).
- **Teste de fumaça na API real:** catálogo legível por anônimo; arranjos invisíveis para anônimo; escrita anônima em arranjos e no catálogo recusada (401); função de trigger não exposta via RPC.

## Segurança
- O navegador e o servidor usam apenas a **chave publicável**; toda leitura/escrita passa pelo RLS como o próprio usuário. A service role não é usada pelo app.
- Ações de servidor (`src/app/actions`) revalidam tudo: sessão (`auth.getUser()`), esquema da partitura (Zod), IDs (UUID) e **recorrigem as tentativas a partir da semente** — o resultado enviado pelo navegador é ignorado. Pré-requisitos também são verificados no servidor.
- Versões de arranjo e tentativas são imutáveis (sem política de UPDATE); triggers impedem apontar para dados de outro usuário.

## Desenvolvimento local (Docker)
```bash
npx supabase start -x studio,imgproxy,edge-runtime,logflare,vector,realtime,storage-api,mailpit,postgres-meta,supavisor
# copie API_URL e PUBLISHABLE_KEY exibidos para .env.local:
#   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
#   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
npx supabase db reset      # reaplica migrations + catálogo
npx supabase db lint
```

## Testes
- `npm run test:integration` — RLS e integridade num Postgres descartável (requer `AAV_TEST_DATABASE_URL`, ex.: `postgres://postgres@localhost:54329/postgres`). Usa `supabase/tests/supabase-shim.sql` para simular roles e `auth.uid()`.
- `E2E_SUPABASE=1 npm run test:e2e` — fluxo completo com conta (cadastro, tentativa recorrigida, versões, isolamento entre usuários), com o app construído apontando para a stack local.

## Pendências de configuração no painel (Authentication)
1. **Site URL e Redirect URLs:** apontar para o domínio de implantação quando existir (hoje o padrão é `http://localhost:3000`).
2. **Tamanho mínimo de senha:** a interface exige 8 caracteres; ajustar também no Auth (padrão do Supabase: 6).
3. **Confirmação de e-mail:** ativa por padrão no projeto hospedado (recomendado). Em produção, configurar SMTP próprio: o e-mail padrão do Supabase tem limite baixo de envios.
4. Na implantação, definir `NEXT_PUBLIC_SUPABASE_URL=https://ixdydyinjruesjjpswxe.supabase.co` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (chave publicável, pode ser exposta ao navegador; o acesso é limitado por RLS).
