<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Editar Informações Clínicas</h2>
        <p>{{ paciente.nome }}</p>
      </div>
      <form @submit.prevent="updatePaciente">
        <div class="full">
          <label for="queixa_atual">Queixa Atual</label>
          <textarea
            v-model="obs.queixa_atual"
            name="queixa_atual"
            id="queixa_atual"
          ></textarea>
        </div>
        <div class="full">
          <label for="medicacoes">Utiliza Medicações?</label>
          <textarea
            v-model="obs.medicacoes"
            name="medicacoes"
            id="medicacoes"
          ></textarea>
        </div>
        <div class="full">
          <label for="alergias">Possui Alergias?</label>
          <textarea
            v-model="obs.alergias"
            name="alergias"
            id="alergias"
          ></textarea>
        </div>
        <div class="full">
          <label for="doencas">Possui Alguma Doença?</label>
          <textarea
            name="doencas"
            id="doencas"
            v-model="obs.doencas"
          ></textarea>
        </div>
        <div class="full">
          <label for="cirurgias">Já Realizou Cirurgia?</label>
          <textarea
            name="cirurgias"
            id="cirurgias"
            v-model="obs.cirurgias"
          ></textarea>
        </div>
        <div>
          <label for="tipo_sangramento">Tipo de Sangramento*</label>
          <select
            required
            v-model="obs.tipo_sangramento"
            name="tipo_sangramento"
            id="tipo_sangramento"
          >
            <option value="Normal">Normal</option>
            <option value="Excessivo">Excessivo</option>
          </select>
        </div>
        <div>
          <label for="tipo_cicatrizacao">Tipo de Cicatrização*</label>
          <select
            required
            v-model="obs.tipo_cicatrizacao"
            name="tipo_cicatrizacao"
            id="tipo_cicatrizacao"
          >
            <option value="Normal">Normal</option>
            <option value="Complicada">Complicada</option>
          </select>
        </div>
        <div>
          <label for="falta_de_ar">Sente Falta de Ar?*</label>
          <select
            required
            v-model="obs.falta_de_ar"
            name="falta_de_ar"
            id="falta_de_ar"
          >
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </div>
        <div>
          <label for="gestante">Gestante?</label>
          <input
            type="text"
            name="gestante"
            id="gestante"
            v-model="obs.gestante"
          />
        </div>
        <div class="full">
          <label for="observacoes">Observações</label>
          <textarea
            name="observacoes"
            id="observacoes"
            v-model="obs.observacoes"
          ></textarea>
        </div>
        <div class="buttons">
          <button>Salvar</button>
          <button @click.prevent="closeModal" class="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "EditarInfos",
  props: {
    obs: {
      type: Object,
      required: true,
    },
    paciente: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updatePaciente() {
      api
        .post(`/paciente/updateobs/${this.paciente.id}`, this.obs, {
          headers: {
            "Content-Type": "application/json",
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
