/**
 * Langkah pertama mendaftarkan service worker di navigator
 */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("serviceWorker.js")
    .then((registration) => {
      console.log("SW registered", registration.scope);
    })
    .catch((err) => {
      console.log("SW registration failed", err);
    });
}
