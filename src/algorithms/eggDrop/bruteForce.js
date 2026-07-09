export function run({ eggs, floors }) {
  const steps = [];
  const memo = {};

  function dp(e, f) {
    if (f === 0 || f === 1) {
      steps.push({
        type: 'base_case',
        state: [e, f],
        value: f,
        lineNumber: 2,
        explanation: `Base case: dp[${e}][${f}] = ${f} (${f === 0 ? '0 floors → 0 trials' : '1 floor → 1 trial'})`,
        tableSnapshot: buildSnapshot(memo, eggs, floors),
      });
      return f;
    }
    if (e === 1) {
      steps.push({
        type: 'base_case',
        state: [e, f],
        value: f,
        lineNumber: 3,
        explanation: `Base case: dp[1][${f}] = ${f} — with 1 egg, must check every floor linearly`,
        tableSnapshot: buildSnapshot(memo, eggs, floors),
      });
      return f;
    }
    if (memo[`${e},${f}`] !== undefined) {
      steps.push({
        type: 'cache_hit',
        state: [e, f],
        value: memo[`${e},${f}`],
        lineNumber: 4,
        explanation: `Cache hit: dp[${e}][${f}] = ${memo[`${e},${f}`]}`,
        tableSnapshot: buildSnapshot(memo, eggs, floors),
      });
      return memo[`${e},${f}`];
    }

    steps.push({
      type: 'call',
      state: [e, f],
      value: null,
      lineNumber: 5,
      explanation: `Computing dp[${e}][${f}]: try each floor 1..${f}`,
      tableSnapshot: buildSnapshot(memo, eggs, floors),
    });

    let best = Infinity;
    for (let x = 1; x <= f; x++) {
      const breaks = dp(e - 1, x - 1);
      const survives = dp(e, f - x);
      const worst = 1 + Math.max(breaks, survives);
      if (worst < best) best = worst;
    }

    memo[`${e},${f}`] = best;
    steps.push({
      type: 'return',
      state: [e, f],
      value: best,
      lineNumber: 10,
      explanation: `dp[${e}][${f}] = ${best}`,
      tableSnapshot: buildSnapshot(memo, eggs, floors),
    });
    return best;
  }

  const result = dp(eggs, floors);
  return { result, steps };
}

function buildSnapshot(memo, maxE, maxF) {
  const snap = {};
  for (let e = 1; e <= maxE; e++)
    for (let f = 0; f <= maxF; f++)
      snap[`${e},${f}`] = memo[`${e},${f}`] ?? null;
  return snap;
}

export const code = `int dp(int e, int f, vector<vector<int>>& memo) {
  if (f == 0 || f == 1) return f;
  if (e == 1) return f;
  if (memo[e][f] != -1) return memo[e][f];

  int best = INT_MAX;
  for (int x = 1; x <= f; x++) {
    int breaks   = dp(e-1, x-1, memo);
    int survives = dp(e, f-x, memo);
    int worst    = 1 + max(breaks, survives);
    best = min(best, worst);
  }
  return memo[e][f] = best;
}

int superEggDrop(int e, int f) {
  vector<vector<int>> memo(e+1, vector<int>(f+1, -1));
  return dp(e, f, memo);
}`;

export const lineMap = { base_case: 2, cache_hit: 4, call: 5, return: 10 };
