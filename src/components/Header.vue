<template>
  <header>
    <button class="toggle-menu">
      <img src="@/assets/menu.svg" alt="Menu" />
    </button>
    <h1>{{ titulo }}</h1>

    <div class="profile" @click="handleModal">
      <img
        :src="`http://localhost/gerenciamento-odontologico-api/upload/${foto}`"
        alt="Perfil"
      />
      <div class="name">
        <span class="subtitle">Olá, {{ nome }}!</span><br />
        <p>{{ cargo }}</p>
      </div>
    </div>
    <transition>
      <div
        class="info"
        v-click-outside="handleModal"
        v-if="modalInfo"
        @mouseleave="modalInfo = !modalInfo"
      >
        <div class="name">
          <span class="subtitle">Olá, Mariana!</span><br />
          <p>{{ cargo }}</p>
        </div>
        <ul>
          <li>
            <router-link to="/editar">
              <img src="@/assets/edit-gray.svg" alt="Editar Dados" />
              <span>Editar Dados</span>
            </router-link>
          </li>
          <li>
            <router-link to="/trocar-senha">
              <img src="@/assets/password.svg" alt="Trocar Senha" />
              <span>Trocar Senha</span>
            </router-link>
          </li>
          <li>
            <a @click="logout">
              <img src="@/assets/logout.svg" alt="Sair" />
              <span>Sair</span>
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["titulo"],
  data() {
    return {
      modalInfo: false,
      modalInfoAtivo: false,
    };
  },
  methods: {
    handleModal() {
      if (!(this.modalInfo && !this.modalInfoAtivo)) {
        this.modalInfo = !this.modalInfo;
        this.modalInfoAtivo = false;
      } else {
        this.modalInfoAtivo = true;
      }
    },
    logout() {
      this.$store.dispatch("logout");
      localStorage.removeItem("token");

      this.$router.push({ name: "login" });
    },
  },
  computed: {
    nome() {
      return this.$store.state.usuario.nome.replace(/ .*/, "");
    },
    foto() {
      return this.$store.state.usuario.foto;
    },
    cargo() {
      const usuario = this.$store.state.usuario;

      if (usuario.administrador) {
        return "Administrador";
      } else {
        return usuario.dentista ? "Dentista" : "Atendente";
      }
    },
  },
  directives: {
    "click-outside": {
      bind: (el, binding, vnode) => {
        el.clickOutsideEvent = (event) => {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind: (el) => {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
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
    box-shadow: none;
  }
}

.profile {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  img {
    border-radius: 50%;
    margin-right: 16px;
    width: 47px;
  }

  p {
    color: $gray;
  }
}

.info {
  background: $white;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  padding: 0 16px 16px;
  border-radius: 8px;
  position: absolute;
  width: 200px;
  top: 80px;
  right: 0;
  z-index: 99;

  .name {
    display: none;
    padding: 16px 0px 16px;
    border-bottom: 1px solid $gray-200;
  }

  ul {
    li {
      margin-top: 16px;
    }

    a {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover::before {
        content: "";
        display: block;
        width: 5px;
        height: 38px;
        background: $primary;
        position: absolute;
        left: -16px;
      }
    }

    img {
      width: 20px;
      border-radius: 0;
      margin-right: 16px;
    }

    span {
      color: $gray;
    }
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

@media screen and (max-width: 575px) {
  .profile > .name {
    display: none;
  }

  .info .name {
    display: block;
  }
}
</style>
