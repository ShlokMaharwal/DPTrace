
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
      {/* ── Main header row ── */}
      <div className="header-inner" style={{
        height: 48,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 0,
        overflow: 'hidden',
      }}>

        {/* Logo */}
        <span className="logo" style={{
          fontSize: 22,
          color: 'var(--fg)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          flexShrink: 0,
          marginRight: 12,
        }}>
          DPTrace
        </span>

        {/* Problem title + category — hidden on tablet/mobile */}
        <div className="header-problem-title" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          flexShrink: 0,
          marginRight: 4,
          minWidth: 0,
          overflow: 'hidden',
        }}>
          <div style={{ width: 1, height: 18, background: 'var(--border)', flexShrink: 0, marginRight: 8 }} />
          <span style={{
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--fg)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {meta.title}
          </span>
          <span style={{
            fontSize: 10,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'var(--fg-dim)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {meta.category}
          </span>
        </div>

        {/* Flex spacer — pushes right-side items to the right */}
        <div style={{ flex: 1 }} />

        {/* ── RIGHT SIDE ── */}

        {/* Approach tabs (BF, Memo, Tab, O(1)) — underline style */}
        <div className="header-approach-tabs approach-tabs" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          flexShrink: 0,
          marginRight: 6,
        }}>
          {APPROACH_ORDER.map(key => {
            const ap = meta.approaches[key];
            if (!ap) return null;
            return (
              <button
                key={key}
                className={`approach-tab ${approach === key ? 'active' : ''}`}
                onClick={() => setApproach(key)}
                title={ap.description}
              >
                {ap.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Thin separator between approach tabs and view nav pill */}
        <div className="header-approach-tabs" style={{ width: 1, height: 18, background: 'var(--border)', flexShrink: 0, marginRight: 8 }} />

        {/* View nav pill — desktop only */}
        <div className="header-nav-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          background: 'var(--panel-2)',
          padding: 4,
          borderRadius: 6,
          border: '1px solid var(--border)',
          flexShrink: 0,
          marginRight: 8,
        }}>
          <NavTab icon={<Layout size={14} />} label="Visualizer" active={activeView === 'visualizer'} onClick={() => setActiveView('visualizer')} />
          <NavTab icon={<HelpCircle size={14} />} label="Quiz" active={activeView === 'quiz'} onClick={() => setActiveView('quiz')} />
          <NavTab icon={<Wrench size={14} />} label="Tools" active={activeView === 'tools'} onClick={() => setActiveView('tools')} />
          <NavTab icon={<BookOpen size={14} />} label="User Guide" active={activeView === 'how-it-works'} onClick={() => setActiveView('how-it-works')} />
        </div>

        {/* Compare button — desktop only */}
        <div className="header-compare-desktop" style={{ display: 'flex', alignItems: 'center', marginRight: 8, flexShrink: 0 }}>
          <button
            className="btn"
            onClick={toggleComparisonMode}
            title="Compare approaches side-by-side"
            style={{
              padding: '5px 10px',
              background: comparisonMode ? 'var(--accent-soft)' : 'transparent',
              color: comparisonMode ? 'var(--accent)' : 'var(--fg-muted)',
              border: `1px solid ${comparisonMode ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            <SplitSquareHorizontal size={14} />
            <span style={{ fontSize: 11, marginLeft: 4 }}>Compare</span>
          </button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="btn-icon header-menu-btn"
          onClick={() => setMenuOpen(o => !o)}
          style={{ flexShrink: 0, marginRight: 8 }}
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
          {/* Approach tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, paddingBottom: 6, borderBottom: '1px solid var(--border)' }}>
            {APPROACH_ORDER.map(key => {
              const ap = meta.approaches[key];
              if (!ap) return null;
              return (
                <button
                  key={key}
                  onClick={() => { setApproach(key); setMenuOpen(false); }}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 5,
                    background: approach === key ? 'var(--accent-soft)' : 'var(--panel-2)',
                    color: approach === key ? 'var(--accent)' : 'var(--fg-muted)',
                    border: `1px solid ${approach === key ? 'var(--accent)' : 'var(--border)'}`,
                    fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  }}
                >
                  {ap.shortLabel}
                </button>
              );
            })}
          </div>

          {/* View nav buttons */}
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

          {/* Compare toggle */}
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
