export const classifierData = [
  {
    problem: 'knapsack',
    patterns: [
      'knapsack', 'weights', 'values', 'capacity', 'maximize value', 'weight limit',
      '0/1', 'items', 'pick or skip', 'include or exclude',
    ],
  },
  {
    problem: 'coinChange',
    patterns: [
      'coin', 'coins', 'change', 'minimum coins', 'denominations', 'amount',
      'sum of coins', 'currency', 'unbounded', 'fewest coins',
    ],
  },
  {
    problem: 'lcs',
    patterns: [
      'longest common subsequence', 'lcs', 'common subsequence',
      'two strings', 'matching characters', 'subsequence',
    ],
  },
  {
    problem: 'editDistance',
    patterns: [
      'edit distance', 'levenshtein', 'minimum operations', 'insert delete replace',
      'transform string', 'word1 word2', 'minimum edits',
    ],
  },
  {
    problem: 'lis',
    patterns: [
      'longest increasing subsequence', 'lis', 'increasing subsequence',
      'strictly increasing', 'longest sorted', 'patience sorting',
    ],
  },
  {
    problem: 'fibonacci',
    patterns: [
      'fibonacci', 'fib', 'climbing stairs', 'staircase', 'n-th step',
      'ways to climb', 'fib(n)', 'sum of previous two',
    ],
  },
  {
    problem: 'mcm',
    patterns: [
      'matrix chain', 'mcm', 'matrix multiplication', 'parenthesization',
      'minimum cost multiplication', 'brackets', 'chain of matrices',
    ],
  },
  {
    problem: 'partitionSubset',
    patterns: [
      'partition', 'equal subset sum', 'subset sum', 'split array', 'two equal parts',
      'half the sum', 'can partition',
    ],
  },
  {
    problem: 'eggDrop',
    patterns: [
      'egg drop', 'eggs floors', 'critical floor', 'minimum trials', 'super egg',
      'floor testing', 'egg breaking',
    ],
  },
  {
    problem: 'palindromePartition',
    patterns: [
      'palindrome partition', 'minimum cuts', 'cut palindromes', 'palindromic substrings',
      'min cuts', 'partition into palindromes',
    ],
  },
  {
    problem: 'tsp',
    patterns: [
      'travelling salesman', 'tsp', 'shortest tour', 'hamiltonian cycle',
      'visit all cities', 'minimum path all nodes', 'bitmask dp',
    ],
  },
];

export function classifyProblem(text) {
  const lower = text.toLowerCase();
  const scores = classifierData.map(({ problem, patterns }) => {
    let score = 0;
    for (const p of patterns) {
      if (lower.includes(p)) score += p.split(' ').length;
    }
    return { problem, score };
  });
  scores.sort((a, b) => b.score - a.score);
  if (scores[0].score === 0) return null;
  return scores[0].problem;
}
