// Regenerate the profile kit after editing public/brand/identity.json.
// Run with PLAYWRIGHT_CHANNEL=chrome node scripts/render-brand.cjs.
const { chromium } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const brand = JSON.parse(fs.readFileSync(path.join(root, 'public/brand/identity.json'), 'utf8'));
const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const font = (file) => fs.readFileSync(path.join(root, 'public/brand/fonts', file)).toString('base64');
const css = `@font-face{font-family:Newsreader;src:url(data:font/woff2;base64,${font('newsreader.woff2')});font-weight:700}@font-face{font-family:Plex;src:url(data:font/woff2;base64,${font('ibm-plex-sans.woff2')});font-weight:400}*{box-sizing:border-box}body{margin:0;background:${brand.visual.paper};color:${brand.visual.ink};font-family:Plex,sans-serif}h1{font-family:Newsreader,serif;font-weight:700;letter-spacing:-.025em;margin:0}p{margin:0}svg{display:block}`;
const mark = fs.readFileSync(path.join(root,'public/favicon.svg'),'utf8').replace('<svg ', '<svg width="80" height="80" ');
const layouts = [
  { file:'social-card.png', width:1200,height:630,html:`<main style="padding:76px 80px;height:630px;display:flex;flex-direction:column;justify-content:space-between"><div>${mark}</div><div><h1 style="font-size:82px">${escape(brand.name)}</h1><p style="font-size:31px;margin-top:16px">${escape(brand.role)}</p><p style="font-size:23px;margin-top:28px;color:${brand.visual.muted}">Founder of ${escape(brand.company.name)}</p></div><p style="font-size:22px">chriswiki.com</p></main>`},
  { file:'profile-banner.png', width:1584,height:396,html:`<main style="padding:60px 90px 60px 400px;height:396px;display:flex;flex-direction:column;justify-content:center"><h1 style="font-size:76px">${escape(brand.name)}</h1><p style="font-size:32px;margin-top:16px">${escape(brand.role)}</p><p style="font-size:23px;margin-top:30px">Founder of ${escape(brand.company.name)} · chriswiki.com</p></main>`},
  { file:'avatar.png', width:1024,height:1024,html:`<main style="height:1024px;background:${brand.visual.markInk};display:grid;place-items:center">${mark.replace('width="80" height="80"','width="650" height="650"')}</main>`},
];
(async()=>{
  const browser=await chromium.launch({channel:process.env.PLAYWRIGHT_CHANNEL||undefined});
  try {
    for(const layout of layouts){
      const page=await browser.newPage({viewport:{width:layout.width,height:layout.height},deviceScaleFactor:1});
      await page.setContent(`<html><head><style>${css}</style></head><body>${layout.html}</body></html>`);
      await page.evaluate(()=>document.fonts.ready);
      await page.screenshot({path:path.join(root,'public/brand',layout.file)});
      await page.close();
    }
    fs.copyFileSync(path.join(root,'public/brand/social-card.png'),path.join(root,'public/opengraph-image.png'));
    fs.copyFileSync(path.join(root,'public/favicon.svg'),path.join(root,'public/brand/mark.svg'));
    console.log('Rendered social card, profile banner, avatar, and shared site image.');
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
