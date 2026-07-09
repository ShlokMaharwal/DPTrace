
export function run({ s1, s2 }) {
  const steps = [];
  const m = s1.length, n = s2.length;
  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);

  steps.push({ type: 'update', state: [0, 0], value: 0, lineNumber: 2, explanation: `Using 2 rolling rows instead of full (m+1)×(n+1) table. Previous row starts all zeros.`, tableSnapshot: [prev, curr] });

  for (let i = 1; i <= m; i++) {
    curr = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
      steps.push({
        type: 'update', state: [i, j], value: curr[j], lineNumber: 9,
        explanation: `Row ${i}, col ${j}: s1[${i-1}]="${s1[i-1]}" vs s2[${j-1}]="${s2[j-1]}" → ${s1[i-1]===s2[j-1]?'match! '+curr[j]:'no match, max='+curr[j]}`,
        tableSnapshot: [[...prev], [...curr]], match: s1[i-1]===s2[j-1],
      });
    }
    prev = [...curr];
    steps.push({ type: 'compare', state: [i, 0], value: null, lineNumber: 13, explanation: `Row ${i} complete. Rolling: prev ← curr.`, tableSnapshot: [[...prev], [...curr]] });
  }
  return { result: curr[n], steps };
}

export const code = `int lcs(const std::string& s1, const std::string& s2) {
  int m = s1.size(), n = s2.size();
  std::vector<int> prev(n + 1, 0);
  
  for (int i = 1; i <= m; i++) {
    std::vector<int> curr(n + 1, 0);
    for (int j = 1; j <= n; j++) {
      if (s1[i-1] == s2[j-1]) {
        curr[j] = prev[j-1] + 1;
      } else {
        curr[j] = std::max(prev[j], curr[j-1]);
      }
    }
    prev = curr;
  }
  return prev[n];
}`;
