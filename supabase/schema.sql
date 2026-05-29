-- Broadview Lending 2.0 — Supabase Schema
-- Run this in the Supabase SQL editor for new projects.
-- For existing deployments, run supabase/migrations/001_lead_capture_enhancements.sql

create extension if not exists "uuid-ossp";

create table if not exists leads (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  submission_id text unique,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  tcpa_consent boolean not null default false,
  tcpa_consent_version text not null,
  tcpa_consent_at timestamptz,
  tcpa_consent_text text,
  ip_address text,
  user_agent text,
  funnel_type text not null,
  answers jsonb not null default '{}',
  result jsonb not null default '{}',
  lead_grade text,
  mortgage_opportunity_score integer,
  readiness_score integer,
  urgency_score integer,
  lead_quality_score integer,
  agent_referral_score integer,
  estimated_loan_amount numeric,
  credit_tier text,
  recommended_program text,
  recommended_follow_up text,
  realtor_referral text,
  agent_needed boolean default false,
  timeline text,
  tags text[] default '{}',
  lead_source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  gclid text,
  fbclid text,
  crm_synced boolean default false,
  crm_sync_results jsonb default '[]'
);

create index if not exists leads_funnel_type_idx on leads (funnel_type);
create index if not exists leads_lead_grade_idx on leads (lead_grade);
create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_agent_needed_idx on leads (agent_needed);
create index if not exists leads_submission_id_idx on leads (submission_id);
create index if not exists leads_phone_idx on leads (phone);

create table if not exists analytics_events (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz not null default now(),
  event text not null,
  funnel_type text,
  lead_id uuid references leads(id) on delete set null,
  session_id text,
  ip_address text,
  user_agent text,
  metadata jsonb default '{}'
);

create index if not exists analytics_events_event_idx on analytics_events (event);
create index if not exists analytics_events_funnel_type_idx on analytics_events (funnel_type);
create index if not exists analytics_events_created_at_idx on analytics_events (created_at desc);
create index if not exists analytics_events_session_id_idx on analytics_events (session_id);
