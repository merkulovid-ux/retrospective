const CACHE = 'agilta-cache-v1';
const CORE = [
  '/retrospective/',
  '/retrospective/index.html',
  '/retrospective/assets/styles.css',
  '/retrospective/assets/icon-192.png',
  '/retrospective/assets/icon-512.png',
  '/retrospective/assets/icon-512-maskable.png',
  '/retrospective/assets/apple-touch-icon.png',
  '/retrospective/offline.html'
];
self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
});
self.addEventListener('fetch', (e)=>{
  if (e.request.method!=='GET') return;
  const u = new URL(e.request.url);
  // HTML and navigation: network-first with offline fallback
  if (e.request.mode==='navigate' || u.pathname.endsWith('.html') || u.pathname.endsWith('/')){
    e.respondWith(
      fetch(e.request)
        .then(r=>{ const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request, copy)); return r; })
        .catch(()=>caches.match(e.request).then(r=> r || caches.match('/retrospective/offline.html')))
    );
    return;
  }
  // assets: cache-first
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request).then(res=>{ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request, copy)); return res; }))
  );
});
