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

  for (let e = 1; e <= E; e++) { dp[e][0] = 0; dp[e][1] = 1; }
  for (let f = 2; f <= F; f++) dp[1][f] = f;

  for (let e = 2; e <= E; e++) {
    for (let f = 2; f <= F; f++) {
      let lo = 1, hi = f, best = f;
      while (lo <= hi) {
        const mid = (lo + hi) >> 1;
        const breaks   = dp[e - 1][mid - 1];
        const survives = dp[e][f - mid];
        const worst = 1 + Math.max(breaks, survives);
        if (worst < best) best = worst;

        steps.push({
          type: 'compare',
          state: [e, f],
          value: worst,
          lineNumber: 8,
          explanation: `Binary search: egg drop at floor ${mid} → worst=${worst}`,
          tableSnapshot: snapshot(),
        });

        if (breaks < survives) lo = mid + 1;
        else hi = mid - 1;
      }
      dp[e][f] = best;
      steps.push({
        type: 'cell_fill',
        state: [e, f],
        value: best,
        lineNumber: 12,
        explanation: `dp[${e}][${f}] = ${best} (binary search optimized)`,
        tableSnapshot: snapshot(),
      });
    }
  }

  return { result: dp[E][F], steps };
}

export const code = `int eggDropOpt(int e, int f) {
  vector<vector<int>> dp(e+1, vector<int>(f+1, 0));
  for (int i=1;i<=e;i++){dp[i][0]=0;dp[i][1]=1;}
  for (int j=2;j<=f;j++) dp[1][j]=j;

  for (int i = 2; i <= e; i++) {
    for (int j = 2; j <= f; j++) {
      int lo=1, hi=j, best=j;
      while (lo <= hi) {
        int mid = (lo+hi)/2;
        int b = dp[i-1][mid-1], s = dp[i][j-mid];
        int worst = 1 + max(b,s);
        if (worst < best) best = worst;
        if (b < s) lo = mid+1; else hi = mid-1;
      }
      dp[i][j] = best;
    }
  }
  return dp[e][f];
}`;

export const lineMap = { compare: 8, cell_fill: 12 };
