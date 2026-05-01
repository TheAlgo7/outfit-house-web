// Header.jsx — sticky nav with crown logo + cart
const Header = ({ cartCount, onNav, onCart }) => {
  React.useEffect(() => { if (window.lucide) lucide.createIcons(); });
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '14px 32px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 16,
      }}>
        <nav style={{ display: 'flex', gap: 24, fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 600, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>
          {['Sneakers','Apparel','Accessories','Drops'].map(l => (
            <a key={l} href="#" onClick={(e)=>{e.preventDefault(); onNav('home');}}
               style={{ color: 'var(--fg)', borderBottom: 'none', transition: 'color var(--dur-fast)' }}
               onMouseEnter={e=>e.currentTarget.style.color='var(--accent)'}
               onMouseLeave={e=>e.currentTarget.style.color='var(--fg)'}>{l}</a>
          ))}
        </nav>
        <a href="#" onClick={(e)=>{e.preventDefault(); onNav('home');}} style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: 'none' }}>
          <img src="../../assets/logo-crown.png" style={{ width: 28, height: 28, objectFit: 'contain' }}/>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: 0.5 }}>The Outfit House</span>
        </a>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
          <IconBtn icon="search"/>
          <IconBtn icon="user"/>
          <IconBtn icon="heart"/>
          <IconBtn icon="shopping-bag" badge={cartCount || null} onClick={onCart}/>
        </div>
      </div>
    </header>
  );
};
window.Header = Header;
