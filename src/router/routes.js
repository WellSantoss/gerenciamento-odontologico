export const routes = [
  {
    name: "inicio",
    path: "/inicio",
    component: () => import("@/views/Home.vue"),
  },
  {
    name: "usuarios",
    path: "/usuarios",
    component: () => import("@/views/Usuarios.vue"),
  },
  {
    name: "dentistas",
    path: "/dentistas",
    component: () => import("@/views/Dentists.vue"),
  },
  {
    name: "consultas",
    path: "/consultas",
    component: () => import("@/views/Consultas.vue"),
  },
  {
    name: "paciente",
    path: "/pacientes/:id",
    props: true,
    component: () => import("@/views/Paciente.vue"),
  },
];
