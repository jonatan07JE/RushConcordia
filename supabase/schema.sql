create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.custom_drinks (
  id uuid primary key default gen_random_uuid(),
  catalog_id text,
  name text not null check (char_length(name) between 1 and 70),
  description text not null check (char_length(description) between 1 and 240),
  price numeric(8, 2) not null check (price > 0),
  type text not null default 'Bebida nueva',
  image_url text not null,
  image_path text,
  created_at timestamptz not null default now()
);

alter table public.custom_drinks add column if not exists catalog_id text;
alter table public.custom_drinks alter column image_path drop not null;
create unique index if not exists custom_drinks_catalog_id_uidx
  on public.custom_drinks (catalog_id)
  where catalog_id is not null;

create table if not exists public.menu_catalog_imports (
  id text primary key,
  imported_at timestamptz not null default now()
);

create or replace function public.is_drink_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as 'select exists (select 1 from public.admin_users where user_id = (select auth.uid()))';

revoke all on function public.is_drink_admin() from public;
grant execute on function public.is_drink_admin() to anon, authenticated;

alter table public.admin_users enable row level security;
alter table public.custom_drinks enable row level security;
alter table public.menu_catalog_imports enable row level security;

revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;
grant select on public.custom_drinks to anon, authenticated;
grant insert, update, delete on public.custom_drinks to authenticated;
revoke all on public.menu_catalog_imports from anon, authenticated;
grant select, insert on public.menu_catalog_imports to authenticated;

drop policy if exists "admins can read own admin record" on public.admin_users;
create policy "admins can read own admin record"
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "admins can read menu catalog import" on public.menu_catalog_imports;
create policy "admins can read menu catalog import"
  on public.menu_catalog_imports for select to authenticated
  using ((select public.is_drink_admin()));

drop policy if exists "admins can mark menu catalog imported" on public.menu_catalog_imports;
create policy "admins can mark menu catalog imported"
  on public.menu_catalog_imports for insert to authenticated
  with check ((select public.is_drink_admin()));

drop policy if exists "drinks are public to read" on public.custom_drinks;
create policy "drinks are public to read"
  on public.custom_drinks for select to anon, authenticated
  using (true);

drop policy if exists "admins can add drinks" on public.custom_drinks;
create policy "admins can add drinks"
  on public.custom_drinks for insert to authenticated
  with check ((select public.is_drink_admin()));

drop policy if exists "admins can update drinks" on public.custom_drinks;
create policy "admins can update drinks"
  on public.custom_drinks for update to authenticated
  using ((select public.is_drink_admin()))
  with check ((select public.is_drink_admin()));

drop policy if exists "admins can delete drinks" on public.custom_drinks;
create policy "admins can delete drinks"
  on public.custom_drinks for delete to authenticated
  using ((select public.is_drink_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('drink-photos', 'drink-photos', true, 10485760, array['image/jpeg'])
on conflict (id) do update
set public = true, file_size_limit = 10485760, allowed_mime_types = array['image/jpeg'];

drop policy if exists "drink photos are public to read" on storage.objects;
create policy "drink photos are public to read"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'drink-photos');

drop policy if exists "admins can upload drink photos" on storage.objects;
create policy "admins can upload drink photos"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'drink-photos' and (select public.is_drink_admin()));

drop policy if exists "admins can delete drink photos" on storage.objects;
create policy "admins can delete drink photos"
  on storage.objects for delete to authenticated
  using (bucket_id = 'drink-photos' and (select public.is_drink_admin()));