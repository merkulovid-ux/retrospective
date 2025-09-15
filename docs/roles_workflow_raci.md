# Roles & Workflow — краткая сводка (RACI)

## Роли (кратко)
- PO: видение, KPI, релиз‑план, риски/легал.
- PMM: месседжинг, каналы, A/B.
- UX: IA, флоу, токены, компоненты, a11y/perf.
- FE/BE: клиент/сервер, контракты API, интеграции.
- QA: стратегия качества, тесты, релиз‑чеклист.
- AN: трекинг, схема событий, дашборды.
- DevOps: деплой, edge/perf, мониторинг.
- A11y/Sec/I18N: доступность, безопасность/приватность, локализация.
- Помощники: IDEA, ARCH, SYSAN, PM, FS, SM.

См. детально: `docs/roles.json`, `docs/multi_role_model.json`, `docs/protocol.json`.

## Workflow (упрощённо)
- Vision → Design → Build → QA → Release → Live
- Гейты (stop & wait): IDEA, ARCH, SYSAN, PM.
- DoR/DoD, WIP=2, PR в main при зелёном CI. Источник правды — Issues/Project v2.

## RACI (ключевые активности)

| Активность                 | PO | PMM | UX | FE | BE | QA | AN | DevOps | A11y | Sec | PM | SM |
|---------------------------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:-----:|:---:|:---:|:--:|:--:|
| Vision/KPI                | R  | C  | C  | I  | I  | I  | I  | I     | I   | C   | A  | C  |
| Архитектура (draft→final) | C  | I  | C  | C  | C  | I  | I  | I     | I   | C   | A  | C  |
| UX спецификация           | C  | C  | R  | C  | I  | C  | I  | I     | A   | I   | A  | C  |
| API контракты             | I  | I  | C  | C  | R  | C  | I  | I     | I   | C   | A  | C  |
| Реализация FE/BE          | I  | I  | C  | R  | R  | C  | I  | C     | C   | I   | A  | C  |
| Тест‑план/чеклист релиза  | I  | I  | C  | C  | C  | R  | I  | I     | C   | C   | A  | C  |
| Трекинг/события           | I  | C  | C  | C  | C  | C  | R  | I     | I   | I   | A  | C  |
| Деплой/перфоманс          | I  | I  | I  | C  | C  | C  | I  | R     | I   | I   | A  | C  |
| Consent/CMP               | A  | C  | C  | R  | I  | C  | I  | I     | C   | R   | C  | C  |

Легенда: R — Responsible, A — Accountable, C — Consulted, I — Informed.

