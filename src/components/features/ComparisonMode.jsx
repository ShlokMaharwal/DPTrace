import { useEffect } from 'react';
import useStore from '../../store/useStore.js';
import { registry } from '../../algorithms/index.js';

const APPROACH_ORDER = ['bruteForce', 'memoized', 'tabulation', 'spaceOptimized'];
const APPROACH_LABELS = { bruteForce: 'Brute Force', memoized: 'Memoized', tabulation: 'Tabulation', spaceOptimized: 'Space Opt.' };

export default function ComparisonMode() {
  const {
    problem, approach,
    steps, currentStep, setCurrentStep,
    comparisonApproach, setComparisonApproach,
    comparisonSteps, comparisonCurrentStep, setComparisonStep,
  } = useStore();

  const { meta } = registry[problem];

  
  useEffect(() => {
    const clamped = Math.min(currentStep, comparisonSteps.length - 1);
    if (clamped >= 0) setComparisonStep(clamped);
  }, [currentStep, comparisonSteps.length]);

  const maxStep = Math.max(steps.length - 1, comparisonSteps.length - 1, 0);
  const total = maxStep + 1;

  function handleScrub(val) {
    const idx = Number(val);
    const a = Math.min(idx, steps.length - 1);
    const b = Math.min(idx, comparisonSteps.length - 1);
    setCurrentStep(a);
    setComparisonStep(b);
  }

  const stepA = steps[currentStep];
  const stepB = comparisonSteps[comparisonCurrentStep];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 24px' }}>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 12, color: 'var(--fg-muted)', fontWeight: 500 }}>Comparing:</span>
        <PanelLabel label={APPROACH_LABELS[approach]} color="var(--accent)" />
        <span style={{ color: 'var(--fg-dim)', fontSize: 12 }}>vs.</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {APPROACH_ORDER.filter(k => k !== approach && meta.approaches[k]).map(k => (
            <button
              key={k}
              onClick={() => setComparisonApproach(k)}
              style={{
                padding: '3px 9px', border: '1px solid var(--border)', borderRadius: 4,
                background: comparisonApproach === k ? 'var(--accent-soft)' : 'transparent',
                color: comparisonApproach === k ? 'var(--accent)' : 'var(--fg-muted)',
                fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.12s',
              }}
            >
              {APPROACH_LABELS[k]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <PanelBox
          title={APPROACH_LABELS[approach]}
          step={stepA}
          steps={steps}
          current={currentStep}
          color="var(--accent)"
        />
        <PanelBox
          title={APPROACH_LABELS[comparisonApproach]}
          step={stepB}
          steps={comparisonSteps}
          current={comparisonCurrentStep}
          color="var(--state-base)"
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)', minWidth: 60 }}>
          {currentStep + 1} / {total}
        </span>
        <input
          type="range" min={0} max={maxStep} value={currentStep}
          onChange={e => handleScrub(e.target.value)}
          style={{ flex: 1 }}
        />
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)', minWidth: 60, textAlign: 'right' }}>
          {APPROACH_LABELS[approach]}: {steps.length} steps &nbsp;|&nbsp; {APPROACH_LABELS[comparisonApproach]}: {comparisonSteps.length} steps
        </span>
      </div>
    </div>
  );
}

function PanelLabel({ label, color }) {
  return (
    <span style={{
      fontSize: 12, fontWeight: 600, color,
      padding: '2px 8px', borderRadius: 4,
      background: `color-mix(in srgb, ${color} 12%, transparent)`,
      border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
    }}>
      {label}
    </span>
  );
}

function PanelBox({ title, step, steps, current, color }) {
  const count = {
    calls: steps.filter(s => s.type === 'call').length,
    cache: steps.filter(s => s.type === 'cache_hit').length,
    fill: steps.filter(s => s.type === 'cell_fill').length,
  };

  return (
    <div style={{
      flex: '1 1 280px', minWidth: 260,
      border: `1px solid color-mix(in srgb, ${color} 30%, var(--border))`,
      borderRadius: 6, padding: 14, background: 'var(--panel)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontWeight: 600, fontSize: 13, color }}>{title}</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)' }}>{steps.length} steps</span>
      </div>

      {step && (
        <div style={{
          background: 'var(--panel-2)', borderRadius: 4, padding: '6px 10px',
          fontSize: 11, color: 'var(--fg)', lineHeight: 1.5, minHeight: 40,
        }}>
          <span style={{
            fontSize: 9, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
            color, marginRight: 6,
          }}>
            {step.type.replace('_', ' ')}
          </span>
          {step.explanation}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
        {count.calls > 0 && <Pill label="calls" value={count.calls} color="var(--fg-dim)" />}
        {count.cache > 0 && <Pill label="cached" value={count.cache} color={color} />}
        {count.fill > 0 && <Pill label="cells" value={count.fill} color={color} />}
      </div>
    </div>
  );
}

function Pill({ label, value, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <span className="mono" style={{ fontSize: 14, fontWeight: 700, color, lineHeight: 1 }}>{value}</span>
      <span className="label" style={{ fontSize: 9 }}>{label}</span>
    </div>
  );
}
