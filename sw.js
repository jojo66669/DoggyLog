const CACHE = "doggylog-2.4.72";
const PRECACHE = ["/DoggyLog/", "/DoggyLog/index.html"];

self.addEventListener("install", (e) => {
	e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)));
	self.skipWaiting();
});

self.addEventListener("activate", (e) => {
	e.waitUntil(
		caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
	);
	self.clients.claim();
});

// Network first, fallback to cache
self.addEventListener("fetch", (e) => {
	if (e.request.mode === "navigate") {
		e.respondWith(fetch(e.request).catch(() => caches.match("/DoggyLog/index.html")));
	}
});
