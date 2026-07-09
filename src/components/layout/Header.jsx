
import { useState } from 'react';
import useStore from '../../store/useStore.js';
import { registry } from '../../algorithms/index.js';
import ThemeToggle from '../ThemeToggle.jsx';
import { SplitSquareHorizontal, Layout, HelpCircle, Wrench, BookOpen, Menu, X } from 'lucide-react';

const APPROACH_ORDER = ['bruteForce', 'memoized', 'tabulation', 'spaceOptimized'];

export default function Header() {
  const { problem, approach, setApproach, comparisonMode, toggleComparisonMode, activeView, setActiveView } = useStore();
  const { meta } = registry[problem];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      background: 'var(--panel)',
      borderBottom: '1px solid var(--border)',
      flexShrink: 0,
    }}>
      {/* ── Row 1: logo | approach tabs | actions ── */}
      <div className="header-inner" style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 10,
        overflowX: 'hidden',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, flexShrink: 0 }}>
          <span className="logo" style={{
            fontSize: 22,
            color: 'var(--fg)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            DPTrace
          </span>
        </div>

        {/* Spacer pushes everything to the right */}
        <div style={{ flex: 1 }} />


        {/* Desktop nav pill: approach tabs + view tabs together */}
        <div className="header-nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: 0, background: 'var(--panel-2)', padding: 4, borderRadius: 6, border: '1px solid var(--border)', flexShrink: 0 }}>
          {/* Approach tabs */}
          {APPROACH_ORDER.map(key => {
            const ap = meta.approaches[key];
            if (!ap) return null;
            return (
              <button
                key={key}
                className={`approach-tab ${approach === key ? 'active' : ''}`}
                onClick={() => setApproach(key)}
                title={ap.description}
                style={{ padding: '5px 10px', fontSize: 12 }}
              >
                {ap.shortLabel}
              </button>
            );
          })}

          {/* Thin divider */}
          <div style={{ width: 1, height: 18, background: 'var(--border)', margin: '0 4px', flexShrink: 0 }} />

          {/* View tabs */}
          <NavTab icon={<Layout size={14} />} label="Visualizer" active={activeView === 'visualizer'} onClick={() => setActiveView('visualizer')} />
          <NavTab icon={<HelpCircle size={14} />} label="Quiz" active={activeView === 'quiz'} onClick={() => setActiveView('quiz')} />
          <NavTab icon={<Wrench size={14} />} label="Tools" active={activeView === 'tools'} onClick={() => setActiveView('tools')} />
          <NavTab icon={<BookOpen size={14} />} label="Guide" active={activeView === 'how-it-works'} onClick={() => setActiveView('how-it-works')} />
        </div>

        {activeView === 'visualizer' && (
          <>
            <div className="header-compare-desktop" style={{ display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
              <button
                className={`btn ${comparisonMode ? 'btn-active' : ''}`}
                onClick={toggleComparisonMode}
                title="Compare approaches side-by-side"
                style={{ padding: '5px 8px', minWidth: 'auto', background: comparisonMode ? 'var(--accent-soft)' : 'transparent', color: comparisonMode ? 'var(--accent)' : 'var(--fg-muted)', border: comparisonMode ? '1px solid var(--accent)' : '1px solid var(--border)' }}
              >
                <SplitSquareHorizontal size={14} />
                <span className="compare-label" style={{ fontSize: 11, marginLeft: 4 }}>Compare</span>
              </button>
            </div>
          </>
        )}

        {/* Hamburger — mobile only */}
        <button
          className="btn-icon header-menu-btn"
          onClick={() => setMenuOpen(o => !o)}
          style={{ flexShrink: 0 }}
          aria-label="Menu"
        >
          {menuOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

        <ThemeToggle />
      </div>

      {/* ── Mobile dropdown menu ── */}
      {menuOpen && (
        <div className="header-mobile-menu" style={{
          background: 'var(--panel)',
          borderTop: '1px solid var(--border)',
          padding: '8px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}>
          {/* Nav views */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              { icon: <Layout size={14} />, label: 'Visualizer', view: 'visualizer' },
              { icon: <HelpCircle size={14} />, label: 'Quiz', view: 'quiz' },
              { icon: <Wrench size={14} />, label: 'Tools', view: 'tools' },
              { icon: <BookOpen size={14} />, label: 'User Guide', view: 'how-it-works' },
            ].map(({ icon, label, view }) => (
              <button
                key={view}
                onClick={() => { setActiveView(view); setMenuOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 12px',
                  borderRadius: 6,
                  background: activeView === view ? 'var(--accent-soft)' : 'var(--panel-2)',
                  color: activeView === view ? 'var(--accent)' : 'var(--fg-muted)',
                  border: `1px solid ${activeView === view ? 'var(--accent)' : 'var(--border)'}`,
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  flex: '1 1 auto',
                  justifyContent: 'center',
                }}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* Compare toggle in mobile menu */}
          {activeView === 'visualizer' && (
            <button
              onClick={() => { toggleComparisonMode(); setMenuOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 12px',
                borderRadius: 6,
                background: comparisonMode ? 'var(--accent-soft)' : 'var(--panel-2)',
                color: comparisonMode ? 'var(--accent)' : 'var(--fg-muted)',
                border: `1px solid ${comparisonMode ? 'var(--accent)' : 'var(--border)'}`,
                fontSize: 13, fontWeight: 500, cursor: 'pointer',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <SplitSquareHorizontal size={14} /> Compare approaches
            </button>
          )}
        </div>
      )}
    </header>
  );
}

function NavTab({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '5px 10px',
        borderRadius: 5,
        background: active ? 'var(--panel-2)' : 'transparent',
        color: active ? 'var(--fg)' : 'var(--fg-dim)',
        border: '1px solid transparent',
        borderColor: active ? 'var(--border)' : 'transparent',
        fontSize: 12, fontWeight: 500, cursor: 'pointer',
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {icon}
      {label}
    </button>
  );
}
