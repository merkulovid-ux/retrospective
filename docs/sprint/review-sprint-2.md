# Sprint 2 — Review (лендинг)

Goal: улучшить читаемость и доступность, усилить адаптив (container queries), нормализовать трекинг, добавить webmanifest; подготовить к интеграции формы (DEFERRED).

Итог: ЦЕЛЬ ДОСТИГНУТА
- Адаптив: контейнер‑квери + мобильные правки (компактная шапка ≤480px, ритм на ≤360px)
- Трекинг: нормализованные `view_section/click_cta/submit_form` + web‑vitals (INP/LCP/CLS)
- A11y формы: aria‑live/invalid, honeypot, подсказки; sticky auto‑hide при видимости регистрации
- SEO/OG: og‑image (assets/og-retro.png), FAQPage JSON‑LD; canonical, Course JSON‑LD
- Темы: поддержка системной темы и переключатель data‑theme (light/dark)
- PWA: manifest (PNG 32/192/512), theme‑color
- CI: добавлен Lighthouse CI workflow + budgets

Демо
- Секции: Hero, Программа, Видео, FAQ, Регистрация, Footer — читаемая кириллица
- CTA: основной «Записаться», вторичный «Уточнить стоимость» как secondary
- Навигация: подсветка активной секции (IntersectionObserver)
- Sticky: скрывается при видимости формы регистрации

AC/DoD
- A11y ≥95 (по Lighthouse CI) — ожидается после первого прогона Actions
- SEO ≥90 — ожидается; OG/FAQPage присутствуют
- Перф ≥0.8 — ожидается (часть стилей вынесена; lazy media)
- Отсутствие «крякозябр» в видимых блоках — проверено

Скриншоты
- assets/screenshots/: light (360/768/1280), dark (360)
