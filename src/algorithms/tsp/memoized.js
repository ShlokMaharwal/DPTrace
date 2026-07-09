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

function buildSnap(memo, n) {
  const s = {};
  for (let mask = 0; mask < (1 << n); mask++)
    for (let c = 0; c < n; c++)
      s[`${mask},${c}`] = memo[`${mask},${c}`] ?? null;
  return s;
}

export function run({ n }) {
  const dist = makeGraph(n);
  const memo = {};
  const steps = [];
  const FULL = (1 << n) - 1;

  function dp(mask, cur) {
    if (mask === FULL) return dist[cur][0];
    const key = `${mask},${cur}`;
    if (memo[key] !== undefined) {
      steps.push({
        type: 'cache_hit',
        state: [cur, mask],
        value: memo[key],
        lineNumber: 3,
        explanation: `Cache hit: dp[${mask.toString(2).padStart(n, '0')}][${cur}] = ${memo[key]}`,
        tableSnapshot: buildSnap(memo, n),
      });
      return memo[key];
    }

    steps.push({
      type: 'call',
      state: [cur, mask],
      value: null,
      lineNumber: 4,
      explanation: `Computing dp[${mask.toString(2).padStart(n, '0')}][${cur}]: min cost to complete tour from city ${cur}`,
      tableSnapshot: buildSnap(memo, n),
    });

    let best = Infinity;
    for (let next = 0; next < n; next++) {
      if (!(mask & (1 << next))) {
        const sub = dp(mask | (1 << next), next);
        const cost = dist[cur][next] + sub;
        if (cost < best) best = cost;
      }
    }

    memo[key] = best;
    steps.push({
      type: 'cell_fill',
      state: [cur, mask],
      value: best,
      lineNumber: 9,
      explanation: `dp[${mask.toString(2).padStart(n, '0')}][${cur}] = ${best}`,
      tableSnapshot: buildSnap(memo, n),
    });
    return best;
  }

  const result = dp(1, 0);
  return { result, steps };
}

export const code = `int tsp(int mask, int cur, vector<vector<int>>& dist,
        vector<vector<int>>& memo, int n) {
  if (mask == (1<<n)-1) return dist[cur][0];
  if (memo[mask][cur] != -1) return memo[mask][cur];
  int best = INT_MAX;
  for (int next = 0; next < n; next++) {
    if (!(mask & (1<<next))) {
      int cost = dist[cur][next] + tsp(mask|(1<<next), next, dist, memo, n);
      best = min(best, cost);
    }
  }
  return memo[mask][cur] = best;
}`;

export const lineMap = { cache_hit: 3, call: 4, cell_fill: 9 };
