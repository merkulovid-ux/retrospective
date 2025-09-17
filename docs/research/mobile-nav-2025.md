# Mobile Nav 2025 — исследование и решения

Цель: спроектировать и внедрить современную механику мобильной навигации для лендинга Agilta (ширины < 860px) с фокусом на доступности (WCAG 2.2 AA), производительности и согласованности с Apple HIG/Material 3.

## Контекст и ограничения
- Страница статическая, без фреймворков; предпочтение минимальному JS, нулевому CLS и 60fps‑анимациям.
- Поддержка `prefers-reduced-motion: reduce` обязательна.
- Без изменения контента/IA (ссылки остаются те же).

## Паттерны (2025)
- Hamburger + Sheet Menu (рекомендуется): кнопка «Меню» в шапке, полноэкранный sheet поверх контента. Плюсы: простота, одно место фокуса, естественные жесты закрытия.
- Drawer (боковая панель): альтернатива, но хуже на устройствах с жестом «назад» и сложнее с safe‑area.
- Bottom tab bar: неуместно для лендинга (подходит для приложений).

## Выбранный паттерн
Hamburger + Bottom Sheet (full‑screen) с собственным backdrop. Вверху sheet — заголовок «Навигация» и кнопка «Закрыть», далее список ссылок.

## IA и маршруты
Ссылки те же, что в десктопном меню: program / learn / webinar / speakers / format / faq / register.

## Доступность (A11y)
- Кнопка: `aria-controls="#mobile-menu"`, `aria-expanded="true|false"`, корректные focus‑стили.
- Открытие: перевод фокуса в первый элемент меню; закрытие — возвращение фокуса на кнопку.
- Фон: `inert`/`aria-hidden="true"` на остальном контенте; блокировка прокрутки body.
- Закрытие: `Escape`, клик по backdrop, клик по ссылке, кнопка «Закрыть».
- Focus trap: циклический таб внутри sheet; таб из последнего — к первому и наоборот.
- Tap‑targets ≥44×44, контраст ≥4.5:1.

## Safe‑area и viewport
- Использовать `padding: env(safe-area-inset-*)` у sheet и верхней панели.
- Высота по `100dvh`/`100svh` с фолбэком на `100vh`.

## Motion / Перфоманс
- Токены: `--motion-150/200/250` (ease‑out). В reduce‑режиме — без анимаций.
- Свойства для анимаций: `transform: translateY()` и `opacity`. Backdrop — `opacity`.
- Нулевой CLS: sheet и backdrop в DOM, но скрыты через `visibility/opacity/transform`.

## Аналитика
- `open_menu`, `close_menu`, `nav_click{id}` — отправлять в `window.dataLayer` (если есть) и в `console.debug`.

## Состояния
- closed: `aria-expanded=false`, body scroll unlocked, content non‑inert, backdrop hidden.
- open: `aria-expanded=true`, body scroll lock (`overflow:hidden`), content inert, backdrop visible; фокус в sheet.

## Кейборд/жесты
- ESC — закрыть.
- Backdrop click — закрыть.
- Back button (history): по возможности добавлять `pushState` при открытии и закрывать по `popstate`.

## Acceptance Criteria
- Навигация открывается/закрывается, фокус/aria‑атрибуты корректны; trap работает; события трекинга пишутся.
- Safe‑area/`dvh` учтены; `prefers-reduced-motion` соблюдается.
- Lighthouse Mobile: A11y ≥95, Perf ≥90.

## Открытые вопросы
- Нужно ли показывать CTA внутри sheet (дублировать «Записаться в Telegram»)? Пока: да, последним пунктом списка.
- Нужен ли жест свайпа вниз для закрытия? Базово нет; можно добавить позже.

## Ссылки
- Apple HIG (Nav Bars, Modals, Motion): internal PDF в репозитории.
- Material 3 Navigation Drawer & Sheets.

