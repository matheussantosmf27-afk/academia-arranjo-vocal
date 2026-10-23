-- Registro das interações com o tutor de IA, com as evidências usadas (auditoria pedagógica).
create table public.tutor_interactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  mode text not null check (mode in ('explicar', 'socratico', 'revisar')),
  question text not null check (char_length(question) <= 2000),
  engine_version text not null,
  style text not null,
  evidence jsonb not null,          -- IDs de diagnósticos e cifragem enviados ao modelo
  response jsonb,                   -- resposta já validada (null em caso de falha)
  warnings jsonb not null default '[]',
  model text,
  ok boolean not null,
  created_at timestamptz not null default now()
);
create index tutor_interactions_user_idx on public.tutor_interactions (user_id, created_at desc);

alter table public.tutor_interactions enable row level security;
create policy "tutor leitura" on public.tutor_interactions for select to authenticated using ((select auth.uid()) = user_id);
create policy "tutor criacao" on public.tutor_interactions for insert to authenticated with check ((select auth.uid()) = user_id);
