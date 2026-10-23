-- handle_new_user é SECURITY DEFINER e só deve rodar como trigger em auth.users.
-- Remove a possibilidade de chamá-la via /rest/v1/rpc (advisor de segurança 0028/0029).
-- Triggers não dependem do privilégio EXECUTE do usuário que dispara o evento.
revoke execute on function public.handle_new_user() from public, anon, authenticated;
