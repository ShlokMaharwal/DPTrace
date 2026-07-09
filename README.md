# DPTrace.

> An interactive, beautifully crafted visualizer for Dynamic Programming algorithms.

**[Live Demo]()**

DPTrace helps you intuitively understand dynamic programming by visually tracing the execution of classic algorithms. It breaks down each problem into four distinct approaches, showing you exactly how the call stack evolves, how the DP table is populated, and how space optimization works in practice.

## Features

- **8 Classic DP Problems**: Covers a range of DP "shapes", from simple 1D sequences to complex interval DP.
  - Fibonacci Sequence
  - 0/1 Knapsack
  - Coin Change (Unbounded Knapsack)
  - Longest Common Subsequence (LCS)
  - Edit Distance
  - Longest Increasing Subsequence (LIS)
  - Matrix Chain Multiplication (MCM)
  - Partition Equal Subset Sum

- **4 Approaches per Problem**: Trace the evolution of the optimal solution.
  - **Brute Force**: Recursion trees demonstrating exponential overlap.
  - **Memoized**: Top-down DP with cache hits.
  - **Tabulation**: Bottom-up DP table filling.
  - **Space-Optimized**: The ultimate $O(1)$ or $O(n)$ space approach used in production.

- **Step-by-Step Playback**: Scrub through the algorithm's execution trace step-by-step. See function calls, cache hits, base cases, and cell fills in real-time.
- **Dynamic Visualizers**: Interactive recursion trees and 1D/2D DP tables that update as the trace plays.
- **Side-by-Side C++ Code**: See the actual C++ implementation for the selected approach, with active lines highlighted during playback.
- **Complexity Stats**: Live tracking of time and space complexity, alongside runtime statistics (calls made, cells filled).
- **Beautiful UI**: An elegant design system with semantic syntax highlighting and seamless Light/Dark mode transitions.

## Tech Stack

- **Framework**: React
- **State Management**: Zustand
- **Tooling**: Vite
- **Styling**: Vanilla CSS
- **Icons**: Lucide React

## Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/DPTrace.git
   cd DPTrace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## License

Made by Shlok &copy; 2026 all rights reserved.
