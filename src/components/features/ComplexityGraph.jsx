import { useMemo } from 'react';
import useStore from '../../store/useStore.js';
import { registry } from '../../algorithms/index.js';

const APPROACH_COLORS = {
  bruteForce:     'var(--state-return)',
  memoized:       'var(--state-base)',
  tabulation:     'var(--accent)',
  spaceOptimized: 'var(--state-cache)',
};

export default function ComplexityGraph() {
  const { problem, approach } = useStore();
  const meta = registry[problem].meta;

  const data = useMemo(() => computeGrowth(problem, approach), [problem, approach]);
  if (!data || data.length === 0) return null;

  const maxSteps = Math.max(...data.map(d => d.steps), 1);
  const W = 320, H = 120, PAD = { t: 8, r: 8, b: 28, l: 36 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;

  const px = (i) => PAD.l + (i / (data.length - 1)) * plotW;
  const py = (v) => PAD.t + plotH - (v / maxSteps) * plotH;

  const polyline = data.map((d, i) => `${px(i)},${py(d.steps)}`).join(' ');

  return (
    <div style={{ borderTop: '1px solid var(--border)', padding: '12px 14px' }}>
      <div className="label" style={{ marginBottom: 8 }}>Steps vs Input Size</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
        <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + plotH} stroke="var(--border)" strokeWidth={1} />
        <line x1={PAD.l} y1={PAD.t + plotH} x2={PAD.l + plotW} y2={PAD.t + plotH} stroke="var(--border)" strokeWidth={1} />

        {[0, 0.5, 1].map(f => {
          const y = PAD.t + plotH - f * plotH;
          const v = Math.round(f * maxSteps);
          return (
            <g key={f}>
              <line x1={PAD.l - 3} y1={y} x2={PAD.l} y2={y} stroke="var(--border)" strokeWidth={1} />
              <text x={PAD.l - 5} y={y + 3.5} textAnchor="end" fontSize={8} fill="var(--fg-dim)" fontFamily="JetBrains Mono, monospace">{v}</text>
            </g>
          );
        })}

        {data.filter((_, i) => i % Math.ceil(data.length / 5) === 0 || i === data.length - 1).map((d, _, arr) => {
          const origIdx = data.indexOf(d);
          return (
            <text key={origIdx} x={px(origIdx)} y={PAD.t + plotH + 12} textAnchor="middle" fontSize={8} fill="var(--fg-dim)" fontFamily="JetBrains Mono, monospace">
              {d.n}
            </text>
          );
        })}

        <polyline
          points={polyline}
          fill="none"
          stroke={APPROACH_COLORS[approach] ?? 'var(--accent)'}
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        <polyline
          points={polyline}
          fill={APPROACH_COLORS[approach] ?? 'var(--accent)'}
          stroke="none"
          opacity={0.08}
          style={{ clipPath: `inset(0 0 0 0)` }}
          points={`${PAD.l},${PAD.t + plotH} ${polyline} ${px(data.length - 1)},${PAD.t + plotH}`}
        />

        {data.map((d, i) => (
          <circle key={i} cx={px(i)} cy={py(d.steps)} r={2} fill={APPROACH_COLORS[approach] ?? 'var(--accent)'} opacity={0.7} />
        ))}
      </svg>
      <div style={{ fontSize: 10, color: 'var(--fg-dim)', marginTop: 2 }}>
        {meta.approaches[approach]?.time} — {data[data.length - 1]?.steps} steps at n={data[data.length - 1]?.n}
      </div>
    </div>
  );
}

function computeGrowth(problem, approach) {
  const meta = registry[problem].meta;
  const schema = meta.inputSchema;
  const defaultInput = meta.defaultInput;

  if (!schema || schema.length === 0) return [];

  const numericKeys = schema.filter(s => s.type === 'number');
  if (numericKeys.length === 0) return [];

  const primaryKey = numericKeys[0].key;
  const maxN = numericKeys[0].max ?? 15;
  const minN = numericKeys[0].min ?? 1;

  const points = [];
  const runner = registry[problem][approach];
  if (!runner) return [];

  for (let n = minN; n <= Math.min(maxN, 20); n++) {
    try {
      const inp = { ...defaultInput, [primaryKey]: n };
      const { steps } = runner(inp);
      points.push({ n, steps: steps.length });
    } catch {
      break;
    }
  }
  return points;
}
