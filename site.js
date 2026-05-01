// Shared catalog + WhatsApp helpers for The Outfit House
window.WA_NUMBER = '918700825707';
window.IG_URL    = 'https://instagram.com/theoutfithouse.in';

window.wa = function(msg) {
  const url = 'https://wa.me/' + window.WA_NUMBER + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank', 'noopener');
};

// Mobile nav drawer open/close
window.openMobNav = function() {
  var nav = document.getElementById('mob-nav');
  var bd  = document.getElementById('mob-backdrop');
  if (!nav || !bd) return;
  nav.classList.add('open');
  bd.classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeMobNav = function() {
  var nav = document.getElementById('mob-nav');
  var bd  = document.getElementById('mob-backdrop');
  if (!nav || !bd) return;
  nav.classList.remove('open');
  bd.classList.remove('open');
  document.body.style.overflow = '';
};
// Close on ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMobNav();
});

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
  { slug:'aj1-mid-panda',      cat:'sneakers',    brand:'Air Jordan',  name:'AJ1 Mid · Panda',       grade:'7A',     price:'₹4,499', was:'₹14,995', img:'assets/Sneakers/AJ1 Mid Panda (1).png' },
  { slug:'nb-530-sea-salt',    cat:'sneakers',    brand:'New Balance', name:'530 · Cream Sea Salt',  grade:'UA 1:1', price:'₹6,899', was:'₹14,499', img:'assets/Sneakers/NB 530 Cream Sea Salt.png' },
  { slug:'aj1-high-bred-toe',  cat:'sneakers',    brand:'Air Jordan',  name:'AJ1 High · Bred Toe',   grade:'7A',     price:'₹4,799', was:'₹16,995', img:'assets/Sneakers/AJ1 High Bred Toe.png' },
  { slug:'nb-550-white-green', cat:'sneakers',    brand:'New Balance', name:'550 · White Green',     grade:'7A',     price:'₹4,099', was:'₹12,499', img:'assets/Sneakers/NB 550 White Green.png' },
  { slug:'aj1-low-panda',      cat:'sneakers',    brand:'Air Jordan',  name:'AJ1 Low · Panda',       grade:'Entry',  price:'₹2,199', was:'₹13,495', img:'assets/Sneakers/AJ1 Low Panda.png' },
  { slug:'nb-530-stone',       cat:'sneakers',    brand:'New Balance', name:'530 · Stone Pink',      grade:'UA 1:1', price:'₹6,899', was:'₹11,499', img:'assets/Sneakers/NB 530 Stone Pink.png' },
  { slug:'aj1-mid-shadow',     cat:'sneakers',    brand:'Air Jordan',  name:'AJ1 Mid · Shadow',      grade:'Entry',  price:'₹2,099', was:'₹13,495', img:'assets/Sneakers/AJ1 Mid Shadow.png' },
  { slug:'nb-2002r',           cat:'sneakers',    brand:'New Balance', name:'2002R · Protection',    grade:'UA 1:1', price:'₹7,299', was:'₹17,499', img:'assets/Sneakers/NB 2002R Protection Pack.png' },

  // Apparel
  { slug:'tho-box-tee',        cat:'apparel',     brand:'TOH',         name:'Box Logo Tee',          grade:'Entry',  price:'₹1,299', was:'₹2,499',  img:'assets/Apparel/Box Logo Tee.png' },
  { slug:'essentials-hoodie',  cat:'apparel',     brand:'Essentials',  name:'Heavyweight Hoodie',    grade:'7A',     price:'₹3,499', was:'₹9,990',  img:'assets/Apparel/Essentials Heavyweight Hoodie.png' },
  { slug:'sp5der-hoodie',      cat:'apparel',     brand:'Sp5der',      name:'Web Hoodie · Pink',     grade:'UA 1:1', price:'₹4,899', was:'₹19,995', img:'assets/Apparel/Sp5der Web Hoodie Pink.png' },
  { slug:'corteiz-overshirt',  cat:'apparel',     brand:'Corteiz',     name:'Alcatraz Overshirt',    grade:'7A',     price:'₹3,899', was:'₹11,500', img:'assets/Apparel/Corteiz Alcatraz Overshirt.png' },

  // Bottomwear
  { slug:'essentials-sweats',  cat:'bottomwear',  brand:'Essentials',  name:'Fleece Sweatpants',     grade:'7A',     price:'₹2,899', was:'₹8,990',  img:'assets/Bottomwear/Essentials Fleece Sweatpants.png' },
  { slug:'corteiz-cargos',     cat:'bottomwear',  brand:'Corteiz',     name:'Guerillaz Cargos',      grade:'UA 1:1', price:'₹4,499', was:'₹14,500', img:'assets/Bottomwear/Corteiz Guerillaz Cargos.png' },
  { slug:'tho-baggy-jeans',    cat:'bottomwear',  brand:'TOH',         name:'Baggy Denim · Indigo',  grade:'Entry',  price:'₹1,799', was:'₹3,999',  img:'assets/Bottomwear/Baggy Denim Indigo.png' },

  // Accessories
  { slug:'tho-tote',           cat:'accessories', brand:'TOH',         name:'Crown Tote · Cream',    grade:'Entry',  price:'₹699',   was:'₹1,299',  img:'assets/Accessories/Crown Tote · Cream.png' },
  { slug:'nb-cap',             cat:'accessories', brand:'New Balance', name:'6-Panel Cap',           grade:'7A',     price:'₹1,099', was:'₹2,999',  img:'assets/Accessories/New Balance 6-Panel Cap.png' },
  { slug:'sock-pack',          cat:'accessories', brand:'TOH',         name:'Crew Sock 3-Pack',      grade:'Entry',  price:'₹499',   was:'₹999',    img:'assets/Accessories/Crew Sock 3-Pack.png' },
];

// Render product card markup (shared)
// Stretched-link pattern: pc-name::after covers the card; pc-cta sits above via z-index
window.renderProductCard = function(p) {
  return `
    <div class="pc">
      <div class="pc-img">
        <span class="pc-grade ${gradeClass(p.grade)}">${p.grade}</span>
        <img src="${p.img}" alt="${p.name}" loading="lazy"/>
      </div>
      <div class="pc-body">
        <span class="pc-brand">${p.brand}</span>
        <a class="pc-name" href="/product/${p.slug}">${p.name}</a>
        <span class="pc-price">${p.price} <s>${p.was}</s></span>
        <button class="pc-cta" onclick="event.stopPropagation(); wa('Hi! I want to enquire about ${p.name} (${p.grade}). Available sizes?')">
          <svg><use href="#wa-icon"/></svg> Enquire on WhatsApp
        </button>
      </div>
    </div>`;
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
      <symbol id="chevron-down" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1,1 5,5 9,1"/>
      </symbol>
    </svg>`;
  document.body.appendChild(s);
};

// Shared header markup
window.renderHeader = function(active) {
  var SHOP_ITEMS = ['Sneakers', 'Apparel', 'Bottomwear', 'Accessories'];
  var isShop = SHOP_ITEMS.indexOf(active) !== -1;
  var shopLinks = [
    { h:'Sneakers',    href:'/sneakers',    num:'01' },
    { h:'Apparel',     href:'/apparel',     num:'02' },
    { h:'Bottomwear',  href:'/bottomwear',  num:'03' },
    { h:'Accessories', href:'/accessories', num:'04' },
  ];
  var topLinks = [
    { h:'Spec Sheet', href:'/spec-sheet' },
    { h:'Contact',    href:'/contact' },
  ];
  return `
  <header class="nav">
    <div class="nav-inner">
      <button class="nav-toggle" aria-label="Open menu" onclick="openMobNav()">
        <svg><use href="#menu-icon"/></svg>
      </button>
      <a class="brand" href="/">
        <img src="assets/logo-crown.png" alt="The Outfit House crown logo"/>
        <span class="name">The Outfit House</span>
      </a>
      <nav class="nav-links">
        <div class="nav-dropdown">
          <button class="nav-dropdown-btn ${isShop ? 'active' : ''}" type="button">
            Shop <svg><use href="#chevron-down"/></svg>
          </button>
          <div class="nav-dropdown-menu" role="menu">
            ${shopLinks.map(i => `<a href="${i.href}" role="menuitem" class="${active===i.h?'active':''}"><span>${i.h}</span><span class="num">${i.num}</span></a>`).join('')}
          </div>
        </div>
        ${topLinks.map(i => `<a href="${i.href}" class="${active===i.h?'active':''}">${i.h}</a>`).join('')}
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
  </header>

  <div id="mob-backdrop" class="mob-backdrop" onclick="closeMobNav()" aria-hidden="true"></div>

  <div id="mob-nav" class="mob-nav" role="dialog" aria-modal="true" aria-label="Navigation menu">
    <div class="mob-nav-head">
      <span class="mob-nav-label">Navigation</span>
      <button class="mob-close" onclick="closeMobNav()" aria-label="Close menu">
        <svg><use href="#x-icon"/></svg>
      </button>
    </div>
    <nav class="mob-nav-links">
      ${shopLinks.map(i => `
      <a href="${i.href}">
        ${i.h}
        <svg><use href="#arrow-right"/></svg>
      </a>`).join('')}
      ${topLinks.map(i => `
      <a href="${i.href}">
        ${i.h}
        <svg><use href="#arrow-right"/></svg>
      </a>`).join('')}
      <a href="${window.IG_URL}" target="_blank" rel="noopener">
        Instagram ↗
        <svg><use href="#arrow-right"/></svg>
      </a>
    </nav>
    <div class="mob-nav-foot">
      <button class="btn-wa" onclick="closeMobNav(); wa('Hi! I want to enquire.')">
        <svg><use href="#wa-icon"/></svg> Enquire on WhatsApp
      </button>
    </div>
  </div>`;
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
        <li><a href="/sneakers">Sneakers</a></li>
        <li><a href="/apparel">Apparel</a></li>
        <li><a href="/bottomwear">Bottomwear</a></li>
        <li><a href="/accessories">Accessories</a></li>
      </ul></div>
      <div><h5>Help</h5><ul>
        <li><a href="/spec-sheet">Spec Sheet</a></li>
        <li><a href="/contact">Shipping</a></li>
        <li><a href="/contact">Sizing</a></li>
        <li><a href="/contact">Exchange</a></li>
      </ul></div>
      <div><h5>Connect</h5><ul>
        <li><a href="#" onclick="wa('Hi!');return false;">WhatsApp</a></li>
        <li><a href="${window.IG_URL}" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="/contact">Contact</a></li>
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

// Page-transition interceptor — fade out before navigating to internal pages
(function() {
  var leaving = false;
  document.addEventListener('click', function(e) {
    if (leaving) return;
    var a = e.target.closest('a[href]');
    if (!a || a.target === '_blank') return;
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    var href = a.getAttribute('href');
    if (!href || /^(#|mailto:|tel:|javascript:|https?:\/\/)/.test(href)) return;
    leaving = true;
    document.body.classList.add('leaving');
    setTimeout(function() { location.href = href; }, 180);
  });
}());
