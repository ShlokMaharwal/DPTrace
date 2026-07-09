function makeGraph(n) {
  const dist = [];
  const seed = [17, 31, 47, 59, 61, 71, 83, 97, 13, 29, 37, 53];
  for (let i = 0; i < n; i++) {
    dist.push([]);
    for (let j = 0; j < n; j++) {
      if (i === j) dist[i].push(0);
      else {
        const idx = (i * n + j + (i < j ? 0 : 1)) % seed.length;
        dist[i].push(5 + seed[(i * 7 + j * 3) % seed.length] % 15);
      }
    }
  }
  return dist;
}

export function run({ n }) {
  const dist = makeGraph(n);
  const steps = [];
  let best = Infinity;
  let bestPerm = null;

  function permute(path, visited, cost) {
    if (path.length === n) {
      const total = cost + dist[path[path.length - 1]][0];
      steps.push({
        type: total < best ? 'update' : 'compare',
        state: [path[path.length - 1], (1 << n) - 1],
        value: total,
        lineNumber: total < best ? 5 : 6,
        explanation: `Tour ${path.concat([0]).join('→')}: cost=${total}${total < best ? ' ← new best!' : ''}`,
        tableSnapshot: buildSnap({}, n),
      });
      if (total < best) { best = total; bestPerm = [...path]; }
      return;
    }
    for (let next = 1; next < n; next++) {
      if (!visited[next]) {
        visited[next] = true;
        permute([...path, next], visited, cost + dist[path[path.length - 1]][next]);
        visited[next] = false;
      }
    }
  }

  const visited = new Array(n).fill(false);
  visited[0] = true;
  permute([0], visited, 0);

  return { result: best, steps };
}

function buildSnap(memo, n) {
  const s = {};
  for (let mask = 0; mask < (1 << n); mask++)
    for (let c = 0; c < n; c++)
      s[`${mask},${c}`] = memo[`${mask},${c}`] ?? null;
  return s;
}

export const code = `int tspBF(int mask, int cur, vector<vector<int>>& dist, int n) {
  if (mask == (1<<n)-1)
    return dist[cur][0];
  int best = INT_MAX;
  for (int next=0; next<n; next++) {
    if (!(mask & (1<<next)))
      best = min(best, dist[cur][next] + tspBF(mask|(1<<next), next, dist, n));
  }
  return best;
}`;

export const lineMap = { compare: 6, update: 5 };
