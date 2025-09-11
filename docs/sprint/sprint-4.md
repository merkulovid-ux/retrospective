# Sprint 4 — UX Legal & Stability (1 неделя)

Goal: внедрить улучшения с ретроспективы — Consent Settings (CMP), офлайн‑страницу и доработку SW, визуальные smoke‑тесты (light/dark), ужесточить бюджет Lighthouse. Не берем #user‑задачи без команды заказчика.

Dates: <вставить даты>

## Sprint Backlog

- SB-011 → PB-009 (#user): Проработка «Agilta брендбук»
  - AC: согласован список решений (цветовые пары, variable‑fonts, допустимые анимации, голос/тон, примеры иллюстраций); сформирован To‑Do для внедрения на лендинг
  - DoD: список To‑Do добавлен в Product Backlog; приоритеты выставлены; договорились о включении в следующий спринт
- SB-007: Consent Settings (панель настроек)
  - AC: кнопка/ссылка «Настройки» в CMP; переключение «Разрешить/Только необходимые»; текстовое описание; A11y (клавиатура, aria‑атрибуты); сохранение выбора
  - DoD: README — раздел «Consent», ручные тесты; баннер не перекрывает sticky/форму
- SB-008: Offline‑страница и SW‑fallback
  - AC: /offline.html с кратким сообщением и кнопкой «Повторить»; SW отдаёт fallback при offline для HTML; выключатель SW в README
  - DoD: ручной тест (DevTools offline), без регрессий A11y/Perf
- SB-009: Visual smoke‑тесты (light/dark, 360/1280)
  - AC: headless‑скриншоты (Hero/FAQ/Форма/Политика) сохраняются как артефакт CI; порог допусимого изменения
  - DoD: README — как запускать; CI зелёный
- SB-010: Ужесточить бюджеты Lighthouse
  - AC: Perf ≥0.85, A11y ≥0.97, SEO ≥0.92 в .lighthouserc.json; пояснение в README
  - DoD: прогон CI прошёл; нет регрессий

## DoR
- Текущая версия опубликована; CI работает; #user‑задачи остаются в Product Backlog

## DoD
- Все AC выполнены; локальные проверки http://localhost; CI зелёный; Review/Retro оформлены

**Status:** Sprint 4 запущен

Retro agenda: включить проработку документа ‘Agilta брендбук’ (#user PB-009).

Retro agenda: включить проработку ‘Agilta брендбук’ (PB-009, #user) и ‘LLM Biases.pdf’ (PB-010, #user).
