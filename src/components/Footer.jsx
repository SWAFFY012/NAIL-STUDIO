import { Icon } from './Icons'
import { navLinks } from '../data/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-noir-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-champagne/40">
                <span className="font-display text-lg italic text-gradient-gold">N</span>
              </span>
              <span className="font-display text-xl text-white">
                Noir<span className="text-gradient-gold"> Nail</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">
              Студия красоты премиум‑класса. Авторский маникюр, безупречная стерильность
              и атмосфера, в которую хочется возвращаться.
            </p>
            <div className="mt-6 flex gap-3">
              {[Icon.instagram, Icon.telegram, Icon.phone].map((G, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Социальная сеть"
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-white/10 text-white/60 transition-colors duration-200 hover:border-champagne/40 hover:text-champagne"
                >
                  <G className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium tracking-wide text-white/40 uppercase">Навигация</h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/65 transition-colors duration-200 hover:text-champagne">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-medium tracking-wide text-white/40 uppercase">Контакты</h4>
            <ul className="space-y-3 text-sm text-white/65">
              <li className="flex items-center gap-2.5">
                <Icon.pin className="h-4 w-4 text-champagne" /> Москва, ул. Тверская, 12
              </li>
              <li className="flex items-center gap-2.5">
                <Icon.phone className="h-4 w-4 text-champagne" /> +7 (495) 000‑00‑00
              </li>
              <li className="flex items-center gap-2.5">
                <Icon.clock className="h-4 w-4 text-champagne" /> 10:00 — 21:00, ежедневно
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-7 text-xs text-white/35 sm:flex-row">
          <span>© 2026 Noir Nail. Все права защищены.</span>
          <span>Сделано с любовью к деталям.</span>
        </div>
      </div>
    </footer>
  )
}
