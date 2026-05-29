-- Additive migration for existing Broadview Lending 2.0 databases

alter table leads add column if not exists submission_id text unique;
alter table leads add column if not exists tcpa_consent_at timestamptz;
alter table leads add column if not exists tcpa_consent_text text;
alter table leads add column if not exists ip_address text;
alter table leads add column if not exists user_agent text;
alter table leads add column if not exists agent_needed boolean default false;
alter table leads add column if not exists timeline text;
alter table leads add column if not exists crm_sync_results jsonb default '[]';

create index if not exists leads_agent_needed_idx on leads (agent_needed);
create index if not exists leads_submission_id_idx on leads (submission_id);
create index if not exists leads_phone_idx on leads (phone);

alter table analytics_events add column if not exists session_id text;
alter table analytics_events add column if not exists ip_address text;
alter table analytics_events add column if not exists user_agent text;

create index if not exists analytics_events_funnel_type_idx on analytics_events (funnel_type);
create index if not exists analytics_events_session_id_idx on analytics_events (session_id);
