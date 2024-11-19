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
      includeAssets: ["favicon.png", "apple-touch-icon.png", "mask-icon.png"],

      pwaAssets: {
        disabled: false,
        config: true,
      },

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
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        globDirectory: "dist",
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        navigateFallback: "index.html",
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
