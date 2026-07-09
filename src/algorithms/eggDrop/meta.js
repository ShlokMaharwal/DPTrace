export const meta = {
  id: 'eggDrop',
  title: 'Egg Drop Problem',
  description: 'Given e eggs and f floors, find the minimum number of trials needed in the worst case to find the critical floor. A classic DP problem on "minimax" thinking.',
  category: '2D DP',
  difficulty: 'Hard',
  tags: ['minimax', '2D', 'decision DP', 'classic'],

  inputSchema: [
    { key: 'eggs',   label: 'Eggs (e)',   type: 'number', min: 1, max: 6, step: 1 },
    { key: 'floors', label: 'Floors (f)', type: 'number', min: 1, max: 20, step: 1 },
  ],

  defaultInput: { eggs: 2, floors: 10 },

  approaches: {
    bruteForce: {
      label: 'Brute Force',
      shortLabel: 'BF',
      description: 'Pure recursion: for each floor, try dropping and take the worst of (egg breaks, egg survives). Recomputes everything.',
      time: 'O(e · f²)',
      space: 'O(e · f)',
      visualizer: 'tree',
    },
    memoized: {
      label: 'Memoized',
      shortLabel: 'Memo',
      description: 'Same recursion with caching — avoids recomputing the same (eggs, floors) states.',
      time: 'O(e · f²)',
      space: 'O(e · f)',
      visualizer: 'tree',
    },
    tabulation: {
      label: 'Tabulation',
      shortLabel: 'Tab',
      description: 'Bottom-up: fill dp[e][f] = min trials needed with e eggs and f floors. Iterate over each floor drop.',
      time: 'O(e · f²)',
      space: 'O(e · f)',
      visualizer: 'table2d',
    },
    spaceOptimized: {
      label: 'Space Optimized',
      shortLabel: 'O(f)',
      description: 'Binary search over the answer and count reachable floors with binary search on the trial axis. Reduces to O(e·log(f)).',
      time: 'O(e · f · log(f))',
      space: 'O(e · f)',
      visualizer: 'table2d',
    },
  },

  insights: [
    'With 1 egg, you must try every floor bottom-up: worst case is f trials.',
    'With infinite eggs, binary search gives you log₂(f) trials.',
    'The key insight: dropping from floor x splits the search into two subproblems: (e-1, x-1) if egg breaks, (e, f-x) if it survives.',
    'Take the max of the two cases (worst case), then minimize over all floor choices.',
  ],

  recurrence: 'dp[e][f] = 1 + min over x in 1..f of max(dp[e-1][x-1], dp[e][f-x])',
};
