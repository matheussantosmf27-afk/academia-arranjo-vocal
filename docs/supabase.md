# Supabase (etapa 7)

## Situação
- Esquema, RLS, triggers e índices: `supabase/migrations/` (2 migrations).
- Catálogo (níveis/unidades/lições/pré-requisitos) gerado do código: `npm run db:catalog` → `supabase/seed/catalog.sql`.
- **Projeto remoto ainda não criado:** a organização atingiu o limite de 2 projetos ativos do plano gratuito (`Oferta-Certa` e `vozes-em-harmonia` estão ativos). Criar o projeto exclusivo exige pausar/excluir um deles ou assinar um plano pago — decisão do responsável. Nenhum projeto existente foi alterado.

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

## Para ativar o projeto remoto
1. Criar o projeto `academia-arranjo-vocal` (região sa-east-1).
2. Aplicar as migrations e o seed do catálogo.
3. Rodar os advisors de segurança e performance.
4. Configurar `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` no ambiente de implantação e o `site_url`/redirect de Auth.
