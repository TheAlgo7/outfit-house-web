// Buttons.jsx — primary, secondary, ghost, icon
const Btn = ({ kind = 'primary', children, onClick, full, ...rest }) => {
  const base = {
    fontFamily: 'var(--font-heading)', fontSize: 13, fontWeight: 700,
    letterSpacing: 'var(--tracking-wide)', textTransform: 'uppercase',
    padding: '14px 22px', border: 'none', cursor: 'pointer',
    transition: 'all var(--dur-base) var(--ease-out)',
    width: full ? '100%' : 'auto',
  };
  const variants = {
    primary:   { ...base, background: 'var(--accent)', color: '#000' },
    secondary: { ...base, background: 'transparent', color: 'var(--fg)', border: '1px solid var(--fg)' },
    ghost:     { ...base, background: 'transparent', color: 'var(--fg-muted)', padding: '12px 0' },
    dark:      { ...base, background: 'var(--bg)', color: 'var(--fg)', border: '1px solid var(--border-strong)' },
  };
  return <button style={variants[kind]} onClick={onClick} {...rest}>{children}</button>;
};
const IconBtn = ({ icon, onClick, badge }) => (
  <button onClick={onClick} style={{
    background: 'transparent', border: 'none', color: 'var(--fg)', cursor: 'pointer',
    padding: 8, position: 'relative', display: 'inline-flex',
  }}>
    <i data-lucide={icon} style={{ width: 20, height: 20, strokeWidth: 1.5 }}></i>
    {badge ? <span style={{
      position: 'absolute', top: 2, right: 2, background: 'var(--accent)', color: '#000',
      fontFamily: 'var(--font-heading)', fontSize: 9, fontWeight: 700,
      width: 16, height: 16, borderRadius: '50%', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
    }}>{badge}</span> : null}
  </button>
);
Object.assign(window, { Btn, IconBtn });
