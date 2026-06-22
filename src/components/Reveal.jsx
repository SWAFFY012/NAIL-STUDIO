import { motion } from 'framer-motion'

/**
 * 21st.dev-style scroll reveal: blur + slide + fade on enter viewport.
 * direction: 'up' | 'down' | 'left' | 'right'
 */
const axisFor = (dir) => (dir === 'left' || dir === 'right' ? 'x' : 'y')
const valueFor = (dir) => (dir === 'right' || dir === 'down' ? 60 : -60)

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  amount = 0.3,
  className = '',
  once = true,
  as = 'div',
}) {
  const axis = axisFor(direction)
  const value = valueFor(direction)
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, filter: 'blur(12px)', [axis]: value }}
      whileInView={{ opacity: 1, filter: 'blur(0px)', [axis]: 0 }}
      viewport={{ once, amount, margin: '0px 0px -120px 0px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Word-by-word staggered text reveal (blur in). Great for headlines.
 */
export function RevealWords({ text, className = '', delay = 0, wordClassName = '' }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block ${wordClassName}`}
          variants={{
            hidden: { opacity: 0, y: '0.4em', filter: 'blur(10px)' },
            visible: {
              opacity: 1,
              y: '0em',
              filter: 'blur(0px)',
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  )
}

/**
 * Image reveal with an animated clip-path curtain wipe + subtle scale.
 */
export function ImageReveal({ src, alt, className = '', imgClassName = '', delay = 0 }) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName}`}
        variants={{
          hidden: { scale: 1.25, filter: 'blur(8px)' },
          visible: {
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay },
          },
        }}
      />
      {/* Curtain that wipes upward to reveal the image */}
      <motion.span
        aria-hidden
        className="absolute inset-0 z-10 bg-noir-950"
        variants={{
          hidden: { scaleY: 1 },
          visible: {
            scaleY: 0,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay },
          },
        }}
        style={{ transformOrigin: 'top' }}
      />
    </motion.div>
  )
}
