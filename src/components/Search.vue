<template>
  <div class="search">
    <div class="input">
      <input type="text" />
      <button>
        <img src="@/assets/search.svg" alt="Pesquisar" />
      </button>
    </div>
    <button>
      <img src="@/assets/add.svg" alt="Cadastrar" /><span>Cadastrar</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Search",
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
