<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Cadastrar Procedimento</h2>
      </div>
      <form @submit.prevent="sendProcedimento">
        <div class="full">
          <span class="label">Ativo?*</span>
          <input
            required
            type="radio"
            value="1"
            v-model="procedimento.ativo"
            name="ativo"
            id="ativo-sim"
          />
          <label class="radio" for="ativo-sim">Sim</label>
          <input
            required
            type="radio"
            value="0"
            v-model="procedimento.ativo"
            name="ativo"
            id="ativo-nao"
          />
          <label class="radio" for="ativo-nao">Não</label>
        </div>
        <div class="full">
          <label for="especialidade">Especialidade</label>
          <select
            v-model="procedimento.especialidade"
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
            name="procedimento"
            id="procedimento"
          />
        </div>
        <div>
          <label for="tempo">Tempo*</label>
          <input
            required
            type="time"
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
            min="0.00"
            v-model="procedimento.valor"
            name="valor"
            id="valor"
          />
        </div>
        <div class="full">
          <label for="descricao">Descrição</label>
          <textarea
            v-model="procedimento.descricao"
            name="descricao"
            id="descricao"
          ></textarea>
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
  name: "CadastrarProcedimento",
  data() {
    return {
      procedimento: {
        ativo: null,
        especialidade: null,
        procedimento: null,
        tempo: null,
        valor: null,
        descricao: null,
      },
      especialidades: null,
    };
  },
  methods: {
    sendProcedimento() {
      api
        .post("/procedimento/send", this.procedimento, {
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
          console.log(response);
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
  created() {
    api.get(`/especialidade/get`).then((response) => {
      this.especialidades = response.data.data;
    });
  },
};
</script>
