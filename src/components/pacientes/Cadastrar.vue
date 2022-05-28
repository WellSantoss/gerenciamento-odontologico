<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Cadastrar Paciente</h2>
      </div>
      <form @submit.prevent="sendPaciente">
        <div class="full">
          <label for="nome">Nome</label>
          <input
            required
            type="text"
            v-model="paciente.nome"
            name="nome"
            id="nome"
          />
        </div>
        <div>
          <label for="cpf">CPF</label>
          <input
            required
            type="text"
            v-model="paciente.cpf"
            name="cpf"
            id="cpf"
          />
        </div>
        <div>
          <label for="data_nascimento">Data de Nascimento</label>
          <input
            required
            type="date"
            v-model="paciente.data_nascimento"
            name="data_nascimento"
            id="data_nascimento"
          />
        </div>
        <div>
          <label for="telefone">Telefone</label>
          <input
            required
            type="text"
            v-model="paciente.telefone"
            name="telefone"
            id="telefone"
          />
        </div>
        <div>
          <label for="cep">CEP</label>
          <input
            required
            @blur="consultaCEP"
            type="text"
            v-model="paciente.cep"
            name="cep"
            id="cep"
            maxlength="9"
            minlength="8"
          />
        </div>
        <div class="full">
          <label for="rua">Rua</label>
          <input
            required
            type="text"
            v-model="paciente.rua"
            name="rua"
            id="rua"
          />
        </div>
        <div>
          <label for="numero">Número</label>
          <input
            required
            type="text"
            v-model="paciente.numero"
            name="numero"
            id="numero"
          />
        </div>
        <div>
          <label for="bairro">Bairro</label>
          <input
            required
            type="text"
            v-model="paciente.bairro"
            name="bairro"
            id="bairro"
          />
        </div>
        <div>
          <label for="cidade">Cidade</label>
          <input
            required
            type="text"
            v-model="paciente.cidade"
            name="cidade"
            id="cidade"
          />
        </div>
        <div>
          <label for="estado">Estado</label>
          <input
            required
            type="text"
            v-model="paciente.estado"
            name="estado"
            id="estado"
            maxlength="2"
          />
        </div>
        <div v-if="convenios" class="full">
          <label for="convenio">Convênio</label>
          <select v-model="paciente.id_convenio" name="convenio" id="convenio">
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
  name: "CadastrarPaciente",
  data() {
    return {
      convenios: null,
      paciente: {
        id_convenio: null,
        nome: null,
        cpf: null,
        data_nascimento: null,
        telefone: null,
        cep: null,
        rua: null,
        numero: null,
        bairro: null,
        cidade: null,
        estado: null,
      },
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
    sendPaciente() {
      api
        .post("/paciente/send", this.paciente, {
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
