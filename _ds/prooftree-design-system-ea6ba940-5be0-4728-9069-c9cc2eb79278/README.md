# ProofTree Design System

> *Your math, fading into the wider world ↓*

ProofTree is a **social reasoning space and reasoning substrate for mathematics**. It's a content-addressed graph where statements, drafts, formal proofs (Lean), and the discussions around them live as one persistent object. Built for working mathematicians, with AI as a quiet collaborator — never a co-author.

The aesthetic claim: **it looks like a serious mathematics journal that happens to be alive** — editable, conversational, AI-assisted — rather than a SaaS product that happens to render LaTeX. The reader test: a 60-year-old number theorist should recognize it as a journal page within two seconds; a 25-year-old who uses ChatGPT casually should feel AI is present but not pushy.

---

## Product surface

ProofTree is a single web product with several first-class views around a project (an open "repo" of mathematics):

| Surface | What it is |
|---|---|
| **The Fora** (`/`) | Home / feed. Algorithm-picked threads, statements, collisions across the tree. |
| **Project Overview** | Per-project dashboard: open threads, statements grid, paper builder, salons, "might be relevant." |
| **Statements** | Grid of every proof target in a project (status, attempts, contributors). |
| **Lemma page** | The atomic unit: a single statement + its attempts graph + focused path display. |
| **Attempt IDE** | Three-pane: outline / TeX / Lean — with agents rail (△ Decomposer, τ Tactician, K Kernel). |
| **Threads** | Discussion anchored to a lemma, step, or fora-level. |
| **Chat** | Salons (`#§05-odd-step`, `#lean-formalization`) — Slack-shaped but quieter. |
| **Document builder** | Drop statements into a paper class (amsart, elsarticle…) → export `.tex` / `.pdf` / arXiv. |
| **Related** | Faceted "might be relevant" — statements, threads, projects with match-on and scope filters. |
| **Resources** | Bibliography, linked repos, files & uploads. |
| **Members** | Humans + agents in the project, with presence and trace count. |
| **Paper viewer** | Read-only typeset proof with agent provenance + `α-canonicalisation hashes`. |

There is **one product**. There is no separate marketing site in scope; chrome is shared.

---

## Sources used to build this design system

All sources for this v1 came from the human-attached uploads in `uploads/` — 18 screenshots of the live product spanning the Fora, project overview, statements grid, document builder, threads, chat, related, resources, members, lemma page, attempt IDE, and the published paper viewer.

The **implementation repo** is now available: [`github.com/prooftree/lemmafora`](https://github.com/prooftree/lemmafora) — a Vite + React 18 app. Its conventions (tokens, class vocabulary, component API, routing) are captured in **`PORTING.md`** and mirrored in **`repo-bridge.css`** so designs made here drop in with minimal translation.

> **⚠ The repo and this design system are on different visual registers.** The live repo uses the earlier **warm-paper / EB-Garamond / terracotta** aesthetic (and has a dark mode). This project's v2.1 work moved to a cooler **off-white / Newsreader / burgundy** register. `PORTING.md` ends with an A/B/C decision the user needs to make about which is the source of truth going forward.

---

## Implementation & porting

To turn a design in this project into production code in `lemmafora`:

| File | Purpose |
|---|---|
| **`PORTING.md`** | The crosswalk. Token map, class vocabulary, component API (ours → repo), navigation contract (`go({route})`), file map, and a step-by-step port workflow. **Read this first before porting anything.** |
| **`repo-bridge.css`** | A faithful mirror of the repo's live `global.css` tokens + reusable utility classes (`.btn`, `.tg.good`, `.statement`, `.eye`, `.formality`, `.avatar.agent-*`…). Author a page against this and it previews exactly as it'll render in lemmafora. |

**Rule:** for drop-in work, build against `repo-bridge.css` + repo class names; for forward-looking proposals, build against `colors_and_type.css` (the v2.1 direction). Never mix the two in one page.

---

## Index

| File | Purpose |
|---|---|
| `README.md` | This file. Product context, content fundamentals, visual foundations, iconography. |
| `PORTING.md` | **Crosswalk to the `lemmafora` repo** — tokens, classes, components, routing, port workflow. |
| `repo-bridge.css` | Drop-in mirror of the repo's live tokens + utility classes. Use for production-bound pages. |
| `SKILL.md` | Agent SKILL manifest — make this folder usable as a Claude Code skill. |
| `colors_and_type.css` | v2.1 token layer (`--paper`, `--ink`, `--accent`…) + semantic styles. The forward-looking register. |
| `fonts/` | Newsreader (body serif), Inter Tight (UI sans), JetBrains Mono (mono). |
| `assets/` | Logos, agent glyphs, status icons, the wordmark in SVG. |
| `preview/` | Design-system cards rendered to the Design System tab. |
| `ui_kits/prooftree-app/` | Hi-fi React recreation of the core app: Fora, Lemma page, IDE, Members. |

---

## Content fundamentals

ProofTree's voice is the voice of a **mathematics journal that talks to you**. It is **literate, terse, and precise.** It does not vamp.

### Tone

- **Mathematician-to-mathematician.** Assume the reader knows what a lemma is, what Lean is, what `theta(x)` means. Don't gloss.
- **Earned warmth, not enthusiasm.** Italic asides are allowed and welcome ("*your math, fading into the wider world ↓*", "*tailored to you* — algorithm-picked from across the tree · click any card to drill in"). Exclamation marks are not.
- **The author is the system, not the marketer.** Copy describes what *is*, not what's *new* or *exciting*. "Collaborators on chebyshev-theta-bound. Online status, current location in the repo, and history of contribution." — that's the register.
- **No SaaS verbs.** Never "unlock," "supercharge," "powerful," "seamless," "delight," "magic." If a sentence could appear on a Stripe landing page, rewrite it.

### Casing

- **Sentence case for prose,** including buttons and headings (`back to lemma`, `open builder`, `+ new statement`, `Exercise 1 · linear normalisation to the standard basis`).
- **`LOWERCASE TRACKED` in mono for structural labels** — `OUTLINE`, `STATEMENT`, `DISCUSSION · 2`, `PATH FOCUS`, `LINKED OPEN PROBLEMS`, `THIS PROOF STATE APPEARS IN`. These are the "journal's small caps." Use `font-family: var(--mono)`, `text-transform: uppercase`, `letter-spacing: 0.08em`, `color: var(--ink-muted)`.
- **lowercase mono for chrome and tags** — tab names (`overview`, `statements`, `document`), tags (`#§05-odd-step`, `analytic-nt`), filenames (`/chebyshev-theta-bound`), buttons that name an action (`+ try in IDE →`, `▷ run Kernel`, `τ ask Tactician`).
- **Title Case is rare.** Reserved for proper names (`The Fora`, `Decomposer`, `Tactician`, `Kernel`, `Rajarshi Maiti`).

### Pronouns

- **No "we." No "you" addressed at the user as a customer.** The interface does not refer to itself.
- When the system must surface its own action, name the agent: "Decomposer · 10h — This substep is the exact §02 reuse: instantiate the prime-divisibility lemma at 2n+1." Not "I think you should…"
- User-authored content is owned by handle: `@kira_m`, `@carl`, `@h.brown`. Display name uses full real name in member contexts (`Rajarshi Maiti`, `Carl Jontza`, `Kira Møller`).

### Emoji

**No emoji. Anywhere.** Use unicode mathematical operators, geometric shapes, and arrows instead — they're typographically of the same family as the rest of the page:

- `∀` (the wordmark glyph), `△ τ K` (agent glyphs), `▷` (run kernel)
- `→ ← ↓ ↑` for navigation arrows in inline text
- `·` (middle dot) as separator: `Maiti, Jontza, Møller · 2026-05-13`, `§05 odd step · reading`
- `§` for sections (`§05`, `§5.1`)
- `✓` for verification, never `✅`
- `⌈ ⌉ ⌊ ⌋` for ceiling/floor in copy outside math: `fold via ⌈·/2⌉ vs parity split`

### Specific phrases and patterns

These are signature copy moves — preserve them when writing new strings:

- **Status pills are nouns or past participles:** `draft`, `Lean checked`, `Lean stub`, `collision`, `accepted`, `open`, `unverified · draft`.
- **"Try" not "Edit"** for derivative actions: `+ try in IDE →`, `try this step`.
- **`+` prefix on creation actions:** `+ new project`, `+ new statement`, `+ new thread`, `+ upload`, `+ invite`.
- **`→` suffix on navigations that open a new view:** `open →`, `full feed →`, `see all →`.
- **The italic flourish line** sits under a header or section title in `var(--serif)` italic, `var(--ink-muted)`. One per page maximum. Example: under "The Fora" → "*your math, fading into the wider world ↓*"; under "Members · 8" → "*Collaborators on chebyshev-theta-bound. Online status, current location in the repo, and history of contribution.*"
- **Agent output is always tagged** with the agent's glyph + name + level + confidence: `LEVEL: SEMI-FORMAL` `CONF 0.85`.
- **Provenance is a sentence, not a list:** "*Auto-decomposed by △ Decomposer into 5 substeps. Suggestions ramped by τ Tactician across the formality ladder (strategy → premise → tactic). Verification by K Kernel on Lean 4.12.0 + Mathlib 4.10.0 via AXLE /check.*"
- **Content hashes are visible:** `v1:4f9a7c2e8d…` in mono at the bottom of any verified artifact.

---

## Visual foundations

### Color

Pulled directly from the brief and verified against the screenshots. **No pure white. No saturated brights. No gradients.**

```
paper          #ECE5D0    base background, all surfaces
paper-deep     #E3DCC4    recessed panels, sidebars, the IDE rail
ink            #1A1612    primary text (warm near-black)
ink-muted      #7A6F60    secondary text, metadata, mono labels
ink-faint      #B3A993    placeholders, divider labels, empty-state copy
hairline       #D8CFB8    borders, rules — the only divider color
accent         #9A3D2F    primary actions, links, the collision state
accent-deep    #6B2A20    hover, pressed
verified       #5B7A4F    Lean-checked green, muted
stub           #A88A3F    Lean-stub amber, muted
agent-ink      #2C3E3A    agent glyph background (slight desaturation from ink)
```

Human-identity colors (avatars only, not status):

```
ident-yellow   #C9A227
ident-green    #5B7A4F   (shares with verified — intentional)
ident-blue    #3D6A8C
ident-red     #9A3D2F   (shares with accent — intentional)
```

### Type

- **Body & display:** **Newsreader** (already in use). 18px minimum on reading surfaces. Italic is heavily used for asides — Newsreader's italic is the entire point of choosing it.
- **UI sans:** **Inter Tight**, weight 500. Used **only** for chrome and as a fallback when mono is too dense. Uppercase tracked labels can also use it at `+0.02em`.
- **Mono:** **JetBrains Mono** (substitute for Berkeley Mono — see Caveats). Used for hashes, tags, paths, code, Lean source, structural labels. **Never for body text.**
- **Math:** KaTeX with Latin Modern (or STIX Two Math). Variables italic, operators upright. **Never Times.**

Type scale (relative to a 16px root):

```
display    32px   1.18    Newsreader, 500    — page H1 ("The Fora", "Statements · chebyshev-theta-bound")
title      22px   1.3     Newsreader, 500    — card titles, statement headlines
body       18px   1.55    Newsreader, 400    — all prose
small      15px   1.5     Newsreader, 400    — secondary prose
label      11px   1.2     JetBrains Mono, 0.08em tracking, uppercase — structural labels
chrome     13px   1.3     JetBrains Mono     — tags, tabs, button mono content
mono       14px   1.5     JetBrains Mono     — code, hashes, Lean source
```

### Spacing & rhythm

Vertical rhythm is tied to the **body line-height (28px)**. Spacing tokens are multiples of 4 anchored to that baseline:

```
space-1   4px       hairline-adjacent gaps
space-2   8px       chip internal padding, dense lists
space-3   12px      label-to-content gap
space-4   16px      compact section gap
space-5   24px      default section gap
space-6   32px      page-section breather
space-7   48px      large block separator
space-8   64px      page top padding
```

**Generous margins.** Page content lives in a centered column ~720–780px wide on lemma pages; ~1280px effective max on dashboard/grid views with the right rail. Side gutters are never less than `var(--space-6)`.

### Borders & dividers

- **Hairlines only.** `1px solid var(--hairline)`. No 2px outlines, no double rules.
- **Dashed for "not yet" / drop targets.** `1px dashed var(--accent)` for `↓ drop a statement here`, `↓ drop files here`, "live thumbnail" placeholders. `1px dashed var(--hairline)` for `+ new project`.
- **The burgundy left rail** is the focus signature. `border-left: 3px solid var(--accent)` on the active statement card (the one being read), the active discussion thread, and the "this proof state" emphasis card. Sparing.
- **The status left rail on avatar cards** — `border-left: 3px solid var(--verified | --accent | transparent)`. This is the **presence indicator**: green = present and reading, burgundy = present and editing, none = offline. Agent avatars share this system; agents are always "present."

### Cards

Three card patterns. Use exactly these three.

1. **Hairline card** — `background: var(--paper); border: 1px solid var(--hairline); border-radius: 6px; padding: 20px 24px;`. Default card.
2. **Recessed card** — `background: var(--paper-deep); border: 1px solid var(--hairline);`. Used for sidebars, the IDE outline rail, the "agents · 3 online" panel.
3. **Statement card** — hairline card + `border-left: 3px solid var(--accent)`. Used for the focused/active statement and any "this is the one to read" emphasis.

**Radius:** `6px` everywhere. **No 12px+ rounded cards.** Pill chips and status badges use `radius: 4px`.

### Shadows

**There are no shadows.** One hairline border is the entire elevation system. If you reach for a `box-shadow`, you are doing something wrong — find a different way (rule, color step, indent).

### Backgrounds & imagery

- **Solid `--paper` everywhere.** No textures, no noise, no paper-grain SVG. The color is doing the work.
- **No imagery in v1 chrome.** The product itself is the imagery. Reserve for paper figures (which are user content, not chrome).
- **Math is the visual.** Big rendered KaTeX expressions function as the hero of a card.

### Animation

- **Sparing and short.** 120–180ms ease-out for hover state transitions, opacity, and color. 200ms ease-out for panel expand/collapse.
- **No bouncing, no springs, no parallax, no scroll-jacking.**
- **Path focus changes** (when the user clicks a different attempt in the graph) are a 200ms cross-fade of the focused-path card content — never a slide.
- Default easing: `cubic-bezier(0.2, 0.0, 0.2, 1)`.

### Hover & press

- **Links and inline copy:** `color: var(--accent-deep)` on hover (from `--accent`), underline appears on hover only.
- **Buttons (secondary):** background steps from `--paper` to `--paper-deep` on hover; text color unchanged. On press, background `--paper-deep` darkens 4%.
- **Buttons (primary, burgundy):** `--accent` → `--accent-deep` on hover. No shrink, no shadow.
- **Cards:** the entire card lifts background `--paper` → `--paper-deep` on hover; cursor `pointer`. No transform, no shadow.
- **Avatars:** no hover state on the circle itself; full member tooltip appears on hover over the row.

### Transparency, blur

- **None.** No `backdrop-filter`, no `rgba()` with translucency over backgrounds. The aesthetic is opaque, printed.
- The only place opacity appears is in the **attempt graph**: faded dots (`opacity: 0.4`) for "below the formality level" steps, in `--ink-faint`.

### Layout fundamentals

- **Top bar is 56px tall**, paper background, hairline at the bottom only.
- **Wordmark left,** breadcrumb beside it (`home › chebyshev-theta-bound › §05 odd step`), model selector + `ask ↗` + avatar right.
- **Tab bar (per project)** sits below the top bar, 48px tall, mono labels with counts in muted pill (`statements 6`, `threads 16`, `chat 16`). Active tab gets a `2px solid var(--accent)` bottom border.
- **Right rail is 360px**, fixed, paper-deep background, contains marginal AI suggestions, "linked open problems," "contributors," "people to follow." It's the **journal margin**.
- **Left rail is 240px** when present (chat sidebar, IDE outline). Paper-deep background.

### Status as a four-state system

Every statement, every step, every commit has exactly **one** of:

| State | Color | Pill | Usage |
|---|---|---|---|
| **verified** | `--verified` | `● Lean checked` | Lean kernel has accepted this. |
| **stub** | `--stub` | `● Lean stub` | Statement has a Lean placeholder; not fully proved. |
| **draft** | `--ink-faint` | `📓 draft` (use a small inline doc glyph, not emoji) | Prose only, no Lean state. |
| **collision** | `--accent` | `● collision` | Two contributors converged on the same proof state from different routes — needs reconciliation. |

Do not invent new states. Do not combine states. The dot is a `●` 8px glyph rendered in the state color, inside a `var(--paper)` pill with a `1px solid` border in the same color at 60% opacity.

### Formality dots

A 5-dot scale showing how formal a proof step is, left-to-right: prose → structured → semi-formal → tactic → Lean.

```
●●○○○   prose            (1 of 5)
●●●○○   semi-formal      (3 of 5)
●●●●●   Lean checked     (5 of 5)
```

Filled dots in the appropriate state color; unfilled in `--ink-faint`.

---

## Iconography

ProofTree's icon strategy is **typographic before pictographic.** A character from the math/logic alphabet is almost always preferable to an icon.

### Hierarchy

1. **Unicode mathematical and logical glyphs first.** `∀ ∃ ∈ ∅ ∑ ∏ → ↑ ↓ ← ⌈ ⌉ ⌊ ⌋ § ¶ ▷ • ● ○ △ τ Λ ϑ`. These compose with the type and never look "off-brand."
2. **Agent glyphs** are dedicated: `△` Decomposer, `τ` Tactician, `K` Kernel (rendered as a capital K in mono on the agent-ink circle). These are sacrosanct — do not substitute icons.
3. **Status dots** are `●` and `○` in the state color.
4. **Geometric shapes** for taxonomy: `◆` for statements, `¶` for threads, `△` for projects (yes, same as Decomposer — it's the "branch / decomposition" symbol consistently).
5. **No icon font, no Lucide, no Heroicons** for chrome. The product's restraint is in not using them.
6. **The only proper icons we ship** are tiny SVG affordances where unicode falls short: the document/draft icon (a small 12×14 page glyph), the GPT/model marker (a small lozenge/diamond in mono), and the wordmark `∀ proofTree`. All ship as SVG in `assets/`.

### Strict no-no's (from the brief, repeated)

- **No sparkle, star, robot, or wand icons for AI.** Ever. Agents wear their geometric glyphs.
- **No emoji.** Not in copy, not in chips, not in alerts.
- **No filled "shield" or "lock" trust badges.** Trust is a content hash in mono. That's the entire visual language of trust.

### Wordmark

`∀ proofTree` — the `∀` is set in upright Newsreader at the same size as the word; `proof` is italic Newsreader; `Tree` is upright Newsreader. The `∀` carries actual semantic load ("for all" — the universal quantifier) — it's a logic primitive mathematicians recognize as the right tonal claim. **Do not change it.** Do not redraw the `∀` as an A with bars on the outside. Use the real Unicode character.

---

## What we are not

- **Not Notion.** No blocks-as-primitives, no slash menu, no rainbow palettes, no "templates."
- **Not Linear.** No keyboard-shortcut bravado, no purple, no "fast" affordances.
- **Not Stripe.** No gradient, no card mosaic, no "fintech serif."
- **Not GitHub.** We borrow patterns (issues, PRs, branches in spirit) but the visual register is opposite — paper, not chrome.

**The spiritual references:** Edward Tufte's website. The AMS Notices. Bourbaki frontispieces. nLab. When a designer reaches for a gradient, ask: "would Bourbaki?" The answer is no.

---

## Caveats and asks for the user

1. **Font substitution flag.** The brief specifies **Berkeley Mono** as the preferred mono with **JetBrains Mono** as fallback. Berkeley Mono is paid/licensed — I've used JetBrains Mono throughout. If you have a Berkeley Mono license, drop the `.woff2` files into `fonts/` and switch the `--mono` variable.
2. **Newsreader & Inter Tight** are pulled from Google Fonts. If you have an in-house licensed copy, swap in the local files.
3. **No codebase or Figma** was attached — components in `ui_kits/prooftree-app/` are recreated from screenshots and the tonal brief. They're pixel-faithful but I can't guarantee they match the production component API. Please attach the code or Figma and I'll re-sync.
4. **The "Decomposer green" and "verified green"** are the same token in this system (`--verified`). The brief lists `--agent-ink` separately for agent backgrounds. Confirm this is intended or whether Decomposer should have its own hue.
5. **Dark mode is explicitly v1-out.** When you want it, the brief says sepia/aged-paper, not OLED — we'd derive from `--paper` toward a warm dark `oklch(0.18 0.02 60)`, not toward black.
