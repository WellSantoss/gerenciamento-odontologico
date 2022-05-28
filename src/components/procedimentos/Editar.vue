<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Editar Procedimento</h2>
        <p>{{ procedimento.procedimento }}</p>
      </div>
      <form @submit.prevent="updateProcedimento">
        <div class="full">
          <span class="label">Ativo?*</span>
          <input
            type="radio"
            value="1"
            :disabled="!editar"
            v-model="procedimento.ativo"
            name="ativo"
            id="ativo-sim"
          />
          <label class="radio" for="ativo-sim">Sim</label>
          <input
            type="radio"
            value="0"
            :disabled="!editar"
            v-model="procedimento.ativo"
            name="ativo"
            id="ativo-nao"
          />
          <label class="radio" for="ativo-nao">Não</label>
        </div>
        <div class="full">
          <label for="especialidade">Especialidade</label>
          <select
            v-model="procedimento.id_especialidade"
            :disabled="!editar"
            name="especialidade"
            id="especialidade"
          >
            <option value="">Nenhuma</option>
            <option
              v-for="especialidade in especialidades"
              :key="especialidade.id"
              :value="especialidade.id"
            >
              {{ especialidade.nome }}
            </option>
          </select>
        </div>
        <div class="full">
          <label for="procedimento">Procedimento*</label>
          <input
            required
            type="text"
            v-model="procedimento.procedimento"
            :disabled="!editar"
            name="procedimento"
            id="procedimento"
          />
        </div>
        <div>
          <label for="tempo">Tempo*</label>
          <input
            required
            type="time"
            :disabled="!editar"
            v-model="procedimento.tempo"
            name="tempo"
            id="tempo"
          />
        </div>
        <div>
          <label for="valor">Valor*</label>
          <input
            required
            type="number"
            step="0.01"
            min="0.01"
            v-model="procedimento.valor"
            :disabled="!editar"
            name="valor"
            id="valor"
          />
        </div>
        <div class="full">
          <label for="descricao">Descrição</label>
          <textarea
            v-model="procedimento.descricao"
            :disabled="!editar"
            name="descricao"
            id="descricao"
          ></textarea>
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
  name: "EditarProcedimento",
  props: {
    procedimento: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editar: false,
      especialidades: null,
    };
  },
  methods: {
    updateProcedimento(event) {
      const formData = new FormData(event.target);

      api
        .post(`/procedimento/update/${this.procedimento.id}`, formData, {
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
    api.get(`/especialidade/get`).then((response) => {
      this.especialidades = response.data.data;
    });
  },
};
</script>
