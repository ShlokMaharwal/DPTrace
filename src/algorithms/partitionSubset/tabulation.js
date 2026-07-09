
export function run({ arr }) {
  const steps = [];
  const total = arr.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) { steps.push({ type: 'base_case', state: [0,0], value: false, lineNumber: 1, explanation: `Sum ${total} is odd. Impossible.` }); return { result: false, steps }; }
  const target = total / 2;
  const n = arr.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(false));
  for (let i = 0; i <= n; i++) dp[i][0] = true;

  steps.push({ type: 'cell_fill', state: [0, 0], value: true, lineNumber: 4, explanation: `dp[i][0] = true for all i: sum of 0 is always achievable (empty subset).`, tableSnapshot: dp.map(r=>[...r]) });

  for (let i = 1; i <= n; i++) {
    for (let s = 1; s <= target; s++) {
      dp[i][s] = dp[i - 1][s];
      if (arr[i - 1] <= s) dp[i][s] = dp[i][s] || dp[i - 1][s - arr[i - 1]];
      steps.push({
        type: 'cell_fill', state: [i, s], value: dp[i][s], lineNumber: 9,
        explanation: `Item ${i} (val=${arr[i-1]}): can we make sum ${s}? Skip → ${dp[i-1][s]}${arr[i-1]<=s ? `, Take → ${dp[i-1][s-arr[i-1]]}` : ' (can\'t take, too large)'}. dp[${i}][${s}] = ${dp[i][s]}`,
        tableSnapshot: dp.map(r=>[...r]),
      });
    }
  }
  return { result: dp[n][target], steps };
}

export const code = `bool canPartition(const std::vector<int>& arr) {
  int total = std::accumulate(arr.begin(), arr.end(), 0);
  if (total % 2 != 0) return false;
  int target = total / 2;
  int n = arr.size();
  std::vector<std::vector<bool>> dp(n + 1, std::vector<bool>(target + 1, false));
  for (int i = 0; i <= n; i++) dp[i][0] = true;
  
  for (int i = 1; i <= n; i++) {
    for (int s = 1; s <= target; s++) {
      dp[i][s] = dp[i-1][s]; 
      if (arr[i-1] <= s)
        dp[i][s] = dp[i][s] || dp[i-1][s - arr[i-1]]; 
    }
  }
  return dp[n][target];
}`;
