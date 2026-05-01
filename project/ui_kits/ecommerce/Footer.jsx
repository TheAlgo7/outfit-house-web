// Footer.jsx
const Footer = () => (
  <footer style={{ borderTop: '1px solid var(--border)', marginTop: 96, padding: '48px 32px 32px' }}>
    <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 48 }}>
      <div>
        <img src="../../assets/logo-text.png" style={{ width: 140, marginBottom: 16 }}/>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6, maxWidth: 280 }}>
          Premium 7A and UA-grade sneakers and streetwear. Hand-checked, shipped from New Delhi.
        </p>
      </div>
      {[
        { h: 'Shop', items: ['Sneakers', 'Apparel', 'Accessories', 'New Drops'] },
        { h: 'Help', items: ['Sizing', 'Shipping', 'Returns', 'Authenticity'] },
        { h: 'Connect', items: ['Instagram', 'WhatsApp', 'Email', 'Store Locator'] },
      ].map(col => (
        <div key={col.h}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 11, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600, margin: '0 0 14px' }}>{col.h}</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {col.items.map(i => <li key={i}><a href="#" style={{ borderBottom: 'none', color: 'var(--fg)', fontSize: 13 }}>{i}</a></li>)}
          </ul>
        </div>
      ))}
    </div>
    <div style={{ maxWidth: 1280, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>
      <span>© 2026 The Outfit House · New Delhi</span>
      <span>Sneakers · Streetwear · Premium</span>
    </div>
  </footer>
);
window.Footer = Footer;
