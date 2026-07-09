
const STEP_CAP = 4900;
export function run({ dims }) {
  const steps = [];
  const n = dims.length - 1; 

  function mcm(i, j) {
    if (steps.length >= STEP_CAP) return 0;
    steps.push({ type: 'call', state: [i, j], value: null, lineNumber: 2, explanation: `mcm(${i},${j}): min cost to multiply matrices A${i}..A${j}` });
    if (i === j) {
      steps.push({ type: 'base_case', state: [i, j], value: 0, lineNumber: 3, explanation: `Single matrix A${i}. Cost = 0 (no multiplication needed).` });
      return 0;
    }
    let minCost = Infinity;
    for (let k = i; k < j; k++) {
      const left = mcm(i, k);
      const right = mcm(k + 1, j);
      const cost = left + right + dims[i - 1] * dims[k] * dims[j];
      steps.push({ type: 'compare', state: [i, j], value: cost, lineNumber: 8, explanation: `Split at k=${k}: (A${i}..A${k}) × (A${k+1}..A${j}). Cost = ${left} + ${right} + ${dims[i-1]}×${dims[k]}×${dims[j]} = ${cost}` });
      if (cost < minCost) minCost = cost;
    }
    steps.push({ type: 'return', state: [i, j], value: minCost, lineNumber: 11, explanation: `Best split for A${i}..A${j}: cost = ${minCost}` });
    return minCost;
  }
  const result = mcm(1, n);
  return { result, steps };
}

export const code = `int mcm(const std::vector<int>& dims, int i, int j) {
  if (i == j) return 0;
  
  int min_cost = 1e9;
  for (int k = i; k < j; k++) {
    int cost = mcm(dims, i, k)
             + mcm(dims, k+1, j)
             + dims[i-1] * dims[k] * dims[j];
    min_cost = std::min(min_cost, cost);
  }
  return min_cost;
}`;
