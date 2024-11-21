import { createRouter, createWebHistory } from "vue-router";
import BybitMarginMM from "../views/BybitMarginMM.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "BybitMarginMM",
      component: BybitMarginMM,
    },
    {
      path: "/bybitMarginResult",
      name: "BybitMarginResult",
      component: () => import("../views/BybitMarginResult.vue"),
    },
    {
      path: "/gridOptions",
      name: "GridOptions",
      component: () => import("../views/GridOptions.vue"),
    },
    {
      path: "/bybitSpotResult",
      name: "BybitSpotResult",
      component: () => import("../views/BybitSpotResult.vue"),
    },
    {
      path: "/binanceSpotResult",
      name: "BinanceSpotResult",
      component: () => import("../views/BinanceSpotResult.vue"),
    },
  ],
});
export default router;
