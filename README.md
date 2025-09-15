# Agilta — Фасилитация ретроспектив (лендинг + процессы)

[![Pages](https://github.com/merkulovid-ux/retrospective/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/merkulovid-ux/retrospective/actions)
[![Smoke](https://github.com/merkulovid-ux/retrospective/actions/workflows/smoke.yml/badge.svg)](https://github.com/merkulovid-ux/retrospective/actions/workflows/smoke.yml)
[![E2E](https://github.com/merkulovid-ux/retrospective/actions/workflows/e2e.yml/badge.svg)](https://github.com/merkulovid-ux/retrospective/actions/workflows/e2e.yml)

- Лэндинг курса по фасилитации ретроспектив и сопутствующие артефакты (процессы, роли, спринты).
- Деплой на GitHub Pages: https://merkulovid-ux.github.io/retrospective/

## Содержание
- `index.html` — лендинг (аудитория, программа, формат, преподаватель, FAQ)
- `site/offline.html` — оффлайн‑фолбэк
- `docs/` — процессы и документация
  - `docs/sprint/` — планы/ревью/ретро спринтов
  - `docs/roles_workflow_raci.md` — краткая сводка Roles & Workflow с RACI (включая Release/Incidents)
  - `docs/consent.md` — матрица Consent/CMP (цели/основания/сроки)
  - `docs/guidelines/tov_dictionary.md` — Tone of Voice: Stop/Allow
- `scripts/smoke.js` — минимальная дымовая проверка
- `.github/workflows/` — CI для Smoke и Playwright E2E

## Быстрый старт (локально)
```
# 1) статический сервер
npx http-server -p 8080 .
# 2) smoke‑чек (необязательно)
node scripts/smoke.js http://127.0.0.1:8080/index.html
```

## Тестирование
- Playwright: `npm run test:e2e`
- Отчёт в CI: workflows “E2E” и “Smoke”

## Consent / Incident & Feedback
- CMP‑баннер с Accept/Decline, ссылки на `privacy.html` и `offer.html` (хранение в `localStorage`)
- Матрица согласий: `docs/consent.md`

## Роли и процессы
- Сводка RACI: `docs/roles_workflow_raci.md`
- Глубже: `docs/roles.json`, `docs/multi_role_model.json`, `docs/protocol.json`, `docs/agreements.json`

## Скриншоты
Light 360 | Light 768 | Light 1280
:--:|:--:|:--:
![l360](assets/screenshots/light-360x740.png) | ![l768](assets/screenshots/light-768x1024.png) | ![l1280](assets/screenshots/light-1280x800.png)

Dark 360 | Dark 768 | Dark 1280
:--:|:--:|:--:
![d360](assets/screenshots/dark-360x740.png) | ![d768](assets/screenshots/dark-768x1024.png) | ![d1280](assets/screenshots/dark-1280x800.png)

