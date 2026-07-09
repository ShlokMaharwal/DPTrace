
export function run({ weights, values, capacity }) {
  const steps = [];
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  for (let i = 0; i <= n; i++) dp[i][0] = 0;
  for (let w = 0; w <= capacity; w++) dp[0][w] = 0;

  steps.push({ type: 'cell_fill', state: [0, 0], value: 0, lineNumber: 3, explanation: `Initialize: row 0 (no items) and column 0 (capacity=0) are all 0.`, tableSnapshot: dp.map(r => [...r]) });

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] > w) {
        dp[i][w] = dp[i - 1][w];
        steps.push({
          type: 'cell_fill', state: [i, w], value: dp[i][w], lineNumber: 8,
          explanation: `Item ${i} (weight=${weights[i-1]}) > capacity ${w}: can't include. dp[${i}][${w}] = dp[${i-1}][${w}] = ${dp[i][w]}`,
          tableSnapshot: dp.map(r => [...r]), choice: 'skip',
        });
      } else {
        const skip = dp[i - 1][w];
        const take = values[i - 1] + dp[i - 1][w - weights[i - 1]];
        dp[i][w] = Math.max(skip, take);
        steps.push({
          type: 'cell_fill', state: [i, w], value: dp[i][w], lineNumber: 11,
          explanation: `Item ${i} (w=${weights[i-1]}, v=${values[i-1]}): skip=${skip}, take=${take}. Max=${dp[i][w]}`,
          tableSnapshot: dp.map(r => [...r]), choice: take > skip ? 'take' : 'skip',
          deps: [[i-1, w], [i-1, w-weights[i-1]]],
        });
      }
    }
  }

  return { result: dp[n][capacity], steps };
}

export const code = `int knapsack(const std::vector<int>& wt, const std::vector<int>& val, int capacity) {
  int n = wt.size();
  std::vector<std::vector<int>> dp(n + 1, std::vector<int>(capacity + 1, 0));
  
  for (int i = 1; i <= n; i++) {
    for (int w = 0; w <= capacity; w++) {
      if (wt[i-1] > w) {
        dp[i][w] = dp[i-1][w]; 
      } else {
        int skip = dp[i-1][w];
        int take = val[i-1] + dp[i-1][w - wt[i-1]];
        dp[i][w] = std::max(skip, take);
      }
    }
  }
  return dp[n][capacity];
}`;
