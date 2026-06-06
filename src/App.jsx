import { useState } from 'react';
import { BG, BD, TX, ACC, ACC2, mono, serif } from './theme.js';
import { Sidebar }    from './components/Sidebar.jsx';
import { Overview }   from './sections/Overview.jsx';
import { QuickStart } from './sections/QuickStart.jsx';
import { Syntax }     from './sections/Syntax.jsx';
import { Types }      from './sections/Types.jsx';
import { Paths }      from './sections/Paths.jsx';
import { Cubical }    from './sections/Cubical.jsx';
import { Equiv }      from './sections/Equiv.jsx';
import { Examples }   from './sections/Examples.jsx';
import { useResponsive } from './hooks/useResponsive.js';

const SECTIONS = {
  overview:   <Overview />,
  quickstart: <QuickStart />,
  syntax:     <Syntax />,
  types:      <Types />,
  paths:      <Paths />,
  cubical:    <Cubical />,
  equiv:      <Equiv />,
  examples:   <Examples />,
};

export default function App() {
  const [active, setActive]           = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile, isTablet }        = useResponsive();
  const isNarrow = isMobile || isTablet;

  function handleSelect(id) {
    setActive(id);
    if (isNarrow) setSidebarOpen(false);
  }

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: BG, color: TX, fontFamily: mono, fontSize: 14,
    }}>

      {/* ── Mobile overlay backdrop ── */}
      {isNarrow && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(30,20,60,0.35)',
            zIndex: 40, backdropFilter: 'blur(3px)',
          }}
        />
      )}

      {/* ── Sidebar ── */}
      <div style={{
        position: isNarrow ? 'fixed' : 'sticky',
        top: 0, left: 0, zIndex: isNarrow ? 50 : 'auto',
        height: '100vh',
        transform: isNarrow
          ? (sidebarOpen ? 'translateX(0)' : 'translateX(-100%)')
          : 'none',
        transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
        willChange: 'transform',
        flexShrink: 0,
      }}>
        <Sidebar active={active} onSelect={handleSelect} />
      </div>

      {/* ── Mobile top bar ── */}
      {isNarrow && (
        <header style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 30,
          height: 54,
          background: 'rgba(247,246,242,0.92)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${BD}`,
          display: 'flex', alignItems: 'center',
          padding: '0 18px', gap: 14,
          boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        }}>
          <button
            onClick={() => setSidebarOpen(v => !v)}
            aria-label="Toggle navigation"
            style={{
              background: sidebarOpen ? ACC + '15' : 'none',
              border: `1px solid ${sidebarOpen ? ACC + '40' : 'transparent'}`,
              cursor: 'pointer',
              padding: '6px 8px', color: ACC, display: 'flex', flexDirection: 'column',
              gap: 5, borderRadius: 7, transition: 'all 0.15s',
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 20, height: 2,
                background: ACC, borderRadius: 2,
                transform: sidebarOpen
                  ? (i === 0 ? 'rotate(45deg) translate(5px,5px)'
                    : i === 1 ? 'scaleX(0)'
                    : 'rotate(-45deg) translate(5px,-5px)')
                  : 'none',
                opacity: sidebarOpen && i === 1 ? 0 : 1,
                transition: 'transform 0.2s, opacity 0.15s',
              }} />
            ))}
          </button>
          <div style={{
            fontSize: 18, fontWeight: 700, letterSpacing: '-0.5px',
            fontFamily: serif,
            background: `linear-gradient(135deg, ${ACC} 0%, ${ACC2} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            octo
          </div>
          <div style={{ fontSize: 10, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Cubical Type Theory
          </div>
        </header>
      )}

      {/* ── Main content ── */}
      <main style={{
        flex: 1,
        padding: isMobile
          ? '74px 20px 48px'
          : isTablet
          ? '74px 36px 48px'
          : '52px 64px',
        maxWidth: 840,
        overflowY: 'auto',
        minHeight: '100vh',
        marginLeft: isNarrow ? 0 : 230,
        boxSizing: 'border-box',
        width: '100%',
      }}>
        {SECTIONS[active]}
      </main>
    </div>
  );
}