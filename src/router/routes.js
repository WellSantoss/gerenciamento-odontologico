export const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("@/views/users/Users.vue"),
  },
];
