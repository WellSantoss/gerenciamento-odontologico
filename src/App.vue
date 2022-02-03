<template>
  <div id="app">
    <main>
      <Menu />
      <div class="container">
        <Header :titulo="titulo" />
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";

export default {
  components: {
    Header,
    Menu,
  },
  data() {
    return {
      titulo: "Início",
    };
  },
  mounted() {
    const toggleMenu = document.querySelector("button.toggle-menu");
    const menu = document.querySelector(".menu");

    toggleMenu.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap");
@import "@/style/reset.scss";
@import "@/style/variaveis.scss";

body,
input,
button,
textarea {
  font-family: "Open Sans", sans-serif;
  color: $black;
}

body {
  background: $gray-100;
}

main {
  display: grid;
  grid-template-columns: 300px 1fr;

  .container {
    padding: 0px 32px;
  }
}

.subtitle {
  font-size: 1.8rem;
  font-weight: 600;
}

@media screen and (max-width: 991px) {
  main {
    display: block;
  }
}
</style>
