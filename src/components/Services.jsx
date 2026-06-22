import { Reveal, ImageReveal } from './Reveal'
import { Icon } from './Icons'
import { services, ambienceImage } from '../data/content'

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* Left: sticky intro + image */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="mb-4 text-xs tracking-luxe text-champagne uppercase">прайс</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl text-white md:text-5xl">
              Профессиональный уход <span className="text-gradient-gold italic">для ваших рук</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-white/55">
              Полный спектр услуг маникюра и педикюра. Точная цена и время — ещё до записи,
              без скрытых доплат.
            </p>
          </Reveal>
          <ImageReveal
            src={ambienceImage}
            alt="Мастер Noir Nail за работой"
            className="mt-8 hidden aspect-[4/3] rounded-3xl border border-white/10 lg:block"
            delay={0.1}
          />
        </div>

        {/* Right: service list */}
        <div className="divide-y divide-white/8 border-y border-white/8">
          {services.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.06} direction="up">
              <article className="group flex cursor-default items-center gap-5 py-6 transition-colors duration-300 hover:bg-white/[0.02]">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl text-white">{s.name}</h3>
                    {s.tag && (
                      <span className="rounded-full border border-champagne/30 bg-champagne/10 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-champagne-light uppercase">
                        {s.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm text-white/50">{s.desc}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/40">
                    <Icon.clock className="h-3.5 w-3.5" /> {s.duration}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl text-gradient-gold">{s.price}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
