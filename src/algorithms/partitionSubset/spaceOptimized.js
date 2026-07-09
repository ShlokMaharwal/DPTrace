
export function run({ arr }) {
  const steps = [];
  const total = arr.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) { steps.push({ type: 'base_case', state: [0,0], value: false, lineNumber: 1, explanation: `Sum ${total} is odd. Cannot partition equally.` }); return { result: false, steps }; }
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  steps.push({ type: 'update', state: [0], value: true, lineNumber: 4, explanation: `dp[0] = true. We can always make sum 0 (empty subset).`, tableSnapshot: [...dp] });

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    for (let s = target; s >= num; s--) {
      const prev = dp[s];
      dp[s] = dp[s] || dp[s - num];
      if (dp[s] !== prev) {
        steps.push({
          type: 'update', state: [s], value: dp[s], lineNumber: 9,
          explanation: `Adding ${num}: dp[${s}] was ${prev} → now ${dp[s]}. dp[${s-num}] was true, so sum ${s} is now reachable!`,
          tableSnapshot: [...dp], item: num,
        });
      }
    }
    steps.push({ type: 'compare', state: [i], value: dp[target], lineNumber: 11, explanation: `After item ${num}: dp[${target}] = ${dp[target]}. ${dp[target] ? '✓ Target reachable!' : 'Not yet...'}`, tableSnapshot: [...dp] });
  }
  return { result: dp[target], steps };
}

export const code = `bool canPartition(const std::vector<int>& arr) {
  int total = std::accumulate(arr.begin(), arr.end(), 0);
  if (total % 2 != 0) return false;
  int target = total / 2;
  
  std::vector<bool> dp(target + 1, false);
  dp[0] = true;
  
  for (int num : arr) {
    
    for (int s = target; s >= num; s--) {
      dp[s] = dp[s] || dp[s - num];
    }
  }
  return dp[target];
}`;
