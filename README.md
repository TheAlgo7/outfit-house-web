# The Outfit House — Design System

> Premium streetwear & sneaker store · New Delhi
> *Sneakers · Streetwear · Premium*

---

## 1. Brand Overview

**The Outfit House** is a digital-first streetwear and sneaker retailer based in
New Delhi. The store curates **7A and UA-grade** sneakers and apparel — premium
replicas positioned as a **value-driven alternative to overpriced originals**.

The brand voice is the opposite of typical hype-beast streetwear: *quiet
confidence, technical clarity, educated tone*. It explains **why** quality
matters (stitch counts, sole construction, grade definitions) instead of
shouting about drops.

The visual identity is **industrial and minimalist** — matte black surfaces,
warm eggshell type, and a single yellow accent used like a highlighter. The
logo sets a brush-script wordmark beneath a hand-drawn crown, which is the
brand's signature mark.

### Source materials provided

| File | Role |
| ---- | ---- |
| `uploads/TheOutfitHouse-Logo-BIg.png` | Full lockup (crown + wordmark + hanger/sneaker icon) |
| `uploads/tho-text-logo.png` | Crown + wordmark only (no product imagery) |
| `uploads/tho-crown-logo (favicon).png` | Crown mark — favicon / app icon |
| `uploads/insta Post (1).jpg` | Black tote bag on slatted wood — sample social asset |
| `uploads/Nike Air Jordan sneaker.jpg` | Product shot — Air Jordan 1 panda colorway |
| `uploads/New Balance sneaker.jpg` | Product shot — New Balance 530 cream |

All originals are copied into `assets/` for use in the system.

> No codebase or Figma file was supplied; this system is built from the brand
> brief and the uploaded brand assets. Every decision below is open for
> iteration — see the **CAVEATS** section at the bottom.

---

## 2. Content Fundamentals

**Voice:** confident, clean, premium — never loud. We sound like a
knowledgeable friend who happens to import the best replicas in Delhi, not a
hype account.

**Person:** prefer **second person ("you")** for product copy and CTAs; use
**first-person plural ("we")** sparingly when speaking about the store
itself ("we hand-check every pair"). Never first-person singular.

**Casing:**
- **UPPERCASE** for product titles, navigation, section headers, CTAs, spec
  labels (`UA SPEC`, `7A QUALITY`, `SIZE GUIDE`).
- **Sentence case** for body paragraphs and descriptions.
- **Title Case** is rarely used — feels too corporate.

**Tone words:** *technical, precise, understated, considered, raw.*
**Avoid:** *exclusive, drop, fire, insane, hype, limited (unless literally true).*

**Emoji:** **never in UI.** The crown mark replaces any decorative flourish.
The brand has its own iconography — emoji would cheapen it.

**Punctuation & rhythm:**
- Short, declarative sentences. Periods, not exclamation marks.
- Em-dashes for asides — like this — used sparingly.
- Bullets are fine for spec lists, but prefer table-style key/value rows for
  technical detail.

**Numbers & specs:** always with units. `42 EU`, `260 mm`, `₹4,499`.
Currency leads with `₹` for INR, no space.

**Examples — DO:**
> *Air Jordan 1 Mid · Panda*
> 7A construction. Genuine leather upper, stitched (not glued) sole, original
> tooling box. Sized true to Nike US.

> *Free shipping across India · Pay on delivery available*

**Examples — DON'T:**
> ~~🔥🔥 INSANE drop alert! Cop these AJ1s before they're GONE 🔥🔥~~
> ~~Hey guys, check out our amazing new arrivals!~~

---

## 3. Visual Foundations

### 3.1 Color

| Token | Hex | Role |
| --- | --- | --- |
| `--toh-black` | `#000000` | Primary background. Default surface. |
| `--toh-eggshell` | `#F2ECDD` | Primary text on dark; secondary background on light surfaces. |
| `--toh-hampton` | `#E8D3B2` | Warm neutral — muted text, subtle warm panels. |
| `--toh-yellow` | `#E3A848` | Accent **only**. CTAs, highlights, the crown mark. |

**80 / 15 / 5 rule:** ~80% black, ~15% eggshell/hampton, ~5% yellow. If
yellow appears more than once per primary view, it's overused.

Semantic tokens (`--bg`, `--fg`, `--fg-muted`, `--accent`, `--border`, …) are
the right interface for components. See `colors_and_type.css`.

### 3.2 Type

- **Display / Headings:** `Bebas Neue` (substitute for the bold-condensed
  geometric sans called for in the brief). UPPERCASE, tight tracking.
- **Body / UI:** `Inter` — neutral, geometric, excellent at small sizes.
- **Sub-display / Body-bold:** `Archivo` — geometric, slightly condensed,
  bridges Bebas → Inter.
- **Brush expressive:** `Permanent Marker` — used **only** in marketing
  graphics that echo the logo (posters, hero takeovers). **Never in UI.**

Eyebrows / spec labels use Archivo 600 at 11px with `letter-spacing: 0.16em`
in UPPERCASE — this is the "UA SPEC" / "7A QUALITY" treatment.

> ⚠ **Font substitution flag.** The brief asks for "bold, condensed, geometric
> sans-serif" without naming files. We've defaulted to Google Fonts equivalents
> (Bebas Neue / Archivo / Inter / Permanent Marker). If you have specific
> licensed faces (e.g. *Druk Wide*, *Neue Haas Grotesk*, *Beastly*, a custom
> brush), drop the `.woff2` files in `fonts/` and we'll wire them up.

### 3.3 Spacing

A **4 px base** scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128`.
Layouts breathe — section padding rarely drops below `48 px` desktop / `32 px`
mobile. Negative space is a feature, not waste.

### 3.4 Backgrounds

- **Default:** flat matte black `#000`. No gradients on full backgrounds.
- **Elevated surfaces:** `#141414` cards, with a 1 px `rgba(eggshell, 0.10)`
  inner border — never a hard divider.
- **Glass overlays:** `rgba(20, 20, 20, 0.55)` + `backdrop-filter: blur(16px)`
  for product spec panels that float over imagery. This is the brand's
  signature treatment.
- **Light surfaces:** eggshell `#F2ECDD` for editorial / about pages, with
  black type. Never used for primary commerce flows.
- **Imagery:** product shots are studio-lit, warm neutral background or pure
  white cut-outs. Lifestyle imagery is **warm, low-key, slightly grainy** —
  matte wood, concrete, soft shadows. Never cool / blue / over-saturated.

### 3.5 Borders & dividers

- **1 px solid `rgba(eggshell, 0.10)`** is the default border.
- Stronger emphasis: `rgba(eggshell, 0.20)`.
- **No rounded-corner-with-colored-left-border cards.** That trope is
  forbidden.
- Dividers are full-width, no inset.

### 3.6 Corner radii

Industrial = sharp. The system defaults to **0 / 2 / 4 px** for almost
everything. `8 px` for cards. `16 px` for modals only. Pills (`999 px`) are
reserved for product tags ("7A", "IN STOCK").

### 3.7 Shadows & elevation

Three steps, all neutral black — no colored shadows except a single optional
`--shadow-glow-yellow` for hover on yellow CTAs.

| Level | Use |
| --- | --- |
| `shadow-1` | Buttons, chips |
| `shadow-2` | Cards lifting off the page |
| `shadow-3` | Modals, popovers |

### 3.8 Animation

- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (`--ease-out`) for most
  transitions. Snappy ramp-down, no bounce.
- **Durations:** `150ms` micro / `220ms` base / `400ms` slow.
- **Hover:** 1.02× scale on product cards; opacity 0.7 on icon buttons;
  underline grows from 0 → 100% on text links. **Never** color-shift on hover
  for primary copy.
- **Press:** 0.98× scale, no color change.
- **Page transitions:** crossfade only. No slide-ins, no parallax theatre.

### 3.9 Transparency & blur

Used **only** for the glass spec-panel pattern (see 3.4) and the sticky
header on scroll (`rgba(0,0,0,0.65)` + `blur(12px)`). Everywhere else,
surfaces are opaque.

### 3.10 Layout rules

- **Mobile-first.** Every breakpoint up from `375 px`.
- **Container max:** `1280 px` for product grids, `1440 px` for editorial
  hero sections.
- **Grid:** 12-column desktop / 4-column mobile, `24 px` gutters.
- **Sticky:** header sticks; nothing else. No floating help bubbles, no
  cookie banners stuck to the bottom in design comps.

### 3.11 Cards

```
matte-black bg · 1px inner border · 8px radius · shadow-2 on hover
image fills full width edge-to-edge · 24px padding inside text block
```

Product cards have no visible border by default — they rely on the
background contrast. The border appears on hover.

---

## 4. Iconography

The brand has **no in-house icon set**. The system uses **Lucide** (via CDN)
because its **stroke style and geometry** match the technical, minimal feel:
1.5 px stroke, square caps, geometric construction.

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<i data-lucide="shopping-bag"></i>
```

> ⚠ **Substitution flag.** No icon set was provided. Lucide is the closest
> match to the brief's "minimalist, technical" feel. If you adopt a paid set
> (Phosphor Bold, Material Symbols Sharp, custom drawn), swap the import in
> `colors_and_type.css` and update the `Iconography` card in `preview/`.

**Other marks used as icons:**
- The **crown** (`assets/logo-crown.png`) is treated as a brand icon — used
  alone for favicon, app touch icon, tags ("crown picks"), and as a tiny
  monogram inside product imagery. Never recoloured away from yellow.
- **Emoji:** **never used in UI.**
- **Unicode glyphs:** acceptable as separators (`·`, `—`, `→`) inside
  uppercase eyebrow strings — see the logo lockup
  (`SNEAKERS · STREETWEAR · PREMIUM`).

---

## 5. Index

```
README.md                   ← you are here
colors_and_type.css         ← all design tokens (CSS vars + base type)
SKILL.md                    ← Agent Skills entry point
assets/                     ← logos, product imagery, brand graphics
preview/                    ← design-system preview cards (one HTML per concept)
ui_kits/
  ecommerce/                ← marketing site + product detail + cart UI kit
    index.html              ← interactive click-thru
    README.md
    Header.jsx
    ProductCard.jsx
    ProductDetail.jsx
    Cart.jsx
    Footer.jsx
    Buttons.jsx
  social/                   ← Instagram post template
    index.html
    PostFrame.jsx
```

---

## 6. CAVEATS — please review

1. **Fonts are Google Fonts substitutions.** If you have licensed display
   fonts (Druk, Beastly, your custom brush), share them and I'll swap them
   in across all CSS + cards.
2. **No real product catalog.** Product names, prices, and copy in the UI
   kit are illustrative. Send a CSV / sheet and I'll repopulate.
3. **No codebase or Figma was attached.** All components are designed from
   the brief — they reflect *intent*, not an existing implementation. If you
   already have a Shopify theme / Next.js storefront, attach it and I'll
   reconcile.
4. **Iconography is Lucide via CDN.** Confirm or swap.
5. **No photography direction beyond the two product shots provided.** I've
   inferred warm / matte-wood lifestyle imagery from the Insta tote post —
   please send moodboards if you want a different direction.

---

**Bold ask →** Send (a) any licensed font files, (b) a real product list with
prices, and (c) 4–6 lifestyle / studio reference photos so we can lock the
imagery rules. With that, I can promote this from "well-grounded starter" to
"production-ready system" in one pass.
