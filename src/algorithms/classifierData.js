export const classifierData = [
  {
    problem: 'knapsack',
    patterns: [
      'knapsack', 'weights', 'values', 'capacity', 'maximize value', 'weight limit',
      '0/1', 'items', 'pick or skip', 'include or exclude', 'maximum profit'
    ],
  },
  {
    problem: 'coinChange',
    patterns: [
      'coin', 'coins', 'change', 'minimum coins', 'denominations', 'amount',
      'sum of coins', 'currency', 'unbounded', 'fewest coins', 'make up amount'
    ],
  },
  {
    problem: 'lcs',
    patterns: [
      'longest common subsequence', 'lcs', 'common subsequence',
      'two strings', 'matching characters', 'subsequence', 'text1 text2'
    ],
  },
  {
    problem: 'editDistance',
    patterns: [
      'edit distance', 'levenshtein', 'minimum operations', 'insert delete replace',
      'transform string', 'word1 word2', 'minimum edits', 'convert string'
    ],
  },
  {
    problem: 'lis',
    patterns: [
      'longest increasing subsequence', 'lis', 'increasing subsequence',
      'strictly increasing', 'longest sorted', 'patience sorting'
    ],
  },
  {
    problem: 'fibonacci',
    patterns: [
      'fibonacci', 'fib', 'climbing stairs', 'staircase', 'n-th step',
      'ways to climb', 'fib(n)', 'sum of previous two'
    ],
  },
  {
    problem: 'mcm',
    patterns: [
      'matrix chain', 'mcm', 'matrix multiplication', 'parenthesization',
      'minimum cost multiplication', 'brackets', 'chain of matrices', 'matrix dimensions'
    ],
  },
  {
    problem: 'partitionSubset',
    patterns: [
      'partition', 'equal subset sum', 'subset sum', 'split array', 'two equal parts',
      'half the sum', 'can partition'
    ],
  },
  {
    problem: 'eggDrop',
    patterns: [
      'egg drop', 'eggs floors', 'critical floor', 'minimum trials', 'super egg',
      'floor testing', 'egg breaking', 'highest floor'
    ],
  },
  {
    problem: 'palindromePartition',
    patterns: [
      'palindrome partition', 'minimum cuts', 'cut palindromes', 'palindromic substrings',
      'min cuts', 'partition into palindromes'
    ],
  },
  {
    problem: 'tsp',
    patterns: [
      'travelling salesman', 'tsp', 'shortest tour', 'hamiltonian cycle',
      'visit all cities', 'minimum path all nodes', 'bitmask dp', 'visiting exactly once'
    ],
  },
];

const documents = classifierData.map(d => ({
  problem: d.problem,
  text: d.patterns.join(' ').toLowerCase()
}));

function tokenize(text) {
  return text.toLowerCase().match(/\b[a-z0-9]+\b/g) || [];
}

const df = {};
const docTokens = [];

documents.forEach(doc => {
  const tokens = tokenize(doc.text);
  docTokens.push(tokens);
  const uniqueTokens = new Set(tokens);
  uniqueTokens.forEach(t => {
    df[t] = (df[t] || 0) + 1;
  });
});

const N = documents.length;
const idf = {};
for (const t in df) {
  idf[t] = Math.log(N / (1 + df[t]));
}

function computeTF(tokens) {
  const tf = {};
  tokens.forEach(t => {
    tf[t] = (tf[t] || 0) + 1;
  });
  for (const t in tf) {
    tf[t] = tf[t] / tokens.length;
  }
  return tf;
}

const docVectors = docTokens.map(tokens => {
  const tf = computeTF(tokens);
  const vector = {};
  let norm = 0;
  for (const t in tf) {
    if (idf[t]) {
      const val = tf[t] * idf[t];
      vector[t] = val;
      norm += val * val;
    }
  }
  return { vector, norm: Math.sqrt(norm) };
});

export function classifyProblem(query) {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return null;

  const queryTF = computeTF(queryTokens);
  const queryVector = {};
  let queryNorm = 0;
  
  for (const t in queryTF) {
    if (idf[t]) {
      const val = queryTF[t] * idf[t];
      queryVector[t] = val;
      queryNorm += val * val;
    }
  }

  queryNorm = Math.sqrt(queryNorm);
  if (queryNorm === 0) return null;

  let bestProblem = null;
  let maxScore = 0;

  docVectors.forEach((doc, i) => {
    let dotProduct = 0;
    for (const t in queryVector) {
      if (doc.vector[t]) {
        dotProduct += queryVector[t] * doc.vector[t];
      }
    }
    
    const cosineSimilarity = doc.norm > 0 ? (dotProduct / (queryNorm * doc.norm)) : 0;
    
    if (cosineSimilarity > maxScore) {
      maxScore = cosineSimilarity;
      bestProblem = documents[i].problem;
    }
  });

  return maxScore > 0.05 ? bestProblem : null;
}
