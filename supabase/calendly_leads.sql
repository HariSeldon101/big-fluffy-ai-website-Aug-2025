-- Calendly leads storage
create table if not exists public.calendly_leads (
  id uuid primary key default gen_random_uuid(),
  invitee_email text not null,
  invitee_name text,
  invitee_timezone text,
  event_name text,
  start_time timestamptz,
  end_time timestamptz,
  calendly_event_uri text,
  calendly_invitee_uri text unique,
  status text not null default 'created',
  canceled_at timestamptz,
  cancel_reason text,
  created_via text default 'calendly',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Helpful index
create index if not exists idx_calendly_leads_email on public.calendly_leads (invitee_email);

-- RLS: Keep table secure by default (requires service role for writes)
alter table public.calendly_leads enable row level security;

-- Example policy (optional): allow read-only to authenticated users
do $$ begin
  if not exists (
    select 1 from pg_policies where schemaname = 'public' and tablename = 'calendly_leads' and policyname = 'Allow read for authenticated'
  ) then
    create policy "Allow read for authenticated"
      on public.calendly_leads for select
      to authenticated
      using (true);
  end if;
end $$;

