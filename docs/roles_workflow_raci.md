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

## RACI — Релизная процедура (Release)

| Этап/Активность            | PO | PMM | UX | FE | BE | QA | AN | DevOps | A11y | Sec | PM | SM |
|----------------------------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:-----:|:---:|:---:|:--:|:--:|
| План релиза/окно           | A  | C  | C  | C  | C  | C  | I  | C     | I   | C   | R  | C  |
| Фриз кода (policy)         | A  | I  | I  | I  | I  | C  | I  | C     | I   | C   | R  | R  |
| QA sign‑off                | I  | I  | C  | C  | C  | A  | I  | C     | C   | C   | R  | C  |
| Release Notes              | A  | R  | C  | C  | C  | C  | I  | I     | I   | I   | C  | C  |
| Deploy to Prod             | I  | I  | I  | C  | C  | C  | I  | R     | I   | C   | A  | C  |
| Post‑release monitoring    | I  | I  | I  | I  | I  | C  | C  | R     | I   | I   | C  | C  |
| Rollback decision          | A  | I  | I  | C  | C  | C  | I  | R     | I   | C   | C  | C  |

## RACI — Инциденты (Incidents)

| Этап/Активность            | PO | PMM | UX | FE | BE | QA | AN | DevOps | A11y | Sec | PM | SM |
|----------------------------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:-----:|:---:|:---:|:--:|:--:|
| Обнаружение/алерты         | I  | I  | I  | I  | I  | C  | C  | R     | I   | C   | C  | C  |
| Триаж/классификация        | I  | I  | I  | C  | C  | C  | I  | R     | I   | A   | C  | C  |
| Коммуникации (внутр./внеш.)| A  | C  | I  | I  | I  | C  | I  | I     | I   | C   | R  | C  |
| Реализация фикса           | I  | I  | C  | R  | R  | C  | I  | C     | C   | C   | C  | C  |
| Хотфикс‑деплой             | I  | I  | I  | C  | C  | C  | I  | R     | I   | C   | A  | C  |
| Постмортем                 | C  | I  | I  | C  | C  | C  | I  | C     | I   | C   | A  | R  |
| Обновление политик/процесс | C  | I  | I  | I  | I  | C  | I  | C     | I   | R   | A  | C  |
