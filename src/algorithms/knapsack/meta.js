export const meta = {
  id: 'knapsack',
  title: '0/1 Knapsack',
  description: 'You have a bag with a weight limit, and a bunch of items with weights and values. What\'s the most valuable combination you can fit? You can either take an item or leave it — no fractions, no repeats.',
  category: '2D DP',
  difficulty: 'Medium',
  tags: ['2D', 'classic', 'decision DP', 'subset selection'],
  inputSchema: [
    { key: 'weights', label: 'Weights (comma-separated)', type: 'array', min: 1, max: 6 },
    { key: 'values', label: 'Values (comma-separated)', type: 'array', min: 1, max: 6 },
    { key: 'capacity', label: 'Capacity', type: 'number', min: 1, max: 20, step: 1 },
  ],
  defaultInput: { weights: [2, 3, 4, 5], values: [3, 4, 5, 6], capacity: 8 },
  approaches: {
    bruteForce: { label: 'Brute Force', shortLabel: 'BF', description: 'At every item, branch into two universes: one where you take it, and one where you don\'t.', time: 'O(2ⁿ)', space: 'O(n)', visualizer: 'tree', maxInputWarning: 4 },
    memoized: { label: 'Memoized', shortLabel: 'Memo', description: 'I save the best value for every (item index, remaining capacity) combo I see, stopping duplicate work.', time: 'O(n·W)', space: 'O(n·W)', visualizer: 'tree' },
    tabulation: { label: 'Tabulation', shortLabel: 'Tab', description: 'Build a 2D grid of items against capacities. Every cell answers "what\'s the best I can do right here?".', time: 'O(n·W)', space: 'O(n·W)', visualizer: 'table2d' },
    spaceOptimized: { label: 'Space Optimized', shortLabel: 'O(W)', description: 'I only need the previous row to calculate the current one, so a single 1D array scanned right-to-left does the trick.', time: 'O(n·W)', space: 'O(W)', visualizer: 'table1d' },
  },
  insights: [
    'The 2D table for tabulation has (n+1)×(W+1) cells — each filled exactly once.',
    'Traversing backwards in the space-optimized version is the key insight: it ensures each item is counted at most once.',
    'The number of unique subproblems is n×W — memoization captures exactly this.',
    'The optimal solution can be traced back through the 2D table by checking dp[i][w] vs dp[i-1][w].',
  ],
  recurrence: 'dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w-wt[i]]) if wt[i] ≤ w, else dp[i-1][w]',
};
