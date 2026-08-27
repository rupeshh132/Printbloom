# PRINTBLOOM — PRODUCTION BLUEPRINT

*Personalised gifting & memory-preservation brand. Hero product: Custom Magazines.*

> Items marked **[CONFIRM]** are business facts pulled from the brief that must be verified before launch — prices, delivery promises, timelines, policies. Nothing marked this way should be hard-coded as final copy without owner sign-off.

---

## 1. Executive Summary

PrintBloom is not a marketplace — it's a part-time, founder-run gifting studio whose real sales engine is Instagram DMs. The website's job is narrow and specific: **make the emotional case for the product, prove it's real through actual customer work, and get a qualified enquiry into WhatsApp/Instagram with less back-and-forth than a cold DM.** Every architectural and design decision in this blueprint is subordinate to that job — not to "look impressive as a web app."

Two failure modes to actively design against:
1. **Generic SaaS/AI aesthetic** — kills the "handmade, personal" promise the product is actually selling.
2. **Overbuilt commerce platform** — a full cart/checkout/payment system is effort spent where the business doesn't need it yet, and adds a maintenance burden a non-technical solo owner can't carry.

The site is essentially an **editorial magazine about a magazine business** with a lightweight enquiry funnel and a small CMS bolted on.

---

## 2. Business Analysis

- **Model**: made-to-order, personalised physical (and softcopy) print products, produced after a manual design/approval cycle.
- **Constraint**: one owner, part-time, non-technical → admin must be trivially simple, and V1 must avoid operational complexity (inventory systems, live chat, payment reconciliation) that has no one to run it.
- **Current channel**: Instagram DMs handle discovery, negotiation, and support. The website should *feed* that channel qualified leads, not compete with it.
- **Trust deficit to solve**: personalised/pre-paid gifting from a DM-based small business is a category people are cautious about (has this business shipped real things, will the design come out well, is this a real seller). The site's core conversion currency is **proof**, not persuasion copy.

**WHY**: This reframes "website" away from "storefront" and toward "trust + inspiration engine that shortens the DM conversation." It changes what "done" means for almost every later decision (see §15 order system).

---

## 3. User Personas

**1. The Gifter (primary)** — buying for someone else (partner, parent, best friend, long-distance friend). Emotionally driven, browsing on Instagram/mobile, wants to see *finished* examples before trusting a stranger with photos and money. Time-pressured around an occasion date.

**2. The Self-Documenter** — building a magazine/keepsake of their own year, trip, relationship. More deliberate, will read the "how it works" and FAQ before ordering, cares about paper quality and page count.

**3. The Repeat/Referred Customer** — already trusts the brand (friend recommended, or ordered before). Wants the fastest possible path to "place another order," doesn't need convincing, needs an efficient form.

**WHY personas matter here**: they justify why the homepage leads with emotion+proof (Persona 1/2) while the order form must also support a "I know what I want" fast path (Persona 3) — see §16.

---

## 4. Customer Journey

**Emotion → Trust → Inspiration → Product → Simple Order**, mapped to page-level responsibility:

| Stage | Job | Primary page(s) |
|---|---|---|
| Emotion | Make them feel the gift, not the feature | Home hero, Bloom Journal |
| Trust | Prove it's real | Reviews, Behind-the-Scenes, Bloom Journal |
| Inspiration | Show what's possible for *their* occasion | Shop by Occasion, Bloom Journal, Product galleries |
| Product | Explain the specific thing clearly | Products, Custom Magazine |
| Simple Order | Convert with minimum friction | Order form → WhatsApp/Instagram handoff |

A visitor arriving from an Instagram story ad should be able to go hero → proof → product → enquiry in under four screens on mobile.

---

## 5. Information Architecture

Flat, shallow IA — no nested category trees. Everything reachable in ≤2 clicks from home.

```
/                      Home
/products               Product catalogue
/products/custom-magazine   Custom Magazine (hero product page)
/journal                    Bloom Journal index
/journal/[slug]              Individual story
/reviews
/how-it-works
/faq
/order                       Contact / Order enquiry
/privacy
/terms
/404
/admin/*                     Owner-only CMS
```

**WHY flat**: with ~10 products and a part-time owner, deep categorisation (e.g. `/products/photo-gifts/frames/`) adds maintenance cost and SEO fragmentation with no discovery benefit at this catalogue size.

---

## 6. Sitemap & Routes

| Route | Purpose | Auth |
|---|---|---|
| `/` | Home | public |
| `/products` | Catalogue grid | public |
| `/products/[slug]` | Individual product (custom-magazine gets a bespoke template; others use a shared template) | public |
| `/journal` | Story index | public |
| `/journal/[slug]` | Story detail | public |
| `/reviews` | Review wall | public |
| `/how-it-works` | Process explainer | public |
| `/faq` | FAQ accordion | public |
| `/order` | Enquiry form | public |
| `/privacy`, `/terms` | Legal | public |
| `/admin` | Dashboard | authenticated |
| `/admin/products`, `/stories`, `/reviews`, `/faqs`, `/enquiries`, `/media`, `/settings` | CMS sections | authenticated |

---

## 7. Page-by-Page UX Blueprint

### Home
Ten-section emotional arc exactly as specced in the brief (Hero → Signature Product → Memory/Transformation → Shop by Occasion → Bloom Journal → Customer Reactions → Reviews → Behind the Scenes → Why PrintBloom → Final CTA). Each section gets a **distinct composition** (full-bleed image, asymmetric split, horizontal scroll strip, editorial masonry) — no repeating "image-heading-paragraph-button" card pattern back to back. Copy uses the brief's actual headline ("Turn your favorite memories into gifts they'll never forget") verbatim — do not "improve" it into generic marketing language.

### Products
Visual catalogue — large image-led entries, one-line emotional benefit (not a feature list), starting price, "View Details." Custom Magazine entry is visually larger/first. No price table; no generic 3-up feature-icon rows.

### Custom Magazine
The conversion workhorse. Hero → format/page/price selection (display only in V1, not an interactive add-to-cart — see §15) → what's included → inspiration gallery → how template selection works → content submission explainer → revision policy → final approval step → CTA. This page should read like a well-designed product spec sheet crossed with a magazine spread, not a SaaS pricing page.

### Bloom Journal (index + story)
Editorial magazine-style index (not a blog list with dates/tags). Each entry: real image, title, one-line teaser framed around the *person/occasion*, "Read Story →." Story page: title, occasion, product used, the human context, photos, the "reveal," optional reaction, CTA. Consent state per story lives in admin (§18, §20) — a story cannot be published without it.

### Reviews
Visual-first wall (screenshots, short videos, text), not a generic 5-star widget. Every entry carries a stored permission/source reference in admin.

### How It Works
The 10-step order workflow (§14) as a clear linear explainer — this page exists specifically to reduce "how does this even work" DMs.

### FAQ
Accordion built from the brief's actual question list (§35). Any answer touching timelines/policy not yet confirmed by the owner is marked **[CONFIRM]** in the CMS and rendered with a neutral phrasing until resolved, never a fabricated number.

### Order / Contact
Single form (§16), ends in a WhatsApp/Instagram handoff, not a payment flow.

### Privacy / Terms
Plain-language versions covering photo/content handling per §20 — required given the site collects personal photos and stories.

### 404
On-brand, not a default framework page — reinforces "human-made" even in an edge case.

---

## 8. Visual Art Direction

Reference points: a well-shot independent print studio's Instagram grid, an indie magazine's website, a boutique stationery brand — **not** Dribbble "AI SaaS landing page" shots. Concretely: large uncropped or intentionally cropped photography carries most sections; typography does the persuading, not icon rows or gradient panels; layouts are asymmetric and vary section-to-section; borders are thin/rectangular rather than soft-shadowed rounded cards, echoing the physical, printed nature of the product itself.

**WHY**: the product being sold is *print*, tangible and crafted. A glassy, gradient, rounded-everything UI actively contradicts the product's own material language. The UI should feel like paper and ink, not glass and gradient.

---

## 9. Humanised Design System — Principles

1. No section template is reused twice in a row.
2. Every image is a real product/customer photo — no stock, no AI-generated imagery where real photography exists (placeholder-tagged otherwise, see §31).
3. Icons are functional only (menu, close, arrow, chevron, Instagram, WhatsApp) — nothing decorative.
4. Border-radius, shadow, and gradient usage is deliberately restrained and defined once in tokens (§25), not per-component improvisation.
5. Copy is written the way the owner would actually talk to a customer — warm, specific, no "unlock/elevate/transform."

---

## 10. Typography

- **Display / headlines**: Fraunces (editorial serif, has real personality/warmth without being a generic display serif like Playfair, which is now itself a common "premium AI site" default). Use 2–3 weights only (Light, Regular/Medium, and an italic cut for emotional pull-quotes/teasers).
- **Body**: Public Sans — clean, highly legible at small sizes, doesn't compete with Fraunces.
- **Utility/metadata** (prices, specs, page numbers): a restrained mono (e.g., IBM Plex Mono) used sparingly — reinforces the "print spec sheet" feel for pricing/format info specifically.

Scale (desktop / tablet / mobile), using a ~1.25 modular ratio anchored at 16px body:

| Token | Desktop | Tablet | Mobile |
|---|---|---|---|
| Display XL (hero) | 72px / 1.05 | 52px / 1.05 | 36px / 1.1 |
| Display L (section headline) | 48px / 1.1 | 36px / 1.1 | 28px / 1.15 |
| Display M | 32px / 1.15 | 28px / 1.15 | 24px / 1.2 |
| Body L | 20px / 1.5 | 18px / 1.5 | 17px / 1.5 |
| Body | 16px / 1.6 | 16px / 1.6 | 15px / 1.6 |
| Caption/meta (mono) | 13px / 1.4, tracked +0.02em | same | same |

Letter-spacing: tight (−0.01 to −0.02em) on display sizes for editorial density; neutral on body.

---

## 11. Color System

Warm, paper-based, restrained accent — matches the design-system note already on file (warm ivory / slate navy / terracotta):

| Token | Value (approx) | Use |
|---|---|---|
| `bg` | #FBF6EE (warm ivory) | page background |
| `surface` | #F4ECDD | cards/panels, slightly deeper than bg |
| `text` | #221F1C (near-black, warm) | primary text |
| `text-muted` | #6B6259 | secondary text |
| `border` | #E4D9C6 | hairline rules |
| `accent` | #C1502E (terracotta) | CTAs, links, emphasis |
| `accent-hover` | #A5411F | hover/active state |
| `ink` | #2B2A28 (slate navy — repositioned as an ink/near-black) | headings on light surfaces, or reversed sections |
| `success` | #4B6B4F | form success |
| `error` | #A5322A | form error |
| `warning` | #B57C2E | confirm-pending badges in admin |

No blue/purple hues anywhere — deliberately excludes the default "AI SaaS" palette.

---

## 12. Iconography

Icon set limited to: menu, close, arrow (multiple directions), chevron, Instagram, WhatsApp. Sourced as a single consistent line-icon set (one weight, one stroke width) rather than mixing packs. No icons for FAQ bullets, feature lists, or trust badges — those use typography and layout instead.

---

## 13. Motion System

- Image reveal: subtle clip/fade on scroll into view (200–350ms, ease-out), once per element.
- Hover: gentle image scale (1.0 → 1.03) on product/story cards; underline-slide on text links.
- Page/section transitions: none flashy — simple opacity/translate-Y entrance, staggered slightly for editorial rhythm.
- Explicitly excluded: parallax, animated gradients, autoplay video/audio, cursor-follow effects, bouncing CTAs.
- All motion gated behind `prefers-reduced-motion: reduce` → falls back to instant state changes.

---

## 14. Order Workflow (site-communicated)

Discover → Choose product → Order/pay **[CONFIRM: payment method/timing]** → Template selection → Content submission → Design → Customer approval → Production → Dispatch → Review.

This sequence is rendered as the "How It Works" page content and reused in condensed form on the Custom Magazine page.

---

## 15. Order System — V1 Decision

**Decision: no cart, no checkout, no online payment integration in V1.** The order form (§16) collects structured intent, then hands the customer to WhatsApp/Instagram to actually transact, exactly matching current behaviour.

**WHY**: Building payment + cart + inventory state machinery for a single-owner, made-to-order, DM-fulfilled business would (a) require reconciliation and refund handling nobody is staffed to run, (b) not remove any manual step — design/approval still has to happen in conversation — and (c) add a large attack surface (payments, PII) for close to zero conversion benefit over "structured form → WhatsApp." The form's entire value is replacing the *first, repetitive* DM ("what sizes do you have, how much is it") with something the customer fills out once. See §41 Future Upgrade Path for when this should change.

---

## 16. Order Form

Single-page form, no multi-step wizard (keeps it usable from a phone in one sitting).

**General fields**: Name, Instagram/WhatsApp handle, Product, Product options, Occasion, Required-by date, Quantity, City, Pincode, Notes, Preferred contact method (WhatsApp/Instagram/Email).

**Magazine-specific (conditionally shown when Product = Custom Magazine)**: Format (A4/A5/Softcopy), Page count, Occasion, Deadline, Inspiration/template preference (free text + optional link field for a Pinterest board URL).

Explicitly **not** collected at this stage: bulk photo uploads. Content submission happens post-enquiry through a dedicated, permissioned upload flow (§19) — keeps the form fast and avoids handling large unauthenticated uploads publicly.

Submission → validated + rate-limited server-side (§21) → stored as an `enquiry` row → owner notified (email via Resend, §22) → customer sees a confirmation screen with a direct WhatsApp deep-link pre-filled with a summary of what they just submitted, so the handoff carries context instead of starting cold.

---

## 17. Database Schema

PostgreSQL via Supabase. Kept intentionally simple — no premature normalization beyond what these entities need.

```
products
  id (pk), slug (unique), name, tagline, description,
  starting_price_label, is_hero (bool), sort_order,
  status (draft|published), created_at, updated_at

product_variants
  id (pk), product_id (fk→products), label (e.g. "A5 / 12 pages"),
  price, sort_order

product_images
  id (pk), product_id (fk→products), media_asset_id (fk→media_assets),
  alt_text, sort_order, is_cover (bool)

occasions
  id (pk), slug, name, cover_media_id (fk→media_assets), sort_order

stories
  id (pk), slug (unique), title, teaser, body (rich text/markdown),
  product_id (fk→products, nullable), occasion_id (fk→occasions, nullable),
  consent_status (pending|granted|anonymised), status (draft|published),
  published_at, sort_order

story_images
  id (pk), story_id (fk→stories), media_asset_id (fk→media_assets),
  alt_text, sort_order

reviews
  id (pk), source_type (text|screenshot|video), content,
  media_asset_id (fk→media_assets, nullable), customer_name_display,
  consent_status (pending|granted|anonymised), status (draft|published),
  sort_order

faqs
  id (pk), question, answer, needs_confirmation (bool), sort_order, status

enquiries
  id (pk), name, contact_handle, preferred_contact, city, pincode,
  occasion, required_by, notes, source_utm, status (new|contacted|converted|closed),
  created_at

enquiry_items
  id (pk), enquiry_id (fk→enquiries), product_id (fk→products),
  variant_label, quantity, options_json (format/pages/inspiration/etc.)

admin_users
  id (pk), email (unique), role (owner|editor), created_at

media_assets
  id (pk), cloudinary_public_id, kind (image|video), width, height,
  alt_text_default, is_private (bool), uploaded_by, created_at

site_settings
  id (pk), key (unique), value_json
```

All content tables carry `status` (draft/published) and `sort_order` so the admin can stage and reorder without code changes. `consent_status` on stories/reviews is a hard gate (§20) — the publish query must never surface `pending`.

---

## 18. API Architecture

Server-rendered where possible (Next.js route handlers / server components) to minimise client-side surface:

- `GET /api/products`, `/api/products/[slug]` — public read, cached
- `GET /api/stories`, `/api/stories/[slug]` — public read, filters out non-`granted` consent
- `GET /api/reviews`, `/api/faqs` — public read
- `POST /api/enquiries` — public write, rate-limited + honeypot + server-side validation (Zod schema mirrored client/server)
- `POST /api/uploads/request-link` — generates a scoped, time-limited upload link tied to an enquiry (§19), sent manually by owner or auto-emailed post-enquiry
- Admin CRUD endpoints under `/api/admin/*` — all require an authenticated Supabase session with `role IN (owner, editor)`, enforced by RLS as well as route-level checks (defense in depth)

**WHY server-rendered public reads**: content changes rarely (owner edits a handful of times a week), so static/ISR generation with revalidation keeps performance high and avoids exposing the database to unauthenticated client-side queries.

---

## 19. Admin Architecture

Sections: Dashboard (recent enquiries, quick stats), Products, Stories, Reviews, FAQs, Enquiries, Media, Settings.

Every editable list uses the same pattern: table view with status badges → click to open a form → Save as Draft / Publish. Image replacement is drag-and-drop directly into Cloudinary via a signed upload widget — no manual URL handling. Enquiries view is essentially a lightweight CRM: list, status dropdown (new/contacted/converted/closed), and a note field, since there's no separate CRM tool.

Photo/content submission after an order: a scoped upload link (`/upload/[token]`), token tied to one `enquiry_item`, expires after a set window, uploads go to a **private** Cloudinary folder until the owner explicitly attaches/publishes any of it to a story.

**WHY a token link instead of an account system**: the customer only ever needs to submit once per order; building customer login/accounts is unnecessary complexity for a one-time interaction and directly contradicts the "avoid overbuilding" principle in §15.

---

## 20. Privacy Architecture

- Explicit consent checkbox required before any customer photo/story/review is eligible for publish (`consent_status`), separate from the general order form.
- Anonymisation option: display name can be replaced with initials/first-name-only at customer's request, stored as `consent_status = anonymised`.
- Private uploads (via §19 token links) default `media_assets.is_private = true` and are never served through a public gallery query.
- Retention: private customer uploads are deleted or archived out of active storage after order completion + a defined window **[CONFIRM: retention period]**; nothing is kept "just in case" indefinitely.
- No customer upload URLs are ever exposed in public HTML/JSON — public pages only ever reference `media_assets` rows explicitly marked public and attached to a published story/review.

---

## 21. Security Architecture

- All secrets (Supabase service role key, Cloudinary API secret, Resend key, admin session secret) server-side only, via environment variables — never shipped to the client bundle (see §23 for the split).
- Server-side validation (Zod or equivalent) on every write endpoint, mirrored but not trusted from client-side validation.
- Input sanitisation on all rich-text/story content before storage and before render (to prevent stored XSS in admin-authored content, which is still an attack surface if the admin account is compromised).
- Enquiry form: honeypot field + basic rate limiting (per-IP) + a lightweight challenge if abuse is observed (avoid a heavy CAPTCHA by default — it hurts a persona-1 mobile user's conversion; add only if spam becomes a real problem).
- Upload validation: MIME-type allowlist (image/jpeg, image/png, image/webp, video/mp4 within a size cap), file-size limits enforced both client-side (UX) and server-side (actual gate).
- Admin authentication via Supabase Auth (email/password or magic link); RBAC via a `role` column checked in RLS policies and route handlers.
- Supabase Row-Level Security: public role can `select` only rows with `status = published` (and `consent_status != pending` for stories/reviews); all writes require the authenticated admin role.
- Secure, `httpOnly`, `SameSite=Lax` cookies for the admin session; CSRF protection on state-changing admin routes.
- Safe error messages to the client (no stack traces/DB errors surfaced); structured server-side logging for actual debugging.

---

## 22. Tech Stack

- **Frontend**: Next.js (React), server components/ISR for public content.
- **Styling**: Tailwind CSS used strictly as a utility layer over custom design tokens defined in `tailwind.config` (§25) — no reliance on Tailwind's default palette, spacing, or rounding scale.
- **Backend/data**: Supabase (Postgres + Auth + RLS).
- **Media**: Cloudinary (transformations, responsive delivery, private-folder support).
- **Email**: Resend, for enquiry notifications to the owner and confirmation emails to customers.
- **Deployment**: Vercel (Next.js-native, generous free tier for this traffic scale) + Supabase free tier + Cloudinary free tier.

**WHY this stack**: every piece has a genuinely free tier suitable for a low-to-moderate-traffic brand site, all integrate natively with Next.js, and none require the owner to run/maintain a server.

---

## 23. Environment Variables

`.env.example`:

```
# Public (safe to expose client-side — must be prefixed per framework convention)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_SITE_URL=

# Server-only — NEVER exposed to the client bundle
SUPABASE_SERVICE_ROLE_KEY=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RESEND_API_KEY=
ADMIN_SESSION_SECRET=
UPLOAD_TOKEN_SECRET=
```

The anon Supabase key is safe client-side *because* RLS enforces the actual access boundary (§21) — it is not, by itself, a secret that grants write access.

---

## 24. Component Architecture

Layout, Header, MobileNavigation, Footer, Button, Link, SectionHeading, ProductDisplay, ProductCard, ProductGallery, PriceBlock, OccasionNavigation, StoryPreview, ReviewBlock, FAQAccordion, OrderForm, WhatsAppCTA, InstagramCTA, ImageGallery, Modal, Toast, AdminTable, AdminForm.

Each exists to solve a *repeated* layout problem (product shown in ≥3 places, review shown in ≥2, etc.). One-off homepage sections (e.g., "Behind the Scenes" packaging sequence) are built as page-specific compositions, not generalised components — forcing them into a reusable shape is exactly the kind of over-componentisation that produces the generic "assembled from components" look this brief is explicitly rejecting (§4).

---

## 25. Design System — Tokens

- **Spacing scale**: 4px base — 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Radius**: two values only — `0px` (default, rectangular/editorial) and `2px` (minimal softening on interactive controls like inputs/buttons). No `rounded-2xl` anywhere.
- **Borders**: 1px hairline in `border` token; used instead of shadows to separate content where possible.
- **Shadows**: one restrained elevation token for modals/toasts only (`0 8px 24px rgba(0,0,0,0.08)`) — not used on cards.
- **Container widths**: 1280px max content width; a wider 1440px "bleed" width for full-image sections.
- **Grid**: 12-column on desktop, 6 on tablet, 4 on mobile; gutters 24/16/16px.
- **Breakpoints**: 375, 640, 768, 1024, 1280, 1536.
- **Buttons**: rectangular, generous horizontal padding (24–32px), 1px border or solid fill in `accent`, no pill shape.
- **Image ratios**: defined per context (hero 16:9 or 4:5 portrait for product close-ups, gallery 1:1 or 4:5) — not forced into a single uniform card ratio everywhere, to preserve editorial variety.

---

## 26. Responsive Strategy

Mobile-first build order, explicitly designed (not shrunk) at 320/375/390/430/tablet/laptop/large-desktop. Mobile navigation: simple full-screen overlay menu, not a slide-out drawer with icons. Sticky mobile CTA bar on product pages ("Create My Magazine" / WhatsApp) so the conversion action is always one tap away without hunting. Forms use full-width single-column fields with large touch targets (min 44px height). No horizontal scroll on any core content; horizontal scroll is used *only* deliberately for gallery/story strips.

---

## 27. Accessibility

Semantic landmarks (`header`, `nav`, `main`, `footer`), full keyboard operability including the mobile menu and FAQ accordion, visible focus states styled in `accent` (not just a default browser outline), descriptive `alt` text sourced from `media_assets.alt_text_default`/`alt_text` fields (never empty on content images), form fields with associated labels and inline error text tied via `aria-describedby`, reduced-motion fallback (§13), and colour contrast checked against the palette in §11 (terracotta-on-ivory and ink-on-ivory both verified to meet AA for body text sizes).

---

## 28. Performance

Given this is an image-heavy site: all images served through Cloudinary's responsive/auto-format pipeline (AVIF/WebP with JPEG fallback), explicit width/height to prevent layout shift, lazy-loading below the fold, hero image preloaded. Fonts (Fraunces, Public Sans) self-hosted or loaded via `font-display: swap` with only the weights actually used. Minimal client JS — most pages are server-rendered with islands of interactivity (form, accordion, gallery lightbox) rather than a fully client-rendered app. No animation library beyond CSS transitions/`Intersection Observer` for scroll-reveal — avoids shipping a heavy motion package for effects that are intentionally subtle anyway.

Practical target: Lighthouse Performance ≥ 90 on mobile for the homepage and Custom Magazine page, LCP < 2.5s on a mid-tier mobile connection.

---

## 29. SEO

Unique titles/meta descriptions per page and per product/story, canonical URLs, Open Graph + Twitter card images (using real product photography), `sitemap.xml` and `robots.txt`, Product schema on product pages, FAQ schema on the FAQ page, Breadcrumb schema on nested routes, descriptive (non-keyword-stuffed) alt text reused from the CMS field. Natural target phrases: custom magazines, personalised gifts, custom gifts in India, personalised magazine gifts, memory gifts — worked into headings/copy naturally, not stuffed.

---

## 30. Analytics

Track: page views, product views, Custom Magazine page views specifically, Order CTA clicks, WhatsApp clicks, Instagram clicks, form submissions (with UTM/source), top landing pages. A simple privacy-respecting analytics tool (e.g., Plausible/Vercel Analytics) is preferable to a heavy tag-manager stack given the site's scale and the privacy commitments in §20. **Primary KPI: qualified enquiries/orders, not raw traffic.**

---

## 31. Content Rule & Replacement Checklist

No fabricated reviews, stories, customer names, statistics, or reaction screenshots — ever, including in development. Development/staging uses clearly watermarked placeholder images where real photography isn't yet available.

**Pre-launch content-replacement checklist**:
- [ ] All placeholder product photography replaced with real shots
- [ ] All placeholder Bloom Journal stories replaced with real, consented stories
- [ ] All reviews are real, with permission state recorded in admin
- [ ] All prices marked **[CONFIRM]** signed off by owner
- [ ] Delivery/turnaround copy signed off by owner
- [ ] FAQ answers with `needs_confirmation = true` resolved

---

## 32. Microcopy Guidelines

Write the way the owner would actually message a customer back — warm, specific, concrete. Concrete example pairs:

- Not: "Unlock your memories." → Instead: "Turn your favorite memories into gifts they'll never forget." (brief's actual line)
- Not: "Elevate your gifting experience." → Instead: "Custom magazines, photo frames, polaroids and more — designed from your photos and stories."
- Not: "Where creativity meets innovation." → Instead: a specific sentence about what actually happens (e.g., "You send the photos and the story. We turn it into pages you can hold.")

Every piece of homepage/product copy should pass a simple test: *would this sentence still make sense if the owner said it out loud to a customer in a DM?*

---

## 33. Bloom Journal — Editorial Structure

Index is a magazine-style grid (not a dated blog list) of 3–6+ featured stories, each carrying a real image, title, and person/occasion-framed teaser. Story template: title, occasion, product used, the human context (who, why), photos, the "reveal" of the finished product, an optional real reaction, and a soft CTA into the relevant product page. Publishing a story is gated by `consent_status = granted` (§17, §20) — there is no code path that lets a `pending` story appear publicly.

---

## 34. Reviews System

Supports text, screenshot, and video/unboxing/reaction sources, each carrying its own `source_type` and a required `consent_status`. Admin moderation queue defaults new reviews to `draft`/`pending` — nothing goes live without an explicit publish action from the owner.

---

## 35. FAQ

Seeded from the brief's actual question list (how do I order, can I customise the magazine, Pinterest references, specific-page photo requests, template swaps, when does design start, how long does it take, are delivery charges included, will I see the design before printing, what happens after dispatch). Any answer touching timelines/pricing/policy that isn't finalised is stored with `needs_confirmation = true` and rendered with a clearly bounded, non-committal phrasing until the owner resolves it in admin — never a fabricated number or promise.

---

## 36. Error States

Custom, on-brand versions (not framework defaults) for: 404, empty product catalogue, unavailable/discontinued product, failed form submission (inline, with a retry + a WhatsApp fallback link so a lead is never fully lost), network error, image load failure (graceful placeholder), upload failure (clear reason: too large / wrong type / expired link), invalid form (inline field-level messaging), admin unauthorized (redirect to login, no information leakage), and a generic server error page.

**WHY the WhatsApp fallback on form failure specifically**: given the entire funnel exists to reduce DM friction, a broken form should never be a dead end — it should degrade to exactly the channel it was trying to reduce reliance on.

---

## 37. Admin UX

Built for a non-technical owner: plain-language labels (not "CRUD," "slug," "publish state" in the UI — use "Save as Draft" / "Make Live"), obvious primary actions, a preview button before publishing anything customer-facing, drag-and-drop image replacement, inline price editing on product variants, and a simple status board for enquiries. No technical jargon surfaces in the admin UI even though the underlying schema (§17) uses it.

---

## 38. Testing Strategy

- **Functional**: form submission (success/failure/spam paths), navigation, all CTAs, WhatsApp/Instagram deep links, admin CRUD across every content type, media upload/replace flow.
- **Responsive**: 320–1536px breakpoint sweep, explicit checks at the mobile sizes in §26.
- **Browser**: latest Chrome, Safari (incl. iOS Safari, given Instagram-referred mobile traffic), Firefox, Edge.
- **Accessibility**: keyboard-only pass, screen-reader spot check (VoiceOver/NVDA) on nav/forms/accordion, contrast audit against §11 tokens, focus-order review.
- **Performance**: Lighthouse + Core Web Vitals on Home, Products, Custom Magazine, Journal story.
- **Security**: admin auth/session handling, RLS policy verification (attempt unauthorized reads/writes directly against Supabase), input validation/XSS attempts on form and rich-text fields, upload MIME/size enforcement, rate-limit behaviour.
- **SEO**: metadata presence per page, sitemap/robots validity, structured data validation, Open Graph preview check.

---

## 39. Deployment Blueprint

1. Git repository (GitHub), protected `main` branch.
2. Environment variables configured in Vercel project settings (never committed) per §23.
3. Supabase project provisioned; schema (§17) applied via migrations.
4. Cloudinary account configured with folder structure (`/products`, `/stories`, `/reviews`, `/uploads/private/[token]`) and upload presets.
5. Resend domain verification for transactional email.
6. Vercel deployment connected to the repo, preview deployments per PR, production deployment on `main`.
7. Custom domain configured with HTTPS (automatic via Vercel).
8. Production environment variables set separately from preview/dev.
9. Database migrations run through Supabase CLI as part of the deploy step, not manually against production.
10. Backup strategy per §40.
11. Rollback: Vercel's instant rollback to a previous deployment; database migrations written to be reversible where practical.
12. Monitoring: Vercel's built-in logs/analytics plus Supabase's dashboard for DB health.
13. Analytics tool (§30) wired in at launch, not added later.

---

## 40. Free-Tier Cost Strategy

Target **₹0 recurring infrastructure** at MVP scale using Vercel/Supabase/Cloudinary/Resend free tiers — all four comfortably cover a low-to-moderate-traffic brand site. Unavoidable costs regardless of provider: **custom domain registration** (recurring, small, unavoidable), and **any future payment gateway fees** if/when online payment is added (§41). This is explicitly not "free forever" — if traffic, storage, or email volume exceeds free-tier quotas, or if commercial usage terms require a paid plan for business use on a given provider, that upgrade path should be budgeted for, not assumed away.

---

## 41. Backup & Recovery

- **Database**: rely on Supabase's automated daily backups on the plan in use; additionally, a scheduled logical export (`pg_dump`) to a low-cost/free storage location on a regular cadence as an independent copy not tied to the primary provider.
- **Media**: Cloudinary retains originals; periodic export of the asset manifest (not necessarily the binaries) so assets are re-linkable if needed.
- **Content export**: admin includes a simple "export all content as JSON" action so the owner isn't fully dependent on database access to retain a copy of products/stories/reviews/FAQs.
- **Admin recovery**: a documented, secure process for resetting/recovering admin access (Supabase Auth password reset flow) without needing developer involvement for routine cases.

---

## 42. Development Phases

| Phase | Objective | Key deliverables | Acceptance criteria |
|---|---|---|---|
| 0 | Foundation | Repo, Next.js scaffold, Tailwind + tokens, env setup | Project boots, tokens applied, deployed "coming soon" |
| 1 | Design system | Typography, colour, spacing, base components (Button, SectionHeading, etc.) implemented in a style guide route | All tokens from §10–§13, §25 implemented and visually reviewed |
| 2 | Home | All 10 homepage sections built with real/placeholder content | Matches §7 structure, passes responsive + motion review |
| 3 | Products | Catalogue grid + shared product template | All non-magazine products browsable |
| 4 | Custom Magazine | Bespoke hero product page | All §13 (Custom Magazine page) sections present |
| 5 | Bloom Journal | Index + story template + consent gating | Only `granted` stories render publicly |
| 6 | Reviews / FAQ / How It Works | Remaining content pages | Content sourced from schema, not hard-coded |
| 7 | Order form | Full enquiry form + WhatsApp handoff | Submits to `enquiries`, validated, rate-limited |
| 8 | Supabase | Schema, RLS, auth wired end-to-end | All public reads/writes respect RLS |
| 9 | Admin | Full CMS per §19/§37 | Owner can edit every content type without code |
| 10 | Media | Cloudinary integration, upload flows, private token links | Upload validated per §21, private assets never public |
| 11 | SEO / Analytics | Metadata, schema.org, sitemap, analytics wired | Lighthouse SEO ≥ 95, structured data validates |
| 12 | Security | Full pass against §21 checklist | No secrets in client bundle, RLS verified |
| 13 | Testing | Full pass against §38 | All test categories signed off |
| 14 | Deployment | Production environment live | §39 steps complete |
| 15 | Launch QA | Final content-replacement + launch checklist pass | §31 and §44 checklists fully checked |

---

## 43. Git Strategy

- Repository structure: standard Next.js app router layout with `/app`, `/components`, `/lib`, `/db` (schema/migrations), `/content` (seed/config), `/tests`.
- Branching: `main` (production) + short-lived feature branches per phase/task, merged via PR.
- Commit convention: Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`) for a clean, scannable history given a small solo/small-team repo.
- `.env*` files gitignored everywhere; `.env.example` committed as the only tracked reference.
- Migrations tracked as versioned SQL files under `/db/migrations`, applied via Supabase CLI in CI/deploy, never hand-applied to production.

---

## 44. Project Structure

```
/app                 routes (app router)
  /(marketing)        public pages
  /admin               admin routes
  /api                 route handlers
/components
  /ui                  primitive components (Button, Link, etc.)
  /marketing           page-section components
  /admin               admin-only components
/design-system         tokens, tailwind config extensions
/lib                    supabase client, cloudinary client, resend client, validation schemas
/db
  /migrations
  /seed
/types
/hooks
/tests
```

---

## 45. Final Launch Checklist

**Business**: prices confirmed · delivery policy confirmed · turnaround confirmed · product specs confirmed · WhatsApp number confirmed · Instagram handle confirmed.

**Content**: real images throughout · real stories with consent · real reviews with permission recorded · alt text present on all content images.

**Technical**: production build passes · all env vars set in production · database migrated · media pipeline verified · forms tested end-to-end · transactional emails sending · analytics firing.

**Security**: no secrets in client bundle · RLS policies verified · upload validation confirmed · rate limiting active.

**Performance**: images optimised · full mobile pass complete · Lighthouse targets met.

**SEO**: metadata complete · sitemap live · robots.txt correct · Open Graph verified · structured data validates.

**UX**: mobile reviewed end-to-end · navigation clear · every CTA functional · forms usable one-handed · all error states designed (not default).

**Deployment**: domain live with HTTPS · production environment isolated from preview/dev · backup process verified · rollback tested at least once before go-live.

---

## 46. Acceptance Criteria

The build is production-ready only when it: reads as a genuine PrintBloom brand property rather than a template; carries no visible AI-generated-site tells; leads with real product photography; makes the Custom Magazine the unmistakable hero; communicates the customer journey within seconds of landing; keeps ordering simple (form → WhatsApp, not a checkout); performs well on mobile specifically; lets the owner maintain products/stories/reviews/FAQs without touching code; protects customer photos/stories behind explicit consent; has reliable forms; meets SEO/performance/accessibility basics; has designed (not default) error states; ships with a documented deployment and backup process; and does so on an architecture that can absorb heavier commerce features later (§47) without a rewrite.

---

## 47. Future Upgrade Path

Designed-in extension points, not built now:

- **Online payment**: `enquiries`/`enquiry_items` already model an order-like shape; adding a payment step later means inserting a payment/status flow on top of existing tables rather than re-architecting.
- **Customer accounts**: the token-link upload pattern (§19) can evolve into a lightweight magic-link "order status" view without requiring full account infrastructure first.
- **Broader catalogue/inventory**: `product_variants` already separates option/price from product, so SKU-level inventory could be layered in without restructuring.
- **Multi-admin/editor roles**: `admin_users.role` is already an enum, ready for more granular permissions if a second person joins the business.

This keeps V1 deliberately lean per §15 while ensuring today's simplicity doesn't become tomorrow's rewrite.
