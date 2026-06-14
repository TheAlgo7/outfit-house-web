// Shared catalog + WhatsApp helpers for The Outfit House
window.WA_NUMBER = '918700825707';
window.IG_URL    = 'https://www.instagram.com/theoutfithouse.in';
window.FB_URL    = 'https://www.facebook.com/profile.php?id=61589373328357';

window.wa = function(msg) {
  const url = 'https://wa.me/' + window.WA_NUMBER + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank', 'noopener');
};

// Mobile nav drawer open/close
var _mobNavTrigger = null;

window.openMobNav = function() {
  var nav = document.getElementById('mob-nav');
  var bd  = document.getElementById('mob-backdrop');
  if (!nav || !bd) return;
  _mobNavTrigger = document.activeElement;
  nav.classList.add('open');
  bd.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Move focus into drawer after CSS transition starts
  var first = nav.querySelector('button, a[href], [tabindex]:not([tabindex="-1"])');
  if (first) setTimeout(function() { first.focus(); }, 50);
};
window.closeMobNav = function() {
  var nav = document.getElementById('mob-nav');
  var bd  = document.getElementById('mob-backdrop');
  if (!nav || !bd) return;
  nav.classList.remove('open');
  bd.classList.remove('open');
  document.body.style.overflow = '';
  // Restore focus to the element that triggered the open
  if (_mobNavTrigger && _mobNavTrigger.focus) { _mobNavTrigger.focus(); _mobNavTrigger = null; }
};
// ESC closes drawer; Tab key is trapped inside it while open
document.addEventListener('keydown', function(e) {
  var nav = document.getElementById('mob-nav');
  var isOpen = nav && nav.classList.contains('open');
  if (e.key === 'Escape' && isOpen) { closeMobNav(); return; }
  if (e.key === 'Tab' && isOpen && nav) {
    var focusable = Array.from(nav.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function(el) { return el.offsetParent !== null; });
    if (!focusable.length) return;
    var first = focusable[0];
    var last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  }
});

window.gradeClass = function(g) {
  if (g === 'Entry')    return 'entry';
  if (g === 'Standard') return 'standard';
  if (g === 'Vault')    return 'vault';
  return 'entry';
};

// Categories
window.CATEGORIES = {
  sneakers:    { key:'sneakers',    label:'Sneakers',    title:'The Sneaker Vault',   tag:'01 · Footwear',    blurb:'Hand-checked sneakers across three quality tiers. Genuine boxes, accurate stitching, real photos before dispatch.' },
  apparel:     { key:'apparel',     label:'Apparel',     title:'Topwear',             tag:'02 · Apparel',     blurb:'Premium tees, hoodies, and overshirts. Fits drawn from the originals, no dropped shoulders, no oversized guesswork.' },
  bottomwear:  { key:'bottomwear',  label:'Bottomwear',  title:'Streetwear Bottoms',  tag:'03 · Bottomwear',  blurb:'Cargos, sweats, and denim cut from heavyweight fabrics. Streetwear silhouettes you actually want to wear.' },
  accessories: { key:'accessories', label:'Accessories', title:'Finishing Touches',   tag:'04 · Accessories', blurb:'Caps, bags, socks, belts. The small stuff that finishes the fit.' },
};

// Catalog
// Prices are intentionally NOT stored or shown — quoted on WhatsApp after enquiry
// (we bargain and run launch offers). See SpecSheet for the tier system.
window.PRODUCTS = [
  // ---------- Sneakers ----------
  { slug:'aj1-mid-panda',      cat:'sneakers',    brand:'Air Jordan',     name:'AJ1 Mid · Panda',          grade:'Standard', img:'assets/Sneakers/AJ1 Mid Panda (1).webp' },
  { slug:'nb-530-sea-salt',    cat:'sneakers',    brand:'New Balance',    name:'530 · Cream Sea Salt',     grade:'Vault',    img:'assets/Sneakers/NB 530 Cream Sea Salt.webp' },
  { slug:'aj1-high-bred-toe',  cat:'sneakers',    brand:'Air Jordan',     name:'AJ1 High · Bred Toe',      grade:'Standard', img:'assets/Sneakers/AJ1 High Bred Toe.webp' },
  { slug:'nb-550-white-green', cat:'sneakers',    brand:'New Balance',    name:'550 · White Green',        grade:'Standard', img:'assets/Sneakers/NB 550 White Green.webp' },
  { slug:'aj1-low-panda',      cat:'sneakers',    brand:'Air Jordan',     name:'AJ1 Low · Panda',          grade:'Entry',    img:'assets/Sneakers/AJ1 Low Panda.webp' },
  { slug:'nb-530-stone',       cat:'sneakers',    brand:'New Balance',    name:'530 · Stone Pink',         grade:'Vault',    img:'assets/Sneakers/NB 530 Stone Pink.webp' },
  { slug:'aj1-mid-shadow',     cat:'sneakers',    brand:'Air Jordan',     name:'AJ1 Mid · Shadow',         grade:'Entry',    img:'assets/Sneakers/AJ1 Mid Shadow.webp' },
  { slug:'nb-2002r',           cat:'sneakers',    brand:'New Balance',    name:'2002R · Protection',       grade:'Vault',    img:'assets/Sneakers/NB 2002R Protection Pack.webp' },
  { slug:'nike-dunk-low-panda',cat:'sneakers',    brand:'Nike',           name:'Dunk Low · Panda',         grade:'Standard', img:'assets/Sneakers/nike-dunk-low-panda.webp' },
  { slug:'nike-af1-white',     cat:'sneakers',    brand:'Nike',           name:'Air Force 1 · Triple White',grade:'Entry',   img:'assets/Sneakers/nike-af1-white.webp' },
  { slug:'yeezy-350-zebra',    cat:'sneakers',    brand:'Yeezy',          name:'Boost 350 V2 · Zebra',     grade:'Vault',    img:'assets/Sneakers/yeezy-350-zebra.webp' },
  { slug:'yeezy-slide-bone',   cat:'sneakers',    brand:'Yeezy',          name:'Slide · Bone',             grade:'Standard', img:'assets/Sneakers/yeezy-slide-bone.webp' },
  { slug:'aj4-bred',           cat:'sneakers',    brand:'Air Jordan',     name:'AJ4 · Bred Reimagined',    grade:'Vault',    img:'assets/Sneakers/aj4-bred.webp' },
  { slug:'travis-aj1-mocha',   cat:'sneakers',    brand:'Air Jordan',     name:'AJ1 Low · Mocha',          grade:'Vault',    img:'assets/Sneakers/travis-aj1-mocha.webp' },
  { slug:'nike-dunk-unc',      cat:'sneakers',    brand:'Nike',           name:'Dunk Low · University Blue',grade:'Standard',img:'assets/Sneakers/nike-dunk-unc.webp' },
  { slug:'nb-9060-grey',       cat:'sneakers',    brand:'New Balance',    name:'9060 · Rain Cloud',        grade:'Vault',    img:'assets/Sneakers/nb-9060-grey.webp' },
  { slug:'nike-am90-infrared', cat:'sneakers',    brand:'Nike',           name:'Air Max 90 · Infrared',    grade:'Standard', img:'assets/Sneakers/nike-am90-infrared.webp' },
  { slug:'adidas-samba-og',    cat:'sneakers',    brand:'Adidas',         name:'Samba OG · White Black',   grade:'Standard', img:'assets/Sneakers/adidas-samba-og.webp' },
  { slug:'adidas-campus-00s',  cat:'sneakers',    brand:'Adidas',         name:'Campus 00s · Grey',        grade:'Standard', img:'assets/Sneakers/adidas-campus-00s.webp' },
  { slug:'asics-gel-1130',     cat:'sneakers',    brand:'Asics',          name:'Gel-1130 · Cream',         grade:'Standard', img:'assets/Sneakers/asics-gel-1130.webp' },
  { slug:'onitsuka-mexico66',  cat:'sneakers',    brand:'Onitsuka Tiger', name:'Mexico 66 · White Blue',   grade:'Entry',    img:'assets/Sneakers/onitsuka-mexico66.webp' },
  { slug:'crocs-classic-clog', cat:'sneakers',    brand:'Crocs',          name:'Classic Clog · Black',     grade:'Entry',    img:'assets/Sneakers/crocs-classic-clog.webp' },

  // ---------- Apparel ----------
  { slug:'tho-box-tee',        cat:'apparel',     brand:'TOH',            name:'Box Logo Tee',             grade:'Entry',    img:'assets/Apparel/Box Logo Tee.webp' },
  { slug:'essentials-hoodie',  cat:'apparel',     brand:'Essentials',     name:'Heavyweight Hoodie',       grade:'Standard', img:'assets/Apparel/Essentials Heavyweight Hoodie.webp' },
  { slug:'sp5der-hoodie',      cat:'apparel',     brand:'Sp5der',         name:'Web Hoodie · Pink',        grade:'Vault',    img:'assets/Apparel/Sp5der Web Hoodie Pink.webp' },
  { slug:'corteiz-overshirt',  cat:'apparel',     brand:'Corteiz',        name:'Alcatraz Overshirt',       grade:'Standard', img:'assets/Apparel/Corteiz Alcatraz Overshirt.webp' },
  { slug:'stussy-basic-tee',   cat:'apparel',     brand:'Stussy',         name:'Basic Stock Tee',          grade:'Entry',    img:'assets/Apparel/stussy-basic-tee.webp' },
  { slug:'nike-tech-hoodie',   cat:'apparel',     brand:'Nike',           name:'Tech Fleece Hoodie',       grade:'Standard', img:'assets/Apparel/nike-tech-hoodie.webp' },
  { slug:'trapstar-hoodie',    cat:'apparel',     brand:'Trapstar',       name:'Hyperdrive Hoodie',        grade:'Vault',    img:'assets/Apparel/trapstar-hoodie.webp' },
  { slug:'bape-shark-hoodie',  cat:'apparel',     brand:'Bape',           name:'Shark Full-Zip Hoodie',    grade:'Vault',    img:'assets/Apparel/bape-shark-hoodie.webp' },
  { slug:'carhartt-hooded',    cat:'apparel',     brand:'Carhartt WIP',   name:'Hooded Sweatshirt',        grade:'Standard', img:'assets/Apparel/carhartt-hooded.webp' },
  { slug:'polo-bear-tee',      cat:'apparel',     brand:'Polo Ralph Lauren',name:'Polo Bear Tee',          grade:'Standard', img:'assets/Apparel/polo-bear-tee.webp' },
  { slug:'northface-nuptse',   cat:'apparel',     brand:'The North Face', name:'Nuptse 700 Puffer',        grade:'Vault',    img:'assets/Apparel/northface-nuptse.webp' },
  { slug:'stone-island-crew',  cat:'apparel',     brand:'Stone Island',   name:'Badge Crewneck',           grade:'Vault',    img:'assets/Apparel/stone-island-crew.webp' },

  // ---------- Bottomwear ----------
  { slug:'essentials-sweats',  cat:'bottomwear',  brand:'Essentials',     name:'Fleece Sweatpants',        grade:'Standard', img:'assets/Bottomwear/Essentials Fleece Sweatpants.webp' },
  { slug:'corteiz-cargos',     cat:'bottomwear',  brand:'Corteiz',        name:'Guerillaz Cargos',         grade:'Vault',    img:'assets/Bottomwear/Corteiz Guerillaz Cargos.webp' },
  { slug:'tho-baggy-jeans',    cat:'bottomwear',  brand:'TOH',            name:'Baggy Denim · Indigo',     grade:'Entry',    img:'assets/Bottomwear/Baggy Denim Indigo.webp' },
  { slug:'nike-tech-joggers',  cat:'bottomwear',  brand:'Nike',           name:'Tech Fleece Joggers',      grade:'Standard', img:'assets/Bottomwear/nike-tech-joggers.webp' },
  { slug:'adidas-tiro-pants',  cat:'bottomwear',  brand:'Adidas',         name:'Tiro Track Pants',         grade:'Entry',    img:'assets/Bottomwear/adidas-tiro-pants.webp' },
  { slug:'stussy-nyco-cargo',  cat:'bottomwear',  brand:'Stussy',         name:'Nyco Cargo Pant',          grade:'Standard', img:'assets/Bottomwear/stussy-nyco-cargo.webp' },
  { slug:'levis-501-denim',    cat:'bottomwear',  brand:"Levi's",         name:'501 Original Denim',       grade:'Standard', img:'assets/Bottomwear/levis-501-denim.webp' },
  { slug:'represent-baggy',    cat:'bottomwear',  brand:'Represent',      name:'Baggy Denim',              grade:'Vault',    img:'assets/Bottomwear/represent-baggy.webp' },

  // ---------- Accessories ----------
  { slug:'tho-tote',           cat:'accessories', brand:'TOH',            name:'Crown Tote · Cream',       grade:'Entry',    img:'assets/Accessories/Crown Tote · Cream.webp' },
  { slug:'nb-cap',             cat:'accessories', brand:'New Balance',    name:'6-Panel Cap',              grade:'Standard', img:'assets/Accessories/New Balance 6-Panel Cap.webp' },
  { slug:'sock-pack',          cat:'accessories', brand:'TOH',            name:'Crew Sock 3-Pack',         grade:'Entry',    img:'assets/Accessories/Crew Sock 3-Pack.webp' },
  { slug:'rayban-wayfarer',    cat:'accessories', brand:'Ray-Ban',        name:'Wayfarer Sunglasses',      grade:'Standard', img:'assets/Accessories/rayban-wayfarer.webp' },
  { slug:'rayban-aviator',     cat:'accessories', brand:'Ray-Ban',        name:'Aviator Sunglasses',       grade:'Standard', img:'assets/Accessories/rayban-aviator.webp' },
  { slug:'double-buckle-belt', cat:'accessories', brand:'TOH',            name:'Double-Buckle Leather Belt',grade:'Standard',img:'assets/Accessories/double-buckle-belt.webp' },
  { slug:'newera-yankees-cap', cat:'accessories', brand:'New Era',        name:'59FIFTY Yankees Cap',      grade:'Standard', img:'assets/Accessories/newera-yankees-cap.webp' },
];

// Render product card markup (shared)
// Stretched-link pattern: pc-name::after covers the card; pc-cta sits above via z-index
window.renderProductCard = function(p) {
  var card = document.createElement('div');
  card.className = 'pc';
  card.innerHTML = `
    <div class="pc-img">
      <span class="pc-grade ${gradeClass(p.grade)}">${p.grade}</span>
      <img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" width="600" height="600" onerror="this.onerror=null;this.src='assets/placeholder.svg'"/>
    </div>
    <div class="pc-body">
      <span class="pc-brand">${p.brand}</span>
      <a class="pc-name" href="/product/${p.slug}">${p.name}</a>
      <span class="pc-price">Price on enquiry</span>
      <button class="pc-cta" data-name="${p.name}" data-grade="${p.grade}">
        <svg><use href="#wa-icon"/></svg> Enquire on WhatsApp
      </button>
    </div>`;
  card.querySelector('.pc-cta').addEventListener('click', function(e) {
    e.stopPropagation();
    wa('Hi! I want to enquire about ' + p.name + ' (' + p.grade + '). Available sizes?');
  });
  return card;
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
      <symbol id="fb-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/>
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
    { h:'Home',       href:'/' },
    { h:'About',      href:'/about' },
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
        <img src="assets/logo-crown.webp" alt="The Outfit House crown logo"/>
        <span class="name">The Outfit House</span>
      </a>
      <nav class="nav-links">
        <div class="nav-dropdown">
          <button class="nav-dropdown-btn ${isShop ? 'active' : ''}" type="button"
            aria-haspopup="menu" aria-expanded="false">
            Shop <svg><use href="#chevron-down"/></svg>
          </button>
          <div class="nav-dropdown-menu" role="menu">
            ${shopLinks.map(i => `<a href="${i.href}" role="menuitem" class="${active===i.h?'active':''}"${active===i.h?' aria-current="page"':''}><span>${i.h}</span><span class="num">${i.num}</span></a>`).join('')}
          </div>
        </div>
        ${topLinks.map(i => `<a href="${i.href}" class="${active===i.h?'active':''}"${active===i.h?' aria-current="page"':''}>${i.h}</a>`).join('')}
      </nav>
      <div class="nav-cta">
        <a class="icon-link" href="${window.IG_URL}" target="_blank" rel="noopener" aria-label="Instagram">
          <svg><use href="#ig-icon"/></svg>
        </a>
        <button class="nav-wa" aria-label="Enquire on WhatsApp" onclick="wa('Hi! I want to enquire.')">
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
      <a href="${window.FB_URL}" target="_blank" rel="noopener">
        Facebook ↗
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
        <img src="assets/logo-text.webp" alt="The Outfit House" width="360" height="261" loading="lazy"/>
        <p>Sneakers, apparel, accessories and footwear. Hand-checked and shipped from Chhatarpur, New Delhi.</p>
      </div>
      <div><h5>Shop</h5><ul>
        <li><a href="/sneakers">Sneakers</a></li>
        <li><a href="/apparel">Apparel</a></li>
        <li><a href="/bottomwear">Bottomwear</a></li>
        <li><a href="/accessories">Accessories</a></li>
      </ul></div>
      <div><h5>Help</h5><ul>
        <li><a href="/spec-sheet">Spec Sheet</a></li>
        <li><a href="/terms">Shipping</a></li>
        <li><a href="/terms">Sizing</a></li>
        <li><a href="/terms">Exchange</a></li>
      </ul></div>
      <div><h5>Connect</h5><ul>
        <li><a href="#" onclick="wa('Hi!');return false;">WhatsApp</a></li>
        <li><a href="${window.IG_URL}" target="_blank" rel="noopener">Instagram</a></li>
        <li><a href="${window.FB_URL}" target="_blank" rel="noopener">Facebook</a></li>
        <li><a href="mailto:theoutfithouse@outlook.com">Email</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul></div>
    </div>
    <div class="ft-bot">
      <span>© 2026 The Outfit House · New Delhi</span>
      <span><a href="/policy">Policy</a> · <a href="/terms">Terms</a></span>
    </div>
  </footer>
  <button class="wa-fab" onclick="wa('Hi! I want to enquire.')" aria-label="Chat on WhatsApp">
    <span class="pulse"></span>
    <svg><use href="#wa-icon"/></svg>
  </button>`;
};

// Wire up nav dropdown ARIA states + arrow-key navigation after renderHeader() injects the markup
window.initHeader = function() {
  var dd  = document.querySelector('.nav-dropdown');
  var btn = dd && dd.querySelector('.nav-dropdown-btn');
  if (!dd || !btn) return;
  function setExpanded(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    dd.classList.toggle('open', open);
  }
  dd.addEventListener('mouseenter', function() { setExpanded(true); });
  dd.addEventListener('mouseleave', function() { setExpanded(false); });
  dd.addEventListener('focusin',    function() { setExpanded(true); });
  dd.addEventListener('focusout',   function(e) {
    if (!dd.contains(e.relatedTarget)) setExpanded(false);
  });
  btn.addEventListener('click', function(e) {
    var isOpen = btn.getAttribute('aria-expanded') === 'true';
    setExpanded(!isOpen);
    e.stopPropagation();
  });
  document.addEventListener('click', function(e) {
    if (!dd.contains(e.target)) setExpanded(false);
  });
  // Arrow-key navigation between menu items (ARIA menu pattern)
  dd.addEventListener('keydown', function(e) {
    var items = Array.from(dd.querySelectorAll('[role="menuitem"]'));
    if (!items.length) return;
    var idx = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[idx < items.length - 1 ? idx + 1 : 0].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[idx > 0 ? idx - 1 : items.length - 1].focus();
    } else if (e.key === 'Home') {
      e.preventDefault(); items[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault(); items[items.length - 1].focus();
    } else if (e.key === 'Escape') {
      btn.focus(); setExpanded(false);
    }
  });
};

// Scroll reveal — all targeted elements start hidden; IO reveals them.
// Elements already in-viewport get revealed immediately (IO fires on the
// next rAF after observe()). The body page-in opacity animation runs
// simultaneously, masking the one-frame hidden state for above-fold content.
// Below-fold elements animate in naturally as the user scrolls.
(function() {
  if (!window.IntersectionObserver) return;

  var TARGETS = '.sec-head, .tier, .trust-row, .crumbs, .products-grid';

  function init() {
    var els = Array.from(document.querySelectorAll(TARGETS));
    if (!els.length) return;

    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        el.classList.add('show');
        io.unobserve(el);
        // Remove classes after animation so hover transforms (e.g. .tier:hover) resume
        el.addEventListener('transitionend', function() {
          el.classList.remove('peek', 'show');
          el.style.transitionDelay = '';
        }, { once: true });
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

    var vh = window.innerHeight;
    els.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      // Elements already visible on page load — skip, don't hide them
      if (rect.top < vh && rect.bottom > 0) return;
      el.classList.add('peek');
      // Stagger siblings of same class within same parent
      var peekSibs = Array.from(el.parentElement ? el.parentElement.children : []).filter(function(c) {
        return c.classList.contains('peek');
      });
      var idx = peekSibs.indexOf(el);
      if (idx > 0) el.style.transitionDelay = Math.min(idx * 0.1, 0.4) + 's';
      io.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());

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
    setTimeout(function() { location.href = href; }, 120);
  });
}());
