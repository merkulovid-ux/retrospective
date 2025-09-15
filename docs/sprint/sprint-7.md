# Sprint 7 — Стабилизация CI и доведение метрик

Goal: стабилизировать Smoke/E2E/Lighthouse и довести метрики Lighthouse (A11y ≥ 95, Perf ≥ 90); убрать технический долг после HIG‑редизайна.

Dates: 2025-09-22 — 2025-09-29 (подтвердить)

## Sprint Backlog

P1 — CI/тесты
- S7‑001 (DevOps, QA): Verbose‑режим в Smoke/E2E — `set -x`, `git status`, `env | sort`; `persist-credentials: false`; `safe.directory`; `shell: bash`
- S7‑002 (DevOps): Исключить гонки с auto‑commit в Lighthouse — коммит `docs/lighthouse/latest.json` только на `workflow_dispatch`/`schedule`
- S7‑003 (QA): Надёжное ожидание сервера — `npx -y wait-on http://localhost:8080/index.html` вместо curl‑цикла; таймаут/лог ошибок

P2 — A11y/Perf
- S7‑004 (UX, A11y): Точечные правки контраста/aria по отчёту Lighthouse (A11y ≥ 95)
- S7‑005 (FE): LCP/CLS — порядок стилей/скриптов, критический CSS при необходимости (Perf ≥ 90)
- S7‑006 (PM): README — раздел «CI Known Issues» и «Как читать отчёты» (ссылка на docs/lighthouse/latest.json)

## DoR
- Доступ к Actions; разрешение на правки workflows; готовность команды протестировать локально при необходимости

## DoD
- Все CI‑воркфлоу зелёные; метрики Lighthouse достигнуты или есть аргументированный план; документация обновлена

**Status:** In Progress
