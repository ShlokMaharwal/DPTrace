
export function run({ s1, s2 }) {
  const steps = [];
  const m = s1.length, n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  steps.push({ type: 'cell_fill', state: [0, 0], value: 0, lineNumber: 3, explanation: `Initialize: row 0 and column 0 = 0 (empty string has LCS of 0 with anything).`, tableSnapshot: dp.map(r => [...r]) });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        steps.push({
          type: 'cell_fill', state: [i, j], value: dp[i][j], lineNumber: 7,
          explanation: `s1[${i-1}]="${s1[i-1]}" == s2[${j-1}]="${s2[j-1]}"! Match! dp[${i}][${j}] = dp[${i-1}][${j-1}] + 1 = ${dp[i][j]}`,
          tableSnapshot: dp.map(r => [...r]), match: true, chars: [s1[i-1], s2[j-1]],
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        steps.push({
          type: 'cell_fill', state: [i, j], value: dp[i][j], lineNumber: 10,
          explanation: `s1[${i-1}]="${s1[i-1]}" ≠ s2[${j-1}]="${s2[j-1]}". dp[${i}][${j}] = max(${dp[i-1][j]}, ${dp[i][j-1]}) = ${dp[i][j]}`,
          tableSnapshot: dp.map(r => [...r]), match: false,
          deps: [[i-1, j], [i, j-1]],
        });
      }
    }
  }

  return { result: dp[m][n], steps };
}

export const code = `int lcs(const std::string& s1, const std::string& s2) {
  int m = s1.size(), n = s2.size();
  std::vector<std::vector<int>> dp(m + 1, std::vector<int>(n + 1, 0));
  
  for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
      if (s1[i-1] == s2[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = std::max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }
  return dp[m][n];
}`;
