
export function run({ weights, values, capacity }) {
  const steps = [];
  const n = weights.length;
  const dp = new Array(capacity + 1).fill(0);

  steps.push({ type: 'update', state: [0], value: 0, lineNumber: 2, explanation: `Initialize 1D dp array of size ${capacity+1} with zeros.`, tableSnapshot: [...dp] });

  for (let i = 1; i <= n; i++) {
    for (let w = capacity; w >= weights[i - 1]; w--) {
      const prev = dp[w];
      dp[w] = Math.max(dp[w], values[i - 1] + dp[w - weights[i - 1]]);
      steps.push({
        type: 'update', state: [w], value: dp[w], lineNumber: 6,
        explanation: `Item ${i} (w=${weights[i-1]}, v=${values[i-1]}): dp[${w}] = max(${prev}, ${values[i-1]}+dp[${w-weights[i-1]}]=${values[i-1]+dp[w-weights[i-1]]}) = ${dp[w]}`,
        tableSnapshot: [...dp], itemIndex: i,
      });
    }
  }

  return { result: dp[capacity], steps };
}

export const code = `int knapsack(const std::vector<int>& wt, const std::vector<int>& val, int capacity) {
  int n = wt.size();
  std::vector<int> dp(capacity + 1, 0);
  
  for (int i = 1; i <= n; i++) {
    
    for (int w = capacity; w >= wt[i-1]; w--) {
      dp[w] = std::max(dp[w], val[i-1] + dp[w - wt[i-1]]);
    }
  }
  return dp[capacity];
}`;
