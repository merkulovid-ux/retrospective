# Sprint 4 — Review

Goal: CMP Settings; offline.html + SW fallback; visual smoke tests; stricter Lighthouse budgets. #user‑задачи берём только по команде.

Итог: ЦЕЛЬ ДОСТИГНУТА
- CMP: баннер + панель «Настройки» (necessary/all), A11y, сохранение выбора
- Offline: /offline.html; SW с offline‑fallback (navigate/html), cache‑first для ассетов
- CI: Visual Smoke (Playwright) с артефактами; Lighthouse CI с порогами Perf ≥0.85 / A11y ≥0.97 / SEO ≥0.92
- Контент: дисклеймер в FAQ/футере; 2 FAQ про данные и отзыв согласия

Velocity (SP)
- SB‑007(3) + SB‑008(3) + SB‑009(2) + SB‑010(2) + SB‑012(3) + SB‑013(2) + SB‑014(3) = **18 SP**

Демо чек‑лист
- Шапка/темы/навигация/активная секция/CTA — ок
- CMP: режимы переключаются; сохраняются; A11y — ок
- Offline: при DevTools offline → offline.html, возвращается онлайн корректно
- Скриншоты CI: доступны в Actions → Visual Smoke
- Lighthouse: прогон зелёный (ожидаемо)
