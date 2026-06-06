import { ACC, ACC2, BD, MU, SURF, TX, mono, serif } from '../theme.js';

export const NAV_ITEMS = [
  { id: 'overview',   label: 'Overview',     glyph: '◈' },
  { id: 'quickstart', label: 'Quick Start',  glyph: '▹' },
  { id: 'syntax',     label: 'Syntax',       glyph: '≋' },
  { id: 'types',      label: 'Type System',  glyph: 'Π' },
  { id: 'paths',      label: 'Path Types',   glyph: '⟨⟩' },
  { id: 'cubical',    label: 'Cubical Ops',  glyph: '□' },
  { id: 'equiv',      label: 'Equivalences', glyph: '≃' },
  { id: 'examples',   label: 'Examples',     glyph: '✓' },
];

export function Sidebar({ active, onSelect }) {
  return (
    <nav style={{
      width: 230, flexShrink: 0, background: SURF,
      borderRight: `1px solid ${BD}`,
      padding: '0',
      height: '100vh', overflowY: 'auto',
      display: 'flex', flexDirection: 'column',
      boxShadow: '2px 0 12px rgba(0,0,0,0.04)',
    }}>
      {/* Logo */}
      <div style={{
        padding: '28px 24px 24px',
        borderBottom: `1px solid ${BD}`,
        background: `linear-gradient(135deg, ${SURF} 0%, #f0eeff 100%)`,
      }}>
        <div style={{
          fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px',
          fontFamily: serif,
          background: `linear-gradient(135deg, ${ACC} 0%, ${ACC2} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          octo
        </div>
        <div style={{
          fontSize: 10, color: MU, marginTop: 4, letterSpacing: '0.12em',
          textTransform: 'uppercase', fontFamily: mono,
        }}>
          Cubical Type Theory
        </div>
      </div>

      {/* Nav items */}
      <ul style={{ listStyle: 'none', margin: '10px 0 0', padding: '0 10px', flex: 1 }}>
        {NAV_ITEMS.map(({ id, label, glyph }) => {
          const isActive = id === active;
          return (
            <li key={id} style={{ marginBottom: 2 }}>
              <button
                onClick={() => onSelect(id)}
                style={{
                  width: '100%', textAlign: 'left',
                  background: isActive
                    ? `linear-gradient(135deg, ${ACC}15 0%, ${ACC2}10 100%)`
                    : 'none',
                  border: 'none', cursor: 'pointer',
                  padding: '9px 14px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  color: isActive ? ACC : MU,
                  borderRadius: 8,
                  fontSize: 13.5, fontFamily: mono,
                  transition: 'all 0.15s',
                  position: 'relative',
                  outline: 'none',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#f4f3ff'; e.currentTarget.style.color = ACC; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = MU; } }}
              >
                {isActive && (
                  <span style={{
                    position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                    width: 3, height: '60%', background: `linear-gradient(to bottom, ${ACC}, ${ACC2})`,
                    borderRadius: '0 3px 3px 0',
                  }} />
                )}
                <span style={{
                  fontSize: 13, opacity: isActive ? 1 : 0.65, minWidth: 18,
                  textAlign: 'center', color: isActive ? ACC : 'inherit',
                }}>
                  {glyph}
                </span>
                <span style={{ fontWeight: isActive ? 600 : 400 }}>{label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div style={{
        padding: '16px 24px',
        borderTop: `1px solid ${BD}`,
        marginTop: 'auto',
      }}>
        <div style={{ fontSize: 11, color: MU, lineHeight: 1.7, fontFamily: mono }}>
          <div style={{ color: TX, fontWeight: 600, marginBottom: 2 }}>octo v0.1.0</div>
          <div style={{ color: MU }}>GHC2024 · Haskell</div>
        </div>
      </div>
    </nav>
  );
}