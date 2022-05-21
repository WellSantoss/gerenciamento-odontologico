<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>{{ produto.nome }}</h2>
      </div>
      <form @submit.prevent="updateProduto">
        <div class="full">
          <label for="nome">Nome</label>
          <input
            required
            type="text"
            v-model="produto.nome"
            :disabled="!editar"
            name="nome"
            id="nome"
          />
        </div>
        <div v-if="fornecedores" class="full">
          <label for="fornecedor">Fornecedor</label>
          <select
            required
            v-model="produto.id_fornecedor"
            :disabled="!editar"
            name="id_fornecedor"
            id="id_fornecedor"
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
            :disabled="!editar"
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
            v-model="produto.valor_unitario"
            :disabled="!editar"
            name="valor_unitario"
            id="valor_unitario"
          />
        </div>
        <div class="buttons">
          <button v-if="editar">Salvar</button>
          <button v-else @click.prevent="editar = !editar">Editar</button>
          <button @click.prevent="closeModal" class="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "EditarProduto",
  props: {
    produto: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editar: false,
      fornecedores: null,
    };
  },
  methods: {
    updateProduto(event) {
      const formData = new FormData(event.target);

      api
        .post(`/produto/update/${this.produto.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          this.$swal({
            icon: "success",
            title: "Atualizado!",
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
