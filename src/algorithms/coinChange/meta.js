export const meta = {
  id: 'coinChange',
  title: 'Coin Change (Unbounded Knapsack)',
  description: 'What\'s the fewest coins you need to hit an exact amount? Unlike the 0/1 knapsack, you have an infinite supply of each coin denomination.',
  category: '1D DP',
  tags: ['unbounded', 'knapsack variant', 'BFS-like', 'greedy fails'],
  inputSchema: [
    { key: 'coins', label: 'Coins (comma-separated)', type: 'array' },
    { key: 'amount', label: 'Target Amount', type: 'number', min: 1, max: 30, step: 1 },
  ],
  defaultInput: { coins: [1, 5, 6, 9], amount: 11 },
  approaches: {
    bruteForce: { label: 'Brute Force', shortLabel: 'BF', description: 'Try subtracting every coin from the remaining amount, branching wildly until we hit exactly zero.', time: 'O(Sⁿ)', space: 'O(n)', visualizer: 'tree', maxInputWarning: 15 },
    memoized: { label: 'Memoized', shortLabel: 'Memo', description: 'I remember the minimum coins needed for any amount I\'ve already seen. Cuts the call count down massively.', time: 'O(amount × coins)', space: 'O(amount)', visualizer: 'tree' },
    tabulation: { label: 'Tabulation', shortLabel: 'Tab', description: 'Build an array from 0 to the target amount, finding the cheapest way to reach each stepping stone.', time: 'O(amount × coins)', space: 'O(amount)', visualizer: 'table1d' },
    spaceOptimized: { label: 'Per-Coin Waves', shortLabel: 'Waves', description: 'Process one coin at a time. Watch how each new denomination ripples through and improves our previous answers.', time: 'O(amount × coins)', space: 'O(amount)', visualizer: 'table1d' },
  },
  insights: [
    'Greedy (always pick largest coin) fails: coins=[1,5,6,9], amount=11 → greedy gives 9+1+1=3, DP gives 6+5=2.',
    'Unbounded = no "take once" constraint, so we don\'t traverse backwards like in 0/1 Knapsack.',
    'Each unique subproblem is just an integer 0..amount — only amount+1 states total.',
    'This is isomorphic to BFS on a number line where each coin is an edge weight of 1.',
  ],
  recurrence: 'dp[a] = min(dp[a - coin] + 1) for all coins where coin ≤ a',
};
