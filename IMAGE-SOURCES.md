# Product Image Sources — The Outfit House

How to get clean product images for every brand we carry.
No hosting needed — we link directly to the brand's own CDN.

---

## The Process (Option C — Direct CDN embed)

1. Go to the brand's **official website** (or a trusted reseller listed below)
2. Find the exact product
3. Right-click the main product image → **"Copy image address"** (Chrome/Edge) or **"Copy Image Location"** (Firefox)
4. Paste that URL as the `img` value in the `PRODUCTS` array in `site.js`

> **Tip:** Zoom into the product image first (click to open full view) before copying — you'll get the highest-res URL instead of a thumbnail.

---

## Brand Directory

### SNEAKERS

| Brand | Where to get image URLs | CDN pattern |
|---|---|---|
| **Nike / Air Jordan** | nike.com product page | `static.nike.com/a/images/...` or `secure-images.nike.com/is/image/...` |
| **New Balance** | newbalance.com product page | `nb.scene7.com/is/image/NB/...` |
| **Adidas / Yeezy** | adidas.com or confirmed resellers | `assets.adidas.com/images/...` |
| **Puma** | puma.com product page | `images.puma.com/image/...` |
| **Reebok** | reebok.com product page | `reebok.scene7.com/is/image/...` |
| **Converse** | converse.com product page | `www.converse.com/dw/image/...` |
| **Vans** | vans.com product page | `images.vans.com/...` |
| **On Running** | on.com product page | `cdn.on-running.com/...` |

**Better for hard-to-find colourways:** Use StockX or GOAT product pages — they have clean white-background shots for every colourway.

---

### APPAREL

| Brand | Where to get image URLs | Notes |
|---|---|---|
| **Fear of God Essentials** | ssense.com or mytheresa.com | SSENSE has clean studio shots |
| **Sp5der** | goat.com or grailed.com | Search exact colourway |
| **Corteiz** | grailed.com or stockx.com | Corteiz doesn't have a public shop |
| **Supreme** | supremenewyork.com or grailed.com | supremenewyork has direct CDN links |
| **Stüssy** | stussy.com product page | Clean studio shots |
| **Carhartt WIP** | carhartt-wip.com | Consistent clean CDN |
| **Ralph Lauren / Polo** | ralphlauren.com or polo.com | `s7d2.scene7.com/is/image/Polo/...` |
| **Tommy Hilfiger** | tommy.com product page | Clean white-bg shots |
| **Lacoste** | lacoste.com product page | Good studio shots |
| **Zara** | zara.com product page | `static.zara.net/photos/...` |
| **H&M** | hm.com product page | `image.hm.com/assets/...` |
| **Uniqlo** | uniqlo.com product page | Very clean studio shots |

---

### ACCESSORIES / EYEWEAR

| Brand | Where to get image URLs | Notes |
|---|---|---|
| **Prada** | prada.com or ssense.com | SSENSE more accessible |
| **Tom Ford** | tomford.com or net-a-porter.com | net-a-porter has great flat shots |
| **Gucci** | gucci.com or farfetch.com | Farfetch often has multiple views |
| **Ray-Ban** | ray-ban.com product page | `media.ray-ban.com/is/image/...` |
| **Oakley** | oakley.com product page | Clean 3/4 view shots |
| **Gentle Monster** | gentlemonster.com | Their own site is clean |

---

## Multiple Views (front / side / back)

When you want to show several angles, look for these URL patterns:

**Nike Scene7 pattern** — just change the last number:
```
secure-images.nike.com/is/image/DPILLS/XXXXXX_001_A_PREM.jpg   ← front
secure-images.nike.com/is/image/DPILLS/XXXXXX_001_B_PREM.jpg   ← back
secure-images.nike.com/is/image/DPILLS/XXXXXX_001_C_PREM.jpg   ← sole / detail
```

**New Balance Scene7 pattern:**
```
nb.scene7.com/is/image/NB/MODELCODE_nb_01_i   ← side left
nb.scene7.com/is/image/NB/MODELCODE_nb_02_i   ← side right
nb.scene7.com/is/image/NB/MODELCODE_nb_03_i   ← top down
nb.scene7.com/is/image/NB/MODELCODE_nb_06_i   ← detail
```

---

## Stable vs Unstable URLs

| Stable (safe to use long-term) | Unstable (may expire) |
|---|---|
| Nike CDN (`static.nike.com`, `secure-images.nike.com`) | Shopify product images (contain `/cdn/shop/...`) |
| New Balance Scene7 (`nb.scene7.com`) | Instagram CDN (`cdninstagram.com`) |
| Adidas CDN (`assets.adidas.com`) | Dropbox / Google Drive links |
| SSENSE CDN (`ssense.com/en-ca/...`) | Amazon image links |
| Farfetch CDN (`cdn-images.farfetch-contents.com`) | |

> If a URL contains `/cdn/shop/files/` it's Shopify — links can rotate. Prefer official brand CDN over third-party shop images.

---

## Adding a New Product to site.js

```js
// In site.js → window.PRODUCTS array
{ 
  slug: 'nb-990v6-grey',          // URL-friendly ID — lowercase, hyphens only
  cat: 'sneakers',                 // sneakers | apparel | bottomwear | accessories
  brand: 'New Balance',            // display brand name
  name: '990v6 · Grey',           // display product name
  grade: 'UA 1:1',                 // UA 1:1 | 7A | Entry
  price: '₹7,899',
  was: '₹19,999',
  img: 'PASTE_CDN_URL_HERE'        // grab from newbalance.com or nb.scene7.com
},
```

---

## Future: Switch to Automated Fetching

When the catalogue grows beyond ~50 products, we can build a Node.js script that:
1. Takes brand + product name as input
2. Queries Google Custom Search Image API (free tier: 100/day)
3. Returns the best image URL automatically
4. Writes it into site.js

Ask Claude to build `scripts/fetch-images.js` when ready for this.

---

*Last updated: May 2026*
