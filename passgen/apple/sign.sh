#!/usr/bin/env bash
# Build and sign the four ProofTree founder .pkpass files.
#
# Prerequisites (Apple Developer Program membership):
#   1. developer.apple.com -> Certificates, Identifiers & Profiles -> Identifiers
#      -> new Pass Type ID: pass.ai.prooftree.card
#   2. Create a certificate for that Pass Type ID, download it, import into
#      Keychain (or use openssl directly), and export:
#        signerCert.pem  - the pass certificate
#        signerKey.pem   - its private key
#      From a .p12 export:
#        openssl pkcs12 -in Certificates.p12 -clcerts -nokeys -out signerCert.pem -legacy
#        openssl pkcs12 -in Certificates.p12 -nocerts -nodes  -out signerKey.pem  -legacy
#   3. Apple WWDR G4 intermediate certificate as PEM:
#        curl -sO https://www.apple.com/certificateauthority/AppleWWDRCAG4.cer
#        openssl x509 -inform DER -in AppleWWDRCAG4.cer -out wwdr.pem
#
# Usage:
#   TEAM_ID=AB12CD34EF ./sign.sh [cert-dir]
#     cert-dir: directory containing signerCert.pem, signerKey.pem, wwdr.pem
#               (default: this script's directory; keys are gitignored)
# Output: ../../passes/{carl,juan,raj,yola}.pkpass

set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(cd "$HERE/../.." && pwd)"
CERTDIR="${1:-$HERE}"
: "${TEAM_ID:?Set TEAM_ID to your Apple Developer Team ID (e.g. TEAM_ID=AB12CD34EF ./sign.sh)}"

for f in signerCert.pem signerKey.pem wwdr.pem; do
  [ -f "$CERTDIR/$f" ] || { echo "Missing $CERTDIR/$f — see comments at the top of this script."; exit 1; }
done

ASSETS="$REPO/assets/wallet"
OUT="$REPO/passes"
mkdir -p "$OUT"

for id in carl juan raj yola; do
  build="$(mktemp -d)"
  trap 'rm -rf "$build"' EXIT

  sed "s/TEAMID/$TEAM_ID/" "$HERE/$id.pass.json" > "$build/pass.json"
  cp "$ASSETS/icon.png"              "$build/icon.png"
  cp "$ASSETS/icon-2x.png"           "$build/icon@2x.png"
  cp "$ASSETS/logo.png"              "$build/logo.png"
  cp "$ASSETS/logo-2x.png"           "$build/logo@2x.png"
  cp "$ASSETS/$id-thumbnail.png"     "$build/thumbnail.png"
  cp "$ASSETS/$id-thumbnail-2x.png"  "$build/thumbnail@2x.png"

  # manifest.json: SHA-1 of every file in the bundle
  (cd "$build" && python3 - <<'PY'
import hashlib, json, os
m = {f: hashlib.sha1(open(f, 'rb').read()).hexdigest()
     for f in os.listdir('.') if f != 'manifest.json'}
json.dump(m, open('manifest.json', 'w'), indent=2)
PY
  )

  # Detached PKCS#7 signature over manifest.json
  openssl smime -binary -sign \
    -certfile "$CERTDIR/wwdr.pem" \
    -signer   "$CERTDIR/signerCert.pem" \
    -inkey    "$CERTDIR/signerKey.pem" \
    -in "$build/manifest.json" -out "$build/signature" -outform DER

  rm -f "$OUT/$id.pkpass"
  (cd "$build" && zip -q -j "$OUT/$id.pkpass" pass.json manifest.json signature \
    icon.png icon@2x.png logo.png logo@2x.png thumbnail.png thumbnail@2x.png)
  echo "built $OUT/$id.pkpass ($(wc -c < "$OUT/$id.pkpass") bytes)"
  rm -rf "$build"
done

echo
echo "Done. Distribute by email/AirDrop/Files, or host somewhere that serves"
echo "Content-Type: application/vnd.apple.pkpass (GitHub Pages does NOT — see wallet-pass-spec.md)."
