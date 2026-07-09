
import useStore from '../../store/useStore.js';
import { registry } from '../../algorithms/index.js';
import ComplexityGraph from '../features/ComplexityGraph.jsx';

export default function StatsPanel() {
  const { problem, approach, stats } = useStore();
  const { meta } = registry[problem];
  const apMeta = meta.approaches[approach];

  const cachePct = stats.calls > 0
    ? Math.round((stats.cacheHits / stats.calls) * 100)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, height: '100%', overflowY: 'auto' }}>

      {}
      <Section label="Complexity">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden' }}>
          <BigStat label="Time" value={apMeta?.time} />
          <BigStat label="Space" value={apMeta?.space} />
        </div>
        {apMeta?.spaceNote && (
          <p style={{ fontSize: 11, color: 'var(--fg-dim)', marginTop: 8, lineHeight: 1.5 }}>
            {apMeta.spaceNote}
          </p>
        )}
      </Section>

      {}
      {stats.totalSteps > 0 && (
        <Section label="Run Statistics">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {stats.calls > 0 && (
              <StatRow label="recursive calls" value={stats.calls} />
            )}
            {stats.cacheHits > 0 && (
              <StatRow label={`cache hits (${cachePct}% of calls)`} value={stats.cacheHits} accent />
            )}
            {stats.cellsFilled > 0 && (
              <StatRow label="cells filled" value={stats.cellsFilled} />
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: 11, color: 'var(--fg-dim)' }}>total trace steps</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg)', fontWeight: 600 }}>
                {stats.totalSteps.toLocaleString()}
              </span>
            </div>
          </div>
        </Section>
      )}

      {}
      <Section label="All Approaches">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['', 'Time', 'Space'].map((h, i) => (
                <th key={i} style={{
                  textAlign: i === 0 ? 'left' : 'left',
                  paddingBottom: 6,
                  paddingRight: 8,
                  fontSize: 10,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-dim)',
                  fontWeight: 500,
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.entries(meta.approaches).map(([key, ap]) => (
              <tr key={key} style={{ borderTop: '1px solid var(--border)' }}>
                <td style={{ padding: '6px 8px 6px 0', maxWidth: 80 }}>
                  <span style={{
                    fontSize: 12,
                    fontWeight: key === approach ? 500 : 400,
                    color: key === approach ? 'var(--fg)' : 'var(--fg-muted)',
                  }}>
                    {ap.label}
                  </span>
                  {key === approach && (
                    <span style={{ marginLeft: 5, width: 5, height: 5, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', verticalAlign: 'middle' }} />
                  )}
                </td>
                <td style={{ padding: '6px 8px 6px 0' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{ap.time}</span>
                </td>
                <td style={{ padding: '6px 0' }}>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>{ap.space}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {}
      {meta.insights && (
        <Section label="Insights">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {meta.insights.map((insight, i) => (
              <p key={i} style={{
                fontSize: 12,
                color: 'var(--fg-muted)',
                lineHeight: 1.6,
                paddingLeft: 10,
                borderLeft: '2px solid var(--border)',
                margin: 0,
              }}>
                {insight}
              </p>
            ))}
          </div>
        </Section>
      )}

      {}
      {meta.tags && (
        <div style={{ padding: '10px 14px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {meta.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--fg-dim)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <ComplexityGraph />
    </div>
  );
}

function Section({ label, children }) {
  return (
    <div style={{ borderBottom: '1px solid var(--border)', padding: '12px 14px' }}>
      <div className="label" style={{ marginBottom: 10 }}>{label}</div>
      {children}
    </div>
  );
}

function BigStat({ label, value }) {
  return (
    <div style={{ background: 'var(--panel)', padding: '10px 12px' }}>
      <div className="label" style={{ marginBottom: 4 }}>{label}</div>
      <div className="serif mono" style={{
        fontSize: 20,
        color: 'var(--accent)',
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 500,
        lineHeight: 1,
      }}>
        {value}
      </div>
    </div>
  );
}

function StatRow({ label, value, accent }) {
  const pct = Math.min(100, (value / Math.max(value, 1)) * 100);
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{label}</span>
        <span className="mono" style={{ fontSize: 12, color: accent ? 'var(--accent)' : 'var(--fg)', fontWeight: 600 }}>
          {value.toLocaleString()}
        </span>
      </div>
      <div style={{ height: 2, background: 'var(--border)', borderRadius: 1 }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: accent ? 'var(--accent)' : 'var(--fg-dim)',
          borderRadius: 1,
          transition: 'width 0.3s ease',
        }} />
      </div>
    </div>
  );
}
