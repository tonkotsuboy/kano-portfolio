// Simple offline-first service worker generated manually following Next.js PWA guide
const CACHE_NAME = "kano-portfolio-cache-v3";
const PRECACHE_URLS = [
  "/manifest.webmanifest",
  "/favicon.ico",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/apple-touch-icon.png",
  "/android-chrome-36x36.png",
  "/android-chrome-48x48.png",
  "/android-chrome-72x72.png",
  "/android-chrome-96x96.png",
  "/android-chrome-128x128.png",
  "/android-chrome-144x144.png",
  "/android-chrome-152x152.png",
  "/android-chrome-192x192.png",
  "/android-chrome-256x256.png",
  "/android-chrome-384x384.png",
  "/android-chrome-512x512.png",
  "/ogimage.png",
  "/offline.html",
];

// Cache First で扱うHTMLページ（更新頻度が低いページ）
const CACHE_FIRST_HTML_PATHS = ["/about", "/contact"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        )
      ),
      self.clients.claim(),
    ])
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isHtmlNavigation =
    request.mode === "navigate" ||
    request.headers.get("accept")?.includes("text/html");

  if (isHtmlNavigation) {
    const isCacheFirstPage = CACHE_FIRST_HTML_PATHS.includes(url.pathname);

    if (isCacheFirstPage) {
      // /about, /contact: Cache First → オフライン時と同様にキャッシュを優先
      event.respondWith(
        caches.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;

          return fetch(request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, clone);
              });
            }
            return networkResponse;
          }).catch(() => caches.match("/offline.html"));
        })
      );
    } else {
      // /, /entry/* など: Network First → 常に最新を取得、オフライン時のみキャッシュにフォールバック
      event.respondWith(
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, clone);
              });
            }
            return networkResponse;
          })
          .catch(() => caches.match(request).then((cached) => cached ?? caches.match("/offline.html")))
      );
    }
  } else {
    // JS/CSS/画像など: Cache First（ファイル名にハッシュが入るため安全）
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return networkResponse;
        });
      })
    );
  }
});
