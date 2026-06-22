import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-[1600px] items-center justify-between rounded-full border px-5 py-3 transition-all duration-300 md:px-8 ${
          scrolled
            ? 'border-white/10 bg-noir-900/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
            : 'border-transparent bg-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-champagne/40">
            <span className="font-display text-xl italic text-gradient-gold">N</span>
          </span>
          <span className="font-display text-2xl tracking-wide">
            Noir<span className="text-gradient-gold"> Nail</span>
          </span>
        </a>

        <ul className="hidden flex-1 items-center justify-center gap-12 md:flex lg:gap-20">
          {navLinks.slice(0, -1).map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-champagne to-rose-mauve transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#booking"
          className="hidden cursor-pointer rounded-full bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark px-5 py-2.5 text-sm font-semibold text-noir-950 transition-transform duration-200 hover:brightness-110 md:inline-block"
        >
          Записаться
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/15 text-white md:hidden"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`h-px w-5 bg-current transition-all ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
            <span className={`h-px w-5 bg-current transition-all ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-noir-900/95 p-3 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
