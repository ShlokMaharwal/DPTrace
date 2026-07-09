export const meta = {
  id: 'lis',
  title: 'Longest Increasing Subsequence',
  description: 'Find the longest strictly increasing subsequence in an array. The numbers don\'t have to be next to each other, they just have to go up.',
  category: '1D DP',
  difficulty: 'Medium',
  tags: ['1D', 'binary search', 'patience sorting', 'subsequence'],
  inputSchema: [
    { key: 'arr', label: 'Array (comma-separated)', type: 'array', maxLength: 12 },
  ],
  defaultInput: { arr: [10, 9, 2, 5, 3, 7, 101, 18] },
  approaches: {
    bruteForce: { label: 'Brute Force', shortLabel: 'BF', description: 'Look at every number and decide whether to include it in our sequence or skip it.', time: 'O(2ⁿ)', space: 'O(n)', visualizer: 'tree', maxInputWarning: 10 },
    memoized: { label: 'Memoized', shortLabel: 'Memo', description: 'Cache the best sequence length for every (current index, previous value) pair.', time: 'O(n²)', space: 'O(n²)', visualizer: 'tree' },
    tabulation: { label: 'Tabulation O(n²)', shortLabel: 'Tab', description: 'For every number, look back at all previous numbers. If it\'s bigger, extend their sequence.', time: 'O(n²)', space: 'O(n)', visualizer: 'table1d' },
    spaceOptimized: { label: 'Binary Search O(n log n)', shortLabel: 'O(n log n)', description: 'Build "patience piles" (tails). Binary search to find the right pile to put the current number on.', time: 'O(n log n)', space: 'O(n)', visualizer: 'table1d' },
  },
  insights: [
    'For [10,9,2,5,3,7,101,18]: LIS is [2,3,7,18] or [2,5,7,18] — length 4.',
    'The O(n²) dp[i] approach: dp[i] = max dp[j]+1 for all j < i where arr[j] < arr[i].',
    'The "tails" array in binary search does NOT store the actual LIS — only its length. Reconstruction requires extra bookkeeping.',
    'This is equivalent to "Patience Sorting" — the tails array is the piles, and length = pile count.',
  ],
  recurrence: 'dp[i] = max(dp[j] + 1) for all j < i where arr[j] < arr[i]',
};
