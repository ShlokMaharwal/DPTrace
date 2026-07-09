
const STEP_CAP = 4900;
export function run({ arr }) {
  const steps = [];
  const total = arr.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) {
    steps.push({ type: 'base_case', state: [0, 0], value: false, lineNumber: 1, explanation: `Total sum = ${total} is odd. Cannot partition into two equal subsets.` });
    return { result: false, steps };
  }
  const target = total / 2;

  function canPartition(i, rem) {
    if (steps.length >= STEP_CAP) return false;
    steps.push({ type: 'call', state: [i, rem], value: null, lineNumber: 5, explanation: `canPartition(i=${i}, rem=${rem}): can we reach sum ${rem} using elements from index ${i} onwards?` });
    if (rem === 0) { steps.push({ type: 'base_case', state: [i, rem], value: true, lineNumber: 6, explanation: `Remaining sum = 0! Found a valid partition!` }); return true; }
    if (i === arr.length || rem < 0) { steps.push({ type: 'base_case', state: [i, rem], value: false, lineNumber: 7, explanation: `${rem < 0 ? 'Went negative' : 'Ran out of elements'}. Dead end.` }); return false; }
    const skip = canPartition(i + 1, rem);
    if (skip) return true;
    const take = canPartition(i + 1, rem - arr[i]);
    const val = skip || take;
    steps.push({ type: 'return', state: [i, rem], value: val, lineNumber: 11, explanation: `arr[${i}]=${arr[i]}: skip=${skip}, take=${take}. Result=${val}` });
    return val;
  }

  const result = canPartition(0, target);
  return { result, steps };
}

export const code = `bool canPartition(const std::vector<int>& arr, int i, int rem) {
  if (rem == 0) return true;
  if (i == arr.size() || rem < 0) return false;
  
  
  return canPartition(arr, i+1, rem) 
      || canPartition(arr, i+1, rem - arr[i]);
}`;
