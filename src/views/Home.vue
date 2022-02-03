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
  name: "Home",
  components: {
    Header,
    Menu,
  },
};
</script>

<style></style>
