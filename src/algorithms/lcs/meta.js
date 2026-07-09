export const meta = {
  id: 'lcs',
  title: 'Longest Common Subsequence',
  description: 'Find the longest sequence of characters that appears in both strings, in the same order, but not necessarily contiguous.',
  category: '2D DP',
  difficulty: 'Medium',
  tags: ['string', '2D', 'subsequence', 'sequence alignment'],
  inputSchema: [
    { key: 's1', label: 'String 1', type: 'string', maxLength: 8 },
    { key: 's2', label: 'String 2', type: 'string', maxLength: 8 },
  ],
  defaultInput: { s1: 'ABCBDAB', s2: 'BDCABA' },
  approaches: {
    bruteForce: { label: 'Brute Force', shortLabel: 'BF', description: 'If the characters match, advance both. If not, branch two ways and take the best.', time: 'O(2^(m+n))', space: 'O(m+n)', visualizer: 'tree', maxInputWarning: 5 },
    memoized: { label: 'Memoized', shortLabel: 'Memo', description: 'Remember the LCS length for string suffixes we\'ve already compared.', time: 'O(m×n)', space: 'O(m×n)', visualizer: 'tree' },
    tabulation: { label: 'Tabulation', shortLabel: 'Tab', description: 'Build a grid mapping the prefixes of string A against string B. Matches move diagonally.', time: 'O(m×n)', space: 'O(m×n)', visualizer: 'table2d' },
    spaceOptimized: { label: 'Space Optimized', shortLabel: 'O(n)', description: 'Like most 2D string problems, we only need the current and previous row to keep moving forward.', time: 'O(m×n)', space: 'O(n)', visualizer: 'table2d' },
  },
  insights: [
    'LCS of "ABCBDAB" and "BDCABA" is "BCBA" or "BCAB" — length 4.',
    'The recurrence has two branches: match (diagonal +1) vs no-match (max of left/top).',
    'You can reconstruct the actual subsequence by backtracking from dp[m][n] to dp[0][0].',
    'Edit Distance and LCS are duals — knowing one helps understand the other.',
  ],
  recurrence: 'dp[i][j] = dp[i-1][j-1]+1 if match, else max(dp[i-1][j], dp[i][j-1])',
};
