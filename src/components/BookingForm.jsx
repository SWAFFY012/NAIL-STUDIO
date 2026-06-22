import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from './Reveal'
import { Icon } from './Icons'
import TimeWheel from './TimeWheel'
import GlassSelect from './GlassSelect'
import GlassDatePicker from './GlassDatePicker'
import { services, bookingBg } from '../data/content'

const empty = { name: '', phone: '', service: services[0].name, date: '', time: '12:00', note: '' }

export default function BookingForm() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Укажите ваше имя'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10) er.phone = 'Введите корректный телефон'
    if (!form.date) er.date = 'Выберите дату'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return
    if (!validate()) return
    setStatus('loading')

    // Simulate CRM lead capture (persist locally as a stand-in for the backend)
    try {
      const leads = JSON.parse(localStorage.getItem('noir_leads') || '[]')
      leads.push({ ...form, createdAt: new Date().toISOString() })
      localStorage.setItem('noir_leads', JSON.stringify(leads))
    } catch (_) {
      /* ignore storage errors */
    }

    await new Promise((r) => setTimeout(r, 1300))
    setStatus('success')
  }

  const field =
    'w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white placeholder-white/30 outline-none transition-colors duration-200 focus:border-champagne/60 focus:bg-white/[0.05]'

  return (
    <section id="booking" className="relative overflow-hidden py-24 md:py-32">
      {/* full-bleed background photo */}
      <div className="absolute inset-0 z-0">
        <img
          src={bookingBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-noir-950/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-noir-950 via-transparent to-noir-950/90" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2.5rem] border border-white/12 bg-noir-900/55 shadow-[0_30px_90px_-25px_rgba(0,0,0,0.85)] backdrop-blur-2xl">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
          {/* Left: invitation */}
          <div className="relative hidden flex-col justify-between gap-10 border-r border-white/8 bg-gradient-to-b from-rose-deep/20 to-transparent p-10 lg:flex">
            <div>
              <p className="mb-4 text-xs tracking-luxe text-champagne uppercase">запись онлайн</p>
              <h2 className="font-display text-4xl leading-tight text-white">
                Подарите себе <span className="text-gradient-gold italic">час красоты</span>
              </h2>
              <p className="mt-5 max-w-sm text-white/55">
                Оставьте контакты — администратор подтвердит запись в течение 15 минут
                и подберёт удобное время.
              </p>
            </div>
            <ul className="space-y-4 text-sm text-white/65">
              <li className="flex items-center gap-3">
                <Icon.phone className="h-5 w-5 text-champagne" /> +7 (495) 000‑00‑00
              </li>
              <li className="flex items-center gap-3">
                <Icon.pin className="h-5 w-5 text-champagne" /> Москва, ул. Тверская, 12
              </li>
              <li className="flex items-center gap-3">
                <Icon.clock className="h-5 w-5 text-champagne" /> Ежедневно с 10:00 до 21:00
              </li>
            </ul>
          </div>

          {/* Right: the form */}
          <div className="p-8 md:p-10">
            <Reveal>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 14 }}
                      className="mb-6 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-champagne-light to-champagne-dark text-noir-950"
                    >
                      <Icon.check className="h-10 w-10" />
                    </motion.span>
                    <h3 className="font-display text-3xl text-white">Спасибо, {form.name.split(' ')[0]}!</h3>
                    <p className="mt-3 max-w-sm text-white/60">
                      Ваша заявка на «{form.service}» принята. Мы свяжемся с вами по номеру{' '}
                      <span className="text-champagne-light">{form.phone}</span> для подтверждения.
                    </p>
                    <button
                      onClick={() => {
                        setForm(empty)
                        setStatus('idle')
                      }}
                      className="mt-8 cursor-pointer rounded-full border border-white/15 px-6 py-3 text-sm text-white/80 transition-colors hover:bg-white/5"
                    >
                      Оставить ещё одну заявку
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm text-white/70">
                          Имя
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={set('name')}
                          placeholder="Как к вам обращаться"
                          className={field}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && <p className="mt-1.5 text-xs text-rose-nude">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="mb-2 block text-sm text-white/70">
                          Телефон
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={set('phone')}
                          placeholder="+7 (___) ___‑__‑__"
                          className={field}
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && <p className="mt-1.5 text-xs text-rose-nude">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-white/70">Услуга</label>
                      <GlassSelect
                        ariaLabel="Услуга"
                        value={form.service}
                        onChange={(v) => setForm((f) => ({ ...f, service: v }))}
                        options={services.map((s) => ({
                          value: s.name,
                          label: `${s.name} — ${s.price}`,
                        }))}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm text-white/70">Дата</label>
                        <GlassDatePicker
                          value={form.date}
                          onChange={(v) => {
                            setForm((f) => ({ ...f, date: v }))
                            setErrors((er) => ({ ...er, date: undefined }))
                          }}
                        />
                        {errors.date && <p className="mt-1.5 text-xs text-rose-nude">{errors.date}</p>}
                      </div>
                      <div>
                        <label className="mb-2 block text-sm text-white/70">Время</label>
                        <TimeWheel
                          value={form.time}
                          onChange={(t) => setForm((f) => ({ ...f, time: t }))}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="note" className="mb-2 block text-sm text-white/70">
                        Комментарий <span className="text-white/35">— необязательно</span>
                      </label>
                      <textarea
                        id="note"
                        value={form.note}
                        onChange={set('note')}
                        rows={3}
                        placeholder="Пожелания по дизайну, мастеру или времени"
                        className={`${field} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gradient-to-r from-champagne-light via-champagne to-champagne-dark px-7 py-4 text-sm font-semibold text-noir-950 shadow-[0_10px_40px_-12px_rgba(217,189,156,0.7)] transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-noir-950/30 border-t-noir-950" />
                          Отправляем…
                        </>
                      ) : (
                        <>
                          Записаться
                          <Icon.arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-white/35">
                      Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
