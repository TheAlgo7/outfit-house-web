# SEO Audit — The Outfit House

**theoutfithouse.in** · Audited 2026-06-23 · Live deployment + source
*(Re-audit after the 2026-06-17 static-rendering overhaul. Supersedes that report's
"before" baseline; the JS-rendering crisis it documented is now resolved.)*

---

## Executive Summary

### SEO Health Score: 87 / 100  (Good → Strong)

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 92 | 20.2 |
| Content Quality | 23% | 78 | 17.9 |
| On-Page SEO | 20% | 88 | 17.6 |
| Schema / Structured Data | 10% | 90 | 9.0 |
| Performance (CWV) | 10% | 88 | 8.8 |
| AI Search Readiness | 10% | 90 | 9.0 |
| Images | 5% | 85 | 4.3 |
| **Total** | **100%** | — | **86.8 ≈ 87** |

**Business type:** Hybrid Local + Online e-commerce (pre-launch). WhatsApp-first
streetwear/sneaker store, physical studio in Chhatarpur, New Delhi (opens 28 June
2026), ships PAN-India. De-branded catalog, no prices online by design.

**Headline:** The single biggest liability from the last audit — a JavaScript-only
catalog invisible to AI and non-JS crawlers — is **fully fixed**. All 126 product
and 4 category pages now render content + schema as static HTML. Verified live.

### Resolved since 2026-06-17 (verified on live site)
1. ✅ **Catalog is static & crawlable.** Product pages ship Product/Offer/Breadcrumb/
   shipping/returns schema in raw HTML; category pages ship 52 product cards + ItemList. No JS required.
2. ✅ **Sitemap complete** — 136 URLs (all products + categories + core pages), `lastmod` 2026-06-23.
3. ✅ **Brand names purged** from slugs, image paths, sitemap (de-branded).
4. ✅ **Unique titles** on every product (no more generic "Product | The Outfit House").
5. ✅ **`Offer.availability` is accurate** — sold-out items return `BackOrder`, not hard-coded `InStock`.
6. ✅ **`ClothingStore` opening hours removed** (no longer asserts hours while pre-launch).
7. ✅ **llms.txt** points to `/terms` (old `/policy` redirect hop gone).
8. ✅ **OG image width/height declared** (1200×630).
9. ✅ **Self-hosted fonts** (this session) — render-blocking Google Fonts stylesheet eliminated; CSP tightened to `font-src 'self'`.
10. ✅ **Image alt text enriched** — "Mid-Top Sneaker, Panda — Standard tier, The Outfit House" across all cards.

---

## Findings by priority

### Critical
*(none — the prior Critical items are all resolved)*

### High
- **H1 — "Chattarpur" typo in `llms.txt`** *(FIXED this session, needs deploy).* The
  store's own neighbourhood was misspelled on the primary AI-facing file (the rest of
  the 133 source files use "Chhatarpur"). Fixed locally; deploy to make live.

### Medium
- **M1 — `Offer` has no `price`.** Intentional ("price on enquiry"), but Google Rich
  Results will emit a *missing-field* warning on every product. Acceptable tradeoff;
  alternative is to drop the `Offer` node entirely and model availability without a
  priced offer. Leave as-is unless the warnings bother you in Search Console.
- **M2 — Product descriptions are templated.** Each PDP uses a formula
  ("{brand} in {name}. Genuine leather / premium materials…"). Crawlable now, but not
  unique substantive copy. Thin-ish for ranking on long-tail product queries.
- **M3 — OG/social image is 455 KB.** Not the LCP element (low impact), but heavy for a
  share preview. Re-export at ~150–200 KB.

### Low
- **L1 — No reviews/ratings yet.** Expected pre-launch; a trust + rich-result gap that
  closes naturally after 28 June. Plan to collect WhatsApp testimonials → `Review`/`AggregateRating` schema post-launch.
- **L2 — No editorial/top-of-funnel content beyond the Guide.** One buying guide exists
  (good); a few more ("how the tiers compare in practice", sizing, care) would capture
  informational queries and AI citations.
- **L3 — Verify apex/www + HTTP→HTTPS canonicalization** at the Vercel domain level
  (redirects exist in `vercel.json` for www→apex; confirm HTTPS enforcement).

---

## Category notes

**Technical SEO 92** — robots.txt clean (AI bots explicitly allowed, `.git`/`.md`/build
artifacts disallowed), sitemap complete + fresh, static self-referencing canonicals,
strong security headers (HSTS preload, tightened CSP, X-Content-Type-Options, frame
options), clean URL architecture with permanent legacy redirects.

**Content Quality 78** — genuine E-E-A-T (named founders w/ roles + photos, origin story,
location, FAQ, Spec Sheet, Guide; distinctive brand voice). Dragged by templated product
copy (M2) and no reviews yet (L1, pre-launch).

**On-Page 88** — unique titles + meta everywhere, single-H1 hierarchy, breadcrumbs, OG +
Twitter cards, skip-link. Internal linking is solid and static (catalog tiles + Shop
dropdown + footer all link categories — note: the hero category chips were removed this
session, but those four categories remain linked three other ways, so no link-graph loss).

**Schema 90** — comprehensive homepage `@graph` (WebSite + SearchAction + Organization +
ClothingStore + Person×2 + ItemList + ContactPoint + geo + address); per-product
Product/Offer/Breadcrumb/MerchantReturnPolicy/OfferShippingDetails; FAQ on Contact. All
static. Only ding: intentional missing `price` (M1).

**Performance 88** *(lab estimate; no CrUX field data)* — lean no-framework stack,
self-hosted fonts (no render-block), preloaded LCP image with `fetchpriority=high`, lazy
images with explicit dimensions (good CLS), static pages. OG image heavy (M3) but off the
critical path.

**AI Readiness 90** — strong llms.txt, AI crawlers allowed, fully static/citable catalog
content, rich schema. Only issue was the llms.txt typo (H1, now fixed).

**Images 85** — webp, explicit dimensions, lazy + async, enriched alt text, `onerror`
placeholder fallback, correct 1200×630 OG. Ding: OG file weight (M3).

---

## Recommended actions (priority order)

1. **[High] Deploy the llms.txt typo fix** — already committed locally.
2. **[Medium] Re-export the OG image** at ~150–200 KB (M3).
3. **[Medium] Decide on the `Offer` price warning** (M1) — accept, or drop the priced Offer node.
4. **[Medium] Add unique copy to top sellers** (M2) — even 2–3 bespoke sentences on the
   in-stock pieces beats the template for long-tail + AI citation.
5. **[Low, post-launch] Collect reviews → AggregateRating schema** (L1).
6. **[Low] Add 2–3 editorial guides** for top-of-funnel + GEO (L2).
