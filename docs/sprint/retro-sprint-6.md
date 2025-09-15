# Retrospective — Sprint 6 (тема: падающие тесты CI)

## Keep
- Консистентная вёрстка и A11y‑практики (HIG): tap‑targets, focus‑visible, measure
- Единый CTA и понятная навигация
- Автоматизация: Lighthouse CI с авто‑Summary и latest.json

## Improve
- Устойчивость CI: исключить YAML‑коррупцию и shell‑инъекции из скриптов генерации
- Диагностика runner'а: git exit code 128 в Smoke/E2E
- Логи шагов: больше контекста для быстрых RCA (–‑verbose, печать env)

## Root Cause (гипотезы)
- YAML‑коррупция: «\n» попал текстом в yml при правках — исправлено переписыванием
- git 128 в Smoke/E2E: возможные причины — недоверенная рабочая директория, checkout глубины, гонка с авто‑коммитами или шагами, требующими git

## Action Items
- [ ] AI‑071 (DevOps, 1д): В Smoke/E2E добавить вывод `set -x`, `git status`, `env | sort` перед ошибкой; убедиться, что шаги не вызывают git, удалить лишние
- [ ] AI‑072 (DevOps, 1д): Разделить воркфлоу Lighthouse (с коммитом latest.json) и тестовые воркфлоу по веткам/маршрутам, чтобы исключить гонки
- [ ] AI‑073 (DevOps, 1д): Добавить `actions/checkout@v4` с `persist-credentials: false` и `fetch-depth: 0` в Smoke/E2E; явно задать `shell: bash`
- [ ] AI‑074 (QA, 1д): Прогнать smoke.js локально/в runner‑логике; если нужно — заменить curl‑ожидание на `wait-on` (npx wait-on http://localhost:8080/index.html)
- [ ] AI‑075 (PM, 0.5д): Добавить раздел «CI Known Issues» в README c ссылками на Actions, чтобы команда быстро видела статус

## Status
- Sprint 6 — Done; CI‑службы частично красные, есть план улучшений