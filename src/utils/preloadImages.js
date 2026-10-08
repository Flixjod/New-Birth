/**
 * Warm the browser cache for story images so scenes never pop in.
 * Never rejects — a missing photo simply resolves.
 */
export function preloadImages(urls = []) {
  return Promise.allSettled(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => resolve(src);
          img.src = src;
        }),
    ),
  );
}
