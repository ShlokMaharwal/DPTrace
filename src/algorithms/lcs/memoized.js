
export function run({ s1, s2 }) {
  const steps = [];
  const memo = {};
  function lcs(i, j) {
    const key = `${i},${j}`;
    steps.push({ type: 'call', state: [i, j], value: null, lineNumber: 3, explanation: `lcs(${i},${j}): checking cache...` });
    if (memo[key] !== undefined) {
      steps.push({ type: 'cache_hit', state: [i, j], value: memo[key], lineNumber: 4, explanation: `Cache hit! lcs(${i},${j}) = ${memo[key]}.` });
      return memo[key];
    }
    if (i === 0 || j === 0) { memo[key] = 0; steps.push({ type: 'base_case', state: [i, j], value: 0, lineNumber: 5, explanation: `Base case: lcs(${i},${j}) = 0.` }); return 0; }
    let val;
    if (s1[i - 1] === s2[j - 1]) { val = 1 + lcs(i - 1, j - 1); }
    else { val = Math.max(lcs(i - 1, j), lcs(i, j - 1)); }
    memo[key] = val;
    steps.push({ type: 'return', state: [i, j], value: val, lineNumber: 11, explanation: `lcs(${i},${j}) = ${val}. Stored in memo.` });
    return val;
  }
  const result = lcs(s1.length, s2.length);
  return { result, steps };
}

export const code = `int lcs(const std::string& s1, const std::string& s2, int i, int j) {
  if (memo[i][j] != -1) return memo[i][j];
  if (i == 0 || j == 0) return memo[i][j] = 0;
  
  if (s1[i-1] == s2[j-1]) {
    return memo[i][j] = 1 + lcs(s1, s2, i-1, j-1);
  }
  return memo[i][j] = std::max(
    lcs(s1, s2, i-1, j),
    lcs(s1, s2, i, j-1)
  );
}`;
