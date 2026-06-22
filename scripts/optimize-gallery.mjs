// One-off: resize the 4K gallery PNGs into web-friendly WebP files.
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const dir = path.resolve('public/assets/nails/gallery')
const files = (await readdir(dir)).filter((f) => f.endsWith('.png'))

for (const f of files) {
  const src = path.join(dir, f)
  const out = path.join(dir, f.replace(/\.png$/, '.webp'))
  const info = await sharp(src)
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(out)
  console.log(`${f} -> ${path.basename(out)}  ${Math.round(info.size / 1024)}KB`)
}
