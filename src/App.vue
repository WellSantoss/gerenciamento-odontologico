<template>
  <div id="app">
    <main>
      <Header />
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
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
  padding: 0px 32px 16px 32px;
}

.subtitle {
  font-size: 1.8rem;
  font-weight: 600;
}
</style>
