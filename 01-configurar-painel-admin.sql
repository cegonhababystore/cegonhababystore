-- =========================================================
-- CEGONHA BABY STORE - CONFIGURAÇÃO DO PAINEL ADMINISTRATIVO
-- Execute UMA vez no SQL Editor do Supabase.
-- Este script NÃO cria seu usuário. O usuário é criado em Authentication > Users.
-- =========================================================

-- 1) Lista de usuários que realmente são administradores.
create table if not exists public.administradores (
    user_id uuid primary key references auth.users(id) on delete cascade,
    created_at timestamptz not null default now()
);

alter table public.administradores enable row level security;

revoke all on table public.administradores from anon;
grant select on table public.administradores to authenticated;

drop policy if exists "Administrador consulta o proprio acesso" on public.administradores;
create policy "Administrador consulta o proprio acesso"
on public.administradores
for select
to authenticated
using ((select auth.uid()) = user_id);

-- 2) Permissões de banco para usuários autenticados.
-- O RLS abaixo garante que somente quem está em administradores pode usar essas permissões.
grant usage on schema public to authenticated;
grant select, insert, update, delete on table public.produtos to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- Leitura completa no painel (inclusive produtos inativos).
drop policy if exists "Administradores podem ver todos os produtos" on public.produtos;
create policy "Administradores podem ver todos os produtos"
on public.produtos
for select
to authenticated
using (
    exists (
        select 1
        from public.administradores a
        where a.user_id = (select auth.uid())
    )
);

-- Cadastro.
drop policy if exists "Administradores podem cadastrar produtos" on public.produtos;
create policy "Administradores podem cadastrar produtos"
on public.produtos
for insert
to authenticated
with check (
    exists (
        select 1
        from public.administradores a
        where a.user_id = (select auth.uid())
    )
);

-- Alteração.
drop policy if exists "Administradores podem alterar produtos" on public.produtos;
create policy "Administradores podem alterar produtos"
on public.produtos
for update
to authenticated
using (
    exists (
        select 1
        from public.administradores a
        where a.user_id = (select auth.uid())
    )
)
with check (
    exists (
        select 1
        from public.administradores a
        where a.user_id = (select auth.uid())
    )
);

-- Exclusão.
drop policy if exists "Administradores podem excluir produtos" on public.produtos;
create policy "Administradores podem excluir produtos"
on public.produtos
for delete
to authenticated
using (
    exists (
        select 1
        from public.administradores a
        where a.user_id = (select auth.uid())
    )
);

-- 3) Bucket público para fotos dos produtos.
-- A leitura das fotos é pública, mas o upload será permitido somente aos administradores.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'produtos',
    'produtos',
    true,
    5242880,
    array['image/jpeg','image/png','image/webp']::text[]
)
on conflict (id) do update
set public = true,
    file_size_limit = 5242880,
    allowed_mime_types = array['image/jpeg','image/png','image/webp']::text[];

-- Upload de novas fotos.
drop policy if exists "Administradores podem enviar fotos de produtos" on storage.objects;
create policy "Administradores podem enviar fotos de produtos"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'produtos'
    and exists (
        select 1
        from public.administradores a
        where a.user_id = (select auth.uid())
    )
);

-- Exclusão de fotos (preparado para uso futuro pelo painel).
drop policy if exists "Administradores podem excluir fotos de produtos" on storage.objects;
create policy "Administradores podem excluir fotos de produtos"
on storage.objects
for delete
to authenticated
using (
    bucket_id = 'produtos'
    and exists (
        select 1
        from public.administradores a
        where a.user_id = (select auth.uid())
    )
);
