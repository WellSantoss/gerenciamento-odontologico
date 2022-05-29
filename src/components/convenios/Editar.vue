<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Editar Convênio</h2>
        <p>{{ convenio.nome }}</p>
      </div>
      <form @submit.prevent="updateConvenio">
        <div class="full">
          <label for="nome">Nome*</label>
          <input
            type="text"
            name="nome"
            id="nome"
            :disabled="!editar"
            :value="convenio.nome"
            :v-model="convenio.nome"
          />
        </div>
        <div class="full">
          <label for="telefone">Telefone*</label>
          <input
            type="tel"
            v-mask="['(##) ####-####', '(##) #####-####']"
            name="telefone"
            id="telefone"
            :disabled="!editar"
            :value="convenio.telefone"
            :v-model="convenio.telefone"
          />
        </div>
        <div class="full">
          <label for="endereco">Endereço*</label>
          <input
            type="text"
            name="endereco"
            id="endereco"
            :disabled="!editar"
            :value="convenio.endereco"
            :v-model="convenio.endereco"
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
  name: "EditarConvenio",
  props: {
    convenio: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editar: false,
    };
  },
  methods: {
    updateConvenio(event) {
      const formData = new FormData(event.target);

      console.log(formData);

      api
        .post(`/convenio/update/${this.convenio.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Atualizado!",
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
