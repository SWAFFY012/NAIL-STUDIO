# Noir Nail — студия красоты (лендинг)

Тёмный премиальный лендинг для нейл-студии: React + Vite + Tailwind + Framer Motion.

## Запуск

```bash
npm install      # один раз
npm run dev      # дев-сервер → http://localhost:5173
npm run build    # прод-сборка в /dist
npm run preview  # предпросмотр прод-сборки
```

## Структура

- `src/components/Hero.jsx` — герой с фоновой фотографией и параллаксом, анимация появления текста (blur reveal)
- `src/components/MarqueeSection.jsx` — галерея из двух рядов, движется по скроллу колеса
  (row1 → `+offset`, row2 → `-offset`, карточки 240×155, radius 16px, повтор 3× для бесшовности)
- `src/components/BookingForm.jsx` — анкета записи в beauty-стиле (валидация → загрузка → успех),
  заявки сохраняются в `localStorage` под ключом `noir_leads`
- `src/components/Reveal.jsx` — анимации в стиле 21st.dev: blur+slide reveal, пословное появление, clip-reveal картинок
- `src/data/content.js` — весь контент (услуги, отзывы, статистика, тексты)

## Ассеты

4K-фотографии лежат в `public/assets/nails/` (`nail-1.png` … `nail-8.png`).
Чтобы заменить — положите свои файлы с теми же именами либо отредактируйте пути в `src/data/content.js`.
