# Deploy instructions (for Claude Code)

Static site, no build step. Everything needed is in this folder.

## Files
- carl.dc.html / juan.dc.html / raj.dc.html / yola.dc.html — one visit-card page per founder
- index.dc.html — root page listing all four
- support.js — runtime the pages load (required, keep next to the pages)
- _ds/ — design-system CSS + fonts (required)
- assets/photos/ — optimized headshots
- vcards/ — .vcf contact files (photo embedded), served by "save contact"
- .nojekyll — REQUIRED: _ds/ starts with an underscore; Jekyll would silently drop it

## Deploy to GitHub Pages
1. Copy this whole folder to the repo root (include .nojekyll and support.js).
2. Rename pages to clean URLs and fix internal links:
   for f in carl juan raj yola index; do mv "$f.dc.html" "$f.html"; done
   sed -i.bak 's/\.dc\.html/.html/g' *.html && rm -f *.bak
3. Enable Pages (deploy from branch, root). Done.

## QR-code targets (report these back, one per founder)
- https://ORG.github.io/REPO/carl.html
- https://ORG.github.io/REPO/juan.html
- https://ORG.github.io/REPO/raj.html
- https://ORG.github.io/REPO/yola.html

## Wiring left for you
- **Add to Wallet**: each card links to passes/NAME.pkpass (not included). Generating a signed .pkpass needs an Apple Pass Type ID certificate — create the four passes and drop them at those paths. Until then the button 404s; to hide it instead, set the page's showWallet prop default to false (search "showWallet" in each page).
- **download pdf**: opens the browser print dialog; a print stylesheet in the page strips the buttons. Nothing to do.
- **save contact**: plain link to the .vcf. Nothing to do.

## Notes
- Fonts come from Google Fonts via @import in _ds/.../colors_and_type.css (network required — fine on Pages).
- Juan's photo is 300×300, the best available in the deck. If a higher-res one turns up, replace assets/photos/juan.jpg and re-embed it in vcards/juan.vcf (base64 JPEG in the PHOTO line).
