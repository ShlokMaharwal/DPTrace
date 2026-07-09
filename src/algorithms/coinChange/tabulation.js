
export function run({ coins, amount }) {
  const steps = [];
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  steps.push({ type: 'cell_fill', state: [0], value: 0, lineNumber: 2, explanation: `dp[0] = 0. Base case: 0 coins needed for amount 0.`, tableSnapshot: dp.map(v => v === Infinity ? null : v) });

  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a && dp[a - coin] !== Infinity) {
        const candidate = dp[a - coin] + 1;
        if (candidate < dp[a]) {
          dp[a] = candidate;
          steps.push({
            type: 'cell_fill', state: [a], value: dp[a], lineNumber: 7,
            explanation: `dp[${a}] = dp[${a}-${coin}] + 1 = ${dp[a-coin]} + 1 = ${dp[a]}. Using coin ${coin}.`,
            tableSnapshot: dp.map(v => v === Infinity ? null : v), coin,
          });
        }
      }
    }
    if (dp[a] === Infinity) {
      steps.push({ type: 'cell_fill', state: [a], value: null, lineNumber: 8, explanation: `dp[${a}] = ∞. Amount ${a} is not achievable with given coins.`, tableSnapshot: dp.map(v => v === Infinity ? null : v) });
    }
  }
  return { result: dp[amount] === Infinity ? -1 : dp[amount], steps };
}

export const code = `int coinChange(const std::vector<int>& coins, int amount) {
  std::vector<int> dp(amount + 1, 1e9);
  dp[0] = 0;
  
  for (int a = 1; a <= amount; a++) {
    for (int coin : coins) {
      if (coin <= a && dp[a - coin] != 1e9) {
        dp[a] = std::min(dp[a], dp[a - coin] + 1);
      }
    }
  }
  return dp[amount] == 1e9 ? -1 : dp[amount];
}`;
