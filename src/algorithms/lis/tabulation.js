
export function run({ arr }) {
  const steps = [];
  const n = arr.length;
  const dp = new Array(n).fill(1);

  for (let i = 0; i < n; i++) {
    steps.push({ type: 'cell_fill', state: [i], value: 1, lineNumber: 2, explanation: `dp[${i}] = 1. Every element is an LIS of length 1 on its own.`, tableSnapshot: [...dp], arr });
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      steps.push({ type: 'compare', state: [i, j], value: null, lineNumber: 6, explanation: `Comparing arr[${j}]=${arr[j]} with arr[${i}]=${arr[i]}. ${arr[j] < arr[i] ? 'arr[j] < arr[i] — can extend!' : 'Not increasing — skip.'}`, arr });
      if (arr[j] < arr[i]) {
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          steps.push({ type: 'cell_fill', state: [i], value: dp[i], lineNumber: 8, explanation: `dp[${i}] updated! Extend sequence ending at ${arr[j]} with ${arr[i]}. dp[${i}] = dp[${j}]+1 = ${dp[i]}`, tableSnapshot: [...dp], arr });
        }
      }
    }
  }

  const result = Math.max(...dp);
  return { result, steps };
}

export const code = `int lis(const std::vector<int>& arr) {
  std::vector<int> dp(arr.size(), 1);
  
  for (int i = 1; i < arr.size(); i++) {
    for (int j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        dp[i] = std::max(dp[i], dp[j] + 1);
      }
    }
  }
  return *std::max_element(dp.begin(), dp.end());
}`;
