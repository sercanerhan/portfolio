// Converts Codex-generated PNGs (assets-src/generated) into web-ready WebP + the OG share image.
import fs from 'node:fs'
import sharp from 'sharp'

const SRC = 'assets-src/generated', OUT = 'public/images'
fs.mkdirSync(OUT, { recursive: true })

for (const f of fs.readdirSync(SRC).filter((f) => f.endsWith('.png'))) {
  const name = f.replace(/\.png$/, '')
  const info = await sharp(`${SRC}/${f}`).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 76 }).toFile(`${OUT}/${name}.webp`)
  console.log(`${name}.webp`, Math.round(info.size / 1024), 'KB')
}

// 1200×630 share card: generated art on the right, type on the left.
const art = await sharp(`${SRC}/case-deliveryhero.png`).resize(760, 630, { fit: 'cover' }).toBuffer()
const text = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" x2="1"><stop offset="0.35" stop-color="#09090b"/><stop offset="0.75" stop-color="#09090b" stop-opacity="0"/></linearGradient>
    <linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#a5b4fc"/><stop offset="1" stop-color="#67e8f9"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#fade)"/>
  <text x="72" y="120" font-family="Menlo, monospace" font-size="22" fill="#8b8b94" letter-spacing="3">SERCAN.ERHAN</text>
  <text x="72" y="270" font-family="Helvetica Neue, Arial, sans-serif" font-weight="700" font-size="64" fill="#fafafa">I build products</text>
  <text x="72" y="350" font-family="Helvetica Neue, Arial, sans-serif" font-weight="700" font-size="64" fill="url(#g)">that find PMF.</text>
  <text x="72" y="450" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="#a1a1aa">CPO · Basefy Innovation Lab</text>
  <text x="72" y="490" font-family="Helvetica Neue, Arial, sans-serif" font-size="26" fill="#a1a1aa">GIS → smart cities → logistics → healthtech → AI</text>
</svg>`)
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#09090b' } })
  .composite([{ input: art, left: 440, top: 0 }, { input: text, left: 0, top: 0 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile('public/og-image.jpg')
console.log('og-image.jpg')
