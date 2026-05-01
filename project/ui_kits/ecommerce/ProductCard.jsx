// ProductCard.jsx + ProductGrid.jsx
const ProductCard = ({ p, onOpen }) => {
  const [hov, setHov] = React.useState(false);
  return (
    <div onClick={()=>onOpen(p)}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: 'var(--bg-elev)',
        border: '1px solid ' + (hov ? 'var(--border-strong)' : 'transparent'),
        cursor: 'pointer', display: 'flex', flexDirection: 'column',
        transition: 'all var(--dur-base) var(--ease-out)',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
      }}>
      <div style={{ aspectRatio: '4/3', background: '#F2ECDD', position: 'relative', overflow: 'hidden' }}>
        <img src={p.img} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--dur-slow)', transform: hov ? 'scale(1.04)' : 'scale(1)' }}/>
        <span style={{
          position: 'absolute', top: 12, left: 12,
          background: 'var(--accent)', color: '#000',
          fontFamily: 'var(--font-heading)', fontSize: 10, fontWeight: 700,
          letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase',
          padding: '5px 9px',
        }}>{p.grade}</span>
        {p.tag && <span style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: 'var(--accent)',
          fontFamily: 'var(--font-heading)', fontSize: 10, fontWeight: 700,
          letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', padding: '5px 9px',
        }}>{p.tag}</span>}
      </div>
      <div style={{ padding: '16px 18px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 10, letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--fg-muted)', fontWeight: 600 }}>{p.brand}</span>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--fg)', textTransform: 'uppercase', lineHeight: 1.05, marginTop: 2 }}>{p.name}</span>
        <div style={{ marginTop: 10, display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--fg)', fontSize: 15 }}>{formatINR(p.price)}</span>
          <span style={{ fontFamily: 'var(--font-body)', color: 'var(--fg-subtle)', textDecoration: 'line-through', fontSize: 13 }}>{formatINR(p.was)}</span>
        </div>
      </div>
    </div>
  );
};
const ProductGrid = ({ items, onOpen }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
    {items.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen}/>)}
  </div>
);
Object.assign(window, { ProductCard, ProductGrid });
