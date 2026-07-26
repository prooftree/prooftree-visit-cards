#!/usr/bin/env node
// Create the ProofTree founder cards in Google Wallet and print one
// "Save to Google Wallet" link per founder. Works on any Android phone
// with Google Play services, including Samsung devices.
//
// Prerequisites (one-time):
//   1. Google Wallet issuer account: https://pay.google.com/business/console
//      -> Google Wallet API -> note your Issuer ID (a long number).
//   2. Google Cloud project with the "Google Wallet API" enabled, plus a
//      service account; grant that service account access to the issuer
//      (Wallet console -> Users) and download its JSON key.
//
// Usage:
//   GOOGLE_WALLET_ISSUER_ID=1234567890 node make-links.js /path/to/service-account.json
//
// The links this prints are stable and reusable — send each founder theirs.

const fs = require('fs');
const crypto = require('crypto');

const ISSUER = process.env.GOOGLE_WALLET_ISSUER_ID;
const KEY_FILE = process.argv[2];
if (!ISSUER || !KEY_FILE) {
  console.error('Usage: GOOGLE_WALLET_ISSUER_ID=<id> node make-links.js <service-account.json>');
  process.exit(1);
}
const sa = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));

const SITE = 'https://hi.prooftree.ai';
const FOUNDERS = [
  { id: 'carl', name: 'Carl W. Jontza', role: 'co-CEO', email: 'carl@prooftree.ai',
    linkedin: 'https://www.linkedin.com/in/carl-witold-jontza-3a380115b/' },
  { id: 'juan', name: 'Juan M. Duran', role: 'COO', email: 'juan@prooftree.ai' },
  { id: 'raj', name: 'Raj Maiti', role: 'co-CEO', email: 'raj@prooftree.ai',
    linkedin: 'https://www.linkedin.com/in/1729/' },
  { id: 'yola', name: 'Xuan Yu Yola Zhou', role: 'CFO', email: 'yola@prooftree.ai',
    linkedin: 'https://www.linkedin.com/in/xuan-yu-yola-zhou-83b20431b/' },
];

const b64url = (buf) => Buffer.from(buf).toString('base64url');
function signJwt(claims) {
  const unsigned = `${b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${b64url(JSON.stringify(claims))}`;
  const sig = crypto.createSign('RSA-SHA256').update(unsigned).sign(sa.private_key);
  return `${unsigned}.${b64url(sig)}`;
}

async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  const assertion = signJwt({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/wallet_object.issuer',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  });
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  if (!res.ok) throw new Error(`token exchange failed: ${res.status} ${await res.text()}`);
  return (await res.json()).access_token;
}

// Insert, or ignore 409 (already exists) so the script is re-runnable.
async function upsert(token, url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (res.ok || res.status === 409) return;
  throw new Error(`${url} -> ${res.status} ${await res.text()}`);
}

function genericObject(f) {
  const cardUrl = `${SITE}/${f.id}`;
  const en = (value) => ({ defaultValue: { language: 'en-US', value } });
  const uris = [
    { uri: cardUrl, description: 'Visit card', id: 'card' },
    { uri: 'https://prooftree.ai', description: 'Website', id: 'web' },
    { uri: `mailto:${f.email}`, description: 'Email', id: 'email' },
  ];
  if (f.linkedin) uris.push({ uri: f.linkedin, description: 'LinkedIn', id: 'li' });
  return {
    id: `${ISSUER}.prooftree-card-${f.id}`,
    classId: `${ISSUER}.prooftree-founder-card`,
    state: 'ACTIVE',
    cardTitle: en('ProofTree'),
    header: en(f.name),
    subheader: en(f.role),
    logo: {
      sourceUri: { uri: `${SITE}/assets/wallet/icon-2x.png` },
      contentDescription: en('ProofTree'),
    },
    hexBackgroundColor: '#ECE5D0',
    barcode: { type: 'QR_CODE', value: cardUrl, alternateText: 'hi.prooftree.ai' },
    textModulesData: [{ id: 'email', header: 'EMAIL', body: f.email }],
    linksModuleData: { uris },
  };
}

(async () => {
  const token = await accessToken();
  const api = 'https://walletobjects.googleapis.com/walletobjects/v1';

  await upsert(token, `${api}/genericClass`, { id: `${ISSUER}.prooftree-founder-card` });

  const now = Math.floor(Date.now() / 1000);
  for (const f of FOUNDERS) {
    const obj = genericObject(f);
    await upsert(token, `${api}/genericObject`, obj);
    const saveJwt = signJwt({
      iss: sa.client_email,
      aud: 'google',
      typ: 'savetowallet',
      iat: now,
      payload: { genericObjects: [{ id: obj.id }] },
    });
    console.log(`${f.id}: https://pay.google.com/gp/v/save/${saveJwt}`);
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
