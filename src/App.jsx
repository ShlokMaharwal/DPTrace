import { useCallback, useEffect } from 'react';
import useStore from './store/useStore.js';
import { registry } from './algorithms/index.js';
import Header from './components/layout/Header.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import InputPanel from './components/controls/InputPanel.jsx';
import PlaybackBar from './components/controls/PlaybackBar.jsx';
import RecursionTree from './components/visualizers/RecursionTree.jsx';
import DPTable from './components/visualizers/DPTable.jsx';
import CodePanel from './components/visualizers/CodePanel.jsx';
import StatsPanel from './components/stats/StatsPanel.jsx';

function App() {
  const { problem, approach, input, setSteps } = useStore();
  const problemReg = registry[problem];
  const apMeta = problemReg.meta.approaches[approach];
  const visualizer = apMeta?.visualizer ?? 'table1d';

  
  const showTree = visualizer === 'tree';

  
  const runAlgorithm = useCallback((overrideInput) => {
    const inp = overrideInput ?? input[problem];
    try {
      const { result, steps, truncated, totalSteps } = problemReg[approach](inp);
      setSteps(steps);
      
    } catch (err) {
      console.error('Algorithm error:', err);
    }
  }, [problem, approach, input, problemReg, setSteps]);

  
  useEffect(() => {
    runAlgorithm();
  }, [problem, approach]);

  const truncated = useStore(s => {
    if (!s.steps || s.steps.length === 0) return false;
    return s.stats.totalSteps >= 5000;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        <Sidebar />

        {}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 600 }}>
          <InputPanel onRun={runAlgorithm} />

          {}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
            {}
            <div className="surface" style={{ minHeight: 400, display: 'flex', flexDirection: 'column', padding: 16 }}>
              <div style={{ flex: 1 }}>
                {showTree ? <RecursionTree /> : <DPTable />}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {}
              <div style={{ flex: '2 1 400px', minWidth: 400, minHeight: 400 }}>
                <CodePanel />
              </div>

              {}
              <div style={{ flex: '1 1 300px', minWidth: 300 }}>
                <StatsPanel />
              </div>
            </div>
          </div>

          <PlaybackBar truncated={truncated} />
          
          {/* Footer */}
          <div style={{
            textAlign: 'center',
            padding: '12px',
            fontSize: '12px',
            color: 'var(--fg-dim)',
            borderTop: '1px solid var(--border)',
            background: 'var(--panel-2)',
          }}>
            Made by Shlok @2026 all rights reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
