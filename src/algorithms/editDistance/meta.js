export const meta = {
  id: 'editDistance',
  title: 'Edit Distance (Levenshtein)',
  description: 'What\'s the minimum number of single-character edits (insert, delete, replace) to turn one string into another? It\'s the engine behind spell checkers and diff tools.',
  category: '2D DP',
  difficulty: 'Medium',
  tags: ['string', '2D', 'transformation', 'Levenshtein'],
  inputSchema: [
    { key: 's1', label: 'Source String', type: 'string', maxLength: 7 },
    { key: 's2', label: 'Target String', type: 'string', maxLength: 7 },
  ],
  defaultInput: { s1: 'sunday', s2: 'saturday' },
  approaches: {
    bruteForce: { label: 'Brute Force', shortLabel: 'BF', description: 'At every mismatched character, fork into three timelines: insert, delete, and replace. It gets out of hand fast.', time: 'O(3^(m+n))', space: 'O(m+n)', visualizer: 'tree', maxInputWarning: 4 },
    memoized: { label: 'Memoized', shortLabel: 'Memo', description: 'Cache the distance for any string suffix pair we\'ve already calculated.', time: 'O(m×n)', space: 'O(m×n)', visualizer: 'tree' },
    tabulation: { label: 'Tabulation', shortLabel: 'Tab', description: 'Fill out a grid where each cell tells you the cheapest edit path up to those string prefixes.', time: 'O(m×n)', space: 'O(m×n)', visualizer: 'table2d' },
    spaceOptimized: { label: 'Space Optimized', shortLabel: 'O(n)', description: 'We only look back one row at a time, so keep two rows in memory and discard the rest.', time: 'O(m×n)', space: 'O(n)', visualizer: 'table2d' },
  },
  insights: [
    '"sunday" → "saturday": 3 edits. Insert "a", insert "t", replace "n" → "r".',
    'Edit Distance and LCS are duals: ED(s1,s2) = m+n - 2·LCS(s1,s2).',
    'The table diagonal handles matches and replacements; left handles insertions; top handles deletions.',
    'Used in git diff, DNA sequence alignment, and autocorrect systems.',
  ],
  recurrence: 'dp[i][j] = dp[i-1][j-1] if match, else 1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])',
};
