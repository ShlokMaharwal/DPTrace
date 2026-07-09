export const meta = {
  id: 'partitionSubset',
  title: 'Partition Equal Subset Sum',
  description: 'Can we split an array into two subsets that have the exact same sum? It boils down to finding a subset that equals exactly half the total sum.',
  category: 'Subset DP',
  tags: ['subset', 'boolean DP', 'NP-complete variant', 'knapsack variant'],
  inputSchema: [
    { key: 'arr', label: 'Array (comma-separated)', type: 'array', maxLength: 8 },
  ],
  defaultInput: { arr: [1, 5, 11, 5] },
  approaches: {
    bruteForce: { label: 'Brute Force', shortLabel: 'BF', description: 'Try every possible subset to see if any of them hit our target half-sum.', time: 'O(2ⁿ)', space: 'O(n)', visualizer: 'tree', maxInputWarning: 8 },
    memoized: { label: 'Memoized', shortLabel: 'Memo', description: 'Save the boolean result for (index, remaining sum). Prunes dead ends fast.', time: 'O(n × sum)', space: 'O(n × sum)', visualizer: 'tree' },
    tabulation: { label: 'Tabulation', shortLabel: 'Tab', description: 'Build a boolean grid. Can we make sum `s` using the first `i` elements?', time: 'O(n × sum)', space: 'O(n × sum)', visualizer: 'table2d' },
    spaceOptimized: { label: 'Space Optimized', shortLabel: 'O(sum)', description: 'Use a single boolean array and walk it backwards, just like the 1D knapsack.', time: 'O(n × sum)', space: 'O(sum)', visualizer: 'table1d' },
  },
  insights: [
    '[1,5,11,5]: total=22, target=11. Subset {11} or {1,5,5} both sum to 11. Answer: true.',
    'This is NP-complete in general (arbitrary integers), but pseudo-polynomial with DP (bounded by sum).',
    'The 1D optimization traverses backwards — same trick as 0/1 Knapsack space optimization.',
    'dp[target] starts false; becomes true the moment any subset hits the target sum.',
  ],
  recurrence: 'dp[i][s] = dp[i-1][s] OR (s >= arr[i] AND dp[i-1][s-arr[i]])',
};
