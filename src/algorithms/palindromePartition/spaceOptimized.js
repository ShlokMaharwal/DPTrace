export function run({ s }) {
  const n = s.length;
  const steps = [];
  const dp = new Array(n).fill(Infinity);
  const snapshot = () => dp.map(v => v === Infinity ? null : v);

  for (let center = 0; center < n; center++) {
    for (let [l, r] of [[center, center], [center, center + 1]]) {
      while (l >= 0 && r < n && s[l] === s[r]) {
        const cuts = l === 0 ? 0 : dp[l - 1] + 1;
        if (cuts < dp[r]) {
          dp[r] = cuts;
          steps.push({
            type: 'cell_fill',
            state: [r],
            value: dp[r],
            lineNumber: 7,
            explanation: `Palindrome s[${l}..${r}]="${s.slice(l, r + 1)}" → dp[${r}] = ${dp[r]}`,
            tableSnapshot: snapshot(),
          });
        }
        l--;
        r++;
      }
    }
  }

  return { result: dp[n - 1], steps };
}

export const code = `int minCutsOpt(const string& s) {
  int n = s.size();
  vector<int> dp(n, INT_MAX);

  for (int c = 0; c < n; c++) {
    for (auto [l, r] : vector<pair<int,int>>{{c,c},{c,c+1}}) {
      while (l>=0 && r<n && s[l]==s[r]) {
        dp[r] = min(dp[r], l==0 ? 0 : dp[l-1]+1);
        l--; r++;
      }
    }
  }
  return dp[n-1];
}`;

export const lineMap = { cell_fill: 7 };
