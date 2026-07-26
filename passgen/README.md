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

## Fallback that always works

Every phone that can scan a QR can open `https://hi.prooftree.ai/<id>` and
"save contact" (vCard) — wallets are a convenience layer on top.

**Never commit** `*.pem`, `*.p12`, `*.key`, or `service-account*.json`
(gitignored here).
