# SEO Action Plan — The Outfit House
**theoutfithouse.in** · Updated 2026-05-09 · Score: 72/100 · Target: 82+/100

---

## Completed ✅

| # | Action | Impact |
|---|---|---|
| ✅ | Homepage: WebSite + SearchAction schema (Sitelinks eligibility) | High |
| ✅ | Homepage: Organization + ClothingStore schema (address, tel, geo, hours) | Critical |
| ✅ | Homepage: ItemList schema with canonical clean URLs | High |
| ✅ | About: Person schema — Gaurav Kumar (alias: The Algothrim) + Shivam Kumar | High |
| ✅ | About: AboutPage schema linking founders to organization | Medium |
| ✅ | Homepage: Internal catalog links fixed to /sneakers, /apparel etc. | High |
| ✅ | sitemap.xml: Rebuilt with 26 canonical URLs + image entries | Critical |
| ✅ | robots.txt: AI crawlers explicitly allowed | Medium |
| ✅ | llms.txt: Structured business context for AI crawlers | Medium |
| ✅ | vercel.json: HSTS + CSP headers | High |
| ✅ | vercel.json: .git/ blocked | Critical |
| ✅ | Contact.html: FAQPage schema (5 Q&As) | High |
| ✅ | SpecSheet.html: FAQPage schema (5 tier Q&As) | High |
| ✅ | Product.html: Product + Offer + BreadcrumbList schema (dynamic) | High |
| ✅ | Homepage meta title includes "Chhatarpur, New Delhi" | High |
| ✅ | Google Search Console verification meta tag present | Critical |

---

## Critical (Do Now)

### C1 — Pre-render static HTML per product slug
**Why:** All 18 product pages have JS-rendered title, canonical, H1, and schema. Googlebot wave-1 indexes a generic shell — every product appears identical before JS fires.

**How:** A ~60-line Node.js script reads `PRODUCTS` from site.js and writes `/product/[slug].html` per entry with static title, meta description, canonical, H1, and Product schema pre-populated. No framework change needed.

**Effort:** 2–3 hours

---

## High (This Week)

### H1 — Submit sitemap to Google Search Console
- URL: https://theoutfithouse.in/sitemap.xml
- Open GSC → Sitemaps → Submit
- **Effort:** 2 minutes

### H2 — Submit sitemap to Bing Webmaster Tools
- https://www.bing.com/webmasters/
- Verify site + submit sitemap
- **Effort:** 15 minutes

### H3 — Create Google Business Profile
- Critical for "The Outfit House Chhatarpur" / "near me" local search
- Go to: https://business.google.com/
- Business name: The Outfit House | Category: Clothing Store / Shoe Store
- Address: Block A1, Chhatarpur, New Delhi 110074
- Phone: +91 87008 25707 | Hours: 12 PM – 9 PM, Daily
- **Effort:** 30 minutes + verification postcard (5–7 days)

### H4 — Add `<link rel="preload">` for LCP image on Category and Product pages
- Category.html: add preload before first product renders
- Product.html: add preload for gallery hero image
- **Effort:** 30 minutes

---

## Medium (This Month)

### M1 — Convert product images PNG → WebP
- 25–35% payload savings on 18 product images
- Use squoosh.app (free) or cwebp CLI
- Update img src in PRODUCTS array in site.js

### M2 — Add returns/refund policy page
- Create or expand /terms with clear exchange window, COD terms, sizing
- Required for YMYL trust signals

### M3 — Sizing guide content
- Add EU/US/UK/CM conversion table to SpecSheet or a /size-guide page
- Top pre-purchase query for sneaker buyers

### M4 — Optimise SpecSheet H1 + add Article schema
- Change "Spec Sheet" H1 to target "Entry vs Standard vs Vault Sneaker Grade Guide"
- Add Article schema for Google AIO citation eligibility

### M5 — Add CollectionPage schema to Category pages
- Each /sneakers, /apparel etc. page should have a CollectionPage schema block
- Helps Google understand page purpose

### M6 — Social proof section on Homepage
- Add 3–5 customer review snippets or order counter
- Consider AggregateRating schema once reviews are collected

---

## Low (Backlog)

### L1 — Add GST number to footer
- India-specific trust signal — add to renderFooter() in site.js

### L2 — Homepage H1 keyword value
- "Street. Sorted." has zero keyword signal
- Low priority: brand identity matters too

### L3 — External mentions (off-site, highest Sitelinks leverage)
- Post in r/IndianStreetWear on Reddit
- YouTube shorts showing QC process
- Tag @theoutfithouse.in in Instagram customer reposts
- Add website link in Instagram bio + WhatsApp status

### L4 — Gaurav Kumar / The Algothrim personal search presence
- Person schema is live — now needs external signals
- Fill in GitHub bio: "Co-founder, The Outfit House · Developer · The Algothrim"
- LinkedIn company page for The Outfit House (free, 30 min)
- One blog post or portfolio page referencing both identities

---

## Sitelinks Roadmap

Google Sitelinks appear automatically once all conditions are met:

| Condition | Status |
|---|---|
| WebSite + SearchAction schema | ✅ Done |
| Clean navigational structure (/sneakers, /apparel, /spec-sheet, /about, /contact) | ✅ Done |
| ClothingStore + Organization schema anchors brand name | ✅ Done |
| Brand search volume grows (people search "The Outfit House") | ❌ Off-site effort |
| Homepage inbound links (Instagram bio, WhatsApp link, directories) | ❌ Off-site effort |

**Estimated timeline:** 4–12 weeks after brand search volume picks up. All technical signals are now in place.
