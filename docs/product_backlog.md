# Product Backlog — Agilta Landing (живой артефакт)

Принципы:
- Ordered list: сверху — наибольшая ценность/срочность.
- Каждая запись имеет ID, приоритет (P1…P3), краткое описание, критерии готовности (DoR) и приёмки (AC/DoD).
- В спринт забираем верхние элементы; по завершении — переносим в Done/Release Notes.

## Ready (top → bottom)
- PB-001 (P1) Consent / CMP и безопасный трекинг
  - Value: privacy‑first, соответствие требованиям (2025)
  - DoR: варианты трекинга определены; текст политики; базовая CMP
  - AC: баннер согласия (Разрешить/Только необходимые), хранение выбора; для внешней аналитики — Consent Mode; ссылки на политику
- PB-002 (P1) Mojibake‑lint в CI
  - Value: предотвращение регрессий кодировки
  - AC: CI фейлит PR при наличии `Р[Ѐ-џ]`/`�` в *.html/*.css/*.js
- PB-003 (P2) Service Worker (offline)
  - Value: стабильность; офлайн‑fallback; кэш статики
  - AC: SW (Workbox) с offline‑заглушкой; SW выключаемый
- PB-004 (P2) Maskable + Apple touch icon
  - AC: maskable 512, apple‑touch‑icon 180; manifest обновлён
- PB-005 (P2) sitemap.xml + robots.txt
  - AC: файлы с корректными ссылками для Pages/CF Pages
- PB-006 (P2) Dark screenshots 768/1280 и превью в README
  - AC: файлы в assets/screenshots; мини‑превью в README

## In Progress
(пусто)

## Done
- PB-000 (P1) Sprint‑2 базовые улучшения (тема/OG/FAQPage/container queries/web‑vitals/CI) — закрыто в Sprint 2
- PB-007 (P1) #user Верификация «Политики конфиденциальности»
  - Value: юридическая корректность и реквизиты Оператора
  - AC: пользователь (владелец продукта) подтверждает текст, заполняет реквизиты Оператора (наименование, ИНН/ОГРН, адрес, e‑mail), вносит правки при необходимости
  - Note: задачи с тегом #user попадают в спринт только по прямому указанию заказчика
