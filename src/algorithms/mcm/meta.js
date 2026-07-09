export const meta = {
  id: 'mcm',
  title: 'Matrix Chain Multiplication',
  description: 'What\'s the cheapest way to parenthesize a chain of matrix multiplications? The final result is the same, but the order changes the number of scalar multiplications wildly.',
  category: 'Interval DP',
  tags: ['interval DP', '2D', 'optimization', 'parenthesization'],
  inputSchema: [
    { key: 'dims', label: 'Dimensions (comma-separated, e.g. 10,30,5,60 = matrices 10×30, 30×5, 5×60)', type: 'array', minLength: 3, maxLength: 6 },
  ],
  defaultInput: { dims: [10, 30, 5, 60] },
  approaches: {
    bruteForce: { label: 'Brute Force', shortLabel: 'BF', description: 'Try splitting the matrices at every possible gap. Explodes quickly via Catalan numbers.', time: 'O(4ⁿ/n^1.5)', space: 'O(n)', visualizer: 'tree', maxInputWarning: 4 },
    memoized: { label: 'Memoized', shortLabel: 'Memo', description: 'Cache the best cost for every (start, end) interval we\'ve already calculated.', time: 'O(n³)', space: 'O(n²)', visualizer: 'tree' },
    tabulation: { label: 'Tabulation', shortLabel: 'Tab', description: 'Build up the solution by interval length. Solve all pairs, then all triplets, up to the full chain.', time: 'O(n³)', space: 'O(n²)', visualizer: 'table2d' },
    spaceOptimized: { label: 'Split Tracking', shortLabel: 'Splits', description: 'Same as tabulation, but we also save the actual split points so we can reconstruct the final parenthesization.', time: 'O(n³)', space: 'O(n²)', visualizer: 'table2d' },
  },
  insights: [
    'For dims=[10,30,5,60]: (A1×A2)×A3 = 10×30×60 + 10×5×60 = 21,000. A1×(A2×A3) = 30×5×60 + 10×30×60 = 27,000. Order matters!',
    'Interval DP fills the table diagonally — you must compute shorter chains before longer ones.',
    'The number of parenthesizations is the Catalan number C(n-1) — grows faster than exponential.',
    'The split table lets you recover the optimal parenthesization via a simple recursive reconstruction.',
  ],
  recurrence: 'dp[i][j] = min over k in [i,j-1] of (dp[i][k] + dp[k+1][j] + dims[i-1]*dims[k]*dims[j])',
};
