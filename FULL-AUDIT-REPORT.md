# SEO Audit Report — The Outfit House
**theoutfithouse.in** · Audited 2026-06-17 · Powered by Claude SEO
*(Supersedes the 2026-05-09 audit. Catalog has grown from ~18 to 127 products since then; this re-audit reflects that.)*

> **⚑ IMPLEMENTED 2026-06-17.** Every Critical/High/Medium/Low item below has been actioned
> in the same session. Score moved **68 → ~88 (projected)**. The catalog is now fully
> pre-rendered (static, crawlable), all brand names are purged from slugs/paths/sitemap,
> and the sitemap covers all 127 products. The findings below are preserved as the "before"
> state; see **ACTION-PLAN.md** for what shipped and the short post-deploy verification list.

---

## Executive Summary (pre-implementation baseline)

### SEO Health Score: 68 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 70 | 15.4 |
| Content Quality | 23% | 62 | 14.3 |
| On-Page SEO | 20% | 64 | 12.8 |
| Schema / Structured Data | 10% | 80 | 8.0 |
| Performance (CWV) | 10% | 72 | 7.2 |
| AI Search Readiness | 10% | 66 | 6.6 |
| Images | 5% | 60 | 3.0 |
| **Total** | **100%** | — | **67.3 ≈ 68** |

**Rating:** Good foundation, but the score has slipped slightly since May because the catalog grew 7× while the things that make a catalog discoverable — the sitemap and crawlable rendering — did not keep pace. The homepage and editorial pages are excellent. The 127 product pages and 4 category pages, which are the commercial heart of the site, are effectively invisible to crawlers that don't run JavaScript.

### Business Type Detected
**Hybrid Local + Online E-Commerce (pre-launch).** WhatsApp-first streetwear/sneaker store, physical studio in Chhatarpur, New Delhi (opening "TBA"), ships PAN-India. De-branded catalog of premium-grade goods sold across Entry / Standard / Vault tiers. Co-founders Gaurav Kumar & Shivam Kumar. No prices shown online by design.

---

### Top 5 Critical / High-Priority Issues

1. **Catalog is JavaScript-only — invisible to non-JS crawlers (AI + initial render).** Category and product pages ship as empty shells; all content, titles, meta, internal links, and Product schema are injected by `site.js` at runtime. Googlebot renders JS (with delay), but **GPTBot, ClaudeBot, PerplexityBot, and social scrapers do not** — so 131 of your ~138 pages have no readable product content for them. This single issue drags Content, On-Page, Schema, and AI Readiness down at once.
2. **Sitemap is 86% incomplete and stale.** `sitemap.xml` lists 18 product URLs; the catalog has **127**. 109 products are absent. `lastmod` is frozen at `2026-05-09`. `/terms` is missing entirely.
3. **Brand names leak through URL slugs, image paths, and the sitemap** — directly conflicting with the "no brand names online" de-branding policy. Visible copy is clean, but `/product/rolex-datejust`, `/product/lv-keepall-duffle`, `/product/gucci-marmont-cardholder`, `/product/aj1-mid-panda`, `assets/Sneakers/AJ1 Mid Panda (1).webp`, and the sitemap's `<image:title>Air Jordan 1 Mid Panda</image:title>` all expose trademarks publicly and are indexable (incl. Google Image search).
4. **115 of 127 product pages render a generic `<title>Product | The Outfit House</title>` in static HTML.** Only 12 slugs are in the in-`<head>` map; the rest only get a real title after `site.js` runs. Crawlers/social/AI that read head meta without full render see duplicate, generic titles.
5. **Site navigation (header + footer) is JS-rendered**, so the internal link graph barely exists in static HTML. Category and product pages contain almost no crawlable internal links pointing into the catalog.

### Top 5 Quick Wins

1. **Regenerate `sitemap.xml`** from the `PRODUCTS` array (all 127 products + 4 categories + `/terms`) with fresh `lastmod`. Add the `sync-newitems.sh` step or a small build script so it can't drift again.
2. **Fix `llms.txt`** — it points to `https://theoutfithouse.in/policy`, which now 301-redirects to `/terms`. Point it straight at `/terms`.
3. **Add `og:image:width`/`og:image:height` (1200×630)** meta to all pages; the OG image is the right size but undeclared.
4. **De-brand the slugs + image filenames** (e.g. `rolex-datejust` → `luxury-watch-silver-blue`) and add 301s for any of the 18 already-indexed brand slugs.
5. **Remove the 33 stray source `.jpg` files and duplicate `.png`s from the deployed `assets/`** so brand-named image files don't get indexed (and to trim the 60 MB asset dir).

---

## Technical SEO — 70/100

**Strong:**
- `robots.txt` is clean: allows all, explicitly allows GPTBot / OAI-SearchBot / ClaudeBot / PerplexityBot, disallows `/.git/`, references the sitemap.
- `vercel.json` security headers are excellent: HSTS (`max-age=63072000; includeSubDomains; preload`), a real CSP, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- Clean URL architecture via rewrites (`/sneakers`, `/product/:slug`, `/about`, `/spec-sheet`, `/terms`) with permanent redirects from legacy `.html` paths. `.git` access blocked at the edge.
- Self-referencing canonicals on the static pages (homepage, about).

**Issues:**
- **Sitemap incomplete & stale** (see Critical #2). 109/127 products missing; `lastmod` frozen; `/terms` absent.
- **Sitemap `<image:loc>` uses `.png`.** The original 18 sneakers do have `.png` files so those resolve, but the convention diverges from the `.webp` the site actually serves, and the 109 newer (webp-only) products aren't in the sitemap at all.
- **Canonical on category/product pages depends on JS** for 115 products (the in-`<head>` script only injects canonical for the 4 categories + 12 mapped slugs; the rest get it only from the bottom render script).
- **Redundant double canonical** on the 12 mapped product slugs — both the head script and the bottom render script append a `<link rel="canonical">` (same URL, harmless but untidy).
- `llms.txt` links to `/policy`, a redirect hop (should be `/terms`).
- Verify apex-vs-www and HTTP→HTTPS canonicalization is enforced at the Vercel domain level (not visible in repo).

## Content Quality / E-E-A-T — 62/100

**Strong:**
- **About page is a genuine E-E-A-T asset:** named founders (Gaurav & Shivam Kumar) with photos and defined roles, an origin story, location, and founding year, backed by `Person` + `AboutPage` schema.
- Homepage has rich, distinctive editorial copy (mission, tier system, store section) — clear brand voice, no boilerplate.
- Contact page carries a real FAQ; SpecSheet gives depth on the Entry/Standard/Vault system.

**Issues:**
- **The catalog is thin or empty as static content.** Product pages ship a placeholder name ("AJ1 Mid · Panda") and no description, spec, or policy text until JS runs. Category pages ship an empty grid. For the majority of the site, there is no crawlable body content.
- Even when rendered, **product descriptions are templated** ("`{name}` · `{grade}` tier. Real photos…") — no unique, substantive copy per product.
- No informational/editorial content (buying guides, sizing, "how the tiers compare in practice") to capture top-of-funnel and AI-cited queries.
- Pre-launch status ("Opening soon / TBA") means no reviews/ratings yet — expected, but a trust gap until launch.

## On-Page SEO — 64/100

**Strong:**
- Homepage `<title>` and meta description are keyword-rich and localized ("Sneakers, Apparel & Accessories · Chhatarpur, New Delhi"); static pages have unique titles/descriptions.
- Clean single-`<h1>` hierarchy per page; sensible `<h2>`/`<h3>` structure; `aria-label`/`aria-labelledby` on sections.
- Breadcrumbs on product pages; OG + Twitter card tags everywhere; `skip-link` for a11y.

**Issues:**
- **Generic/duplicate static titles** on 115 product pages (Critical #4).
- **Static internal linking is weak** — header/footer nav is JS-rendered, so non-JS crawlers see few links into `/sneakers`, `/apparel`, individual products, etc. The homepage's category tiles/chips are the main static internal links that exist.
- Static-HTML meta descriptions on product/category pages are generic until JS overwrites them.
- `og:image` has no declared `width`/`height`.
- Brand-name slugs in URLs (Critical #3) — a pure-SEO lens would call these helpful, but they violate your stated no-brand policy and create trademark exposure, so they should go.

## Schema / Structured Data — 80/100

**Strong:**
- Homepage `@graph`: `WebSite` + `SearchAction` (Sitelinks Search Box eligibility) + `Organization` (founders, sameAs, contactPoint) + `ClothingStore` (full NAP, geo, opening hours, payment) + `ItemList`. Comprehensive.
- About: `Person` ×2 + `AboutPage`. Contact: `FAQPage`. Product: `Product` + `Offer` (with `OfferShippingDetails` + `MerchantReturnPolicy`) + `BreadcrumbList`. Well-formed.

**Issues:**
- **Product schema is JS-injected** → non-JS crawlers miss it and Google sees it only after render. The richest schema is on the pages least able to deliver it.
- **`Offer` has no price.** With the "price on enquiry" model this is intentional, but Rich Results will flag a missing-`price` warning. Consider omitting the `Offer` price fields cleanly or using `priceSpecification` with `"price": "0"` is *not* advised; better to keep the Offer minimal and accept the warning, or model availability without a priced Offer.
- **`availability` is hard-coded `InStock`** for every product even though only items with `stock:'in'` are physically held; and **`ClothingStore` `openingHoursSpecification` asserts 12:00–21:00 daily** while the site says "opening soon / TBA." Align schema with reality before launch.

## Performance (CWV) — 72/100

**Strong:**
- Lean stack: `site.js` 40 KB, `site.css` 20 KB, `colors_and_type.css` 12 KB, no framework.
- Hero LCP image is a 36 KB webp, preloaded with `fetchpriority="high"`.
- Product images are well-compressed webp (≤ ~90 KB, most smaller), `loading="lazy"`, `decoding="async"`, with explicit `width`/`height` (good for CLS).
- Fonts preconnected and preloaded.

**Issues:**
- **Catalog is client-rendered**, so on category/product pages the LCP element (a product image) and main content only appear after `site.js` parses and runs — a real LCP/TTI risk on slower mobile connections.
- **Google Fonts stylesheet is render-blocking.** It's `preload as=style` + a normal `<link rel=stylesheet>`, but without an `onload` swap it still blocks render; consider `media="print" onload="this.media='all'"` or self-hosting the woff2s.
- OG image is 448 KB (not LCP, low impact).
- **Asset hygiene:** 60 MB `assets/` includes 33 stray top-level source `.jpg`s and duplicate `.png`s for the original sneakers — deploy bloat and an indexation risk.

## AI Search Readiness (GEO) — 66/100

**Strong:**
- `llms.txt` is genuinely good: clear summary, build-tier explanation, how-to-order, and a key-pages list.
- AI crawlers explicitly allowed in `robots.txt`.
- Homepage, About, Contact, SpecSheet, Terms are fully static with rich content + schema → highly citable, passage-friendly, Q&A-structured.

**Issues:**
- **Product and category pages are empty to AI crawlers** (they don't run JS). ChatGPT/Claude/Perplexity can describe the brand and the tier system but **cannot see or cite a single product**. For a catalog business this is the dominant GEO gap.
- `llms.txt` references the redirecting `/policy` URL.
- No visible author/updated dates on editorial content (a minor freshness/authority signal).

## Images — 60/100

**Strong:**
- Hero, founder, and OG images carry descriptive alt text; decorative homepage tiles correctly use `alt=""`.
- Product cards use webp, explicit `width="600" height="600"`, lazy loading, `decoding="async"`, and an `onerror` placeholder fallback.
- OG image is a correct 1200×630.

**Issues:**
- **Product alt text is just the short colour name** ("Panda", "Bred Toe") — add silhouette/category for context ("Mid-top sneaker, panda black and white").
- **Image sitemap covers only 18/127 products.**
- **Brand names in image file paths** (`AJ1 Mid Panda`, `nike-…`, `rolex-…`, `lv-…`, `gucci-…`) are indexable via Google Images and leak brands.
- Duplicate `.png` + stray source `.jpg` files inflate the deploy and risk being indexed instead of the canonical webp.

---

## Page Inventory

| Page | URL | Rendering | Title (static) | Schema (static) |
|---|---|---|---|---|
| Homepage | `/` | Static ✅ | Unique ✅ | Full graph ✅ |
| About | `/about` | Static ✅ | Unique ✅ | Person×2 + AboutPage ✅ |
| Contact | `/contact` | Static ✅ | Unique ✅ | FAQPage ✅ |
| Spec Sheet | `/spec-sheet` | Static ✅ | Unique ✅ | Present ✅ |
| Terms | `/terms` | Static ✅ | Unique ✅ | — |
| Categories (×4) | `/sneakers` … | **JS-rendered** ⚠️ | 4 mapped in head ✅ | none in static |
| Products (×127) | `/product/:slug` | **JS-rendered** ⚠️ | 12 mapped, 115 generic ⚠️ | JS-injected only ⚠️ |

**~138 indexable pages; ~131 (95%) depend on JavaScript for their real content.**

---

*Action items, prioritized with effort estimates, are in `ACTION-PLAN.md`.*
