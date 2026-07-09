

export const meta = {
  id: 'fibonacci',
  title: 'Fibonacci / Climbing Stairs',
  description: 'The standard warm-up. Each number is the sum of the two before it. It\'s exactly the same logic as the climbing stairs problem, just phrased differently.',
  category: '1D DP',
  tags: ['warm-up', '1D', 'overlapping subproblems', 'optimal substructure'],

  inputSchema: [
    { key: 'n', label: 'n (input)', type: 'number', min: 1, max: 20, step: 1 },
  ],

  defaultInput: { n: 8 },

  approaches: {
    bruteForce: {
      label: 'Brute Force',
      shortLabel: 'BF',
      description: 'Pure recursion. I recompute the same branches over and over, which makes this blow up exponentially.',
      time: 'O(2ⁿ)',
      space: 'O(n)',
      spaceNote: 'Call stack depth',
      visualizer: 'tree',
      maxInputWarning: 15,
    },
    memoized: {
      label: 'Memoized',
      shortLabel: 'Memo',
      description: 'Same recursion as brute force — I just cache the answer the first time I compute it, so each subproblem only runs once.',
      time: 'O(n)',
      space: 'O(n)',
      spaceNote: 'Memo table + call stack',
      visualizer: 'tree',
    },
    tabulation: {
      label: 'Tabulation',
      shortLabel: 'Tab',
      description: 'I just build up an array from the base cases. No call stack overhead, just a straight loop.',
      time: 'O(n)',
      space: 'O(n)',
      spaceNote: 'DP table of size n+1',
      visualizer: 'table1d',
    },
    spaceOptimized: {
      label: 'Space Optimized',
      shortLabel: 'O(1)',
      description: 'Since we only ever look back two steps, I just keep those two numbers in variables and drop the rest of the array.',
      time: 'O(n)',
      space: 'O(1)',
      spaceNote: 'Only two variables',
      visualizer: 'variables',
    },
  },

  insights: [
    'Brute force fib(5) makes 15 function calls. Memoized makes only 9 — exactly n*2-1.',
    'The recursion tree for brute force is a perfect illustration of exponential overlap.',
    'Tabulation and memoized have the same time complexity but memoized has call stack overhead.',
    'The space-optimized approach is what you\'d use in production — O(1) with O(n) time.',
  ],

  recurrence: 'fib(n) = fib(n-1) + fib(n-2), base: fib(0)=0, fib(1)=1',
};
