
const STEP_CAP = 4900;
export function run({ arr }) {
  const steps = [];
  const n = arr.length;
  function lis(i, prev) {
    if (steps.length >= STEP_CAP) return 0;
    steps.push({ type: 'call', state: [i, prev === -Infinity ? -1 : prev], value: null, lineNumber: 2, explanation: `lis(i=${i}, prevVal=${prev === -Infinity ? '-∞' : prev}): can we include arr[${i}]=${arr[i]}?` });
    if (i === n) { steps.push({ type: 'base_case', state: [i, prev], value: 0, lineNumber: 3, explanation: `Past end of array. Sequence length = 0.` }); return 0; }
    const skip = lis(i + 1, prev);
    let take = 0;
    if (arr[i] > prev) {
      take = 1 + lis(i + 1, arr[i]);
      steps.push({ type: 'compare', state: [i], value: take, lineNumber: 7, explanation: `arr[${i}]=${arr[i]} > prev=${prev}. Can extend! take=${take}, skip=${skip}.` });
    } else {
      steps.push({ type: 'compare', state: [i], value: skip, lineNumber: 8, explanation: `arr[${i}]=${arr[i]} ≤ prev=${prev}. Cannot include. skip=${skip}.` });
    }
    const val = Math.max(skip, take);
    steps.push({ type: 'return', state: [i], value: val, lineNumber: 10, explanation: `lis(${i}, ${prev === -Infinity ? '-∞' : prev}) = max(${skip}, ${take}) = ${val}` });
    return val;
  }
  const result = lis(0, -Infinity);
  return { result, steps };
}

export const code = `int lis(const std::vector<int>& arr, int i, int prev) {
  if (i == arr.size()) return 0;
  
  int skip = lis(arr, i+1, prev);
  int take = 0;
  if (arr[i] > prev) {
    take = 1 + lis(arr, i+1, arr[i]);
  }
  return std::max(skip, take);
}`;
