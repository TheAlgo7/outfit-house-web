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
  { slug:'mid-top-sneaker-panda', cat:'sneakers', brand:'Mid-Top Sneaker', name:'Panda', grade:'Standard', img:'assets/Sneakers/mid-top-sneaker-panda.webp' },
  { slug:'retro-runner-cream-sea-salt', cat:'sneakers', brand:'Retro Runner', name:'Cream Sea Salt', grade:'Vault', img:'assets/Sneakers/retro-runner-cream-sea-salt.webp' },
  { slug:'court-sneaker-white-green', cat:'sneakers', brand:'Court Sneaker', name:'White Green', grade:'Standard', img:'assets/Sneakers/court-sneaker-white-green.webp' },
  { slug:'retro-runner-stone-pink', cat:'sneakers', brand:'Retro Runner', name:'Stone Pink', grade:'Vault', img:'assets/Sneakers/retro-runner-stone-pink.webp' },
  { slug:'mid-top-sneaker-shadow-grey', cat:'sneakers', brand:'Mid-Top Sneaker', name:'Shadow Grey', grade:'Entry', img:'assets/Sneakers/mid-top-sneaker-shadow-grey.webp' },
  { slug:'chunky-runner-protection-grey', cat:'sneakers', brand:'Chunky Runner', name:'Protection Grey', grade:'Vault', img:'assets/Sneakers/chunky-runner-protection-grey.webp' },
  { slug:'knit-runner-zebra', cat:'sneakers', brand:'Knit Runner', name:'Zebra', grade:'Vault', img:'assets/Sneakers/knit-runner-zebra.webp' },
  { slug:'slide-bone', cat:'sneakers', brand:'Slide', name:'Bone', grade:'Standard', img:'assets/Sneakers/slide-bone.webp' },
  { slug:'mid-top-sneaker-bred-reimagined', cat:'sneakers', brand:'Mid-Top Sneaker', name:'Bred Reimagined', grade:'Vault', img:'assets/Sneakers/mid-top-sneaker-bred-reimagined.webp' },
  { slug:'skate-low-university-blue', cat:'sneakers', brand:'Skate Low', name:'University Blue', grade:'Standard', img:'assets/Sneakers/skate-low-university-blue.webp' },
  { slug:'chunky-runner-rain-cloud', cat:'sneakers', brand:'Chunky Runner', name:'Rain Cloud', grade:'Vault', img:'assets/Sneakers/chunky-runner-rain-cloud.webp' },
  { slug:'retro-runner-infrared', cat:'sneakers', brand:'Retro Runner', name:'Infrared', grade:'Standard', img:'assets/Sneakers/retro-runner-infrared.webp' },
  { slug:'suede-low-grey', cat:'sneakers', brand:'Suede Low', name:'Grey', grade:'Standard', img:'assets/Sneakers/suede-low-grey.webp' },
  { slug:'chunky-runner-cream', cat:'sneakers', brand:'Chunky Runner', name:'Cream', grade:'Standard', img:'assets/Sneakers/chunky-runner-cream.webp' },
  { slug:'retro-trainer-white-blue', cat:'sneakers', brand:'Retro Trainer', name:'White Blue', grade:'Entry', img:'assets/Sneakers/retro-trainer-white-blue.webp' },
  { slug:'clog-black', cat:'sneakers', brand:'Clog', name:'Black', grade:'Entry', img:'assets/Sneakers/clog-black.webp' },
  { slug:'high-top-sneaker-chicago', cat:'sneakers', brand:'High-Top Sneaker', name:'Chicago', grade:'Vault', img:'assets/Sneakers/high-top-sneaker-chicago.webp' },
  { slug:'patent-high-top-concord', cat:'sneakers', brand:'Patent High-Top', name:'Concord', grade:'Vault', img:'assets/Sneakers/patent-high-top-concord.webp' },
  { slug:'skate-low-grey-fog', cat:'sneakers', brand:'Skate Low', name:'Grey Fog', grade:'Standard', img:'assets/Sneakers/skate-low-grey-fog.webp' },
  { slug:'chunky-runner-silver-metallic', cat:'sneakers', brand:'Chunky Runner', name:'Silver Metallic', grade:'Vault', img:'assets/Sneakers/chunky-runner-silver-metallic.webp' },
  { slug:'chunky-runner-wave-runner', cat:'sneakers', brand:'Chunky Runner', name:'Wave Runner', grade:'Vault', img:'assets/Sneakers/chunky-runner-wave-runner.webp' },
  { slug:'retro-runner-silver-bullet', cat:'sneakers', brand:'Retro Runner', name:'Silver Bullet', grade:'Standard', img:'assets/Sneakers/retro-runner-silver-bullet.webp' },
  { slug:'trail-runner-phantom', cat:'sneakers', brand:'Trail Runner', name:'Phantom', grade:'Standard', img:'assets/Sneakers/trail-runner-phantom.webp' },
  { slug:'racing-flat-og-black', cat:'sneakers', brand:'Racing Flat', name:'OG Black', grade:'Standard', img:'assets/Sneakers/racing-flat-og-black.webp' },
  { slug:'high-top-sneaker-white-cement', cat:'sneakers', brand:'High-Top Sneaker', name:'White Cement', grade:'Vault', img:'assets/Sneakers/high-top-sneaker-white-cement.webp' },
  { slug:'mid-top-sneaker-military-black', cat:'sneakers', brand:'Mid-Top Sneaker', name:'Military Black', grade:'Vault', img:'assets/Sneakers/mid-top-sneaker-military-black.webp' },
  { slug:'low-top-sneaker-reverse-olive', cat:'sneakers', brand:'Low-Top Sneaker', name:'Reverse Olive', grade:'Vault', img:'assets/Sneakers/low-top-sneaker-reverse-olive.webp' },
  { slug:'chunky-runner-grey-suede', cat:'sneakers', brand:'Chunky Runner', name:'Grey Suede', grade:'Vault', img:'assets/Sneakers/chunky-runner-grey-suede.webp' },
  { slug:'retro-runner-big-bubble', cat:'sneakers', brand:'Retro Runner', name:'Big Bubble', grade:'Standard', img:'assets/Sneakers/retro-runner-big-bubble.webp' },
  { slug:'chunky-runner-white-silver', cat:'sneakers', brand:'Chunky Runner', name:'White Silver', grade:'Standard', img:'assets/Sneakers/chunky-runner-white-silver.webp' },
  { slug:'skate-low-black-white', cat:'sneakers', brand:'Skate Low', name:'Black & White', grade:'Entry', img:'assets/Sneakers/skate-low-black-white.webp' },
  { slug:'canvas-high-top-black', cat:'sneakers', brand:'Canvas High-Top', name:'Black', grade:'Entry', img:'assets/Sneakers/canvas-high-top-black.webp' },
  { slug:'track-runner-classic-white', cat:'sneakers', brand:'Track Runner', name:'Classic White', grade:'Entry', img:'assets/Sneakers/track-runner-classic-white.webp' },
  { slug:'low-top-gum-sole-sneaker-green-cream', cat:'sneakers', stock:'in', sizes:'8, 9, 10', brand:'Low-Top Gum-Sole Sneaker', name:'Green & Cream', grade:'Standard', img:'assets/Sneakers/low-top-gum-sole-sneaker-green-cream.webp', imgs:['assets/Sneakers/low-top-gum-sole-sneaker-green-cream-2.webp', 'assets/Sneakers/low-top-gum-sole-sneaker-green-cream-3.webp'] },
  { slug:'low-top-gum-sole-sneaker-night-navy', cat:'sneakers', stock:'in', sizes:'8, 9, 10', brand:'Low-Top Gum-Sole Sneaker', name:'Night Navy', grade:'Standard', img:'assets/Sneakers/low-top-gum-sole-sneaker-night-navy.webp' },
  { slug:'low-top-gum-sole-sneaker-white', cat:'sneakers', stock:'in', sizes:'8, 9, 10', brand:'Low-Top Gum-Sole Sneaker', name:'White', grade:'Standard', img:'assets/Sneakers/low-top-gum-sole-sneaker-white.webp' },
  { slug:'lightweight-runner-sport-mesh', cat:'sneakers', stock:'in', sizes:'8, 9', brand:'Lightweight Runner', name:'Sport Mesh', grade:'Entry', img:'assets/Sneakers/lightweight-runner-sport-mesh.webp' },
  { slug:'retro-runner-navy', cat:'sneakers', stock:'in', sizes:'6, 8, 9', brand:'Retro Runner', name:'Navy', grade:'Standard', img:'assets/Sneakers/retro-runner-navy.webp' },
  { slug:'retro-runner-maroon', cat:'sneakers', stock:'in', sizes:'6, 8, 9', brand:'Retro Runner', name:'Maroon', grade:'Standard', img:'assets/Sneakers/retro-runner-maroon.webp' },
  { slug:'retro-runner-black-grey', cat:'sneakers', stock:'in', sizes:'6, 8, 9', brand:'Retro Runner', name:'Black & Grey', grade:'Standard', img:'assets/Sneakers/retro-runner-black-grey.webp' },
  { slug:'low-profile-retro-runner-cream', cat:'sneakers', stock:'in', sizes:'9', brand:'Low-Profile Retro Runner', name:'Cream', grade:'Standard', img:'assets/Sneakers/low-profile-retro-runner-cream.webp' },
  { slug:'low-profile-retro-runner-black-white', cat:'sneakers', stock:'in', sizes:'7, 9', brand:'Low-Profile Retro Runner', name:'Black & White', grade:'Standard', img:'assets/Sneakers/low-profile-retro-runner-black-white.webp' },
  { slug:'low-profile-retro-runner-horse-edition', cat:'sneakers', stock:'in', sizes:'8, 9', limited:true, brand:'Low-Profile Retro Runner', name:'Horse Edition', grade:'Vault', img:'assets/Sneakers/low-profile-retro-runner-horse-edition.webp', imgs:['assets/Sneakers/low-profile-retro-runner-horse-edition-2.webp', 'assets/Sneakers/low-profile-retro-runner-horse-edition-3.webp', 'assets/Sneakers/low-profile-retro-runner-horse-edition-4.webp'] },
  { slug:'chunky-runner-black', cat:'sneakers', stock:'in', sizes:'7, 8, 9', brand:'Chunky Runner', name:'Black', grade:'Standard', img:'assets/Sneakers/chunky-runner-black.webp' },
  { slug:'chunky-runner-white-silver-navy', cat:'sneakers', stock:'in', sizes:'8, 9', brand:'Chunky Runner', name:'White, Silver & Navy', grade:'Standard', img:'assets/Sneakers/chunky-runner-white-silver-navy.webp', imgs:['assets/Sneakers/chunky-runner-white-silver-navy-2.webp'] },
  { slug:'low-top-court-sneaker-phantom-black', cat:'sneakers', stock:'in', sizes:'8, 9', brand:'Low-Top Court Sneaker', name:'Phantom Black', grade:'Standard', img:'assets/Sneakers/low-top-court-sneaker-phantom-black.webp' },
  { slug:'low-top-court-sneaker-all-white', cat:'sneakers', stock:'in', sizes:'8, 9', brand:'Low-Top Court Sneaker', name:'All White', grade:'Standard', img:'assets/Sneakers/low-top-court-sneaker-all-white.webp' },
  { slug:'low-top-court-sneaker-wolf-grey', cat:'sneakers', stock:'in', sizes:'6, 8, 9', brand:'Low-Top Court Sneaker', name:'Wolf Grey', grade:'Standard', img:'assets/Sneakers/low-top-court-sneaker-wolf-grey.webp' },
  { slug:'vintage-low-top-court-sneaker-sail', cat:'sneakers', stock:'in', sizes:'7, 9', brand:'Vintage Low-Top Court Sneaker', name:'Sail', grade:'Standard', img:'assets/Sneakers/vintage-low-top-court-sneaker-sail.webp' },
  { slug:'performance-runner-orange-burst', cat:'sneakers', stock:'in', sizes:'6, 8', brand:'Performance Runner', name:'Orange Burst', grade:'Standard', img:'assets/Sneakers/performance-runner-orange-burst.webp' },
  { slug:'low-top-court-sneaker-reverse-mocha', cat:'sneakers', stock:'in', sizes:'7, 8, 9', brand:'Low-Top Court Sneaker', name:'Reverse Mocha', grade:'Vault', img:'assets/Sneakers/low-top-court-sneaker-reverse-mocha.webp', imgs:['assets/Sneakers/low-top-court-sneaker-reverse-mocha-2.webp', 'assets/Sneakers/low-top-court-sneaker-reverse-mocha-3.webp'] },
  { slug:'low-top-sneaker-panda', cat:'sneakers', stock:'in', sizes:'6, 8', brand:'Low-Top Sneaker', name:'Panda', grade:'Standard', img:'assets/Sneakers/low-top-sneaker-panda.webp' },
  { slug:'high-top-court-sneaker-mocha', cat:'sneakers', stock:'in', sizes:'8, 9', brand:'High-Top Court Sneaker', name:'Mocha', grade:'Vault', img:'assets/Sneakers/high-top-court-sneaker-mocha.webp', imgs:['assets/Sneakers/high-top-court-sneaker-mocha-2.webp', 'assets/Sneakers/high-top-court-sneaker-mocha-3.webp'] },
  // ---------- Apparel ----------
  { slug:'toh-crest-tee', cat:'apparel', stock:'sold', brand:'TOH', name:'Crest Tee', grade:'Entry', img:'assets/Apparel/toh-crest-tee.webp' },
  { slug:'heavyweight-hoodie-oatmeal', cat:'apparel', stock:'sold', brand:'Heavyweight Hoodie', name:'Oatmeal', grade:'Standard', img:'assets/Apparel/heavyweight-hoodie-oatmeal.webp' },
  { slug:'graphic-hoodie-pink-web', cat:'apparel', stock:'sold', brand:'Graphic Hoodie', name:'Pink Web', grade:'Vault', img:'assets/Apparel/graphic-hoodie-pink-web.webp' },
  { slug:'overshirt-washed-black', cat:'apparel', stock:'sold', brand:'Overshirt', name:'Washed Black', grade:'Standard', img:'assets/Apparel/overshirt-washed-black.webp' },
  { slug:'cotton-tee-basic-white', cat:'apparel', stock:'sold', brand:'Cotton Tee', name:'Basic White', grade:'Entry', img:'assets/Apparel/cotton-tee-basic-white.webp' },
  { slug:'tech-hoodie-black', cat:'apparel', stock:'sold', brand:'Tech Hoodie', name:'Black', grade:'Standard', img:'assets/Apparel/tech-hoodie-black.webp' },
  { slug:'graphic-hoodie-black-white', cat:'apparel', stock:'sold', brand:'Graphic Hoodie', name:'Black & White', grade:'Vault', img:'assets/Apparel/graphic-hoodie-black-white.webp' },
  { slug:'full-zip-hoodie-camo', cat:'apparel', stock:'sold', brand:'Full-Zip Hoodie', name:'Camo', grade:'Vault', img:'assets/Apparel/full-zip-hoodie-camo.webp' },
  { slug:'hooded-sweatshirt-brown', cat:'apparel', stock:'sold', brand:'Hooded Sweatshirt', name:'Brown', grade:'Standard', img:'assets/Apparel/hooded-sweatshirt-brown.webp' },
  { slug:'graphic-tee-bear-print', cat:'apparel', stock:'sold', brand:'Graphic Tee', name:'Bear Print', grade:'Standard', img:'assets/Apparel/graphic-tee-bear-print.webp' },
  { slug:'down-puffer-black', cat:'apparel', stock:'sold', brand:'Down Puffer', name:'Black', grade:'Vault', img:'assets/Apparel/down-puffer-black.webp' },
  { slug:'crewneck-slate-grey', cat:'apparel', stock:'sold', brand:'Crewneck', name:'Slate Grey', grade:'Vault', img:'assets/Apparel/crewneck-slate-grey.webp' },
  { slug:'logo-hoodie-red', cat:'apparel', stock:'sold', brand:'Logo Hoodie', name:'Red', grade:'Vault', img:'assets/Apparel/logo-hoodie-red.webp' },
  { slug:'graphic-tee-8-ball', cat:'apparel', stock:'sold', brand:'Graphic Tee', name:'8-Ball', grade:'Standard', img:'assets/Apparel/graphic-tee-8-ball.webp' },
  { slug:'graphic-tee-4-star', cat:'apparel', stock:'sold', brand:'Graphic Tee', name:'4-Star', grade:'Standard', img:'assets/Apparel/graphic-tee-4-star.webp' },
  { slug:'cotton-tee-cream', cat:'apparel', stock:'sold', brand:'Cotton Tee', name:'Cream', grade:'Standard', img:'assets/Apparel/cotton-tee-cream.webp' },
  { slug:'cotton-tee-black', cat:'apparel', stock:'sold', brand:'Cotton Tee', name:'Black', grade:'Entry', img:'assets/Apparel/cotton-tee-black.webp' },
  { slug:'track-top-black-white', cat:'apparel', stock:'sold', brand:'Track Top', name:'Black & White', grade:'Standard', img:'assets/Apparel/track-top-black-white.webp' },
  { slug:'crewneck-wreath-print', cat:'apparel', stock:'sold', brand:'Crewneck', name:'Wreath Print', grade:'Vault', img:'assets/Apparel/crewneck-wreath-print.webp' },
  { slug:'graphic-tee-tri-logo', cat:'apparel', stock:'sold', brand:'Graphic Tee', name:'Tri-Logo', grade:'Standard', img:'assets/Apparel/graphic-tee-tri-logo.webp' },
  { slug:'graphic-hoodie-black-web', cat:'apparel', stock:'sold', brand:'Graphic Hoodie', name:'Black Web', grade:'Vault', img:'assets/Apparel/graphic-hoodie-black-web.webp' },
  { slug:'graphic-tee-black-cross', cat:'apparel', stock:'sold', brand:'Graphic Tee', name:'Black Cross', grade:'Vault', img:'assets/Apparel/graphic-tee-black-cross.webp' },
  { slug:'graphic-tee-vintage-white', cat:'apparel', stock:'sold', brand:'Graphic Tee', name:'Vintage White', grade:'Vault', img:'assets/Apparel/graphic-tee-vintage-white.webp' },
  { slug:'graphic-tee-grey-print', cat:'apparel', stock:'sold', brand:'Graphic Tee', name:'Grey Print', grade:'Standard', img:'assets/Apparel/graphic-tee-grey-print.webp' },
  { slug:'tech-hoodie-grey', cat:'apparel', stock:'sold', brand:'Tech Hoodie', name:'Grey', grade:'Vault', img:'assets/Apparel/tech-hoodie-grey.webp' },
  { slug:'tech-shell-jacket-black', cat:'apparel', stock:'sold', brand:'Tech Shell Jacket', name:'Black', grade:'Vault', img:'assets/Apparel/tech-shell-jacket-black.webp' },
  { slug:'crewneck-heather-grey', cat:'apparel', stock:'sold', brand:'Crewneck', name:'Heather Grey', grade:'Standard', img:'assets/Apparel/crewneck-heather-grey.webp' },
  { slug:'cotton-tee-white-logo', cat:'apparel', stock:'sold', brand:'Cotton Tee', name:'White Logo', grade:'Entry', img:'assets/Apparel/cotton-tee-white-logo.webp' },
  // ---------- Bottomwear ----------
  { slug:'sweatpants-oatmeal', cat:'bottomwear', stock:'sold', brand:'Sweatpants', name:'Oatmeal', grade:'Standard', img:'assets/Bottomwear/sweatpants-oatmeal.webp' },
  { slug:'cargo-pants-olive', cat:'bottomwear', stock:'sold', brand:'Cargo Pants', name:'Olive', grade:'Vault', img:'assets/Bottomwear/cargo-pants-olive.webp' },
  { slug:'toh-baggy-denim-indigo', cat:'bottomwear', stock:'sold', brand:'TOH', name:'Baggy Denim · Indigo', grade:'Entry', img:'assets/Bottomwear/toh-baggy-denim-indigo.webp' },
  { slug:'tech-joggers-black', cat:'bottomwear', stock:'sold', brand:'Tech Joggers', name:'Black', grade:'Standard', img:'assets/Bottomwear/tech-joggers-black.webp' },
  { slug:'track-pants-black', cat:'bottomwear', stock:'sold', brand:'Track Pants', name:'Black', grade:'Entry', img:'assets/Bottomwear/track-pants-black.webp' },
  { slug:'cargo-pants-beige', cat:'bottomwear', stock:'sold', brand:'Cargo Pants', name:'Beige', grade:'Standard', img:'assets/Bottomwear/cargo-pants-beige.webp' },
  { slug:'straight-denim-mid-blue', cat:'bottomwear', stock:'sold', brand:'Straight Denim', name:'Mid Blue', grade:'Standard', img:'assets/Bottomwear/straight-denim-mid-blue.webp' },
  { slug:'baggy-denim-washed-blue', cat:'bottomwear', stock:'sold', brand:'Baggy Denim', name:'Washed Blue', grade:'Vault', img:'assets/Bottomwear/baggy-denim-washed-blue.webp' },
  { slug:'fleece-shorts-black', cat:'bottomwear', stock:'sold', brand:'Fleece Shorts', name:'Black', grade:'Standard', img:'assets/Bottomwear/fleece-shorts-black.webp' },
  { slug:'sweat-shorts-grey', cat:'bottomwear', stock:'sold', brand:'Sweat Shorts', name:'Grey', grade:'Entry', img:'assets/Bottomwear/sweat-shorts-grey.webp' },
  { slug:'work-pants-brown', cat:'bottomwear', stock:'sold', brand:'Work Pants', name:'Brown', grade:'Standard', img:'assets/Bottomwear/work-pants-brown.webp' },
  { slug:'sport-shorts-black', cat:'bottomwear', stock:'sold', brand:'Sport Shorts', name:'Black', grade:'Entry', img:'assets/Bottomwear/sport-shorts-black.webp' },
  { slug:'bootcut-denim-mid-blue', cat:'bottomwear', stock:'sold', brand:'Bootcut Denim', name:'Mid Blue', grade:'Standard', img:'assets/Bottomwear/bootcut-denim-mid-blue.webp' },
  { slug:'cargo-shorts-khaki', cat:'bottomwear', stock:'sold', brand:'Cargo Shorts', name:'Khaki', grade:'Standard', img:'assets/Bottomwear/cargo-shorts-khaki.webp' },
  { slug:'distressed-denim-indigo', cat:'bottomwear', stock:'sold', brand:'Distressed Denim', name:'Indigo', grade:'Vault', img:'assets/Bottomwear/distressed-denim-indigo.webp' },
  { slug:'sweatpants-pink', cat:'bottomwear', stock:'sold', brand:'Sweatpants', name:'Pink', grade:'Vault', img:'assets/Bottomwear/sweatpants-pink.webp' },
  { slug:'cargo-pants-slate', cat:'bottomwear', stock:'sold', brand:'Cargo Pants', name:'Slate', grade:'Vault', img:'assets/Bottomwear/cargo-pants-slate.webp' },
  { slug:'track-pants-navy', cat:'bottomwear', stock:'sold', brand:'Track Pants', name:'Navy', grade:'Standard', img:'assets/Bottomwear/track-pants-navy.webp' },
  { slug:'fleece-joggers-grey', cat:'bottomwear', stock:'sold', brand:'Fleece Joggers', name:'Grey', grade:'Entry', img:'assets/Bottomwear/fleece-joggers-grey.webp' },
  { slug:'work-pants-black', cat:'bottomwear', stock:'sold', brand:'Work Pants', name:'Black', grade:'Entry', img:'assets/Bottomwear/work-pants-black.webp' },
  // ---------- Accessories ----------
  { slug:'toh-crown-tote-cream', cat:'accessories', stock:'sold', brand:'TOH', name:'Crown Tote · Cream', grade:'Entry', img:'assets/Accessories/toh-crown-tote-cream.webp' },
  { slug:'6-panel-cap-navy', cat:'accessories', stock:'sold', brand:'6-Panel Cap', name:'Navy', grade:'Standard', img:'assets/Accessories/6-panel-cap-navy.webp' },
  { slug:'toh-crew-sock-3-pack', cat:'accessories', stock:'sold', brand:'TOH', name:'Crew Sock 3-Pack', grade:'Entry', img:'assets/Accessories/toh-crew-sock-3-pack.webp' },
  { slug:'sunglasses-classic-black', cat:'accessories', stock:'sold', brand:'Sunglasses', name:'Classic Black', grade:'Standard', img:'assets/Accessories/sunglasses-classic-black.webp' },
  { slug:'sunglasses-pilot-gold', cat:'accessories', stock:'sold', brand:'Sunglasses', name:'Pilot Gold', grade:'Standard', img:'assets/Accessories/sunglasses-pilot-gold.webp' },
  { slug:'toh-double-buckle-leather-belt', cat:'accessories', stock:'sold', brand:'TOH', name:'Double-Buckle Leather Belt', grade:'Standard', img:'assets/Accessories/toh-double-buckle-leather-belt.webp' },
  { slug:'fitted-cap-navy', cat:'accessories', stock:'sold', brand:'Fitted Cap', name:'Navy', grade:'Standard', img:'assets/Accessories/fitted-cap-navy.webp' },
  { slug:'premium-wallet-brown-print', cat:'accessories', stock:'sold', brand:'Premium Wallet', name:'Brown Print', grade:'Vault', img:'assets/Accessories/premium-wallet-brown-print.webp' },
  { slug:'card-holder-black-leather', cat:'accessories', stock:'sold', brand:'Card Holder', name:'Black Leather', grade:'Vault', img:'assets/Accessories/card-holder-black-leather.webp' },
  { slug:'premium-wallet-black-leather', cat:'accessories', stock:'sold', brand:'Premium Wallet', name:'Black Leather', grade:'Standard', img:'assets/Accessories/premium-wallet-black-leather.webp' },
  { slug:'toh-bifold-leather-wallet', cat:'accessories', stock:'sold', brand:'TOH', name:'Bifold Leather Wallet', grade:'Entry', img:'assets/Accessories/toh-bifold-leather-wallet.webp' },
  { slug:'sports-watch-chronograph-black', cat:'accessories', stock:'sold', brand:'Sports Watch', name:'Chronograph Black', grade:'Standard', img:'assets/Accessories/sports-watch-chronograph-black.webp' },
  { slug:'sports-watch-black-resin', cat:'accessories', stock:'sold', brand:'Sports Watch', name:'Black Resin', grade:'Standard', img:'assets/Accessories/sports-watch-black-resin.webp' },
  { slug:'luxury-watch-silver-blue', cat:'accessories', stock:'sold', brand:'Luxury Watch', name:'Silver & Blue', grade:'Vault', img:'assets/Accessories/luxury-watch-silver-blue.webp' },
  { slug:'crossbody-bag-black', cat:'accessories', stock:'sold', brand:'Crossbody Bag', name:'Black', grade:'Standard', img:'assets/Accessories/crossbody-bag-black.webp' },
  { slug:'toh-ribbed-beanie', cat:'accessories', stock:'sold', brand:'TOH', name:'Ribbed Beanie', grade:'Entry', img:'assets/Accessories/toh-ribbed-beanie.webp' },
  { slug:'bucket-hat-black', cat:'accessories', stock:'sold', brand:'Bucket Hat', name:'Black', grade:'Standard', img:'assets/Accessories/bucket-hat-black.webp' },
  { slug:'knit-beanie-brown', cat:'accessories', stock:'sold', brand:'Knit Beanie', name:'Brown', grade:'Standard', img:'assets/Accessories/knit-beanie-brown.webp' },
  { slug:'backpack-black', cat:'accessories', stock:'sold', brand:'Backpack', name:'Black', grade:'Entry', img:'assets/Accessories/backpack-black.webp' },
  { slug:'duffle-bag-brown-print', cat:'accessories', stock:'sold', brand:'Duffle Bag', name:'Brown Print', grade:'Vault', img:'assets/Accessories/duffle-bag-brown-print.webp' },
  { slug:'luxury-watch-steel-blue', cat:'accessories', stock:'sold', brand:'Luxury Watch', name:'Steel Blue', grade:'Vault', img:'assets/Accessories/luxury-watch-steel-blue.webp' },
  { slug:'luxury-watch-gold-steel', cat:'accessories', stock:'sold', brand:'Luxury Watch', name:'Gold & Steel', grade:'Vault', img:'assets/Accessories/luxury-watch-gold-steel.webp' },
  { slug:'cuban-link-chain-iced-silver', cat:'accessories', stock:'sold', brand:'Cuban Link Chain', name:'Iced Silver', grade:'Standard', img:'assets/Accessories/cuban-link-chain-iced-silver.webp' },
  { slug:'card-holder-tan-chevron', cat:'accessories', stock:'sold', brand:'Card Holder', name:'Tan Chevron', grade:'Vault', img:'assets/Accessories/card-holder-tan-chevron.webp' },
  { slug:'shoulder-bag-black-nylon', cat:'accessories', stock:'sold', brand:'Shoulder Bag', name:'Black Nylon', grade:'Vault', img:'assets/Accessories/shoulder-bag-black-nylon.webp' },
  { slug:'sport-sunglasses-black', cat:'accessories', stock:'sold', brand:'Sport Sunglasses', name:'Black', grade:'Standard', img:'assets/Accessories/sport-sunglasses-black.webp' },
];

// Render product card markup (shared)
// Stretched-link pattern: pc-name::after covers the card; pc-cta sits above via z-index
window.renderProductCard = function(p) {
  var sold = p.stock === 'sold';
  var card = document.createElement('div');
  card.className = 'pc' + (p.limited ? ' pc--limited' : '') + (sold ? ' pc--sold' : '');
  card.setAttribute('data-grade', p.grade);
  var altImg = (p.imgs && p.imgs.length) ? '<img class="pc-img-alt" src="/' + p.imgs[0] + '" alt="" aria-hidden="true" loading="lazy" decoding="async" width="600" height="600"/>' : '';
  var badge = sold ? '<span class="pc-grade sold">Sold out</span>' : '<span class="pc-grade ' + gradeClass(p.grade) + '">' + p.grade + '</span>';
  var limited = p.limited ? '<span class="pc-limited">Limited edition</span>' : '';
  var status = sold ? '<span class="pc-stock sold">Sold out</span>'
    : (p.stock === 'in' ? '<span class="pc-stock">In stock now' + (p.sizes ? ' · UK ' + p.sizes : '') + '</span>' : '');
  var cta = sold ? '<button class="pc-cta" disabled aria-disabled="true">Sold out</button>'
    : '<button class="pc-cta"><svg><use href="#wa-icon"/></svg> Enquire on WhatsApp</button>';
  card.innerHTML = `
    <div class="pc-img">
      ${limited}
      ${badge}
      <img src="/${p.img}" alt="${p.name}" loading="lazy" decoding="async" width="600" height="600" onerror="this.onerror=null;this.src='/assets/placeholder.svg'"/>
      ${altImg}
    </div>
    <div class="pc-body">
      <span class="pc-brand">${p.brand}</span>
      <a class="pc-name" href="/product/${p.slug}">${p.name}</a>
      ${status}
      <span class="pc-price">${sold ? 'Currently unavailable' : 'Price on enquiry'}</span>
      ${cta}
    </div>`;
  var ctaBtn = card.querySelector('.pc-cta');
  if (ctaBtn && !sold) ctaBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    wa('Hi! I want to enquire about ' + p.name + ' (' + p.grade + '). Available sizes? ' + location.origin + '/product/' + p.slug);
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
    { h:'Guide',      href:'/guide' },
    { h:'Contact',    href:'/contact' },
  ];
  return `
  <header class="nav">
    <div class="nav-inner">
      <button class="nav-toggle" aria-label="Open menu" onclick="openMobNav()">
        <svg><use href="#menu-icon"/></svg>
      </button>
      <a class="brand" href="/">
        <img src="/assets/logo-crown.webp" alt="The Outfit House crown logo"/>
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
        <img src="/assets/logo-text.webp" alt="The Outfit House" width="360" height="261" loading="lazy"/>
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
        <li><a href="/guide">Buying Guide</a></li>
        <li><a href="/terms">Shipping</a></li>
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
      <span><a href="/terms">Policy</a> · <a href="/terms">Terms</a></span>
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
