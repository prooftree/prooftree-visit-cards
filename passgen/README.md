# Wallet pass generation

One founder card, three formats: Apple Wallet (`.pkpass`), Google Wallet
(save-link, covers Android **and Samsung** phones), and PDF (`pdf/<id>.pdf`,
already built). Design source: `wallet-cards.html` + `wallet-pass-spec.md`.

## Apple Wallet — `apple/`

`<id>.pass.json` are the finished pass definitions (colors, fields, QR →
`hi.prooftree.ai/<id>`). `TEAMID` is a placeholder replaced at build time.

You need (once): an [Apple Developer Program](https://developer.apple.com)
membership, a **Pass Type ID** `pass.ai.prooftree.card`, and its certificate —
export as `signerCert.pem` + `signerKey.pem`, plus Apple's WWDR G4 as
`wwdr.pem`. Exact commands are in the header of `apple/sign.sh`. Then:

```sh
TEAM_ID=<your team id> ./apple/sign.sh
```

Output: `passes/{carl,juan,raj,yola}.pkpass`. Distribute by **email attachment,
AirDrop, or Files** — those open straight into Wallet.

> ⚠ GitHub Pages serves `.pkpass` as `application/octet-stream`, but iOS Safari
> requires `application/vnd.apple.pkpass`. Don't rely on the Pages URLs for
> in-Safari installs; email/AirDrop the files, or host them on Netlify/a
> Cloudflare Worker with the correct Content-Type, then re-enable the cards'
> "add to wallet" buttons (`showWallet` prop in `<id>.html`) pointing there.

## Google Wallet (Android + Samsung) — `google/`

You need (once): a [Google Wallet issuer account](https://pay.google.com/business/console),
a GCP service account with the Wallet API enabled and issuer access, and its
JSON key. Then:

```sh
GOOGLE_WALLET_ISSUER_ID=<issuer id> node google/make-links.js service-account.json
```

Prints one stable **"Save to Google Wallet" link per founder** — send each
founder theirs (works in any messenger/email; adds the card on tap). Samsung
phones ship with Google Wallet, so this covers them. Native *Samsung Wallet*
passes exist but require the Samsung Wallet partner program (business
onboarding at partner.walletsvc.samsung.com) — not worth it unless someone
specifically asks.

## No-credentials routes (what founders can do today)

The PDFs in `pdf/` cannot be imported into a wallet directly — Apple and Google
only accept their native pass formats. But the QR *on* the card can become a
pass without our signing pipeline:

- **Android / Samsung**: Google Wallet's "Everything else" section — photograph
  the card (or a screenshot of the PDF); Wallet extracts the QR and builds a
  pass. Available now.
- **iPhone, today**: a third-party app such as Pass2U Wallet scans the QR and
  emits a `.pkpass` signed under *their* certificate. Free tier is enough for
  one card; the data lives with that third party.
- **iPhone, from iOS 27**: Apple is adding a native "Create a Pass" button to
  Wallet — scan any QR, get a pass, no developer account. Announced June 2026,
  shipping with iOS 27.

Trade-off: all three produce a *generic* pass — the QR plus a label, not the
burgundy card with photo, name and role. Only the signed pipeline above yields
the branded design. Given iOS 27, it is reasonable to use these free routes now
and enrol in the Apple Developer Program only if the branded pass is wanted.

## Fallback that always works

Every phone that can scan a QR can open `https://hi.prooftree.ai/<id>` and
"save contact" (vCard) — wallets are a convenience layer on top.

**Never commit** `*.pem`, `*.p12`, `*.key`, or `service-account*.json`
(gitignored here).
