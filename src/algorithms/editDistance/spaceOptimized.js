
export function run({ s1, s2 }) {
  const steps = [];
  const m = s1.length, n = s2.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  steps.push({ type: 'update', state: [0, 0], value: 0, lineNumber: 2, explanation: `Init: prev row = [0,1,2,...,${n}] (insertions for empty s1 vs s2 prefixes).`, tableSnapshot: [[...prev]] });

  for (let i = 1; i <= m; i++) {
    const curr = new Array(n + 1).fill(0);
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) { curr[j] = prev[j - 1]; }
      else { curr[j] = 1 + Math.min(curr[j - 1], prev[j], prev[j - 1]); }
      steps.push({
        type: 'update', state: [i, j], value: curr[j], lineNumber: 8,
        explanation: `Row ${i} (s1[${i-1}]="${s1[i-1]}"), col ${j} (s2[${j-1}]="${s2[j-1]}"): ${s1[i-1]===s2[j-1]?'match → '+curr[j]:'min('+curr[j-1]+','+prev[j]+','+prev[j-1]+') +1 = '+curr[j]}`,
        tableSnapshot: [[...prev], [...curr]],
      });
    }
    prev = [...curr];
  }
  return { result: prev[n], steps };
}

export const code = `int editDist(const std::string& s1, const std::string& s2) {
  int m = s1.size(), n = s2.size();
  std::vector<int> prev(n + 1, 0);
  for (int j = 0; j <= n; j++) prev[j] = j;
  
  for (int i = 1; i <= m; i++) {
    std::vector<int> curr(n + 1, 0);
    curr[0] = i;
    for (int j = 1; j <= n; j++) {
      if (s1[i-1] == s2[j-1]) {
        curr[j] = prev[j-1];
      } else {
        curr[j] = 1 + std::min({curr[j-1], prev[j], prev[j-1]});
      }
    }
    prev = curr;
  }
  return prev[n];
}`;
