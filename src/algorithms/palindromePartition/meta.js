export const meta = {
  id: 'palindromePartition',
  title: 'Palindrome Partitioning (Min Cuts)',
  description: 'Find the minimum number of cuts to partition a string into substrings that are all palindromes. A classic interval DP problem.',
  category: '1D DP',
  tags: ['interval DP', 'palindrome', 'string', '1D'],

  inputSchema: [
    { key: 's', label: 'String', type: 'string', maxLength: 12 },
  ],

  defaultInput: { s: 'aabbc' },

  approaches: {
    bruteForce: {
      label: 'Brute Force',
      shortLabel: 'BF',
      description: 'Try every possible cut position. For each substring, check if it is a palindrome recursively.',
      time: 'O(2ⁿ)',
      space: 'O(n)',
      visualizer: 'table1d',
    },
    memoized: {
      label: 'Memoized',
      shortLabel: 'Memo',
      description: 'Cache results for each starting index to avoid recomputing overlapping subproblems.',
      time: 'O(n²)',
      space: 'O(n²)',
      visualizer: 'table1d',
    },
    tabulation: {
      label: 'Tabulation',
      shortLabel: 'Tab',
      description: 'Bottom-up: precompute a palindrome table, then fill dp[i] = min cuts for s[0..i].',
      time: 'O(n²)',
      space: 'O(n²)',
      visualizer: 'table1d',
    },
    spaceOptimized: {
      label: 'Space Optimized',
      shortLabel: 'O(n)',
      description: 'Expand around center to fill the palindrome and cut tables in a single pass.',
      time: 'O(n²)',
      space: 'O(n)',
      visualizer: 'table1d',
    },
  },

  insights: [
    'The naive approach tries all 2^n possible cuts — exponential.',
    'Precomputing isPalin[i][j] in O(n²) turns the cut check into O(1).',
    'dp[i] = min cuts for s[0..i]. If s[0..i] itself is a palindrome, dp[i] = 0.',
    'Expand-around-center avoids the palindrome table entirely, using only O(n) extra space.',
  ],

  recurrence: 'dp[i] = min(dp[j-1] + 1) for all j ≤ i where s[j..i] is a palindrome',
};
