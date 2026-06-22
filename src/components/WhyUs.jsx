import { Reveal, ImageReveal } from './Reveal'
import { Icon } from './Icons'
import { whyPoints, portraitImage } from '../data/content'

export default function WhyUs() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <ImageReveal
          src={portraitImage}
          alt="Гостья студии Noir Nail"
          className="aspect-[4/5] rounded-[2rem] border border-white/10"
        />

        <div>
          <Reveal>
            <p className="mb-4 text-xs tracking-luxe text-champagne uppercase">опыт Noir Nail</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl text-white md:text-5xl">
              Больше, чем маникюр — <span className="text-gradient-gold italic">это ритуал</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-white/55">
              Мы соединили мастерство художников и сервис, который запоминается.
              Всё, чтобы вы возвращались с удовольствием.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-4">
            {whyPoints.map((p, i) => (
              <Reveal key={p} delay={0.1 + i * 0.08} direction="left">
                <li className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-champagne/15 text-champagne">
                    <Icon.check className="h-4 w-4" />
                  </span>
                  <span className="text-white/75">{p}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <a
              href="#booking"
              className="mt-10 inline-flex cursor-pointer items-center gap-2 rounded-full border border-champagne/40 px-6 py-3.5 text-sm font-medium text-champagne-light transition-colors duration-200 hover:bg-champagne/10"
            >
              Записаться на визит
              <Icon.arrow className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
