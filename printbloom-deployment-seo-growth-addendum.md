# PRINTBLOOM — DEPLOYMENT, SEO, LAUNCH & POST-LAUNCH GROWTH ADDENDUM

*Extends the PrintBloom Production Blueprint. Brand, UX, architecture, humanised design principles, and business strategy from that document stand unchanged — this addendum covers everything between "code is done" and "business is growing."*

> **VERIFY BEFORE PRODUCTION** flags a fact that depends on a provider's current commercial terms and must be re-checked at build time, not assumed from this document.

---

## 1. Core Business Objective

Not "a beautiful website" — a trustworthy, fast, discoverable, conversion-focused storefront that feeds this funnel:

Instagram/Google/Direct → Website → Emotion → Trust → Product/Story → Desire → Order CTA → WhatsApp/Instagram/Form → Enquiry → Payment → Content submission → Design → Approval → Print → Dispatch → Review → Bloom Journal → more social + search content (the loop closes into §29).

---

## 2. No Traffic or Revenue Guarantees

**We control**: technical SEO, performance, UX, structured content, internal linking, metadata, sitemap, structured data, image optimisation, analytics, conversion UX, content architecture.

**We do not control**: Google ranking position, indexing time, search volume, organic traffic volume, customer demand, sales, revenue.

The deliverable is a strong, measurable foundation — improvement comes from real post-launch data (§21), never from a promise made in advance.

---

## 3. Free/Low-Cost Production Architecture — Corrected for Commercial Use

**One correction to the original blueprint's stack (§22 there) is necessary here**: Vercel's Hobby (free) tier terms restrict it to personal, non-commercial projects — commercial use requires the paid Pro plan (~$20/mo/user), and there are documented cases of Vercel suspending sites found running commercial use on the free Hobby tier. **VERIFY BEFORE PRODUCTION** — check Vercel's current Hobby ToS directly before deploying, since terms change.

Given that, the cost-conscious options for a genuinely commercial site are:

| Layer | Recommended | Why | Note |
|---|---|---|---|
| Hosting | **Cloudflare Pages** (free tier historically permits commercial sites) | Generous free tier, no Vercel-style non-commercial restriction, works well with a static/ISR Next.js export or Next-on-Pages adapter | **VERIFY BEFORE PRODUCTION** — confirm current ToS and Next.js runtime compatibility at build time |
| Hosting (alt.) | Vercel **Pro** | Best-in-class Next.js DX, but is a real recurring cost (~$20/mo), not ₹0 | Use only if budget allows or if Cloudflare's Next.js support proves insufficient |
| Database | Supabase (free tier) | Postgres + Auth + RLS in one place | **VERIFY BEFORE PRODUCTION** — current storage/row/bandwidth caps |
| Media | Cloudinary (free tier) | Transformations + private folders | **VERIFY BEFORE PRODUCTION** — current storage/bandwidth caps and commercial-use terms |
| Email | Resend (free tier) | Simple transactional email | **VERIFY BEFORE PRODUCTION** — monthly send cap |
| Analytics | Google Analytics (free) | No cost tier issue | — |
| Search | Google Search Console (free) | No cost tier issue | — |
| Ordering | WhatsApp + Instagram + enquiry form | No infra cost | — |
| Domain | Client-owned `.com`/`.in` | Only mandatory recurring cost | See §5 |

**WHY flag this explicitly**: recommending a "free" host that turns out to prohibit the exact commercial use it's being used for is the single most damaging mistake in a budget-conscious build — it looks free until the account gets suspended mid-launch.

---

## 4. Client Account Ownership & Handover Procedure

**Mandatory**: every production account is created under the client's own email/organisation from day one — domain registrar, hosting (Cloudflare/Vercel), Supabase, Cloudinary, Resend, Google Search Console, Google Analytics. The developer is added as a **collaborator/admin**, never the account owner.

Handover procedure:
1. Client creates each account (or provides an email the developer uses to create it, then immediately transfers ownership/billing to the client).
2. Developer configures the project under client ownership.
3. Two-factor auth enabled on every account, recovery details set to the client's own contact info.
4. A single credentials/access record is handed to the client (§26) — the business never depends on the developer's personal accounts to keep running.

---

## 5. Domain Strategy

- **Selection**: prefer `.com` for general trust/recognition; `.in` is a reasonable, cheaper alternative if the `.com` is unavailable or budget-constrained — no functional SEO disadvantage for a business already targeting an Indian audience.
- **Ownership**: registered directly under the client's name/account (§4) — never under the developer's registrar account.
- **DNS**: managed via the registrar or, if using Cloudflare for hosting, via Cloudflare DNS (also gives free CDN/SSL benefits).
- **SSL**: automatic/managed by the hosting provider — no manual certificate handling needed on Cloudflare or Vercel.
- **Renewal**: auto-renewal enabled, billing on a card/method the client controls, renewal reminder set well ahead of expiry — an expired domain is a total outage.
- **Canonical domain**: pick one of `www.printbloom.<tld>` or `printbloom.<tld>` as canonical, 301-redirect the other — avoids duplicate-content SEO issues (see §13). Recommendation: apex (non-www) unless a specific technical reason favours www.
- **Final domain**: to be confirmed — availability not assumed here.

---

## 6. Deployment Pipeline

```
Developer machine
  → git commit
  → GitHub (client-owned org/repo, developer as collaborator)
  → Hosting provider build (Cloudflare Pages / Vercel) triggered on push to main
  → Environment variables injected from provider's secret store (never from repo)
  → Build connects to Supabase (production project) and Cloudinary (production account)
  → Resend configured for the production sending domain
  → Custom domain attached, DNS verified, HTTPS auto-issued
  → Production smoke test (forms, admin login, image delivery, key pages)
  → Google Search Console property verified + sitemap submitted
  → Google Analytics property connected, event tracking verified firing
  → LIVE
```

Every step above is repeatable from a fresh checkout — nothing depends on state that only exists on the developer's laptop.

---

## 7. Environment Management

- **Development**: `.env.local`, gitignored, points at a Supabase *development* project and Cloudinary *development* folder/account (never production data).
- **Production**: environment variables set directly in the hosting provider's dashboard (Cloudflare/Vercel secret store) — never committed, never emailed in plaintext.
- **Tracked reference**: `.env.example` lists variable names only, no real values (same shape as defined in the main blueprint, §23 there).
- **Client-safe (public) vars**: anything prefixed for client bundling (Supabase anon key, Cloudinary cloud name, public site URL) — safe because access is actually enforced by RLS (§21 in the main blueprint), not by keeping the key secret.
- **Server-only vars**: Supabase service-role key, Cloudinary API secret, Resend API key, admin session secret, upload token secret — never appear in any client-shipped file.

---

## 8. Production Database

- **Migrations**: versioned SQL files applied in order via Supabase CLI as part of the deploy step (§43 in the main blueprint) — never hand-edited against production.
- **Indexes**: on all foreign keys, on `slug` columns (unique + indexed for fast lookup), on `status`/`consent_status` where the public read queries filter on them.
- **Constraints**: `NOT NULL` on required fields, `UNIQUE` on slugs/emails, foreign-key constraints with sensible `ON DELETE` behaviour (e.g., `CASCADE` for `story_images` on `stories`, `RESTRICT` where deleting a product shouldn't silently orphan enquiry history).
- **Seed data**: a small, clearly-labelled dev-only seed set (placeholder products/stories) used only in the development Supabase project — **never** run against production.
- **Production data**: entered by the owner through the admin panel, or migrated once, deliberately, from real business content — no fake data is ever present in the production database, including during initial launch (§16 in the main blueprint's content rule applies equally here).
- **RLS policies**: verified against the policy set defined in the main blueprint (§21 there) with an actual unauthenticated-client test before go-live, not just code review.
- **Backup/restore**: see §25.

---

## 9. Media Deployment

- Originals never committed to Git — everything goes through Cloudinary from the point of capture/upload onward.
- Responsive delivery via Cloudinary's automatic format/quality pipeline (AVIF/WebP with fallback), transformation presets defined per usage context (hero, gallery, thumbnail, OG image).
- Lazy loading below the fold; hero images preloaded/prioritised.
- **Public media** (product images, approved Bloom Journal images, approved review assets): stored in public Cloudinary folders, referenced directly in public queries.
- **Private media** (customer-uploaded photos, order assets, anything with `consent_status != granted`): stored in a private folder/access-mode, never queried by any public-facing route — enforced at both the Cloudinary access-mode level and the application query level (defense in depth, matching §20 in the main blueprint).
- Video: compressed/transcoded appropriately, no autoplay-with-sound anywhere (also a motion-system rule from the main blueprint, §13 there).

---

## 10. Google Search Console — Launch Procedure

1. Add the domain as a property (domain-level, not just URL-prefix, to cover both www/non-www and http/https automatically).
2. Verify ownership (DNS TXT record is most robust if using Cloudflare DNS already).
3. Submit `sitemap.xml`.
4. Use URL Inspection on the homepage — confirm it's indexable, no `noindex`, correct canonical.
5. Inspect the Custom Magazine page and 2–3 other key pages the same way.
6. Check the Coverage/Indexing report for errors after the first crawl cycle (allow several days).
7. Monitor Search queries (Performance report) weekly once data starts appearing.
8–11. Monitor impressions, clicks, CTR, average position over time — not at launch, since there's no data yet.

**Troubleshooting map**:
- *Pages not indexed*: check `robots.txt` isn't blocking, check for accidental `noindex` meta tags, check the page is actually linked internally (orphan pages get crawled slower).
- *Crawl issues*: check server responds 200 (not intermittent 500s during low-traffic hosting cold-starts), check redirect chains aren't too long.
- *Canonical problems*: confirm every page's canonical tag points at itself (or intentionally at the canonical www/non-www version per §5), not at an unrelated URL.
- *Sitemap errors*: validate the sitemap XML, ensure it only lists canonical, indexable URLs.
- *Robots issues*: confirm `robots.txt` isn't accidentally disallowing `/products/` or `/journal/`.
- *Duplicate content*: usually a www/non-www or trailing-slash inconsistency — fixed by the canonicalisation in §5/§13.

**Important**: "Request Indexing" only asks Google to crawl sooner — it does not guarantee indexing or any ranking outcome.

---

## 11. Google Analytics — Event Tracking Plan

| Category | Events |
|---|---|
| Navigation | `page_view` |
| Product | `product_view` |
| Magazine | `magazine_page_view`, `magazine_option_selection` |
| Conversion | `order_cta_click`, `whatsapp_click`, `instagram_click`, `enquiry_started`, `enquiry_submitted` |
| Content | `journal_story_view`, `review_section_view` |

**Funnel**: Visitors → Product View → Order CTA → WhatsApp/Instagram/Form → Qualified Enquiry → Order.

**Primary KPI: qualified enquiries/orders — not raw traffic.** Traffic is a leading indicator worth watching, but it is never the number reported as success on its own (see §23).

---

## 12. UTM Strategy

Kept deliberately simple — three parameters, consistent naming:

- Instagram bio link: `utm_source=instagram&utm_medium=bio&utm_campaign=always_on`
- Instagram Reel: `utm_source=instagram&utm_medium=social&utm_campaign=<reel_name>`
- Creator/collab post: `utm_source=creator&utm_medium=social&utm_campaign=<creator_name>`

Every enquiry stores the UTM values it arrived with (`enquiries.source_utm` in the main blueprint's schema, §17 there) — so the owner can literally see, in the admin enquiries list, which bio link or reel produced which real enquiry, not just which produced traffic.

---

## 13. SEO Foundation — Per-Page

For Home, Products, Custom Magazine, individual products, Bloom Journal index, individual stories, How It Works, FAQ:

- **Title**: unique, human-readable, primary keyword near the front, brand name at the end (e.g., "Custom Photo Magazines, Made From Your Memories — PrintBloom").
- **Meta description**: one genuine, specific sentence about what's on the page — not a keyword list.
- **H1**: one per page, matches the page's actual subject (not the site name).
- **H2 hierarchy**: mirrors the section structure from the main blueprint's page-by-page UX (§7 there) — sections already have clear headings, so this largely falls out of the design rather than needing separate SEO-only headings.
- **Canonical**: self-referencing on every page, respecting the www/non-www decision in §5.
- **Slug**: short, descriptive, kebab-case (`/products/custom-magazine`, `/journal/anniversary-surprise-priya`).
- **Internal links**: every product links to relevant Bloom Journal stories and vice versa; occasion mentions link to the relevant product; FAQ answers link out to the pages they reference.
- **Image alt text**: sourced from the CMS field, descriptive and specific ("Open custom magazine spread showing a couple's anniversary photos on cream matte paper"), not "image1.jpg" or empty.
- **Open Graph**: unique OG title/description/image per page, image drawn from real product photography.
- **Structured data**: Product schema on product pages, FAQ schema on the FAQ page, Breadcrumb schema on nested routes (§29 in the main blueprint already specified this — reiterated here as the launch-time implementation checklist).

---

## 14. Keyword Strategy — Clusters, Not Stuffing

- **Custom Magazine cluster**: custom magazine, personalised magazine, custom magazine gift, personalised magazine gift, custom magazine India, custom birthday magazine, anniversary magazine gift.
- **Occasion cluster**: personalised birthday gifts, anniversary gifts, best friend gifts, long-distance relationship gifts, personalised gifts for parents.
- **Product cluster**: personalised polaroids, custom photo frame, Spotify card gift, personalised newspaper gift.
- **Local cluster** (only where genuinely relevant to how the business actually operates — e.g., if delivery/pickup is regionally focused): personalised gifts Mumbai, personalised gifts Navi Mumbai, custom gifts Mumbai. **[CONFIRM]** whether local terms are worth targeting at all — only relevant if the business meaningfully serves a local/regional audience differently from pan-India shipping.

No programmatic generation of thin location/keyword pages — every page that targets a cluster must independently justify its existence with real content a visitor would want, per the main blueprint's content rule (§31 there).

---

## 15. Bloom Journal as SEO + Brand Engine

Every story is grounded in a real, consented customer order (hard gate already defined in the main blueprint's schema, §17/§20 there — `consent_status = granted` before publish). Structure per story: customer context → occasion → gifting intention → photos/memories → design process → final product → customer reaction → product CTA. This dual-purpose structure (emotional brand content *and* long-tail search surface for occasion-based queries) is why Bloom Journal, not a generic blog, is the long-term content and SEO engine — themes like anniversary surprises, long-distance memories, farewells, and graduations map naturally onto both real customer occasions and real search intent, without inventing either.

---

## 16. 90-Day Content Strategy

**Website**: Bloom Journal stories (from real orders as they happen), FAQ expansion (driven by actual repeated customer questions), behind-the-scenes content (packaging, production), occasion guides only where a genuine cluster of real orders justifies one (not speculative).

**Instagram**: product transformations, before/after, packaging reveals, customer reactions, magazine page reveals, design process, gifting ideas tied to real upcoming occasions (e.g., seasonal), customer stories cross-posted from Bloom Journal.

All content originates from real PrintBloom work — no generic AI-generated filler, matching §30 (What Should Not Be Automated).

---

## 17. Google Image Search Strategy

Meaningful filenames (`custom-magazine-anniversary-spread.jpg`, not `IMG_4021.jpg`), descriptive CMS-sourced alt text, correctly sized/responsive delivery via Cloudinary, images placed in genuinely relevant page context (not decorative filler), a dedicated image sitemap only if the standard sitemap's image annotations prove insufficient in Search Console data. Compression is automatic via Cloudinary's pipeline — product photography quality is never manually degraded to chase a performance score (see §20).

---

## 18. Conversion Optimization

**Primary conversion**: Order/Enquiry submission. **Secondary**: WhatsApp click, Instagram click, form start (without completion — useful diagnostic signal).

Every important product page has exactly one obvious next action — no competing CTAs, no popups, no newsletter prompts, no irrelevant offers layered on top, consistent with the main blueprint's "no five competing CTAs" principle already embedded in its page-by-page UX (§7 there).

---

## 19. Mobile-First Acquisition

Given the Instagram-driven traffic pattern, the first mobile screen is treated as the actual landing experience to design for — not desktop shrunk down (this restates and operationalises §26 of the main blueprint specifically for acquisition traffic): hero loads fast and communicates the offer immediately, CTA visible without scrolling, prices/format options legible at small size, WhatsApp interaction is a single tap, forms are one-handed-usable, sticky CTA bar present on product pages. Tested at actual device widths (375/390/430), not just a resized browser window.

---

## 20. Performance Targets

Optimise for Core Web Vitals — LCP, CLS, INP — plus image size, JS bundle size, font loading, and caching, using Lighthouse/PageSpeed as diagnostic tools rather than a scoreboard to max out. Practical targets (restating and slightly sharpening §28 of the main blueprint for a production gate): LCP < 2.5s, CLS < 0.1, INP < 200ms on a mid-tier mobile connection, Lighthouse Performance ≥ 90 on Home and Custom Magazine. A 100/100 score is not itself a goal — if chasing it means degrading real product photography or removing a genuinely useful (if slightly costly) interaction, the UX wins.

---

## 21. Post-Launch SEO Loop

```
Google Search Console → search queries → identify opportunities
  → improve an existing page  OR  create genuinely useful new content
  → internal linking → measure → repeat
```

Diagnostic examples:
- High impressions, low CTR on a query like "custom anniversary magazine" → the *title/meta/SERP presentation* is the problem, not the content — rewrite those first.
- High clicks, low enquiries → a *conversion/UX* problem on that landing page, not an SEO problem.
- High enquiries, low orders → most likely a *pricing/product/business* issue, not something the website can fix through SEO or UX changes.

This loop is how the site improves after launch — not a one-time SEO setup that's declared "done."

---

## 22. 90-Day Post-Launch Plan

**Days 1–7 — Technical launch**: Search Console verified, sitemap submitted, Analytics firing, indexing checked, performance audit run, full mobile QA pass. *KPI: zero critical indexing/crawl errors, all key pages passing Core Web Vitals targets.*

**Days 8–30 — Content foundation**: first real Bloom Journal stories published from actual orders, product page content finalised with real photography, Instagram → website funnel actively tested (bio link, story links). *KPI: at least a handful of real stories live, Instagram-sourced sessions visible and attributable via UTM.*

**Days 31–60 — SEO optimisation**: first real Search Console query data reviewed, internal linking tightened based on what's actually getting found, title/meta iterated for any high-impression/low-CTR queries, new content created only where real search demand appears. *KPI: measurable movement in impressions/CTR on at least the top few queries; qualified-enquiry rate tracked as the real signal.*

**Days 61–90 — Growth experiments**: creator/collab outreach, more customer stories, occasion-specific pages added only where justified by real order patterns, conversion-path refinements, ongoing performance tuning. *KPI: enquiry-to-order conversion rate trend, repeat-customer signal if visible.*

---

## 23. Monthly Client Report — Template

**Traffic**: total users, organic users, Instagram-sourced users (via UTM), direct users.

**Search**: impressions, clicks, CTR, top queries, top landing pages (from Search Console).

**Conversion**: WhatsApp clicks, Instagram clicks, enquiries submitted, orders (if the owner tracks conversion offline — reported back into the loop manually since payment/order confirmation happens outside the site per §15 of the main blueprint).

**Content**: stories published this period, best-performing pages by engagement.

**Recommendations**: what improved, what declined, what to test next — always tied to the qualified-enquiry KPI, never a vanity-metric readout on its own.

---

## 24. Free-Tier Monitoring

| Resource | Safe zone | Warning zone | Upgrade zone |
|---|---|---|---|
| Supabase DB storage/rows | comfortably under free cap | approaching cap, or repeated slow-query warnings | consistently near/over cap with real usage, not a bug |
| Cloudinary storage/bandwidth | under free cap | 70–90% of cap | consistently over cap from genuine traffic/media volume |
| Hosting bandwidth/build minutes | under free cap | frequent near-cap builds/traffic spikes | sustained overage from real visitor growth |
| Email sends | under monthly cap | approaching cap during a campaign | regularly exceeding cap |

Upgrade only when actual, sustained business usage justifies it — never pre-emptively "just in case." **VERIFY BEFORE PRODUCTION**: exact current caps for each provider, since free-tier limits change over time.

---

## 25. Backup & Recovery

- **Database**: automated provider backups (Supabase) plus an independent scheduled `pg_dump` export stored separately, so recovery doesn't depend entirely on one provider's systems.
- **Product/story/review/FAQ data**: covered by the database backup; additionally exportable as JSON via the admin's export action (defined in the main blueprint, §41 there).
- **Media references**: Cloudinary retains originals; an asset-manifest export lets everything be re-linked even if the database needed restoring from an earlier point.
- **Configuration documentation**: environment variable names (not values), deployment steps, and account structure documented and stored securely (§26).
- **Frequency**: daily automated DB backup (provider default), weekly independent export.
- **Restore procedure**: documented, tested at least once before launch and again after any major schema change — an untested backup is not a real backup.

---

## 26. Client Handover Package

- **Website**: production URL.
- **Admin**: admin URL + first-login credentials (forced password reset on first use).
- **Accounts**: full list of client-owned accounts (domain registrar, hosting, Supabase, Cloudinary, Resend, Search Console, Analytics) with access confirmed under the client's own login.
- **Content documentation**: plain-language how-to for adding a product, changing a price, adding a story, adding a review, editing an FAQ, managing enquiries, replacing images — written for the non-technical owner persona (§37 in the main blueprint), not as developer docs.
- **Technical documentation**: deployment pipeline (§6), environment variables (§7), database structure, media structure, backup/recovery procedure (§25) — written for a future developer, not the owner.

The client should never need the original developer just to change a price or swap a photo.

---

## 27. Cost Breakdown

| | Item | Estimated cost |
|---|---|---|
| **Initial** | Domain registration | ~₹700–1,500/yr depending on TLD/registrar |
| | Hosting (Cloudflare Pages free tier, or Vercel Pro if chosen) | ₹0 or ~$20/mo |
| | Database (Supabase free tier) | ₹0 within free caps |
| | Media (Cloudinary free tier) | ₹0 within free caps |
| | Email (Resend free tier) | ₹0 within free caps |
| | Analytics (Google Analytics) | ₹0 |
| | SSL | ₹0 (provider-managed) |
| **Monthly (steady state, within free caps)** | | **~₹0** |
| **Annual (mandatory)** | Domain renewal | ~₹700–1,500 |
| **Growth-stage** | Any single free-tier cap consistently exceeded by real usage → move that one service to its paid tier | Varies by provider — evaluated individually, not as a blanket upgrade |

No free tier is described here as unlimited or permanent — every line above is contingent on current provider terms (§28) and actual usage staying within them.

---

## 28. Commercial Terms Warning

For every third-party service used in this architecture (Cloudflare Pages, Vercel, Supabase, Cloudinary, Resend, Google Analytics, Google Search Console), current pricing, free-tier limits, commercial-use restrictions, storage/bandwidth caps, inactivity rules, and build/deployment limits must be re-verified at build time against each provider's own current terms page — not assumed from this document, which reflects information as of this writing. Vercel's Hobby-tier commercial-use restriction (§3) is a concrete example of exactly this kind of term that a "free = free" assumption would miss. Anything not independently re-confirmed at build time is marked **VERIFY BEFORE PRODUCTION** throughout this addendum.

---

## 29. Business Growth Flywheel

```
Real customer → product → customer reaction → review
  → Bloom Journal story → Instagram content → Google/search discovery
  → new visitor → new customer → repeat
```

The site's job in this loop is specifically to make steps 3–6 easy for a non-technical owner: reviews and stories go through a simple admin publish flow (§19/§37 in the main blueprint), not a developer-mediated process — so the loop can actually run at the pace real orders happen.

---

## 30. What Should Not Be Automated

No AI-generated customer stories, fake testimonials, automated fake social proof, AI-generated "customer emotion" copy, automatic creative design generation, or unnecessary chatbot/AI assistant bolted onto the site. Technology in this system reduces repetitive administration (form intake, image delivery, content publishing) — it never stands in for the human creative and relational work that is the actual product.

---

## 31. Final Production Gate

**Business**: prices confirmed · delivery policy confirmed · turnaround confirmed · WhatsApp confirmed · Instagram confirmed.

**Content**: real product photos · real reviews · real customer stories · permission collected for every one · no fake content anywhere, including placeholders left live.

**Technical**: production build successful · environment variables configured under client accounts · database connected · media connected · forms tested end-to-end · email tested if used.

**SEO**: titles · meta descriptions · canonicals · sitemap · robots.txt · structured data · alt text · Search Console verified and sitemap submitted.

**Performance**: mobile tested at real device widths · images optimised · Lighthouse/PageSpeed run · Core Web Vitals checked against §20 targets.

**Security**: no secrets in Git · admin protected · RLS/security policies checked against a real unauthenticated-client test · upload validation confirmed · spam protection (honeypot/rate limit) active.

**Launch**: custom domain connected · HTTPS working · www/non-www canonicalised · production URL smoke-tested · analytics confirmed firing on real events, not just page views.

---

## 32. How This Extends the Blueprint

This addendum plugs into the phased roadmap already defined in the main blueprint (§42 there) as the concrete content of **Phase 14 (Deployment)** and **Phase 15 (Launch QA)**, and adds an explicit post-launch phase the original roadmap didn't need to cover: the 90-day plan (§22) and the ongoing SEO loop (§21) as standing operating procedure after Phase 15 closes. No architectural decision from the main blueprint (schema, component structure, admin design, order-form-not-checkout decision) needs to change to support this — the one genuine correction is the hosting recommendation in §3, made specifically to keep the "₹0 recurring cost" goal from silently becoming a Terms-of-Service violation.

Throughout: no promised traffic, no promised rankings, no promised revenue, no fake content, no unnecessary automation of the human parts of the business — the site is a foundation to measure and improve from, not a guarantee of outcomes.
