
import { Play, Pause, SkipBack, SkipForward, ChevronFirst, ChevronLast } from 'lucide-react';
import useStore from '../../store/useStore.js';
import { usePlayback } from '../../hooks/usePlayback.js';

const SPEEDS = [0.25, 0.5, 1, 2, 4];

export default function PlaybackBar({ truncated }) {
  usePlayback();
  const {
    steps, currentStep, isPlaying, speed,
    togglePlay, stepForward, stepBackward,
    setCurrentStep, setSpeed, stats,
  } = useStore();

  const total = steps.length;
  const step = total > 0 ? steps[currentStep] : null;
  const stepType = step?.type ?? null;
  const { bg: typeBg, text: typeText } = getStepColors(stepType);

  return (
    <div style={{
      background: 'var(--panel)',
      borderTop: '1px solid var(--border)',
      padding: '8px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      flexShrink: 0,
    }}>

      {}
      <div style={{
        background: 'var(--panel-2)',
        border: '1px solid var(--border)',
        borderRadius: 4,
        padding: '6px 12px',
        minHeight: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 9,
      }}>
        {step && (
          <>
            <span
              className="step-badge"
              style={{ background: typeBg, color: typeText }}
            >
              {step.type.replace('_', ' ')}
            </span>
            <span style={{ fontSize: 12, color: 'var(--fg)', flex: 1, lineHeight: 1.4 }}>
              {step.explanation}
            </span>
            {truncated && (
              <span style={{
                fontSize: 10, color: 'var(--state-return)',
                fontFamily: 'JetBrains Mono, monospace',
                flexShrink: 0,
              }}>
                trace capped at 5k steps
              </span>
            )}
          </>
        )}
        {!step && total === 0 && (
          <span style={{ fontSize: 12, color: 'var(--fg-dim)' }}>
            Hit Run to generate the trace — then step through it one decision at a time.
          </span>
        )}
      </div>

      {}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>

        {}
        <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <button className="btn-icon" onClick={() => setCurrentStep(0)} disabled={total === 0} title="First step">
            <ChevronFirst size={13} />
          </button>
          <button className="btn-icon" onClick={stepBackward} disabled={total === 0 || currentStep === 0} title="Step back">
            <SkipBack size={13} />
          </button>
          <button
            className={`btn-icon ${isPlaying ? 'active' : ''}`}
            onClick={togglePlay}
            disabled={total === 0}
            title={isPlaying ? 'Pause' : 'Play'}
            style={{ width: 34, height: 34 }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button className="btn-icon" onClick={stepForward} disabled={total === 0 || currentStep >= total - 1} title="Step forward">
            <SkipForward size={13} />
          </button>
          <button className="btn-icon" onClick={() => setCurrentStep(total - 1)} disabled={total === 0} title="Last step">
            <ChevronLast size={13} />
          </button>
        </div>

        {}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)', minWidth: 56, textAlign: 'right' }}>
            {total > 0 ? `${currentStep + 1} / ${total}` : '— / —'}
          </span>
          <input
            type="range"
            min={0}
            max={Math.max(0, total - 1)}
            value={currentStep}
            onChange={e => setCurrentStep(Number(e.target.value))}
            disabled={total === 0}
            style={{ flex: 1 }}
          />
        </div>

        {}
        <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {SPEEDS.map(s => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className="mono"
              style={{
                padding: '3px 7px',
                border: 'none',
                borderRadius: 3,
                background: speed === s ? 'var(--accent-soft)' : 'transparent',
                color: speed === s ? 'var(--fg)' : 'var(--fg-dim)',
                fontSize: 11,
                cursor: 'pointer',
                transition: 'all 0.12s ease',
              }}
            >
              {s}×
            </button>
          ))}
        </div>

        {}
        {total > 0 && (stats.calls > 0 || stats.cacheHits > 0 || stats.cellsFilled > 0) && (
          <div style={{
            display: 'flex',
            gap: 12,
            paddingLeft: 10,
            borderLeft: '1px solid var(--border)',
          }}>
            {stats.calls > 0 && <MiniStat label="calls" value={stats.calls} />}
            {stats.cacheHits > 0 && <MiniStat label="cached" value={stats.cacheHits} accent />}
            {stats.cellsFilled > 0 && <MiniStat label="filled" value={stats.cellsFilled} />}
          </div>
        )}
      </div>
    </div>
  );
}

function MiniStat({ label, value, accent }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: accent ? 'var(--accent)' : 'var(--fg)', lineHeight: 1 }}>
        {value.toLocaleString()}
      </span>
      <span className="label" style={{ fontSize: 9 }}>{label}</span>
    </div>
  );
}

function getStepColors(type) {
  const map = {
    call:       { bg: 'color-mix(in srgb, var(--state-call) 15%, transparent)', text: 'var(--state-call)' },
    cache_hit:  { bg: 'color-mix(in srgb, var(--state-cache) 15%, transparent)', text: 'var(--state-cache)' },
    base_case:  { bg: 'color-mix(in srgb, var(--state-base) 15%, transparent)', text: 'var(--state-base)' },
    return:     { bg: 'color-mix(in srgb, var(--state-return) 15%, transparent)', text: 'var(--state-return)' },
    cell_fill:  { bg: 'color-mix(in srgb, var(--state-active) 15%, transparent)', text: 'var(--state-active)' },
    compare:    { bg: 'color-mix(in srgb, var(--fg-dim) 15%, transparent)', text: 'var(--fg-dim)' },
    update:     { bg: 'color-mix(in srgb, var(--state-active) 15%, transparent)', text: 'var(--state-active)' },
  };
  return map[type] || { bg: 'color-mix(in srgb, var(--fg-dim) 15%, transparent)', text: 'var(--fg-dim)' };
}
