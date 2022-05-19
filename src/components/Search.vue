<template>
  <div class="search">
    <div class="input">
      <input type="text" v-model="busca" />
      <button @click.prevent="buscar">
        <img src="@/assets/search.svg" alt="Pesquisar" />
      </button>
    </div>
    <button @click="$emit('cadastrar')">
      <img src="@/assets/add.svg" alt="Cadastrar" /><span>Cadastrar</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      busca: this.query,
    };
  },
  computed: {
    query() {
      return this.$route.query.q ? this.$route.query.q : "";
    },
  },
  watch: {
    query() {
      this.busca = this.query;
    },
  },
  methods: {
    buscar() {
      if (this.busca) {
        this.$router.push({
          query: {
            q: this.busca,
          },
        });
      } else {
        this.$router.replace({ name: this.$route.name });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variaveis.scss";

.search {
  display: grid;
  grid-template-columns: 1.5fr minmax(150px, 0.5fr);
  gap: 16px;
  margin-bottom: 16px;
}

input {
  max-width: 360px;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  margin: 0;
  flex: 1;

  &:focus {
    box-shadow: none;
    border-right: none;
  }
}

.input {
  display: flex;
  justify-content: start;

  button {
    background: $white;
    border-radius: 0px 8px 8px 0px;
    box-shadow: none;
    border: 1px solid $gray-200;
    border-left: none;
    margin: 0;
    padding: 8px 16px 8px 0px;

    img {
      transition: 0.3s;
      padding-left: 16px;
      border-left: 1px solid $gray-200;
    }

    &:hover {
      transform: scale(1);

      img {
        transform: scale(1.1);
      }
    }
  }

  & + button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    justify-self: end;

    img {
      margin-right: 16px;
    }
  }
}
</style>
