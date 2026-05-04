# SEO Action Plan — The Outfit House
**theoutfithouse.in** · Generated 2026-05-04

Current score: **55 / 100** · Target after full implementation: **78–82 / 100**

---

## Critical — Fix Immediately

### C1 · Block `.git/` in vercel.json
**Impact:** Security + crawl budget. **Effort:** 5 min.

Add to vercel.json `redirects` array:
```json
{ "source": "/.git/:path*", "destination": "/404", "statusCode": 404 }
```

---

### C2 · Fix Product page: static canonical + title per slug
**Impact:** 18 product pages correctly indexed in SERPs. **Effort:** 2–4 hrs.

Option A (fastest): Write a `prebuild.js` script that generates one static HTML file per product slug, pre-filling `<title>`, `<meta name="description">`, and `<link rel="canonical">` into the `<head>`. Add `"build": "node prebuild.js"` to package.json. Vercel runs it on deploy.

Option B (simpler, same outcome): In `Product.html`, change the static fallback `<title>` to include a `data-slug` on the `<body>` and use `document.write` / `document.createElement` at the top of the inline `<script>` block, before any async execution, so the title is set synchronously on first parse.

Minimum viable fix for the static head fallback:
```html
<!-- In Product.html <head>, after existing static elements: -->
<title id="page-title">Product — The Outfit House</title>
<!-- JS at top of inline script block (synchronous): -->
<script>
  (function() {
    var params = new URLSearchParams(location.search);
    var slug = params.get('slug') || location.pathname.split('/').pop();
    var nameMap = {
      'aj1-mid-panda': 'AJ1 Mid · Panda',
      'nb-530-sea-salt': '530 · Cream Sea Salt',
      // ... (all 18 slugs)
    };
    var name = nameMap[slug];
    if (name) {
      document.getElementById('page-title').textContent = name + ' — The Outfit House';
      var c = document.createElement('link');
      c.rel = 'canonical';
      c.href = 'https://theoutfithouse.in/product/' + slug;
      document.head.appendChild(c);
    }
  }());
</script>
```

---

### C3 · Fix Instagram `sameAs` URL in Homepage schema
**Impact:** Organization entity graph. **Effort:** 2 min.

In `Homepage.html` lines 340 and 356, change:
```
"https://instagram.com/theoutfithouse.in"
```
to:
```
"https://www.instagram.com/theoutfithouse"
```
(Confirm actual Instagram handle before deploying.)

---

### C4 · Add address + telephone to ClothingStore schema
**Impact:** LocalBusiness rich results eligibility. **Effort:** 10 min.

In the ClothingStore schema block in Homepage.html, add:
```json
"address": {
  "@type": "PostalAddress",
  "streetAddress": "[your street]",
  "addressLocality": "New Delhi",
  "addressRegion": "DL",
  "postalCode": "[your pin code]",
  "addressCountry": "IN"
},
"telephone": "[your phone number]"
```

---

### C5 · Verify/add About page founder images
**Impact:** E-E-A-T, broken image prevention. **Effort:** 10 min.

Check if `assets/about/gaurav.png` and `assets/about/shivam.png` exist. If not, add photos or update the `<img src>` paths in About.html to correct locations.

---

## High — Fix Within 1 Week

### H1 · Add `WebSite` schema with `SearchAction`
**Impact:** Sitelinks search box eligibility. **Effort:** 15 min.

Add to Homepage.html's ld+json `@graph` array:
```json
{
  "@type": "WebSite",
  "@id": "https://theoutfithouse.in/#website",
  "url": "https://theoutfithouse.in",
  "name": "The Outfit House",
  "publisher": { "@id": "https://theoutfithouse.in/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://theoutfithouse.in/sneakers?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

### H2 · Fix ItemList URLs in schema
**Impact:** Rich result URLs resolve correctly. **Effort:** 5 min.

In Homepage.html schema block, change:
- `"https://theoutfithouse.in/Category.html?cat=sneakers"` → `"https://theoutfithouse.in/sneakers"`
- `"https://theoutfithouse.in/Product.html?slug=aj1-mid-panda"` → `"https://theoutfithouse.in/product/aj1-mid-panda"`
(and remaining 3 items)

---

### H3 · Add `seller`, `shippingDetails`, `hasMerchantReturnPolicy` to Product schema
**Impact:** Google Merchant Center / Shopping eligibility. **Effort:** 30 min.

Update the `ldScript.text` assignment in Product.html to the expanded schema template from the Schema Audit report (Fix 2). Key additions:
```json
"seller": { "@id": "https://theoutfithouse.in/#store" },
"shippingDetails": {
  "@type": "OfferShippingDetails",
  "shippingRate": { "@type": "MonetaryAmount", "value": "0", "currency": "INR" },
  "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "IN" }
},
"hasMerchantReturnPolicy": {
  "@type": "MerchantReturnPolicy",
  "applicableCountry": "IN",
  "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
  "merchantReturnDays": 7
}
```

---

### H4 · Add HSTS + CSP headers to vercel.json
**Impact:** Security posture, browser-enforced HTTPS. **Effort:** 10 min.

Add to the existing headers array in vercel.json:
```json
{ "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
{ "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'self'" }
```
Note: test CSP in report-only mode first (`Content-Security-Policy-Report-Only`) to avoid breaking inline scripts.

---

### H5 · Add `BreadcrumbList` schema to Product pages
**Impact:** Breadcrumb rich results in SERPs. **Effort:** 20 min.

Add to the `ldScript.text` in Product.html (alongside Product schema using `@graph`):
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://theoutfithouse.in" },
    { "@type": "ListItem", "position": 2, "name": cat.label, "item": "https://theoutfithouse.in/" + cat.key },
    { "@type": "ListItem", "position": 3, "name": p.name, "item": "https://theoutfithouse.in/product/" + p.slug }
  ]
}
```

---

## Medium — Fix Within 1 Month

### M1 · Add `width`/`height` to product card images
**Impact:** CLS fix. **Effort:** 15 min.

In `site.js` `renderProductCard()`, change:
```js
<img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async"/>
```
to:
```js
<img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" width="600" height="600"/>
```
(Adjust dimensions to match actual asset dimensions.)

---

### M2 · Convert product images to WebP
**Impact:** 25–35% smaller payloads, faster LCP on mobile. **Effort:** 2 hrs.

Use `cwebp` or Squoosh to convert all PNGs in `assets/Sneakers/`, `assets/Apparel/`, `assets/Bottomwear/`, `assets/Accessories/` to WebP. Update `renderProductCard()` to use `<picture>` with WebP source + PNG fallback:
```html
<picture>
  <source srcset="${p.img.replace('.png','.webp')}" type="image/webp"/>
  <img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" width="600" height="600"/>
</picture>
```

---

### M3 · Add LCP preload to Category and Product pages
**Impact:** Faster LCP on inner pages. **Effort:** 10 min.

In Category.html `<head>`: The first product image is unknown at static parse time (JS-rendered). Best option: add a generic preconnect to `theoutfithouse.in` origin for images, or add a predictable first-product image preload per category (requires knowing the first product in each category statically).

In Product.html `<head>`: Same constraint — image is slug-dependent. A synchronous inline script at the top of the body can inject the preload:
```html
<script>
  (function() {
    var slug = new URLSearchParams(location.search).get('slug') || location.pathname.split('/').pop();
    var imgMap = { 'aj1-mid-panda': 'assets/Sneakers/AJ1 Mid Panda (1).png', /* ... */ };
    if (imgMap[slug]) {
      var l = document.createElement('link');
      l.rel = 'preload'; l.as = 'image'; l.href = imgMap[slug]; l.setAttribute('fetchpriority','high');
      document.head.appendChild(l);
    }
  }());
</script>
```

---

### M4 · Create Returns/Refund Policy page (`/policy`)
**Impact:** YMYL trustworthiness. **Effort:** 1 hr.

Create `Policy.html` with clean content: exchange window (7 days), condition (unworn), process (WhatsApp photos), what's not covered. Add to vercel.json rewrites and footer navigation.

---

### M5 · Rewrite SpecSheet H1 for keyword targeting
**Impact:** Organic search discovery. **Effort:** 5 min.

Change SpecSheet.html H1 from "What you're paying for." to:
```
Entry, 7A and UA 1:1 Sneaker Grades — Explained
```
(or similar exact-match phrasing for the primary query)

---

### M6 · Add FAQ schema to Contact and SpecSheet pages
**Impact:** AI Overviews citability, Perplexity. **Effort:** 30 min.

For Contact.html — wrap the 5 FAQ Q&As in FAQPage schema (already in HTML as `<dl>` — easy to mirror).

For SpecSheet.html — the "Our Take" assessments in each tier block are natural FAQ candidates. Add a FAQPage schema block with 6–8 Q&As derived from these.

---

### M7 · Create `llms.txt`
**Impact:** AI crawler context — all AI platforms. **Effort:** 1 hr.

Create at site root:
```markdown
# The Outfit House

> New Delhi streetwear and alternative sneaker shop. Sells Entry, 7A, and UA 1:1 grade
> footwear and apparel via WhatsApp-first ordering. Physical studio in Chattarpur, New Delhi.
> Founded 2026 by Gaurav Kumar (digital/sourcing) and Shivam Kumar (operations/store).

## What We Sell
Alternative-grade sneakers, apparel, bottomwear, and accessories in three quality tiers.
Entry grade: PU-blend, glued sole, from ₹1,899. 7A grade: genuine leather, stitched sole,
from ₹3,899. UA 1:1: factory spec, premium materials, from ₹6,499.

## Grade Comparison
https://theoutfithouse.in/spec-sheet

## How to Order
WhatsApp. Browse online, message to confirm stock and price, pay via UPI or COD.
https://theoutfithouse.in/contact

## Pages
- https://theoutfithouse.in/
- https://theoutfithouse.in/about
- https://theoutfithouse.in/spec-sheet
- https://theoutfithouse.in/contact
- https://theoutfithouse.in/sneakers
- https://theoutfithouse.in/apparel
- https://theoutfithouse.in/bottomwear
- https://theoutfithouse.in/accessories
```

---

### M8 · Update robots.txt with AI crawler rules
**Impact:** Explicit AI cooperation signal. **Effort:** 5 min.

Add to robots.txt:
```
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

---

### M9 · Add social proof to Homepage
**Impact:** E-E-A-T Authoritativeness. **Effort:** 2 hrs.

Add a section with 4–6 customer testimonials (WhatsApp screenshot quotes, with permission). Format: name (first name + city), grade purchased, quote. Even anonymized ("Customer from Mumbai, UA 1:1 AJ1") is better than nothing.

---

## Low — Backlog

### L1 · Submit sitemap to Bing Webmaster Tools
Create a Bing Webmaster Tools account, verify ownership, submit `https://theoutfithouse.in/sitemap.xml`.

### L2 · Add GST number to footer
Update `renderFooter()` in site.js to include GST number near the copyright line.

### L3 · Add Google Business Profile link + map embed to Contact
Embed a Google Maps iframe and link to the GBP listing in Contact.html.

### L4 · Create LinkedIn company page
Low-effort authority signal for Bing Copilot and entity disambiguation.

### L5 · External mention strategy
Priority: one genuine Reddit post on r/IndianStreetwear. One YouTube haul/unboxing mentioning the store by name. These create the external co-occurrence signal that makes ChatGPT/Perplexity surface the brand organically.

### L6 · Create sizing guide page (`/sizing`)
UK/US/EU/CM conversion chart. Add to footer Help section.

### L7 · Fix footer logo alt text
In `renderFooter()` in site.js:
```js
<img src="assets/logo-text.png" alt="The Outfit House"/>
```

---

## Score Projection After Fixes

| Tier | Fixes Applied | Projected Score |
|---|---|---|
| Critical only (C1–C5) | 5 fixes, ~30 min total | 60–62 |
| + High (H1–H5) | +5 fixes, ~1.5 hrs | 67–69 |
| + Medium (M1–M9) | +9 fixes, ~8 hrs | 75–78 |
| + Low (L1–L7) | +7 fixes, ~4 hrs | 79–82 |

**Estimated full implementation time: 14–16 hours across all priority levels.**

The single highest-leverage session is Critical + High (2 hours) which jumps the score from 55 → ~68 and fixes the product page indexing problem that affects all 18 commercial URLs.
