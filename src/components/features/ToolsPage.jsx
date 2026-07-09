import ProblemClassifier from './ProblemClassifier.jsx';
import RecurrenceParser from './RecurrenceParser.jsx';
import { Wrench } from 'lucide-react';

export default function ToolsPage() {
  return (
    <div style={{
      flex: 1,
      padding: '40px 60px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 32,
      background: 'var(--bg)'
    }}>
      <div style={{ marginBottom: 12 }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, margin: 0, color: 'var(--fg)' }}>
          <Wrench size={24} style={{ color: 'var(--accent)' }} />
          Advanced Tools
        </h1>
        <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 8 }}>
          Use these utilities to analyze custom DP problems and parse recurrence relations directly.
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
      }}>
        <div style={{
          flex: '1 1 400px',
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 24,
        }}>
          <h2 style={{ fontSize: 16, margin: '0 0 16px 0', color: 'var(--fg)' }}>Problem Classifier</h2>
          <p style={{ fontSize: 13, color: 'var(--fg-dim)', marginBottom: 20 }}>
            Paste a natural language problem statement. The classifier uses keyword matching to automatically determine the underlying DP pattern and load the appropriate visualizer.
          </p>
          <div style={{ border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
            <ProblemClassifier />
          </div>
        </div>

        <div style={{
          flex: '1 1 400px',
          background: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 24,
        }}>
          <h2 style={{ fontSize: 16, margin: '0 0 16px 0', color: 'var(--fg)' }}>Recurrence Parser</h2>
          <p style={{ fontSize: 13, color: 'var(--fg-dim)', marginBottom: 20 }}>
            Type a raw recurrence relation and base cases. The parser will evaluate the equation dynamically and build the DP table trace in the visualizer for you to step through.
          </p>
          <div style={{ border: '1px solid var(--border)', borderRadius: 6, overflow: 'hidden' }}>
            <RecurrenceParser />
          </div>
        </div>
      </div>
    </div>
  );
}
