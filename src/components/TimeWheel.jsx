import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './Icons'

const ITEM_H = 40
const PAD = 2 // spacer rows on each side (visible window = 5 rows)
const POP_H = 344 // approximate popover height, used for flip-up decision

// Studio hours 10:00–20:00, minutes in 5-minute steps
const HOURS = Array.from({ length: 11 }, (_, i) => String(10 + i).padStart(2, '0'))
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0'))

function Column({ items, value, onChange }) {
  const ref = useRef(null)
  const timer = useRef(null)
  const idx = Math.max(0, items.indexOf(value))

  // keep scroll position in sync when value changes externally (e.g. manual input)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = idx * ITEM_H
    if (Math.abs(el.scrollTop - target) > 1) el.scrollTop = target
  }, [idx])

  const onScroll = useCallback(() => {
    const el = ref.current
    if (!el) return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      const i = Math.round(el.scrollTop / ITEM_H)
      const clamped = Math.max(0, Math.min(items.length - 1, i))
      if (items[clamped] !== value) onChange(items[clamped])
    }, 120)
  }, [items, value, onChange])

  return (
    <div
      ref={ref}
      onScroll={onScroll}
      className="no-scrollbar relative h-[200px] flex-1 overflow-y-scroll"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      <div style={{ height: ITEM_H * PAD }} />
      {items.map((it) => (
        <button
          type="button"
          key={it}
          onClick={() => onChange(it)}
          className="flex w-full items-center justify-center"
          style={{ height: ITEM_H, scrollSnapAlign: 'center' }}
        >
          <span
            className={`font-display tabular-nums transition-all duration-200 ${
              it === value ? 'scale-110 text-2xl text-white' : 'text-xl text-white/30'
            }`}
          >
            {it}
          </span>
        </button>
      ))}
      <div style={{ height: ITEM_H * PAD }} />
    </div>
  )
}

export default function TimeWheel({ value = '12:00', onChange }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const [draft, setDraft] = useState(value)
  const triggerRef = useRef(null)
  const [hour, minute] = value.split(':')

  useEffect(() => setDraft(value), [value, open])

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
  }, [])

  const toggle = () => {
    if (!open) place()
    setOpen((v) => !v)
  }

  // close when the page itself scrolls/resizes (NOT the inner wheels — hence no capture)
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

  const setHour = (h) => onChange(`${h}:${minute}`)
  const setMinute = (m) => onChange(`${hour}:${m}`)

  // manual typing: parse "H:MM" / "HH:MM", clamp to valid range + nearest 5 min
  const commitDraft = () => {
    const match = draft.replace(/\s/g, '').match(/^(\d{1,2}):?(\d{0,2})$/)
    if (!match) {
      setDraft(value)
      return
    }
    const h = Math.min(20, Math.max(10, parseInt(match[1] || '0', 10)))
    let m = match[2] === '' ? 0 : parseInt(match[2], 10)
    m = Math.min(55, Math.max(0, Math.round(m / 5) * 5))
    onChange(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-left text-white outline-none transition-colors duration-200 hover:border-white/20 focus:border-champagne/60"
      >
        <span className="flex items-center gap-2.5">
          <Icon.clock className="h-4 w-4 text-champagne" />
          <span className="tabular-nums">{value}</span>
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={`text-white/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {createPortal(
        <AnimatePresence>
          {open && coords && (
            <>
              {/* click-away */}
              <button
                type="button"
                aria-label="Закрыть выбор времени"
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[60] cursor-default"
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'fixed', top: coords.top, left: coords.left, width: coords.width }}
                className="z-[61] overflow-hidden rounded-3xl border border-white/15 bg-white/[0.08] p-4 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/5 backdrop-blur-2xl"
              >
                {/* gorilla-glass depth + top sheen */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-white/[0.03]" />
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                {/* manual entry */}
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={commitDraft}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      commitDraft()
                    }
                  }}
                  inputMode="numeric"
                  placeholder="ЧЧ:ММ"
                  aria-label="Ввести время вручную"
                  className="mb-3 w-full rounded-xl border border-white/10 bg-noir-950/50 px-3 py-2 text-center font-display text-lg tabular-nums text-white outline-none transition-colors focus:border-champagne/60"
                />

                {/* wheels */}
                <div className="relative">
                  {/* center selection pill (crisp frosted glass, sits above the wheels) */}
                  <div
                    className="pointer-events-none absolute inset-x-1 z-10 rounded-2xl border border-white/25 bg-white/[0.14] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_12px_-4px_rgba(0,0,0,0.5)]"
                    style={{ top: PAD * ITEM_H, height: ITEM_H }}
                  />
                  {/* columns with a soft glass fade at top & bottom (CSS mask — no colored box) */}
                  <div
                    className="flex"
                    style={{
                      WebkitMaskImage:
                        'linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)',
                      maskImage:
                        'linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%)',
                    }}
                  >
                    <Column items={HOURS} value={hour} onChange={setHour} />
                    <div className="flex items-center font-display text-2xl text-white/30">:</div>
                    <Column items={MINUTES} value={minute} onChange={setMinute} />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 w-full cursor-pointer rounded-xl bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark py-2.5 text-sm font-semibold text-noir-950 transition-all duration-200 hover:brightness-110"
                >
                  Готово
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
