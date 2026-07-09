
import { useMemo } from 'react';
import useStore from '../../store/useStore.js';

const NODE_W = 46;
const NODE_H = 26;
const H_GAP = 12;
const V_GAP = 48;

function buildTree(steps, currentStep) {
  const root = { id: 'root', children: [] };
  const stack = [root];
  let nodeId = 0;

  for (let i = 0; i <= currentStep && i < steps.length; i++) {
    const s = steps[i];
    const label = s.state ? `(${s.state.join(',')})` : '';

    if (s.type === 'call') {
      const node = { id: `n${nodeId++}`, label, type: 'call', value: null, children: [], active: i === currentStep };
      const parent = stack[stack.length - 1];
      if (parent) { parent.children.push(node); node.parent = parent; }
      stack.push(node);
    } else if (s.type === 'base_case' || s.type === 'cache_hit') {
      const top = stack[stack.length - 1];
      if (top && top.id !== 'root') {
        top.type = s.type === 'cache_hit' ? 'cache' : 'base';
        top.value = s.value;
        top.active = i === currentStep;
        stack.pop();
      }
    } else if (s.type === 'return') {
      const top = stack[stack.length - 1];
      if (top && top.id !== 'root') {
        top.type = 'return';
        top.value = s.value;
        top.active = i === currentStep;
        stack.pop();
      }
    }
  }
  return root;
}

function layoutTree(root) {
  const nodes = [];
  let maxX = 0;

  function measure(node) {
    if (!node.children || node.children.length === 0) return 1;
    const w = node.children.reduce((s, c) => s + measure(c) + 1, -1);
    node._width = Math.max(1, w);
    return node._width;
  }

  function assign(node, depth, left) {
    node._depth = depth;
    if (!node.children || node.children.length === 0) {
      node._x = left; maxX = Math.max(maxX, left); nodes.push(node); return;
    }
    let cursor = left;
    for (const child of node.children) {
      assign(child, depth + 1, cursor);
      cursor += (child._width || 1) + 1;
    }
    const fc = node.children[0], lc = node.children[node.children.length - 1];
    node._x = (fc._x + lc._x) / 2;
    maxX = Math.max(maxX, node._x);
    nodes.push(node);
  }

  measure(root);
  for (const child of root.children) assign(child, 0, 0);
  return { nodes: nodes.filter(n => n.id !== 'root'), maxX };
}


const NODE_STYLE = {
  call:   { stroke: 'var(--fg-dim)',      fill: 'transparent',           text: 'var(--fg-muted)' },
  base:   { stroke: 'var(--state-base)',  fill: 'rgba(126,168,126,0.12)',text: 'var(--state-base)' },
  cache:  { stroke: 'var(--state-cache)', fill: 'var(--accent-soft)',     text: 'var(--state-cache)' },
  return: { stroke: 'var(--state-return)',fill: 'rgba(196,138,90,0.10)',  text: 'var(--state-return)' },
  active: { stroke: 'var(--accent)',      fill: 'var(--accent-soft)',     text: 'var(--fg)' },
};

export default function RecursionTree() {
  const { steps, currentStep } = useStore();

  const { nodes, svgW, svgH } = useMemo(() => {
    const root = buildTree(steps, currentStep);
    const { nodes, maxX } = layoutTree(root);
    const svgW = Math.max(400, (maxX + 1) * (NODE_W + H_GAP) + 40);
    const maxDepth = nodes.reduce((m, n) => Math.max(m, n._depth ?? 0), 0);
    const svgH = Math.max(200, (maxDepth + 1) * (NODE_H + V_GAP) + 40);
    return { nodes, svgW, svgH };
  }, [steps, currentStep]);

  function nx(n) { return 20 + n._x * (NODE_W + H_GAP); }
  function ny(n) { return 20 + n._depth * (NODE_H + V_GAP); }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      overflow: 'auto',
      background: 'var(--panel)',
      border: '1px solid var(--border)',
      borderRadius: 6,
      position: 'relative',
    }}
    className="dot-grid"
    >
      {}
      <div style={{
        position: 'sticky',
        top: 0,
        left: 0,
        background: 'var(--panel)',
        borderBottom: '1px solid var(--border)',
        padding: '7px 12px',
        display: 'flex',
        gap: 14,
        zIndex: 1,
      }}>
        {[
          { type: 'call',   label: 'call' },
          { type: 'base',   label: 'base case' },
          { type: 'cache',  label: 'cache hit' },
          { type: 'return', label: 'returned' },
        ].map(({ type, label }) => {
          const s = NODE_STYLE[type];
          return (
            <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                border: `1.5px solid ${s.stroke}`,
                background: s.fill,
              }} />
              <span style={{ fontSize: 11, color: 'var(--fg-dim)' }}>{label}</span>
            </div>
          );
        })}
      </div>

      {nodes.length === 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
          gap: 8,
        }}>
          <span style={{ fontSize: 13, color: 'var(--fg-dim)' }}>
            Run the algorithm — the recursion tree builds as you step.
          </span>
        </div>
      )}

      <svg width={svgW} height={svgH} style={{ display: 'block' }}>
        {}
        {nodes.map(n => {
          if (!n.parent || n.parent.id === 'root') return null;
          const px = nx(n.parent) + NODE_W / 2;
          const py = ny(n.parent) + NODE_H;
          const cx = nx(n) + NODE_W / 2;
          const cy = ny(n);
          const my = (py + cy) / 2;
          return (
            <path
              key={`e-${n.id}`}
              d={`M ${px} ${py} C ${px} ${my}, ${cx} ${my}, ${cx} ${cy}`}
              stroke={n.active ? 'var(--accent)' : 'var(--border)'}
              strokeWidth={n.active ? 1.5 : 1}
              fill="none"
              style={{ transition: 'stroke 0.2s ease' }}
            />
          );
        })}

        {}
        {nodes.map(n => {
          const x = nx(n);
          const y = ny(n);
          const s = n.active ? NODE_STYLE.active : (NODE_STYLE[n.type] || NODE_STYLE.call);
          const rx = NODE_W / 2;
          const ry = NODE_H / 2;
          return (
            <g key={n.id}>
              <ellipse
                cx={x + rx} cy={y + ry}
                rx={rx} ry={ry}
                fill={s.fill}
                stroke={s.stroke}
                strokeWidth={n.active ? 1.5 : 1}
                style={{ transition: 'fill 0.2s ease, stroke 0.2s ease' }}
              />
              <text
                x={x + rx} y={y + ry - (n.value !== null && n.value !== undefined ? 4 : 0)}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={s.text}
                fontSize={9}
                fontFamily="JetBrains Mono, monospace"
                fontWeight={n.active ? '600' : '400'}
                style={{ transition: 'fill 0.2s ease' }}
              >
                {n.label}
              </text>
              {n.value !== null && n.value !== undefined && (
                <text
                  x={x + rx} y={y + ry + 8}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={s.text}
                  fontSize={8.5}
                  fontFamily="JetBrains Mono, monospace"
                  opacity={0.8}
                >
                  ={n.type === 'cache' ? '↩' : ''}{n.value}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
