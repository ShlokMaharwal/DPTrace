
export function run({ dims }) {
  const steps = [];
  const n = dims.length - 1;
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));
  const split = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

  for (let len = 2; len <= n; len++) {
    for (let i = 1; i <= n - len + 1; i++) {
      const j = i + len - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const cost = dp[i][k] + dp[k + 1][j] + dims[i - 1] * dims[k] * dims[j];
        if (cost < dp[i][j]) {
          dp[i][j] = cost;
          split[i][j] = k;
          steps.push({
            type: 'update', state: [i, j], value: cost, lineNumber: 8,
            explanation: `Best split[${i}][${j}] = k=${k}. Cost=${cost}. Split: (A${i}..A${k}) × (A${k+1}..A${j})`,
            tableSnapshot: dp.map(r => [...r]), splitSnapshot: split.map(r => [...r]),
          });
        }
      }
    }
  }

  
  function parenthesize(i, j) {
    if (i === j) return `A${i}`;
    const k = split[i][j];
    return `(${parenthesize(i, k)} × ${parenthesize(k + 1, j)})`;
  }
  const optimal = parenthesize(1, n);
  steps.push({ type: 'return', state: [1, n], value: dp[1][n], lineNumber: 14, explanation: `Optimal: ${optimal}. Minimum multiplications = ${dp[1][n]}.` });

  return { result: dp[1][n], steps };
}

export const code = `int mcm(const std::vector<int>& dims) {
  int n = dims.size() - 1;
  
  std::vector<std::vector<int>> split(n + 1, std::vector<int>(n + 1, 0));
  
  
  for (int len = 2; len <= n; len++) {
    for (int i = 1; i <= n - len + 1; i++) {
      int j = i + len - 1;
      for (int k = i; k < j; k++) {
        if (cost < dp[i][j]) {
          dp[i][j] = cost;
          split[i][j] = k; 
        }
      }
    }
  }
  
}`;
