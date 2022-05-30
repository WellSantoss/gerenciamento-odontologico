<template>
  <div class="search">
    <div class="input">
      <select @change="$emit('busca', dentista)" v-model="dentista">
        <option value="">Todos os dentistas</option>
        <option
          v-for="dentista in dentistas"
          :key="dentista.id"
          :value="dentista.id"
        >
          {{ dentista.nome }}
        </option>
      </select>
    </div>
    <button @click="$emit('cadastrar')">
      <img src="@/assets/add.svg" alt="Cadastrar" /><span>Cadastrar</span>
    </button>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "SearchDentista",
  data() {
    return {
      dentistas: null,
      dentista: "",
    };
  },
  created() {
    this.dentistas = null;

    api.get(`/dentista/getall`).then((response) => {
      this.dentistas = response.data.data;
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/style/variaveis.scss";

.search {
  display: grid;
  grid-template-columns: 1.5fr minmax(150px, 0.5fr);
  gap: 16px;
  margin-bottom: 8px;
}

.pesquisa {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.875rem;

  img {
    width: 10px;
    cursor: pointer;
  }
}

select {
  max-width: 360px;
  margin: 0;
  flex: 1;
}

.input {
  display: flex;
  justify-content: start;

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

@media screen and (max-width: 575px) {
  .search {
    grid-template-columns: 1fr;
  }

  select {
    max-width: none;
  }
}
</style>
