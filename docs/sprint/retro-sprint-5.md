# Retrospective — Sprint 5

Dates: 2025-09-11 — 2025-09-15

## Цели спринта
- Consent/CMP базовый каркас — [x]
- Incident & Feedback в README — [x]
- ToV словарь (stop/allow) — [x]
- View Transitions с учётом PRM — [x]
- Smoke/E2E минимальные проверки — [x]

## Что получилось хорошо (Keep)
- Документация: добавлены `docs/consent.md`, `docs/roles_workflow_raci.md`, README обновлён под проект Agilta.
- Legal/UX: внедрён CMP‑баннер (Accept/Decline) + `privacy.html`/`offer.html`.
- Качество: добавлены `scripts/smoke.js`, Playwright + два сценария, CI‑воркфлоу Smoke/E2E.
- UX/A11y: плавный скролл с PRM, sticky CTA, базовый FAQ.
- Инцидент устранён быстро: восстановлен `index.html` из истории и упрощён до надёжной версии, очищен `assets/styles.css`.

## Что можно улучшить (Improve)
- Защита от “mojibake” и регрессий: добавить линт на `U+FFFD` и детектор испорченного HTML в CI; не применять рискованные regex‑патчи к HTML без бэкапа.
- Тесты: расширить Playwright (CMP accept/decline, sticky CTA visibility, якорная навигация), добавить Lighthouse CI (Perf/A11y/Best Practices/SEO).
- Контент: расширить ToV с анти‑примерами; добавить OG‑картинку; дописать FAQ.
- Процессы: завести `.gitattributes`/`.editorconfig` (UTF‑8, EOL), закрепить Release checklist (freeze, sign‑off), настройка инцидент‑коммуникаций.
- CMP настройки: добавить “Только необходимые”/“Настройки” и запоминание выборов по категориям.

## Что начать (Start)
- Локальные pre‑commit проверки (husky/lint‑staged) для HTML/CSS/MD.
- Отчёты о тестах в PR (summary) и бэйджи статусов в README.

## Экшены (Action Items)
- [ ] AI‑061 (QA/DevOps, 2025‑09‑16): Добавить CI‑проверку на U+FFFD и “развороты HTML/CSS”.
- [ ] AI‑062 (QA, 2025‑09‑17): Расширить Playwright: CMP accept/decline + sticky CTA.
- [ ] AI‑063 (DevOps, 2025‑09‑18): Lighthouse CI, таргеты A11y ≥ 95, Perf ≥ 90.
- [ ] AI‑064 (Sec/PM, 2025‑09‑18): `.gitattributes` + `.editorconfig` (UTF‑8, EOL); Release checklist.
- [ ] AI‑065 (PMM/UX, 2025‑09‑18): ToV: +10 примеров (Stop/Allow), FAQ 3–5 вопросов, OG‑изображение.
- [ ] AI‑066 (FE/SEC, 2025‑09‑18): CMP “Настройки” и категории согласий; хранение выбора.
