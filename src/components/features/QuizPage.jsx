import { useState } from 'react';
import { registry, problemOrder } from '../../algorithms/index.js';
import { quizData } from '../../algorithms/quizData.js';
import { CheckCircle, XCircle, ChevronRight, HelpCircle } from 'lucide-react';

export default function QuizPage() {
  const [selectedProblem, setSelectedProblem] = useState(problemOrder[0]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = quizData[selectedProblem] || [];

  function handleSelect(id) {
    setSelectedProblem(id);
    setAnswers({});
    setSubmitted(false);
  }

  function handleOptionClick(qIdx, optIdx) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  let score = 0;
  if (submitted) {
    questions.forEach((q, i) => {
      if (answers[i] === q.a) score++;
    });
  }

  return (
    <div style={{ display: 'flex', flex: 1, background: 'var(--bg)', overflow: 'hidden' }}>
      {}
      <div style={{
        width: 240, minWidth: 240,
        background: 'var(--panel)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', overflowY: 'auto'
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <HelpCircle size={16} style={{ color: 'var(--accent)' }} />
            Quiz Topics
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 0' }}>
          {problemOrder.map((id, idx) => {
            const isActive = selectedProblem === id;
            return (
              <button
                key={id}
                onClick={() => handleSelect(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 16px',
                  background: isActive ? 'var(--panel-2)' : 'transparent',
                  border: 'none', borderLeft: `3px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                  color: isActive ? 'var(--fg)' : 'var(--fg-dim)',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'background 0.1s',
                }}
              >
                <span className="mono" style={{ fontSize: 11, color: isActive ? 'var(--accent)' : 'var(--fg-muted)' }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 13, fontWeight: isActive ? 500 : 400 }}>
                  {registry[id].meta.title.split(' (')[0]}
                </span>
                {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto', color: 'var(--fg-muted)' }} />}
              </button>
            );
          })}
        </div>
      </div>

      {}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px 60px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 28, color: 'var(--fg)', margin: '0 0 8px 0' }}>
              {registry[selectedProblem].meta.title} Quiz
            </h1>
            <p style={{ fontSize: 14, color: 'var(--fg-muted)', margin: 0 }}>
              Test your knowledge of the recurrence relations, time complexity, and DP patterns for this problem.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {questions.map((q, qIdx) => {
              const answered = answers[qIdx] !== undefined;
              const isCorrect = submitted && answers[qIdx] === q.a;
              const isWrong = submitted && answers[qIdx] !== q.a;

              return (
                <div key={qIdx} style={{
                  background: 'var(--panel)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: 24,
                }}>
                  <h3 style={{ fontSize: 15, fontWeight: 500, color: 'var(--fg)', margin: '0 0 16px 0', lineHeight: 1.5 }}>
                    {qIdx + 1}. {q.q}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = answers[qIdx] === optIdx;
                      let bg = 'transparent';
                      let borderColor = 'var(--border)';
                      
                      if (submitted) {
                        if (optIdx === q.a) {
                          bg = 'rgba(126, 168, 126, 0.1)';
                          borderColor = 'var(--state-base)';
                        } else if (isSelected && optIdx !== q.a) {
                          bg = 'rgba(219, 112, 147, 0.1)';
                          borderColor = 'var(--state-return)';
                        }
                      } else if (isSelected) {
                        bg = 'var(--accent-soft)';
                        borderColor = 'var(--accent)';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleOptionClick(qIdx, optIdx)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '12px 16px', borderRadius: 6,
                            background: bg, border: `1px solid ${borderColor}`,
                            color: 'var(--fg)', fontSize: 14, textAlign: 'left',
                            cursor: submitted ? 'default' : 'pointer',
                            transition: 'all 0.1s',
                          }}
                        >
                          <div style={{
                            width: 16, height: 16, borderRadius: '50%',
                            border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--fg-dim)'}`,
                            background: isSelected ? 'var(--accent)' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            {isSelected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--bg)' }} />}
                          </div>
                          {opt}
                          
                          {submitted && optIdx === q.a && <CheckCircle size={16} style={{ color: 'var(--state-base)', marginLeft: 'auto' }} />}
                          {submitted && isSelected && optIdx !== q.a && <XCircle size={16} style={{ color: 'var(--state-return)', marginLeft: 'auto' }} />}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div style={{
                      marginTop: 16, padding: 12, borderRadius: 6,
                      background: 'var(--panel-2)', border: '1px solid var(--border)',
                      fontSize: 13, color: 'var(--fg-dim)', lineHeight: 1.5,
                      borderLeft: `3px solid ${isCorrect ? 'var(--state-base)' : 'var(--state-return)'}`
                    }}>
                      <span style={{ fontWeight: 600, color: isCorrect ? 'var(--state-base)' : 'var(--state-return)' }}>
                        {isCorrect ? 'Correct!' : 'Incorrect.'}
                      </span> {q.exp}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 32, paddingBottom: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {!submitted ? (
              <button
                className="btn btn-run"
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
                style={{ padding: '10px 24px', fontSize: 14, opacity: Object.keys(answers).length !== questions.length ? 0.5 : 1 }}
              >
                Submit Answers
              </button>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--fg)' }}>
                  Score: <span style={{ color: score === 5 ? 'var(--state-base)' : 'var(--accent)' }}>{score}</span> / 5
                </span>
                <button className="btn" onClick={() => { setAnswers({}); setSubmitted(false); }}>
                  Retake Quiz
                </button>
              </div>
            )}
            
            {!submitted && Object.keys(answers).length !== questions.length && (
              <span style={{ fontSize: 12, color: 'var(--fg-dim)' }}>
                Answer all 5 questions to submit.
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
