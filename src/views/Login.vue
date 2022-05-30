<template>
  <main>
    <div>
      <div class="header">
        <img src="@/assets/logo.svg" alt="Logo" />
        <h1>Login</h1>
      </div>
      <form @submit.prevent="login()">
        <label for="usuario">Usuário</label>
        <input
          required
          type="text"
          name="usuario"
          id="user"
          v-model="data.usuario"
        />
        <label for="senha">Senha</label>
        <input
          required
          type="password"
          name="senha"
          id="senha"
          v-model="data.senha"
        />
        <button>Entrar</button>
      </form>
    </div>
  </main>
</template>

<script>
// import axios from "axios";
import api from "@/api.js";

export default {
  name: "Login",
  data() {
    return {
      data: {
        usuario: null,
        senha: null,
      },
    };
  },
  methods: {
    login() {
      api
        .post("/usuario/login", this.data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const data = response.data.data;

          this.$store.dispatch("setUsuario", data.usuario);
          localStorage.setItem("token", data.token);

          this.$router.push({ name: "inicio" });
        })
        .catch((response) => {
          this.$swal({
            icon: response.response.data.status,
            title: "Atenção!",
            text: response.response.data.data,
          });
        });
    },
  },
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

form {
  input {
    margin-bottom: 16px;
  }
  button {
    margin-top: 16px;
  }
}
</style>
