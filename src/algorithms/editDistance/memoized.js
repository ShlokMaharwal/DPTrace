
export function run({ s1, s2 }) {
  const steps = [];
  const memo = {};
  function edit(i, j) {
    const key = `${i},${j}`;
    steps.push({ type: 'call', state: [i, j], value: null, lineNumber: 3, explanation: `edit(${i},${j}): checking cache...` });
    if (memo[key] !== undefined) { steps.push({ type: 'cache_hit', state: [i, j], value: memo[key], lineNumber: 4, explanation: `Cache hit! edit(${i},${j}) = ${memo[key]}.` }); return memo[key]; }
    if (i === 0) { memo[key] = j; steps.push({ type: 'base_case', state: [i, j], value: j, lineNumber: 5, explanation: `Base: need ${j} insertions.` }); return j; }
    if (j === 0) { memo[key] = i; steps.push({ type: 'base_case', state: [i, j], value: i, lineNumber: 6, explanation: `Base: need ${i} deletions.` }); return i; }
    let val;
    if (s1[i-1] === s2[j-1]) { val = edit(i-1, j-1); }
    else { val = 1 + Math.min(edit(i, j-1), edit(i-1, j), edit(i-1, j-1)); }
    memo[key] = val;
    steps.push({ type: 'return', state: [i, j], value: val, lineNumber: 12, explanation: `edit(${i},${j}) = ${val}. Cached.` });
    return val;
  }
  const result = edit(s1.length, s2.length);
  return { result, steps };
}

export const code = `int editDist(const std::string& s1, const std::string& s2, int i, int j) {
  if (memo[i][j] != -1) return memo[i][j];
  if (i == 0) return memo[i][j] = j;
  if (j == 0) return memo[i][j] = i;
  
  if (s1[i-1] == s2[j-1]) {
    return memo[i][j] = editDist(s1, s2, i-1, j-1);
  }
  return memo[i][j] = 1 + std::min({
    editDist(s1, s2, i, j-1),
    editDist(s1, s2, i-1, j),
    editDist(s1, s2, i-1, j-1)
  });
}`;
