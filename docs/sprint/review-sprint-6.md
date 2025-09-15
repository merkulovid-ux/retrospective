# Sprint Review — Sprint 6

Dates: 2025-09-15 — 2025-09-22 (подтвердить)

## Демо и инкремент
- Визуальный редизайн по HIG: сетка/отступы, радиусы 12px, типографика H2/H3, measure 72ch
- «Ведущие» как медиакомпонент; alt‑тексты; мобильный стек
- CTA унифицирован: «Записаться в Telegram»; tap‑targets ≥ 48px
- «Формат» обновлён (1 день, 10–17 МСК, Zoom+Miro, без записи; доступ к материалам)
- SEO/OG: canonical, OG‑мета, og:image (assets/og-retro-20251005.svg)
- JSON‑LD `Event` (5 октября 2025)
- Sticky‑CTA: dismiss на 24 часа; учёт PRM; нижний отступ у main

## CI и тесты
- Lighthouse CI: workflow настроен, публикует Summary и docs/lighthouse/latest.json при успехе
- Smoke/E2E: обнаружены постоянные падения на уровне runner'а (git exit code 128) и ранее — YAML‑коррупция
- Сделано: переписаны yml, checkout с fetch‑depth=0, safe.directory; Smoke URL → /index.html
- Статус: требуется доп. диагностика runner'а (см. ретро ниже)

## Метрики (целевые → фактические)
- A11y ≥ 95 → TBD (ожидается отчёт Lighthouse CI)
- Perf ≥ 90 → TBD
- E2E/Smoke → красные (runner‑ошибка)

## Риски и зависимости
- GitHub Actions runner: git 128 (подозрение на окружение/доступ, либо конфликт шагов)
- Задержка GitHub Pages при проверке live URL (для Lighthouse)