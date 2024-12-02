import { createRouter, createWebHistory } from "vue-router";
import MarginBybit from "../views/MarginBybit.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "MarginBybit",
      component: MarginBybit,
    },
    {
      path: "/marginBybitResult",
      name: "MarginBybitResult",
      component: () => import("../views/MarginBybitResult.vue"),
    },
    {
      path: "/marginBinance",
      name: "MarginBinance",
      component: () => import("../views/MarginBinance.vue"),
    },
    {
      path: "/marginBinanceResult",
      name: "MarginBinanceResult",
      component: () => import("../views/MarginBinanceResult.vue"),
    },
    {
      path: "/gridBinance",
      name: "GridBinance",
      component: () => import("../views/GridBinance.vue"),
    },
    {
      path: "/gridBinanceResult",
      name: "GridBinanceResult",
      component: () => import("../views/GridBinanceResult.vue"),
    },
    {
      path: "/gridBybit",
      name: "GridBybit",
      component: () => import("../views/GridBybit.vue"),
    },
    {
      path: "/gridBybitResult",
      name: "GridBybitResult",
      component: () => import("../views/GridBybitResult.vue"),
    },
    
    {
      path: "/depositBinance",
      name: "DepositBinance",
      component: () => import("../components/DepositBinance.vue"),
    },
    {
      path: "/depositBybit",
      name: "DepositBybit",
      component: () => import("../components/DepositBybit.vue"),
    },
  ],
});
export default router;
