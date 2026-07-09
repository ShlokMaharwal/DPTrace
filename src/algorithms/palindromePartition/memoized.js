function isPalin(s, l, r) {
  while (l < r) { if (s[l] !== s[r]) return false; l++; r--; }
  return true;
}

export function run({ s }) {
  const n = s.length;
  const steps = [];
  const memo = new Array(n).fill(undefined);
  const dpArr = new Array(n).fill(null);

  function dp(i) {
    if (i < 0) return -1;
    if (isPalin(s, 0, i)) {
      memo[i] = 0;
      dpArr[i] = 0;
      steps.push({
        type: 'base_case',
        state: [i],
        value: 0,
        lineNumber: 2,
        explanation: `s[0..${i}]="${s.slice(0, i + 1)}" is a palindrome — 0 cuts`,
        tableSnapshot: [...dpArr],
      });
      return 0;
    }
    if (memo[i] !== undefined) {
      steps.push({
        type: 'cache_hit',
        state: [i],
        value: memo[i],
        lineNumber: 3,
        explanation: `Cache hit: minCuts[${i}] = ${memo[i]}`,
        tableSnapshot: [...dpArr],
      });
      return memo[i];
    }

    steps.push({
      type: 'call',
      state: [i],
      value: null,
      lineNumber: 4,
      explanation: `Computing min cuts for s[0..${i}]="${s.slice(0, i + 1)}"`,
      tableSnapshot: [...dpArr],
    });

    let best = Infinity;
    for (let j = 1; j <= i; j++) {
      if (isPalin(s, j, i)) {
        const sub = dp(j - 1);
        const cuts = sub + 1;
        if (cuts < best) best = cuts;
      }
    }

    memo[i] = best;
    dpArr[i] = best;
    steps.push({
      type: 'cell_fill',
      state: [i],
      value: best,
      lineNumber: 9,
      explanation: `minCuts[${i}] = ${best} for s[0..${i}]="${s.slice(0, i + 1)}"`,
      tableSnapshot: [...dpArr],
    });
    return best;
  }

  const result = dp(n - 1);
  return { result, steps };
}

export const code = `int minCuts(const string& s, int i, vector<int>& memo) {
  if (isPalin(s, 0, i)) return 0;
  if (memo[i] != -1) return memo[i];
  int best = INT_MAX;
  for (int j = 1; j <= i; j++) {
    if (isPalin(s, j, i))
      best = min(best, 1 + minCuts(s, j-1, memo));
  }
  return memo[i] = best;
}`;

export const lineMap = { base_case: 2, cache_hit: 3, call: 4, cell_fill: 9 };
