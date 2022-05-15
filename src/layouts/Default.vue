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
      return this.$route.name;
    },
  },
  created() {
    if (!this.$store.state.login) {
      this.$store.dispatch("getUsuario", localStorage.getItem("token"));
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
