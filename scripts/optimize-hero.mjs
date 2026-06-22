// One-off: convert the large hero-area PNGs (hero / ambience / portrait) into WebP.
import sharp from 'sharp'
import path from 'node:path'

const dir = path.resolve('public/assets/nails')
const targets = [
  { in: 'nail-2.png', out: 'hero.webp', w: 1800 },
  { in: 'nail-5.png', out: 'ambience.webp', w: 1200 },
  { in: 'nail-8.png', out: 'portrait.webp', w: 1200 },
]

for (const t of targets) {
  const info = await sharp(path.join(dir, t.in))
    .resize({ width: t.w, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(dir, t.out))
  console.log(`${t.in} -> ${t.out}  ${Math.round(info.size / 1024)}KB`)
}
