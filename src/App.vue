<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
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
  font-size: 1.6rem;
  color: $black;
}

body {
  background: $gray-100;
}

h1 {
  font-size: 2.4rem;
  font-weight: 600;
  display: flex;
  align-items: center;

  &::before {
    content: "";
    display: block;
    width: 5px;
    height: 33px;
    background: $primary;
    margin-right: 16px;
  }
}

label {
  display: block;
  color: $gray;
  font-size: 1.2rem;
  margin-bottom: 4px;
}

input {
  background: $white;
  border: 1px solid $gray-200;
  color: $gray;
  width: 100%;
  margin-bottom: 16px;
  border-radius: 8px;
  padding: 8px 16px;
  outline: none;

  &:focus {
    border: 1px solid $gray-200;
    box-shadow: 0px 0px 0px 1px $gray-200;
  }
}

form {
  button {
    background: $primary;
    color: $white;
    border: none;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 8px;
    display: block;
    margin: 0 auto;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;

    &:hover {
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
      transform: scale(1.1);
    }
  }
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
