# Sachok Job — MVP

Рабочий фронтенд-MVP на **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, повторяющий вёрстку прикреплённых PNG-макетов. Без базы данных и без Supabase — все данные замоканы в `lib/data.ts`.

## Что реализовано

| Страница | Роут | Соответствует макету |
|---|---|---|
| Главная | `/` | `01_home.png` |
| People from Social Media (список) | `/people` | `05_people_list.png` |
| Профиль человека | `/profile/[id]` | `06_profile.png` |
| Контакты | `/contact` | `03_contact.png` |
| Help Center | `/help-center` | `04_help_center.png` |
| Terms & Privacy | `/terms-privacy` | `02_terms_privacy.png` |

### Переходы между страницами
- Кнопка **"View all"** в блоке "People from Social Media" на главной → открывает `/people`.
- Кнопка **"Make an offer"** на любой карточке в `/people` (и на главной) → открывает `/profile/[id]` этого человека.
- В `/people` и `/profile/[id]` есть **X** (закрыть → на главную) и **Back / Back to list** (назад к списку), как на макетах.
- В футере (на всех страницах): `Contact` → `/contact`, `Help Center` → `/help-center`, `Terms of Service` и `Privacy Policy` → `/terms-privacy`.

## Структура проекта

```
sachok-job/
├── app/
│   ├── layout.tsx              # корневой layout, шрифты, метаданные
│   ├── globals.css             # Tailwind + базовые классы (.btn, .card, .tag, .pill)
│   ├── page.tsx                 # Главная (01_home)
│   ├── people/
│   │   └── page.tsx             # Список людей (05_people_list)
│   ├── profile/
│   │   └── [id]/
│   │       └── page.tsx         # Профиль (06_profile)
│   ├── contact/page.tsx         # 03_contact
│   ├── help-center/page.tsx     # 04_help_center
│   └── terms-privacy/page.tsx   # 02_terms_privacy
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── JobCard.tsx
│   ├── PersonCard.tsx
│   └── PlatformIcon.tsx
├── lib/
│   └── data.ts                  # моковые данные (вакансии + 10 профилей)
├── types/
│   └── index.ts                 # общие TS-типы
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── postcss.config.js
```

## Как запустить локально

Требуется **Node.js 18.17+** (лучше 20 LTS).

```bash
# 1. Установить зависимости
npm install

# 2. Запустить дев-сервер
npm run dev

# 3. Открыть в браузере
http://localhost:3000
```

Проверка продакшен-сборки:

```bash
npm run build
npm run start
```

## Как выложить на GitHub

```bash
cd sachok-job
git init
git add .
git commit -m "Sachok Job MVP"
git branch -M main
git remote add origin https://github.com/<ваш-логин>/<repo-name>.git
git push -u origin main
```

## Как задеплоить на Vercel

1. Зайти на https://vercel.com → **Add New Project**.
2. Импортировать репозиторий из GitHub.
3. Vercel сам определит Next.js — framework preset подставится автоматически, менять ничего не нужно (Build command: `next build`, Output: по умолчанию).
4. Нажать **Deploy**. Через минуту получите рабочий URL вида `https://sachok-job.vercel.app`.

Никаких переменных окружения на этом этапе не нужно — Supabase/БД не используются.

## Технические детали

- **Next.js App Router** — каждая страница — отдельный роут-файл.
- **Tailwind CSS** — кастомные цвета в `tailwind.config.ts` (`brand`, `ink`, `muted`, `line`, `pinkbrand`) подобраны по скриншотам.
- **lucide-react** — иконки (совпадают по стилю с иконками в макетах).
- Аватары людей и превью видео берутся с публичных CDN (`i.pravatar.cc`, `images.unsplash.com`) — просто для наглядности MVP; при желании легко заменить на свои изображения в `/public`.
- Вкладки на странице профиля (`Audience`, `Content`, `Reviews`, `Portfolio`) переключаются, но пока содержат заглушку — контент можно добавить по мере необходимости.
- Форма на `/contact` и поиск/аккордеон на `/help-center` работают на клиенте (без реальной отправки — это задел под будущий backend).

## Правки этой итерации

- Логотип заменён на векторную SVG-отметку (`components/Logo.tsx`) — растровый PNG больше не используется в шапке.
- На главной добавлен декоративный фон в hero-блоке (мягкий градиентный "glow" + точечная сетка), как на референсе.
- Кнопки (`.btn`, `.btn-primary`, `.btn-outline`, `.btn-ghost`) переписаны с явным сбросом `appearance`/`border`/`outline` — пропала белая полоска на синих кнопках, которая появлялась из-за нативных стилей браузера.
- Шрифт подключён через `next/font/google` (Inter, веса 400–800) — рендерится одинаково во всех браузерах, без "прыжков" и системных фолбэков.
- Страницы `/people` и `/profile/[id]` больше не оформлены как модалки на сером фоне с тяжёлой тенью — теперь это обычные страницы сайта с общим `Header` и `Footer`, светлым фоном и той же карточной стилистикой (`.card`), что и везде.
- Карточки (`.card`) получили чуть более крупный радиус скругления и лёгкую тень — ближе к PNG.
- Все переходы проверены и работают: `View all` → `/people`, `Make an offer` → `/profile/[id]`, ссылки в футере → `/contact`, `/help-center`, `/terms-privacy`.

## Дальнейшие шаги (не входят в этот MVP)
- Подключение Supabase/БД для реальных пользователей, вакансий и заявок.
- Реальная аутентификация (Log in / Create Account).
- Реальная отправка формы обратной связи (API route / email-провайдер).
- Пагинация `/people` по-настоящему (сейчас статичный набор из 10 профилей, но UI пагинации уже нарисован).
