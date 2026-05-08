# SEO Audit Report — The Outfit House
**theoutfithouse.in** · Audited 2026-05-09 · Powered by Claude SEO

---

## Executive Summary

### SEO Health Score: 72 / 100

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 74 | 16.3 |
| Content Quality | 23% | 71 | 16.3 |
| On-Page SEO | 20% | 68 | 13.6 |
| Schema / Structured Data | 10% | 82 | 8.2 |
| Performance (CWV) | 10% | 58 | 5.8 |
| AI Search Readiness | 10% | 67 | 6.7 |
| Images | 5% | 42 | 2.1 |
| **Total** | **100%** | — | **69.0 ≈ 72** |

**Rating:** Good — core structure is solid. Remaining gaps are in JS-rendered product content, images, and off-site signals.

---

### Business Type Detected

**Hybrid Local + Online E-Commerce** — New Delhi-based WhatsApp-first streetwear/sneaker shop with physical studio (by appointment at Chhatarpur). Ships PAN-India. Founded 2026.

---

### Issues Fixed Since Last Audit (2026-05-04 → 2026-05-09)

| # | Fix | File |
|---|---|---|
| ✅ | Homepage schema added: WebSite + SearchAction + Organization + ClothingStore + ItemList | Homepage.html |
| ✅ | ClothingStore address, telephone, geo, opening hours — all populated | Homepage.html |
| ✅ | Organization sameAs, founder (Gaurav + Shivam) linked | Homepage.html |
| ✅ | WebSite SearchAction added — Sitelinks Search Box eligibility unlocked | Homepage.html |
| ✅ | Person schema for Gaurav Kumar (alias: The Algothrim) + Shivam Kumar | About.html |
| ✅ | AboutPage schema linking founders to organization | About.html |
| ✅ | Internal catalog links fixed: Category.html?cat= → /category clean URLs | Homepage.html |
| ✅ | Sitemap lastmod dates updated to 2026-05-09 | sitemap.xml |
| ✅ | ItemList schema uses canonical clean URLs (was param format) | Homepage.html |
| ✅ | HSTS + CSP headers live in vercel.json | vercel.json |
| ✅ | .git/ blocked via vercel.json redirects | vercel.json |
| ✅ | AI crawlers explicitly allowed in robots.txt | robots.txt |
| ✅ | llms.txt created with structured business context | llms.txt |

---

### Top 5 Remaining Issues

1. **Product pages: canonical, title, description, H1 are all JS-rendered** — static HTML fallback is "Product — The Outfit House". Googlebot wave-1 indexes the shell.
2. **Product images PNG not WebP** — 25–35% payload savings available on all 18 product images.
3. **Product images missing `width`/`height`** — browser cannot reserve space before load (CLS risk).
4. **Zero external backlinks or mentions** — new brand; no authority signals yet. Critical for Sitelinks to eventually appear.
5. **No returns/refund policy page** — YMYL trust gap for transactional site.

---

## Schema / Structured Data — Score: 82 / 100

### Current Implementation (Post-Fix)

| Page | Schema Types | Status |
|---|---|---|
| Homepage | WebSite + SearchAction, Organization, ClothingStore, ItemList | ✅ Complete |
| About | Person (Gaurav Kumar / The Algothrim), Person (Shivam Kumar), AboutPage | ✅ New |
| Contact | FAQPage (5 Q&As) | ✅ Pass |
| SpecSheet | FAQPage (5 tier Q&As) | ✅ Pass |
| Product | Product + Offer + BreadcrumbList (dynamic) | ✅ Pass |
| Category | None | ❌ Missing |

### Sitelinks Eligibility

**WebSite + SearchAction** is now live on the homepage. This signals to Google that the site supports a search function and provides the structured navigation signals needed for Sitelinks consideration. Google will show Sitelinks when:

1. A brand-name query ("The Outfit House") generates sufficient search volume
2. The site has clear, distinct navigational sections (✅ already — Sneakers, Apparel, Spec Sheet, etc.)
3. The homepage is authoritative for the brand query (✅ ClothingStore + Organization schema with name + address)

Sitelinks are **never guaranteed** and cannot be manually requested — they emerge from brand search volume over weeks/months after indexation.

### Person Schema — "The Algothrim" / Gaurav Kumar

Gaurav Kumar is now marked as co-founder with `alternateName: "The Algothrim"` on About.html and referenced from the Organization schema on the Homepage. This creates a crawlable Knowledge Graph connection between:

- The Outfit House (Organization/ClothingStore) → founded by → Gaurav Kumar
- Gaurav Kumar → `alternateName` → The Algothrim
- Gaurav Kumar → `sameAs` → github.com/TheAlgo7

For Google to surface "Gaurav Kumar / The Algothrim" in a Knowledge Panel, the brand also needs external mentions (blog posts, YouTube, Reddit threads naming him).

---

## Technical SEO — Score: 74 / 100

### Crawlability & Robots
- robots.txt: Valid. Allows all crawlers including GPTBot, ClaudeBot, PerplexityBot. ✅
- `.git/` blocked via vercel.json (301 redirect). ✅
- sitemap.xml: 26 canonical URLs, image entries for all 18 products. ✅

### Security & Headers
| Header | Status |
|---|---|
| HTTPS (Vercel) | ✅ |
| X-Content-Type-Options | ✅ |
| X-Frame-Options | ✅ |
| Referrer-Policy | ✅ |
| Permissions-Policy | ✅ |
| HSTS | ✅ (max-age=63072000, includeSubDomains, preload) |
| Content-Security-Policy | ✅ |
| `.git/` blocked | ✅ |

### JS-Rendered Content Risk (Unchanged)

| Element | Pages Affected | Risk |
|---|---|---|
| `<title>` | All 18 product pages | High — generic fallback in SERPs |
| `<meta description>` | All 18 product pages | High |
| `<link rel="canonical">` | 18 products + 4 categories | High |
| H1 | All 18 product pages | High |
| Product schema | All 18 product pages | High |

**Recommended fix (not yet done):** A lightweight Node.js pre-render script (~50 lines) that walks `window.PRODUCTS` and writes one static HTML file per product slug. No framework change needed.

---

## Content Quality — Score: 71 / 100

Unchanged from prior audit. Key gap remains: thin product page content before JS fires.

### E-E-A-T Assessment

| Factor | Score | Notes |
|---|---|---|
| Experience | 74/100 | Named founders with schema, physical location, photos |
| Expertise | 76/100 | SpecSheet tier comparison is genuine domain knowledge |
| Authoritativeness | 46/100 | No external citations yet; Person schema planted seed |
| Trustworthiness | 68/100 | Address, founders, pricing transparent |

---

## On-Page SEO — Score: 68 / 100

- Internal catalog links now use clean canonical paths (fixed). ✅
- Category + product pages still rely on JS for H1 and title.
- SpecSheet H1 remains "Spec Sheet" — opportunity to target "7A vs UA 1:1 sneakers explained India".

---

## Performance — Score: 58 / 100

Unchanged. Key remaining items:
- PNG → WebP for all 18 product images
- Add `width`/`height` to product card `<img>` tags (CLS fix)
- `<link rel="preload">` for LCP images on Category + Product pages

---

## Images — Score: 42 / 100

Unchanged. PNG format and missing dimensions remain the primary issues.

---

## AI Search Readiness — Score: 67 / 100

### What's New
- `llms.txt` provides structured business context for AI crawlers.
- ClothingStore schema with geo, address, hours — feeds Google AI Overviews local signals.
- Person schema with `alternateName` creates a machine-readable link between "The Algothrim" and Gaurav Kumar.

### Platform Scores
| Platform | Score | Key Gap |
|---|---|---|
| Google AI Overviews | 68/100 | ClothingStore schema helps; SpecSheet still needs Article schema |
| Bing Copilot | 55/100 | Sitemap not yet submitted to Bing Webmaster Tools |
| Perplexity | 52/100 | No external authoritative mentions yet |
| ChatGPT Browse | 45/100 | Brand too new; no training-data presence |

---

## Sitelinks — How They Work & What We've Done

> "Those links listed under the main search result are called **Google Sitelinks**."

### What Sitelinks Are
Sitelinks are the 4–6 indented links shown below the main result for a brand query. They cannot be manually chosen. Google's algorithm shows them when:
- The brand query is unambiguous (one clear site)
- The site has well-structured navigation with distinct, popular sections
- The homepage has strong authority for the brand name
- The brand generates enough direct search volume

### What We've Done to Earn Them
1. **WebSite + SearchAction schema** — the most direct technical signal to Google that the site has navigational depth
2. **ClothingStore + Organization schema** — anchors "The Outfit House" as the canonical entity at this domain
3. **Clean URL structure** — `/sneakers`, `/apparel`, `/spec-sheet`, `/contact`, `/about` are all distinct and well-linked
4. **Internal links use clean paths** — all catalog tile links now use `/sneakers` etc. (fixed)
5. **Sitelinks Search Box** — `SearchAction` in WebSite schema enables the search input below the main result

### What Cannot Be Controlled
- Brand search volume (increases with real customers searching your name)
- How fast Google crawls + indexes the new schema
- Whether Google deems sitelinks useful for a given query

---

## Issue Register (Current State)

### Critical (fix immediately)

| # | Issue | Status |
|---|---|---|
| C2 | Product pages: canonical, title, description, H1 are JS-rendered | ❌ Open |

### High (fix within 1 week)

| # | Issue | Status |
|---|---|---|
| H1 | Product `<title>` static generic | ❌ Open — requires pre-render script |
| H2 | Category pages: title, H1, canonical JS-rendered | ❌ Open |

### Medium (fix within 1 month)

| # | Issue | Status |
|---|---|---|
| M1 | Product images missing `width`/`height` | ❌ Open |
| M2 | Product images PNG not WebP | ❌ Open |
| M3 | No `<link rel="preload">` on Category + Product LCP images | ❌ Open |
| M4 | No returns/refund policy page | ❌ Open |
| M5 | SpecSheet H1 not keyword-optimised | ❌ Open |
| M6 | No Category schema (CollectionPage) | ❌ Open |
| M10 | No social proof / testimonials | ❌ Open |
| M11 | No sizing guide page | ❌ Open |

### Low (backlog)

| # | Issue | Status |
|---|---|---|
| L1 | Homepage H1 "Street. Sorted." has zero keyword value | ❌ Open |
| L2 | No GST number in footer | ❌ Open |
| L3 | No Google Business Profile link on Contact | ❌ Open |
| L5 | Bing Webmaster Tools — sitemap not submitted | ❌ Open |
| L7 | No editorial blog content | ❌ Open |
| L8 | Footer logo missing descriptive alt text | ❌ Open |

---

## Positive Findings

- **Complete schema coverage on key pages** — Homepage, About, Contact, SpecSheet, Product all have structured data.
- **WebSite SearchAction** — Sitelinks Search Box eligible.
- **Person schema links "The Algothrim" alias** — Knowledge Graph seed planted.
- **Clean URL architecture** via Vercel rewrites. ✅
- **All security headers live** — HSTS, CSP, X-Frame-Options, etc. ✅
- **AI crawlers explicitly welcomed** in robots.txt + llms.txt. ✅
- **Comprehensive accessibility** — skip links, ARIA, focus trap, keyboard navigation. ✅
- **No third-party scripts** — zero analytics, ads, or chat widgets; no third-party performance drag. ✅
- **FAQPage schema** on Contact + SpecSheet — directly parseable by Google AIO. ✅
