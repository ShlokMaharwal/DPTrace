
import { motion } from 'framer-motion';
import useStore from '../../store/useStore.js';

export default function DPTable() {
  const { steps, currentStep, problem, input } = useStore();
  const step = steps[currentStep];

  if (!step) {
    return (
      <Empty msg="Run the algorithm and step through — the table fills cell by cell as the DP logic unfolds." />
    );
  }

  
  let snapshot = null;
  let is2D = false;
  for (let i = currentStep; i >= 0; i--) {
    if (steps[i].tableSnapshot !== undefined) {
      snapshot = steps[i].tableSnapshot;
      is2D = Array.isArray(snapshot[0]);
      break;
    }
  }

  if (!snapshot) return <VarsDisplay step={step} />;

  return is2D
    ? <Table2D snapshot={snapshot} steps={steps} currentStep={currentStep} step={step} problemInput={input} problem={problem} />
    : <Table1D snapshot={snapshot} steps={steps} currentStep={currentStep} step={step} problemInput={input} problem={problem} />;
}

function Empty({ msg }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: '100%',
      background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 6,
    }}
    className="dot-grid"
    >
      <span style={{ fontSize: 13, color: 'var(--fg-dim)', maxWidth: 280, textAlign: 'center', lineHeight: 1.6 }}>
        {msg}
      </span>
    </div>
  );
}

function Table1D({ snapshot, steps, currentStep, step, problemInput, problem }) {
  const activeIdx = step?.state?.[0];
  const arr = problemInput[problem]?.arr;

  
  const filled = new Set();
  for (let i = 0; i <= currentStep; i++) {
    const s = steps[i];
    if ((s.type === 'cell_fill' || s.type === 'update') && s.state) filled.add(s.state[0]);
  }

  const cell = (val, i) => {
    const isActive = i === activeIdx;
    const isFilled = filled.has(i) || (val !== 0 && val !== null);
    const isCacheHit = steps[currentStep]?.type === 'cache_hit' && steps[currentStep]?.state?.[0] === i;

    return (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        style={{
          minWidth: 34, height: 34, borderRadius: 4,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500,
          border: `1px solid ${isActive ? 'var(--accent)' : isCacheHit ? 'var(--state-cache)' : 'var(--border)'}`,
          background: isActive ? 'var(--accent-soft)' : isFilled ? 'var(--panel-2)' : 'transparent',
          color: isActive ? 'var(--accent)' : isCacheHit ? 'var(--state-cache)' : isFilled ? 'var(--fg)' : 'var(--fg-dim)',
          transition: 'all 0.2s ease',
        }}
      >
        {val === null || val === undefined ? '' : val === Infinity ? '∞' : String(val)}
      </motion.div>
    );
  };

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 6, padding: 14,
    }}
    className="dot-grid"
    >
      {}
      {arr && (
        <div style={{ marginBottom: 14 }}>
          <div className="label" style={{ marginBottom: 6 }}>Input Array</div>
          <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            {arr.map((v, i) => (
              <div key={i} style={{
                minWidth: 34, height: 34, borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500,
                border: `1px solid ${i === activeIdx ? 'var(--accent)' : 'var(--border)'}`,
                background: i === activeIdx ? 'var(--accent-soft)' : 'var(--panel-2)',
                color: i === activeIdx ? 'var(--accent)' : 'var(--fg-muted)',
                transition: 'all 0.2s ease',
              }}>
                {v}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="label" style={{ marginBottom: 6 }}>dp[ ] — {snapshot.length} cells</div>

      {/* Index labels + cells in one scrollable no-wrap strip */}
      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: 3, marginBottom: 3, minWidth: 'max-content' }}>
          {snapshot.map((_, i) => (
            <div key={i} style={{
              minWidth: 34, textAlign: 'center',
              fontSize: 9, color: 'var(--fg-dim)', fontFamily: 'JetBrains Mono, monospace',
            }}>{i}</div>
          ))}
        </div>

        {}
        <div style={{ display: 'flex', gap: 3, minWidth: 'max-content' }}>
          {snapshot.map((val, i) => cell(val, i))}
        </div>
      </div>

      {}
      {step?.tails !== undefined && (
        <div style={{ marginTop: 16 }}>
          <div className="label" style={{ marginBottom: 6 }}>Patience piles (tails)</div>
          <div style={{ display: 'flex', gap: 3 }}>
            {step.tails.map((v, i) => (
              <div key={i} style={{
                minWidth: 34, height: 34, borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--state-base)',
                background: 'rgba(126,168,126,0.1)',
                color: 'var(--state-base)',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500,
              }}>
                {v}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Table2D({ snapshot, steps, currentStep, step, problemInput, problem }) {
  const [activeI, activeJ] = step?.state ?? [];

  const filled = new Set();
  for (let i = 0; i <= currentStep; i++) {
    const s = steps[i];
    if (s.type === 'cell_fill' && s.state?.length === 2) filled.add(`${s.state[0]},${s.state[1]}`);
  }

  const rows = snapshot.length;
  const cols = snapshot[0]?.length ?? 0;
  const s1 = problemInput[problem]?.s1;
  const s2 = problemInput[problem]?.s2;
  const isMatch = step?.match === true;
  const cellSize = Math.max(30, Math.min(44, Math.floor(340 / cols)));
  const fs = cellSize < 36 ? 10 : 11;

  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 6, padding: 14,
    }}
    className="dot-grid"
    >
      <div className="label" style={{ marginBottom: 10 }}>dp[ ][ ] — {rows} × {cols}</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'separate', borderSpacing: 3 }}>
          <thead>
            <tr>
              <th style={{ width: cellSize, minWidth: cellSize }} />
              {Array.from({ length: cols }, (_, j) => (
                <th key={j} style={{
                  width: cellSize, minWidth: cellSize, height: 18, textAlign: 'center',
                  fontSize: 9, fontFamily: 'JetBrains Mono, monospace',
                  color: j === activeJ ? 'var(--accent)' : 'var(--fg-dim)',
                  fontWeight: j === activeJ ? 600 : 400,
                  paddingBottom: 3,
                }}>
                  {s2 ? (j === 0 ? '' : s2[j - 1]) : j}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {snapshot.map((row, i) => (
              <tr key={i}>
                <td style={{
                  textAlign: 'right', paddingRight: 6, fontSize: 9,
                  fontFamily: 'JetBrains Mono, monospace',
                  color: i === activeI ? 'var(--accent)' : 'var(--fg-dim)',
                  fontWeight: i === activeI ? 600 : 400,
                }}>
                  {s1 ? (i === 0 ? '' : s1[i - 1]) : i}
                </td>
                {row.map((val, j) => {
                  const isActive = i === activeI && j === activeJ;
                  const isFilled = filled.has(`${i},${j}`);
                  const displayVal = val === null ? '' : val === Infinity ? '∞' : val === true ? '✓' : val === false ? '✗' : val;

                  return (
                    <motion.td
                      key={j}
                      initial={isFilled ? { opacity: 0 } : {}}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        width: cellSize, minWidth: cellSize, height: cellSize, textAlign: 'center',
                        borderRadius: 4,
                        fontFamily: 'JetBrains Mono, monospace', fontSize: fs,
                        fontWeight: isActive ? 600 : 400,
                        border: `1px solid ${isActive ? (isMatch ? 'var(--state-base)' : 'var(--accent)') : 'var(--border)'}`,
                        background: isActive
                          ? (isMatch ? 'rgba(126,168,126,0.15)' : 'var(--accent-soft)')
                          : isFilled ? 'var(--panel-2)' : 'transparent',
                        color: isActive
                          ? (isMatch ? 'var(--state-base)' : 'var(--accent)')
                          : isFilled ? 'var(--fg-muted)' : 'var(--fg-dim)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {displayVal}
                    </motion.td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VarsDisplay({ step }) {
  const vars = step?.vars || {};
  if (Object.keys(vars).length === 0) {
    return (
      <Empty msg="Step through to see the variable state update in real time." />
    );
  }
  return (
    <div style={{
      width: '100%', height: '100%', overflow: 'auto',
      background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 6, padding: 14,
    }}
    className="dot-grid"
    >
      <div className="label" style={{ marginBottom: 12 }}>Variable state</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {Object.entries(vars).map(([k, v]) => (
          <div key={k} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            background: v !== null ? 'var(--panel-2)' : 'transparent',
            border: `1px solid ${v !== null ? 'var(--accent)' : 'var(--border)'}`,
            borderRadius: 4, padding: '10px 16px', minWidth: 70,
            transition: 'all 0.2s ease',
          }}>
            <span className="label">{k}</span>
            <span className="mono" style={{
              fontSize: 22, fontWeight: 600,
              color: v !== null ? 'var(--accent)' : 'var(--fg-dim)',
            }}>
              {v === null ? '—' : String(v)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
