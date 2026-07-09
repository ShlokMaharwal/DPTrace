
import { useEffect, useRef } from 'react';
import useStore from '../../store/useStore.js';
import { registry } from '../../algorithms/index.js';

export default function CodePanel() {
  const { problem, approach, steps, currentStep } = useStore();
  const { code } = registry[problem];
  const src = code[approach] || '';
  const lines = src.split('\n');
  const step = steps[currentStep];
  const activeLine = step?.lineNumber ?? -1;
  const activeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeLine]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: 6,
      overflow: 'hidden',
    }}>
      {}
      <div style={{
        padding: '8px 12px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--panel-2)',
        flexShrink: 0,
      }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-dim)', marginLeft: 4 }}>
          {approach}.cpp
        </span>
        {step && activeLine > 0 && (
          <span className="mono" style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--accent)', opacity: 0.8 }}>
            :{activeLine}
          </span>
        )}
      </div>

      {}
      <div
        ref={containerRef}
        style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}
      >
        <pre style={{
          margin: 0,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12.5,
          lineHeight: '21px',
        }}>
          {lines.map((line, i) => {
            const lineNum = i + 1;
            const isActive = lineNum === activeLine;
            return (
              <div
                key={i}
                ref={isActive ? activeRef : null}
                className={isActive ? 'code-line-active' : ''}
                style={{
                  display: 'flex',
                  paddingRight: 14,
                  transition: 'background 0.2s ease',
                }}
              >
                {}
                <span style={{
                  minWidth: 38,
                  paddingLeft: 10,
                  paddingRight: 10,
                  color: isActive ? 'var(--accent)' : 'var(--fg-dim)',
                  userSelect: 'none',
                  fontSize: 10,
                  lineHeight: '21px',
                  textAlign: 'right',
                  flexShrink: 0,
                  opacity: isActive ? 1 : 0.6,
                }}>
                  {lineNum}
                </span>
                {}
                <span style={{ color: isActive ? 'var(--fg)' : 'var(--fg-muted)' }}>
                  {tokenizeLine(line)}
                </span>
              </div>
            );
          })}
        </pre>
      </div>

      {}
      {registry[problem].meta.recurrence && (
        <div style={{
          padding: '7px 12px',
          borderTop: '1px solid var(--border)',
          background: 'var(--panel-2)',
          flexShrink: 0,
        }}>
          <span className="label" style={{ marginRight: 6 }}>Recurrence</span>
          <span className="mono" style={{ fontSize: 10, color: 'var(--accent)' }}>
            {registry[problem].meta.recurrence}
          </span>
        </div>
      )}
    </div>
  );
}

function tokenizeLine(line) {
  const result = [];
  let i = 0;
  const src = line;

  while (i < src.length) {
    
    if (src[i] === '/' && src[i + 1] === '/') {
      result.push(<span key={i} style={{ color: 'var(--fg-dim)' }}>{src.slice(i)}</span>);
      break;
    }
    
    if (src[i] === '`') {
      const end = src.indexOf('`', i + 1);
      const seg = end >= 0 ? src.slice(i, end + 1) : src.slice(i);
      result.push(<span key={i} style={{ color: 'var(--state-return)' }}>{seg}</span>);
      i = end >= 0 ? end + 1 : src.length;
      continue;
    }
    
    if (src[i] === '"' || src[i] === "'") {
      const q = src[i]; let j = i + 1;
      while (j < src.length && src[j] !== q) j++;
      result.push(<span key={i} style={{ color: 'var(--state-return)' }}>{src.slice(i, j + 1)}</span>);
      i = j + 1;
      continue;
    }
    
    if (/[a-zA-Z_$]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[\w$]/.test(src[j])) j++;
      const word = src.slice(i, j);
      const keywords = new Set(['function', 'return', 'const', 'let', 'var', 'if', 'else', 'for',
        'of', 'in', 'new', 'Array', 'Math', 'from', 'import', 'export', 'default',
        'class', 'this', 'typeof', 'undefined', 'null', 'true', 'false', 'Infinity',
        'while', 'do', 'break', 'continue', 'switch', 'case', 'throw', 'try', 'catch']);
      const color = keywords.has(word)
        ? 'var(--accent)'
        : /^[A-Z]/.test(word)
        ? 'var(--state-base)'
        : 'var(--fg-muted)';
      result.push(<span key={i} style={{ color }}>{word}</span>);
      i = j;
      continue;
    }
    
    if (/\d/.test(src[i])) {
      let j = i;
      while (j < src.length && /[\d.]/.test(src[j])) j++;
      result.push(<span key={i} style={{ color: 'var(--state-base)' }}>{src.slice(i, j)}</span>);
      i = j;
      continue;
    }
    
    if ('=<>!&|?+-*/%'.includes(src[i])) {
      result.push(<span key={i} style={{ color: 'var(--fg-dim)' }}>{src[i]}</span>);
      i++; continue;
    }
    
    result.push(<span key={i} style={{ color: 'var(--fg)' }}>{src[i]}</span>);
    i++;
  }
  return result;
}
