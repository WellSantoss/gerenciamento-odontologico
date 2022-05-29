<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Cadastrar Convênio</h2>
      </div>
      <form @submit.prevent="sendConvenio">
        <div class="full">
          <label for="nome">Nome*</label>
          <input
            required
            type="text"
            v-model="convenio.nome"
            name="nome"
            id="nome"
          />
        </div>
        <div class="full">
          <label for="telefone">Telefone*</label>
          <input
            type="tel"
            v-mask="['(##) ####-####', '(##) #####-####']"
            required
            v-model="convenio.telefone"
            name="telefone"
            id="telefone"
          />
        </div>
        <div class="full">
          <label for="endereco">Endereço*</label>
          <input
            required
            type="text"
            v-model="convenio.endereco"
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
  name: "CadastrarConvenio",
  data() {
    return {
      convenio: {
        nome: "",
        telefone: "",
        endereco: "",
      },
    };
  },
  methods: {
    sendConvenio() {
      api
        .post("/convenio/send", this.convenio, {
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
