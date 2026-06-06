import { ACC, ACC2, BD, CM, MU, SURF, SURF2, TX, TY, WARN, mono, serif } from '../theme.js';
import { useResponsive } from '../hooks/useResponsive.js';

// ── Typography ──────────────────────────────────────────────────────────────

export function H1({ children }) {
  return (
    <h1 style={{
      fontFamily: serif,
      fontSize: 'clamp(24px, 4vw, 34px)',
      fontWeight: 400,
      color: TX,
      borderBottom: `2px solid transparent`,
      borderImage: `linear-gradient(90deg, ${ACC} 0%, ${ACC2} 100%) 1`,
      paddingBottom: 14,
      marginBottom: 30, marginTop: 0, letterSpacing: '-0.4px',
      lineHeight: 1.2,
    }}>
      {children}
    </h1>
  );
}

export function H2({ children }) {
  return (
    <h2 style={{
      fontFamily: serif,
      fontSize: 'clamp(17px, 3vw, 21px)',
      fontWeight: 400,
      color: ACC,
      marginTop: 40, marginBottom: 14, letterSpacing: '-0.2px',
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{
        display: 'inline-block', width: 4, height: 18,
        background: `linear-gradient(to bottom, ${ACC}, ${ACC2})`,
        borderRadius: 2, flexShrink: 0,
      }} />
      {children}
    </h2>
  );
}

export function P({ children }) {
  return (
    <p style={{
      color: MU, lineHeight: 1.9, marginBottom: 16, fontSize: 15,
      fontFamily: `Georgia,'Times New Roman',serif`,
    }}>
      {children}
    </p>
  );
}

// ── Inline elements ─────────────────────────────────────────────────────────

export function IC({ children, color = ACC }) {
  return (
    <code style={{
      background: SURF2,
      border: `1px solid ${BD}`,
      borderRadius: 5,
      padding: '1px 7px',
      fontFamily: mono, fontSize: '0.84em', color,
      wordBreak: 'break-word',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    }}>
      {children}
    </code>
  );
}

export function Pill({ children, color = TY }) {
  return (
    <span style={{
      background: color + '15',
      border: `1px solid ${color}40`,
      borderRadius: 20,
      padding: '3px 10px', fontSize: 12, color,
      fontFamily: mono, marginRight: 6,
      fontWeight: 500,
    }}>
      {children}
    </span>
  );
}

// ── Block elements ──────────────────────────────────────────────────────────

export function Note({ children, kind = 'info' }) {
  const colors = {
    info: [ACC, '#eef2ff', '#c7d2fe'],
    warn: [WARN, '#fffbeb', '#fde68a'],
  };
  const [c, bg, border] = colors[kind] || colors.info;
  return (
    <div style={{
      background: bg,
      border: `1px solid ${border}`,
      borderLeft: `4px solid ${c}`,
      borderRadius: '0 8px 8px 0',
      padding: '12px 18px',
      margin: '18px 0', fontSize: 13.5, color: c, lineHeight: 1.75,
    }}>
      {children}
    </div>
  );
}

export function Row({ left, right, lc = TX }) {
  const { isMobile } = useResponsive();
  return (
    <div style={{
      display: isMobile ? 'block' : 'grid',
      gridTemplateColumns: isMobile ? undefined : '210px 1fr',
      gap: isMobile ? '2px 0' : '0 24px',
      padding: isMobile ? '10px 0' : '9px 12px',
      borderBottom: `1px solid ${BD}`,
      borderRadius: 0,
      transition: 'background 0.12s',
    }}
    onMouseEnter={e => { e.currentTarget.style.background = '#f4f3ff'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
    >
      <code style={{
        fontFamily: mono, fontSize: 12.5, color: lc,
        display: 'block',
        marginBottom: isMobile ? 3 : 0,
        wordBreak: 'break-all',
        fontWeight: 500,
      }}>
        {left}
      </code>
      <span style={{ color: MU, fontSize: 13.5, lineHeight: 1.75 }}>{right}</span>
    </div>
  );
}