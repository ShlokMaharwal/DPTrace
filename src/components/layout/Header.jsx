
import useStore from '../../store/useStore.js';
import { registry } from '../../algorithms/index.js';
import ThemeToggle from '../ThemeToggle.jsx';
import { SplitSquareHorizontal, Layout, HelpCircle, Wrench, BookOpen } from 'lucide-react';

const APPROACH_ORDER = ['bruteForce', 'memoized', 'tabulation', 'spaceOptimized'];

export default function Header() {
  const { problem, approach, setApproach, comparisonMode, toggleComparisonMode, activeView, setActiveView } = useStore();
  const { meta } = registry[problem];

  return (
    <header style={{
      height: 48,
      background: 'var(--panel)',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      gap: 16,
      flexShrink: 0,
    }}>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 1, flexShrink: 0 }}>
        <span className="logo" style={{
          fontSize: 26,
          color: 'var(--fg)',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          DPTrace
        </span>
      </div>

      <div style={{ width: 1, height: 18, background: 'var(--border)', flexShrink: 0 }} />

      {}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
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
        }}>
          {meta.category}
        </span>
      </div>

      {}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
        gap: 0,
        paddingBottom: 0,
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

      <div style={{ width: 1, height: 18, background: 'var(--border)', flexShrink: 0, margin: '0 8px' }} />

      {}
      <div style={{ display: 'flex', gap: 4, background: 'var(--panel-2)', padding: 4, borderRadius: 6, border: '1px solid var(--border)' }}>
        <NavTab icon={<Layout size={14} />} label="Visualizer" active={activeView === 'visualizer'} onClick={() => setActiveView('visualizer')} />
        <NavTab icon={<HelpCircle size={14} />} label="Quiz" active={activeView === 'quiz'} onClick={() => setActiveView('quiz')} />
        <NavTab icon={<Wrench size={14} />} label="Tools" active={activeView === 'tools'} onClick={() => setActiveView('tools')} />
        <NavTab icon={<BookOpen size={14} />} label="User Guide" active={activeView === 'how-it-works'} onClick={() => setActiveView('how-it-works')} />
      </div>

      {activeView === 'visualizer' && (
        <>
          <div style={{ width: 1, height: 18, background: 'var(--border)', flexShrink: 0, margin: '0 8px' }} />
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              className={`btn ${comparisonMode ? 'btn-active' : ''}`}
              onClick={toggleComparisonMode}
              title="Compare approaches side-by-side"
              style={{ padding: '6px', minWidth: 'auto', background: comparisonMode ? 'var(--accent-soft)' : 'transparent', color: comparisonMode ? 'var(--accent)' : 'var(--fg-muted)', border: comparisonMode ? '1px solid var(--accent)' : '1px solid var(--border)' }}
            >
              <SplitSquareHorizontal size={14} />
              <span style={{ fontSize: 11, marginLeft: 4 }}>Compare</span>
            </button>
          </div>
        </>
      )}

      {}
      <div style={{ width: 1, height: 18, background: 'var(--border)', flexShrink: 0, marginLeft: 8 }} />

      {}
      <ThemeToggle />
    </header>
  );
}

function NavTab({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 12px',
        borderRadius: 6,
        background: active ? 'var(--panel-2)' : 'transparent',
        color: active ? 'var(--fg)' : 'var(--fg-dim)',
        border: '1px solid transparent',
        borderColor: active ? 'var(--border)' : 'transparent',
        fontSize: 12, fontWeight: 500, cursor: 'pointer',
        transition: 'all 0.15s'
      }}
    >
      {icon}
      {label}
    </button>
  );
}
