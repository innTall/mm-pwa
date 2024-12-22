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
      path: "/depositBybit",
      name: "DepositBybit",
      component: () => import("../components/DepositBybit.vue"),
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
