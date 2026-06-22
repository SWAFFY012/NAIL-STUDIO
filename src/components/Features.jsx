import { Reveal } from './Reveal'
import { Icon } from './Icons'
import { features } from '../data/content'

export default function Features() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">
      <div className="mb-16 max-w-2xl">
        <Reveal>
          <p className="mb-4 text-xs tracking-luxe text-champagne uppercase">почему Noir Nail</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl text-white md:text-5xl">
            Забота, доведённая <span className="text-gradient-gold italic">до совершенства</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => {
          const Glyph = Icon[f.icon]
          return (
            <Reveal key={f.title} delay={i * 0.1} direction="up">
              <article className="group h-full cursor-default rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-transparent p-7 transition-all duration-300 hover:border-champagne/30 hover:from-white/[0.07]">
                <span className="mb-6 grid h-12 w-12 place-items-center rounded-2xl border border-champagne/25 bg-champagne/5 text-champagne transition-colors duration-300 group-hover:bg-champagne/10">
                  <Glyph className="h-6 w-6" />
                </span>
                <h3 className="mb-2 font-display text-xl text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{f.text}</p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
