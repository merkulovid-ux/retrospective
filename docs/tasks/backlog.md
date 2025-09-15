# Backlog (MVP1)

Принципы
- Приоритеты: P0 > P1 > P2; теги `sprint:*`, `status:*` для отслеживания.
- Разделение по областям: Backend/API, Frontend, UX/Design, Docs, CI.

## Backend (API)
- P0: Аутентификация и сессии (login/refresh JWT), роли/права, логирование ошибок
- P0: Контракты OpenAPI и Swagger UI на /api/docs
- P1: Синхронизация (pull /sync/changes?since, push /sync/push upsert)

## Frontend (Web)
- P0: Скелет приложения + стейт (AuthContext), список Dogs
- P0: Offline кэш (SQLite/IndexedDB), начальная синхронизация
- P1: Экран Events/Medical, конфликт‑резолв и стратегия LWW

## UX / Design
- P1: Отточить копию и фильтры в формах/таблицах; подготовить хэнд‑офф
- P1: Токены/компоненты для ретро‑сценариев; ToV выдержки

## Docs
- P2: Working Agreements в README; линк на /api/docs

## CI / Process
- P0: lint:ci для репо; GitHub Actions для PR/main; max‑warnings=0
- P1: Project v2 доска и статусы; шаблон PR с DoR/DoD чеклистами

