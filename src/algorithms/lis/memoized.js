
export function run({ arr }) {
  const steps = [];
  const n = arr.length;
  const memo = {};
  function lis(i, prev) {
    const key = `${i},${prev}`;
    steps.push({ type: 'call', state: [i], value: null, lineNumber: 2, explanation: `lis(${i}, prev=${prev}): LIS starting at index ${i}...` });
    if (i === n) return 0;
    if (memo[key] !== undefined) { steps.push({ type: 'cache_hit', state: [i], value: memo[key], lineNumber: 4, explanation: `Cache hit! lis(${i}, ${prev}) = ${memo[key]}.` }); return memo[key]; }
    const skip = lis(i + 1, prev);
    let take = 0;
    if (arr[i] > prev) take = 1 + lis(i + 1, arr[i]);
    memo[key] = Math.max(skip, take);
    steps.push({ type: 'return', state: [i], value: memo[key], lineNumber: 9, explanation: `lis(${i}, ${prev}) = ${memo[key]}. Cached.` });
    return memo[key];
  }
  const result = lis(0, -Infinity);
  return { result, steps };
}

export const code = `int lis(const std::vector<int>& arr, int i, int prev) {
  
  if (i == arr.size()) return 0;
  if (memo.count({i, prev})) return memo[{i, prev}];
  
  int skip = lis(arr, i+1, prev);
  int take = 0;
  if (arr[i] > prev) take = 1 + lis(arr, i+1, arr[i]);
  return memo[{i, prev}] = std::max(skip, take);
}`;
