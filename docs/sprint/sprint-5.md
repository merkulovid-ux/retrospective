# Sprint 5 — Consent + ToV + Smooth UX (1 неделя)

Goal: внедрить улучшения из ретро — README раздел «Consent/CMP» и Incident & Feedback, ToV словарь (stop/allow) + линк, View Transitions для якорей (с учётом prefers‑reduced‑motion), e2e‑офлайн шаг в Smoke. По вашей команде — добавлять конкретные #user‑пункты из PB‑009/010.

Dates: <вставьте даты>

## Sprint Backlog
- SB-015 → PB-014: README — Consent/CMP и Incident & Feedback (SP:2)
  - AC: README дополняется разделами; описаны режимы CMP, как изменить согласие, как сообщить о проблеме/предвзятости
  - DoD: проверено в репо, ссылки на privacy/offer корректны
- SB-016 → PB-013: ToV словарь (stop/allow) + линк (SP:3)
  - AC: docs/guidelines/tov_dictionary.md с примерами до/после; ссылка в README
  - DoD: пройдены smoke‑чек‑листы формулировок; CI зелёный
- SB-017: View Transitions для якорей (SP:3)
  - AC: плавные переходы по внутренним якорям; уважается prefers‑reduced‑motion; без дрожаний контента
  - DoD: Lighthouse A11y/Perf без регрессий; ручная проверка
- SB-018: Smoke e2e офлайн‑шаг (SP:2)
  - AC: scripts/smoke.js — эмуляция offline (navigation fallback на offline.html) + скрин; артефакт в CI
  - DoD: job «Visual Smoke» зелёный; README обновлён

## DoR
- Текущая версия опубликована; CI (Smoke+Lighthouse) работает; #user‑пункты добавляются в спринт по команде

## DoD
- Все AC выполнены; локальные проверки http://localhost; CI зелёный; оформлены review/retro

**Status:** Sprint 5 запущен
