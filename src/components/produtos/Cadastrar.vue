<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Cadastrar Produto</h2>
      </div>
      <form @submit.prevent="sendProduto">
        <div class="full">
          <label for="nome">Nome</label>
          <input
            required
            type="text"
            v-model="produto.nome"
            name="nome"
            id="nome"
          />
        </div>
        <div v-if="fornecedores" class="full">
          <label for="fornecedor">Fornecedor</label>
          <select
            required
            v-model="produto.fornecedor"
            name="fornecedor"
            id="fornecedor"
          >
            <option
              v-for="fornecedor in fornecedores"
              :key="fornecedor.id"
              :value="fornecedor.id"
            >
              {{ fornecedor.nome }}
            </option>
          </select>
        </div>
        <div>
          <label for="estoque">Estoque</label>
          <input
            required
            type="number"
            step="1"
            min="0"
            v-model="produto.estoque"
            name="estoque"
            id="estoque"
          />
        </div>
        <div>
          <label for="valor">Valor Unitário</label>
          <input
            required
            type="number"
            step="0.01"
            min="0.01"
            v-model="produto.valor"
            name="valor"
            id="valor"
          />
        </div>
        <div class="buttons">
          <button>Cadastrar</button>
          <button @click.prevent="closeModal" class="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "CadastrarProduto",
  data() {
    return {
      produto: {
        nome: null,
        fornecedor: null,
        estoque: 0,
        valor: 0,
      },
      fornecedores: null,
    };
  },
  methods: {
    sendProduto() {
      api
        .post("/produto/send", this.produto, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Cadastrado!",
            text: response.data.data,
            onClose: this.closeModal(),
          }).then((result) => {
            if (result.isConfirmed) {
              this.closeModal();
            }
          });
        })
        .catch((response) => {
          console.log(response);
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: response.response.data.data,
            onClose: this.closeModal(),
          }).then((result) => {
            if (result.isConfirmed) {
              this.closeModal();
            }
          });
        });
    },
    verificaCloseModal(e) {
      if (e.target === e.currentTarget) {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("close-modal");
    },
  },
  created() {
    api.get(`/fornecedor/get`).then((response) => {
      this.fornecedores = response.data.data;
    });
  },
};
</script>
