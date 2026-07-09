function buildPalinTable(s) {
  const n = s.length;
  const p = Array.from({ length: n }, () => new Array(n).fill(false));
  for (let i = 0; i < n; i++) p[i][i] = true;
  for (let i = 0; i < n - 1; i++) p[i][i + 1] = s[i] === s[i + 1];
  for (let len = 3; len <= n; len++)
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      p[i][j] = s[i] === s[j] && p[i + 1][j - 1];
    }
  return p;
}

export function run({ s }) {
  const n = s.length;
  const steps = [];
  const isPalin = buildPalinTable(s);
  const dp = new Array(n).fill(Infinity);

  const snapshot = () => dp.map(v => v === Infinity ? null : v);

  for (let i = 0; i < n; i++) {
    if (isPalin[0][i]) {
      dp[i] = 0;
      steps.push({
        type: 'base_case',
        state: [i],
        value: 0,
        lineNumber: 4,
        explanation: `s[0..${i}]="${s.slice(0, i + 1)}" is a palindrome — dp[${i}]=0`,
        tableSnapshot: snapshot(),
      });
      continue;
    }
    for (let j = 1; j <= i; j++) {
      if (isPalin[j][i]) {
        const cuts = dp[j - 1] + 1;
        if (cuts < dp[i]) {
          dp[i] = cuts;
          steps.push({
            type: 'cell_fill',
            state: [i],
            value: dp[i],
            lineNumber: 9,
            explanation: `dp[${i}] = min(dp[${i}], dp[${j - 1}]+1) = ${dp[i]}  [s[${j}..${i}]="${s.slice(j, i + 1)}" is palindrome]`,
            tableSnapshot: snapshot(),
          });
        }
      }
    }
  }

  return { result: dp[n - 1], steps };
}

export const code = `int minCutsTab(const string& s) {
  int n = s.size();
  vector<vector<bool>> p(n, vector<bool>(n, false));
  for (int i=0;i<n;i++) p[i][i]=true;
  for (int i=0;i<n-1;i++) p[i][i+1]=(s[i]==s[i+1]);
  for (int l=3;l<=n;l++)
    for (int i=0;i<=n-l;i++){int j=i+l-1;p[i][j]=s[i]==s[j]&&p[i+1][j-1];}

  vector<int> dp(n, INT_MAX);
  for (int i=0;i<n;i++){
    if (p[0][i]){dp[i]=0;continue;}
    for (int j=1;j<=i;j++)
      if (p[j][i]) dp[i]=min(dp[i],1+dp[j-1]);
  }
  return dp[n-1];
}`;

export const lineMap = { base_case: 4, cell_fill: 9 };
