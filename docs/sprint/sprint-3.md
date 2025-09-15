# Sprint 3 — Privacy & PWA (1 неделя)

Goal: завершить CMP/Consent + Mojibake‑lint; базовый PWA (maskable, offline); улучшить SEO (sitemap/robots); стабилизировать контент.

Dates: 2025-09-11 — 2025-09-18 (подтвердить)

## Sprint Backlog
- SB-001 ↔ PB-001: CMP/Consent Mode (P1)
  - AC: RU‑копия баннера, сценарии согласий/отказов; сохранение выбора; (опц.) Consent Mode
  - DoD: A11y; контент проверен; README обновлён
- SB-002 ↔ PB-002: Mojibake‑lint в CI (P1)
  - AC: GitHub Action, проверка *.html/*.css/*.js на `�[?-?]`/`?`
  - DoD: влито в main; правила документированы
- SB-003 ↔ PB-004: Maskable 512 + Apple touch (P2)
  - AC: иконки; manifest с purpose:maskable; sizes 512
- SB-004 ↔ PB-003: Service Worker offline (P2)
  - AC: Workbox; offline fallback; регистрация и версии
- SB-005 ↔ PB-005: sitemap.xml + robots.txt (P2)
  - AC: валидные файлы; проверка раздачи на Pages
- SB-006 ↔ PB-006: Dark‑скриншоты 768/1280 + раздел в README (P2)
  - AC: изображения и секция Screenshots в README

## DoR
- подготовлены макеты/копия для CMP; доступ к репо/CI; сценарии #user согласованы

## DoD
- все AC соблюдены; локальная проверка; A11y/Perf на уровне таргетов; CI зелёный

**Status:** In Progress

