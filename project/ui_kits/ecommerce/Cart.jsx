// Cart.jsx — slide-over drawer
const Cart = ({ open, items, onClose, onRemove, onCheckout }) => {
  React.useEffect(() => { if (window.lucide) lucide.createIcons(); });
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(4px)', opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none', transition: 'opacity var(--dur-base)', zIndex: 90,
      }}/>
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 440, maxWidth: '100vw',
        background: 'var(--bg)', borderLeft: '1px solid var(--border)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform var(--dur-base) var(--ease-out)', zIndex: 100,
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--fg)', textTransform: 'uppercase', margin: 0 }}>Your Bag · {items.length}</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--fg)', cursor: 'pointer' }}>
            <i data-lucide="x" style={{ width: 20, height: 20 }}></i>
          </button>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: '8px 24px' }}>
          {items.length === 0 ? (
            <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--fg-muted)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 12, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase' }}>Your bag is empty</div>
            </div>
          ) : items.map((i, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '80px 1fr auto', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ aspectRatio: '1', background: '#F2ECDD', overflow: 'hidden' }}>
                <img src={i.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 9, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600 }}>{i.brand}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--fg)', textTransform: 'uppercase', lineHeight: 1.1, marginTop: 2 }}>{i.name}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>EU {i.size} · {i.grade}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--fg)' }}>{formatINR(i.price)}</span>
                <button onClick={()=>onRemove(idx)} style={{ background: 'transparent', border: 'none', color: 'var(--fg-subtle)', cursor: 'pointer', fontSize: 11, fontFamily: 'var(--font-heading)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13, color: 'var(--fg-muted)' }}>
              <span>Subtotal</span><span>{formatINR(subtotal)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, fontSize: 13, color: 'var(--fg-muted)' }}>
              <span>Shipping</span><span style={{ color: 'var(--accent)' }}>Free</span>
            </div>
            <Btn kind="primary" full onClick={onCheckout}>Checkout · {formatINR(subtotal)}</Btn>
            <p style={{ fontSize: 11, color: 'var(--fg-subtle)', textAlign: 'center', margin: '12px 0 0', fontFamily: 'var(--font-heading)', letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Pay on delivery available</p>
          </div>
        )}
      </aside>
    </>
  );
};
window.Cart = Cart;
