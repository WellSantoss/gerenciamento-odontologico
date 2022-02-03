<template>
  <header>
    <button class="toggle-menu">
      <img src="@/assets/menu.svg" alt="Menu" />
    </button>
    <h1>{{ titulo }}</h1>

    <div class="profile">
      <img src="@/assets/profile.jpg" alt="Perfil" />
      <div>
        <span class="subtitle">Olá, Mariana!</span><br />
        <p>Administrador</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["titulo"],
};
</script>

<style lang="scss" scoped>
@import "@/style/variaveis.scss";

header {
  padding: 16px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid $gray-200;
  position: relative;

  .toggle-menu {
    position: absolute;
    background: transparent;
    padding: 5px;
    border: none;
    cursor: pointer;
    display: none;
    left: 0px;
  }
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

.profile {
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    margin-right: 16px;
  }

  p {
    color: $gray;
  }
}

@media screen and (max-width: 991px) {
  header {
    .toggle-menu {
      display: block;
    }
  }

  h1 {
    margin-left: 46px;
  }
}
</style>
