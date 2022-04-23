export const routes = [
  {
    path: "/inicio",
    name: "inicio",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: () => import("@/views/Users.vue"),
  },
  {
    path: "/dentistas",
    name: "dentistas",
    component: () => import("@/views/Dentists.vue"),
  },
];
