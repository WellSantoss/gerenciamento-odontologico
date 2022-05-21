<template>
  <div class="content">
    <Search />
    <transition mode="out-in">
      <div v-if="registros" class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Data</th>
              <th>Usuário</th>
              <th>Produto</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="registro in registros" :key="registro.id">
              <td class="icon">
                <img
                  @click="popDelete(registro.id, registro.quantidade)"
                  src="@/assets/trash.svg"
                  title="Excluir"
                  alt="Excluir"
                />
              </td>
              <td>{{ registro.data | formatDate }}</td>
              <td>{{ registro.usuario }}</td>
              <td>{{ registro.produto }}</td>
              <td>{{ registro.quantidade }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import api from "@/api.js";

export default {
  name: "ProdutosUtilizados",
  components: {
    Search,
    Loading,
  },
  data() {
    return {
      erro: null,
      registros: null,
    };
  },
  created() {
    this.getRegistros();
  },
  computed: {
    query() {
      return this.$route.query.q ? `/${this.$route.query.q}` : "";
    },
  },
  watch: {
    query() {
      this.getRegistros();
    },
  },
  methods: {
    getRegistros() {
      this.registros = null;

      api
        .get(`/retirada/get`)
        .then((response) => {
          this.registros = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    popDelete(id, quantidade) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o registro selecionado?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        showDenyButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Repor estoque",
        denyButtonText: "Não repor estoque",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteRegistro(id, true, quantidade);
        } else if (result.isDenied) {
          this.deleteRegistro(id, false, quantidade);
        }
      });
    },
    deleteRegistro(id, repor, quantidade) {
      api
        .post(
          `/retirada/delete/${id}`,
          {
            repor: repor,
            produto: id,
            quantidade: quantidade,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Excluído!",
            text: response.data.data,
          });

          this.getRegistros();
        })
        .catch((response) => {
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: response.data.data,
          });
        });
    },
  },
};
</script>
