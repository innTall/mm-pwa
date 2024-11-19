import { createRouter, createWebHistory } from "vue-router";
import TradePage from "../views/TradePage.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Trade",
      component: TradePage,
    },
    {
      path: "/order",
      name: "Order",
      component: () => import("../views/OrderPage.vue"),
    },
  ],
});
export default router;
