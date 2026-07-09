


export function run({ n }) {
  const steps = [];

  if (n <= 1) {
    steps.push({
      type: 'base_case',
      state: [n],
      value: n,
      lineNumber: 1,
      explanation: `n=${n} is a base case. Result is ${n}.`,
      vars: { prev2: null, prev1: null, curr: n },
    });
    return { result: n, steps };
  }

  let prev2 = 0; 
  let prev1 = 1; 

  steps.push({
    type: 'update',
    state: [0],
    value: 0,
    lineNumber: 3,
    explanation: `prev2 = 0 (fib(0)). This is our "two steps back" variable.`,
    vars: { prev2: 0, prev1: null, curr: null },
  });

  steps.push({
    type: 'update',
    state: [1],
    value: 1,
    lineNumber: 4,
    explanation: `prev1 = 1 (fib(1)). This is our "one step back" variable.`,
    vars: { prev2: 0, prev1: 1, curr: null },
  });

  let curr = 0;
  for (let i = 2; i <= n; i++) {
    curr = prev1 + prev2;
    steps.push({
      type: 'update',
      state: [i],
      value: curr,
      lineNumber: 7,
      explanation: `i=${i}: curr = prev1 + prev2 = ${prev1} + ${prev2} = ${curr}. Slide the window forward.`,
      vars: { prev2, prev1, curr },
    });
    prev2 = prev1;
    prev1 = curr;
  }

  return { result: curr, steps };
}

export const code = `int fib(int n) {
  if (n <= 1) return n;
  int prev2 = 0, prev1 = 1;
  int curr;
  
  for (int i = 2; i <= n; i++) {
    curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return curr;
}`;

export const lineMap = { base_case: 2, update: 6 };
