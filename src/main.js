import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import { registerSW } from "virtual:pwa-register";
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
// Register the Service Worker
registerSW({
  onNeedRefresh() {
    console.log("New content available, please refresh.");
  },
  onOfflineReady() {
    console.log("App is ready to work offline.");
  },
});
app.use(pinia).use(router).mount("#app");
