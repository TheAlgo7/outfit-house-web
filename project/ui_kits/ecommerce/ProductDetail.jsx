// ProductDetail.jsx
const ProductDetail = ({ p, onAdd, onBack }) => {
  const [size, setSize] = React.useState(42);
  React.useEffect(() => { if (window.lucide) lucide.createIcons(); });
  const sizes = [{n:39,d:1},{n:40},{n:41},{n:42},{n:43},{n:44},{n:45,d:1},{n:46,d:1}];
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px' }}>
      <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, fontFamily: 'var(--font-heading)', fontSize: 11, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase' }}>
        <i data-lucide="arrow-left" style={{ width: 14, height: 14 }}></i> Back
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48 }}>
        <div style={{ position: 'relative', background: '#F2ECDD', overflow: 'hidden' }}>
          <img src={p.img} style={{ width: '100%', display: 'block' }}/>
          <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--accent)', color: '#000', fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', padding: '6px 10px' }}>{p.grade} Quality</div>
          <div style={{
            position: 'absolute', left: 16, right: 16, bottom: 16,
            background: 'rgba(20,20,20,0.55)', backdropFilter: 'blur(16px)',
            border: '1px solid rgba(242,236,221,0.10)', padding: '14px 18px', color: 'var(--fg)',
          }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: 10, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>UA Spec · Technical</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginTop: 8 }}>
              {[['Upper','Genuine Lthr'],['Sole','Stitched'],['Box','Original'],['Sizing','True to Nike']].map(([k,v]) => (
                <div key={k}><div style={{ fontFamily: 'var(--font-heading)', fontSize: 9, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600 }}>{k}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 12, color: 'var(--fg)', fontWeight: 700, marginTop: 2 }}>{v}</div></div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: 11, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600 }}>{p.brand}</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, color: 'var(--fg)', textTransform: 'uppercase', lineHeight: 0.95, margin: '8px 0 18px' }}>{p.name}</h1>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 28 }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--fg)', fontSize: 28 }}>{formatINR(p.price)}</span>
            <span style={{ color: 'var(--fg-subtle)', textDecoration: 'line-through', fontSize: 16 }}>{formatINR(p.was)}</span>
            <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 700, letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase' }}>Save {Math.round((1 - p.price/p.was) * 100)}%</span>
          </div>
          <p style={{ color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.65, marginBottom: 28 }}>
            7A construction. Genuine leather upper, stitched (not glued) sole, original tooling box. Hand-checked at our New Delhi warehouse before dispatch.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <label style={{ fontFamily: 'var(--font-heading)', fontSize: 10, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600 }}>Select Size · EU</label>
            <a href="#" style={{ borderBottom: 'none', fontFamily: 'var(--font-heading)', fontSize: 10, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>Size guide</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 6, marginBottom: 28 }}>
            {sizes.map(s => (
              <button key={s.n} disabled={s.d} onClick={()=>setSize(s.n)} style={{
                height: 46, background: size===s.n && !s.d ? 'var(--fg)' : 'transparent',
                color: s.d ? 'var(--fg-subtle)' : (size===s.n ? '#000' : 'var(--fg)'),
                border: '1px solid ' + (size===s.n && !s.d ? 'var(--fg)' : 'var(--border-strong)'),
                fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 600,
                cursor: s.d ? 'not-allowed' : 'pointer', opacity: s.d ? 0.4 : 1,
                position: 'relative',
              }}>{s.n}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Btn kind="primary" full onClick={()=>onAdd(p, size)}>Add to bag · {formatINR(p.price)}</Btn>
            <Btn kind="secondary" full>Save</Btn>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12, color: 'var(--fg-muted)', fontFamily: 'var(--font-body)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}><i data-lucide="truck" style={{ width: 14, height: 14, color: 'var(--accent)' }}></i> Free shipping across India · 3–5 days</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}><i data-lucide="shield-check" style={{ width: 14, height: 14, color: 'var(--accent)' }}></i> Hand-checked QC before dispatch</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: 10 }}><i data-lucide="rotate-ccw" style={{ width: 14, height: 14, color: 'var(--accent)' }}></i> 7-day exchange on size issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
window.ProductDetail = ProductDetail;
