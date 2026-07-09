import { useState } from 'react';
import useStore from '../../store/useStore.js';
import { classifyProblem } from '../../algorithms/classifierData.js';
import { registry } from '../../algorithms/index.js';
import { Search, Sparkles } from 'lucide-react';

export default function ProblemClassifier() {
  const [text, setText] = useState('');
  const { setProblem } = useStore();
  const [result, setResult] = useState(null);

  function handleClassify(e) {
    e.preventDefault();
    if (!text.trim()) return;

    const id = classifyProblem(text);
    if (id) {
      setResult({ match: true, id, name: registry[id].meta.title });
      setTimeout(() => {
        setProblem(id);
        setResult(null);
        setText('');
      }, 1500);
    } else {
      setResult({ match: false });
    }
  }

  return (
    <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <Sparkles size={14} style={{ color: 'var(--accent)' }} />
        <span className="label">Auto-Classify Problem</span>
      </div>
      <form onSubmit={handleClassify}>
        <textarea
          className="dp-input"
          placeholder="Paste problem statement here (e.g. 'maximize value within weight capacity')..."
          value={text}
          onChange={e => setText(e.target.value)}
          style={{ width: '100%', height: 60, resize: 'none', marginBottom: 8, fontSize: 11 }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button type="submit" className="btn btn-run" style={{ padding: '4px 8px', fontSize: 11 }}>
            <Search size={12} /> Classify
          </button>
          {result && (
            <span style={{ fontSize: 10, color: result.match ? 'var(--state-base)' : 'var(--state-return)' }}>
              {result.match ? `Matches: ${result.name}!` : 'No match found.'}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
