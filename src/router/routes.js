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
    component: () => import("@/views/Dentistas.vue"),
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
  {
    name: "fornecedores",
    path: "/fornecedores",
    props: true,
    component: () => import("@/views/Fornecedores.vue"),
  },
  {
    name: "produtos",
    path: "/produtos",
    props: true,
    component: () => import("@/views/Produtos.vue"),
  },
  {
    name: "produtos-utilizados",
    path: "/produtos-utilizados",
    props: true,
    component: () => import("@/views/ProdutosUtilizados.vue"),
  },
  {
    name: "financas",
    path: "/financas",
    props: true,
    component: () => import("@/views/Financas.vue"),
  },
];
