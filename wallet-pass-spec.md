# Apple Wallet pass build (for Claude Code)

Goal: one signed .pkpass per founder, served at `passes/<id>.pkpass` on the Pages site — the card pages already link there.

## Assets (in this project)
- `assets/wallet/logo.png` + `logo-2x.png` — wordmark (transparent bg)
- `assets/wallet/icon.png` + `icon-2x.png` — ∀ square
- `assets/wallet/<id>-thumbnail.png` + `-2x` — headshots, square

Rename `*-2x.png` → `*@2x.png` inside the pass bundle (Apple's required naming).

## pass.json per founder (generic style)
```json
{
  "formatVersion": 1,
  "passTypeIdentifier": "pass.ai.prooftree.card",
  "teamIdentifier": "TEAMID",
  "serialNumber": "PT-2026-<01..04>",
  "organizationName": "ProofTree",
  "description": "ProofTree founder card",
  "backgroundColor": "rgb(236,229,208)",
  "foregroundColor": "rgb(26,22,18)",
  "labelColor": "rgb(154,61,47)",
  "generic": {
    "primaryFields": [{ "key": "name", "label": "CO-FOUNDER", "value": "<full name>" }],
    "secondaryFields": [
      { "key": "role", "label": "ROLE", "value": "<co-CEO|COO|CFO>" },
      { "key": "email", "label": "EMAIL", "value": "<id>@prooftree.ai" }
    ],
    "backFields": [
      { "key": "web", "label": "WEBSITE", "value": "https://prooftree.ai" },
      { "key": "card", "label": "CARD", "value": "https://hi.prooftree.ai/<id>" },
      { "key": "li", "label": "LINKEDIN", "value": "<linkedin url, omit for juan>" }
    ]
  },
  "barcode": {
    "format": "PKBarcodeFormatQR",
    "message": "https://hi.prooftree.ai/<id>",
    "messageEncoding": "iso-8859-1",
    "altText": "hi.prooftree.ai"
  }
}
```

Founder data: carl / Carl W. Jontza / co-CEO / linkedin.com/in/carl-witold-jontza-3a380115b — juan / Juan M. Duran / COO / no LinkedIn — raj / Raj Maiti / co-CEO / linkedin.com/in/1729 — yola / Xuan Yu Yola Zhou / CFO / linkedin.com/in/xuan-yu-yola-zhou-83b20431b.

## Signing
Needs an Apple Developer Pass Type ID certificate + WWDR cert. Zip {pass.json, icons, logo, thumbnail, manifest.json (SHA-1s), signature (PKCS#7)}. Use `signpass` or a lib (e.g. `passkit-generator`).

## Caveat — serving from GitHub Pages
Pages serves `.pkpass` as `application/octet-stream`; iOS Safari requires `application/vnd.apple.pkpass` and will not open the pass otherwise. If that bites, serve the passes from a host with correct MIME (Netlify with a `_headers` file, a tiny Cloudflare Worker) and point the cards' "add to wallet" buttons there.

## Google Wallet (optional, Android)
Generic pass via a signed JWT "Save to Google Wallet" link (needs a Google Wallet issuer account). Same fields/colors. Can be a second button later.

---

## Implementation status (Claude Code, 2026-07-26)

Everything above is implemented in `passgen/` — see `passgen/README.md` for the
runbook. Missing inputs are credentials only:

- **Apple**: Pass Type ID certificate (Apple Developer Program) → run
  `passgen/apple/sign.sh`.
- **Google/Android/Samsung**: Wallet issuer account + service-account key → run
  `passgen/google/make-links.js`. (Samsung phones use Google Wallet; native
  Samsung Wallet is a separate partner program.)
- **PDF versions**: already built, in `pdf/<id>.pdf`.
