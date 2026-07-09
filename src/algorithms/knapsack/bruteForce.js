
const STEP_CAP = 4900;
export function run({ weights, values, capacity }) {
  const steps = [];
  const n = weights.length;

  function knapsack(i, w) {
    if (steps.length >= STEP_CAP) return 0;
    const itemInfo = i > 0 ? `item ${i} (weight=${weights[i-1]}, value=${values[i-1]})` : `no items left`;
    steps.push({ type: 'call', state: [i, w], value: null, lineNumber: 2, explanation: `knapsack(item=${i}, cap=${w}): Considering ${itemInfo}` });
    if (i === 0 || w === 0) {
      steps.push({ type: 'base_case', state: [i, w], value: 0, lineNumber: 4, explanation: `Base case: no items left or no capacity. Value = 0.` });
      return 0;
    }
    if (weights[i - 1] > w) {
      const val = knapsack(i - 1, w);
      steps.push({ type: 'return', state: [i, w], value: val, lineNumber: 7, explanation: `Item ${i} (weight=${weights[i-1]}) exceeds capacity ${w}. Must skip it.` });
      return val;
    }
    const skip = knapsack(i - 1, w);
    const take = values[i - 1] + knapsack(i - 1, w - weights[i - 1]);
    const best = Math.max(skip, take);
    steps.push({ type: 'return', state: [i, w], value: best, lineNumber: 10, explanation: `Item ${i}: skip=${skip}, take=${take}. Best = ${best}.` });
    return best;
  }

  const result = knapsack(n, capacity);
  return { result, steps };
}

export const code = `int knapsack(int i, int w, const std::vector<int>& wt, const std::vector<int>& val) {
  if (i == 0 || w == 0) return 0;
  
  if (wt[i-1] > w) {
    return knapsack(i-1, w, wt, val);
  }
  
  int skip = knapsack(i-1, w, wt, val);
  int take = val[i-1] + knapsack(i-1, w - wt[i-1], wt, val);
  return std::max(skip, take);
}`;
