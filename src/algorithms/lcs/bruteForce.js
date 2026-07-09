
const STEP_CAP = 4900;
export function run({ s1, s2 }) {
  const steps = [];
  function lcs(i, j) {
    if (steps.length >= STEP_CAP) return 0;
    steps.push({ type: 'call', state: [i, j], value: null, lineNumber: 2, explanation: `lcs(${i}, ${j}): comparing s1[${i-1}]="${s1[i-1] || '-'}" and s2[${j-1}]="${s2[j-1] || '-'}"` });
    if (i === 0 || j === 0) {
      steps.push({ type: 'base_case', state: [i, j], value: 0, lineNumber: 3, explanation: `Base case: one string exhausted. LCS length = 0.` });
      return 0;
    }
    if (s1[i - 1] === s2[j - 1]) {
      const sub = lcs(i - 1, j - 1);
      const val = 1 + sub;
      steps.push({ type: 'return', state: [i, j], value: val, lineNumber: 6, explanation: `s1[${i-1}]="${s1[i-1]}" == s2[${j-1}]="${s2[j-1]}"! Match! lcs(${i},${j}) = 1 + lcs(${i-1},${j-1}) = ${val}` });
      return val;
    }
    const a = lcs(i - 1, j);
    const b = lcs(i, j - 1);
    const val = Math.max(a, b);
    steps.push({ type: 'return', state: [i, j], value: val, lineNumber: 9, explanation: `No match. lcs(${i},${j}) = max(lcs(${i-1},${j})=${a}, lcs(${i},${j-1})=${b}) = ${val}` });
    return val;
  }
  const result = lcs(s1.length, s2.length);
  return { result, steps };
}

export const code = `int lcs(const std::string& s1, const std::string& s2, int i, int j) {
  if (i == 0 || j == 0) return 0;
  
  if (s1[i-1] == s2[j-1]) {
    return 1 + lcs(s1, s2, i-1, j-1);
  }
  return std::max(
    lcs(s1, s2, i-1, j),
    lcs(s1, s2, i, j-1)
  );
}`;
