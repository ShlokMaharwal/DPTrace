
import useStore from '../../store/useStore.js';
import { registry } from '../../algorithms/index.js';
import ThemeToggle from '../ThemeToggle.jsx';

const APPROACH_ORDER = ['bruteForce', 'memoized', 'tabulation', 'spaceOptimized'];

export default function Header() {
  const { problem, approach, setApproach } = useStore();
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

      {}
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

      {}
      <div style={{ width: 1, height: 18, background: 'var(--border)', flexShrink: 0 }} />

      {}
      <ThemeToggle />
    </header>
  );
}
