// One-off: optimize the new gallery PNGs (gen-9..16) + booking background to WebP.
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const gdir = path.resolve('public/assets/nails/gallery')
const ndir = path.resolve('public/assets/nails')

// gallery cards -> 720px webp
const files = (await readdir(gdir)).filter((f) => /^gen-(9|1[0-6])\.png$/.test(f))
for (const f of files) {
  const out = f.replace(/\.png$/, '.webp')
  const info = await sharp(path.join(gdir, f))
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(gdir, out))
  console.log(`${f} -> ${out}  ${Math.round(info.size / 1024)}KB`)
}

// booking background -> 1920px webp (full-width section background)
const bg = await sharp(path.join(ndir, 'booking-bg.png'))
  .resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(path.join(ndir, 'booking-bg.webp'))
console.log(`booking-bg.png -> booking-bg.webp  ${Math.round(bg.size / 1024)}KB`)
