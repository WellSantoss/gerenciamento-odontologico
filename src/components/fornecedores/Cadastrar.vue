<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Cadastrar Fornecedor</h2>
      </div>
      <form @submit.prevent="sendFornecedor">
        <div class="full">
          <label for="nome">Nome*</label>
          <input
            required
            type="text"
            v-model="fornecedor.nome"
            name="nome"
            id="nome"
          />
        </div>
        <div class="full">
          <label for="telefone">Telefone*</label>
          <input
            required
            type="tel"
            v-mask="['(##) ####-####', '(##) #####-####']"
            v-model="fornecedor.telefone"
            name="telefone"
            id="telefone"
          />
        </div>
        <div class="full">
          <label for="endereco">Endereço*</label>
          <input
            required
            type="text"
            v-model="fornecedor.endereco"
            name="endereco"
            id="endereco"
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
  name: "CadastrarFornecedor",
  data() {
    return {
      fornecedor: {
        nome: "",
        telefone: "",
        endereco: "",
      },
    };
  },
  methods: {
    sendFornecedor() {
      api
        .post("/fornecedor/send", this.fornecedor, {
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
          });
        })
        .catch((response) => {
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: response.response.data.data,
            onClose: this.closeModal(),
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
};
</script>
