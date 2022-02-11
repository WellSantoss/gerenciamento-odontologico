import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/Default.vue"),
      meta: {
        requiresAuth: true,
      },
      children: routes,
    },
    {
      path: "/login",
      name: "login",
      meta: {
        requiresAuth: false,
      },
      component: () => import("@/views/Login.vue"),
    },
  ],
});

export default router;
