// PostFrame.jsx — 1080² social post base
const PostFrame = ({ children, bg = 'var(--bg)', label }) => (
  <div style={{
    width: 540, height: 540, // displayed at 50% of 1080² for layout
    position: 'relative', overflow: 'hidden', background: bg,
    fontFamily: 'var(--font-body)',
  }}>
    <div style={{ position: 'absolute', inset: 0, transform: 'scale(0.5)', transformOrigin: 'top left', width: 1080, height: 1080 }}>
      {children}
    </div>
    {label && <div style={{
      position: 'absolute', top: -22, left: 0,
      fontFamily: 'var(--font-heading)', fontSize: 10,
      letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase',
      color: 'var(--fg-muted)', fontWeight: 600,
    }}>{label}</div>}
  </div>
);
window.PostFrame = PostFrame;

// Brand chrome reused across posts
const PostHeader = () => (
  <div style={{ position: 'absolute', top: 48, left: 48, right: 48, display: 'flex', alignItems: 'center', gap: 16, zIndex: 5 }}>
    <img src="../../assets/logo-crown.png" style={{ width: 56, height: 56, objectFit: 'contain' }}/>
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--fg)', textTransform: 'uppercase', lineHeight: 1 }}>The Outfit House</div>
      <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, marginTop: 4 }}>Sneakers · Streetwear · Premium</div>
    </div>
  </div>
);
const PostFooter = ({ handle = '@theoutfithouse', cta }) => (
  <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 5 }}>
    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--fg)', letterSpacing: 'var(--tracking-wide)' }}>{handle}</span>
    {cta && <span style={{ background: 'var(--accent)', color: '#000', fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', padding: '12px 20px' }}>{cta}</span>}
  </div>
);
Object.assign(window, { PostHeader, PostFooter });
