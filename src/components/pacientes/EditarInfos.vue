<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Editar Paciente</h2>
        <p>{{ paciente.nome }}</p>
      </div>
      <form @submit.prevent="updatePaciente">
        <div class="full">
          <label for="nome">Nome*</label>
          <input
            required
            type="text"
            :disabled="!editar"
            v-model="paciente.nome"
            name="nome"
            id="nome"
          />
        </div>
        <div>
          <label for="cpf">CPF*</label>
          <input
            required
            type="text"
            :disabled="!editar"
            v-model="paciente.cpf"
            name="cpf"
            id="cpf"
          />
        </div>
        <div>
          <label for="data_nascimento">Data de Nascimento*</label>
          <input
            required
            type="date"
            :disabled="!editar"
            v-model="paciente.data_nascimento"
            name="data_nascimento"
            id="data_nascimento"
          />
        </div>
        <div>
          <label for="telefone">Telefone*</label>
          <input
            required
            type="text"
            name="telefone"
            id="telefone"
            :disabled="!editar"
            v-model="paciente.telefone"
          />
        </div>
        <div>
          <label for="cep">CEP*</label>
          <input
            required
            type="text"
            @blur="consultaCEP"
            name="cep"
            id="cep"
            :disabled="!editar"
            v-model="paciente.cep"
            maxlength="9"
            minlength="8"
          />
        </div>
        <div class="full">
          <label for="rua">Rua*</label>
          <input
            required
            type="text"
            :disabled="!editar"
            v-model="paciente.rua"
            name="rua"
            id="rua"
          />
        </div>
        <div>
          <label for="numero">Número*</label>
          <input
            required
            type="text"
            name="numero"
            id="numero"
            :disabled="!editar"
            v-model="paciente.numero"
          />
        </div>
        <div>
          <label for="bairro">Bairro*</label>
          <input
            required
            type="text"
            name="bairro"
            id="bairro"
            :disabled="!editar"
            v-model="paciente.bairro"
          />
        </div>
        <div>
          <label for="cidade">Cidade*</label>
          <input
            required
            type="text"
            name="cidade"
            id="cidade"
            :disabled="!editar"
            v-model="paciente.cidade"
          />
        </div>
        <div>
          <label for="estado">Estado*</label>
          <input
            required
            type="text"
            name="estado"
            id="estado"
            :disabled="!editar"
            v-model="paciente.estado"
            maxlength="2"
          />
        </div>
        <div class="full">
          <label for="convenio">Convênio</label>
          <select
            :disabled="!editar"
            v-model="paciente.id_convenio"
            name="convenio"
            id="convenio"
          >
            <option value="">Nenhum</option>
            <option
              v-for="convenio in convenios"
              :key="convenio.id"
              :value="convenio.id"
            >
              {{ convenio.nome }}
            </option>
          </select>
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
  name: "EditarInfos",
  props: {
    paciente: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editar: false,
      convenios: null,
    };
  },
  created() {
    api.get(`/convenio/get`).then((response) => {
      this.convenios = response.data.data;
    });
  },
  methods: {
    consultaCEP() {
      const cep = this.paciente.cep.replace("-", "");

      if (cep.length == 8) {
        api
          .get(`https://viacep.com.br/ws/${cep}/json/`, {
            baseURL: "",
          })
          .then((response) => {
            if (response.data.erro == "true") {
              this.$swal({
                icon: "warning",
                title: "Atenção!",
                text: "CEP não encontrado!",
              });
            } else {
              this.paciente.rua = response.data.logradouro;
              this.paciente.bairro = response.data.bairro;
              this.paciente.cidade = response.data.localidade;
              this.paciente.estado = response.data.uf;

              document.querySelector("input#numero").focus();
            }
          })
          .catch(() => {
            this.$swal({
              icon: "warning",
              title: "Atenção!",
              text: "CEP não encontrado!",
            });
          });
      } else {
        this.$swal({
          icon: "warning",
          title: "Atenção!",
          text: "Informe um CEP válido!",
        });
      }
    },
    updatePaciente() {
      api
        .post(`/paciente/update/${this.paciente.id}`, this.paciente, {
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
