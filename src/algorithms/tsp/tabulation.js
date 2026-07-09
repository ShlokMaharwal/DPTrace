function makeGraph(n) {
  const seed = [17, 31, 47, 59, 61, 71, 83, 97, 13, 29, 37, 53];
  const dist = [];
  for (let i = 0; i < n; i++) {
    dist.push([]);
    for (let j = 0; j < n; j++) {
      if (i === j) dist[i].push(0);
      else dist[i].push(5 + seed[(i * 7 + j * 3) % seed.length] % 15);
    }
  }
  return dist;
}

function buildSnap(dp, n) {
  const s = {};
  for (let mask = 0; mask < (1 << n); mask++)
    for (let c = 0; c < n; c++)
      s[`${mask},${c}`] = dp[mask][c] === Infinity ? null : dp[mask][c];
  return s;
}

export function run({ n }) {
  const dist = makeGraph(n);
  const FULL = (1 << n) - 1;
  const steps = [];

  const dp = Array.from({ length: 1 << n }, () => new Array(n).fill(Infinity));
  dp[1][0] = 0;

  steps.push({
    type: 'base_case',
    state: [0, 1],
    value: 0,
    lineNumber: 3,
    explanation: 'Base: dp[{city0}][0] = 0 — start at city 0, cost 0',
    tableSnapshot: buildSnap(dp, n),
  });

  for (let mask = 1; mask < (1 << n); mask++) {
    if (!(mask & 1)) continue;
    for (let cur = 0; cur < n; cur++) {
      if (!(mask & (1 << cur))) continue;
      if (dp[mask][cur] === Infinity) continue;
      for (let next = 0; next < n; next++) {
        if (mask & (1 << next)) continue;
        const newMask = mask | (1 << next);
        const newCost = dp[mask][cur] + dist[cur][next];
        if (newCost < dp[newMask][next]) {
          dp[newMask][next] = newCost;
          steps.push({
            type: 'cell_fill',
            state: [next, newMask],
            value: newCost,
            lineNumber: 9,
            explanation: `dp[${newMask.toString(2).padStart(n, '0')}][${next}] = ${newCost}  (from city ${cur} → ${next})`,
            tableSnapshot: buildSnap(dp, n),
          });
        }
      }
    }
  }

  let result = Infinity;
  for (let c = 1; c < n; c++) {
    if (dp[FULL][c] + dist[c][0] < result)
      result = dp[FULL][c] + dist[c][0];
  }

  return { result, steps };
}

export const code = `int tspTab(int n, vector<vector<int>>& dist) {
  int FULL = (1<<n)-1;
  vector<vector<int>> dp(1<<n, vector<int>(n, INT_MAX));
  dp[1][0] = 0;

  for (int mask=1; mask<(1<<n); mask++) {
    if (!(mask&1)) continue;
    for (int cur=0; cur<n; cur++) {
      if (!(mask&(1<<cur)) || dp[mask][cur]==INT_MAX) continue;
      for (int next=0; next<n; next++) {
        if (mask&(1<<next)) continue;
        int nm = mask|(1<<next);
        dp[nm][next] = min(dp[nm][next], dp[mask][cur]+dist[cur][next]);
      }
    }
  }

  int ans = INT_MAX;
  for (int c=1;c<n;c++) ans=min(ans, dp[FULL][c]+dist[c][0]);
  return ans;
}`;

export const lineMap = { base_case: 3, cell_fill: 9 };
