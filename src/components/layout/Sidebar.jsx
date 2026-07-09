
import useStore from '../../store/useStore.js';
import { registry, problemOrder } from '../../algorithms/index.js';

export default function Sidebar() {
  const { problem: selected, setProblem } = useStore();

  return (
    <aside style={{
      width: 200,
      minWidth: 200,
      background: 'var(--panel)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>

      {}
      <div style={{
        padding: '12px 14px 8px',
        borderBottom: '1px solid var(--border)',
      }}>
        <span className="label">Problems</span>
      </div>

      {}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '6px 0' }}>
        {problemOrder.map((id, idx) => {
          const { meta } = registry[id];
          const isActive = selected === id;

          return (
            <button
              key={id}
              className={`problem-item ${isActive ? 'active' : ''}`}
              onClick={() => setProblem(id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {}
                <span className="mono" style={{
                  fontSize: 11,
                  color: isActive ? 'var(--accent)' : 'var(--fg-dim)',
                  flexShrink: 0,
                  minWidth: 20,
                }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                {}
                <span style={{
                  fontSize: 13,
                  color: isActive ? 'var(--fg)' : 'var(--fg-muted)',
                  fontWeight: isActive ? 500 : 400,
                  lineHeight: 1.3,
                }}>
                  {}
                  {meta.title.split(' (')[0].split(' /')[0]}
                </span>
              </div>
              {}
              <span style={{
                fontSize: 10,
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                color: 'var(--fg-dim)',
                paddingLeft: 28,
                fontWeight: 400,
              }}>
                {meta.category}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
