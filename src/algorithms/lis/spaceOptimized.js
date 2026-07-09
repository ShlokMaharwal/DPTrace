
export function run({ arr }) {
  const steps = [];
  const tails = []; 

  for (let i = 0; i < arr.length; i++) {
    const x = arr[i];
    let lo = 0, hi = tails.length;

    steps.push({ type: 'compare', state: [i], value: x, lineNumber: 4, explanation: `Processing arr[${i}]=${x}. Binary search in tails=${JSON.stringify(tails)} for insertion position.`, tails: [...tails], arr });

    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      steps.push({ type: 'compare', state: [mid], value: tails[mid], lineNumber: 7, explanation: `Binary search: tails[${mid}]=${tails[mid]} vs ${x}. ${tails[mid] < x ? 'Too small → search right' : 'Too big or equal → search left'}`, tails: [...tails] });
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }

    tails[lo] = x;
    steps.push({ type: 'update', state: [lo], value: x, lineNumber: 11, explanation: `Set tails[${lo}] = ${x}. ${lo === tails.length - 1 ? 'Extended tails! LIS length is now ' + tails.length + '.' : 'Replaced tails[' + lo + ']. Maintains "smallest tail" invariant.'}`, tails: [...tails], arr });
  }

  return { result: tails.length, steps };
}

export const code = `int lis(const std::vector<int>& arr) {
  std::vector<int> tails;
  
  for (int x : arr) {
    int lo = 0, hi = tails.size();
    
    while (lo < hi) {
      int mid = lo + (hi - lo) / 2;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    if (lo == tails.size()) tails.push_back(x);
    else tails[lo] = x;
  }
  return tails.size();
}`;
