-- Índices para chaves estrangeiras (recomendação do advisor de performance do Supabase).
create index if not exists units_level_idx on public.units (level_id);
create index if not exists lessons_unit_idx on public.lessons (unit_id);
create index if not exists lesson_prerequisites_prereq_idx on public.lesson_prerequisites (prerequisite_id);
create index if not exists exercise_attempts_lesson_idx on public.exercise_attempts (lesson_id);
create index if not exists lesson_progress_lesson_idx on public.lesson_progress (lesson_id);
create index if not exists lesson_progress_attempt_idx on public.lesson_progress (mastery_attempt_id);
create index if not exists arrangements_current_version_idx on public.arrangements (current_version_id);
create index if not exists arrangement_versions_user_idx on public.arrangement_versions (user_id);
create index if not exists validation_reports_version_idx on public.validation_reports (version_id);
create index if not exists validation_reports_user_idx on public.validation_reports (user_id);
create index if not exists evaluations_version_idx on public.evaluations (version_id);
create index if not exists evaluations_user_idx on public.evaluations (user_id);
