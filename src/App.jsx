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
import ComparisonMode from './components/features/ComparisonMode.jsx';
import QuizPage from './components/features/QuizPage.jsx';
import ToolsPage from './components/features/ToolsPage.jsx';
import HowItWorksPage from './components/features/HowItWorksPage.jsx';

function App() {
  const { problem, approach, input, setSteps, comparisonMode, comparisonApproach, setComparisonSteps, activeView } = useStore();
  const problemReg = registry[problem];
  const apMeta = problemReg.meta.approaches[approach];
  const visualizer = apMeta?.visualizer ?? 'table1d';

  
  const showTree = visualizer === 'tree';

  
  const runAlgorithm = useCallback((overrideInput) => {
    const inp = overrideInput ?? input[problem];
    try {
      const { steps } = problemReg[approach](inp);
      setSteps(steps);
      
      if (comparisonMode && registry[problem][comparisonApproach]) {
        try {
          const { steps: csteps } = registry[problem][comparisonApproach](inp);
          setComparisonSteps(csteps);
        } catch (e) {
          console.error('Comparison run error:', e);
        }
      }
    } catch (err) {
      console.error('Algorithm error:', err);
    }
  }, [problem, approach, input, problemReg, setSteps, comparisonMode, comparisonApproach, setComparisonSteps]);

  
  useEffect(() => {
    
    const params = new URLSearchParams(window.location.search);
    const p = params.get('problem');
    const a = params.get('approach');
    const i = params.get('input');
    
    if (p && registry[p]) {
      useStore.setState({ problem: p });
      if (a && registry[p].meta.approaches[a]) {
        useStore.setState({ approach: a });
      }
      if (i) {
        try {
          const parsed = JSON.parse(i);
          useStore.getState().updateInput(p, parsed);
        } catch(e) {}
      }
      
      window.history.replaceState({}, '', window.location.pathname);
    }

    
    setTimeout(() => runAlgorithm(), 10);
  }, []); 

  
  useEffect(() => {
    runAlgorithm();
  }, [problem, approach, runAlgorithm]);

  const truncated = useStore(s => {
    if (!s.steps || s.steps.length === 0) return false;
    return s.stats.totalSteps >= 5000;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Header />
      <div className="main-layout" style={{ display: 'flex', flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        <Sidebar />

        {}
        <div className="main-content" style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 600 }}>
          
          {activeView === 'visualizer' && (
            <>
              <InputPanel onRun={runAlgorithm} />

              {comparisonMode ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <ComparisonMode />
                  <PlaybackBar truncated={truncated} />
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24 }}>
                    {}
                    <div className="surface" style={{ minHeight: 400, display: 'flex', flexDirection: 'column', padding: 16 }}>
                      <div style={{ flex: 1 }}>
                        {showTree ? <RecursionTree /> : <DPTable />}
                      </div>
                    </div>

                    <div className="code-stats-row" style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
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
                </>
              )}
            </>
          )}

          {activeView === 'quiz' && (
            <QuizPage />
          )}

          {activeView === 'tools' && (
            <ToolsPage />
          )}

          {activeView === 'how-it-works' && (
            <HowItWorksPage />
          )}

          {}
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
