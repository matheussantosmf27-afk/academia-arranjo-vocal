-- Evolução pedagógica: evidências de produção com nível de autonomia, perfil musical inicial
-- (estudo pedagógico) e avaliação humana (professor ou regente) na tabela de avaliações.
-- Nenhuma coluna existente é removida; os dados já salvos continuam válidos.

-- ---------------------------------------------------------------- Tentativas de produção
-- Cada conferência de uma tarefa corrigida (aula, transferência, pré-teste ou pós-teste).
-- O servidor recorrige a partitura enviada; "passed", "failed_checks" e "rule_ids" vêm do motor.
-- O id é gerado no navegador (uuid) para que a sincronização una os registros sem duplicar.
create table public.production_attempts (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  task_id text not null check (char_length(task_id) between 1 and 200),
  kind text not null check (kind in ('producao', 'transferencia', 'pre-teste', 'pos-teste')),
  lesson_id text check (char_length(lesson_id) <= 120),
  competency text not null check (char_length(competency) <= 80),
  seed bigint,
  passed boolean not null,
  assistance text not null check (assistance in ('autonomo', 'dica', 'demonstracao', 'solucao')),
  hints_used integer not null default 0 check (hints_used between 0 and 20),
  corrections integer not null default 0 check (corrections >= 0),
  failed_checks text[] not null default '{}',
  rule_ids text[] not null default '{}',
  engine_version text not null,
  score jsonb not null,                 -- partitura conferida (para revisão do professor)
  started_at timestamptz not null,
  finished_at timestamptz not null default now(),
  check (finished_at >= started_at)
);
create index production_attempts_user_idx on public.production_attempts (user_id, finished_at desc);
create index production_attempts_task_idx on public.production_attempts (user_id, task_id);

alter table public.production_attempts enable row level security;
-- Evidência imutável: o dono lê e cria; ninguém altera nem apaga pela API.
create policy "producao leitura" on public.production_attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy "producao criacao" on public.production_attempts for insert to authenticated with check ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------- Perfil musical inicial
-- Respondido pelo próprio aluno no início do estudo (sem dados simulados).
create table public.musical_profiles (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  answers jsonb not null check (jsonb_typeof(answers) = 'object'),
  consent_at timestamptz,               -- consentimento para uso anônimo em pesquisa (opcional)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger musical_profiles_touch before update on public.musical_profiles for each row execute function public.touch_updated_at();

alter table public.musical_profiles enable row level security;
create policy "perfil musical proprio" on public.musical_profiles for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- ---------------------------------------------------------------- Avaliação humana
-- O parecer de um professor ou regente, registrado pelo aluno na própria conta, sobre uma versão salva.
alter table public.evaluations drop constraint evaluations_source_check;
alter table public.evaluations add constraint evaluations_source_check check (source in ('automatica', 'autoavaliacao', 'tutor', 'professor'));
alter table public.evaluations add column evaluator_name text check (char_length(evaluator_name) <= 120);
