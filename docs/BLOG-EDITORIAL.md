# Broadview Journal publishing workflow

## Current authority — verified November 10, 2026

User authorized repairing publishing, releasing today's reviewed story, and automatic publication at least twice weekly.
Source: https://github.com/cbutler1516/broadview-lending
Vercel team: team_pAEhwBPRbi2jDbePi5kUqaxJ
Project: broadview-lending / prj_dH2mbfYFAuymCiVyHidZi4w1kfuc
Live domain: https://www.broadviewlending.com (apex redirects to www).
Verified production baseline: 0aa3bdedf483abd57ae79196de50447b73569d38.
Prior deployment: dpl_5MGP7oqM3tAv6xf8Vbe4yAKegmGn.
The existing blog foundation is live. The old October source/domain blocker is resolved.
Baseline branch: release/broadview-redesign-2026-10-07. Never deploy main or the dirty authoring folder.

Gate: READY for the isolated workflow below after its required checks pass on each release.
November 10 isolation: clean worktree release/blog-2026-11-10 created from the exact live SHA; only today's article, cover and publishing documentation are eligible.
The user explicitly authorized this setup and production release on November 10. Historical NOT READY notes in other files are superseded by this document.

## Schedule and authorization

Publish Tuesdays and Fridays at 8 a.m. America/Los_Angeles, respecting daylight saving time. No per-article approval is required.
Existing heartbeat broadview-journal-daily-article is updated in place; its ID is retained for continuity.
This scheduler runs on the local host, which must be awake with Codex available. Do not represent it as a hosted always-on service.
At most one article per Pacific date. Check source, live archive and marketing/blog logs before writing. No backdating or bulk catch-up.
On failure retain a draft and notify with the specific actionable failure; do not silently accumulate drafts under a stale gate.

## Isolated source-backed release procedure

1. Read AGENTS.md, CODEX_HANDOFF.md and this document in C:/Users/cbutl/Projects/broadview-lending. Query Vercel get_deployment for www.broadviewlending.com with the team above. Confirm project, production state, exact source SHA, and aliases. Record prior deployment.
2. Fetch origin. Create a new sibling Git worktree on release/blog-YYYY-MM-DD from the verified live SHA, not the authoring checkout HEAD. Use a unique suffix only when resuming an incomplete release; inspect existing worktrees first. Never reset/stash/clean unrelated edits. Never assume main or an older release branch includes the latest production.
3. Prepare one 250–450-word original consumer article in the shared JSON model. Browse primary sources, confirm release/data dates and geography. Rotate buying, owning/home equity, rates, refinancing, market notes and occasional investor basics. If no relevant news is verified use evergreen guidance; no invented news, quotes, guarantees or unverified product claims.
4. Stage only the reviewed src/content/blog/<slug>.json, required public/images/blog/<cover>.webp and publishing docs/logs. Set published status only in the isolated release. Preserve illustration disclosure and use a distinct unused library cover or a justified new still. Verify image hashes, dimensions and alt text. Include three valid related stories, source citations and existing product/tool/contact CTAs. Spend zero paid video credits.
5. In the isolated checkout run npm ci, node scripts/verify-blog.mjs, npm run lint, npx tsc --noEmit --incremental false, npm run build. Stop on failure. Never run production-facing npm run qa or submit leads. Do not copy production secrets into the checkout.
6. Start the isolated build on an unused local port and run node scripts/verify-blog.mjs http://localhost:<port>. Review the article desktop/mobile, image, canonical and structured data. Check the exact staged diff contains only allowed blog/documentation paths and git diff --check passes.
7. Commit and push only the isolated release branch. Never force-push or push to main. Record full commit SHA. Re-query the live domain before deployment; if production moved, stop and rebuild the isolated release from that newer live SHA so unrelated releases cannot be overwritten.
8. Use authenticated Vercel create_deployment with teamId above and requestBody {name:"broadview-lending", project:"prj_dH2mbfYFAuymCiVyHidZi4w1kfuc", target:"production", gitSource:{type:"github",repoId:1253582020,ref:<exact pushed commit SHA>}}. Inspect until READY; verify exact SHA and production aliases. Never deploy the dirty workspace through a CLI upload. DNS changes are not needed.
9. Verify live article, archive, assigned image, /blog/feed.xml and /sitemap.xml, plus article canonical/BlogPosting and related/product/contact links. Confirm the live domain resolves to the new deployment. Retain prior deployment ID for rollback; if a regression is confirmed restore that known prior production using the same project.
10. Write marketing/blog/YYYY-MM-DD-publication.md in the authoring workspace with sources/dates, scope, checks, commit, branch and prior/new deployment IDs. Sync this publishing guide to the authoring workspace. Subsequent releases always start from live SHA, so no dirty authoring merge is required.

## Boundaries

Preserve HELOC/application URLs, contact options, backend, CRM, scoring, analytics, admin and compliance. Do not change DNS, billing, subscription settings or submit production test leads.
