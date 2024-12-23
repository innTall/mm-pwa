import { createRouter, createWebHistory } from "vue-router";
//import MarginTrade from "../views/MarginTrade.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /*
    {
      path: "/",
      name: "MarginTrade",
      component: MarginTrade,
    },
    {
      path: "/spotTrade",
      name: "SpotTrade",
      component: () => import("../views/SpotTrade.vue"),
    },
    */
    {
      path: "/",
      name: "TestPage",
      component: () => import("../views/TestPage.vue"),
    },
  ],
});

export default router;
