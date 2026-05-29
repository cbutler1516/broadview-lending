# Broadview Lending 2.0

Modern residential mortgage lead generation platform built with Next.js, TypeScript, Tailwind CSS, Supabase, and Vercel.

## Local Setup

```bash
cd broadview-lending
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run:
   - `supabase/schema.sql` (new projects)
   - `supabase/migrations/001_lead_capture_enhancements.sql` (if upgrading)
   - `supabase/migrations/002_attribution.sql` (if upgrading)
3. Copy project URL, anon key, and service role key into `.env.local`.

### Required tables

- `leads` — funnel submissions with TCPA consent, scores, attribution
- `analytics_events` — conversion and funnel events

## Environment Variables

See `.env.example` for the full list. Minimum for local lead capture:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes* | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes* | Server-side DB writes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Optional | Anon client (future use) |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site URL for metadata |
| `NEXT_PUBLIC_BOOKING_URL` | Optional | External booking link; falls back to `/contact` |
| `ADMIN_PASSWORD` | **Required for admin** | Password for `/admin/login` (leads & analytics) |
| `CRM_PROVIDERS` | Optional | Comma-separated: `console`, `zapier`, `hubspot` |
| `ZAPIER_WEBHOOK_URL` | If using Zapier | Catch Hook URL for lead sync |

\* Without Supabase, leads fall back to CRM-only mode when CRM is configured.

## Zapier CRM Setup

1. Create a Zap with **Webhooks by Zapier → Catch Hook** as the trigger.
2. Copy the webhook URL into `ZAPIER_WEBHOOK_URL`.
3. Set `CRM_PROVIDERS=console,zapier` in Vercel/local env.
4. Map the JSON payload fields in Zapier (contact, funnelType, scoreSummary, tcpa, attribution).

## Key Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage with funnel selection |
| `/funnel/[type]` | Adaptive qualification funnels |
| `/contact` | Schedule / contact fallback |
| `/learn` | Education hub |
| `/admin/login` | Admin authentication |
| `/admin/leads` | Lead inbox (password protected) |
| `/admin/analytics` | Conversion snapshot (password protected) |
| `/api/leads` | JSON lead submission API |

## Vercel Deployment Checklist

- [ ] Push repo to GitHub
- [ ] Import project in Vercel
- [ ] Set all production environment variables (see below)
- [ ] Run Supabase migrations on production database
- [ ] Set `NEXT_PUBLIC_SITE_URL` to production domain
- [ ] Set `NEXT_PUBLIC_BOOKING_URL` to live scheduling link
- [ ] Set `CRM_PROVIDERS` and `ZAPIER_WEBHOOK_URL` for live lead routing
- [ ] Set a strong `ADMIN_PASSWORD` for production admin access
- [ ] Deploy and test a full funnel submission
- [ ] Verify lead appears in `/admin/leads` and Zapier (if configured)
- [ ] Test UTM capture: `?utm_source=google&utm_medium=cpc`
- [ ] Confirm booking CTAs route correctly
- [ ] Confirm `/admin/leads` redirects to login when logged out
- [ ] Verify `robots.txt` disallows `/admin/` and `sitemap.xml` lists public routes

### Vercel environment variables (production)

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_BOOKING_URL=
ADMIN_PASSWORD=
CRM_PROVIDERS=console,zapier
ZAPIER_WEBHOOK_URL=
HUBSPOT_ACCESS_TOKEN=
```

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
npx tsc --noEmit # Type check
```

## Analytics Events

Client events persisted to Supabase when configured:

- `funnel_started`, `question_answered`, `lead_capture_viewed`
- `lead_submitted`, `results_viewed`, `realtor_referral_requested`
- `homepage_cta_clicked`, `funnel_card_clicked`, `booking_cta_clicked`
- `contact_page_viewed`, `phone_clicked`, `email_clicked`

UTM and ad click IDs (`gclid`, `fbclid`) are captured from the URL and attached to events and lead submissions.

## Compliance

- TCPA consent required before results unlock
- NMLS, Equal Housing, and licensing disclosures in footer and legal pages
- Results include educational disclaimers — not loan approvals

## License

Proprietary — Broadview Lending / Barrett Financial Group.
