
export function run({ dims }) {
  const steps = [];
  const n = dims.length - 1;
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

  steps.push({ type: 'cell_fill', state: [1, 1], value: 0, lineNumber: 3, explanation: `Initialize diagonal dp[i][i] = 0 for all i. Single matrices cost nothing to "multiply".`, tableSnapshot: dp.map(r => [...r]) });

  for (let len = 2; len <= n; len++) {
    for (let i = 1; i <= n - len + 1; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
        if (cost < dp[i][j]) {
          dp[i][j] = cost;
          steps.push({
            type: 'cell_fill', state: [i, j], value: cost, lineNumber: 10,
            explanation: `Chain length ${len}: dp[${i}][${j}] via k=${k}. Cost = dp[${i}][${k}](${dp[i][k]}) + dp[${k+1}][${j}](${dp[k+1][j]}) + ${dims[i-1]}×${dims[k]}×${dims[j]} = ${cost}`,
            tableSnapshot: dp.map(r => [...r]), splitK: k,
          });
        }
      }
    }
  }
  return { result: dp[1][n], steps };
}

export const code = `int mcm(const std::vector<int>& dims) {
  int n = dims.size() - 1;
  std::vector<std::vector<int>> dp(n + 1, std::vector<int>(n + 1, 0));
  
  
  for (int len = 2; len <= n; len++) {
    for (int i = 1; i <= n - len + 1; i++) {
      int j = i + len - 1;
      dp[i][j] = 1e9;
      for (int k = i; k < j; k++) {
        int cost = dp[i][k] + dp[k+1][j] + dims[i-1] * dims[k] * dims[j];
        dp[i][j] = std::min(dp[i][j], cost);
      }
    }
  }
  return dp[1][n];
}`;
