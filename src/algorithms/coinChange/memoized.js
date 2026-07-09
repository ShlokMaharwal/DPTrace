
export function run({ coins, amount }) {
  const steps = [];
  const memo = {};
  function coinChange(rem) {
    steps.push({ type: 'call', state: [rem], value: null, lineNumber: 3, explanation: `coinChange(${rem}): checking cache...` });
    if (memo[rem] !== undefined) {
      steps.push({ type: 'cache_hit', state: [rem], value: memo[rem], lineNumber: 4, explanation: `Cache hit! Amount ${rem} already computed = ${memo[rem] === Infinity ? '∞' : memo[rem]}.` });
      return memo[rem];
    }
    if (rem === 0) { memo[rem] = 0; steps.push({ type: 'base_case', state: [rem], value: 0, lineNumber: 5, explanation: `Base case: amount 0 needs 0 coins.` }); return 0; }
    if (rem < 0) { memo[rem] = Infinity; return Infinity; }
    let best = Infinity;
    for (const coin of coins) {
      const sub = coinChange(rem - coin);
      if (sub !== Infinity) best = Math.min(best, 1 + sub);
    }
    memo[rem] = best;
    steps.push({ type: 'return', state: [rem], value: best, lineNumber: 12, explanation: `Computed coinChange(${rem}) = ${best === Infinity ? '∞' : best}. Cached for reuse.` });
    return best;
  }
  const result = coinChange(amount);
  return { result: result === Infinity ? -1 : result, steps };
}

export const code = `std::unordered_map<int, int> memo;

int coinChange(const std::vector<int>& coins, int rem) {
  if (memo.count(rem)) return memo[rem];
  if (rem == 0) return memo[rem] = 0;
  if (rem < 0) return 1e9;
  
  int best = 1e9;
  for (int coin : coins) {
    int sub = coinChange(coins, rem - coin);
    if (sub != 1e9) best = std::min(best, 1 + sub);
  }
  return memo[rem] = best;
}`;
