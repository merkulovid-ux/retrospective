# DogApp (Vasha Sobaka)

[![CI](https://github.com/merkulovid-ux/dogapp/actions/workflows/ci.yml/badge.svg)](https://github.com/merkulovid-ux/dogapp/actions/workflows/ci.yml)
[![Backlog → Issues & Project](https://github.com/merkulovid-ux/dogapp/actions/workflows/backlog_to_issues.yml/badge.svg)](https://github.com/merkulovid-ux/dogapp/actions/workflows/backlog_to_issues.yml)
[![Backlog → ProjectV2](https://github.com/merkulovid-ux/dogapp/actions/workflows/backlog_to_project_v2.yml/badge.svg)](https://github.com/merkulovid-ux/dogapp/actions/workflows/backlog_to_project_v2.yml)

Мобильное приложение (React Native) для владельцев собак: профиль питомца, календарь событий/вакцинаций, офлайн‑данные, уведомления и базовый бэкенд API.

## Структура

- `frontend/`: React Native приложение (JS). Точки входа: `index.js`, `App.js`.
- `docs/`: продуктовая и техническая документация (MVP1, архитектура, задачи).
- `roles/`: роли/ответственности команды (рабочие материалы).

## Быстрый старт (Frontend)

Требования: Node.js LTS, Java JDK (Android), Xcode (iOS), Android SDK, CocoaPods (iOS), yarn/npm.

1) Установка зависимостей

```
cd frontend
npm install
```

2) Запуск Metro и приложения

```
npm start           # Metro
npm run android     # Android эмулятор/устройство
npm run ios         # iOS симулятор (macOS)
```

3) Тесты и линт

```
npm test
npm run lint
```

## Конфигурация API

Переменная `API_URL` задаётся в `frontend/src/config/env.js`. По умолчанию используется:

- Android эмулятор: `http://10.0.2.2:3000`
- Прочие среды: `http://localhost:3000`

Для переопределения во время исполнения можно установить `global.API_URL` до инициализации приложения.

Пример (вставить раньше импорта `App`):

```js
global.API_URL = 'https://api.example.com';
```

Также добавлен шаблон `frontend/.env.example` — используйте как справочник значений.

## Git / CRLF

- Включена нормализация перевода строк через `.gitattributes` (LF в репозитории).
- На Windows рекомендуется: `git config --global core.autocrlf true`.

## Дорожная карта

- Подключить реальный бэкенд API (auth, dogs, events).
- Настроить CI (GitHub Actions) для `lint`/`test`.
- Husky + lint-staged для проверки коммитов.
- Документировать реальные эндпоинты и схемы БД (см. `docs/`).
