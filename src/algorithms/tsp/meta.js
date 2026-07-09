export const meta = {
  id: 'tsp',
  title: 'TSP — Bitmask DP',
  description: 'Travelling Salesman Problem using bitmask DP. Find the minimum cost Hamiltonian cycle through all cities. State: dp[mask][city] = min cost to have visited exactly the cities in mask, ending at city.',
  category: 'Bitmask DP',
  difficulty: 'Hard',
  tags: ['bitmask', 'NP-hard', 'graph', 'combinatorial'],

  inputSchema: [
    { key: 'n', label: 'Cities (n)', type: 'number', min: 3, max: 6, step: 1 },
  ],

  defaultInput: { n: 4 },

  approaches: {
    bruteForce: {
      label: 'Brute Force',
      shortLabel: 'BF',
      description: 'Try all n! permutations and return the minimum cost. Exponential in n.',
      time: 'O(n!)',
      space: 'O(n)',
      visualizer: 'tree',
    },
    memoized: {
      label: 'Memoized',
      shortLabel: 'Memo',
      description: 'Top-down bitmask DP: cache (mask, city) state to avoid recomputing the same sub-tours.',
      time: 'O(n² · 2ⁿ)',
      space: 'O(n · 2ⁿ)',
      visualizer: 'tree',
    },
    tabulation: {
      label: 'Tabulation',
      shortLabel: 'Tab',
      description: 'Bottom-up: fill dp[mask][city] iterating over masks in increasing order of set bits.',
      time: 'O(n² · 2ⁿ)',
      space: 'O(n · 2ⁿ)',
      visualizer: 'table2d',
    },
    spaceOptimized: {
      label: 'Space Optimized',
      shortLabel: 'Same',
      description: 'The bitmask DP inherently needs O(n·2ⁿ) space. This variant adds the return leg efficiently.',
      time: 'O(n² · 2ⁿ)',
      space: 'O(n · 2ⁿ)',
      visualizer: 'table2d',
    },
  },

  insights: [
    'Brute force tries n! = 24 tours for 4 cities. DP cuts this to n²·2ⁿ = 64.',
    'A bitmask encodes which cities have been visited as a binary number.',
    'dp[mask][city]: min cost to visit the cities in mask, currently at city, starting from city 0.',
    'To find the answer, take min over all cities c of dp[FULL_MASK][c] + dist[c][0].',
  ],

  recurrence: 'dp[mask|(1<<next)][next] = min(dp[mask][cur] + dist[cur][next]) for all unvisited next',
};
