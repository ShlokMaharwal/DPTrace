

export function run({ coins, amount }) {
  const steps = [];
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  steps.push({ type: 'update', state: [0], value: 0, lineNumber: 2, explanation: `dp[0] = 0. Starting point.`, tableSnapshot: dp.map(v => v === Infinity ? null : v) });

  for (const coin of coins) {
    for (let a = coin; a <= amount; a++) {
      if (dp[a - coin] !== Infinity) {
        const prev = dp[a];
        const cand = dp[a - coin] + 1;
        if (cand < dp[a]) {
          dp[a] = cand;
          steps.push({
            type: 'update', state: [a], value: dp[a], lineNumber: 6,
            explanation: `Coin ${coin}: dp[${a}] = min(${prev === Infinity ? '∞' : prev}, dp[${a-coin}]+1=${cand}) = ${dp[a]}`,
            tableSnapshot: dp.map(v => v === Infinity ? null : v), coin,
          });
        }
      }
    }
    steps.push({ type: 'compare', state: [coin], value: null, lineNumber: 8, explanation: `Done processing coin ${coin}. Snapshot above.`, tableSnapshot: dp.map(v => v === Infinity ? null : v), coin });
  }
  return { result: dp[amount] === Infinity ? -1 : dp[amount], steps };
}

export const code = `
int coinChange(const std::vector<int>& coins, int amount) {
  std::vector<int> dp(amount + 1, 1e9);
  dp[0] = 0;
  
  for (int coin : coins) {
    for (int a = coin; a <= amount; a++) {
      if (dp[a - coin] != 1e9) {
        dp[a] = std::min(dp[a], dp[a - coin] + 1);
      }
    }
  }
  return dp[amount] == 1e9 ? -1 : dp[amount];
}`;
