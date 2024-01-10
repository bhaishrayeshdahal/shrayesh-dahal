const cacheName = "patro-v1";
const cacheUrls = [
  "./",
  "./data/international_events.json",
  "./data/national_events.json",
  "./data/solar_ns_events.json",
  "./data/2076_detailed.json",
  "./data/2077_detailed.json",
  "./data/2078_detailed.json",
  "./data/2079_detailed.json",
  "./data/2080_detailed.json",
  "./data/2081_detailed.json",
  "./data/public_holidays.json",
 
 
  "./css/patro1.css",
  "./css/patro.css",
  "./js/NS.js",
  "./js/NS_AD.js",
  "./js/NS_BS.js",
  "./js/AD_BS.js",
  "./js/addons.js",
  "./js/constants.js",
  "./js/patro.js",
  "./js/swipe_actions.js",
 
  
  "./index.html",
];

// Installing the Service Worker
self.addEventListener("install", async (event) => {
  try {
    const cache = await caches.open(cacheName);
    await cache.addAll(cacheUrls);
  } catch (error) {
    console.error("Service Worker installation failed:", error);
  }
});

// Fetching resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);

      try {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          console.log("cachedResponse: ", event.request.url);
          return cachedResponse;
        }

        const fetchResponse = await fetch(event.request);
        if (fetchResponse) {
          console.log("fetchResponse: ", event.request.url);
          await cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        }
      } catch (error) {
        console.log("Fetch failed: ", error);
        const cachedResponse = await cache.match("index.html");
        return cachedResponse;
      }
    })()
  );
});
