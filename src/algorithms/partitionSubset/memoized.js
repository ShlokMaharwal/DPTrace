
export function run({ arr }) {
  const steps = [];
  const total = arr.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) { steps.push({ type: 'base_case', state: [0,0], value: false, lineNumber: 1, explanation: `Sum ${total} is odd. Impossible.` }); return { result: false, steps }; }
  const target = total / 2;
  const memo = {};
  function can(i, rem) {
    const key = `${i},${rem}`;
    steps.push({ type: 'call', state: [i, rem], value: null, lineNumber: 4, explanation: `can(${i}, ${rem}): checking cache...` });
    if (memo[key] !== undefined) { steps.push({ type: 'cache_hit', state: [i, rem], value: memo[key], lineNumber: 5, explanation: `Cache hit! can(${i},${rem}) = ${memo[key]}.` }); return memo[key]; }
    if (rem === 0) { memo[key] = true; steps.push({ type: 'base_case', state: [i, rem], value: true, lineNumber: 6, explanation: `Found valid partition subset!` }); return true; }
    if (i === arr.length || rem < 0) { memo[key] = false; return false; }
    const val = can(i + 1, rem) || can(i + 1, rem - arr[i]);
    memo[key] = val;
    steps.push({ type: 'return', state: [i, rem], value: val, lineNumber: 10, explanation: `can(${i},${rem}) = ${val}. Cached.` });
    return val;
  }
  const result = can(0, target);
  return { result, steps };
}

export const code = `bool canPartition(const std::vector<int>& arr, int i, int rem) {
  
  if (memo.count({i, rem})) return memo[{i, rem}];
  if (rem == 0) return memo[{i, rem}] = true;
  if (i == arr.size() || rem < 0) return false;
  
  return memo[{i, rem}] = canPartition(arr, i+1, rem) 
                       || canPartition(arr, i+1, rem - arr[i]);
}`;
