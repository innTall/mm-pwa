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
      path: "/marginBybitRes",
      name: "MarginBybitRes",
      component: () => import("../views/MarginBybitRes.vue"),
    },
    {
      path: "/marginBinance",
      name: "MarginBinance",
      component: () => import("../views/MarginBinance.vue"),
    },
    {
      path: "/marginBinanceRes",
      name: "MarginBinanceRes",
      component: () => import("../views/MarginBinanceRes.vue"),
    },
    {
      path: "/marginBitget",
      name: "MarginBitget",
      component: () => import("../views/MarginBitget.vue"),
    },
    {
      path: "/marginBitgetRes",
      name: "MarginBitgetRes",
      component: () => import("../views/MarginBitgetRes.vue"),
    },
    {
      path: "/spotBinance",
      name: "SpotBinance",
      component: () => import("../views/SpotBinance.vue"),
    },
    {
      path: "/spotBinanceRes",
      name: "SpotBinanceRes",
      component: () => import("../views/SpotBinanceRes.vue"),
    },
    {
      path: "/spotBybit",
      name: "SpotBybit",
      component: () => import("../views/SpotBybit.vue"),
    },
    {
      path: "/spotBybitRes",
      name: "SpotBybitRes",
      component: () => import("../views/SpotBybitRes.vue"),
    },
    {
      path: "/spotBitget",
      name: "SpotBitget",
      component: () => import("../views/SpotBitget.vue"),
    },
    {
      path: "/spotBitgetRes",
      name: "SpotBitgetRes",
      component: () => import("../views/SpotBitgetRes.vue"),
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
    {
      path: "/depositBitget",
      name: "DepositBitget",
      component: () => import("../components/DepositBitget.vue"),
    },
  ],
});
export default router;
