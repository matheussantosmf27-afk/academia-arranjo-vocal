-- Academia de Arranjo Vocal — esquema inicial (etapa 3: modelado, AINDA NÃO APLICADO).
-- Aplicar somente no projeto Supabase exclusivo e autorizado deste produto (etapa 7).
-- Conteúdo pedagógico vive no código (src/content) e é espelhado no catálogo abaixo
-- para integridade referencial; dados de alunos são privados e protegidos por RLS.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- Perfis
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text check (char_length(display_name) <= 120),
  preferred_formation text not null default 'SATB' check (preferred_formation in ('SATB', 'TTBB')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- Catálogo (somente leitura para usuários)
create table public.levels (
  id text primary key,
  number smallint not null unique,
  title text not null
);

create table public.units (
  id text primary key,
  level_id text not null references public.levels (id),
  title text not null,
  position smallint not null
);

create table public.lessons (
  id text primary key,
  unit_id text not null references public.units (id),
  title text not null,
  status text not null check (status in ('disponivel', 'em-preparacao')),
  content_version text not null,
  position smallint not null
);

create table public.lesson_prerequisites (
  lesson_id text not null references public.lessons (id) on delete cascade,
  prerequisite_id text not null references public.lessons (id),
  primary key (lesson_id, prerequisite_id),
  check (lesson_id <> prerequisite_id)
);

-- ---------------------------------------------------------------- Progresso e tentativas
create table public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id text not null references public.lessons (id),
  exercise_set_id text not null,
  seed bigint not null,                          -- reconstrói os itens apresentados
  answers jsonb not null check (jsonb_typeof(answers) = 'array'),
  score numeric(5, 4) not null check (score between 0 and 1),
  correct integer not null check (correct >= 0),
  total integer not null check (total > 0 and correct <= total),
  passed boolean not null,
  missing_required text[] not null default '{}',
  by_skill jsonb not null default '{}',
  started_at timestamptz not null,
  finished_at timestamptz not null default now(),
  check (finished_at >= started_at)
);
create index exercise_attempts_user_lesson_idx on public.exercise_attempts (user_id, lesson_id, finished_at desc);

create table public.lesson_progress (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  lesson_id text not null references public.lessons (id),
  read_at timestamptz,
  mastered_at timestamptz,
  mastery_attempt_id uuid references public.exercise_attempts (id) on delete set null,
  primary key (user_id, lesson_id)
);

-- ---------------------------------------------------------------- Arranjos, versões, diagnósticos e avaliações
create table public.arrangements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 200),
  formation text not null check (formation in ('SATB', 'TTBB')),
  style text not null default 'coral-tradicional' check (style in ('coral-tradicional', 'coral-contemporaneo', 'popular-a-cappella')),
  current_version_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index arrangements_user_idx on public.arrangements (user_id, updated_at desc);

create table public.arrangement_versions (
  id uuid primary key default gen_random_uuid(),
  arrangement_id uuid not null references public.arrangements (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  version_number integer not null check (version_number > 0),
  schema_version smallint not null,
  score jsonb not null check (jsonb_typeof(score) = 'object' and pg_column_size(score) < 2000000),
  note text check (char_length(note) <= 2000),
  created_at timestamptz not null default now(),
  unique (arrangement_id, version_number)
);

alter table public.arrangements
  add constraint arrangements_current_version_fk foreign key (current_version_id) references public.arrangement_versions (id) on delete set null;

-- Relatório do motor determinístico: guarda versão do motor e configuração (reprodutibilidade).
create table public.validation_reports (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.arrangement_versions (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  engine_version text not null,
  config jsonb not null,
  diagnostics jsonb not null check (jsonb_typeof(diagnostics) = 'array'),
  counts jsonb not null,
  created_at timestamptz not null default now()
);

-- Avaliação por rubrica (projetos práticos): critérios separados, nunca uma nota única.
create table public.evaluations (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.arrangement_versions (id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  project_id text not null,
  rubric jsonb not null,             -- {criterio: {nivel, justificativa}}
  evidence jsonb not null default '[]', -- IDs de diagnósticos e trechos usados
  source text not null check (source in ('automatica', 'autoavaliacao', 'tutor')),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------- Integridade de dono
-- Versões, relatórios e avaliações só podem apontar para arranjos/versões do próprio usuário.
create or replace function public.assert_owner_consistency() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if tg_table_name = 'arrangement_versions' then
    if not exists (select 1 from public.arrangements a where a.id = new.arrangement_id and a.user_id = new.user_id) then
      raise exception 'arranjo não pertence ao usuário';
    end if;
  else
    if not exists (select 1 from public.arrangement_versions v where v.id = new.version_id and v.user_id = new.user_id) then
      raise exception 'versão não pertence ao usuário';
    end if;
  end if;
  return new;
end $$;

create trigger arrangement_versions_owner before insert or update on public.arrangement_versions
  for each row execute function public.assert_owner_consistency();
create trigger validation_reports_owner before insert or update on public.validation_reports
  for each row execute function public.assert_owner_consistency();
create trigger evaluations_owner before insert or update on public.evaluations
  for each row execute function public.assert_owner_consistency();

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;
create trigger profiles_touch before update on public.profiles for each row execute function public.touch_updated_at();
create trigger arrangements_touch before update on public.arrangements for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------- Row Level Security
alter table public.profiles enable row level security;
alter table public.levels enable row level security;
alter table public.units enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_prerequisites enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.arrangements enable row level security;
alter table public.arrangement_versions enable row level security;
alter table public.validation_reports enable row level security;
alter table public.evaluations enable row level security;

-- Catálogo: leitura pública; escrita apenas pelo service role (que ignora RLS) em scripts de sincronização.
create policy "catalogo leitura" on public.levels for select using (true);
create policy "catalogo leitura" on public.units for select using (true);
create policy "catalogo leitura" on public.lessons for select using (true);
create policy "catalogo leitura" on public.lesson_prerequisites for select using (true);

create policy "perfil proprio" on public.profiles for all to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Tentativas: o aluno lê e cria as suas; não edita nem apaga evidências.
create policy "tentativas leitura" on public.exercise_attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy "tentativas criacao" on public.exercise_attempts for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "progresso proprio" on public.lesson_progress for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "arranjos proprios" on public.arrangements for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Versões são imutáveis: sem política de update.
create policy "versoes leitura" on public.arrangement_versions for select to authenticated using ((select auth.uid()) = user_id);
create policy "versoes criacao" on public.arrangement_versions for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "versoes exclusao" on public.arrangement_versions for delete to authenticated using ((select auth.uid()) = user_id);

create policy "relatorios leitura" on public.validation_reports for select to authenticated using ((select auth.uid()) = user_id);
create policy "relatorios criacao" on public.validation_reports for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "avaliacoes leitura" on public.evaluations for select to authenticated using ((select auth.uid()) = user_id);
create policy "avaliacoes criacao" on public.evaluations for insert to authenticated with check ((select auth.uid()) = user_id);

-- Perfil criado automaticamente no cadastro.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
