# DPTrace

**Live Demo:** [DPTrace]()

> An interactive, beautifully crafted visualizer for Dynamic Programming algorithms. Trace, compare, quiz, and build your own recurrences — all in the browser.

DPTrace helps you intuitively understand dynamic programming by visually tracing the execution of classic algorithms. It breaks down each problem into four distinct approaches, showing you exactly how the call stack evolves, how the DP table is populated, and how space optimization works in practice.

---

## User Guide: How DPTrace Works

DPTrace isn't just a static display; it is a full execution engine that runs your inputs step-by-step. Here is where you can find all of its features:

### 1. The Main Visualizer
The core experience. Select any of the 11 classic DP problems from the left sidebar to begin.
- **Select an Approach:** Switch between **Brute Force**, **Memoized**, **Tabulation**, and **Space Optimized** solutions using the top tabs.
- **Playback Controls:** Use the scrubber at the bottom to step through the algorithm frame by frame.
  - *Pro tip:* Use <kbd>Space</kbd> to play/pause, and the <kbd>Left</kbd>/<kbd>Right</kbd> arrow keys to step manually.
- **Custom Inputs:** Expand the left panel to test your own arrays, strings, or targets. The algorithms adapt instantly to your custom edges cases.
- **Tree Explorer:** When viewing a recursion tree, you can **click and drag** to pan around, and use your mouse wheel to **zoom** in and out of massive recursion trees.

### 2. Compare Mode
Want to see exactly why Memoization is faster than Brute Force? 
While in the Visualizer, click the **Compare** button in the top navigation bar. Select two different approaches and watch them execute side-by-side using the same playback scrubber to visually compare their time/space complexity.

### 3. Tools & Utilities
Navigate to the **Tools** tab in the top menu to access standalone DP utilities:
- **Auto-Classify Problem:** Paste a word problem from a coding interview. The NLP engine will instantly read it and identify which of the 11 DP patterns it matches.
- **Recurrence Parser:** Type your own mathematical DP recurrence relation (e.g. `dp[i] = dp[i-1] + dp[i-2]`) and define base cases. The engine will parse your math and instantly generate a trace table for you to step through.

### 4. The DP Quiz
Test your knowledge in the **Quiz** tab. It features over 50 carefully crafted questions covering Time/Space Complexity, identifying DP states, recognizing optimal substructures, and understanding space optimization tricks.

### 5. Share Your Test Cases
Created a cool custom test case? You can easily share it! Open the Input Panel on the left side of the visualizer and click the **Share** button. This copies a special URL to your clipboard that encodes your exact problem, approach, and custom inputs so others can load your exact state instantly.

---

## Supported Problems

DPTrace covers 11 classic problems representing various DP patterns:

| # | Problem | Pattern |
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
