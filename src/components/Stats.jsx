import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { stats } from '../data/content'

function useCountUp(target, active) {
  const [val, setVal] = useState(0)
  const numeric = parseFloat(String(target).replace(/[^\d.]/g, '')) || 0
  const prefix = String(target).match(/^[^\d]*/)?.[0] ?? ''
  const suffix = String(target).match(/[^\d.]*$/)?.[0] ?? ''
  const decimals = String(target).includes('.') ? 1 : 0

  useEffect(() => {
    if (!active) return
    let raf
    const start = performance.now()
    const dur = 1600
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(numeric * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, numeric])

  return `${prefix}${val.toFixed(decimals)}${suffix}`
}

function Stat({ value, label, active }) {
  const display = useCountUp(value, active)
  return (
    <div className="text-center">
      <div className="font-display text-4xl text-gradient-gold md:text-6xl leading-[1.25] pb-1">{display}</div>
      <div className="mt-2 text-sm text-white/50">{label}</div>
    </div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <section ref={ref} className="relative border-y border-white/8 bg-noir-900/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 px-6 py-16 md:grid-cols-4 md:py-20">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Stat value={s.value} label={s.label} active={inView} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
