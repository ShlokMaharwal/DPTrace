
export function run({ s1, s2 }) {
  const steps = [];
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));

  for (let i = 0; i <= m; i++) steps.push({ type: 'cell_fill', state: [i, 0], value: i, lineNumber: 3, explanation: `dp[${i}][0] = ${i}: delete ${i} characters from s1 to match empty s2.`, tableSnapshot: dp.map(r=>[...r]) });
  for (let j = 1; j <= n; j++) steps.push({ type: 'cell_fill', state: [0, j], value: j, lineNumber: 4, explanation: `dp[0][${j}] = ${j}: insert ${j} characters to build s2 prefix from empty s1.`, tableSnapshot: dp.map(r=>[...r]) });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        steps.push({ type: 'cell_fill', state: [i, j], value: dp[i][j], lineNumber: 8, explanation: `s1[${i-1}]="${s1[i-1]}" == s2[${j-1}]="${s2[j-1]}". No op needed. dp[${i}][${j}] = dp[${i-1}][${j-1}] = ${dp[i][j]}`, tableSnapshot: dp.map(r=>[...r]), match: true });
      } else {
        const ins = dp[i][j - 1], del = dp[i - 1][j], rep = dp[i - 1][j - 1];
        dp[i][j] = 1 + Math.min(ins, del, rep);
        const op = ins < del && ins < rep ? 'insert' : del < rep ? 'delete' : 'replace';
        steps.push({ type: 'cell_fill', state: [i, j], value: dp[i][j], lineNumber: 11, explanation: `Mismatch. Best op: ${op}. ins=${ins+1}, del=${del+1}, rep=${rep+1} → dp[${i}][${j}]=${dp[i][j]}`, tableSnapshot: dp.map(r=>[...r]), match: false, op });
      }
    }
  }
  return { result: dp[m][n], steps };
}

export const code = `int editDist(const std::string& s1, const std::string& s2) {
  int m = s1.size(), n = s2.size();
  std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
  for (int i = 0; i <= m; i++) dp[i][0] = i;
  for (int j = 0; j <= n; j++) dp[0][j] = j;
  
  for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
      if (s1[i-1] == s2[j-1]) {
        dp[i][j] = dp[i-1][j-1];
      } else {
        dp[i][j] = 1 + std::min({
          dp[i][j-1],   
          dp[i-1][j],   
          dp[i-1][j-1]  
        });
      }
    }
  }
  return dp[m][n];
}`;
