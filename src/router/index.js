import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage,
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/AboutPage.vue"),
    },
  ],
});
export default router;
