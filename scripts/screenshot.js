#!/usr/bin/env node
/**
 * Full-page screenshot of sites/denmark26/index.html
 *
 * Usage:
 *   node scripts/screenshot.js
 *
 * Requires:
 *   - playwright (npm install -g playwright  or  npx playwright install chromium)
 *   - PLAYWRIGHT_BROWSERS_PATH set if browsers live outside the default cache
 *     (e.g. export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers)
 *
 * Output: sites/denmark26/screenshot.png
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const SITE_DIR   = path.resolve(__dirname, '..', 'sites');
const OUT_FILE   = path.resolve(SITE_DIR, 'denmark26', 'screenshot.png');
const PAGE_PATH  = '/denmark26/index.html';
const PORT       = 18734;
const VIEWPORT   = { width: 1440, height: 900 };
const SETTLE_MS  = 5000; // time for Leaflet tiles + fonts to paint

// ── tiny static file server ───────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
};

function serveStatic(req, res) {
  const filePath = path.join(SITE_DIR, req.url.split('?')[0]);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end(); return; }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

// ── main ──────────────────────────────────────────────────────────────────────
(async () => {
  // resolve playwright from global install or local node_modules
  let playwrightPath;
  for (const candidate of [
    '/opt/node22/lib/node_modules/playwright',
    path.resolve(__dirname, '..', 'node_modules', 'playwright'),
    'playwright',
  ]) {
    try { require.resolve(candidate); playwrightPath = candidate; break; } catch {}
  }
  if (!playwrightPath) throw new Error('playwright not found — run: npm install -g playwright');

  const { chromium } = require(playwrightPath);

  const server = http.createServer(serveStatic);
  await new Promise(r => server.listen(PORT, '127.0.0.1', r));
  console.log(`▶ serving ${SITE_DIR} on http://127.0.0.1:${PORT}`);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize(VIEWPORT);

    const url = `http://127.0.0.1:${PORT}${PAGE_PATH}`;
    console.log(`▶ navigating to ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });

    console.log(`▶ waiting ${SETTLE_MS}ms for tiles and fonts…`);
    await page.waitForTimeout(SETTLE_MS);

    await page.screenshot({ path: OUT_FILE, fullPage: true });
    console.log(`✓ screenshot saved → ${OUT_FILE}`);
  } finally {
    await browser?.close();
    server.close();
  }
})().catch(err => { console.error(err); process.exit(1); });
