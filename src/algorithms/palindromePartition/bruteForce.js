function isPalin(s, l, r) {
  while (l < r) { if (s[l] !== s[r]) return false; l++; r--; }
  return true;
}

export function run({ s }) {
  const n = s.length;
  const steps = [];

  function dp(i) {
    if (i < 0) return -1;
    if (isPalin(s, 0, i)) {
      steps.push({
        type: 'base_case',
        state: [i],
        value: 0,
        lineNumber: 2,
        explanation: `s[0..${i}]="${s.slice(0, i + 1)}" is a palindrome — 0 cuts needed`,
        tableSnapshot: Array(n).fill(null),
      });
      return 0;
    }

    steps.push({
      type: 'call',
      state: [i],
      value: null,
      lineNumber: 4,
      explanation: `Computing min cuts for s[0..${i}]="${s.slice(0, i + 1)}"`,
      tableSnapshot: Array(n).fill(null),
    });

    let best = Infinity;
    for (let j = 1; j <= i; j++) {
      if (isPalin(s, j, i)) {
        const sub = dp(j - 1);
        const cuts = sub + 1;
        if (cuts < best) best = cuts;
      }
    }

    steps.push({
      type: 'return',
      state: [i],
      value: best,
      lineNumber: 9,
      explanation: `Min cuts for s[0..${i}] = ${best}`,
      tableSnapshot: Array(n).fill(null),
    });
    return best;
  }

  const result = dp(n - 1);
  return { result, steps };
}

export const code = `bool isPalin(const string& s, int l, int r) {
  while (l < r) if (s[l++] != s[r--]) return false;
  return true;
}

int minCutsBF(const string& s, int i) {
  if (isPalin(s, 0, i)) return 0;
  int best = INT_MAX;
  for (int j = 1; j <= i; j++) {
    if (isPalin(s, j, i))
      best = min(best, 1 + minCutsBF(s, j-1));
  }
  return best;
}`;

export const lineMap = { base_case: 2, call: 4, return: 9 };
