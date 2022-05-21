<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Editar Especialidade</h2>
        <p>{{ especialidade.nome }}</p>
      </div>
      <form @submit.prevent="updateEspecialidade">
        <div class="full">
          <label for="nome">Nome</label>
          <input
            type="text"
            name="nome"
            id="nome"
            :disabled="!editar"
            :value="especialidade.nome"
            :v-model="especialidade.nome"
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
  name: "EditarEspecialidade",
  props: {
    especialidade: {
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
    updateEspecialidade(event) {
      const formData = new FormData(event.target);

      api
        .post(`/especialidade/update/${this.especialidade.id}`, formData, {
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
          }).then((result) => {
            if (result.isConfirmed) {
              this.closeModal();
            }
          });
        })
        .catch((response) => {
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
};
</script>
