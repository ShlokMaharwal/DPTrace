
const STEP_CAP = 4900;
export function run({ coins, amount }) {
  const steps = [];
  function coinChange(rem) {
    if (steps.length >= STEP_CAP) return Infinity;
    steps.push({ type: 'call', state: [rem], value: null, lineNumber: 2, explanation: `coinChange(${rem}): How many coins do we need for amount ${rem}?` });
    if (rem === 0) {
      steps.push({ type: 'base_case', state: [rem], value: 0, lineNumber: 3, explanation: `Amount is 0 — no coins needed. Return 0.` });
      return 0;
    }
    if (rem < 0) {
      steps.push({ type: 'base_case', state: [rem], value: Infinity, lineNumber: 4, explanation: `Went negative — invalid. Return Infinity.` });
      return Infinity;
    }
    let best = Infinity;
    for (const coin of coins) {
      const sub = coinChange(rem - coin);
      if (sub !== Infinity) best = Math.min(best, 1 + sub);
    }
    steps.push({ type: 'return', state: [rem], value: best, lineNumber: 9, explanation: `Best for amount ${rem} = ${best === Infinity ? '∞ (impossible)' : best} coins.` });
    return best;
  }
  const result = coinChange(amount);
  return { result: result === Infinity ? -1 : result, steps };
}

export const code = `int coinChange(const std::vector<int>& coins, int rem) {
  if (rem == 0) return 0;
  if (rem < 0) return 1e9;
  
  int best = 1e9;
  for (int coin : coins) {
    int sub = coinChange(coins, rem - coin);
    if (sub != 1e9) best = std::min(best, 1 + sub);
  }
  return best;
}`;
