import { useState, useEffect } from 'react';
import { Play, RotateCcw, Share2, Check } from 'lucide-react';
import useStore from '../../store/useStore.js';
import { registry } from '../../algorithms/index.js';

export default function InputPanel({ onRun }) {
  const { problem, approach, input, updateInput, setIsPlaying } = useStore();
  const { meta } = registry[problem];
  const schema = meta.inputSchema;
  
  
  const currentInput = input[problem];
  
  
  const [localInput, setLocalInput] = useState(currentInput);
  const [rawText, setRawText] = useState({});
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  
  useEffect(() => {
    setLocalInput(input[problem]);
    setRawText({});
    setError('');
  }, [problem, input]);


  const apMeta = meta.approaches[approach];

  function handleChange(key, raw) {
    const field = schema.find(f => f.key === key);
    
    
    setRawText(prev => ({ ...prev, [key]: raw }));

    let val = raw;
    if (field.type === 'number') val = Number(raw);
    if (field.type === 'array') {
      val = raw.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n));
    }
    if (field.type === 'string') val = raw.slice(0, field.maxLength || 15);
    
    setLocalInput(prev => ({ ...prev, [key]: val }));
    setError('');
  }

  function handleRun() {
    for (const field of schema) {
      const val = localInput[field.key];
      if (field.type === 'number') {
        if (isNaN(val) || val < (field.min || 0) || val > (field.max || 9999)) {
          setError(`${field.label}: must be between ${field.min} and ${field.max}`);
          return;
        }
        if (approach === 'bruteForce' && apMeta?.maxInputWarning && val > apMeta.maxInputWarning) {
          setError(`n=${val} will overflow brute force. Keep it ≤ ${apMeta.maxInputWarning}.`);
          return;
        }
      }
      if (field.type === 'array') {
        if (!val || val.length === 0) { setError(`${field.label}: need at least one number`); return; }
        if (field.maxLength && val.length > field.maxLength) { setError(`${field.label}: max ${field.maxLength} elements`); return; }
      }
    }
    updateInput(problem, localInput);
    onRun(localInput);
    setTimeout(() => setIsPlaying(true), 10);
  }

  function handleReset() {
    setLocalInput(meta.defaultInput);
    setRawText({});
    setError('');
    updateInput(problem, meta.defaultInput);
    onRun(meta.defaultInput);
  }

  function displayValue(key) {
    if (rawText[key] !== undefined) return rawText[key];
    const val = localInput[key];
    const field = schema.find(f => f.key === key);
    if (field.type === 'array') return Array.isArray(val) ? val.join(', ') : val;
    return val ?? '';
  }

  function handleShare() {
    const url = new URL(window.location.href);
    url.searchParams.set('problem', problem);
    url.searchParams.set('approach', approach);
    url.searchParams.set('input', JSON.stringify(localInput));
    navigator.clipboard.writeText(url.toString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={{
      background: 'var(--panel)',
      borderBottom: '1px solid var(--border)',
      padding: '10px 16px',
      display: 'flex',
      alignItems: 'flex-end',
      gap: 12,
      flexWrap: 'wrap',
      flexShrink: 0,
    }}>

      {/* Approach description - hidden on very small screens */}
      <div className="input-panel-desc" style={{ flex: '0 0 auto', maxWidth: 220 }}>
        <div className="label" style={{ marginBottom: 5 }}>Approach</div>
        <p style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5, margin: 0 }}>
          {apMeta?.description}
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          {apMeta && (
            <>
              <span className="mono" style={{ fontSize: 11, color: 'var(--accent)' }}>
                {apMeta.time}
              </span>
              <span style={{ color: 'var(--fg-dim)', fontSize: 11 }}>·</span>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>
                {apMeta.space} space
              </span>
            </>
          )}
        </div>
      </div>

      {/* Vertical divider - hidden on mobile */}
      <div className="input-panel-divider" style={{ width: 1, height: 44, background: 'var(--border)', flexShrink: 0 }} />

      {}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, flex: 1, flexWrap: 'wrap' }}>
        {schema.map(field => (
          <div key={field.key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label className="label">{field.label}</label>
            {field.type === 'number' ? (
              <input
                type="number"
                className="dp-input"
                value={localInput[field.key] ?? ''}
                min={field.min}
                max={field.max}
                step={field.step || 1}
                onChange={e => handleChange(field.key, e.target.value)}
                style={{ width: 72 }}
              />
            ) : (
              <input
                type="text"
                className="dp-input"
                value={displayValue(field.key)}
                onChange={e => handleChange(field.key, e.target.value)}
                placeholder={field.type === 'array' ? '1, 2, 3' : 'text'}
                style={{ minWidth: field.type === 'string' ? 120 : 140 }}
              />
            )}
          </div>
        ))}
      </div>

      {}
      {error && (
        <div style={{ width: '100%', fontSize: 12, color: 'var(--state-return)', marginTop: -4 }}>
          {error}
        </div>
      )}

      {}
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <button className="btn" onClick={handleShare} title="Copy link to this setup">
          {copied ? <Check size={12} style={{ color: 'var(--state-base)' }} /> : <Share2 size={12} />}
          {copied ? 'Copied' : 'Share'}
        </button>
        <button className="btn" onClick={handleReset} title="Reset to defaults">
          <RotateCcw size={12} />
          Reset
        </button>
        <button className="btn btn-run" onClick={handleRun}>
          <Play size={12} />
          Run
        </button>
      </div>
    </div>
  );
}
