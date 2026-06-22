#!/usr/bin/env node
/* ============================================================================
 * The Outfit House — static catalog builder + brand-name purge
 * ----------------------------------------------------------------------------
 * Single source of truth = the PRODUCTS / CATEGORIES literals inside site.js.
 * This script:
 *   1. Extracts that catalog data from site.js.
 *   2. Derives a clean, BRAND-FREE slug + image path for every product
 *      (silhouette + colour, per the Company Brief section 3 naming rule).
 *   3. (migration) Renames the image files, rewrites the PRODUCTS block in
 *      site.js with the clean data, and records old->new slug redirects.
 *   4. Pre-renders a fully static, crawlable page for every product
 *      (/product/<slug>/index.html) and every category (/<cat>/index.html),
 *      with baked-in title/meta/canonical/OG, body content, JSON-LD schema,
 *      static header/footer, and the SVG sprite — no JS required to read them.
 *   5. Regenerates sitemap.xml (all products + categories + core pages).
 *
 * Re-runnable: once data/images are clean it is effectively idempotent.
 * Usage:  node build.js
 * ========================================================================== */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE_JS = path.join(ROOT, 'site.js');
const ORIGIN = 'https://theoutfithouse.in';
const TODAY = new Date().toISOString().slice(0, 10);

const CAT_DIR = { sneakers: 'Sneakers', apparel: 'Apparel', bottomwear: 'Bottomwear', accessories: 'Accessories' };

/* ---------- helpers ---------- */
function balanced(text, openIdx, open, close) {
  let depth = 0;
  for (let i = openIdx; i < text.length; i++) {
    if (text[i] === open) depth++;
    else if (text[i] === close) { depth--; if (depth === 0) return i; }
  }
  throw new Error('unbalanced ' + open);
}
function extractLiteral(src, decl, open, close) {
  const at = src.indexOf(decl);
  if (at < 0) throw new Error('not found: ' + decl);
  const openIdx = src.indexOf(open, at);
  const closeIdx = balanced(src, openIdx, open, close);
  return { text: src.slice(openIdx, closeIdx + 1), start: openIdx, end: closeIdx + 1 };
}
function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/&/g, ' ')
    .replace(/·/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function jsq(s) { return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"; }

/* ---------- load site.js + catalog ---------- */
let siteSrc = fs.readFileSync(SITE_JS, 'utf8');
const prodLit = extractLiteral(siteSrc, 'window.PRODUCTS', '[', ']');
const catLit = extractLiteral(siteSrc, 'window.CATEGORIES', '{', '}');
const PRODUCTS = eval('(' + prodLit.text + ')');
const CATEGORIES = eval('(' + catLit.text + ')');

/* ---------- derive clean slug + img (brand-free) ---------- */
const seen = new Map();
const redirects = []; // {from, to}
let renamed = 0, missing = [];

PRODUCTS.forEach(p => {
  let base = slugify((p.brand && p.brand !== 'TOH' ? p.brand + ' ' : (p.brand === 'TOH' ? 'toh ' : '')) + p.name);
  if (!base) base = slugify(p.name) || p.slug;
  let slug = base, n = 2;
  while (seen.has(slug)) slug = base + '-' + (n++);
  seen.set(slug, true);

  const dir = CAT_DIR[p.cat] || 'Sneakers';
  const newImg = 'assets/' + dir + '/' + slug + '.webp';

  p._oldSlug = p.slug;
  p._oldImg = p.img;
  p._newSlug = slug;
  p._newImg = newImg;
});

/* ---------- migrate: rename images + record redirects ---------- */
PRODUCTS.forEach(p => {
  if (p._oldImg !== p._newImg) {
    const from = path.join(ROOT, p._oldImg);
    const to = path.join(ROOT, p._newImg);
    if (fs.existsSync(from)) {
      fs.renameSync(from, to);
      renamed++;
    } else if (!fs.existsSync(to)) {
      missing.push(p._newImg + '  (source missing: ' + p._oldImg + ')');
    }
  }
  if (p._oldSlug !== p._newSlug) {
    redirects.push({ from: '/product/' + p._oldSlug, to: '/product/' + p._newSlug });
  }
});

/* ---------- rewrite PRODUCTS block in site.js with clean data ---------- */
const newProductsText = '[\n' + (() => {
  const groups = { sneakers: [], apparel: [], bottomwear: [], accessories: [] };
  PRODUCTS.forEach(p => { (groups[p.cat] || (groups[p.cat] = [])).push(p); });
  const labels = { sneakers: 'Sneakers', apparel: 'Apparel', bottomwear: 'Bottomwear', accessories: 'Accessories' };
  let out = [];
  Object.keys(groups).forEach(cat => {
    out.push('  // ---------- ' + (labels[cat] || cat) + ' ----------');
    groups[cat].forEach(p => {
      let f = '  { slug:' + jsq(p._newSlug) + ', cat:' + jsq(p.cat) + ', ';
      if (p.stock) f += 'stock:' + jsq(p.stock) + ', ';
      if (p.sizes) f += 'sizes:' + jsq(p.sizes) + ', ';
      if (p.limited) f += 'limited:true, ';
      f += 'brand:' + jsq(p.brand) + ', name:' + jsq(p.name) + ', grade:' + jsq(p.grade) + ', img:' + jsq(p._newImg);
      if (p.imgs && p.imgs.length) f += ', imgs:[' + p.imgs.map(jsq).join(', ') + ']';
      f += ' },';
      out.push(f);
    });
  });
  return out.join('\n');
})() + '\n' + ']';

siteSrc = siteSrc.slice(0, prodLit.start) + newProductsText + siteSrc.slice(prodLit.end);
fs.writeFileSync(SITE_JS, siteSrc, 'utf8');

// reflect clean slugs/img onto working objects
PRODUCTS.forEach(p => { p.slug = p._newSlug; p.img = p._newImg; });

/* ---------- load header/footer/sprite from site.js (shimmed) ---------- */
global.window = { addEventListener() {}, removeEventListener() {} };
global.document = {
  addEventListener() {}, removeEventListener() {},
  getElementById() { return null; }, querySelector() { return null; }, querySelectorAll() { return []; },
  createElement() { return { style: {}, set innerHTML(v) {}, appendChild() {} }; },
  body: { appendChild() {}, style: {} }, readyState: 'complete'
};
delete require.cache[require.resolve('./site.js')];
require('./site.js');
const renderHeader = global.window.renderHeader;
const renderFooter = global.window.renderFooter;
// sprite markup straight out of injectSprite's template
const spriteMatch = siteSrc.match(/s\.innerHTML\s*=\s*`([\s\S]*?)`;/);
const SPRITE = spriteMatch ? '<div id="tho-sprite" style="display:none">' + spriteMatch[1] + '</div>' : '';

/* ---------- shared <style> blocks from the existing templates ---------- */
function styleOf(file) {
  const t = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const m = t.match(/<style>[\s\S]*?<\/style>/);
  return m ? m[0] : '';
}
const PDP_STYLE = styleOf('Product.html');
const CAT_STYLE = styleOf('Category.html');

/* ---------- copy decks (brand-free, per Company Brief lead-words) ---------- */
const TIER_BUILD = {
  Entry: 'Entry tier: PU-blend leather build, glued sole, protective dust bag.',
  Standard: 'Standard tier: genuine leather, stitched sole, original tooling box and paper tags.',
  Vault: 'Vault tier: premium full-grain leather, precision factory stitching, full retail packaging.'
};
const CAT_BUILD = {
  sneakers: { Entry: 'PU-blend upper, glued sole, soft-sole comfort, protective dust bag.', Standard: 'Genuine leather upper, stitched sole, original tooling box and paper tags.', Vault: 'Premium full-grain leather, precision stitching, full retail packaging and accessories.' },
  apparel: { Entry: 'Cotton-blend body, clean print, everyday weight.', Standard: 'Heavyweight cotton, true-to-original fit, original tags.', Vault: 'Premium heavyweight construction, exact tooling, full tags and packaging.' },
  bottomwear: { Entry: 'Cotton-blend, everyday cut, clean finish.', Standard: 'Heavyweight fabric, original cut, branded hardware.', Vault: 'Premium heavyweight fabric, precise cut, full hardware and tags.' },
  accessories: { Entry: 'Premium build, hand-checked finish, protective packaging.', Standard: 'Genuine leather / premium materials, hand-checked, original-style packaging.', Vault: 'Top-grade materials, precision finish, full retail packaging.' }
};
function describe(p) {
  const cat = CATEGORIES[p.cat] || {};
  const build = (CAT_BUILD[p.cat] || {})[p.grade] || TIER_BUILD[p.grade] || '';
  const piece = p.brand === 'TOH' ? p.name : (p.brand + ' in ' + p.name);
  return `${piece}. ${build} Hand-checked in Chhatarpur, New Delhi, with real QC photos shared on WhatsApp before dispatch. Price on enquiry, ships PAN-India.`;
}
function altText(p) {
  const piece = p.brand === 'TOH' ? p.name : (p.brand + ', ' + p.name);
  return piece + ' — ' + p.grade + ' tier, The Outfit House';
}

/* ---------- shared <head> partial ---------- */
function head(opts) {
  return `<meta charset="utf-8"/>
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.desc)}"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="canonical" href="${opts.canonical}"/>
<link rel="shortcut icon" href="/favicon.ico"/>
<link rel="icon" type="image/png" href="${ORIGIN}/assets/logo-black.png"/>
<link rel="apple-touch-icon" href="${ORIGIN}/assets/logo-black.png"/>
<meta property="og:type" content="${opts.ogType || 'website'}"/>
<meta property="og:url" content="${opts.canonical}"/>
<meta property="og:title" content="${esc(opts.title)}"/>
<meta property="og:description" content="${esc(opts.desc)}"/>
<meta property="og:image" content="${opts.ogImage || ORIGIN + '/assets/social-preview-tho.jpg'}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta name="twitter:card" content="summary_large_image"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/bebasneue/v16/JTUSjIg69CK48gW7PXoo9Wlhyw.woff2"/>
<link rel="preload" as="font" type="font/woff2" crossorigin href="https://fonts.gstatic.com/s/archivo/v25/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxI.woff2"/>
<link rel="stylesheet" media="print" onload="this.media='all'" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Archivo:wght@400;500;600;700;800;900&display=swap"/>
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Archivo:wght@400;500;600;700;800;900&display=swap"/></noscript>
<link rel="stylesheet" href="/colors_and_type.css"/>
<link rel="stylesheet" href="/site.css"/>`;
}

/* ---------- static product card (matches renderProductCard markup) ---------- */
function card(p) {
  const g = p.grade.toLowerCase();
  const sold = p.stock === 'sold';
  const altImg = (p.imgs && p.imgs.length)
    ? `<img class="pc-img-alt" src="/${esc(p.imgs[0])}" alt="" aria-hidden="true" decoding="async" width="600" height="600"/>` : '';
  // Limited cards carry a single hero badge (the limited mark) instead of the grade
  // chip, so the small image never has two competing pills overlapping it.
  const limited = (p.limited && !sold);
  const badge = sold ? '<span class="pc-grade sold">Sold out</span>'
    : (limited ? '<span class="pc-limited">Limited Edition</span>'
    : `<span class="pc-grade ${g}">${esc(p.grade)}</span>`);
  let status = '';
  if (sold) status = '<span class="pc-stock sold">Sold out</span>';
  else if (p.stock === 'in') status = '<span class="pc-stock">In stock now</span>';
  const sizes = (!sold && p.stock === 'in' && p.sizes) ? `<span class="pc-sizes">UK ${esc(p.sizes)}</span>` : '';
  const cta = sold
    ? '<button class="pc-cta" type="button" disabled aria-disabled="true">Sold out</button>'
    : `<button class="pc-cta" type="button" data-slug="${esc(p.slug)}" data-name="${esc(p.name)}" data-grade="${esc(p.grade)}"><svg><use href="#wa-icon"/></svg> Enquire on WhatsApp</button>`;
  return `<div class="pc${p.limited ? ' pc--limited' : ''}${sold ? ' pc--sold' : ''}" data-grade="${esc(p.grade)}" data-search="${esc((p.brand + ' ' + p.name + ' ' + p.grade).toLowerCase())}">
  <div class="pc-img">
    ${badge}
    <img src="/${esc(p.img)}" alt="${esc(altText(p))}" loading="lazy" decoding="async" width="600" height="600" onerror="this.onerror=null;this.src='/assets/placeholder.svg'"/>
    ${altImg}
  </div>
  <div class="pc-body">
    <span class="pc-brand">${esc(p.brand)}</span>
    <a class="pc-name" href="/product/${esc(p.slug)}">${esc(p.name)}</a>
    ${status}
    ${sizes}
    ${cta}
  </div>
</div>`;
}

/* ---------- product schema ---------- */
function productSchema(p, cat) {
  const url = ORIGIN + '/product/' + p.slug;
  const avail = p.stock === 'in' ? 'https://schema.org/InStock' : 'https://schema.org/BackOrder';
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': url + '#product',
        name: p.name,
        description: describe(p),
        image: [ORIGIN + '/' + p.img],
        sku: p.slug,
        category: cat.label,
        brand: { '@type': 'Brand', name: 'The Outfit House' },
        itemCondition: 'https://schema.org/NewCondition',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          availability: avail,
          url: url,
          seller: { '@id': ORIGIN + '/#store' },
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'IN' },
            deliveryTime: { '@type': 'ShippingDeliveryTime', handlingTime: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2, unitCode: 'DAY' }, transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 5, unitCode: 'DAY' } }
          },
          hasMerchantReturnPolicy: { '@type': 'MerchantReturnPolicy', applicableCountry: 'IN', returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow', merchantReturnDays: 7, returnMethod: 'https://schema.org/ReturnByMail', returnFees: 'https://schema.org/FreeReturn' }
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: ORIGIN },
          { '@type': 'ListItem', position: 2, name: cat.label, item: ORIGIN + '/' + cat.key },
          { '@type': 'ListItem', position: 3, name: p.name, item: url }
        ]
      }
    ]
  });
}

/* ---------- size + spec sets (mirror Product.html) ---------- */
const SIZE_SETS = {
  sneakers: { label: 'Select size · UK', note: 'UK sizing', sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'] },
  apparel: { label: 'Select size', note: 'Unisex fit', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  bottomwear: { label: 'Select size', note: 'Unisex fit', sizes: ['S', 'M', 'L', 'XL', 'XXL'] },
  accessories: { label: '', note: '', sizes: [] }
};
const SPEC_SETS = {
  sneakers: [['Upper', 'Premium leather'], ['Sole', 'Cushioned rubber'], ['Box', 'Original tooling']],
  apparel: [['Fabric', 'Heavyweight cotton'], ['Fit', 'True to original'], ['Tags', 'Original tags']],
  bottomwear: [['Fabric', 'Heavyweight'], ['Fit', 'As original'], ['Hardware', 'Branded']],
  accessories: [['Material', 'Premium build'], ['Finish', 'Hand-checked'], ['Packaging', 'Original-style']]
};

/* ---------- render a product page ---------- */
function productPage(p) {
  const cat = CATEGORIES[p.cat] || CATEGORIES.sneakers;
  const title = p.name + ' | The Outfit House';
  const desc = describe(p);
  const url = ORIGIN + '/product/' + p.slug;
  const sold = p.stock === 'sold';
  const gallery = [p.img].concat(p.imgs || []);
  const sizeSet = SIZE_SETS[p.cat] || SIZE_SETS.sneakers;
  const inStockSizes = (p.stock === 'in' && p.sizes) ? p.sizes.split(',').map(s => 'UK ' + s.trim()) : null;
  const sizeList = inStockSizes || sizeSet.sizes;
  const sizeLabel = inStockSizes ? 'In stock now · UK' : sizeSet.label;
  const specSet = (SPEC_SETS[p.cat] || SPEC_SETS.sneakers).concat([['Tier', p.grade]]);
  const sizesHtml = sizeList.map(s => `<button class="size" type="button" aria-pressed="false">${esc(s)}</button>`).join('');
  const specsHtml = specSet.map(r => `<div class="spec"><div class="k">${esc(r[0])}</div><div class="v">${esc(r[1])}</div></div>`).join('');
  let related = PRODUCTS.filter(x => x.slug !== p.slug && x.cat === p.cat).slice(0, 3);
  if (related.length < 3) related = related.concat(PRODUCTS.filter(x => x.slug !== p.slug && x.cat !== p.cat).slice(0, 3 - related.length));

  return `<!doctype html>
<html lang="en">
<head>
${head({ title, desc, canonical: url, ogType: 'product', ogImage: ORIGIN + '/' + p.img })}
${PDP_STYLE}
</head>
<body>
<a href="#main-content" class="skip-link">Skip to content</a>
${SPRITE}
<div id="header-mount">${renderHeader(cat.label)}</div>

<nav class="crumbs" aria-label="Breadcrumb">
  <a href="/">Home</a><span class="sep">/</span>
  <a href="/${cat.key}">${esc(cat.label)}</a><span class="sep">/</span>
  <span aria-current="page">${esc(p.name)}</span>
</nav>

<main id="main-content" class="pdp">
  <div class="gallery">
    <div class="gal-main">
      ${p.limited ? '<span class="gal-limited">Limited edition</span>' : ''}
      <span class="gal-grade ${sold ? 'sold' : p.grade.toLowerCase()}">${sold ? 'Sold out' : esc(p.grade)}</span>
      <img id="gal-img" src="/${esc(p.img)}" alt="${esc(altText(p))}" width="900" height="900" onerror="this.onerror=null;this.src='/assets/placeholder.svg'"/>
    </div>
    ${gallery.length > 1 ? `<div class="gal-thumbs">${gallery.map((src, i) => `<button class="gal-thumb${i === 0 ? ' sel' : ''}" type="button" data-src="/${esc(src)}" aria-label="View image ${i + 1}"><img src="/${esc(src)}" alt="" loading="lazy" decoding="async" width="120" height="120"/></button>`).join('')}</div>` : ''}
  </div>

  <div class="info">
    <div>
      <span class="brandtag">${esc(p.brand)}</span>
      <h1>${esc(p.name)}</h1>
      ${p.limited ? '<p class="pdp-limited">Limited edition, special release. Not a standard colourway, secured in very small numbers.</p>' : ''}
    </div>
    <div class="price-row">
      <span class="price">${sold ? 'Currently unavailable' : 'Price on enquiry'}</span>
      ${sold ? '<span class="pdp-stock sold">Sold out</span>' : (p.stock === 'in' ? `<span class="pdp-stock">In stock now · ready to ship${p.sizes ? ' · UK ' + esc(p.sizes) : ''}</span>` : '')}
      <span class="price-note">${sold ? 'This piece is sold out online right now. Ask in store for availability.' : 'Best price shared on WhatsApp · we run regular launch offers'}</span>
    </div>

    <p class="pdp-desc">${esc(desc)}</p>

    ${!sold && sizeList.length ? `<div class="size-block">
      <h2 class="pdp-section-title">${esc(sizeLabel)}</h2>
      <div class="sizes" id="sizes">${sizesHtml}</div>
      <div class="size-help">
        <a href="#" onclick="wa('Hi! I need help with sizing.');return false;">Not sure? Ask on WhatsApp</a>
        <span>${esc(inStockSizes ? 'Other sizes arranged on request' : sizeSet.note)}</span>
      </div>
    </div>` : ''}

    ${sold ? '<div class="cta-row"><span class="sold-note">Sold out online</span></div>' : `<div class="cta-row">
      <button class="btn-wa" type="button" id="enquire-btn"><svg><use href="#wa-icon"/></svg> Enquire on WhatsApp</button>
      <a class="btn-ghost" href="#" onclick="wa('Hi! Share more photos of ${esc(p.name)}. ${url}');return false;">Request more photos</a>
    </div>`}

    <div class="spec-block">
      <h2 class="pdp-section-title">Spec highlights</h2>
      <div class="specs">${specsHtml}</div>
    </div>

    <div class="policy-block">
      <h2 class="pdp-section-title">Shipping &amp; policy</h2>
      <div class="policy">
        <div class="policy-item"><svg aria-hidden="true"><use href="#truck"/></svg><div><div class="lab">Shipping</div><div class="val">PAN-India 2–5 days · cost shared on WhatsApp · discreet packing</div></div></div>
        <div class="policy-item"><svg aria-hidden="true"><use href="#shield"/></svg><div><div class="lab">QC photos</div><div class="val">Real photos of your piece before dispatch · you confirm first</div></div></div>
        <div class="policy-item"><svg aria-hidden="true"><use href="#mail"/></svg><div><div class="lab">Payment</div><div class="val">UPI · Bank transfer · COD in most metros</div></div></div>
        <div class="policy-item"><svg aria-hidden="true"><use href="#rotate"/></svg><div><div class="lab">Exchange</div><div class="val">Case-by-case · 360° unboxing video required for claims</div></div></div>
      </div>
      <a class="size-help" style="display:block;margin-top:16px" href="/terms">Read the full House Rules →</a>
    </div>
  </div>
</main>

<section class="sec related">
  <div class="wrap">
    <div class="sec-head"><div><span class="eyebrow">You might like</span><h2>More pairs.</h2></div></div>
    <div class="products-grid">${related.map(card).join('')}</div>
  </div>
</section>

<div id="footer-mount">${renderFooter()}</div>

<script type="application/ld+json">${productSchema(p, cat)}</script>
<script src="/site.js"></script>
<script>
  initHeader();
  (function(){
    var sizes = Array.prototype.slice.call(document.querySelectorAll('#sizes .size'));
    var sel = null;
    sizes.forEach(function(b){ b.addEventListener('click', function(){ sel = b.textContent; sizes.forEach(function(x){ x.classList.toggle('sel', x===b); x.setAttribute('aria-pressed', String(x===b)); }); }); });
    function enquire(){
      var parts = ['Hi! I want to enquire about ${p.name.replace(/'/g, "\\'")} (${p.grade})'];
      if (sizes.length) parts.push(sel ? 'size ' + sel : 'available sizes');
      wa(parts.join(', ') + '. Could you share the price and real photos? ${url}');
    }
    var eb = document.getElementById('enquire-btn'); if (eb) eb.addEventListener('click', enquire);
    var gal = document.getElementById('gal-img');
    document.querySelectorAll('.gal-thumb').forEach(function(t){
      t.addEventListener('click', function(){
        if (gal) gal.src = t.dataset.src;
        document.querySelectorAll('.gal-thumb').forEach(function(x){ x.classList.toggle('sel', x===t); });
      });
    });
    document.querySelectorAll('.pc-cta').forEach(function(btn){
      btn.addEventListener('click', function(e){ e.stopPropagation(); if (btn.disabled) return; wa('Hi! I want to enquire about ' + btn.dataset.name + ' (' + btn.dataset.grade + '). Available sizes? ' + location.origin + '/product/' + btn.dataset.slug); });
    });
  })();
</script>
</body>
</html>`;
}

/* ---------- accessory type grouping (keeps the accessories page from cluttering) ---------- */
const ACC_GROUPS = [
  ['Watches', /watch/],
  ['Sunglasses', /sunglass|glasses/],
  ['Bags', /bag|tote|backpack|duffle|crossbody|sling/],
  ['Wallets & Card Holders', /wallet|card holder/],
  ['Headwear', /\bcap\b|beanie|bucket|hat/],
  ['Belts', /belt/],
  ['Socks', /sock/]
];
function accGroup(p) {
  const t = (p.brand + ' ' + p.name).toLowerCase();
  for (const [label, re] of ACC_GROUPS) if (re.test(t)) return label;
  return 'Other';
}

/* ---------- render a category page ---------- */
function categoryPage(catKey) {
  const cat = CATEGORIES[catKey];
  const list = PRODUCTS.filter(p => p.cat === catKey);
  const title = cat.title + ' | The Outfit House';
  const url = ORIGIN + '/' + catKey;
  const grouped = catKey === 'accessories';
  let desc, tabs, gridHtml, emptyMsg;
  if (grouped) {
    desc = cat.title + ': browse watches, sunglasses, bags, wallets, caps, belts and socks at The Outfit House, grouped by type. Real photos before dispatch, ships PAN-India.';
    const order = ACC_GROUPS.map(g => g[0]).concat(['Other']);
    const byType = {};
    list.forEach(p => { const g = accGroup(p); (byType[g] || (byType[g] = [])).push(p); });
    const active = order.filter(g => byType[g] && byType[g].length);
    tabs = [['all', 'All', list.length]].concat(active.map(g => [g, g, byType[g].length]))
    .map(([k, l, n], i) => `<button class="tab ${i === 0 ? 'active' : ''}" type="button" data-tier="${esc(k)}" aria-pressed="${i === 0}">${esc(l)}<span class="count">${n}</span></button>`).join('');
    gridHtml = active.map(g => `<section class="acc-section" data-type="${esc(g)}">
    <div class="acc-head"><h2>${esc(g)}</h2><span class="acc-n">${byType[g].length}</span></div>
    <div class="products-grid">${byType[g].map(card).join('')}</div>
  </section>`).join('\n');
    emptyMsg = 'No matches. Pick another group or clear the search.';
  } else {
    desc = cat.title + ': shop premium ' + cat.label.toLowerCase() + ' at The Outfit House. Filter by Entry, Standard or Vault tier. Real photos before dispatch, ships PAN-India.';
    const counts = { all: list.length, Entry: 0, Standard: 0, Vault: 0 };
    list.forEach(p => { counts[p.grade]++; });
    tabs = [['all', 'All'], ['Entry', 'Entry'], ['Standard', 'Standard'], ['Vault', 'Vault']]
      .map(([k, l], i) => `<button class="tab ${i === 0 ? 'active' : ''}" type="button" data-tier="${k}" aria-pressed="${i === 0}">${l}<span class="count">${counts[k]}</span></button>`).join('');
    gridHtml = `<div class="products-grid" id="grid">${list.map(card).join('')}</div>`;
    emptyMsg = 'No matches. Try another tier or clear the search.';
  }

  const itemList = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: cat.title + ' — The Outfit House',
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: ORIGIN + '/product/' + p.slug, name: p.brand === 'TOH' ? p.name : p.brand + ' · ' + p.name }))
  });

  return `<!doctype html>
<html lang="en">
<head>
${head({ title, desc, canonical: url })}
${CAT_STYLE}
</head>
<body>
<a href="#main-content" class="skip-link">Skip to content</a>
${SPRITE}
<div id="header-mount">${renderHeader(cat.label)}</div>

<main id="main-content">
<section class="cat-hero">
  <h1>${esc(cat.title)}</h1>
  <p>${esc(cat.blurb)}</p>
</section>

<div class="filter-bar">
  <div class="tabs" id="tabs">${tabs}</div>
  <div class="meta-row">
    <label class="search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.5" y2="16.5"/></svg><input id="search" type="search" placeholder="Search ${esc(cat.label.toLowerCase())}" aria-label="Search ${esc(cat.label)}"/></label>
    <div class="count">Showing <b id="count">${list.length}</b> pieces</div>
  </div>
</div>

<section class="grid-wrap">
  ${gridHtml}
  <div class="empty" id="empty" style="display:none">${emptyMsg}</div>
</section>
</main>

<div id="footer-mount">${renderFooter()}</div>

<script type="application/ld+json">${itemList}</script>
<script src="/site.js"></script>
<script>
  initHeader();
  (function(){
    var sections = Array.prototype.slice.call(document.querySelectorAll('.acc-section'));
    var grouped = sections.length > 0;
    var cards = Array.prototype.slice.call(document.querySelectorAll('.products-grid .pc'));
    var tabs = Array.prototype.slice.call(document.querySelectorAll('#tabs .tab'));
    var search = document.getElementById('search');
    var pick = 'all';
    function apply(){
      var q = ((search && search.value) || '').trim().toLowerCase();
      var n = 0;
      cards.forEach(function(c){
        var bucketOk = grouped ? true : (pick === 'all' || c.dataset.grade === pick);
        var okText = !q || (c.dataset.search || '').indexOf(q) !== -1;
        var show = bucketOk && okText;
        c.style.display = show ? '' : 'none'; if (show) n++;
      });
      if (grouped) {
        n = 0;
        sections.forEach(function(sec){
          var typeOk = (pick === 'all' || sec.dataset.type === pick);
          var vis = 0;
          Array.prototype.slice.call(sec.querySelectorAll('.pc')).forEach(function(c){
            var ok = typeOk && c.style.display !== 'none';
            c.style.display = ok ? '' : 'none'; if (ok) vis++;
          });
          sec.style.display = vis ? '' : 'none'; n += vis;
        });
      }
      document.getElementById('count').textContent = n;
      document.getElementById('empty').style.display = n ? 'none' : 'block';
    }
    tabs.forEach(function(b){ b.addEventListener('click', function(){ tabs.forEach(function(x){ x.classList.toggle('active', x===b); x.setAttribute('aria-pressed', String(x===b)); }); pick = b.dataset.tier; apply(); }); });
    if (search) search.addEventListener('input', apply);
    cards.forEach(function(c){ var cta = c.querySelector('.pc-cta'); if (cta) cta.addEventListener('click', function(e){ e.stopPropagation(); if (cta.disabled) return; wa('Hi! I want to enquire about ' + cta.dataset.name + ' (' + cta.dataset.grade + '). Available sizes? ' + location.origin + '/product/' + cta.dataset.slug); }); });
  })();
</script>
</body>
</html>`;
}

/* ---------- write everything ---------- */
function writePage(rel, html) {
  const dir = path.join(ROOT, rel);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');
}

let nP = 0, nC = 0;
PRODUCTS.forEach(p => { writePage(path.join('product', p.slug), productPage(p)); nP++; });
Object.keys(CATEGORIES).forEach(k => { writePage(k, categoryPage(k)); nC++; });

/* ---------- sitemap.xml ---------- */
const core = ['', 'about', 'spec-sheet', 'contact', 'terms', 'guide'];
const sm = [];
sm.push('<?xml version="1.0" encoding="UTF-8"?>');
sm.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">');
sm.push('');
sm.push('  <!-- Core pages -->');
core.forEach(u => { sm.push('  <url><loc>' + ORIGIN + '/' + u + '</loc><lastmod>' + TODAY + '</lastmod></url>'); });
sm.push('');
sm.push('  <!-- Category pages -->');
Object.keys(CATEGORIES).forEach(k => { sm.push('  <url><loc>' + ORIGIN + '/' + k + '</loc><lastmod>' + TODAY + '</lastmod></url>'); });
['sneakers', 'apparel', 'bottomwear', 'accessories'].forEach(catKey => {
  sm.push('');
  sm.push('  <!-- ' + (CAT_DIR[catKey]) + ' -->');
  PRODUCTS.filter(p => p.cat === catKey).forEach(p => {
    sm.push('  <url>');
    sm.push('    <loc>' + ORIGIN + '/product/' + p.slug + '</loc>');
    sm.push('    <lastmod>' + TODAY + '</lastmod>');
    sm.push('    <image:image>');
    sm.push('      <image:loc>' + ORIGIN + '/' + p.img.split('/').map(encodeURIComponent).join('/') + '</image:loc>');
    sm.push('      <image:title>' + esc((p.brand === 'TOH' ? p.name : p.brand + ' ' + p.name)) + '</image:title>');
    sm.push('    </image:image>');
    sm.push('  </url>');
  });
});
sm.push('');
sm.push('</urlset>');
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sm.join('\n') + '\n', 'utf8');

/* ---------- redirects.generated.json (for vercel.json merge) ---------- */
fs.writeFileSync(path.join(ROOT, 'redirects.generated.json'), JSON.stringify(redirects, null, 2), 'utf8');

/* ---------- report ---------- */
console.log('Products:        ' + PRODUCTS.length);
console.log('Images renamed:  ' + renamed);
console.log('Product pages:   ' + nP);
console.log('Category pages:  ' + nC);
console.log('Redirects:       ' + redirects.length + '  -> redirects.generated.json');
console.log('Sitemap URLs:    ' + (core.length + nC + PRODUCTS.length));
if (missing.length) { console.log('\n!! MISSING IMAGE SOURCES (' + missing.length + '):'); missing.forEach(m => console.log('   ' + m)); }
