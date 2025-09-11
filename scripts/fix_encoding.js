import fs from 'fs';
import path from 'path';

const root = 'C:/Users/U_M16X2/Documents/Agilta/retrospective';
const idx = path.join(root, 'index.html');

function readUtf8(p){ return fs.readFileSync(p, 'utf8'); }
function writeUtf8(p, s){ fs.writeFileSync(p, s, { encoding: 'utf8' }); }

function replaceSection(s, startTag, replacement){
  const i = s.indexOf(startTag);
  if (i < 0) return s;
  const j = s.indexOf('</section>', i);
  if (j < 0) return s;
  return s.slice(0, i) + replacement + s.slice(j + '</section>'.length);
}

let html = readUtf8(idx);

// Ensure UTF-8 meta first and canonical/theme/manifest/css/icons are present
html = html.replace(/<head>\s*/i, '<head>\n  <meta charset="utf-8" />\n');
if (!/Content-Type\" content=\"text\/html; charset=utf-8\"/i.test(html)){
  html = html.replace('<meta charset="utf-8" />', '<meta charset="utf-8" />\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />');
}
if (!/rel=\"manifest\"/i.test(html)){
  html = html.replace('</head>', '<meta name="theme-color" content="#0b1220" />\n<link rel="manifest" href="assets/site.webmanifest" />\n</head>');
}
if (!/id=\"retro-css\"/i.test(html)){
  html = html.replace('</head>', '<link id="retro-css" rel="stylesheet" href="assets/styles.css" />\n</head>');
}
if (!/rel=\"icon\"[^>]*image\/png/i.test(html)){
  html = html.replace('</head>', '<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png" />\n<link rel="icon" type="image/png" sizes="192x192" href="assets/icon-192.png" />\n</head>');
}
html = html.replace(/<link rel=\"canonical\"[^>]*>/i, '')
           .replace('</head>', '<link rel="canonical" href="https://merkulovid-ux.github.io/retrospective/" />\n</head>');

// Replace broken texts with correct RU equivalents
html = html.replace(/<title>[\s\S]*?<\/title>/i, '<title>Фасилитация ретроспектив — интенсив за 1 неделю</title>');
html = html.replace(/<meta name=\"description\"[^>]*>/i, '<meta name="description" content="Практический интенсив по фасилитации ретроспектив: сценарии, роли, чек‑листы и упражнения. Онлайн, 1 неделя."/>');
html = html.replace(/<meta property=\"og:title\"[^>]*>/i, '<meta property="og:title" content="Фасилитация ретроспектив — интенсив за 1 неделю"/>');
html = html.replace(/<meta property=\"og:description\"[^>]*>/i, '<meta property="og:description" content="Онлайн‑курс: сценарии ретро, роль фасилитатора, метрики улучшений."/>');
html = html.replace(/<meta name=\"twitter:title\"[^>]*>/i, '<meta name="twitter:title" content="Фасилитация ретроспектив — интенсив за 1 неделю"/>');
html = html.replace(/<meta name=\"twitter:description\"[^>]*>/i, '<meta name="twitter:description" content="Онлайн‑курс: сценарии ретро, роль фасилитатора, метрики улучшений."/>');

// Logo & nav & CTAs
html = html.replace(/<div class=\"retro-logo\">[\s\S]*?<\/div>/i, '<div class="retro-logo">Agilta • Фасилитация ретроспектив</div>');
html = html.replace(/(<a[^>]*href=\"#program\"[^>]*>)[\s\S]*?(<\/a>)/i, '$1Программа$2');
html = html.replace(/(<a[^>]*href=\"#faq\"[^>]*>)[\s\S]*?(<\/a>)/i, '$1FAQ$2');
html = html.replace(/(<a[^>]*href=\"#register\"[^>]*>)[\s\S]*?(<\/a>)/ig, '$1Записаться$2');
html = html.replace(/(<a[^>]*data-cta=\"(?:hero|sticky|pricing|nav:register)\"[^>]*>)[\s\S]*?(<\/a>)/ig, '$1Записаться$2');

// Hero
html = html.replace(/<h1>[\s\S]*?<\/h1>/i, '<h1>Фасилитация ретроспектив: практики и инструменты</h1>');
html = html.replace(/(<p class=\"lead\">)[\s\S]*?(<\/p>)/i, '$1Практический интенсив: проводить продуктивные ретро, работать с динамикой группы и превращать инсайты в улучшения.$2');
html = html.replace(/(<p class=\"retro-datetime\"[^>]*>)[\s\S]*?(<\/p>)/ig, '$1Ближайший старт: <strong>15.09.2025</strong>, 7 занятий, онлайн в Zoom$2');

// FAQ section (overwrite)
const faq = [
  '  <section id="faq" class="is-tint" data-section="faq">',
  '    <div class="retro-wrap">',
  '      <h2>FAQ</h2>',
  '      <details>',
  '        <summary>Как проходит обучение?</summary>',
  '        <div>Онлайн в Zoom, 7 занятий по 60–90 минут. Записи доступны участникам.</div>',
  '      </details>',
  '      <details>',
  '        <summary>Нужна ли подготовка?</summary>',
  '        <div>Достаточно базового опыта командной работы. Важнее — интерес к фасилитации.</div>',
  '      </details>',
  '      <details>',
  '        <summary>Будут ли материалы и шаблоны?</summary>',
  '        <div>Да. Вы получите чек‑листы, сценарии ретроспектив и примеры артефактов.</div>',
  '      </details>',
  '      <details>',
  '        <summary>Можно ли вернуть оплату?</summary>',
  '        <div>Да. До второго занятия возможен возврат по запросу.</div>',
  '      </details>',
  '      <details>',
  '        <summary>Выдаётся ли сертификат?</summary>',
  '        <div>По итогам курса выдаётся сертификат об участии.</div>',
  '      </details>',
  '    </div>',
  '  </section>'
].join('\n');
html = replaceSection(html, '<section id="faq"', faq);

// Program section (overwrite)
const program = [
  '  <section id="program" data-section="program">',
  '    <div class="retro-wrap">',
  '      <h2>Программа</h2>',
  '      <div class="retro-grid cols-2">',
  '        <div class="retro-card">',
  '          <ol class="retro-list">',
  '            <li>Роль фасилитатора: рамка, безопасность, контракт.<br><small>Практика: ожидания, правила, цели ретро.</small></li>',
  '            <li>Форматы ретроспектив: сценарии и управление временем.<br><small>Практика: подбор формата под контекст.</small></li>',
  '            <li>Работа с конфликтами и динамикой группы.<br><small>Практика: техники деэскалации.</small></li>',
  '            <li>От инсайтов к улучшениям: план и исполнение.<br><small>Практика: формулируем действия и владельцев.</small></li>',
  '            <li>Метрики и трекинг улучшений.<br><small>Практика: план трекинга и шаблоны.</small></li>',
  '            <li>Итоги и поддержание практики в команде.<br><small>Практика: ретро‑ретро, улучшение процесса.</small></li>',
  '          </ol>',
  '        </div>',
  '        <div class="retro-card">',
  '          <strong>Результаты</strong>',
  '          <ul class="retro-list">',
  '            <li>Сценарии и чек‑листы ретроспектив.</li>',
  '            <li>Навыки фасилитации и работы с группой.</li>',
  '            <li>План измерений и трекинг улучшений.</li>',
  '          </ul>',
  '        </div>',
  '      </div>',
  '    </div>',
  '  </section>'
].join('\n');
html = replaceSection(html, '<section id="program"', program);

// Intro-video simple (avoid poster encoding)
const intro = [
  '  <section id="intro-video" class="is-tint" data-section="video" aria-label="Вводное видео">',
  '    <div class="retro-wrap">',
  '      <h2>Знакомство с курсом</h2>',
  '      <p>Короткое вводное видео (45–60 минут). Пока видео недоступно — <a href="#program">посмотрите программу</a>.</p>',
  '    </div>',
  '  </section>'
].join('\n');
html = replaceSection(html, '<section id="intro-video"', intro);

// Format & Speakers short overwrite (safe texts)
const speakers = [
  '  <section id="speakers" data-section="speakers">',
  '    <div class="retro-wrap">',
  '      <h2>Преподаватель</h2>',
  '      <p class="lead">Коротко о ведущем — опыт фасилитации командных ритуалов, запуск процессов, обучение фасилитаторов.</p>',
  '    </div>',
  '  </section>'
].join('\n');
html = replaceSection(html, '<section id="speakers"', speakers);

const format = [
  '  <section id="format" data-section="format">',
  '    <div class="retro-wrap">',
  '      <h2>Формат и даты</h2>',
  '      <p>Онлайн, 7 занятий по 60–90 минут. Практика в мини‑группах. Доступ к материалам и шаблонам.</p>',
  '    </div>',
  '  </section>'
].join('\n');
html = replaceSection(html, '<section id="format"', format);

// JSON-LD cleanup
html = html.replace(/"name"\s*:\s*"[^"]+"/i, '"name": "Фасилитация ретроспектив — интенсив за 1 неделю"');
html = html.replace(/"description"\s*:\s*"[^"]+"/i, '"description": "Онлайн‑интенсив: сценарии, роли, шаблоны и трекинг улучшений."');
html = html.replace(/"provider"\s*:\s*\{[\s\S]*?\}/i, '"provider": { "@type": "Organization", "name": "Agilta" }');
html = html.replace(/"educationalCredentialAwarded"\s*:\s*"[^"]+"/i, '"educationalCredentialAwarded": "Сертификат об участии"');

writeUtf8(idx, html);

// Quick report
const badCount = (html.match(/[�]/g)||[]).length;
const hasBrokenR = /Р[Ѐ-џ]/.test(html);
console.log('Done. BadCharCount:', badCount, 'HasBrokenPattern:', hasBrokenR);

// Overwrite entire <body> with a clean, known-good skeleton to eliminate residual mojibake
function replaceBody(html, bodyHtml){
  return html.replace(/<body[\s\S]*?<\/body>/i, <body class=\"retro\">\n\n</body>);
}
const bodyClean = [
  '  <a class="retro-skip" href="#main">Пропустить к содержимому</a>',
  '  <header>',
  '    <div class="retro-wrap">',
  '      <nav aria-label="Главная навигация">',
  '        <div class="retro-logo">Agilta • Фасилитация ретроспектив</div>',
  '        <div class="retro-nav">',
  '          <a href="#program" data-cta="nav:program">Программа</a>',
  '          <a href="#faq" data-cta="nav:faq">FAQ</a>',
  '          <a class="retro-cta" data-cta="nav:register" href="#register">Записаться</a>',
  '        </div>',
  '      </nav>',
  '    </div>',
  '  </header>',
  '  <main id="main">',
  '    <section class="retro-hero" data-section="hero">',
  '      <div class="retro-wrap">',
  '        <h1>Фасилитация ретроспектив: практики и инструменты</h1>',
  '        <p class="retro-datetime">Ближайший старт: <strong>15.09.2025</strong>, 7 занятий, онлайн в Zoom</p>',
  '        <p class="lead">Практический интенсив: проводить продуктивные ретро, работать с динамикой группы и превращать инсайты в улучшения.</p>',
  '        <div class="retro-badges" aria-label="Формат и преимущества">',
  '          <span class="retro-badge">Онлайн в Zoom</span>',
  '          <span class="retro-badge">Практика и шаблоны</span>',
  '          <span class="retro-badge">Поддержка внедрения</span>',
  '        </div>',
  '        <p style="margin-top:12px; display:flex; gap:12px; flex-wrap:wrap">',
  '          <a class="retro-cta" data-cta="hero" href="#register">Записаться</a>',
  '          <a class="retro-cta" data-cta="pricing" href="#register">Уточнить стоимость</a>',
  '        </p>',
  '      </div>',
  '    </section>',
  program,
  intro,
  speakers,
  format,
  faq,
  '    <section id="register" data-section="register">',
  '      <div class="retro-wrap">',
  '        <h2>Записаться на курс</h2>',
  '        <p class="retro-datetime">Ближайший старт: <strong>15.09.2025</strong>, 7 занятий, онлайн в Zoom</p>',
  '        <form id="lead-form" data-google-form-url="https://docs.google.com/forms/d/e/FORM_ID/formResponse" data-field-name="entry.123456" data-field-email="entry.234567" data-field-role="entry.345678" class="retro-form" action="#register" method="post" aria-describedby="form-note" novalidate>',
  '          <div id="retro-form-status" aria-live="polite" role="status"></div>',
  '          <input type="text" name="company" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">',
  '          <div class="retro-field">',
  '            <label for="name">Имя и фамилия</label>',
  '            <input id="name" name="name" autocomplete="name" required />',
  '          </div>',
  '          <div class="retro-field">',
  '            <label for="email">Email <span aria-hidden="true">*</span></label>',
  '            <input id="email" name="email" type="email" autocomplete="email" required />',
  '          </div>',
  '          <div class="retro-field">',
  '            <label for="phone">Телефон <small>(опционально)</small></label>',
  '            <input id="phone" name="phone" type="tel" inputmode="tel" placeholder="+7 900 000-00-00" />',
  '          </div>',
  '          <div class="retro-consent">',
  '            <input type="checkbox" id="consent" name="consent" required />',
  '            <label for="consent">Согласен с обработкой персональных данных и условиями оферты</label>',
  '          </div>',
  '          <div class="retro-actions">',
  '            <button class="retro-cta" data-cta="form-submit" type="submit">Записаться</button>',
  '            <span id="form-note">Мы пришлём программу и напоминание на указанный email.</span>',
  '          </div>',
  '        </form>',
  '      </div>',
  '    </section>',
  '  </main>',
  '  <div id="retroSticky" class="retro-sticky" aria-hidden="true">',
  '    <span>PDF‑программа и ранняя регистрация</span>',
  '    <a class="retro-cta" data-cta="sticky" href="#register">Записаться</a>',
  '    <button class="retro-close" type="button" aria-label="Закрыть" title="Закрыть" data-close>×</button>',
  '  </div>',
  '  <footer>',
  '    <div class="retro-wrap">',
  '      <div>© Agilta. Все права защищены. <a href="#">Политика конфиденциальности</a> · <a href="#">Публичная оферта</a></div>',
  '    </div>',
  '  </footer>',
  '  <script id="retro-tracking">',
  '  (function(){',
  "    var PAGE='landing-retro';",
  '    document.addEventListener("click", function(e){ var t=e.target.closest("[data-cta]"); if(!t) return; var payload={event:"click_cta", cta_id:t.getAttribute("data-id")||t.getAttribute("data-cta"), page:PAGE, ts:Date.now()}; try{ window.dataLayer=window.dataLayer||[]; window.dataLayer.push(payload);}catch(_){ } console.debug(payload); }, {passive:true});',
  '    if("IntersectionObserver" in window){ var seen=new Set(); var io=new IntersectionObserver(function(entries){ entries.forEach(function(en){ var id=en.target.dataset.section||en.target.id; if(en.isIntersecting && id && !seen.has(id)){ seen.add(id); var payload={event:"view_section", section:id, page:PAGE, ts:Date.now()}; try{ window.dataLayer.push(payload);}catch(_){ } console.debug(payload); io.unobserve(en.target);} }); }, { threshold: .5, rootMargin:"0px 0px -10% 0px" }); document.querySelectorAll("[data-section]").forEach(function(el){ io.observe(el); }); }',
  '  })();',
  '  </script>',
  '  <script id="retro-form-a11y">',
  '  (function(){',
  '    var form=document.getElementById("lead-form"); if(!form) return; var status=document.getElementById("retro-form-status"); if(status){ status.setAttribute("aria-live","polite"); status.setAttribute("role","status"); }',
  '    function isEmail(v){ return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(v||""); }',
  '    function mark(el, ok){ if(!el) return; el.setAttribute("aria-invalid", ok? "false":"true"); }',
  '    function show(msg){ if(status){ status.textContent=msg||""; } }',
  '    var email=form.querySelector("input[name=\"email\"]"); var consent=form.querySelector("input[name=\"consent\"]"); var role=form.querySelector("select[name=\"role\"]");',
  '    if(email){ email.addEventListener("blur", function(){ mark(email, isEmail(email.value)); }); email.addEventListener("input", function(){ if(status && status.textContent) show(""); }); }',
  '    if(consent){ consent.addEventListener("change", function(){ mark(consent, consent.checked); }); }',
  '    form.addEventListener("submit", function(e){',
  '      var honey=form.querySelector("input[name=\"company\"]"); if(honey && honey.value){ e.preventDefault(); show("Ошибка отправки."); return; }',
  '      var ok=true; if(!isEmail(email && email.value)){ ok=false; mark(email,false); show("Введите корректный email."); }',
  '      if(consent && !consent.checked){ ok=false; mark(consent,false); show("Подтвердите согласие на обработку данных."); }',
  '      if(!ok){ e.preventDefault(); return; }',
  '      var gf=form.getAttribute("data-google-form-url")||""; if(/FORM_ID/.test(gf)){ e.preventDefault(); show("Заявка сохранена локально. Интеграция формы будет добавлена позже."); console.debug({event:"submit_form", hasEmail:!!(email&&email.value), role:(role&&role.value)||"", page:"landing-retro", ts:Date.now()}); form.reset(); }',
  '    });',
  '  })();',
  '  </script>'
].join('\n');
html = replaceBody(html, bodyClean);
writeUtf8(idx, html);
console.log('Body replaced with clean skeleton');
