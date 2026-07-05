# Sachok Job — подключение Supabase (MVP)

Краткая шпаргалка. Полная версия инструкции — в чате с ассистентом.

## Что нового

Новые файлы:
- `lib/supabaseClient.ts` — клиент Supabase
- `lib/jobsApi.ts` — вся логика работы с jobs/employers/applications
- `lib/events.ts` — событие для обновления списка вакансий на клиенте
- `components/PostJobModal.tsx` — модалка "Post a Job"
- `components/ApplyModal.tsx` — модалка отклика на вакансию
- `components/EmployerCta.tsx` — кнопка "I'm an Employer" (открывает модалку)
- `components/JobsGrid.tsx` — блок вакансий, подключённый к Supabase
- `supabase.sql` — SQL-схема для Supabase SQL Editor
- `.env.local` / `.env.local.example` — переменные окружения

Изменённые файлы:
- `app/page.tsx` — подключены `EmployerCta` и `JobsGrid` вместо статичных блоков
- `components/JobCard.tsx` — кнопка Apply теперь кликабельна и блокируется при лимите 10
- `package.json` — добавлена зависимость `@supabase/supabase-js`
- `.gitignore` — добавлен (чтобы `node_modules`/`.env.local` не попали в git)

## 1. Supabase

1. Создайте проект на https://supabase.com
2. Project Settings → API — скопируйте `Project URL` и `anon public key`
3. Вставьте их в `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```
4. SQL Editor → New query → вставьте содержимое `supabase.sql` → Run

## 2. Локально

```bash
npm install
npm run dev
```

Откройте http://localhost:3000. Кнопка "I'm an Employer" создаёт вакансию,
кнопка "Apply" на карточке — отклик. После 10 откликов кнопка блокируется.

## 3. Vercel

1. Импортируйте репозиторий на https://vercel.com/new
2. В Project Settings → Environment Variables добавьте те же 2 переменные
3. Deploy
