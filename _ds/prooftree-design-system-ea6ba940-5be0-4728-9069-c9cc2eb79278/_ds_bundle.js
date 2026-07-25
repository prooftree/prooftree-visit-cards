/* @ds-bundle: {"format":3,"namespace":"ProofTreeDesignSystem_ea6ba9","components":[],"sourceHashes":{"ui_kits/prooftree-app/app.jsx":"4f66b286c6d5","ui_kits/prooftree-app/kit.jsx":"0c620231d14f","ui_kits/prooftree-app/screen-fora.jsx":"491312130180","ui_kits/prooftree-app/screen-ide.jsx":"d528ee071adf","ui_kits/prooftree-app/screen-lemma.jsx":"010251391f7f","ui_kits/prooftree-app/screen-members-paper.jsx":"79eb18b0c300"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ProofTreeDesignSystem_ea6ba9 = window.ProofTreeDesignSystem_ea6ba9 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/prooftree-app/app.jsx
try { (() => {
/* eslint-disable */
// =============================================================
// ProofTree click-thru app shell.
//
// NAV CONTRACT — mirrors lemmafora's go({route}) so designs port 1:1.
// In the repo each page receives a `go` prop; here we expose the same
// shape on window so screen code can call either:
//     go({ route: 'editor' })        ← repo form (preferred)
//     window.__nav('ide')            ← legacy string form (still works)
// Route aliases match src/pages/Fora.jsx VIEW_ALIASES. See PORTING.md §5.
// =============================================================
const {
  useState,
  useEffect
} = React;

// our internal screen ids ← repo route aliases
const ROUTE_TO_SCREEN = {
  home: 'fora',
  fora: 'fora',
  lemma: 'lemma',
  overview: 'lemma',
  editor: 'ide',
  ide: 'ide',
  members: 'members',
  paper: 'paper',
  // repo aliases that resolve to the nearest screen we mock:
  repo: 'members',
  project: 'members',
  graph: 'members',
  lemmas: 'members',
  activity: 'members'
};
function resolveRoute(arg) {
  // accept go({route:'editor'}) OR go('editor')/__nav('ide')
  const r = typeof arg === 'string' ? arg : arg && (arg.route || arg.view) || 'home';
  return ROUTE_TO_SCREEN[r] || 'fora';
}
function App() {
  const [route, setRoute] = useState('fora');
  useEffect(() => {
    const nav = arg => setRoute(resolveRoute(arg));
    window.__nav = nav; // legacy: window.__nav('ide')
    window.go = nav; // repo form: go({route:'editor'})
  }, []);
  switch (route) {
    case 'fora':
      return /*#__PURE__*/React.createElement(ScreenFora, null);
    case 'lemma':
      return /*#__PURE__*/React.createElement(ScreenLemma, null);
    case 'ide':
      return /*#__PURE__*/React.createElement(ScreenIDE, null);
    case 'members':
      return /*#__PURE__*/React.createElement(ScreenMembers, null);
    case 'paper':
      return /*#__PURE__*/React.createElement(ScreenPaper, null);
    default:
      return /*#__PURE__*/React.createElement(ScreenFora, null);
  }
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prooftree-app/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prooftree-app/kit.jsx
try { (() => {
/* eslint-disable */
// =============================================================
// ProofTree UI kit — atoms shared across screens.
// Loaded as <script type="text/babel" src="kit.jsx">.
// Exports to window for cross-file use.
// =============================================================

const {
  useState,
  useMemo
} = React;

// ----- Wordmark -----
function Wordmark({
  size = 22,
  color = 'var(--ink)'
}) {
  // tighten italic-to-upright seam at small sizes (topbar)
  const seamPull = size <= 26 ? '-0.04em' : '0';
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.__nav?.('fora');
    },
    style: {
      fontFamily: 'var(--serif)',
      fontSize: size,
      lineHeight: 1,
      color,
      textDecoration: 'none',
      letterSpacing: '-0.005em',
      display: 'inline-flex',
      alignItems: 'baseline',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontStyle: 'normal',
      marginRight: '0.2em'
    }
  }, "\u2200"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontStyle: 'italic',
      fontSize: '0.96em'
    }
  }, "proof"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 500,
      fontStyle: 'normal',
      marginLeft: seamPull
    }
  }, "Tree"));
}

// ----- Avatar -----
function Avatar({
  letter,
  color = '',
  size = 28,
  italic = true,
  agent = false,
  glyph = null,
  agentBg = 'var(--agent-ink)'
}) {
  const isKernel = agent && agentBg === 'var(--ink)';
  const fontFamily = agent ? isKernel ? 'var(--mono)' : 'var(--serif)' : 'var(--serif)';
  const fontStyle = agent ? glyph === 'τ' ? 'italic' : 'normal' : italic ? 'italic' : 'normal';
  const baseStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    background: agent ? agentBg : 'var(--paper)',
    border: agent ? `1px solid ${agentBg}` : '1px solid color-mix(in oklab, var(--ink-muted) 40%, transparent)',
    flexShrink: 0
  };
  const colorMap = {
    yellow: {
      bg: 'color-mix(in oklab, var(--ident-yellow) 22%, var(--paper))',
      border: 'color-mix(in oklab, var(--ident-yellow) 60%, transparent)'
    },
    green: {
      bg: 'color-mix(in oklab, var(--ident-green)  22%, var(--paper))',
      border: 'color-mix(in oklab, var(--ident-green)  60%, transparent)'
    },
    blue: {
      bg: 'color-mix(in oklab, var(--ident-blue)   22%, var(--paper))',
      border: 'color-mix(in oklab, var(--ident-blue)   60%, transparent)'
    },
    red: {
      bg: 'color-mix(in oklab, var(--ident-red)    22%, var(--paper))',
      border: 'color-mix(in oklab, var(--ident-red)    60%, transparent)'
    }
  };
  if (color && colorMap[color]) {
    baseStyle.background = colorMap[color].bg;
    baseStyle.border = `1px solid ${colorMap[color].border}`;
  }
  const glyphStyle = {
    fontFamily,
    fontStyle,
    fontWeight: 500,
    fontSize: Math.round(size * 0.45),
    lineHeight: 1,
    color: agent ? 'var(--paper)' : 'var(--ink)',
    transform: fontStyle === 'italic' ? 'translate(-1px, 0)' : 'none'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: baseStyle
  }, /*#__PURE__*/React.createElement("span", {
    style: glyphStyle
  }, glyph || letter));
}

// ----- Status pill -----
function Pill({
  state,
  children
}) {
  const map = {
    verified: {
      color: 'var(--verified)',
      dot: '●'
    },
    stub: {
      color: 'var(--stub)',
      dot: '●'
    },
    collision: {
      color: 'var(--accent)',
      dot: '●'
    },
    draft: {
      color: 'var(--ink-muted)',
      dot: '◳'
    },
    accepted: {
      color: 'var(--verified)',
      dot: '●'
    },
    open: {
      color: 'var(--ink-muted)',
      dot: '●'
    },
    active: {
      color: 'var(--verified)',
      dot: '●'
    },
    hot: {
      color: 'var(--accent)',
      dot: '●'
    }
  };
  const s = map[state] || map.draft;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '2px 8px',
      borderRadius: 4,
      background: 'var(--paper)',
      border: `1px solid color-mix(in oklab, ${s.color} 35%, transparent)`,
      fontFamily: 'var(--mono)',
      fontSize: 13,
      lineHeight: 1.4,
      color: s.color,
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: state === 'draft' ? 11 : 9,
      lineHeight: 1
    }
  }, s.dot), children);
}

// ----- Tag -----
function Tag({
  children,
  accent
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      padding: '2px 8px',
      borderRadius: 4,
      background: 'var(--paper)',
      border: `1px solid ${accent ? 'color-mix(in oklab, var(--accent) 40%, transparent)' : 'var(--hairline)'}`,
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: accent ? 'var(--accent)' : 'var(--ink-muted)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, children);
}

// ----- Button -----
function Btn({
  variant = 'default',
  onClick,
  children,
  style = {}
}) {
  const variants = {
    default: {
      background: 'var(--paper)',
      color: 'var(--ink)',
      border: '1px solid var(--hairline)'
    },
    dark: {
      background: 'var(--ink)',
      color: 'var(--paper)',
      border: '1px solid var(--ink)'
    },
    primary: {
      background: 'var(--accent)',
      color: 'var(--paper)',
      border: '1px solid var(--accent)'
    },
    accent: {
      background: 'var(--paper)',
      color: 'var(--accent)',
      border: '1px solid color-mix(in oklab, var(--accent) 40%, transparent)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--accent)',
      border: '1px solid transparent'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '7px 14px',
      borderRadius: 4,
      fontFamily: 'var(--mono)',
      fontSize: 13,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      flexShrink: 0,
      transition: 'background 120ms, color 120ms, border-color 120ms',
      ...variants[variant],
      ...style
    }
  }, children);
}

// ----- Formality dots -----
function Dots({
  value = 3,
  max = 5,
  state = 'accent'
}) {
  const onColor = state === 'verified' ? 'var(--verified)' : state === 'stub' ? 'var(--stub)' : 'var(--accent)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 3,
      alignItems: 'center'
    }
  }, Array.from({
    length: max
  }, (_, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      display: 'inline-block',
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: i < value ? onColor : 'var(--ink-faint)'
    }
  })));
}

// ----- Label -----
function Label({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      color: 'var(--ink-muted)',
      lineHeight: 1.2,
      ...style
    }
  }, children);
}

// ----- Flourish -----
function Flourish({
  children,
  color = 'var(--ink-muted)',
  size = 16
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--serif)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: size,
      color
    }
  }, children);
}

// ----- Hash -----
function Hash({
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-muted)'
    }
  }, children);
}

// ----- LiveTime — auto-updates "Nm ago" / "Nh ago" -----
function LiveTime({
  minutesAgo = 2
}) {
  const [m, setM] = React.useState(minutesAgo);
  React.useEffect(() => {
    const t = setInterval(() => setM(prev => prev + 1), 30000);
    return () => clearInterval(t);
  }, []);
  const txt = m < 60 ? `${m}m ago` : m < 60 * 24 ? `${Math.floor(m / 60)}h ago` : `${Math.floor(m / (60 * 24))}d ago`;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-muted)'
    }
  }, txt);
}

// ----- TypingDots — three dots blinking in sequence -----
function TypingDots() {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      height: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "typing-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "typing-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "typing-dot"
  }));
}

// ----- PulseFreshly — wraps a child and animates a one-time pulse on mount -----
function PulseFreshly({
  children,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "pulse-fresh",
    style: {
      display: 'inline-block',
      borderRadius: 4,
      ...style
    }
  }, children);
}

// ----- DAGMini — minimap of nearby DAG neighbors, top-right of statement pages -----
function DAGMini({
  here = 'odd'
}) {
  // 7 nodes around the current one
  const nodes = [{
    id: 'thm',
    x: 14,
    y: 14,
    kind: 'thm',
    label: 'thm'
  }, {
    id: 'even',
    x: 50,
    y: 26,
    kind: 'verified',
    label: '§04'
  }, {
    id: 'odd',
    x: 86,
    y: 14,
    kind: 'collision',
    label: '§05',
    active: true
  }, {
    id: 'bin',
    x: 30,
    y: 56,
    kind: 'verified',
    label: '§03'
  }, {
    id: 'prime',
    x: 70,
    y: 56,
    kind: 'verified',
    label: '§02'
  }, {
    id: 'red',
    x: 14,
    y: 84,
    kind: 'verified',
    label: '§01'
  }, {
    id: 'qed',
    x: 86,
    y: 84,
    kind: 'stub',
    label: '§06'
  }];
  const edges = [['thm', 'even'], ['thm', 'odd'], ['even', 'bin'], ['odd', 'bin'], ['odd', 'prime'], ['bin', 'red'], ['prime', 'red'], ['odd', 'qed']];
  const colorOf = k => ({
    verified: 'var(--verified)',
    stub: 'var(--stub)',
    collision: 'var(--accent)',
    thm: 'var(--ink)',
    draft: 'var(--ink-faint)'
  })[k] || 'var(--ink-faint)';
  const nMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 168,
      padding: 10,
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "NEIGHBORHOOD"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)'
    }
  }, "7")), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "148",
    height: "100",
    style: {
      display: 'block'
    }
  }, edges.map(([a, b], i) => {
    const A = nMap[a],
      B = nMap[b];
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: A.x,
      y1: A.y,
      x2: B.x,
      y2: B.y,
      stroke: "var(--hairline)",
      strokeWidth: "1"
    });
  }), nodes.map(n => /*#__PURE__*/React.createElement("g", {
    key: n.id
  }, /*#__PURE__*/React.createElement("circle", {
    cx: n.x,
    cy: n.y,
    r: n.active ? 5 : 3.5,
    fill: n.active ? colorOf(n.kind) : 'var(--paper)',
    stroke: colorOf(n.kind),
    strokeWidth: n.active ? 1 : 1.2
  }), /*#__PURE__*/React.createElement("text", {
    x: n.x + 7,
    y: n.y + 2.5,
    fontFamily: "var(--mono)",
    fontSize: "6",
    fill: n.active ? 'var(--ink)' : 'var(--ink-muted)',
    style: {
      fontWeight: n.active ? 500 : 400
    }
  }, n.label)))));
}

// ----- Watermark — empty-state dag motif background -----
function Watermark({
  children,
  height = 140
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "dag-watermark",
    style: {
      height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px dashed var(--hairline)',
      borderRadius: 6,
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-faint)'
    }
  }, children);
}

// ----- ContributionHeatmap — GitHub-style activity grid -----
// Renders ~17 weeks × 7 days of cells colored by intensity (0..4).
function ContributionHeatmap() {
  // Deterministic pseudo-data so the same grid renders every load.
  // Values 0..4 — 0 = no activity, 4 = busiest day.
  const WEEKS = 17;
  const DAYS = 7;
  const data = React.useMemo(() => {
    const rng = (i, j) => {
      const x = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({
      length: WEEKS
    }, (_, w) => Array.from({
      length: DAYS
    }, (_, d) => {
      const r = rng(w, d);
      // bias toward 0 with a long tail
      if (r < 0.55) return 0;
      if (r < 0.74) return 1;
      if (r < 0.87) return 2;
      if (r < 0.96) return 3;
      return 4;
    }));
  }, []);
  const total = data.flat().reduce((a, b) => a + b, 0);
  const intensityColor = n => {
    if (n === 0) return 'var(--paper-press)';
    if (n === 1) return 'color-mix(in oklab, var(--verified) 22%, var(--paper))';
    if (n === 2) return 'color-mix(in oklab, var(--verified) 45%, var(--paper))';
    if (n === 3) return 'color-mix(in oklab, var(--verified) 70%, var(--paper))';
    return 'var(--verified)';
  };
  const CELL = 12,
    GAP = 3;
  const monthLabels = ['Feb', '', '', '', 'Mar', '', '', '', 'Apr', '', '', '', 'May', '', '', '', ''];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "YOUR ACTIVITY \xB7 17 weeks"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink)'
    }
  }, total, " contributions")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      marginLeft: 22,
      gap: GAP,
      marginBottom: 4
    }
  }, monthLabels.slice(0, WEEKS).map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: CELL,
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)'
    }
  }, m))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: DAYS * (CELL + GAP) - GAP,
      paddingTop: 2
    }
  }, ['Mon', '', 'Wed', '', 'Fri', '', ''].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)',
      lineHeight: `${CELL}px`,
      height: CELL
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: GAP
    }
  }, data.map((week, wi) => /*#__PURE__*/React.createElement("div", {
    key: wi,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: GAP
    }
  }, week.map((cell, di) => /*#__PURE__*/React.createElement("div", {
    key: di,
    title: `${cell} contributions`,
    style: {
      width: CELL,
      height: CELL,
      borderRadius: 2,
      background: intensityColor(cell),
      border: cell === 0 ? '1px solid var(--hairline)' : '1px solid transparent'
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "verified statements \xB7 drafts \xB7 discussions"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, "less", [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 10,
      height: 10,
      borderRadius: 2,
      background: intensityColor(i),
      border: i === 0 ? '1px solid var(--hairline)' : '1px solid transparent'
    }
  })), "more")));
}

// ----- Tex (KaTeX renderTo) -----
function Tex({
  tex,
  display = false
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.katex && ref.current) {
      try {
        window.katex.render(tex, ref.current, {
          throwOnError: false,
          displayMode: display
        });
      } catch (e) {
        ref.current.textContent = tex;
      }
    } else if (ref.current) {
      ref.current.textContent = tex;
    }
  }, [tex, display]);
  return display ? /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      margin: '8px 0'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    ref: ref
  });
}

// ----- Topbar (workspace register — less ceremony, more mono) -----
function Topbar({
  crumbs = [],
  model = 'Opus 4.7',
  back = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 52,
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 18,
      borderBottom: '1px solid var(--hairline)',
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    size: 20
  }), back && /*#__PURE__*/React.createElement("button", {
    onClick: () => window.__nav?.('fora'),
    style: {
      width: 24,
      height: 24,
      borderRadius: 12,
      border: '1px solid var(--hairline)',
      background: 'var(--paper)',
      cursor: 'pointer',
      color: 'var(--ink-muted)',
      padding: 0,
      fontSize: 12,
      lineHeight: 1
    }
  }, "\u2190"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--mono)',
      fontSize: 12,
      minWidth: 0,
      flexShrink: 1
    }
  }, crumbs.map((c, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-faint)',
      flexShrink: 0
    }
  }, "/"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: i === crumbs.length - 1 ? 'var(--ink)' : 'var(--ink-muted)',
      fontWeight: 400,
      cursor: c.onClick ? 'pointer' : 'default',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    onClick: c.onClick
  }, c.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(PresenceStack, null), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 4,
      padding: '4px 10px',
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-muted)',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--accent)'
    }
  }), " ", model), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--paper)',
      border: '1px solid color-mix(in oklab, var(--accent) 30%, transparent)',
      borderRadius: 4,
      padding: '4px 12px',
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--accent)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, "ask \u2197"), /*#__PURE__*/React.createElement(Avatar, {
    letter: "M",
    size: 28
  }));
}

// ----- Presence stack (overlapping avatars showing live collaborators) -----
function PresenceStack() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      flexShrink: 0
    }
  }, [{
    letter: 'K',
    color: 'green'
  }, {
    letter: 'C',
    color: 'red'
  }, {
    letter: 'H',
    color: 'blue'
  }].map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      marginLeft: i === 0 ? 0 : -6
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    letter: p.letter,
    color: p.color,
    size: 22
  }))));
}

// ----- Tabs -----
function Tabs({
  items,
  active,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '0 24px',
      height: 48,
      borderBottom: '1px solid var(--hairline)',
      background: 'var(--paper)',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      height: '100%'
    }
  }, items.map(it => {
    const isActive = it.id === active;
    return /*#__PURE__*/React.createElement("div", {
      key: it.id,
      onClick: () => onChange?.(it.id),
      style: {
        fontFamily: 'var(--mono)',
        fontSize: 14,
        lineHeight: 1,
        cursor: 'pointer',
        color: isActive ? 'var(--ink)' : 'var(--ink-muted)',
        position: 'relative',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        background: 'var(--paper-deep)',
        padding: '1px 6px',
        borderRadius: 8
      }
    }, it.count), isActive && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        background: 'var(--accent)'
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "default"
  }, "+ invite"), /*#__PURE__*/React.createElement(Btn, {
    variant: "dark"
  }, "settings")));
}

// ----- AgentChip -----
function AgentChip({
  kind,
  status = 'idle',
  selected = false
}) {
  const map = {
    decomposer: {
      glyph: '△',
      name: 'Decomposer',
      bg: 'var(--agent-ink)'
    },
    tactician: {
      glyph: 'τ',
      name: 'Tactician',
      bg: 'var(--agent-ink)'
    },
    kernel: {
      glyph: 'K',
      name: 'Kernel',
      bg: 'var(--ink)'
    }
  };
  const a = map[kind];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: 14,
      borderRadius: 6,
      border: '1px solid var(--hairline)',
      background: selected ? 'var(--paper-deep)' : 'var(--paper)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    agent: true,
    letter: a.glyph,
    agentBg: a.bg,
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink)'
    }
  }, a.name)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: status === 'idle' ? 'var(--ink-faint)' : 'var(--verified)'
    }
  }));
}

// Expose
Object.assign(window, {
  Wordmark,
  Avatar,
  Pill,
  Tag,
  Btn,
  Dots,
  Label,
  Flourish,
  Hash,
  Tex,
  Topbar,
  Tabs,
  AgentChip,
  LiveTime,
  TypingDots,
  PulseFreshly,
  DAGMini,
  Watermark,
  PresenceStack,
  ContributionHeatmap
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prooftree-app/kit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prooftree-app/screen-fora.jsx
try { (() => {
/* eslint-disable */
// =============================================================
// ProofTree screens — Fora, Lemma, IDE, Members, Paper.
// Each exposed on window for app.jsx routing.
// =============================================================

// ----- THE FORA -----
function ScreenFora() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    crumbs: [{
      label: 'the Fora'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '220px 1fr 320px',
      gap: 0,
      minHeight: 'calc(100vh - 64px)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      padding: '28px 20px',
      background: 'var(--paper-deep)',
      borderRight: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement(Label, {
    style: {
      marginBottom: 14
    }
  }, "YOUR PROJECTS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.__nav('lemma');
    },
    style: {
      textDecoration: 'none',
      color: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-muted)'
    }
  }, "\u25CB "), "chebyshev-theta-bound"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      marginTop: 4,
      lineHeight: 1.5
    }
  }, "6 lemmas \xB7 1 collision \xB7 public", /*#__PURE__*/React.createElement("br", null), "collaboration demo")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-muted)'
    }
  }, "\u25CB "), "geometry-of-numbers-ex3"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      marginTop: 4,
      lineHeight: 1.5
    }
  }, "4 lemmas \xB7 personal exercise", /*#__PURE__*/React.createElement("br", null), "workspace")), /*#__PURE__*/React.createElement("button", {
    style: {
      background: 'var(--paper)',
      border: '1px dashed var(--hairline)',
      borderRadius: 4,
      padding: '8px 12px',
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-muted)',
      cursor: 'pointer',
      textAlign: 'left'
    }
  }, "+ new project")), /*#__PURE__*/React.createElement(Label, {
    style: {
      marginTop: 36,
      marginBottom: 14
    }
  }, "COLLAB HUBS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [['#polymath-19', '46 members'], ['#lean-mathlib-wg', '112 members'], ['#reading-grp · stein', '14 members']].map(([n, m]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      padding: '8px 10px',
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      marginTop: 2
    }
  }, m))))), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '32px 40px',
      maxWidth: 920
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 360px',
      gap: 28,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--serif)',
      fontWeight: 500,
      fontSize: 36,
      lineHeight: 1.18,
      margin: 0
    }
  }, "The Fora"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Flourish, {
    size: 17
  }, "your math, fading into the wider world \u2193")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16
    }
  }, "tailored to you"), /*#__PURE__*/React.createElement(Flourish, {
    size: 14
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "algorithm-picked from across the tree \xB7 click any card to drill in")))), /*#__PURE__*/React.createElement(ContributionHeatmap, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(ForaCard, {
    kind: "thread",
    tag: "analytic-nt",
    status: "collision",
    title: "\xA705 odd step \u2014 fold via \u2308\xB7/2\u2309 or keep parity split? collision detected",
    body: "Two of us derived the symmetry bound ((2n+1) n)\u207B\xB9 \u2264 4\u207F from different routes.",
    author: {
      letter: 'K',
      color: 'green',
      handle: '@kira_m',
      ago: '2h'
    },
    meta: "\u25B2 42 \xB7 \u25CB 7",
    focused: true,
    live: true
  }), /*#__PURE__*/React.createElement(ForaCard, {
    kind: "statement",
    tag: "combinatorics",
    status: "verified",
    title: "[Lean checked \u2713] \xA703 binomial bound \u2014 full proof posted",
    body: "Both (2n n) \u2264 4\u207F and (2n+1 n) \u2264 4\u207F are kernel-verified.",
    author: {
      letter: 'H',
      color: 'blue',
      handle: '@h.brown',
      ago: '4h'
    },
    meta: "\u25B2 67 \xB7 \u25CB 11"
  }), /*#__PURE__*/React.createElement(ForaCard, {
    kind: "thread",
    tag: "analytic-nt",
    title: "Counterexample sketch \u2014 does \u03D1(x) \u2264 x log 4 give the cleanest constant?",
    body: "I tried to derive a smaller C by elementary means and got stuck. Sharing the calculation; sanity check welcome.",
    author: {
      letter: 'A',
      color: 'yellow',
      handle: '@aria.p',
      ago: '8h'
    },
    meta: "\u25B2 23 \xB7 \u25CB 7"
  }), /*#__PURE__*/React.createElement(ForaCard, {
    kind: "statement",
    tag: "geometry-of-numbers",
    status: "draft",
    title: "Exercise 3 workspace imported from TeX",
    body: "Four proof tasks from the sheet are available as private lemmas.",
    author: {
      letter: 'C',
      color: 'red',
      handle: '@carl',
      ago: 'local'
    }
  }))), /*#__PURE__*/React.createElement("aside", {
    style: {
      padding: '28px 20px',
      background: 'var(--paper-deep)',
      borderLeft: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement(Label, {
    style: {
      marginBottom: 14
    }
  }, "OPEN PROBLEMS NEAR YOU"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, [['Sharp constant for ϑ-bound below log 4', '7w · 12 attempts'], ['Elementary proof of Bertrand at scale', '4w · 5 attempts'], ['Autoformalization of Mertens §3', '3w · 2 attempts']].map(([t, m]) => /*#__PURE__*/React.createElement("div", {
    key: t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 14,
      lineHeight: 1.4
    }
  }, "\u25CB ", t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      marginTop: 4,
      marginLeft: 12
    }
  }, m)))), /*#__PURE__*/React.createElement(Label, {
    style: {
      marginTop: 30,
      marginBottom: 14
    }
  }, "PEOPLE TO FOLLOW"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [['K', 'green', '@k.tanaka', 'analytic NT, sieves'], ['A', 'yellow', '@aria.p', 'probability, random graphs'], ['R', 'red', '@rafi.dv', 'lean4, tactic engineering'], ['C', 'red', '@carl', 'working locally on Geometry of Numbers']].map(([l, c, h, sub]) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    letter: l,
    color: c,
    size: 26
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13
    }
  }, h), /*#__PURE__*/React.createElement(Flourish, {
    size: 12
  }, sub))))))));
}
function ForaCard({
  kind,
  tag,
  status,
  title,
  body,
  author,
  meta,
  focused,
  live
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: () => window.__nav('lemma'),
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderLeft: focused ? '3px solid var(--accent)' : '1px solid var(--hairline)',
      borderRadius: 6,
      padding: '16px 20px',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(Pill, {
    state: kind === 'thread' ? 'open' : 'verified'
  }, kind === 'thread' ? '¶ THREAD' : '◆ STATEMENT'), status && /*#__PURE__*/React.createElement(Pill, {
    state: status
  }, status === 'verified' ? 'Lean checked' : status === 'draft' ? 'draft' : status === 'collision' ? 'collision' : status), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Tag, null, tag)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 17,
      lineHeight: 1.4
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 16,
      color: 'var(--ink)',
      lineHeight: 1.5,
      marginTop: 6
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    letter: author.letter,
    color: author.color,
    size: 24
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-muted)'
    }
  }, author.handle, " \xB7"), live ? /*#__PURE__*/React.createElement(LiveTime, {
    minutesAgo: 2
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-muted)'
    }
  }, author.ago), live && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--accent)',
      marginLeft: 4
    }
  }, /*#__PURE__*/React.createElement(TypingDots, null), " @h.brown drafting"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), meta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-muted)'
    }
  }, meta), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--accent)'
    }
  }, "open \u2192")));
}
Object.assign(window, {
  ScreenFora,
  ForaCard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prooftree-app/screen-fora.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prooftree-app/screen-ide.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* eslint-disable */
// =============================================================
// IDE screen — three-pane attempt editor with agents rail.
// =============================================================

function ScreenIDE() {
  const [view, setView] = React.useState('split'); // tex | split | lean
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    back: true,
    crumbs: [{
      label: 'home',
      onClick: () => window.__nav('fora')
    }, {
      label: 'chebyshev-theta-bound'
    }, {
      label: '§05 odd step',
      onClick: () => window.__nav('lemma')
    }, {
      label: 'my attempt'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      height: 48,
      borderBottom: '1px solid var(--hairline)',
      gap: 18,
      fontFamily: 'var(--mono)',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-muted)'
    }
  }, "IDE"), /*#__PURE__*/React.createElement("span", null, "chebyshev-theta-bound"), /*#__PURE__*/React.createElement(Pill, {
    state: "draft"
  }, "unverified \xB7 draft"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      border: '1px solid var(--hairline)',
      borderRadius: 4,
      overflow: 'hidden'
    }
  }, [['tex', 'TeX'], ['split', '⇄ split'], ['lean', 'lean']].map(([id, label]) => /*#__PURE__*/React.createElement("button", {
    key: id,
    onClick: () => setView(id),
    style: {
      padding: '6px 14px',
      fontFamily: 'var(--mono)',
      fontSize: 13,
      cursor: 'pointer',
      border: 0,
      background: view === id ? 'var(--ink)' : 'var(--paper)',
      color: view === id ? 'var(--paper)' : 'var(--ink)'
    }
  }, label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--ink-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "VIEW \u2265"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 120,
      height: 2,
      background: 'var(--hairline)',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: '24%',
      height: 2,
      background: 'var(--accent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '24%',
      top: -4,
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--accent)',
      transform: 'translateX(-50%)'
    }
  })), /*#__PURE__*/React.createElement("span", null, "prose")), /*#__PURE__*/React.createElement(Btn, {
    variant: "default"
  }, "\u2190 back to lemma"), /*#__PURE__*/React.createElement(Btn, {
    variant: "dark"
  }, "\u25B7 run Kernel"), /*#__PURE__*/React.createElement(Btn, {
    variant: "default"
  }, "commit (verify first)")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '260px 1fr 360px',
      minHeight: 'calc(100vh - 64px - 48px)'
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      padding: '20px 16px',
      background: 'var(--paper-deep)',
      borderRight: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Label, null, "OUTLINE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)'
    }
  }, "5/5")), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingLeft: 8,
      borderLeft: '3px solid var(--accent)',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      fontWeight: 500
    }
  }, "\xA705"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "AUTO-DECOMPOSITION")), [{
    n: 1,
    title: /*#__PURE__*/React.createElement("span", null, "apply \xA703(ii): ", /*#__PURE__*/React.createElement(Tex, {
      tex: "\\binom{2n+1}{n} \\le 4^n"
    }), " via binomial symmetry"),
    status: 'OK',
    dots: 4,
    dotsState: 'verified',
    focus: true
  }, {
    n: 2,
    title: /*#__PURE__*/React.createElement("span", null, "invoke \xA702 at ", /*#__PURE__*/React.createElement(Tex, {
      tex: "2n+1"
    }), ": each prime ", /*#__PURE__*/React.createElement(Tex, {
      tex: "n+1 < p \\le 2n+1"
    }), " divides ", /*#__PURE__*/React.createElement(Tex, {
      tex: "\\binom{2n+1}{n}"
    })),
    status: 'OK',
    dots: 4
  }, {
    n: 3,
    title: /*#__PURE__*/React.createElement("span", null, "take logs: ", /*#__PURE__*/React.createElement(Tex, {
      tex: "\\vartheta(2n+1) - \\vartheta(n+1) \\le \\log \\binom{2n+1}{n}"
    })),
    status: 'OK',
    dots: 3,
    disc: 1
  }, {
    n: 4,
    title: /*#__PURE__*/React.createElement("span", null, "chain: ", /*#__PURE__*/React.createElement(Tex, {
      tex: "\\log \\binom{2n+1}{n} \\le \\log 4^n = n \\log 4"
    })),
    status: 'EDIT',
    statusKind: 'stub',
    dots: 2,
    dotsState: 'stub',
    disc: 1
  }, {
    n: 5,
    title: /*#__PURE__*/React.createElement("span", null, "boundary case: ", /*#__PURE__*/React.createElement(Tex, {
      tex: "n = 0"
    }), ", trivial since ", /*#__PURE__*/React.createElement(Tex, {
      tex: "\\vartheta(1) - \\vartheta(1) = 0"
    })),
    status: 'TODO',
    statusKind: 'draft',
    dots: 1
  }].map(s => /*#__PURE__*/React.createElement(OutlineStep, _extends({
    key: s.n
  }, s)))), /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '20px 24px',
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement(Label, null, "GOAL OF THIS ATTEMPT"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderLeft: '3px solid var(--accent)',
      borderRadius: 6,
      padding: '18px 24px',
      textAlign: 'center',
      fontSize: 22
    }
  }, /*#__PURE__*/React.createElement(Tex, {
    display: true,
    tex: "\\vartheta(2n+1) - \\vartheta(n+1) \\le n \\log 4"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'grid',
      gridTemplateColumns: view === 'split' ? '1fr 1fr' : '1fr',
      gap: 16
    }
  }, (view === 'tex' || view === 'split') && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginBottom: 6
    }
  }, "TEX \xB7 EDITABLE"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      padding: 16,
      fontFamily: 'var(--serif)',
      fontSize: 15,
      lineHeight: 1.55,
      minHeight: 280
    }
  }, "Apply \xA703(ii) binomial symmetry to bound ", /*#__PURE__*/React.createElement("code", null, "\\(\\binom", '{2n+1}', '{n}', "\\le 4^n\\)"), ". Invoke \xA702 at ", /*#__PURE__*/React.createElement("code", null, "\\((2n+1)\\)"), " so every prime ", /*#__PURE__*/React.createElement("code", null, "\\(p\\)"), " with ", /*#__PURE__*/React.createElement("code", null, "\\(n+1<p\\le 2n+1\\)"), " divides the central binomial. Take logs on both sides: ", /*#__PURE__*/React.createElement("code", null, "\\(\\vartheta(2n+1)-\\vartheta(n+1)\\le \\log\\binom", '{2n+1}', '{n}', "\\)"), ". Chain to conclude ", /*#__PURE__*/React.createElement("code", null, "\\(\\le n\\log 4\\)"), ". Boundary case \xA0", /*#__PURE__*/React.createElement("code", null, "\\(n=0\\)"), " is trivial.")), (view === 'lean' || view === 'split') && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginBottom: 6
    }
  }, "LEAN"), /*#__PURE__*/React.createElement("pre", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      padding: 16,
      fontFamily: 'var(--mono)',
      fontSize: 13,
      lineHeight: 1.6,
      margin: 0,
      minHeight: 280,
      color: 'var(--ink)',
      whiteSpace: 'pre-wrap'
    }
  }, `theorem theta_odd_step (n : ℕ) :
    theta (2 * n + 1) - theta (n + 1) ≤ n *
Real.log 4 := `, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "by"), `
  have hbin := central_binomial_odd_le_four_pow n
  have hdvd := prime_dvd_central_binomial
  have hlog :
    theta (2*n+1) - theta (n+1) ≤ Real.log
(Nat.choose (2*n+1) n) := `, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "by"), `
    `, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--stub)'
    }
  }, "sorry"), `
  calc theta (2*n+1) - theta (n+1)
      ≤ Real.log (Nat.choose (2*n+1) n) := hlog
    _ ≤ Real.log ((4:ℝ)^n) := `, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "by"), `
        have := Real.log_le_log (`, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "by"), ` positivity) (`, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "by"), ` exact_mod_cast hbin)
        simpa using this
    _ = n * Real.log 4 := `, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "by"), ` rw [Real.log_pow]`))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "formality \xB7 structured"), /*#__PURE__*/React.createElement("span", null, "\u25CB 7 collision ", /*#__PURE__*/React.createElement(Dots, {
    value: 2,
    max: 5
  }), " \xB7 ", view === 'split' ? '⇄ side-by-side' : view === 'lean' ? '▸ show prose' : '▸ show lean')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    variant: "dark"
  }, "\u03C4 ask Tactician"), /*#__PURE__*/React.createElement(Btn, {
    variant: "default"
  }, "+ cite"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Btn, {
    variant: "accent"
  }, "+ open collision in fora"))), /*#__PURE__*/React.createElement("aside", {
    style: {
      padding: '20px 18px',
      background: 'var(--paper-deep)',
      borderLeft: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13
    }
  }, "agents \xB7 3 online"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)'
    }
  }, "2 humans \xD7 3 AI")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(AgentChip, {
    kind: "decomposer",
    selected: true
  }), /*#__PURE__*/React.createElement(AgentChip, {
    kind: "tactician"
  }), /*#__PURE__*/React.createElement(AgentChip, {
    kind: "kernel"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)',
      marginTop: 6,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "splits prose into substeps"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "suggests next move per formality level"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, "runs Lean 4.12 + MathLib verification")), /*#__PURE__*/React.createElement("div", {
    className: "slide-in-margin",
    style: {
      marginTop: 18,
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderLeft: '3px solid var(--accent)',
      borderRadius: 6,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    agent: true,
    letter: "\u25B3",
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--verified)'
    }
  }, "Decomposer"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(LiveTime, {
    minutesAgo: 4
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-muted)',
      marginTop: 8
    }
  }, "detected 5 substeps \xB7 1 collision \xB7 0 at Lean stub or above"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      paddingTop: 10,
      borderTop: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "\u25B3 DECOMPOSER \xB7 COLLISION REVEAL"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 14,
      lineHeight: 1.5,
      marginTop: 6
    }
  }, "Step 3. AXLE canonical hash matches @h.brown's symmetry-trick attempt \u2014 likely a ", /*#__PURE__*/React.createElement("i", null, "forced step"), "."), /*#__PURE__*/React.createElement(PulseFreshly, {
    style: {
      padding: '2px 6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--accent)'
    }
  }, "v1: 4f9a7c2e8d\u2026")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    agent: true,
    letter: "\u03C4",
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--accent)'
    }
  }, "Tactician"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "LEVEL: SEMI-FORMAL")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: 'var(--mono)',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "Step 1."), " apply \xA703(ii): ", /*#__PURE__*/React.createElement(Tex, {
    tex: "\\binom{2n+1}{n} \\le 4^n"
  }), " via binomial symmetry"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      paddingTop: 10,
      borderTop: '1px solid var(--hairline)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "PREMISE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "CONF 0.85")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 14,
      marginTop: 6,
      lineHeight: 1.5
    }
  }, "check the determinant / quotient / volume invariant"), /*#__PURE__*/React.createElement(Flourish, {
    size: 13
  }, "most exercises here hinge on one invariant")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    agent: true,
    letter: "K",
    agentBg: "var(--ink)",
    size: 26
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13
    }
  }, "Kernel"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(PulseFreshly, {
    style: {
      padding: '1px 6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--verified)'
    }
  }, "\u25CF verified"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-muted)',
      marginTop: 8
    }
  }, "1 of 5 ready \xB7 Lean 4.12.0 + Mathlib 4.10 \xB7 ", /*#__PURE__*/React.createElement(LiveTime, {
    minutesAgo: 1
  }))))));
}
function OutlineStep({
  n,
  title,
  status,
  statusKind,
  dots,
  dotsState,
  disc,
  focus
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 12px',
      background: focus ? 'var(--accent-tint)' : 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 4,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)'
    }
  }, "Step ", n, "."), disc && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)'
    }
  }, "\u25CB ", disc)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 14,
      lineHeight: 1.4,
      marginTop: 4
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      padding: '1px 6px',
      borderRadius: 3,
      color: statusKind === 'stub' ? 'var(--stub)' : statusKind === 'draft' ? 'var(--ink-muted)' : 'var(--verified)',
      background: statusKind === 'stub' ? 'var(--stub-tint)' : statusKind === 'draft' ? 'var(--paper-deep)' : 'var(--verified-tint)',
      border: '1px dashed transparent'
    }
  }, status), /*#__PURE__*/React.createElement(Dots, {
    value: dots,
    max: 5,
    state: dotsState
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--accent)'
    }
  }, "\u25B2")), focus && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      flex: 1,
      fontFamily: 'var(--mono)',
      fontSize: 11,
      padding: '6px 8px',
      border: '1px solid color-mix(in oklab, var(--accent) 40%, transparent)',
      background: 'var(--paper)',
      color: 'var(--accent)',
      borderRadius: 4,
      cursor: 'pointer'
    }
  }, "+ create discussion")), focus && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4,
      fontFamily: 'var(--mono)',
      fontSize: 10,
      color: 'var(--ink-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "approve"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "mark edit"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "split"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "merge \u2193"), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "drop")));
}
Object.assign(window, {
  ScreenIDE,
  OutlineStep
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prooftree-app/screen-ide.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prooftree-app/screen-lemma.jsx
try { (() => {
/* eslint-disable */
// =============================================================
// Lemma page — single statement + attempt graph + focused path.
// =============================================================

function ScreenLemma() {
  const [focused, setFocused] = React.useState('kira');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    back: true,
    crumbs: [{
      label: 'home',
      onClick: () => window.__nav('fora')
    }, {
      label: 'chebyshev-theta-bound',
      onClick: () => window.__nav('overview')
    }, {
      label: '§05 odd step'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 360px',
      minHeight: 'calc(100vh - 64px)'
    }
  }, /*#__PURE__*/React.createElement("main", {
    style: {
      padding: '32px 40px',
      maxWidth: 920
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--serif)',
      fontWeight: 500,
      fontSize: 30,
      lineHeight: 1.2,
      margin: 0,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12
    }
  }, "\xA705 odd step in Chebyshev's ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic'
    }
  }, "\u03D1"), "-bound", /*#__PURE__*/React.createElement(Pill, {
    state: "collision"
  }, "collision")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginTop: 10,
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-muted)'
    }
  }, "posted by ", /*#__PURE__*/React.createElement(Avatar, {
    letter: "K",
    color: "green",
    size: 22
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink)'
    }
  }, "@kira_m"), /*#__PURE__*/React.createElement("span", null, "\xB7"), "surfaces in 2 projects", /*#__PURE__*/React.createElement(Tag, null, "analytic-nt")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderLeft: '3px solid var(--accent)',
      borderRadius: 6,
      padding: '20px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Label, null, "STATEMENT"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-muted)'
    }
  }, "/chebyshev-theta-bound")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      textAlign: 'center',
      fontSize: 22
    }
  }, /*#__PURE__*/React.createElement(Tex, {
    display: true,
    tex: "\\vartheta(2n+1) - \\vartheta(n+1) \\le n \\log 4"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      fontFamily: 'var(--serif)',
      fontSize: 17,
      lineHeight: 1.55
    }
  }, "In Erd\u0151s's elementary proof of ", /*#__PURE__*/React.createElement(Tex, {
    tex: "\\vartheta(x) \\le x \\log 4"
  }), ", the odd-step inequality is derived from the symmetry-based binomial bound ", /*#__PURE__*/React.createElement(Tex, {
    tex: "\\binom{2n+1}{n} \\le 4^n"
  }), ". Two routes to this bound have surfaced and converge on the same proof state.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      background: 'var(--paper-deep)',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Label, null, "FORMALITY CURSOR"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: 'relative',
      height: 24,
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 2,
      background: 'var(--hairline)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      width: '45%',
      height: 2,
      background: 'var(--accent)'
    }
  }), [1, 2, 3, 4, 5].map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      position: 'absolute',
      left: `${i * 25}%`,
      transform: 'translateX(-50%)',
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: i <= 1 ? 'var(--accent)' : 'var(--paper)',
      border: '1px solid var(--hairline)'
    }
  })), [1, 2, 3, 4, 5].map((n, i) => /*#__PURE__*/React.createElement("span", {
    key: n + 'l',
    style: {
      position: 'absolute',
      top: 18,
      left: `${i * 25}%`,
      transform: 'translateX(-50%)',
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: i === 1 ? 'var(--accent)' : 'var(--ink-muted)'
    }
  }, n))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13
    }
  }, "structured")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Label, null, "DISPLAY"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 16,
      marginTop: 6,
      color: 'var(--ink-muted)'
    }
  }, "Click a path in the graph to replace the focused pad below."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement(Label, null, "ATTEMPT GRAPH"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 18,
      fontWeight: 500,
      marginTop: 6
    }
  }, "Five prose steps, with colliding attempts overlaid"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 14,
      color: 'var(--ink-muted)',
      marginTop: 6
    }
  }, "The large dots are the stable prose steps. Thicker edges mean more formal material is packed between the two steps; the cursor fades out edges below the chosen level."), /*#__PURE__*/React.createElement(AttemptGraph, {
    focused: focused,
    onPick: setFocused
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 14,
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25CF common prose step"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "\u25CF collision"), /*#__PURE__*/React.createElement("span", null, "\u2501 more Lean detail hidden between steps"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent)'
    }
  }, "\u2501 draft branch")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      background: 'var(--paper-deep)',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      padding: '20px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Label, null, "FOCUSED PATH DISPLAY"), /*#__PURE__*/React.createElement(Pill, {
    state: "accepted"
  }, "accepted")), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--serif)',
      fontWeight: 500,
      fontSize: 20,
      margin: '6px 0 0'
    }
  }, "@kira_m \xB7 parity split scaffold"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 15,
      color: 'var(--ink-muted)',
      margin: '4px 0 18px'
    }
  }, "The five prose steps from the IDE, kept close to the Erd\u0151s-style odd case."), /*#__PURE__*/React.createElement(Step, {
    n: 1,
    sub: "\xA75.1",
    title: /*#__PURE__*/React.createElement("span", null, "apply \xA703(ii): ", /*#__PURE__*/React.createElement(Tex, {
      tex: "\\binom{2n+1}{n} \\le 4^n"
    })),
    status: "stub",
    body: "Use the odd central-binomial estimate already isolated in \xA703(ii).",
    discussions: [{
      author: 'h.brown',
      kind: 'human',
      color: 'blue',
      ago: '2d',
      body: /*#__PURE__*/React.createElement("span", null, "Try the symmetry trick first \u2014 ", /*#__PURE__*/React.createElement(Tex, {
        tex: "\\binom{2n+1}{n} = \\binom{2n+1}{n+1}"
      }), ", so ", /*#__PURE__*/React.createElement(Tex, {
        tex: "2 \\binom{2n+1}{n} \\le 2^{2n+1}"
      }), ", giving the bound without restructuring \xA704. I'll post a sketch.")
    }, {
      author: 'Kernel',
      kind: 'agent',
      glyph: 'K',
      ago: '6h',
      body: 'Verified the odd binomial bound entry point against the current Lean environment.'
    }]
  }), /*#__PURE__*/React.createElement(Step, {
    n: 2,
    sub: "\xA75.2",
    title: /*#__PURE__*/React.createElement("span", null, "invoke \xA702 at ", /*#__PURE__*/React.createElement(Tex, {
      tex: "2n+1"
    }), ": each prime ", /*#__PURE__*/React.createElement(Tex, {
      tex: "n+1 < p \\le 2n+1"
    }), " divides ", /*#__PURE__*/React.createElement(Tex, {
      tex: "\\binom{2n+1}{n}"
    })),
    status: "stub",
    body: /*#__PURE__*/React.createElement("span", null, "Transfer the divisibility lemma to the interval ", /*#__PURE__*/React.createElement(Tex, {
      tex: "n+1 < p \\le 2n+1"
    }), "."),
    discussions: [{
      author: 'Decomposer',
      kind: 'agent',
      glyph: '△',
      ago: '10h',
      body: 'This substep is the exact §02 reuse: instantiate the prime-divisibility lemma at 2n+1.'
    }]
  }), /*#__PURE__*/React.createElement(Step, {
    n: 3,
    sub: "\xA75.3",
    title: /*#__PURE__*/React.createElement("span", null, "take logs: ", /*#__PURE__*/React.createElement(Tex, {
      tex: "\\prod_p p \\le C \\Rightarrow \\vartheta(2n+1) - \\vartheta(n+1) \\le \\log \\binom{2n+1}{n}"
    })),
    status: "collision",
    body: "Replace the prime product by the binomial coefficient and take logs.",
    discussions: [],
    last: true
  }))), /*#__PURE__*/React.createElement("aside", {
    style: {
      padding: '28px 24px',
      background: 'var(--paper-deep)',
      borderLeft: '1px solid var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement(DAGMini, {
    here: "odd"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      padding: '14px 16px'
    }
  }, /*#__PURE__*/React.createElement(Label, null, "TRY FROM CURRENT PATH"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 14,
      lineHeight: 1.5,
      marginTop: 6
    }
  }, "Forks @kira_m's focused path into the IDE with the five-step scaffold preserved."), /*#__PURE__*/React.createElement(Btn, {
    variant: "dark",
    onClick: () => window.__nav('ide'),
    style: {
      marginTop: 8
    }
  }, "+ try in IDE \u2192")), /*#__PURE__*/React.createElement(Label, {
    style: {
      marginTop: 24,
      marginBottom: 10
    }
  }, "PATH FOCUS"), /*#__PURE__*/React.createElement(PathPick, {
    letter: "K",
    color: "green",
    name: "@kira_m",
    sub: "parity split scaffold",
    active: true
  }), /*#__PURE__*/React.createElement(PathPick, {
    letter: "H",
    color: "blue",
    name: "@h.brown",
    sub: "symmetry trick"
  }), /*#__PURE__*/React.createElement(PathPick, {
    letter: "A",
    color: "yellow",
    name: "@aria.p",
    sub: "ceiling fold sketch"
  }), /*#__PURE__*/React.createElement(Label, {
    style: {
      marginTop: 24,
      marginBottom: 10
    }
  }, "THIS PROOF STATE APPEARS IN"), /*#__PURE__*/React.createElement(RailRow, {
    main: "/chebyshev-theta-bound",
    meta: "native \xB7 \xA705"
  }), /*#__PURE__*/React.createElement(RailRow, {
    main: "/bertrand-elementary",
    meta: "cited as lemma 4.2"
  }), /*#__PURE__*/React.createElement(Label, {
    style: {
      marginTop: 24,
      marginBottom: 10
    }
  }, "LINKED OPEN PROBLEMS"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 14
    }
  }, "\u25CB Sharp constant for \u03D1-bound below log 4"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      marginLeft: 12
    }
  }, "7 watchers \xB7 12 attempts"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 14,
      marginTop: 8
    }
  }, "\u25CB Mertens \xA73 elementary proof"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      marginLeft: 12
    }
  }, "4 watchers \xB7 5 attempts"), /*#__PURE__*/React.createElement(Label, {
    style: {
      marginTop: 24,
      marginBottom: 10
    }
  }, "CONTRIBUTORS"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    letter: "K",
    color: "green",
    size: 26
  }), /*#__PURE__*/React.createElement(Avatar, {
    letter: "H",
    color: "blue",
    size: 26
  }), /*#__PURE__*/React.createElement(Avatar, {
    letter: "A",
    color: "yellow",
    size: 26
  })))));
}
function Step({
  n,
  sub,
  title,
  status,
  body,
  discussions,
  last
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 24px 1fr',
      gap: 0,
      padding: '14px 0',
      borderTop: '1px dashed var(--hairline)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }
  }, "STEP ", n, " \xB7 ", sub), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 17,
      fontWeight: 500,
      marginTop: 4
    }
  }, title, " ", status === 'collision' && /*#__PURE__*/React.createElement(Pill, {
    state: "collision"
  }, "COLLISION")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Dots, {
    value: status === 'stub' ? 4 : 3,
    state: status === 'stub' ? 'stub' : status === 'collision' ? 'accent' : 'verified'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: status === 'stub' ? 'var(--stub)' : status === 'collision' ? 'var(--accent)' : 'var(--ink-muted)'
    }
  }, status === 'stub' ? 'Lean stub' : status === 'collision' ? 'semi-formal' : 'semi-formal')), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 15,
      marginTop: 10,
      color: 'var(--ink)'
    }
  }, body), /*#__PURE__*/React.createElement(Btn, {
    variant: "default",
    style: {
      marginTop: 10,
      fontSize: 12
    }
  }, "try this step")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '4px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      flex: 1,
      background: 'var(--accent)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: 'var(--accent)',
      margin: '4px 0'
    }
  }), !last && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      flex: 1,
      background: 'var(--accent)'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Label, null, "DISCUSSION \xB7 ", discussions.length), discussions.length === 0 ? /*#__PURE__*/React.createElement(Watermark, {
    height: 92
  }, "No discussion attached to this step yet.") : discussions.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      marginTop: 10,
      display: 'flex',
      gap: 10
    }
  }, d.kind === 'agent' ? /*#__PURE__*/React.createElement(Avatar, {
    agent: true,
    letter: d.glyph,
    agentBg: d.glyph === 'K' ? 'var(--ink)' : 'var(--agent-ink)',
    size: 26
  }) : /*#__PURE__*/React.createElement(Avatar, {
    letter: d.author.charAt(0).toUpperCase(),
    color: d.color,
    size: 26
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: d.kind === 'agent' ? 'var(--mono)' : 'var(--serif)',
      fontSize: 14,
      fontWeight: 500,
      color: d.kind === 'agent' ? d.glyph === '△' ? 'var(--verified)' : 'var(--accent)' : 'var(--ink)'
    }
  }, d.author), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-muted)'
    }
  }, d.ago)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 14,
      lineHeight: 1.5,
      marginTop: 2
    }
  }, d.body))))));
}
function PathPick({
  letter,
  color,
  name,
  sub,
  active
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 12px',
      background: active ? 'var(--accent-tint)' : 'transparent',
      borderRadius: 4,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    letter: letter,
    color: color,
    size: 26
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13
    }
  }, name), /*#__PURE__*/React.createElement(Flourish, {
    size: 12
  }, sub)));
}
function RailRow({
  main,
  meta
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderRadius: 4,
      padding: '8px 10px',
      marginBottom: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13
    }
  }, main), /*#__PURE__*/React.createElement(Flourish, {
    size: 12
  }, meta));
}
function AttemptGraph({
  focused,
  onPick
}) {
  // Clean DOM/SVG hybrid: HTML for row labels, SVG for the graph itself.
  const rows = [{
    id: 'kira',
    handle: '@kira_m',
    sub: 'parity split scaffold',
    status: 'accepted',
    statusColor: 'var(--verified)',
    nodes: [{
      kind: 'on'
    }, {
      kind: 'on'
    }, {
      kind: 'on collision'
    }, {
      kind: 'on'
    }, {
      kind: 'open'
    }],
    edges: 'dashed',
    focused: true
  }, {
    id: 'h',
    handle: '@h.brown',
    sub: 'symmetry trick',
    status: 'Lean checked',
    statusColor: 'var(--verified)',
    nodes: [{
      kind: 'muted'
    }, {
      kind: 'muted'
    }, {
      kind: 'muted'
    }, {
      kind: 'muted'
    }, {
      kind: 'muted'
    }],
    edges: 'solid',
    qed: true
  }, {
    id: 'aria',
    handle: '@aria.p',
    sub: 'ceiling fold sketch',
    status: 'draft',
    statusColor: 'var(--ink-faint)',
    nodes: [{
      kind: 'open'
    }, {
      kind: 'open'
    }, {
      kind: 'open'
    }, {
      kind: 'open dashed'
    }, {
      kind: 'none'
    }],
    edges: 'dotted'
  }];
  const COL = 88; // px per step column
  const STEPS = 5;
  const PAD = 24;
  const W = PAD + STEPS * COL + PAD;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: 'var(--mono)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: 'relative',
      height: 22
    }
  }, [1, 2, 3, 4, 5].map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      position: 'absolute',
      left: PAD + i * COL,
      transform: 'translateX(-50%)',
      fontSize: 11,
      color: 'var(--ink-muted)',
      whiteSpace: 'nowrap'
    }
  }, "\xA75.", n))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      flexShrink: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: 'relative',
      height: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: PAD + 2 * COL,
      transform: 'translateX(-50%)',
      fontSize: 10,
      color: 'var(--accent)',
      whiteSpace: 'nowrap'
    }
  }, "\u2193 collision")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      flexShrink: 0
    }
  })), rows.map(row => /*#__PURE__*/React.createElement(GraphRow, {
    key: row.id,
    row: row,
    COL: COL,
    PAD: PAD,
    STEPS: STEPS
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 16,
      fontSize: 11,
      color: 'var(--ink-muted)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(LegendDot, {
    color: "var(--verified)",
    label: "verified step"
  }), /*#__PURE__*/React.createElement(LegendDot, {
    color: "var(--accent)",
    label: "collision"
  }), /*#__PURE__*/React.createElement(LegendDot, {
    color: "var(--ink-faint)",
    label: "below cursor",
    outline: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 2,
      background: 'var(--accent)'
    }
  }), "focused path (dashed = draft)"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 2,
      background: 'var(--ink-faint)'
    }
  }), "other paths")));
}
function GraphRow({
  row,
  COL,
  PAD,
  STEPS
}) {
  const focused = row.focused;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      background: focused ? 'var(--accent-tint)' : 'transparent',
      borderRadius: 6,
      padding: focused ? '8px 0' : '4px 0',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      flexShrink: 0,
      padding: '4px 12px',
      borderRight: focused ? '1px solid color-mix(in oklab, var(--accent) 30%, transparent)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: focused ? 'var(--ink)' : 'var(--ink-muted)',
      fontWeight: focused ? 500 : 400
    }
  }, row.handle), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontStyle: 'italic',
      fontSize: 12,
      color: 'var(--ink-muted)',
      marginTop: 2
    }
  }, row.sub), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: row.statusColor,
      marginTop: 3,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, row.status)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      position: 'relative',
      minHeight: 36
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "36",
    viewBox: `0 0 ${PAD + STEPS * COL + PAD} 36`,
    preserveAspectRatio: "none",
    style: {
      display: 'block'
    }
  }, row.nodes.slice(0, -1).map((node, i) => {
    const next = row.nodes[i + 1];
    const x1 = PAD + i * COL;
    const x2 = PAD + (i + 1) * COL;
    const showDashed = focused;
    const stroke = focused ? node.kind.includes('on') && next.kind.includes('on') ? 'var(--accent)' : 'var(--accent)' : 'var(--ink-faint)';
    const strokeWidth = focused ? 2 : 1.5;
    const strokeDasharray = focused ? '6 4' : row.edges === 'dotted' ? '2 3' : '0';
    const opacity = next.kind === 'none' ? 0.4 : focused && next.kind === 'open' ? 0.4 : 1;
    if (next.kind === 'none') return null;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: x1 + 8,
      y1: 18,
      x2: x2 - 8,
      y2: 18,
      stroke: stroke,
      strokeWidth: strokeWidth,
      strokeDasharray: strokeDasharray,
      opacity: opacity
    });
  }), row.nodes.map((node, i) => {
    const cx = PAD + i * COL;
    const isFilled = node.kind.includes('on');
    const isCollision = node.kind.includes('collision');
    const isOpen = node.kind.includes('open');
    const isNone = node.kind === 'none';
    const isDashed = node.kind.includes('dashed');
    if (isNone) return null;
    const fill = isCollision ? 'var(--accent)' : isFilled ? focused ? 'var(--accent)' : 'var(--verified)' : 'var(--paper)';
    const stroke = isCollision ? 'var(--accent)' : isFilled ? focused ? 'var(--accent)' : 'var(--verified)' : 'var(--ink-faint)';
    const r = focused ? 11 : 9;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: 18,
      r: r,
      fill: fill,
      stroke: stroke,
      strokeWidth: 1.5,
      strokeDasharray: isDashed ? '2 2' : '0'
    }), /*#__PURE__*/React.createElement("text", {
      x: cx,
      y: 22,
      textAnchor: "middle",
      fontFamily: "var(--mono)",
      fontSize: "11",
      fill: isFilled || isCollision ? 'var(--paper)' : 'var(--ink-muted)'
    }, i + 1));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, row.qed && /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--accent-deep)',
      color: 'var(--paper)',
      fontFamily: 'var(--mono)',
      fontSize: 10,
      fontWeight: 500,
      padding: '5px 9px',
      borderRadius: 11
    }
  }, "QED")));
}
function LegendDot({
  color,
  label,
  outline
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: outline ? 'transparent' : color,
      border: outline ? `1px solid ${color}` : 'none'
    }
  }), label);
}
Object.assign(window, {
  ScreenLemma,
  Step,
  PathPick,
  RailRow,
  AttemptGraph,
  GraphRow,
  LegendDot
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prooftree-app/screen-lemma.jsx", error: String((e && e.message) || e) }); }

// ui_kits/prooftree-app/screen-members-paper.jsx
try { (() => {
/* eslint-disable */
// =============================================================
// Members & Paper screens.
// =============================================================

function ScreenMembers() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    back: true,
    crumbs: [{
      label: 'home',
      onClick: () => window.__nav('fora')
    }, {
      label: 'chebyshev-theta-bound',
      onClick: () => window.__nav('overview')
    }, {
      label: 'members'
    }]
  }), /*#__PURE__*/React.createElement(Tabs, {
    items: [{
      id: 'overview',
      label: 'overview'
    }, {
      id: 'statements',
      label: 'statements',
      count: 6
    }, {
      id: 'document',
      label: 'document'
    }, {
      id: 'threads',
      label: 'threads',
      count: 16
    }, {
      id: 'chat',
      label: 'chat',
      count: 16
    }, {
      id: 'related',
      label: 'related',
      count: 7
    }, {
      id: 'resources',
      label: 'resources'
    }, {
      id: 'members',
      label: 'members',
      count: 8
    }],
    active: "members",
    onChange: t => {
      if (t === 'overview') window.__nav('lemma');
      if (t === 'document') window.__nav('paper');
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '36px 56px',
      maxWidth: 1100
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--serif)',
      fontWeight: 500,
      fontSize: 30,
      margin: 0
    }
  }, "Members \xB7 8"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(Flourish, null, "Collaborators on chebyshev-theta-bound. Online status, current location in the repo, and history of contribution.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [{
    letter: 'R',
    color: 'yellow',
    name: 'Rajarshi Maiti',
    status: 'reading',
    loc: '§05 odd step · reading',
    role: 'maintainer',
    traces: 42
  }, {
    letter: 'C',
    color: 'red',
    name: 'Carl Jontza',
    status: 'editing',
    loc: 'editing §03 lean',
    role: 'maintainer',
    traces: 38
  }, {
    letter: 'K',
    color: 'green',
    name: 'Kira Møller',
    status: 'reading',
    loc: '#§05-odd-step · topic',
    role: 'contributor',
    traces: 31
  }, {
    letter: 'H',
    color: 'blue',
    name: 'H. Brown',
    status: 'offline',
    loc: 'last: §06 · 2d ago',
    role: 'contributor',
    traces: 22
  }, {
    letter: 'N',
    color: '',
    name: 'Nadia R.',
    status: 'reading',
    loc: '§05 fork attempt',
    role: 'contributor',
    traces: 8
  }, {
    agent: 'decomposer',
    name: 'Decomposer',
    status: 'agent',
    loc: 'agent · splitting prose',
    role: 'agent',
    traces: 7
  }, {
    agent: 'tactician',
    name: 'Tactician',
    status: 'editing',
    loc: 'agent · suggesting on §5.3',
    role: 'agent',
    traces: 14
  }, {
    agent: 'kernel',
    name: 'Kernel',
    status: 'reading',
    loc: 'agent · verifying §03',
    role: 'agent',
    traces: 19
  }].map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      background: 'var(--paper)',
      border: '1px solid var(--hairline)',
      borderLeft: `3px solid ${m.status === 'reading' ? 'var(--verified)' : m.status === 'editing' ? 'var(--accent)' : 'transparent'}`,
      borderRadius: 6
    }
  }, m.agent ? /*#__PURE__*/React.createElement(Avatar, {
    agent: true,
    letter: m.agent === 'decomposer' ? '△' : m.agent === 'tactician' ? 'τ' : 'K',
    agentBg: m.agent === 'kernel' ? 'var(--ink)' : 'var(--agent-ink)',
    size: 36
  }) : /*#__PURE__*/React.createElement(Avatar, {
    letter: m.letter,
    color: m.color,
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 17,
      fontWeight: 500
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 12,
      color: 'var(--ink-muted)',
      marginTop: 2
    }
  }, m.loc)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-muted)'
    }
  }, m.role), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-muted)',
      minWidth: 80,
      textAlign: 'right'
    }
  }, m.traces, " traces"))))));
}
function ScreenPaper() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--paper)'
    }
  }, /*#__PURE__*/React.createElement(Topbar, {
    back: true,
    crumbs: [{
      label: 'home',
      onClick: () => window.__nav('fora')
    }, {
      label: 'chebyshev-theta-bound'
    }, {
      label: '§05 odd step',
      onClick: () => window.__nav('lemma')
    }, {
      label: 'my attempt',
      onClick: () => window.__nav('ide')
    }, {
      label: 'paper'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '32px 40px',
      maxWidth: 920,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(Btn, {
    onClick: () => window.__nav('ide')
  }, "\u2190 back to editor"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Btn, null, "export PDF"), /*#__PURE__*/React.createElement(Btn, {
    variant: "primary"
  }, "publish to arXiv \u2197"))), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--serif)',
      fontWeight: 500,
      fontSize: 36,
      lineHeight: 1.2,
      textAlign: 'center',
      margin: 0
    }
  }, "Chebyshev's theta-bound: an elementary proof via central binomials"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Flourish, {
    size: 17
  }, "Rajarshi Maiti, Carl Jontza, Kira M\xF8ller \xB7 2026-05-13")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Label, null, "PROPOSITION"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 18,
      lineHeight: 1.55,
      marginTop: 8
    }
  }, "For all real ", /*#__PURE__*/React.createElement(Tex, {
    tex: "x \\ge 1"
  }), ", the Chebyshev theta function satisfies ", /*#__PURE__*/React.createElement(Tex, {
    tex: "\\vartheta(x) := \\sum_{p \\le x} \\log p \\le x \\log 4."
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Label, null, "PROOF"), /*#__PURE__*/React.createElement("ol", {
    style: {
      listStyle: 'none',
      padding: 0,
      marginTop: 8
    }
  }, [['§01', 'reduction · real to integer.'], ['§02', /*#__PURE__*/React.createElement("span", null, "primes in ", /*#__PURE__*/React.createElement(Tex, {
    tex: "(n, 2n]"
  }), " divide ", /*#__PURE__*/React.createElement(Tex, {
    tex: "\\binom{2n}{n}"
  }), ".")], ['§03', /*#__PURE__*/React.createElement("span", null, "binomial bound \xB7 ", /*#__PURE__*/React.createElement(Tex, {
    tex: "\\binom{2n}{n} \\le 4^n"
  }), ".")], ['§04', /*#__PURE__*/React.createElement("span", null, "even step \xB7 ", /*#__PURE__*/React.createElement(Tex, {
    tex: "\\vartheta(2n) - \\vartheta(n) \\le n \\log 4"
  }), ".")], ['§05', /*#__PURE__*/React.createElement("span", null, "odd step \xB7 ", /*#__PURE__*/React.createElement(Tex, {
    tex: "\\vartheta(2n+1) - \\vartheta(n+1) \\le n \\log 4"
  }), ".")], ['§06', 'strong induction · wrap-up.']].map(([n, txt], i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      marginBottom: 10,
      fontFamily: 'var(--serif)',
      fontSize: 17,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 13,
      color: 'var(--ink-muted)',
      width: 36,
      flexShrink: 0,
      paddingTop: 3
    }
  }, n), /*#__PURE__*/React.createElement("span", null, txt))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement(Label, null, "AGENT PROVENANCE"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 17,
      lineHeight: 1.6,
      marginTop: 8
    }
  }, "Auto-decomposed by ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14
    }
  }, "\u25B3 Decomposer"), " into 5 substeps. Suggestions ramped by ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14
    }
  }, "\u03C4 Tactician"), " across the formality ladder (strategy \u2192 premise \u2192 tactic). Verification by ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14
    }
  }, "K Kernel"), " on Lean 4.12.0 + Mathlib 4.10.0 via ", /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14
    }
  }, "AXLE /check"), ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Label, null, "PROVENANCE"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--serif)',
      fontSize: 17,
      lineHeight: 1.6,
      marginTop: 8
    }
  }, "Generated from repo ", /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14
    }
  }, "chebyshev-theta-bound"), ". Three of six lemmas Lean-verified on Lean 4.12. Two corpus cites resolve to ", /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14
    }
  }, "combinatorics/prime-divides-central-binomial"), " and ", /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14
    }
  }, "combinatorics/binomial-symmetry"), ". All ", /*#__PURE__*/React.createElement("i", null, "\u03B1"), "-canonicalisation hashes (v1) are reproducible from ", /*#__PURE__*/React.createElement("code", {
    style: {
      fontFamily: 'var(--mono)',
      fontSize: 14
    }
  }, "src/lib/proof-state/canonicalize.ts"), " alone \u2014 no external service in the hash path.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      paddingTop: 18,
      borderTop: '1px solid var(--hairline)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Hash, null, "v1:4f9a7c2e8d9b4a1c3f5e7d8a9b2c4d6e8f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c"))));
}
Object.assign(window, {
  ScreenMembers,
  ScreenPaper
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/prooftree-app/screen-members-paper.jsx", error: String((e && e.message) || e) }); }

})();
