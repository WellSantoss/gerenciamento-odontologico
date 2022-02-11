<template>
  <main>
    <Menu />
    <div class="container">
      <Header :titulo="'Início'" />
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
  mounted() {
    const toggleMenu = document.querySelector("button.toggle-menu");
    const menu = document.querySelector(".menu");

    toggleMenu.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  },
};
</script>

<style></style>
