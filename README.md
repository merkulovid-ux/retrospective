# DogApp (Vasha Sobaka)

[![CI](https://github.com/merkulovid-ux/dogapp/actions/workflows/ci.yml/badge.svg)](https://github.com/merkulovid-ux/dogapp/actions/workflows/ci.yml)
[![Backlog в†’ Issues & Project](https://github.com/merkulovid-ux/dogapp/actions/workflows/backlog_to_issues.yml/badge.svg)](https://github.com/merkulovid-ux/dogapp/actions/workflows/backlog_to_issues.yml)
[![Backlog в†’ ProjectV2](https://github.com/merkulovid-ux/dogapp/actions/workflows/backlog_to_project_v2.yml/badge.svg)](https://github.com/merkulovid-ux/dogapp/actions/workflows/backlog_to_project_v2.yml)

РњРѕР±РёР»СЊРЅРѕРµ РїСЂРёР»РѕР¶РµРЅРёРµ (React Native) РґР»СЏ РІР»Р°РґРµР»СЊС†РµРІ СЃРѕР±Р°Рє: РїСЂРѕС„РёР»СЊ РїРёС‚РѕРјС†Р°, РєР°Р»РµРЅРґР°СЂСЊ СЃРѕР±С‹С‚РёР№/РІР°РєС†РёРЅР°С†РёР№, РѕС„Р»Р°Р№РЅвЂ‘РґР°РЅРЅС‹Рµ, СѓРІРµРґРѕРјР»РµРЅРёСЏ Рё Р±Р°Р·РѕРІС‹Р№ Р±СЌРєРµРЅРґ API.

## РЎС‚СЂСѓРєС‚СѓСЂР°

- `frontend/`: React Native РїСЂРёР»РѕР¶РµРЅРёРµ (JS). РўРѕС‡РєРё РІС…РѕРґР°: `index.js`, `App.js`.
- `docs/`: РїСЂРѕРґСѓРєС‚РѕРІР°СЏ Рё С‚РµС…РЅРёС‡РµСЃРєР°СЏ РґРѕРєСѓРјРµРЅС‚Р°С†РёСЏ (MVP1, Р°СЂС…РёС‚РµРєС‚СѓСЂР°, Р·Р°РґР°С‡Рё).
- `roles/`: СЂРѕР»Рё/РѕС‚РІРµС‚СЃС‚РІРµРЅРЅРѕСЃС‚Рё РєРѕРјР°РЅРґС‹ (СЂР°Р±РѕС‡РёРµ РјР°С‚РµСЂРёР°Р»С‹).

## Р‘С‹СЃС‚СЂС‹Р№ СЃС‚Р°СЂС‚ (Frontend)

РўСЂРµР±РѕРІР°РЅРёСЏ: Node.js LTS, Java JDK (Android), Xcode (iOS), Android SDK, CocoaPods (iOS), yarn/npm.

1) РЈСЃС‚Р°РЅРѕРІРєР° Р·Р°РІРёСЃРёРјРѕСЃС‚РµР№

```
cd frontend
npm install
```

2) Р—Р°РїСѓСЃРє Metro Рё РїСЂРёР»РѕР¶РµРЅРёСЏ

```
npm start           # Metro
npm run android     # Android СЌРјСѓР»СЏС‚РѕСЂ/СѓСЃС‚СЂРѕР№СЃС‚РІРѕ
npm run ios         # iOS СЃРёРјСѓР»СЏС‚РѕСЂ (macOS)
```

3) РўРµСЃС‚С‹ Рё Р»РёРЅС‚

```
npm test
npm run lint
```

## РљРѕРЅС„РёРіСѓСЂР°С†РёСЏ API

РџРµСЂРµРјРµРЅРЅР°СЏ `API_URL` Р·Р°РґР°С‘С‚СЃСЏ РІ `frontend/src/config/env.js`. РџРѕ СѓРјРѕР»С‡Р°РЅРёСЋ РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ:

- Android СЌРјСѓР»СЏС‚РѕСЂ: `http://10.0.2.2:3000`
- РџСЂРѕС‡РёРµ СЃСЂРµРґС‹: `http://localhost:3000`

Р”Р»СЏ РїРµСЂРµРѕРїСЂРµРґРµР»РµРЅРёСЏ РІРѕ РІСЂРµРјСЏ РёСЃРїРѕР»РЅРµРЅРёСЏ РјРѕР¶РЅРѕ СѓСЃС‚Р°РЅРѕРІРёС‚СЊ `global.API_URL` РґРѕ РёРЅРёС†РёР°Р»РёР·Р°С†РёРё РїСЂРёР»РѕР¶РµРЅРёСЏ.

РџСЂРёРјРµСЂ (РІСЃС‚Р°РІРёС‚СЊ СЂР°РЅСЊС€Рµ РёРјРїРѕСЂС‚Р° `App`):

```js
global.API_URL = 'https://api.example.com';
```

РўР°РєР¶Рµ РґРѕР±Р°РІР»РµРЅ С€Р°Р±Р»РѕРЅ `frontend/.env.example` вЂ” РёСЃРїРѕР»СЊР·СѓР№С‚Рµ РєР°Рє СЃРїСЂР°РІРѕС‡РЅРёРє Р·РЅР°С‡РµРЅРёР№.

## Git / CRLF

- Р’РєР»СЋС‡РµРЅР° РЅРѕСЂРјР°Р»РёР·Р°С†РёСЏ РїРµСЂРµРІРѕРґР° СЃС‚СЂРѕРє С‡РµСЂРµР· `.gitattributes` (LF РІ СЂРµРїРѕР·РёС‚РѕСЂРёРё).
- РќР° Windows СЂРµРєРѕРјРµРЅРґСѓРµС‚СЃСЏ: `git config --global core.autocrlf true`.

## Р”РѕСЂРѕР¶РЅР°СЏ РєР°СЂС‚Р°

- РџРѕРґРєР»СЋС‡РёС‚СЊ СЂРµР°Р»СЊРЅС‹Р№ Р±СЌРєРµРЅРґ API (auth, dogs, events).
- РќР°СЃС‚СЂРѕРёС‚СЊ CI (GitHub Actions) РґР»СЏ `lint`/`test`.
- Husky + lint-staged РґР»СЏ РїСЂРѕРІРµСЂРєРё РєРѕРјРјРёС‚РѕРІ.
- Р”РѕРєСѓРјРµРЅС‚РёСЂРѕРІР°С‚СЊ СЂРµР°Р»СЊРЅС‹Рµ СЌРЅРґРїРѕРёРЅС‚С‹ Рё СЃС…РµРјС‹ Р‘Р” (СЃРј. `docs/`).

## Deployment

- Live: https://merkulovid-ux.github.io/retrospective/
- Workflow: [![pages](https://github.com/merkulovid-ux/retrospective/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/merkulovid-ux/retrospective/actions)
- Notes: deploy may take a few minutes after push.

