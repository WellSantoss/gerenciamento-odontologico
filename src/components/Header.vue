<template>
  <header>
    <h1>Header</h1>

    <div class="profile">
      <img src="@/assets/profile.jpg" alt="Perfil" />
      <p><span>Mariana Ribeiro</span><br />Administrador</p>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
header {
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  display: flex;
  align-items: center;

  &::before {
    content: "";
    display: block;
    width: 5px;
    height: 33px;
    background: red;
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

  span {
    font-weight: 500;
  }
}
</style>
