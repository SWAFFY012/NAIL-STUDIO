import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from './Icons'

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const POP_H = 372

const pad = (n) => String(n).padStart(2, '0')
const toISO = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`
const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

/**
 * Gorilla-glass calendar — replaces the plain native <input type="date">.
 * value: "yyyy-mm-dd" | "", onChange(value)
 */
export default function GlassDatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const triggerRef = useRef(null)

  const today = startOfDay(new Date())
  const selectedDate = value ? new Date(value + 'T00:00:00') : null
  const initial = selectedDate || today
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() })

  const place = useCallback(() => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const spaceBelow = window.innerHeight - r.bottom
    const openUp = spaceBelow < POP_H + 16 && r.top > POP_H + 16
    setCoords({
      left: r.left,
      width: Math.max(r.width, 300),
      top: openUp ? r.top - POP_H - 8 : r.bottom + 8,
    })
  }, [])

  const toggle = () => {
    if (!open) {
      const base = selectedDate || today
      setView({ year: base.getFullYear(), month: base.getMonth() })
      place()
    }
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

  const display = selectedDate
    ? `${pad(selectedDate.getDate())}.${pad(selectedDate.getMonth() + 1)}.${selectedDate.getFullYear()}`
    : 'дд.мм.гггг'

  // build the day grid (Monday-first)
  const firstDay = new Date(view.year, view.month, 1)
  const offset = (firstDay.getDay() + 6) % 7 // 0 = Monday
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const changeMonth = (dir) => {
    setView((v) => {
      const m = v.month + dir
      if (m < 0) return { year: v.year - 1, month: 11 }
      if (m > 11) return { year: v.year + 1, month: 0 }
      return { ...v, month: m }
    })
  }

  const selectDay = (d) => {
    onChange(toISO(view.year, view.month, d))
    setOpen(false)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-label="Выбрать дату"
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-left outline-none transition-colors duration-200 hover:border-white/20 focus:border-champagne/60"
      >
        <span className={`tabular-nums ${selectedDate ? 'text-white' : 'text-white/30'}`}>{display}</span>
        <Icon.calendar className="h-4 w-4 shrink-0 text-champagne" />
      </button>

      {createPortal(
        <AnimatePresence>
          {open && coords && (
            <>
              <button
                type="button"
                aria-label="Закрыть календарь"
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[60] cursor-default"
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'fixed', top: coords.top, left: coords.left, width: coords.width }}
                className="z-[61] overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] p-4 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
              >
                <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                {/* header */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-display text-lg text-white">
                    {MONTHS[view.month]} {view.year}
                  </span>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => changeMonth(-1)}
                      aria-label="Предыдущий месяц"
                      className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-white/10 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => changeMonth(1)}
                      aria-label="Следующий месяц"
                      className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-white/10 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* weekdays */}
                <div className="mb-1 grid grid-cols-7 gap-1">
                  {WEEKDAYS.map((w) => (
                    <span key={w} className="grid h-8 place-items-center text-xs text-white/35">
                      {w}
                    </span>
                  ))}
                </div>

                {/* days */}
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((d, i) => {
                    if (d === null) return <span key={`e-${i}`} />
                    const cellDate = new Date(view.year, view.month, d)
                    const isPast = cellDate < today
                    const isToday = cellDate.getTime() === today.getTime()
                    const isSelected =
                      selectedDate && cellDate.getTime() === startOfDay(selectedDate).getTime()
                    return (
                      <button
                        key={d}
                        type="button"
                        disabled={isPast}
                        onClick={() => selectDay(d)}
                        className={`grid h-9 cursor-pointer place-items-center rounded-lg text-sm tabular-nums transition-colors duration-150 ${
                          isSelected
                            ? 'bg-gradient-to-br from-champagne-light to-champagne-dark font-semibold text-noir-950'
                            : isPast
                              ? 'cursor-not-allowed text-white/15'
                              : isToday
                                ? 'border border-champagne/40 text-champagne-light hover:bg-white/10'
                                : 'text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {d}
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
