import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Reveal } from './Reveal'
import { Icon } from './Icons'
import { TextEffect } from './ui/text-effect'
import { testimonials } from '../data/content'

export default function Testimonials() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.25 })

  return (
    <section id="reviews" ref={sectionRef} className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">
      <div className="mb-16 text-center">
        <Reveal>
          <p className="mb-4 text-xs tracking-luxe text-champagne uppercase">отзывы</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl text-white md:text-5xl">
            Ваши слова — <span className="text-gradient-gold italic">наша гордость</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1} direction="up">
            <figure className="flex h-full flex-col rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.05] to-transparent p-7 backdrop-blur-sm">
              <div className="mb-4 flex gap-1 text-champagne">
                {[...Array(t.rating)].map((_, s) => (
                  <Icon.star key={s} className="h-4 w-4" />
                ))}
              </div>
              {/* reserve full height with an invisible copy, animate the text over it */}
              <blockquote className="relative flex-1 text-[15px] leading-relaxed text-white/75">
                <span className="invisible" aria-hidden="true">
                  «{t.text}»
                </span>
                <span className="absolute inset-0">
                  <TextEffect
                    as="span"
                    per="word"
                    preset="fade"
                    trigger={inView}
                    delay={0.3 + i * 0.35}
                  >
                    {`«${t.text}»`}
                  </TextEffect>
                </span>
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-white/8 pt-5">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-rose-nude to-rose-deep font-display text-noir-950">
                  {t.name.charAt(0)}
                </span>
                <span>
                  <span className="block text-sm font-medium text-white">{t.name}</span>
                  <span className="block text-xs text-white/45">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
