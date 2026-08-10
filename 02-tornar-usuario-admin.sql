-- =========================================================
-- PASSO FINAL: AUTORIZAR SEU USUÁRIO COMO ADMINISTRADOR
-- 1. Supabase > Authentication > Users
-- 2. Copie o UUID (User ID) da sua conta administrativa.
-- 3. Substitua COLE_SEU_UUID_AQUI abaixo pelo UUID real.
-- 4. Execute no SQL Editor.
-- =========================================================

insert into public.administradores (user_id)
values ('COLE_SEU_UUID_AQUI')
on conflict (user_id) do nothing;
