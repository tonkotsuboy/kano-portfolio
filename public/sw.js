// Simple offline-first service worker generated manually following Next.js PWA guide
const CACHE_NAME = "kano-portfolio-cache-v2";
const PRECACHE_URLS = [
  "/",
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

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request)
        .then((networkResponse) => {
          // ネットワークエラーでない場合のみキャッシュに保存
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // ネットワークエラー時：HTMLナビゲーションの場合はオフラインページを返す
          if (request.headers.get("accept").includes("text/html")) {
            return caches.match("/offline.html");
          }
          // その他のリソース（画像、CSSなど）はキャッシュから返せない場合は失敗
          return new Response("Offline", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
    })
  );
});
