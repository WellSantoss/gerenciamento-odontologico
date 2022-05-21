<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <transition mode="out-in">
      <div v-if="produtos" class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Nome</th>
              <th>Fornecedor</th>
              <th>Estoque</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtos" :key="produto.id">
              <td class="icon">
                <img
                  @click="reporProduto = { id: produto.id, nome: produto.nome }"
                  src="@/assets/refund.svg"
                  alt="Editar"
                />
              </td>
              <td class="icon">
                <img
                  @click="viewProduto(produto.id)"
                  src="@/assets/edit.svg"
                  alt="Editar"
                />
              </td>
              <td class="icon">
                <img
                  @click="deleteProduto(produto.id, produto.nome)"
                  src="@/assets/trash.svg"
                  alt="Excluir"
                />
              </td>
              <td>{{ produto.nome }}</td>
              <td>{{ produto.fornecedor }}</td>
              <td>{{ produto.estoque }}</td>
              <td>{{ produto.valor_unitario | formatCurrency }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <ReporProduto
        :produto="reporProduto"
        v-if="reporProduto"
        @close-modal="closeModalRepor"
      />
      <CadastrarProduto
        v-if="modalCadastrar"
        @close-modal="closeModalCadastrar"
      />
      <EditarProduto
        :produto="produtoSelecionado"
        v-if="produtoSelecionado"
        @close-modal="closeModalEditar"
      />
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import CadastrarProduto from "@/components/produtos/Cadastrar.vue";
import EditarProduto from "@/components/produtos/Editar.vue";
import ReporProduto from "@/components/produtos/Repor.vue";
import api from "@/api.js";

export default {
  name: "Produtos",
  components: {
    Search,
    Loading,
    CadastrarProduto,
    EditarProduto,
    ReporProduto,
  },
  data() {
    return {
      edit: false,
      erro: null,
      modalCadastrar: false,
      produtoSelecionado: null,
      produtos: null,
      reporProduto: null,
    };
  },
  created() {
    this.getProdutos();
  },
  computed: {
    query() {
      return this.$route.query.q ? `/${this.$route.query.q}` : "";
    },
  },
  watch: {
    query() {
      this.getProdutos();
    },
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getProdutos();
    },
    closeModalEditar() {
      this.produtoSelecionado = null;
      this.getProdutos();
    },
    closeModalRepor() {
      this.reporProduto = null;
      this.getProdutos();
    },
    getProdutos() {
      this.produtos = null;

      api
        .get(`/produto/get${this.query}`)
        .then((response) => {
          this.produtos = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    deleteProduto(id, produto) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o produto '${produto}'?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/produto/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
              });

              this.getProdutos();
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
    viewProduto(id) {
      const produto = this.produtos.filter((produto) => {
        return produto.id == id;
      });

      this.produtoSelecionado = produto[0];
    },
  },
};
</script>
