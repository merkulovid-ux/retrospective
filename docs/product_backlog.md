# Product Backlog — Agilta Landing

Ориентиры
- Упорядоченный список: сверху — приоритетнее и ближе к релизу.
- Каждая запись имеет ID, приоритет (P1–P3), ценность, DoR и AC/DoD.
- В Done переносим только полностью реализованные элементы с заметками.

## Ready (top → bottom)
- PB-001 (P1) Consent / CMP и прозрачность
  - Value: privacy-first; соответствие требованиям 2025
  - DoR: определены цели CMP; ссылки на политики; макет баннера
  - AC: RU-копия, сценарии; Consent Mode; обновлённые ссылки
- PB-002 (P1) Mojibake-lint в CI
  - Value: защита качества контента и локалей
  - AC: GitHub Action на `�[?-?]`/`?` для *.html/*.css/*.js
- PB-003 (P2) Service Worker (offline)
  - Value: устойчивость; offline fallback; базовый кэш
  - AC: Workbox; offline.html; регистрация SW
- PB-004 (P2) Maskable + Apple touch icon
  - AC: maskable 512, apple-touch-icon 180; manifest обновлён
- PB-005 (P2) sitemap.xml + robots.txt
  - AC: валидные файлы; проверка на Pages/CF Pages
- PB-006 (P2) Скриншоты Dark 768/1280 и раздел в README
  - AC: assets/screenshots; раздел Screenshots в README

## In Progress
- PB-007 (P1) #user Контакты партнёров (форма обратной связи)
  - Value: конверсия лидов и запросов
  - AC: форма (валидация), поля: имя/роль/почта/телефон, согласие; обработка результата
- PB-008 (P1) #user Лид‑форма для privacy/offer
  - Value: прозрачность коммуникации (правовые основания и уведомления)
  - AC: ссылки на privacy.html и offer.html; валидация; подтверждение отправки
- PB-009 (P1) #user Демонстрационные экраны <Agilta ретро>
  - Value: понимание сценариев на примерах (копия, анимации, A11y)
  - AC: набор экранов с токенами, variable fonts, адаптация; To‑Do блок
- PB-010 (P1) #user Памятка «LLM Biases.pdf»
  - Value: повышение осознанности по искажениям/этике; ответы в FAQ
  - AC: PDF с примерами; To‑Do связка с лендом/разделами/FAQ

## Done
- PB-000 (P1) Sprint 2: базовые улучшения (SEO/OG/FAQPage/container queries/Web Vitals/CI)

