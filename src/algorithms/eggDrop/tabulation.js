export function run({ eggs, floors }) {
  const steps = [];
  const E = eggs, F = floors;

  const dp = Array.from({ length: E + 1 }, () => new Array(F + 1).fill(0));
  const snapshot = () => {
    const s = {};
    for (let e = 1; e <= E; e++)
      for (let f = 0; f <= F; f++)
        s[`${e},${f}`] = dp[e][f] || null;
    return s;
  };

  for (let e = 1; e <= E; e++) {
    dp[e][0] = 0;
    dp[e][1] = 1;
    steps.push({
      type: 'base_case',
      state: [e, 1],
      value: 1,
      lineNumber: 3,
      explanation: `Base: dp[${e}][0]=0, dp[${e}][1]=1`,
      tableSnapshot: snapshot(),
    });
  }

  for (let f = 2; f <= F; f++) {
    dp[1][f] = f;
    steps.push({
      type: 'base_case',
      state: [1, f],
      value: f,
      lineNumber: 4,
      explanation: `Base: dp[1][${f}] = ${f} — 1 egg needs linear scan`,
      tableSnapshot: snapshot(),
    });
  }

  for (let e = 2; e <= E; e++) {
    for (let f = 2; f <= F; f++) {
      let best = Infinity;
      for (let x = 1; x <= f; x++) {
        const worst = 1 + Math.max(dp[e - 1][x - 1], dp[e][f - x]);
        if (worst < best) best = worst;
      }
      dp[e][f] = best;
      steps.push({
        type: 'cell_fill',
        state: [e, f],
        value: best,
        lineNumber: 9,
        explanation: `dp[${e}][${f}] = ${best} — min worst-case trials with ${e} eggs and ${f} floors`,
        tableSnapshot: snapshot(),
      });
    }
  }

  return { result: dp[E][F], steps };
}

export const code = `int eggDrop(int e, int f) {
  vector<vector<int>> dp(e+1, vector<int>(f+1, 0));
  for (int i = 1; i <= e; i++) { dp[i][0]=0; dp[i][1]=1; }
  for (int j = 2; j <= f; j++) dp[1][j] = j;

  for (int i = 2; i <= e; i++) {
    for (int j = 2; j <= f; j++) {
      dp[i][j] = INT_MAX;
      for (int x = 1; x <= j; x++) {
        int worst = 1 + max(dp[i-1][x-1], dp[i][j-x]);
        dp[i][j] = min(dp[i][j], worst);
      }
    }
  }
  return dp[e][f];
}`;

export const lineMap = { base_case: 3, cell_fill: 9 };
