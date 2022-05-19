<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <transition mode="out-in">
      <div v-if="fornecedores" class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Endereco</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fornecedor in fornecedores" :key="fornecedor.id">
              <td class="icon">
                <img
                  @click="viewFornecedor(fornecedor.id)"
                  src="@/assets/edit.svg"
                  alt="Editar"
                />
              </td>
              <td class="icon">
                <img
                  @click="deleteFornecedor(fornecedor.id, fornecedor.nome)"
                  src="@/assets/trash.svg"
                  alt="Excluir"
                />
              </td>
              <td>{{ fornecedor.nome }}</td>
              <td>{{ fornecedor.telefone }}</td>
              <td>{{ fornecedor.endereco }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <CadastrarFornecedor
        v-if="modalCadastrar"
        @close-modal-cadastrar="closeModalCadastrar"
      />
      <EditarFornecedor
        :fornecedor="fornecedorSelecionado"
        v-if="fornecedorSelecionado"
        @close-modal-editar="closeModalEditar"
      />
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import CadastrarFornecedor from "@/components/fornecedores/Cadastrar.vue";
import EditarFornecedor from "@/components/fornecedores/Editar.vue";
import api from "@/api.js";

export default {
  name: "Fornecedores",
  components: {
    Search,
    Loading,
    CadastrarFornecedor,
    EditarFornecedor,
  },
  data() {
    return {
      edit: false,
      erro: null,
      modalCadastrar: false,
      fornecedorSelecionado: null,
      fornecedores: null,
    };
  },
  created() {
    this.getFornecedores();
  },
  computed: {
    idFornecedorLogado() {
      return this.$store.state.fornecedor.id;
    },
    query() {
      return this.$route.query.q ? `/${this.$route.query.q}` : "";
    },
  },
  watch: {
    query() {
      this.getFornecedores();
    },
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getFornecedores();
    },
    closeModalEditar() {
      this.fornecedorSelecionado = null;
      this.getFornecedores();
    },
    getFornecedores() {
      this.fornecedores = null;

      api
        .get(`/fornecedor/get${this.query}`)
        .then((response) => {
          this.fornecedores = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    deleteFornecedor(id, fornecedor) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o usuário '${fornecedor}'?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/fornecedor/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
              });

              this.getFornecedores();
            })
            .catch((response) => {
              this.$swal({
                icon: "error",
                title: "Erro!",
                text: response.data.data,
              });
            });
        }
      });
    },
    viewFornecedor(id) {
      const fornecedor = this.fornecedores.filter((fornecedor) => {
        return fornecedor.id == id;
      });

      this.fornecedorSelecionado = fornecedor[0];
    },
  },
};
</script>
