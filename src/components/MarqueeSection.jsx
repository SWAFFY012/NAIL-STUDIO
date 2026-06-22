import { useEffect, useRef } from 'react'
import { Reveal } from './Reveal'
import { galleryImages } from '../data/content'

const CARD_W = 240
const CARD_H = 155
const GAP = 18

/**
 * Scroll-driven parallax marquee.
 * Implements the requested formula:
 *   offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
 *   row1 -> translateX(offset - 200)
 *   row2 -> translateX(-(offset - 200))
 * Cards are repeated 3x so the strip is always covered (seamless wrap via modulo).
 */
export default function MarqueeSection() {
  const sectionRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const row1 = row1Ref.current
    const row2 = row2Ref.current
    if (!section || !row1 || !row2) return

    // width of a single (un-repeated) set of cards
    const setWidth = galleryImages.length * (CARD_W + GAP)
    let raf = 0

    const wrap = (x) => {
      // keep translation within [-setWidth, 0) for a seamless 3x loop
      let v = x % setWidth
      if (v > 0) v -= setWidth
      return v
    }

    const update = () => {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + window.scrollY
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const base = offset - 200
      row1.style.transform = `translate3d(${wrap(base)}px,0,0)`
      row2.style.transform = `translate3d(${wrap(-base - setWidth)}px,0,0)`
      raf = 0
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Two rows use ALL unique images in different orders, so nothing repeats on
  // screen and the rows are never mirror copies. Each row is tripled only to
  // keep the strip covered during the seamless scroll loop.
  const row1Set = galleryImages
  const row2Set = [...galleryImages.slice(8), ...galleryImages.slice(0, 8)]
  const row1Items = [...row1Set, ...row1Set, ...row1Set]
  const row2Items = [...row2Set, ...row2Set, ...row2Set]

  const Card = ({ item }) => (
    <figure
      className="group relative shrink-0 cursor-pointer overflow-hidden border border-white/5 transition-all duration-500 ease-out hover:z-30 hover:-translate-y-2 hover:scale-[1.08] hover:border-champagne/30 hover:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)]"
      style={{ width: CARD_W, height: CARD_H, borderRadius: 16 }}
    >
      <img
        src={item.src}
        alt={`${item.title} — работа студии Noir Nail`}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* bottom darkening + caption on hover */}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-noir-950 via-noir-950/75 to-transparent px-4 pb-3.5 pt-12 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <span className="block font-display text-base leading-tight text-white">{item.title}</span>
        <span className="mt-1 block text-[11px] tracking-[0.18em] text-champagne-light uppercase">
          {item.subtitle}
        </span>
      </figcaption>
    </figure>
  )

  return (
    <section ref={sectionRef} id="gallery" className="relative overflow-x-clip py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-7xl px-6 text-center">
        <Reveal>
          <p className="mb-4 text-xs tracking-luxe text-champagne uppercase">наши работы</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl text-white md:text-6xl">
            Вдохновение <span className="text-gradient-gold italic">в каждой детали</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-white/55">
            Листайте страницу — галерея оживает вместе с вами. Реальные работы наших мастеров — без фильтров и ретуши.
          </p>
        </Reveal>
      </div>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-noir-950 to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-noir-950 to-transparent md:w-40" />

      <div className="flex flex-col gap-5 will-change-transform">
        <div ref={row1Ref} className="flex will-change-transform" style={{ gap: GAP }}>
          {row1Items.map((item, i) => (
            <Card key={`r1-${i}`} item={item} />
          ))}
        </div>
        <div ref={row2Ref} className="flex will-change-transform" style={{ gap: GAP }}>
          {row2Items.map((item, i) => (
            <Card key={`r2-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
