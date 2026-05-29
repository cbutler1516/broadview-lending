-- Attribution columns for leads

alter table leads add column if not exists utm_content text;
alter table leads add column if not exists utm_term text;
alter table leads add column if not exists gclid text;
alter table leads add column if not exists fbclid text;
