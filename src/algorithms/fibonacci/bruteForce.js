

const STEP_CAP = 4900;

export function run({ n }) {
  const steps = [];
  let callCount = 0;

  function fib(k) {
    if (steps.length >= STEP_CAP) return 0;
    callCount++;
    steps.push({
      type: 'call',
      state: [k],
      value: null,
      lineNumber: 5,
      explanation: `fib(${k}) is called. We need to compute it from scratch.`,
      nodeId: `${k}-${callCount}`,
      parentId: null,
      depth: null,
    });

    if (k <= 1) {
      steps.push({
        type: 'base_case',
        state: [k],
        value: k,
        lineNumber: 7,
        explanation: `Base case reached: fib(${k}) = ${k}. This is our stopping point.`,
        nodeId: `${k}-${callCount}`,
      });
      return k;
    }

    const left = fib(k - 1);
    const right = fib(k - 2);
    const result = left + right;

    steps.push({
      type: 'return',
      state: [k],
      value: result,
      lineNumber: 11,
      explanation: `fib(${k}) = fib(${k - 1}) + fib(${k - 2}) = ${left} + ${right} = ${result}`,
      nodeId: `${k}-${callCount}`,
    });

    return result;
  }

  const result = fib(n);
  return { result, steps };
}

export const code = `int fib(int n) {
  
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}`;

export const lineMap = { call: 1, base_case: 3, return: 5 };
