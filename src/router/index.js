import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.js";
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
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginPage.vue"),
    },
    {
      path: "/protected",
      name: "Protected",
      component: () => import("../views/ProtectedPage.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/admin",
      name: "Admin",
      component: () => import("../views/AdminPage.vue"),
      meta: { requiresAdmin: true },
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const { user } = authStore;

  if (to.meta.requiresAuth && !authStore.user) {
    return next("/login"); // Redirect to login if user is not authenticated
  }
  if (to.meta.requiresAdmin && (!user || user.role !== "admin")) {
    return next("/"); // Redirect non-admins to home page
  }
  next(); // Allow navigation
});
export default router;
