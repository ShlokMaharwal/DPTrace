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

  for (let mask = 1; mask < (1 << n); mask++) {
    if (!(mask & 1)) continue;
    for (let cur = 0; cur < n; cur++) {
      if (!(mask & (1 << cur)) || dp[mask][cur] === Infinity) continue;
      if (mask === FULL) {
        const total = dp[mask][cur] + dist[cur][0];
        steps.push({
          type: 'compare',
          state: [cur, mask],
          value: total,
          lineNumber: 7,
          explanation: `Complete tour ending at ${cur}: cost ${dp[mask][cur]} + return ${dist[cur][0]} = ${total}`,
          tableSnapshot: buildSnap(dp, n),
        });
        continue;
      }
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
            lineNumber: 11,
            explanation: `dp[${newMask.toString(2).padStart(n, '0')}][${next}] = ${newCost}`,
            tableSnapshot: buildSnap(dp, n),
          });
        }
      }
    }
  }

  let result = Infinity;
  for (let c = 1; c < n; c++) {
    const total = dp[FULL][c] + dist[c][0];
    if (total < result) result = total;
  }

  return { result, steps };
}

export const code = `int tspOpt(int n, vector<vector<int>>& dist) {
  int FULL=(1<<n)-1;
  vector<vector<int>> dp(1<<n,vector<int>(n,INT_MAX));
  dp[1][0]=0;

  for(int mask=1;mask<(1<<n);mask++){
    if(!(mask&1)) continue;
    for(int cur=0;cur<n;cur++){
      if(!(mask&(1<<cur))||dp[mask][cur]==INT_MAX) continue;
      if(mask==FULL){  continue; }
      for(int next=0;next<n;next++){
        if(mask&(1<<next)) continue;
        int nm=mask|(1<<next);
        dp[nm][next]=min(dp[nm][next],dp[mask][cur]+dist[cur][next]);
      }
    }
  }
  int ans=INT_MAX;
  for(int c=1;c<n;c++) ans=min(ans,dp[FULL][c]+dist[c][0]);
  return ans;
}`;

export const lineMap = { compare: 7, cell_fill: 11 };
