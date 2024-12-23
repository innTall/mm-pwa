import { createRouter, createWebHistory } from "vue-router";
import MarginTrade from "../views/MarginTrade.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MarginTrade",
      component: MarginTrade,
    },
    {
      path: "/fullCode",
      name: "FullCode",
      component: () => import("../views/FullCode.vue"),
    },
  ],
});

export default router;
