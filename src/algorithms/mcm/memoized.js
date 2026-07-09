
export function run({ dims }) {
  const steps = [];
  const n = dims.length - 1;
  const memo = {};
  function mcm(i, j) {
    const key = `${i},${j}`;
    steps.push({ type: 'call', state: [i, j], value: null, lineNumber: 2, explanation: `mcm(${i},${j}): checking cache...` });
    if (memo[key] !== undefined) { steps.push({ type: 'cache_hit', state: [i, j], value: memo[key], lineNumber: 3, explanation: `Cache hit! mcm(${i},${j}) = ${memo[key]}.` }); return memo[key]; }
    if (i === j) { memo[key] = 0; steps.push({ type: 'base_case', state: [i, j], value: 0, lineNumber: 4, explanation: `Single matrix: cost = 0.` }); return 0; }
    let minCost = Infinity;
    for (let k = i; k < j; k++) {
      const cost = mcm(i, k) + mcm(k + 1, j) + dims[i - 1] * dims[k] * dims[j];
      steps.push({ type: 'compare', state: [i, j], value: cost, lineNumber: 9, explanation: `k=${k}: cost=${cost}. Running min=${Math.min(minCost, cost)}.` });
      minCost = Math.min(minCost, cost);
    }
    memo[key] = minCost;
    steps.push({ type: 'return', state: [i, j], value: minCost, lineNumber: 11, explanation: `mcm(${i},${j}) = ${minCost}. Cached.` });
    return minCost;
  }
  const result = mcm(1, n);
  return { result, steps };
}

export const code = `int mcm(const std::vector<int>& dims, int i, int j) {
  
  if (memo[i][j] != -1) return memo[i][j];
  if (i == j) return memo[i][j] = 0;
  
  int min_cost = 1e9;
  for (int k = i; k < j; k++) {
    int cost = mcm(dims, i, k)
             + mcm(dims, k+1, j)
             + dims[i-1] * dims[k] * dims[j];
    min_cost = std::min(min_cost, cost);
  }
  return memo[i][j] = min_cost;
}`;
