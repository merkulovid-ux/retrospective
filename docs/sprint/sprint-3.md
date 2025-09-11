# Sprint 3 — Privacy & PWA (1 неделя)

Goal: внедрить CMP/Consent + Mojibake‑lint; улучшить PWA (maskable, offline); техническое SEO (sitemap/robots); дополнить скриншоты.

Dates: <вставить даты>

## Sprint Backlog
- SB-001 → PB-001: CMP/Consent Mode (P1)
  - AC: баннер согласия (RU), режимы Разрешить/Только необходимые; localStorage; (опц.) Consent Mode совместим
  - DoD: баннер не мешает A11y; хранится выбор; документация README
- SB-002 → PB-002: Mojibake‑lint в CI (P1)
  - AC: GitHub Action, проверяет *.html/*.css/*.js; падение при `Р[Ѐ-џ]`/`�`
  - DoD: применён к main; тест с заведомо плохой строкой — падает; удаляем тест
- SB-003 → PB-004: Maskable 512 + Apple touch (P2)
  - AC: иконки добавлены; manifest обновлён (`purpose":"maskable"; sizes 512`)
- SB-004 → PB-003: Service Worker offline (P2)
  - AC: Workbox генерирует SW; offline‑fallback; выключатель SW
- SB-005 → PB-005: sitemap.xml + robots.txt (P2)
  - AC: корректные файлы для Pages; ссылки на страницы
- SB-006 → PB-006: Dark‑скриншоты 768/1280 + превью в README (P2)
  - AC: файлы, мини‑превью и раздел Screenshots в README

## DoR
- Пользователь подтвердил необходимость CMP/Consent (P1); доступ к политике есть или будет добавлен

## DoD
- Все AC выполнены; локальная проверка http://localhost; A11y/Perf не регрессируют; CI зелёный

**Status:** Sprint 3 запущен
