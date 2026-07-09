# DPTrace

**Live Demo:** [https://dp-trace.vercel.app/](https://dp-trace.vercel.app/)

> An interactive, step-by-step visualizer for Dynamic Programming algorithms. Trace execution, compare approaches, quiz yourself, and build your own recurrences — all in the browser.

---

## 📸 Demo

### Step-by-step Visualizer
![Visualizer Demo](docs/visualizer.png)

### Compare Mode — Side by Side
![Compare Mode](docs/compare.png)

### Recurrence Parser
![Recurrence Parser](docs/parser.png)

---

## How to Use

| Feature | Where to find it |
| :--- | :--- |
| Step through an algorithm | **Visualizer** tab → pick a problem → click **Run** → use the scrubber or arrow keys |
| Compare two approaches | **Visualizer** tab → click **Compare** in the header |
| Test a custom input | Left panel → edit the input fields → click **Run** |
| Classify a word problem | **Tools** tab → paste problem statement → **Classify** |
| Build a custom recurrence | **Tools** tab → Recurrence Parser |
| Take a quiz | **Quiz** tab |
| Share your test case | Left panel → **Share** button — copies a URL with your full state |

**Keyboard shortcuts:** `Space` play/pause · `←` step back · `→` step forward

---

## Supported Problems

11 classic DP problems, each with 4 fully animated approaches (Brute Force → Memoized → Tabulation → Space Optimized):

| # | Problem | Pattern | Difficulty |
|---|---------|------|---|
| 01 | Fibonacci Sequence | 1D DP | Easy |
| 02 | 0/1 Knapsack | 2D DP | Medium |
| 03 | Coin Change | 1D DP | Medium |
| 04 | Longest Common Subsequence | 2D DP | Medium |
| 05 | Edit Distance | 2D DP | Hard |
| 06 | Longest Increasing Subsequence | 1D DP | Medium |
| 07 | Matrix Chain Multiplication | Interval DP | Hard |
| 08 | Partition Equal Subset Sum | Subset DP | Medium |
| 09 | Egg Drop Problem | 2D DP | Hard |
| 10 | Palindrome Partitioning | 1D DP | Hard |
| 11 | TSP — Bitmask DP | Bitmask DP | Hard |

---

## Technical Architecture

### Execution Engine — The Trace Pattern

The core challenge: how do you pause and inspect a running algorithm without modifying the language runtime or using ASTs?

DPTrace uses a **synchronous trace pattern**. Every algorithm, when invoked, runs to completion instantly and emits structured step objects into a `steps[]` array:

```js
steps.push({ type: 'call', state: [n], lineNumber: 2 });
steps.push({ type: 'cache_hit', state: [n], value: memo[n], lineNumber: 4 });
steps.push({ type: 'return', value: result, lineNumber: 8 });
```

The UI then acts as a pure **video player** over this array — `currentStep` is just an index. Scrubbing, jumping, and reverse-playback are free. No timers, no generators, no async.

### State Management — Zustand

All shared state (active problem, current step, comparison steps, inputs) lives in a single flat Zustand store. Components subscribe to only what they need — the playback scrubber and the SVG recursion tree re-render independently with no prop drilling.

### Dual-State Input System

Handling array inputs in a text field creates a UX trap: parse on every keystroke and users can't type commas (the field snaps back). DPTrace maintains two parallel states:

- `rawText` — exactly what the user typed (drives the `<textarea>`)  
- `localInput` — the silently-parsed array (drives the algorithm)

This gives a flawless typing experience while ensuring the algorithm never crashes on intermediate states like `"1, 2, "`.

### TF-IDF Problem Classifier

The Auto-Classify feature uses a custom **TF-IDF (Term Frequency–Inverse Document Frequency)** engine built from scratch in plain JavaScript — no libraries. It:

1. Tokenizes both the query and a corpus of problem pattern documents
2. Computes TF-IDF weight vectors for both
3. Calculates **Cosine Similarity** to find the closest matching problem

High accuracy for our 11-problem domain with effectively zero latency and zero bundle cost.

### URL State Serialization

The **Share** button serializes `problem + approach + input` into query params:

```
?problem=knapsack&approach=memoized&input={"weights":[2,3,4],"capacity":8}
```

On load, a `useEffect` reads `window.location.search`, merges the decoded state into Zustand, triggers `runAlgorithm()`, then calls `history.replaceState` to clean the URL — no page reload.

### Recursion Tree Renderer

Trees are built by replaying the `steps[]` trace with a virtual call stack, then laid out with a **Reingold–Tilford-style width-minimization algorithm**. The SVG canvas supports drag-to-pan and scroll-to-zoom via pointer events and CSS `transform: translate/scale`.

---

## Tech Stack

| Layer | Technology | Why |
| :--- | :--- | :--- |
| **UI Framework** | React | Component model maps cleanly onto the panel-based layout; hooks make step subscriptions trivial |
| **State** | Zustand | Zero boilerplate, no context providers, fine-grained subscriptions — critical for keeping the playback scrubber performant |
| **Build Tool** | Vite | Sub-second HMR made iterating on algorithm trace output fast; native ESM means no config overhead |
| **Styling** | Vanilla CSS | Full control over CSS variables for the dark/light theme system without runtime overhead of a CSS-in-JS library |
| **Icons** | Lucide React | Consistent stroke-width icon set that scales cleanly at the 14–18px sizes used throughout the UI |

---

## License

Made by Shlok &copy; 2026. All rights reserved.
