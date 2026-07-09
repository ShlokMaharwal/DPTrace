
const STEP_CAP = 4900;
export function run({ s1, s2 }) {
  const steps = [];
  function edit(i, j) {
    if (steps.length >= STEP_CAP) return 0;
    steps.push({ type: 'call', state: [i, j], value: null, lineNumber: 2, explanation: `edit(${i},${j}): distance to transform s1[0..${i-1}] into s2[0..${j-1}]` });
    if (i === 0) { steps.push({ type: 'base_case', state: [i, j], value: j, lineNumber: 3, explanation: `s1 exhausted. Need ${j} insertions to build remaining s2.` }); return j; }
    if (j === 0) { steps.push({ type: 'base_case', state: [i, j], value: i, lineNumber: 4, explanation: `s2 exhausted. Need ${i} deletions to empty s1.` }); return i; }
    if (s1[i - 1] === s2[j - 1]) {
      const val = edit(i - 1, j - 1);
      steps.push({ type: 'return', state: [i, j], value: val, lineNumber: 7, explanation: `s1[${i-1}]="${s1[i-1]}" == s2[${j-1}]="${s2[j-1]}". No operation needed. edit(${i},${j}) = edit(${i-1},${j-1}) = ${val}` });
      return val;
    }
    const ins = edit(i, j - 1);
    const del = edit(i - 1, j);
    const rep = edit(i - 1, j - 1);
    const val = 1 + Math.min(ins, del, rep);
    steps.push({ type: 'return', state: [i, j], value: val, lineNumber: 11, explanation: `Mismatch. insert=${ins+1}, delete=${del+1}, replace=${rep+1}. Best=${val}` });
    return val;
  }
  const result = edit(s1.length, s2.length);
  return { result, steps };
}

export const code = `int editDist(const std::string& s1, const std::string& s2, int i, int j) {
  if (i == 0) return j; 
  if (j == 0) return i; 
  
  if (s1[i-1] == s2[j-1]) {
    return editDist(s1, s2, i-1, j-1);
  }
  return 1 + std::min({
    editDist(s1, s2, i, j-1),   
    editDist(s1, s2, i-1, j),   
    editDist(s1, s2, i-1, j-1)  
  });
}`;
