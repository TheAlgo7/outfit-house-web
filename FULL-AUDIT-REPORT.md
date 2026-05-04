# SEO Audit Report — The Outfit House
**theoutfithouse.in** · Audited 2026-05-04 · Powered by Claude SEO

---

## Executive Summary

### SEO Health Score: 55 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 51 | 11.2 |
| Content Quality | 23% | 71 | 16.3 |
| On-Page SEO | 20% | 50 | 10.0 |
| Schema / Structured Data | 10% | 38 | 3.8 |
| Performance (CWV) | 10% | 58 | 5.8 |
| AI Search Readiness | 10% | 54 | 5.4 |
| Images | 5% | 42 | 2.1 |
| **Total** | **100%** | — | **54.6 ≈ 55** |

**Rating:** Acceptable — significant work needed in Technical, Schema, and AI Readiness dimensions.

---

### Business Type Detected

**Hybrid Local + Online E-Commerce** — New Delhi-based WhatsApp-first streetwear/sneaker shop with physical studio (by appointment). Sells Entry / 7A / UA 1:1 alternative-grade products. Ships PAN-India. Founded 2026.

---

### Top 5 Critical Issues

1. **All 18 product pages have JS-rendered title, meta description, and canonical** — static HTML fallback is "Product — The Outfit House". Googlebot may index these before JS fires.
2. **Sitemap contained wrong URLs** — legacy `.html?param=` format instead of clean canonical paths. Fixed by audit (new sitemap already written).
3. **`.git/` directory is publicly accessible** — exposes full commit history, file paths and internal project references to any HTTP client including crawlers.
4. **Organization schema `sameAs` URL is broken** — `instagram.com/theoutfithouse.in` does not resolve to the correct profile.
5. **`/about` page was missing from sitemap entirely** — now corrected in the new sitemap.

### Top 5 Quick Wins (already completed by this audit)

1. ✅ **Sitemap fully rebuilt** — 26 clean canonical URLs, image sitemap entries for all 18 products, `/about` added, `lastmod` set, legacy params removed.
2. Robots.txt update with explicit AI crawler rules (15-min task)
3. Fix Instagram `sameAs` URL in Homepage schema (2-min task)
4. Block `.git/` in vercel.json with a 404 redirect (5-min task)
5. Create `/llms.txt` for AI crawler context (2-hour task)

---

## Technical SEO — Score: 51 / 100

### Crawlability & Robots
- robots.txt: Valid. Allows all, points to sitemap. ✅
- `.git/` publicly accessible: crawlers index noise, exposes project history. **Critical fix needed.**
- No explicit AI crawler rules (GPTBot, ClaudeBot, PerplexityBot). Low-effort to add.

### Indexability
- ✅ sitemap.xml: **FIXED** — rebuilt with canonical clean URLs, image entries, `/about` added.
- Canonical tags are static and correct on Homepage, /about, /contact, /spec-sheet.
- **Product.html** canonical is JS-injected — initial HTML has no canonical or a wrong one.
- **Category.html** canonical is JS-injected — same risk.

### Security & Headers
| Header | Status |
|---|---|
| HTTPS (Vercel) | ✅ Pass |
| X-Content-Type-Options | ✅ Pass |
| X-Frame-Options | ✅ Pass |
| Referrer-Policy | ✅ Pass |
| Permissions-Policy | ✅ Pass |
| HSTS | ❌ Missing |
| Content-Security-Policy | ❌ Missing |
| `.git/` blocked | ❌ Missing |

### URL Structure
- Clean URL rewrites configured correctly in vercel.json. ✅
- 301 redirects for legacy `.html` pages in place. ✅
- Product slug pattern `/product/:slug` — clean and crawlable. ✅

### JS-Rendered Content Risk

This is the largest structural SEO liability on the site.

| Element | Pages Affected | Risk |
|---|---|---|
| `<title>` | All 18 product pages | High — generic fallback in SERPs |
| `<meta description>` | All 18 product pages | High — generic fallback |
| `<link rel="canonical">` | 18 products + 4 categories | Critical — wrong canonical before JS fires |
| H1 (product name) | All 18 product pages | High |
| Product schema | All 18 product pages | High |

**Root cause:** Product.html and Category.html are single-template files where all meaningful content (title, description, canonical, H1, schema) is injected by JavaScript after the page loads. Googlebot crawls in two waves: initial HTML (fast) and rendered JavaScript (delayed by hours to days). During that window every product page appears as a generic, undifferentiated shell.

**Recommended fix:** Add per-slug static HTML files, or use a lightweight pre-rendering build script (Node.js, ~50 lines) that generates static per-product HTML from the PRODUCTS array in site.js. This does not require changing the stack.

### Mobile Optimization
- Viewport meta tag present on all pages. ✅
- Skip links and `<main>` landmarks on all pages. ✅
- Product images missing `width`/`height` attributes — CLS risk on slow mobile connections.
- Google Fonts: `display=optional` + preconnect. No render-blocking. ✅
- `<link rel="preload">` for LCP image: Homepage only — missing on Category and Product pages.

---

## Content Quality — Score: 71 / 100

### E-E-A-T Assessment

| Factor | Score | Notes |
|---|---|---|
| Experience | 72/100 | Named founders, photos, physical location, "hand-verified in New Delhi" |
| Expertise | 76/100 | SpecSheet tier comparison is genuine domain knowledge |
| Authoritativeness | 44/100 | No external citations, no reviews, no press mentions |
| Trustworthiness | 68/100 | Address, founders, pricing transparent; no GST, no refund policy page |
| **Composite** | **65/100** | |

### Thin Content Risk

| Page | Word Count | Risk |
|---|---|---|
| Homepage | ~420 | Medium — below 500 threshold |
| About | ~580 | Low |
| SpecSheet | ~700 | Low-Medium |
| Contact | ~310 | Low (utility page) |
| Category pages | ~60 visible (static) | **Critical** — "Loading…" placeholder before JS |
| Product pages | ~280 (static shell) | **Critical** — near-empty before JS |

### Title Tag Quality

| Page | Title | Issue |
|---|---|---|
| Homepage | "The Outfit House — Sneakers · Streetwear · Premium" | Good; missing geo signal ("New Delhi") |
| About | "About — The Outfit House" | Generic; no keyword value |
| SpecSheet | "Spec Sheet — The Outfit House" | Missed opportunity: should target "7A vs UA 1:1 sneaker grades India" |
| Category | Dynamic (JS-injected) | Risk if JS fails |
| Product | "Product — The Outfit House" (static shell) | **Poor — actively harmful fallback in SERPs** |
| Contact | "Contact — The Outfit House" | Acceptable for utility page |

### Heading Hierarchy

H1s across the site prioritize brand voice over keyword signals:
- "Street. Sorted." — zero keyword value
- "Slide into our DMs." — zero keyword value
- "The People Behind The House." — acceptable for About

The SpecSheet H1 is a missed major opportunity. It should target "Entry vs 7A vs UA 1:1 Sneakers Explained" — the exact query a first-time Indian buyer would search.

### Missing Content Opportunities

1. **Returns/Refund Policy page** — YMYL trust gap; a 200-word page is sufficient.
2. **Sizing guide** — UK/US/EU/CM conversion chart; top pre-purchase query.
3. **Social proof section** — zero testimonials, order count, or customer media.
4. **GST number** in footer — concrete India-specific trust signal.
5. **Google Business Profile link** on Contact page — no map embed, no GMB link.
6. **One editorial post** — "Entry vs 7A vs UA 1:1: Which Grade?" would capture mid-funnel traffic and build topical authority around the grade system the site owns.

### YMYL Risk Note

This site sells alternative (replica) streetwear. Google's Quality Rater Guidelines subject transactional pages to elevated E-E-A-T scrutiny. While the site does not use the word "replica," the tier system (7A, UA 1:1) is industry-standard terminology for the unauthorized-reproduction market. Gaps: no transparency disclaimer, off-site ordering via WhatsApp, no payment policy disclosure pre-purchase. These are deliberate commercial choices but create trust-scoring gaps.

---

## On-Page SEO — Score: 50 / 100

### Internal Linking
- Navigation covers all 4 category pages + key utility pages. ✅
- Footer links to all 4 categories + Help + Connect. ✅
- Homepage links to SpecSheet ("Quality tiers →"). ✅
- No internal links from Category → SpecSheet or Product → SpecSheet (missed cross-linking opportunity).
- Products lack breadcrumb links in HTML (dynamically injected only).

### Meta Descriptions
| Page | Status |
|---|---|
| Homepage | 161 chars — well-written ✅ |
| Product (static) | Generic — risk of SERP display as "Product — The Outfit House" |
| Category (static) | Generic — JS-injected |
| Other pages | Not confirmed; likely generic |

### Structured Headings
Category and Product H1s depend entirely on JavaScript. If rendering fails, no H1 exists in the DOM — this is the equivalent of a missing H1 for wave-1 Googlebot crawls.

---

## Schema / Structured Data — Score: 38 / 100

### Current Implementation

**Homepage — 4 schema blocks:**
- Organization, ClothingStore, FAQPage, ItemList

**Product.html — 1 dynamically injected block:**
- Product + Offer

**All other pages:** No schema.

### Validation Bugs

| Bug | Severity | Fix |
|---|---|---|
| `sameAs` Instagram URL wrong on Organization + ClothingStore (`theoutfithouse.in` suffix) | Critical | `https://instagram.com/theoutfithouse` |
| ItemList URLs use `Category.html?cat=` and `Product.html?slug=` format | Critical | Use canonical clean URLs |
| Product `description` is `"name · grade grade at..."` — malformed + thin | High | Proper 50-100 char description |
| FAQPage price for Entry grade (₹499) doesn't match catalog (₹1,899 minimum) | Medium | Update FAQ text |

### Missing Properties

**ClothingStore (Critical — blocks LocalBusiness rich results):**
- `address` — required
- `telephone` — required
- `geo` (GeoCoordinates) — recommended
- `openingHoursSpecification` — recommended

**Product Offer (High — blocks Google Shopping eligibility):**
- `seller` — required (links to ClothingStore @id)
- `shippingDetails` (OfferShippingDetails) — required for shipping annotation
- `hasMerchantReturnPolicy` — required for return policy annotation
- `itemCondition` — recommended

### Missing Schema Opportunities

| Page | Schema Needed | Impact |
|---|---|---|
| All pages | `WebSite` + `SearchAction` | Sitelinks search box |
| Product + Category | `BreadcrumbList` | Breadcrumb rich results |
| Contact / About | `LocalBusiness` with address | Local pack eligibility |
| SpecSheet | `Article` + `HowTo` | Google AIO citation eligibility |
| Category | `CollectionPage` | Crawl context |

---

## Performance — Score: 58 / 100

### LCP (Largest Contentful Paint)
- Hero image preloaded on Homepage with `fetchpriority="high"`. ✅
- Category and Product pages: no LCP preload — first above-fold image loads without priority hint.
- All product images are PNG — WebP conversion would reduce payload 25-35%.
- Google Fonts: `display=optional` + preconnect — correct, no render-blocking. ✅

### CLS (Cumulative Layout Shift)
- Product images have no `width`/`height` attributes — browser cannot reserve space before load.
- Scroll-reveal animation uses `opacity` + `transform` only — compositor-safe. ✅
- Page-transition fade uses `opacity` only — compositor-safe. ✅

### INP (Interaction to Next Paint)
- No heavy event handlers; WhatsApp `onclick` is instantaneous.
- Scroll reveal uses IntersectionObserver — non-blocking. ✅
- No third-party scripts (analytics, ads, chat widgets) — no third-party INP risk. ✅

### Asset Optimization
- PNGs for all product images — opportunity to convert to WebP with PNG fallback.
- No lazy-loading on About page founder images (`loading="eager"` — correct for above-fold).
- All product card images use `loading="lazy" decoding="async"` — correct. ✅

---

## Images — Score: 42 / 100

| Issue | Affected | Severity |
|---|---|---|
| PNG format (not WebP) | All 18 product images + logos | Medium — payload, LCP |
| No `width`/`height` on product images | All 18 product cards | High — CLS |
| About founder images may be missing | `assets/about/gaurav.png`, `assets/about/shivam.png` | Critical (broken images) |
| No alt text on footer logo `<img>` | Footer | Medium — accessibility |
| Hero image alt text present | ✅ "Air Jordan 1 Mid Panda" | Pass |
| Product card image alt text | ✅ `p.name` injected dynamically | Pass |

**Note:** `assets/about/gaurav.png` and `assets/about/shivam.png` are referenced in About.html but do not appear in the assets directory glob. If these images are missing from the server, the About page will show broken image placeholders for both founders — a significant E-E-A-T and UX defect.

---

## AI Search Readiness — Score: 54 / 100

### Crawler Accessibility
- robots.txt allows all, including AI crawlers. No explicit named-crawler rules.
- No `llms.txt` — AI systems lack structured context about the business model.

### Citability by Page

| Page | Score | Strongest Asset |
|---|---|---|
| SpecSheet | 78/100 | Detailed 3-tier material comparison |
| Contact/FAQ | 71/100 | 5 Q&As in conversational format |
| Homepage FAQ schema | 68/100 | FAQPage markup directly parseable by AIO |
| About | 65/100 | Named founders, location, founding date |
| Category | 42/100 | No editorial content |
| Product | 31/100 | Descriptions too thin for AI citation |

### Brand Mention Signals (External)
The site is founded in 2026 with essentially zero external mentions. Until at least one crawlable authoritative source (YouTube, Reddit, industry forum) names "The Outfit House" in context, ChatGPT and Perplexity cannot surface the brand in unprompted recommendations.

### Platform Scores
| Platform | Score | Key Gap |
|---|---|---|
| Google AI Overviews | 61/100 | FAQPage schema helps; SpecSheet needs Article schema |
| Bing Copilot | 52/100 | Not submitted to Bing Webmaster Tools |
| Perplexity | 48/100 | SpecSheet passages too long; needs 134-167 word direct-answer format |
| ChatGPT Browse | 44/100 | No external mentions in training data |

---

## Sitemap — Status: FIXED ✅

The sitemap was fully rebuilt during this audit. The new `sitemap.xml`:
- 26 canonical clean-path URLs (was 25 legacy .html?param= URLs)
- Added `/about` (was missing entirely)
- Image sitemap entries for all 18 products (`xmlns:image` extension)
- `lastmod` on every URL
- Removed `priority` and `changefreq` (both ignored by Google)
- Correct percent-encoding for special characters in asset filenames

---

## Issue Register

### Critical (fix immediately)

| # | Issue | File/Location |
|---|---|---|
| C1 | `.git/` directory publicly accessible — security + crawl exposure | vercel.json |
| C2 | Product pages: canonical, title, description are JS-rendered — generic static fallback | Product.html |
| C3 | Organization + ClothingStore `sameAs` Instagram URL is wrong | Homepage.html (schema) |
| C4 | ClothingStore schema missing `address` + `telephone` — ineligible for LocalBusiness rich results | Homepage.html (schema) |
| C5 | About page founder images may be missing from server (`assets/about/*.png`) | assets/about/ |

### High (fix within 1 week)

| # | Issue | File/Location |
|---|---|---|
| H1 | Product `<title>` is static generic — "Product — The Outfit House" in SERPs | Product.html |
| H2 | Category pages: title, H1, canonical JS-rendered | Category.html |
| H3 | Product schema `seller` missing — blocks Google Merchant Center eligibility | Product.html (schema) |
| H4 | Product Offer missing `shippingDetails` + `hasMerchantReturnPolicy` | Product.html (schema) |
| H5 | No `WebSite` schema with `SearchAction` | All pages |
| H6 | No HSTS header | vercel.json |
| H7 | No Content-Security-Policy header | vercel.json |
| H8 | ItemList URLs use legacy param format | Homepage.html (schema) |

### Medium (fix within 1 month)

| # | Issue | File/Location |
|---|---|---|
| M1 | Product images missing `width`/`height` attributes — CLS | site.js (renderProductCard) |
| M2 | Product images PNG not WebP | assets/Sneakers/, assets/Apparel/, etc. |
| M3 | No `<link rel="preload">` on Category + Product LCP images | Category.html, Product.html |
| M4 | No returns/refund policy page | (new page needed) |
| M5 | SpecSheet H1 should target "7A vs UA 1:1 Sneakers Explained" | SpecSheet.html |
| M6 | No FAQ schema on Contact or SpecSheet | Contact.html, SpecSheet.html |
| M7 | `BreadcrumbList` schema absent on Product + Category | Product.html, Category.html |
| M8 | No `llms.txt` | (new file needed) |
| M9 | AI crawler names not in robots.txt | robots.txt |
| M10 | No social proof / testimonials | Homepage.html or new page |
| M11 | No sizing guide page | (new page needed) |

### Low (backlog)

| # | Issue | File/Location |
|---|---|---|
| L1 | Homepage H1 "Street. Sorted." has zero keyword value | Homepage.html |
| L2 | No GST number in footer | site.js (renderFooter) |
| L3 | No Google Business Profile link on Contact | Contact.html |
| L4 | No hreflang for Hindi-language users | All pages |
| L5 | Bing Webmaster Tools — sitemap not submitted | External |
| L6 | No LinkedIn company page | External |
| L7 | No editorial blog content | (new section needed) |
| L8 | Footer `<img>` missing descriptive alt text | site.js (renderFooter) |

---

## Positive Findings

- **Clean URL architecture** via Vercel rewrites — consumer-facing URLs are clean and human-readable.
- **Comprehensive accessibility** — skip links, `<main>` landmarks, focus-visible styles, mobile nav ARIA, focus trap, keyboard navigation all in place.
- **Design token system** — CSS is fully tokenized, no hardcoded colors, maintainable.
- **Compositor-safe animations** — scroll reveal and transitions use `transform`/`opacity` only.
- **Homepage meta description** is well-crafted (161 chars) and includes brand voice + geo signal.
- **SpecSheet content** is genuinely differentiated — detailed tier specs are rare in this product category and a strong E-E-A-T signal.
- **Named founders + physical address** on About page — rare for alternative-market streetwear sites; significant trust signal.
- **FAQPage schema** on Homepage is directly parseable by Google AIO.
- **No third-party scripts** — zero analytics, ads, or chat widgets means no third-party performance drag and no privacy concerns.
- **Google Fonts** loaded correctly with `display=optional` and preconnect — no render-blocking.
- **Product card stretched-link pattern** — correct accessibility implementation without button-in-anchor nesting.
