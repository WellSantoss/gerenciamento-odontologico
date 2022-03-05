<template>
  <transition mode="out-in">
    <div class="menu">
      <button @click="removeActive">
        <img src="@/assets/close.svg" alt="Menu" />
      </button>
      <div class="logo">
        <img src="@/assets/logo.svg" alt="Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <router-link to="/inicio">
              <img src="@/assets/home.svg" alt="Início" />
              <span>Início</span>
            </router-link>
          </li>
        </ul>
        <ul>
          <p>Pessoas</p>
          <li>
            <router-link to="/usuarios">
              <img src="@/assets/people.svg" alt="Usuários" />
              <span>Usuários</span>
            </router-link>
          </li>
          <li>
            <router-link to="/dentistas">
              <img src="@/assets/dentist-female.svg" alt="Dentistas" />
              <span>Dentistas</span>
            </router-link>
          </li>
          <li>
            <router-link to="/pacientes">
              <img src="@/assets/peoples.svg" alt="Pacientes" />
              <span>Pacientes</span>
            </router-link>
          </li>
        </ul>
        <ul>
          <p>Consultas</p>
          <li>
            <router-link to="/consultas">
              <img src="@/assets/schedule.svg" alt="Consultas" />
              <span>Consultas</span>
            </router-link>
          </li>
          <li>
            <router-link to="/procedimentos">
              <img src="@/assets/procedure.svg" alt="Procedimentos" />
              <span>Procedimentos</span>
            </router-link>
          </li>
          <li>
            <router-link to="/convenios">
              <img src="@/assets/agent.svg" alt="Convênios" />
              <span>Convênios</span>
            </router-link>
          </li>
        </ul>
        <ul>
          <p>Produtos</p>
          <li>
            <router-link to="/fornecedores">
              <img src="@/assets/provider.svg" alt="Fornecedores" />
              <span>Fornecedores</span>
            </router-link>
          </li>
          <li>
            <router-link to="/produtos">
              <img src="@/assets/product.svg" alt="Produtos" />
              <span>Produtos</span>
            </router-link>
          </li>
          <li>
            <router-link to="/produtos-utilizados">
              <img src="@/assets/used-product.svg" alt="Produtos Utilizados" />
              <span>Produtos Utilizados</span>
            </router-link>
          </li>
        </ul>
        <ul>
          <p>Finanças</p>
          <li>
            <router-link to="/financas">
              <img src="@/assets/finance.svg" alt="Finanças" />
              <span>Finanças</span>
            </router-link>
          </li>
        </ul>
        <ul>
          <li>
            <router-link to="/trocar-senha">
              <img src="@/assets/password.svg" alt="Trocar Senha" />
              <span>Trocar Senha</span>
            </router-link>
          </li>
          <li>
            <router-link to="/login">
              <img src="@/assets/logout.svg" alt="Sair" />
              <span>Sair</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    removeActive() {
      const menu = document.querySelector(".menu");

      menu.classList.add("out");

      setTimeout(() => {
        menu.classList.remove("out");
        menu.classList.remove("active");
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variaveis.scss";

@keyframes toRight {
  from {
    transform: translate3d(-300px, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes toLeft {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-300px, 0, 0);
  }
}

.menu {
  background: $white;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  height: 100vh;
  padding: 0px 32px 32px;
  overflow-y: auto;
  position: relative;
  z-index: 99;

  &.active {
    animation: toRight 0.3s forwards;
  }

  &.out {
    animation: toLeft 0.3s forwards;
  }

  button {
    position: absolute;
    background: transparent;
    padding: 5px;
    border: none;
    cursor: pointer;
    display: none;
    right: -0px;
    box-shadow: none;
  }

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    background: $primary;
    border-left: 4px solid $gray-100;
    border-right: 4px solid $gray-100;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background: $gray-100;
  }
}

.logo {
  padding: 32px 0px;
  border-bottom: 1px solid $gray-200;

  img {
    margin: 0 auto;
  }
}

nav {
  ul {
    margin-top: 32px;

    p {
      text-transform: uppercase;
      font-size: 1.2rem;
      margin-bottom: 8px;
    }

    li {
      margin-top: 16px;
    }

    a {
      position: relative;
      display: flex;
      align-items: center;

      &:hover::before {
        content: "";
        display: block;
        width: 5px;
        height: 38px;
        background: $primary;
        position: absolute;
        left: -32px;
      }

      &.router-link-exact-active {
        span {
          font-weight: 600;
        }

        &::before {
          content: "";
          display: block;
          width: 5px;
          height: 38px;
          background: $primary;
          position: absolute;
          left: -32px;
        }
      }
    }

    img {
      margin-right: 16px;
    }

    span {
      color: $gray;
    }
  }
}

@media screen and (max-width: 991px) {
  .menu {
    width: 80%;
    max-width: 300px;
    position: absolute;
    display: none;

    button {
      display: block;
    }

    &.active {
      display: block;
    }
  }
}
</style>
