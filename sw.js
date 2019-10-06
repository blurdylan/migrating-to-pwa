let initialcacheName = "restaurant-v1";

// Installing service Worker using install event
self.addEventListener("install", function(event) {
  console.log("serviceWorker Installed");
  event.waitUntil(
    caches.open(initialcacheName).then(function(cache) {
      cache.addAll([
        "/index.html",
        "/restaurant.html",
        "/offline.html",
        "./css/styles.css",
        "./js/dbhelper.js",
        "./js/main.js",
        "./js/restaurant_info.js",
        "./data/restaurants.json",
        "https://unpkg.com/tailwindcss@1.1.2/dist/tailwind.min.css",
        "https://fonts.googleapis.com/css?family=Rubik:400,700&display=swap",
        "/img/1.jpg",
        "/img/2.jpg",
        "/img/3.jpg",
        "/img/4.jpg",
        "/img/5.jpg",
        "/img/6.jpg",
        "/img/7.jpg",
        "/img/8.jpg",
        "/img/9.jpg",
        "/img/10.jpg",
        "/restaurant.html?id=1",
        "/restaurant.html?id=2",
        "/restaurant.html?id=3",
        "/restaurant.html?id=4",
        "/restaurant.html?id=5",
        "/restaurant.html?id=6",
        "/restaurant.html?id=7",
        "/restaurant.html?id=8",
        "/restaurant.html?id=9",
        "/restaurant.html?id=10"
      ]);
    })
  );
});

// Activating serviceWorker
self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return (
              cacheName.startsWith("restaurant-") &&
              cacheName != initialcacheName
            );
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// Fetching Data using fetch event
self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return (
        resp ||
        fetch(event.request).then(function(response) {
          return caches.open(initialcacheName).then(function(cache) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});
