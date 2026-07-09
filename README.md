# DPTrace

**Live Demo:** [DPTrace]()

> An interactive, beautifully crafted visualizer for Dynamic Programming algorithms. Trace, compare, quiz, and build your own recurrences — all in the browser.

DPTrace helps you intuitively understand dynamic programming by visually tracing the execution of classic algorithms. It breaks down each problem into four distinct approaches, showing you exactly how the call stack evolves, how the DP table is populated, and how space optimization works in practice.

## Features

### 11 DP Problems — 4 Approaches Each
Covers a range of DP "shapes", from simple 1D sequences to rare bitmask and interval DP:

| # | Problem | Type |
|---|---------|------|
| 01 | Fibonacci Sequence | 1D DP |
| 02 | 0/1 Knapsack | 2D DP |
| 03 | Coin Change | 1D DP |
| 04 | Longest Common Subsequence (LCS) | 2D DP |
| 05 | Edit Distance | 2D DP |
| 06 | Longest Increasing Subsequence (LIS) | 1D DP |
| 07 | Matrix Chain Multiplication (MCM) | Interval DP |
| 08 | Partition Equal Subset Sum | Subset DP |
| 09 | Egg Drop Problem | 2D DP |
| 10 | Palindrome Partitioning | 1D DP |
| 11 | TSP — Bitmask DP | Bitmask DP |

Each problem includes: **Brute Force → Memoized → Tabulation → Space Optimized**.

---

### Visualizer
- **Recursion Trees**: Animated call graphs showing overlapping subproblems and cache hits.
- **1D & 2D DP Tables**: Cells animate as they fill, with active cell highlighting.
- **Step-by-Step Playback**: Scrub through each step. See function calls, cache hits, base cases, and cell fills.
- **Live C++ Code Panel**: The actual C++ implementation synced to the current step — the active line highlights as you step through.
- **Complexity Stats**: Live runtime stats — calls made, cache hits, cells filled, time & space complexity.

### Compare Mode
Side-by-side comparison of any two approaches (e.g., Brute Force vs. Tabulation) on the same input. A shared playback bar drives both panels in sync.

### Quiz Mode
A dedicated testing platform with **55 hand-crafted questions** — 5 per algorithm. Select a problem, answer the questions, and submit for instant grading with detailed explanations.

### Tools
- **Problem Classifier**: Paste a natural language problem statement. Keyword matching automatically identifies the DP pattern and loads the right algorithm.
- **Recurrence Parser**: Type any 1D recurrence relation (e.g., `dp[i] = dp[i-1] + dp[i-2]`) with base cases and hit Run. The parser evaluates it and renders the result table instantly.

---

## Tech Stack

| Layer | Tech |
| :--- | :--- |
| Framework | React |
| State Management | Zustand |
| Tooling | Vite |
| Styling | Vanilla CSS |
| Icons | Lucide React |

## License

Made by Shlok &copy; 2026. All rights reserved.
