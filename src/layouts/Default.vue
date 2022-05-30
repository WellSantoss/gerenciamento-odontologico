<template>
  <main>
    <Menu />
    <div class="container">
      <Header :titulo="routeName" />
      <transition mode="out-in">
        <router-view />
      </transition>
    </div>
  </main>
</template>

<script>
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";

export default {
  name: "Default",
  components: {
    Header,
    Menu,
  },
  computed: {
    routeName() {
      let titulo = "DentalWeb";

      if (this.$route.name == "inicio") {
        titulo = "Início";
      } else if (this.$route.name == "usuarios") {
        titulo = "Usuários";
      } else if (this.$route.name == "dentistas") {
        titulo = "Dentistas";
      } else if (this.$route.name == "consultas") {
        titulo = "Consultas";
      } else if (this.$route.name == "especialidades") {
        titulo = "Especialidades";
      } else if (this.$route.name == "procedimentos") {
        titulo = "Procedimentos";
      } else if (this.$route.name == "convenios") {
        titulo = "Convênios";
      } else if (this.$route.name == "pacientes") {
        titulo = "Pacientes";
      } else if (this.$route.name == "paciente") {
        titulo = "Paciente";
      } else if (this.$route.name == "fornecedores") {
        titulo = "Fornecedores";
      } else if (this.$route.name == "produtos") {
        titulo = "Produtos";
      } else if (this.$route.name == "produtos-utilizados") {
        titulo = "Produtos Utilizados";
      } else if (this.$route.name == "financas") {
        titulo = "Finanças";
      }

      return titulo;
    },
  },
  created() {
    if (!this.$store.state.login) {
      this.$store.dispatch("getUsuario");
    }
  },
  mounted() {
    const toggleMenu = document.querySelector("button.toggle-menu");
    const menu = document.querySelector(".menu");

    toggleMenu.addEventListener("click", () => {
      menu.classList.add("active");
      window.scrollTo(0, 0);
      document.body.classList.add("hidden");
    });
  },
};
</script>

<style></style>
