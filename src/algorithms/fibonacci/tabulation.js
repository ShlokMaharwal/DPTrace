


export function run({ n }) {
  const steps = [];

  if (n <= 1) {
    steps.push({
      type: 'base_case',
      state: [n],
      value: n,
      lineNumber: 2,
      explanation: `n=${n} is a base case. Result is ${n}.`,
      tableSnapshot: [n],
    });
    return { result: n, steps };
  }

  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;

  steps.push({
    type: 'cell_fill',
    state: [0],
    value: 0,
    lineNumber: 3,
    explanation: `Initialize dp[0] = 0. Base case: 0th Fibonacci number is 0.`,
    tableSnapshot: [...dp],
  });

  steps.push({
    type: 'cell_fill',
    state: [1],
    value: 1,
    lineNumber: 4,
    explanation: `Initialize dp[1] = 1. Base case: 1st Fibonacci number is 1.`,
    tableSnapshot: [...dp],
  });

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
    steps.push({
      type: 'cell_fill',
      state: [i],
      value: dp[i],
      lineNumber: 7,
      explanation: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
      tableSnapshot: [...dp],
      deps: [i - 1, i - 2],
    });
  }

  return { result: dp[n], steps };
}

export const code = `int fib(int n) {
  std::vector<int> dp(n + 1, 0);
  dp[0] = 0;
  dp[1] = 1;
  
  for (int i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  
  return dp[n];
}`;

export const lineMap = { cell_fill: 7, base_case: 3 };
