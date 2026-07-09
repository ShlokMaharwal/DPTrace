
export function run({ weights, values, capacity }) {
  const steps = [];
  const n = weights.length;
  const memo = {};

  function knapsack(i, w) {
    const key = `${i},${w}`;
    steps.push({ type: 'call', state: [i, w], value: null, lineNumber: 3, explanation: `knapsack(${i}, ${w}): checking cache...` });
    if (memo[key] !== undefined) {
      steps.push({ type: 'cache_hit', state: [i, w], value: memo[key], lineNumber: 4, explanation: `Cache hit at (${i}, ${w}) = ${memo[key]}. Skip recomputation.` });
      return memo[key];
    }
    if (i === 0 || w === 0) {
      memo[key] = 0;
      steps.push({ type: 'base_case', state: [i, w], value: 0, lineNumber: 6, explanation: `Base case (${i}, ${w}) = 0.` });
      return 0;
    }
    let result;
    if (weights[i - 1] > w) {
      result = knapsack(i - 1, w);
    } else {
      const skip = knapsack(i - 1, w);
      const take = values[i - 1] + knapsack(i - 1, w - weights[i - 1]);
      result = Math.max(skip, take);
    }
    memo[key] = result;
    steps.push({ type: 'return', state: [i, w], value: result, lineNumber: 14, explanation: `Computed knapsack(${i}, ${w}) = ${result}. Stored in memo.` });
    return result;
  }

  const result = knapsack(n, capacity);
  return { result, steps };
}

export const code = `int knapsack(int i, int w, const std::vector<int>& wt, const std::vector<int>& val) {
  if (memo[i][w] != -1) return memo[i][w];
  if (i == 0 || w == 0) return memo[i][w] = 0;
  
  if (wt[i-1] > w) {
    return memo[i][w] = knapsack(i-1, w, wt, val);
  }
  int skip = knapsack(i-1, w, wt, val);
  int take = val[i-1] + knapsack(i-1, w - wt[i-1], wt, val);
  return memo[i][w] = std::max(skip, take);
}`;
