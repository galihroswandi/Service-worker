/**
 * Langkah pertama mendaftarkan service worker di navigator
 */
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/serviceWorker.js')
    .then(registration => {
        console.log('SW registered', registration.scope);
    }).catch(err => {
        console.log('SW registration failed', err);
    })
}

/**
 * Langkah kedua menyiapkan data yang akan di caching
 */
const cache1 = "Learn-Cache0";
const cacheAssets = [
    "/",
    "/src/style/global.css",
    "/src/js/index.js",
    "/src/assets/images/logo.svg"
];

/**
 * Langkah ketiga mengunduh / menginstall service worker di browser
 * Pada langkah ini biasanya menyertakan cacheAssets yang akan di caching
 * Ini adalah tempat yang cocok untuk memasukan data ke dalam cache
 */
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cache1)
        .then(cache => {
            cache.addAll(cacheAssets);
            console.log('caching successfully');
        }).catch(err => {
            console.log('caching failed');
        })
    )
});

/**
 * Langkah keempat untuk menghapus cache yang tidak diperlukan lagi
 * Pada langkah ini biasanya sw akan mengecek apakah ada cache yang baru dibuat,
 * Ketika ada maka sw akan menghapus cache lama
 * Ini adalah tempat yang cocok untuk menghapus cache
 */
self.addEventListener('activate', function(event) {
    console.log('activate dijalankan')
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames.filter(cacheName =>{
                return cacheName !== cache1
            }).map(cacheName => {
                caches.delete(cacheName);
            })
        );
      })
    );
  });

  /**
   * Langkah kelima untuk mengambil data dari cache
   * Pada langkah ini biasanya sw akan mengecek apakah request yang masuk sudah ada di cache atau belum,
   * Jika ada maka sw akan menampilkan data dari cache
   * Jika tidak ada maka sw akan mengirim request ke server
   * Ini adalah tempat yang cocok untuk mengambil data dari cache
   */
  self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if(response) {
                return response;
            };

            return fetch(event.request);
        })
    )
  });