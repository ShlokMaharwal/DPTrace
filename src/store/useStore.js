import { create } from 'zustand';

const useStore = create((set, get) => ({
  
  problem: 'fibonacci',
  approach: 'tabulation',

  
  steps: [],
  currentStep: 0,

  
  isPlaying: false,
  speed: 1, 

  
  input: {
    fibonacci: { n: 10 },
    knapsack: { weights: [2, 3, 4, 5], values: [3, 4, 5, 6], capacity: 8 },
    coinChange: { coins: [1, 5, 6, 9], amount: 11 },
    lcs: { s1: 'ABCBDAB', s2: 'BDCABA' },
    editDistance: { s1: 'sunday', s2: 'saturday' },
    lis: { arr: [10, 9, 2, 5, 3, 7, 101, 18] },
    mcm: { dims: [10, 30, 5, 60] },
    partitionSubset: { arr: [1, 5, 11, 5] },
    eggDrop: { eggs: 2, floors: 10 },
    palindromePartition: { s: 'aabbc' },
    tsp: { n: 4 },
  },

  
  stats: {
    totalSteps: 0,
    calls: 0,
    cacheHits: 0,
    cellsFilled: 0,
  },

  
  setProblem: (problem) => set({ problem, approach: 'tabulation', steps: [], currentStep: 0, isPlaying: false }),
  setApproach: (approach) => set({ approach, steps: [], currentStep: 0, isPlaying: false }),

  setSteps: (steps) => {
    const calls = steps.filter(s => s.type === 'call').length;
    const cacheHits = steps.filter(s => s.type === 'cache_hit').length;
    const cellsFilled = steps.filter(s => s.type === 'cell_fill').length;
    set({
      steps,
      currentStep: 0,
      isPlaying: false,
      stats: { totalSteps: steps.length, calls, cacheHits, cellsFilled },
    });
  },

  setCurrentStep: (currentStep) => set({ currentStep }),

  stepForward: () => {
    const { currentStep, steps } = get();
    if (currentStep < steps.length - 1) set({ currentStep: currentStep + 1 });
    else set({ isPlaying: false });
  },

  stepBackward: () => {
    const { currentStep } = get();
    if (currentStep > 0) set({ currentStep: currentStep - 1 });
  },

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  togglePlay: () => set(s => ({ isPlaying: !s.isPlaying })),
  setSpeed: (speed) => set({ speed }),

  updateInput: (problem, newInput) =>
    set(s => ({ input: { ...s.input, [problem]: { ...s.input[problem], ...newInput } } })),

  comparisonMode: false,
  comparisonApproach: 'memoized',
  comparisonSteps: [],
  comparisonCurrentStep: 0,

  activeView: 'visualizer',
  quizAnswered: {},

  toggleComparisonMode: () => set(s => ({ comparisonMode: !s.comparisonMode, comparisonSteps: [], comparisonCurrentStep: 0 })),
  setComparisonApproach: (a) => set({ comparisonApproach: a }),
  setComparisonSteps: (steps) => set({ comparisonSteps: steps, comparisonCurrentStep: 0 }),
  setComparisonStep: (i) => set({ comparisonCurrentStep: i }),

  setActiveView: (view) => set({ activeView: view }),
  answerQuiz: (key, correct) => set(s => ({ quizAnswered: { ...s.quizAnswered, [key]: correct } })),
}));

export default useStore;
