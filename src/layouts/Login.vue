<template>
  <main>
    <div>
      <div class="header">
        <img src="@/assets/logo.svg" alt="Logo" />
        <h1>Login</h1>
      </div>
      <form action="">
        <label for="user">Usuário</label>
        <input type="text" name="user" id="user" />
        <label for="password">Senha</label>
        <input type="password" name="password" id="password" />
        <router-link to="/">
          <button>Entrar</button>
        </router-link>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  & > div {
    max-width: 300px;
    flex: 1;
  }
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 64px;

  h1 {
    margin-left: 32px;
  }
}
</style>
