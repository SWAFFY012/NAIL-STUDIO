import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './Icons'

/**
 * Gorilla-glass dropdown — replaces the plain native <select>.
 * options: [{ value, label }]
 */
export default function GlassSelect({ value, onChange, options, ariaLabel }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const triggerRef = useRef(null)

  const selected = options.find((o) => o.value === value) || options[0]
  const POP_H = Math.min(options.length * 46 + 16, 320)

  const place = useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const spaceBelow = window.innerHeight - r.bottom
    const openUp = spaceBelow < POP_H + 16 && r.top > POP_H + 16
    setCoords({
      left: r.left,
      width: r.width,
      top: openUp ? r.top - POP_H - 8 : r.bottom + 8,
    })
  }, [POP_H])

  const toggle = () => {
    if (!open) place()
    setOpen((v) => !v)
  }

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('scroll', close)
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('scroll', close)
      window.removeEventListener('resize', close)
    }
  }, [open])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-label={ariaLabel}
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-left text-white outline-none transition-colors duration-200 hover:border-white/20 focus:border-champagne/60"
      >
        <span className="truncate">{selected?.label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`shrink-0 text-white/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {createPortal(
        <AnimatePresence>
          {open && coords && (
            <>
              <button
                type="button"
                aria-label="Закрыть список"
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[60] cursor-default"
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'fixed', top: coords.top, left: coords.left, width: coords.width }}
                className="z-[61] overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] p-1.5 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <div className="no-scrollbar max-h-[300px] overflow-y-auto">
                  {options.map((o) => {
                    const active = o.value === value
                    return (
                      <button
                        key={o.value}
                        type="button"
                        onClick={() => {
                          onChange(o.value)
                          setOpen(false)
                        }}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-sm transition-colors duration-150 ${
                          active ? 'bg-champagne/15 text-champagne-light' : 'text-white/80 hover:bg-white/5'
                        }`}
                      >
                        <span className="truncate">{o.label}</span>
                        {active && <Icon.check className="h-4 w-4 shrink-0 text-champagne" />}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
