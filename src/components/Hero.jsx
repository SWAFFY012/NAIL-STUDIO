import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { RevealWords } from './Reveal'
import { Icon } from './Icons'
import { heroImage } from '../data/content'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Background photo */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: bgScale }}>
        <img
          src={heroImage}
          alt="Ухоженные руки с маникюром на тёмном шёлке"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-noir-950 via-noir-950/80 to-noir-950/20" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-noir-950 via-transparent to-noir-950/60" />
      <div className="absolute inset-0 z-10 vignette" />

      {/* Content */}
      <motion.div style={{ opacity: fade }} className="relative z-20 mx-auto w-full max-w-[1600px] px-6 py-32 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-champagne/30 bg-white/5 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-champagne" />
          <span className="text-xs tracking-luxe text-champagne-light uppercase">Студия красоты премиум‑класса</span>
        </motion.div>

        <h1 className="max-w-4xl font-display text-6xl leading-[1.04] sm:text-7xl md:text-8xl">
          <RevealWords text="Красота" className="block text-white" />
          <RevealWords text="в каждой детали" className="block text-gradient-gold" delay={0.25} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl"
        >
          Noir Nail — это безупречный маникюр, авторский дизайн и атмосфера тишины.
          Час, который вы дарите только себе.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#booking"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark px-7 py-4 text-sm font-semibold text-noir-950 shadow-[0_10px_40px_-10px_rgba(217,189,156,0.6)] transition-all duration-200 hover:brightness-110"
          >
            Записаться онлайн
            <Icon.arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
          <a
            href="#services"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white backdrop-blur-md transition-colors duration-200 hover:border-white/40 hover:bg-white/5"
          >
            Смотреть услуги
          </a>
        </motion.div>

        {/* trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/50"
        >
          <span className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Icon.star key={i} className="h-4 w-4 text-champagne" />
            ))}
            <span className="ml-1">4.9 / 5 — более 2 000 отзывов</span>
          </span>
          <span className="hidden h-4 w-px bg-white/20 sm:block" />
          <span>12 000+ счастливых гостей</span>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/25 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-champagne"
          />
        </div>
      </motion.div>
    </section>
  )
}
