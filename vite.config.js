import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/mm-pwa/",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      includeAssets: [
        "favicon.png",
        "apple-touch-icon.png",
        "mask-icon.png",
        "robots.txt",
      ],
      manifest: {
        name: "mm-pwa",
        short_name: "mm-pwa",
        description: "simple app as widget",
        theme_color: "#000000",
        icons: [
          {
            src: "pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "mask-icon.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,json}"],
        //globDirectory: "dist",
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        navigateFallback: "/mm-pwa/index.html",
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/my-api-domain\.com\/.*$/, // Offline caching for specific API
            handler: "CacheFirst", // Use cached content first, fallback to network
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60, // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200], // Cache opaque and successful responses
              },
            },
          },
          {
            urlPattern: /\/.*/, // Cache all navigation requests
            handler: "CacheFirst", // Try network first; fall back to cache
            options: {
              cacheName: "app-assets-cache",
              expiration: {
                maxEntries: 1000,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
        offlineGoogleAnalytics: true, // Optionally enable offline GA
      },
      devOptions: {
        enabled: process.env.NODE_ENV === "development",
        navigateFallback: "/mm-pwa/index.html",
        suppressWarnings: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
