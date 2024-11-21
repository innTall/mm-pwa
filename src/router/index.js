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
  ],
});
export default router;
