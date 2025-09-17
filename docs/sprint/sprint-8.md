# Sprint 8 — Mobile Nav 2025 (исследование + внедрение)

Goal: исследовать и внедрить современную механику мобильного меню (2025) для лендинга Agilta с приоритетом A11y/Perf и чистой IA. Обновить поведение навигации на ширинах <860px без изменения содержания разделов.

Dates: 2025-09-29 — 2025-10-06 (предл.)

## Research (UX/A11y/PMM)
- Паттерны 2025: top‑bar + hamburger, bottom‑sheet (sheet‑menu), боковой drawer, tab‑bar (для приложений — рассмотреть, но не брать).
- Требования iOS/Android: safe‑area (`env(safe-area-inset-*)`), жесты back/escape, динамические `svh/dvh`, overscroll.
- A11y: `aria-expanded`, `aria-controls`, фокус‑ловушка, `inert`/`aria-hidden` для фона, `Escape`/overlay click, tap‑targets ≥44×44.
- Motion: токены 150/200/250ms, `prefers-reduced-motion: reduce` — без анимации.
- Perf: 60fps (transform: translate/opacity), нулевой CLS, небольшой JS без зависимостей.
- Выход: короткий spec (IA, состояния, переходы, жесты, фолбэки без JS), список AC.

## Sprint Backlog

P0 — Исследование/решение
- S8‑010 (UX/A11y, PMM): Research‑spec «Mobile Nav 2025» + макет/flow.
  - AC: зафиксированы выбранный паттерн (hamburger + sheet), состояния (closed/open), фокус‑циклы, жесты/клавиши, safe‑area.
- S8‑011 (UX/FE): Прототип nav (HTML/CSS/JS) на тестовой странице.
  - AC: открытие по кнопке «Меню», `aria-expanded`/`aria-controls`, закрытие по ESC/overlay/back, trap‑focus, блокировка скролла фона.

P0 — Внедрение на лендинг
- S8‑012 (FE/A11y): Реализация на `index.html` (ширины <860px, container‑query/`@media`).
  - AC: без изменения контента; nav сворачивается в кнопке «Меню»; список ссылок доступен через sheet‑меню; tap‑targets ≥44px.
- S8‑013 (FE): Safe‑area и viewport‑юниты: использовать `padding-bottom: env(safe-area-inset-bottom)` и `dvh/svh` где применимо.
  - AC: меню не пересекает вырезы/панели; высота корректна в iOS/Android браузерах.

P1 — Качество/аналитика
- S8‑014 (QA): E2E (Playwright) для mobile viewport: open/close, focus‑trap, ESC, переход по ссылке.
- S8‑015 (AN/FE): События `open_menu`, `close_menu`, `nav_click{id}`; интеграция в существующий лёгкий трекинг.
- S8‑016 (Perf/A11y): Lighthouse mobile: A11y ≥95, Perf ≥90; устранить замечания.

P2 — Документация
- S8‑017 (PMM/UX): Короткий гайд по навигации (README раздел «Навигация»).
- S8‑018 (DevOps): Вынести nav‑скрипт в отдельный модуль при необходимости (без усложнения пайплайна).

## Acceptance Criteria (AC)
- Кнопка «Меню» с `aria-expanded`/`aria-controls` и видимым focus‑стилем.
- Открытое меню: фокус ловится внутри, остальной контент `inert`/`aria-hidden`; закрытие: ESC/overlay/клик по ссылке/кнопка «Закрыть».
- Tap‑targets ≥44×44; контраст ≥4.5:1; поддержка `prefers-reduced-motion`.
- Safe‑area учтены; без CLS; смесь transform/opacity; 150/200/250ms.
- Трекинг: `open_menu`, `close_menu`, `nav_click{id}` работает (console/dataLayer).

## DoR
- Подтверждён паттерн (hamburger + sheet) и список ссылок; согласованы жесты/клавиши; готов прототип.

## DoD
- Меню внедрено на mobile, проходит QA + Lighthouse (A11y ≥95, Perf ≥90), события пишутся, документация обновлена.

**Status:** Planned
