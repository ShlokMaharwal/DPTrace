import React from 'react';
import { Layout, SplitSquareHorizontal, HelpCircle, Wrench, Search, Code, Share2 } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div style={{
      flex: 1,
      padding: '40px 60px',
      overflowY: 'auto',
      color: 'var(--fg)',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, marginBottom: 8, color: 'var(--fg)' }}>DPTrace User Guide</h1>
        <p style={{ color: 'var(--fg-muted)', fontSize: 14, marginBottom: 40, lineHeight: 1.6 }}>
          Welcome to DPTrace! This guide will help you navigate the platform and understand how to use its tools to master Dynamic Programming.
        </p>

        <Section 
          icon={<Layout />} 
          title="The Main Visualizer" 
          accent="var(--accent)"
        >
          <p>The visualizer is the core of DPTrace. You can select any of the 11 classic DP problems from the left sidebar.</p>
          <ul>
            <li><strong>Select an Approach:</strong> Use the top tabs (BF, Memo, Tab, Opt) to switch between Brute Force, Memoized, Tabulation, and Space Optimized solutions.</li>
            <li><strong>Playback Controls:</strong> Use the scrubber at the bottom to step through the algorithm frame by frame. You can also use <kbd>Space</kbd> to play/pause, and the <kbd>Left</kbd>/<kbd>Right</kbd> arrow keys to step.</li>
            <li><strong>Custom Inputs:</strong> Expand the input panel on the left to test your own arrays, strings, or numbers!</li>
            <li><strong>Tree Explorer:</strong> For tree visualizers (like Memoized), you can click and drag to pan around, and use your mouse wheel to zoom in and out of massive recursion trees.</li>
          </ul>
        </Section>

        <Section 
          icon={<SplitSquareHorizontal />} 
          title="Compare Mode" 
          accent="var(--state-base)"
        >
          <p>Want to see exactly why Memoization is faster than Brute Force?</p>
          <p>Click the <strong>Compare</strong> button in the top navigation bar while in the Visualizer. This opens a split-screen view. You can select two different approaches for the same problem and watch them execute side-by-side using the same playback scrubber. It’s the best way to visualize time complexity differences!</p>
        </Section>

        <Section 
          icon={<Wrench />} 
          title="Tools & Parsers" 
          accent="var(--state-cache)"
        >
          <p>Navigate to the <strong>Tools</strong> tab in the top menu to access standalone utilities:</p>
          <ul>
            <li><strong>Auto-Classify Problem:</strong> Paste a word problem from a coding interview. The engine will instantly read it and identify which of the 11 DP patterns it matches (e.g., Knapsack, LIS, LCS).</li>
            <li><strong>Recurrence Parser:</strong> Type your own mathematical DP recurrence relation (e.g. <code>dp[i] = dp[i-1] + dp[i-2]</code>) and define base cases. The engine will parse your math and instantly generate a trace table for you to step through.</li>
          </ul>
        </Section>

        <Section 
          icon={<HelpCircle />} 
          title="The DP Quiz" 
          accent="var(--state-return)"
        >
          <p>Test your knowledge in the <strong>Quiz</strong> tab. It features over 50 carefully crafted questions covering Time/Space Complexity, identifying DP states, recognizing optimal substructures, and understanding space optimization tricks.</p>
        </Section>

        <Section 
          icon={<Share2 />} 
          title="Share with Friends" 
          accent="var(--fg)"
        >
          <p>Created a cool custom test case? You can easily share it! Just open the Input Panel on the left side of the visualizer and click the <strong>Share</strong> button. This will copy a special URL to your clipboard that encodes your exact problem, approach, and custom inputs so others can load your exact state instantly.</p>
        </Section>
      </div>
    </div>
  );
}

function Section({ icon, title, accent, children }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ 
          width: 32, height: 32, borderRadius: 8, 
          background: `color-mix(in srgb, ${accent} 15%, transparent)`,
          color: accent,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {React.cloneElement(icon, { size: 18 })}
        </div>
        <h2 style={{ fontSize: 18, color: 'var(--fg)', margin: 0 }}>{title}</h2>
      </div>
      <div style={{ 
        paddingLeft: 42,
        color: 'var(--fg-muted)',
        fontSize: 13,
        lineHeight: 1.7,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>
        {children}
      </div>
    </div>
  );
}
