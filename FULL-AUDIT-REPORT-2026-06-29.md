# The Outfit House Website Audit, 2026-06-29

Scope: live site at https://theoutfithouse.in, local website repo, company brief, business folder assets, and ledger repo context.

Context note: the store opened on 28 June 2026. This audit was run on 29 June 2026, so pre-launch copy is now stale.

Fix status: cleanup applied after this audit on 29 June 2026. The homepage is now post-launch, timings are aligned to 9am-11pm with studio visits called out as 12pm-8pm, sold-out product schema maps to `OutOfStock`, stale launch-offer copy was made durable, and the leftover branded WebP asset was removed. The Crocs wording was intentionally left in place by owner approval.

## Audit Health Score

| # | Dimension | Score | Key finding |
|---|---:|---:|---|
| 1 | Accessibility | 3 | Good structure, but some mobile/text links are under 44px touch height. |
| 2 | Performance | 3 | Static site is lean, no console errors, assets load, but there is a publicly reachable leftover branded image. |
| 3 | Responsive Design | 3 | Mobile homepage has no horizontal overflow at 390px, but stale launch copy dominates first fold. |
| 4 | Theming | 4 | Token system is intact and consistent with the brand context. |
| 5 | Anti-patterns | 3 | Strong brand direction overall, but the pre-launch countdown now feels outdated. |
| **Total** |  | **16/20** | **Good, needs a focused post-launch cleanup.** |

## Anti-Patterns Verdict

This does not read like a generic AI landing page. The industrial black/yellow system, dense catalog, real assets, and WhatsApp-first flow are distinctive. The current problem is not aesthetic slop. It is temporal drift: the homepage still behaves like opening day has not happened.

## Executive Summary

- Health score: 16/20.
- Issue count: P1 x 4, P2 x 5, P3 x 3.
- No blocking P0 found.
- The live homepage still says "Doors open 28 June 2026", asks users to reserve for opening day, and renders the opening countdown.
- Public-surface brand hygiene has regressed: "Crocs" appears in live homepage source three times.
- Product schema marks sold-out items as `BackOrder`, while the UI disables enquiry and says "Sold out".
- Contact and company brief say 9am-11pm, but homepage says 12-9 PM daily.
- Ledger repo is operationally useful for takings/capital/customer sales, but it is not a stock source for the website.

## Detailed Findings

### [P1] Homepage is still pre-launch

Location: `Homepage.html:530`, `Homepage.html:684-691`, `Homepage.html:705-710`, `Homepage.html:735`, `Homepage.html:937-970`

Category: Content accuracy / Responsive

Impact: On 29 June 2026, mobile first fold still tells visitors "Doors open 28 June 2026." The countdown now lands at zero and makes the store look stale immediately after launch.

Recommendation: Replace the launch/countdown section with an "Open now" store section. Update WhatsApp text from reservation/notify to visit, directions, and current stock enquiry.

Suggested command: `impeccable clarify Homepage.html`, then `impeccable polish`.

### [P1] Store hours conflict

Location: `Homepage.html:710`, `Contact.html:160`, `Contact.html:198-202`, company brief section 1

Category: Content accuracy / Local SEO

Impact: Homepage says "then 12-9 PM daily"; Contact and brief say 9am-11pm, with studio visits 12pm-8pm by booking. Customers and search engines get mixed signals.

Recommendation: Use one canonical presentation: WhatsApp 9am-11pm, studio visits 12pm-8pm by booking, walk-ins welcome if that is still true.

Suggested command: `impeccable clarify Homepage.html Contact.html`.

### [P1] Active public brand leak: Crocs

Location: `Homepage.html:573`, `Homepage.html:586`, `Homepage.html:611`

Category: Brand safety / Legal copy

Impact: The company brief explicitly bans original brand/model names in public copy, schema, alt text, slugs, filenames, and online surfaces. "Crocs" appears in live homepage source three times.

Recommendation: Replace with "clogs" or "molded clogs" everywhere.

Suggested command: `impeccable clarify Homepage.html`.

### [P1] Sold-out products are structured as backorderable

Location: `build.js:244-247`, generated sold PDPs such as `product/cotton-tee-cream/index.html:518`, fallback `Product.html:431`

Category: SEO / Structured data

Impact: UI says "Sold out" and disables WhatsApp, but JSON-LD says `BackOrder` for sold items. The dynamic fallback hard-codes `InStock`.

Recommendation: Map `stock:'sold'` to `https://schema.org/OutOfStock`, `stock:'in'` to `InStock`, and order-on-request sneakers to `BackOrder` or `PreOrder` deliberately. Update the JS fallback too.

Suggested command: `impeccable harden Product.html build.js`.

### [P2] Leftover branded asset is publicly reachable

Location: `assets/Sneakers/AJ1 Mid Panda (2).webp`

Category: Brand safety / Asset hygiene

Impact: The old branded filename returns `200 OK` from `https://theoutfithouse.in/assets/Sneakers/AJ1%20Mid%20Panda%20(2).webp`. Even if unlinked, it is still a public URL with banned wording.

Recommendation: Delete or rename the file, then confirm no references remain and deploy. If legacy traffic exists, add a neutral redirect only if Vercel handles asset redirects before static serving.

Suggested command: `impeccable harden assets`.

### [P2] Served CSS comments contain internal grade codes

Location: `colors_and_type.css:249`

Category: Brand safety / Public source hygiene

Impact: The live CSS includes "UA SPEC" and "7A QUALITY" in a comment. It is not visible UI, but it is still served publicly.

Recommendation: Rewrite the comment to "tier/spec labels" with Entry/Standard/Vault language.

Suggested command: `impeccable clarify colors_and_type.css`.

### [P2] Store schema lacks post-launch opening hours

Location: `Homepage.html:850-884`

Category: Local SEO / Structured data

Impact: Pre-launch audit intentionally removed opening hours. Now that the store is open, the `ClothingStore` schema should include accurate opening hours if the business wants local search consistency.

Recommendation: Add `openingHoursSpecification` matching the canonical hours after the copy decision is settled.

Suggested command: `impeccable harden Homepage.html`.

### [P2] Product descriptions remain templated

Location: `build.js:161-199`, generated PDP descriptions

Category: SEO / Content quality

Impact: Previous audit already flagged this. Top products still use formulaic descriptions, which is acceptable for breadth but weak for long-tail search and AI citations.

Recommendation: Add bespoke copy for the top in-stock pieces first: hero products, limited horse runner, key belts, denim, and best-selling sneakers.

Suggested command: `impeccable clarify build.js site.js`.

### [P2] Touch target polish

Location: live mobile homepage, product name links and footer policy/terms links

Category: Accessibility / Responsive

Impact: Core CTAs are usable, but several text links measure below 44px high on mobile. This is not catastrophic because many are inline text links, but product-card name links could be easier to tap.

Recommendation: Increase vertical padding or make product-card name/link rows full-height tap targets.

Suggested command: `impeccable adapt site.css`.

### [P3] Contact page still says grand-opening news

Location: `Contact.html:176`

Category: Content freshness

Impact: "Grand-opening news" is now slightly stale after launch.

Recommendation: Change to "store updates, new stock, and local announcements."

Suggested command: `impeccable clarify Contact.html`.

### [P3] About schema is slightly too backend-forward

Location: `About.html:365`

Category: Brand voice / Structured data

Impact: "High-grade sneaker sourcing network" is not a code leak, but it emphasizes sourcing rather than curation and QC.

Recommendation: Change to "catalog curation, product checks, and digital presence."

Suggested command: `impeccable clarify About.html`.

### [P3] Old reports and docs are intentionally internal but stale

Location: `FULL-AUDIT-REPORT.md`, `FULL-AUDIT-REPORT-2026-06-23.md`, `ACTION-PLAN.md`, `README.md`, `IMAGE-SOURCES.md`

Category: Repo docs

Impact: They contain old internal terms and brand examples. Current `robots.txt` disallows Markdown and Vercel redirects Markdown paths to `/`, so this is low risk. The docs are still useful historically.

Recommendation: Leave historical reports as-is unless you want a public-clean repository later.

Suggested command: none.

## Positive Findings

- Live sitemap is clean for old brand slugs and product URLs.
- Main pages have one `h1` each and no obvious missing image `alt` attributes in the checked set.
- Live homepage has no console errors in the in-app browser.
- Mobile homepage at 390px has no horizontal overflow.
- Static image assets checked over HTTP return `200 OK`.
- Security headers are present in `vercel.json`.
- `site.js` and `build.js` pass syntax checks.
- Catalog stock model is richer now: 154 products total, 47 in stock, 74 sold out, 33 order-on-request.

## Recommended Actions

1. [P1] `impeccable clarify Homepage.html`: convert launch countdown/reservation copy to "open now", fix hours, remove "Crocs".
2. [P1] `impeccable harden build.js Product.html`: fix product availability schema for in-stock, sold-out, and order-on-request states.
3. [P2] `impeccable harden assets`: remove or neutralize the leftover branded asset filename.
4. [P2] `impeccable clarify colors_and_type.css Contact.html About.html`: clean internal comments and stale/supporting copy.
5. [P2] `impeccable harden Homepage.html`: add accurate post-launch opening hours schema once hours are final.
6. [P3] `impeccable polish`: final visual and copy pass after fixes.

Re-run `impeccable audit` after fixes to see the score improve.
