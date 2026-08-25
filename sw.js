const CACHE = "with-fam-v0.4.0";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.webmanifest",
  "./sky-bg.png",
  "./assets/stamps/airplane.png",
  "./assets/stamps/backpack.png",
  "./assets/stamps/balloons.png",
  "./assets/stamps/bed.png",
  "./assets/stamps/beer.png",
  "./assets/stamps/bento.png",
  "./assets/stamps/birthday_cake.png",
  "./assets/stamps/book.png",
  "./assets/stamps/bubble_tea.png",
  "./assets/stamps/cake_slice.png",
  "./assets/stamps/camera.png",
  "./assets/stamps/candy.png",
  "./assets/stamps/car.png",
  "./assets/stamps/choco_strawberry.png",
  "./assets/stamps/chocolate.png",
  "./assets/stamps/clover.png",
  "./assets/stamps/coffee.png",
  "./assets/stamps/cookie.png",
  "./assets/stamps/cupcake.png",
  "./assets/stamps/cutlery.png",
  "./assets/stamps/dinner.png",
  "./assets/stamps/donut.png",
  "./assets/stamps/flowers.png",
  "./assets/stamps/gift.png",
  "./assets/stamps/heart.png",
  "./assets/stamps/horn.png",
  "./assets/stamps/hospital.png",
  "./assets/stamps/house.png",
  "./assets/stamps/icecream.png",
  "./assets/stamps/laptop.png",
  "./assets/stamps/lollipop.png",
  "./assets/stamps/macaron.png",
  "./assets/stamps/medical_bag.png",
  "./assets/stamps/microphone.png",
  "./assets/stamps/moneybag.png",
  "./assets/stamps/moon_stars.png",
  "./assets/stamps/music_note.png",
  "./assets/stamps/music_stand.png",
  "./assets/stamps/nurse_cap.png",
  "./assets/stamps/onigiri.png",
  "./assets/stamps/paw.png",
  "./assets/stamps/pencil.png",
  "./assets/stamps/popcorn.png",
  "./assets/stamps/pudding.png",
  "./assets/stamps/rainbow.png",
  "./assets/stamps/sakura.png",
  "./assets/stamps/snowman.png",
  "./assets/stamps/star.png",
  "./assets/stamps/stethoscope.png",
  "./assets/stamps/suitcase.png",
  "./assets/stamps/sun.png",
  "./assets/stamps/syringe.png",
  "./assets/stamps/train.png",
  "./assets/stamps/treble_clef.png",
  "./assets/stamps/violin.png",
  "./assets/stamps/watermelon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const isAppCode = request.mode === "navigate" || /\.(?:html|css|js)$/.test(url.pathname);
  if (isAppCode) {
    event.respondWith(
      fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request).then(hit => hit || caches.match(url.pathname.endsWith('/') ? './index.html' : url.pathname.replace(self.location.pathname.replace(/[^/]*$/, ''), './'))))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(hit => hit || fetch(request).then(response => {
      const copy = response.clone();
      caches.open(CACHE).then(cache => cache.put(request, copy));
      return response;
    }))
  );
});
