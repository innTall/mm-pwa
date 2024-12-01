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
      path: "/gridBinance",
      name: "GridBinance",
      component: () => import("../views/GridBinance.vue"),
    },
    {
      path: "/gridBybit",
      name: "GridBybit",
      component: () => import("../views/GridBybit.vue"),
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
