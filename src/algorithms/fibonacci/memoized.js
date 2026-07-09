


export function run({ n }) {
  const steps = [];
  const memo = {};

  function fib(k) {
    steps.push({
      type: 'call',
      state: [k],
      value: null,
      lineNumber: 3,
      explanation: `fib(${k}) called. Checking memo table first...`,
    });

    if (memo[k] !== undefined) {
      steps.push({
        type: 'cache_hit',
        state: [k],
        value: memo[k],
        lineNumber: 5,
        explanation: `Cache hit! fib(${k}) = ${memo[k]} already computed. Returning instantly — no recursion needed.`,
      });
      return memo[k];
    }

    if (k <= 1) {
      memo[k] = k;
      steps.push({
        type: 'base_case',
        state: [k],
        value: k,
        lineNumber: 8,
        explanation: `Base case: fib(${k}) = ${k}. Storing in memo.`,
      });
      return k;
    }

    const left = fib(k - 1);
    const right = fib(k - 2);
    memo[k] = left + right;

    steps.push({
      type: 'return',
      state: [k],
      value: memo[k],
      lineNumber: 14,
      explanation: `fib(${k}) = ${left} + ${right} = ${memo[k]}. Stored in memo for future reuse.`,
    });

    return memo[k];
  }

  const result = fib(n);
  return { result, steps };
}

export const code = `std::unordered_map<int, int> memo;

int fib(int n) {
  if (memo.count(n)) {
    return memo[n];
  }
  if (n <= 1) {
    return n;
  }
  int result = fib(n - 1) + fib(n - 2);
  memo[n] = result;
  return result;
}`;

export const lineMap = { call: 1, cache_hit: 3, base_case: 5, return: 9 };
