import { useState } from 'react';
import { Terminal, Play } from 'lucide-react';

export default function RecurrenceParser() {
  const [expr, setExpr] = useState('dp[i] = dp[i-1] + dp[i-2]');
  const [base, setBase] = useState('dp[0]=0, dp[1]=1');
  const [n, setN] = useState(8);
  const [error, setError] = useState('');
  const [resultArr, setResultArr] = useState(null);

  function parseAndRun(e) {
    e.preventDefault();
    setError('');
    try {
      
      const steps = [];
      const dp = new Array(n + 1).fill(null);
      
      
      const bases = base.split(',').map(s => s.trim());
      for (const b of bases) {
        const match = b.match(/dp\[(\d+)\]\s*=\s*(-?\d+)/);
        if (match) {
          const idx = parseInt(match[1], 10);
          const val = parseInt(match[2], 10);
          if (idx <= n) {
            dp[idx] = val;
            steps.push({
              type: 'base_case',
              state: [idx],
              value: val,
              lineNumber: 1,
              explanation: `Base case: ${b}`,
              tableSnapshot: [...dp]
            });
          }
        }
      }
      
      
      
      
      const rhs = expr.split('=')[1] || expr;
      
      for (let i = 0; i <= n; i++) {
        if (dp[i] !== null) continue; 
        
        let evalStr = rhs;
        
        evalStr = evalStr.replace(/dp\[i\s*([+-]\s*\d+)?\]/g, (match, offsetStr) => {
          let offset = 0;
          if (offsetStr) offset = parseInt(offsetStr.replace(/\s/g, ''), 10);
          const target = i + offset;
          if (target < 0 || target > n || dp[target] === null) {
            throw new Error(`Out of bounds or uncomputed dependency: dp[${target}] at i=${i}`);
          }
          return dp[target];
        });
        
        
        evalStr = evalStr.replace(/max/g, 'Math.max').replace(/min/g, 'Math.min');
        
        const val = Function(`"use strict"; return (${evalStr})`)();
        dp[i] = val;
        steps.push({
          type: 'cell_fill',
          state: [i],
          value: val,
          lineNumber: 2,
          explanation: `dp[${i}] = ${val} (Evaluated: ${evalStr})`,
          tableSnapshot: [...dp]
        });
      }
      
      
      setResultArr(dp);
      
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Terminal size={14} style={{ color: 'var(--accent)' }} />
        <span className="label">Recurrence Parser</span>
      </div>
      <form onSubmit={parseAndRun} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <input
          className="dp-input"
          placeholder="dp[i] = ..."
          value={expr}
          onChange={e => setExpr(e.target.value)}
          style={{ width: '100%', fontSize: 11 }}
        />
        <input
          className="dp-input"
          placeholder="dp[0]=0, dp[1]=1"
          value={base}
          onChange={e => setBase(e.target.value)}
          style={{ width: '100%', fontSize: 11 }}
        />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--fg-dim)' }}>n =</span>
          <input
            type="number"
            className="dp-input"
            value={n}
            onChange={e => setN(Number(e.target.value))}
            style={{ width: 60, fontSize: 11 }}
          />
          <button type="submit" className="btn btn-run" style={{ padding: '4px 8px', fontSize: 11, marginLeft: 'auto' }}>
            <Play size={12} /> Parse & Run
          </button>
        </div>
        {error && <div style={{ fontSize: 13, color: 'var(--state-return)', marginTop: 8 }}>{error}</div>}
      </form>
      
      {resultArr && (
        <div style={{ marginTop: 24 }}>
          <div className="label" style={{ marginBottom: 12 }}>Parsed Result Array</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {resultArr.map((val, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 10, color: 'var(--fg-dim)', fontFamily: 'JetBrains Mono, monospace' }}>{i}</span>
                <div style={{
                  minWidth: 40, height: 40, borderRadius: 6,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--panel-2)', border: '1px solid var(--border)',
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: 'var(--accent)', fontWeight: 600
                }}>
                  {val === null ? '—' : val}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
