# Sprint 5 — Consent + ToV + Smooth UX (1 неделя)

Goal: завершить базовые настройки Consent/CMP, Incident & Feedback, словарь тона голоса (ToV: stop/allow) и плавные переходы (View Transitions с учётом prefers-reduced-motion). Добавить smoke/e2e проверки. В фокусе — пользовательские сценарии по PB-009/010.

Dates: 2025-09-11 — 2025-09-18

## Sprint Backlog
- SB-015 ↔ PB-014: README — Consent/CMP и Incident & Feedback (SP:2)
  - AC: в README описаны цели CMP, юридические основания, связь с политиками/офертой; добавлена секция про Incident/Feedback и каналы эскалации
  - Tasks: оформить разделы privacy/offer, добавить ссылку на форму инцидентов, пример cookie banner
  - DoD: локальная проверка ссылок; присутствуют примеры; PR просмотрен
- SB-016 ↔ PB-013: ToV словарь (stop/allow) + примеры (SP:3)
  - AC: `docs/guidelines/tov_dictionary.md` содержит термины stop/allow, анти‑примеры и хорошие формулировки; выдержки в README
  - Tasks: собрать 10–15 типовых сообщений, оформить таблицу, добавить тестовые строки для линтера
  - DoD: линт чек проходит; CI зелёный
- SB-017: View Transitions и снижение резкости (SP:3)
  - AC: включены переходы для основных рутов; уважается `prefers-reduced-motion`; фолбэк без анимации
  - Tasks: добавить CSS/JS хук, протестировать в Chrome/Firefox, обновить документацию
  - DoD: Lighthouse A11y/Perf на уровне целевых метрик; без мерцаний
- SB-018: Smoke + e2e минимальный (SP:2)
  - AC: `scripts/smoke.js` покрывает offline fallback (на `offline.html`) и базовую навигацию; интеграция в CI
  - Tasks: добавить GitHub Actions/CI job, подготовить фикстуры
  - DoD: job «Visual Smoke» зелёный; README обновлён

## DoR
- приоритеты синхронизированы; доступен CI (Smoke+Lighthouse); понятны #user сценарии; окружение разворачивается локально

## DoD
- все AC соблюдены; ревью пройдено; локальная проверка на http://localhost; CI зелёный; оформлены review/retro

**Status:** In Progress — SB-015/016/017/018: частично выполнены (документация/UX/smoke).

