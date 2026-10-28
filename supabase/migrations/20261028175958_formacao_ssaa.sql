-- Formação SSAA (coro feminino / vozes iguais agudas): amplia as restrições de formação.
alter table public.profiles drop constraint profiles_preferred_formation_check;
alter table public.profiles add constraint profiles_preferred_formation_check check (preferred_formation in ('SATB', 'TTBB', 'SSAA'));
alter table public.arrangements drop constraint arrangements_formation_check;
alter table public.arrangements add constraint arrangements_formation_check check (formation in ('SATB', 'TTBB', 'SSAA'));
