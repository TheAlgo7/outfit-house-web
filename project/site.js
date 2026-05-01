// Shared catalog + WhatsApp helpers for The Outfit House
window.WA_NUMBER = '919999999999'; // TODO: replace with real number
window.IG_URL    = 'https://instagram.com/theoutfithouse';

window.wa = function(msg) {
  const url = 'https://wa.me/' + window.WA_NUMBER + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank', 'noopener');
};

window.gradeClass = function(g) {
  if (g === 'Entry') return 'entry';
  if (g === '7A')    return 'seven';
  return 'ua';
};

// Categories
window.CATEGORIES = {
  sneakers:    { key:'sneakers',    label:'Sneakers',    title:'The Sneaker Vault',   tag:'01 · Footwear',    blurb:'Hand-checked sneakers across three quality tiers. Genuine boxes, accurate stitching, real photos before dispatch.' },
  apparel:     { key:'apparel',     label:'Apparel',     title:'Topwear',             tag:'02 · Apparel',     blurb:'Premium tees, hoodies, and overshirts. Fits drawn from the originals — no dropped shoulders, no oversized guesswork.' },
  bottomwear:  { key:'bottomwear',  label:'Bottomwear',  title:'Streetwear Bottoms',  tag:'03 · Bottomwear',  blurb:'Cargos, sweats, and denim cut from heavyweight fabrics. Streetwear silhouettes you actually want to wear.' },
  accessories: { key:'accessories', label:'Accessories', title:'Finishing Touches',   tag:'04 · Accessories', blurb:'Caps, bags, socks, belts. The small stuff that finishes the fit.' },
};

// Catalog
window.PRODUCTS = [
  // Sneakers
  { slug:'aj1-mid-panda',      cat:'sneakers',    brand:'Air Jordan', name:'AJ1 Mid · Panda',       grade:'7A',     price:'₹4,499', was:'₹14,995', img:'assets/product-airjordan.jpg' },
  { slug:'nb-530-sea-salt',    cat:'sneakers',    brand:'New Balance',name:'530 · Cream Sea Salt', grade:'UA 1:1', price:'₹6,899', was:'₹14,499', img:'assets/product-newbalance.jpg' },
  { slug:'aj1-high-bred-toe',  cat:'sneakers',    brand:'Air Jordan', name:'AJ1 High · Bred Toe',  grade:'7A',     price:'₹4,799', was:'₹16,995', img:'assets/product-airjordan.jpg' },
  { slug:'nb-550-white-green', cat:'sneakers',    brand:'New Balance',name:'550 · White Green',   grade:'7A',     price:'₹4,099', was:'₹12,499', img:'assets/product-newbalance.jpg' },
  { slug:'aj1-low-panda',      cat:'sneakers',    brand:'Air Jordan', name:'AJ1 Low · Panda',     grade:'Entry',  price:'₹2,199', was:'₹13,495', img:'assets/product-airjordan.jpg' },
  { slug:'nb-530-stone',       cat:'sneakers',    brand:'New Balance',name:'530 · Stone Pink',   grade:'UA 1:1', price:'₹6,899', was:'₹11,499', img:'assets/product-newbalance.jpg' },
  { slug:'aj1-mid-shadow',     cat:'sneakers',    brand:'Air Jordan', name:'AJ1 Mid · Shadow',    grade:'Entry',  price:'₹2,099', was:'₹13,495', img:'assets/product-airjordan.jpg' },
  { slug:'nb-2002r',           cat:'sneakers',    brand:'New Balance',name:'2002R · Protection', grade:'UA 1:1', price:'₹7,299', was:'₹17,499', img:'assets/product-newbalance.jpg' },

  // Apparel (placeholder imagery — reuses the tote)
  { slug:'tho-box-tee',        cat:'apparel',     brand:'TOH',         name:'Box Logo Tee',        grade:'Entry',  price:'₹1,299', was:'₹2,499',  img:'assets/insta-post-tote.jpg' },
  { slug:'essentials-hoodie',  cat:'apparel',     brand:'Essentials',  name:'Heavyweight Hoodie',  grade:'7A',     price:'₹3,499', was:'₹9,990',  img:'assets/insta-post-tote.jpg' },
  { slug:'sp5der-hoodie',      cat:'apparel',     brand:'Sp5der',      name:'Web Hoodie · Pink',   grade:'UA 1:1', price:'₹4,899', was:'₹19,995', img:'assets/insta-post-tote.jpg' },
  { slug:'corteiz-overshirt',  cat:'apparel',     brand:'Corteiz',     name:'Alcatraz Overshirt',  grade:'7A',     price:'₹3,899', was:'₹11,500', img:'assets/insta-post-tote.jpg' },

  // Bottomwear
  { slug:'essentials-sweats',  cat:'bottomwear',  brand:'Essentials',  name:'Fleece Sweatpants',   grade:'7A',     price:'₹2,899', was:'₹8,990',  img:'assets/insta-post-tote.jpg' },
  { slug:'corteiz-cargos',     cat:'bottomwear',  brand:'Corteiz',     name:'Guerillaz Cargos',    grade:'UA 1:1', price:'₹4,499', was:'₹14,500', img:'assets/insta-post-tote.jpg' },
  { slug:'tho-baggy-jeans',    cat:'bottomwear',  brand:'TOH',         name:'Baggy Denim · Indigo',grade:'Entry',  price:'₹1,799', was:'₹3,999',  img:'assets/insta-post-tote.jpg' },

  // Accessories
  { slug:'tho-tote',           cat:'accessories', brand:'TOH',         name:'Crown Tote · Cream',  grade:'Entry',  price:'₹699',   was:'₹1,299',  img:'assets/insta-post-tote.jpg' },
  { slug:'nb-cap',             cat:'accessories', brand:'New Balance', name:'6-Panel Cap',         grade:'7A',     price:'₹1,099', was:'₹2,999',  img:'assets/insta-post-tote.jpg' },
  { slug:'sock-pack',          cat:'accessories', brand:'TOH',         name:'Crew Sock 3-Pack',    grade:'Entry',  price:'₹499',   was:'₹999',    img:'assets/insta-post-tote.jpg' },
];

// Render product card markup (shared)
window.renderProductCard = function(p) {
  return `
    <a class="pc" href="Product.html?slug=${p.slug}">
      <div class="pc-img">
        <span class="pc-grade ${gradeClass(p.grade)}">${p.grade}</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
      </div>
      <div class="pc-body">
        <span class="pc-brand">${p.brand}</span>
        <span class="pc-name">${p.name}</span>
        <span class="pc-price">${p.price} <s>${p.was}</s></span>
        <button class="pc-cta" onclick="event.preventDefault(); event.stopPropagation(); wa('Hi! I want to enquire about ${p.name} (${p.grade}). Available sizes?')">
          <svg><use href="#wa-icon"/></svg> Enquire on WhatsApp
        </button>
      </div>
    </a>`;
};

// Shared SVG sprite — inject once
window.injectSprite = function() {
  if (document.getElementById('tho-sprite')) return;
  const s = document.createElement('div');
  s.id = 'tho-sprite';
  s.style.display = 'none';
  s.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <symbol id="wa-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3C4.1 15 3.7 13.5 3.7 12 3.7 7.4 7.4 3.7 12 3.7s8.3 3.7 8.3 8.3-3.7 8.2-8.3 8.2z"/>
      </symbol>
      <symbol id="ig-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/>
      </symbol>
      <symbol id="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <line x1="4" y1="7"  x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>
      </symbol>
      <symbol id="x-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
        <line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/>
      </symbol>
      <symbol id="arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
      </symbol>
      <symbol id="arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </symbol>
      <symbol id="truck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </symbol>
      <symbol id="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
      </symbol>
      <symbol id="rotate" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 4 1 10 7 10"/><path d="M3.5 15A9 9 0 1 0 6 5.3L1 10"/>
      </symbol>
      <symbol id="mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </symbol>
      <symbol id="pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </symbol>
    </svg>`;
  document.body.appendChild(s);
};

// Shared header markup
window.renderHeader = function(active) {
  const items = [
    {h:'Sneakers',    href:'Category.html?cat=sneakers'},
    {h:'Apparel',     href:'Category.html?cat=apparel'},
    {h:'Bottomwear',  href:'Category.html?cat=bottomwear'},
    {h:'Accessories', href:'Category.html?cat=accessories'},
    {h:'Spec Sheet',  href:'SpecSheet.html'},
    {h:'Contact',     href:'Contact.html'},
  ];
  return `
  <header class="nav">
    <div class="nav-inner">
      <button class="nav-toggle" aria-label="Menu" onclick="document.getElementById('mob-nav').classList.add('open')">
        <svg><use href="#menu-icon"/></svg>
      </button>
      <a class="brand" href="Homepage.html">
        <img src="assets/logo-crown.png" alt=""/>
        <span class="name">The Outfit House</span>
      </a>
      <nav class="nav-links">
        ${items.map(i => `<a href="${i.href}" class="${active===i.h?'active':''}">${i.h}</a>`).join('')}
      </nav>
      <div class="nav-cta">
        <a class="icon-link" href="${window.IG_URL}" target="_blank" rel="noopener" aria-label="Instagram">
          <svg><use href="#ig-icon"/></svg>
        </a>
        <button class="nav-wa" onclick="wa('Hi! I want to enquire.')">
          <svg><use href="#wa-icon"/></svg> <span class="lbl">Enquire</span>
        </button>
      </div>
    </div>
    <div id="mob-nav" class="mob-nav">
      <button class="mob-close" onclick="document.getElementById('mob-nav').classList.remove('open')" aria-label="Close">
        <svg><use href="#x-icon"/></svg>
      </button>
      ${items.map(i => `<a href="${i.href}">${i.h}</a>`).join('')}
      <a href="${window.IG_URL}" target="_blank" rel="noopener">Instagram ↗</a>
    </div>
  </header>`;
};

window.renderFooter = function() {
  return `
  <footer>
    <div class="ft">
      <div>
        <img src="assets/logo-text.png" alt="The Outfit House"/>
        <p>Premium 7A and UA-grade streetwear. Hand-checked, shipped from New Delhi.</p>
      </div>
      <div><h5>Shop</h5><ul>
        <li><a href="Category.html?cat=sneakers">Sneakers</a></li>
        <li><a href="Category.html?cat=apparel">Apparel</a></li>
        <li><a href="Category.html?cat=bottomwear">Bottomwear</a></li>
        <li><a href="Category.html?cat=accessories">Accessories</a></li>
      </ul></div>
      <div><h5>Help</h5><ul>
        <li><a href="SpecSheet.html">Spec Sheet</a></li>
        <li><a href="Contact.html">Shipping</a></li>
        <li><a href="Contact.html">Sizing</a></li>
        <li><a href="Contact.html">Exchange</a></li>
      </ul></div>
      <div><h5>Connect</h5><ul>
        <li><a href="#" onclick="wa('Hi!');return false;">WhatsApp</a></li>
        <li><a href="${window.IG_URL}" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="Contact.html">Contact</a></li>
      </ul></div>
    </div>
    <div class="ft-bot">
      <span>© 2026 The Outfit House · New Delhi</span>
      <span>Sneakers · Streetwear · Premium</span>
    </div>
  </footer>
  <button class="wa-fab" onclick="wa('Hi! I want to enquire.')" aria-label="Chat on WhatsApp">
    <span class="pulse"></span>
    <svg><use href="#wa-icon"/></svg>
  </button>`;
};
