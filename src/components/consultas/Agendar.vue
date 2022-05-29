<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Agendar Consulta</h2>
      </div>
      <form @submit.prevent="sendConsulta">
        <div class="full">
          <label for="paciente">Paciente*</label>
          <select
            v-if="pacientes"
            required
            @change="getProcedimentos(consulta.id_paciente)"
            v-model="consulta.id_paciente"
            name="paciente"
            id="paciente"
          >
            <option
              v-for="paciente in pacientes"
              :key="paciente.id"
              :value="paciente.id"
            >
              {{ paciente.nome }}
            </option>
          </select>
          <input
            v-else
            type="text"
            :disabled="!pacientes"
            placeholder="Nenhum paciente encontrado"
          />
        </div>
        <div class="full">
          <label for="procedimento">Procedimento*</label>
          <select
            v-if="procedimentos"
            required
            :disabled="!consulta.id_paciente"
            @change="selecionaProcedimento(consulta.id_procedimento)"
            v-model="consulta.id_procedimento"
            name="procedimento"
            id="procedimento"
          >
            <option
              v-for="procedimento in procedimentos"
              :key="procedimento.id"
              :value="procedimento.id"
            >
              {{ procedimento.procedimento }}
            </option>
          </select>
          <input
            v-else
            type="text"
            :disabled="!procedimentos"
            :placeholder="erroProcedimentos || 'Nenhum procedimento encontrado'"
          />
        </div>
        <div class="full">
          <label for="dentista">Dentista*</label>
          <select
            v-if="dentistas"
            required
            :disabled="!consulta.id_procedimento"
            @change="resetDentista"
            v-model="consulta.id_dentista"
            name="dentista"
            id="dentista"
          >
            <option
              v-for="dentista in dentistas"
              :key="dentista.id"
              :value="dentista.id"
            >
              {{ dentista.nome }}
            </option>
          </select>
          <input
            v-else
            type="text"
            :disabled="!dentistas"
            :placeholder="erroDentistas || 'Nenhum dentista encontrado'"
          />
        </div>
        <div>
          <label for="data">Data*</label>
          <input
            :disabled="!consulta.id_dentista"
            required
            type="date"
            @change="selecionaData"
            name="data"
            id="data"
            v-model="consulta.data"
          />
        </div>
        <div>
          <label for="horario">Horário*</label>
          <select
            v-if="horarios"
            required
            :disabled="!consulta.data"
            v-model="consulta.horario"
            name="horario"
            id="horario"
          >
            <option
              v-for="(horario, index) in horarios"
              :key="index"
              :value="horario"
            >
              {{ horario }}
            </option>
          </select>
          <input
            v-else
            type="text"
            :disabled="!horarios"
            :placeholder="erroHorarios || 'Nenhum horário encontrado'"
          />
        </div>
        <div>
          <label for="valor"
            >Valor*
            <span v-if="desconto && desconto > 0"
              >{{ Math.round(desconto) }}% off</span
            ></label
          >
          <input
            disabled
            type="number"
            min="0"
            step="0.01"
            name="valor"
            id="valor"
            v-model="consulta.valor"
          />
        </div>
        <div>
          <label for="duracao">Duração*</label>
          <input
            disabled
            type="time"
            required
            name="duracao"
            id="duracao"
            v-model="consulta.duracao"
          />
        </div>
        <div>
          <label for="status">Status*</label>
          <select
            :disabled="!consulta.id_dentista"
            required
            name="status"
            id="status"
            v-model="consulta.status"
          >
            <option value="A Confirmar">A Confirmar</option>
            <option value="Confirmado">Confirmado</option>
            <option value="No Local">No Local</option>
            <option value="Atendido">Atendido</option>
            <option value="Não Compareceu">Não Compareceu</option>
          </select>
        </div>
        <div>
          <label for="pago">Pago?*</label>
          <select
            :disabled="!consulta.id_dentista"
            required
            name="pago"
            id="pago"
            v-model="consulta.pago"
          >
            <option value="1">Sim</option>
            <option value="0">Não</option>
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
  name: "AgendarConsulta",
  data() {
    return {
      consulta: {
        id_usuario: this.$store.state.usuario.id,
        id_procedimento: null,
        id_paciente: null,
        id_dentista: null,
        data: null,
        horario: null,
        valor: null,
        duracao: null,
        status: "A Confirmar",
        pago: 0,
      },
      desconto: null,
      procedimentos: null,
      erroProcedimentos: "Selecione o paciente",
      horarios: null,
      erroHorarios: "Selecione a data",
      pacientes: null,
      dentistas: null,
      erroDentistas: "Selecione o procedimento",
    };
  },
  created() {
    this.getPacientes();
  },
  methods: {
    sendConsulta() {
      api
        .post("/consulta/send", this.consulta, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Agendado!",
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
    getProcedimentos(id_paciente) {
      this.resetPaciente();

      api
        .get(`/procedimento/getativos/${id_paciente}`)
        .then((response) => {
          this.procedimentos = response.data.data;
          this.erroProcedimentos = null;
        })
        .catch(() => {
          this.erroProcedimentos = null;
        });
    },
    getPacientes() {
      this.pacientes = null;

      api.get(`/paciente/getall`).then((response) => {
        this.pacientes = response.data.data;
      });
    },
    getDentistas(id_especialidade) {
      this.dentistas = null;
      this.erroDentistas = "Carregando...";
      const parameter = id_especialidade ? `/${id_especialidade}` : "";

      api
        .get(`/dentista/getespecialidade${parameter}`)
        .then((response) => {
          this.dentistas = response.data.data;
          this.erroDentistas = null;
        })
        .catch(() => {
          this.erroDentistas = null;
        });
    },
    selecionaProcedimento(id) {
      this.resetProcedimento();

      const procedimento = this.procedimentos.filter((procedimento) => {
        return procedimento.id == id;
      })[0];

      this.consulta.valor = procedimento.valor_descontado;
      this.desconto = procedimento.desconto;
      this.consulta.duracao = procedimento.tempo;
      this.getDentistas(procedimento.id_especialidade);
    },
    resetDentista() {
      this.consulta.data = null;
      this.consulta.horario = null;
      this.horarios = null;
      this.erroHorarios = "Selecione a data";
    },
    resetProcedimento() {
      this.resetDentista();
      this.consulta.id_dentista = null;
      this.dentistas = null;
      this.erroDentistas = "Selecione o procedimento";
    },
    resetPaciente() {
      this.resetProcedimento();
      this.procedimentos = null;
      this.erroProcedimentos = "Carregando...";
      this.consulta.id_procedimento = null;
      this.consulta.valor = null;
      this.desconto = null;
      this.consulta.duracao = null;
    },
    selecionaData() {
      if (this.consulta.data.length == 10) {
        this.horarios = null;
        this.erroHorarios = "Carregando...";

        const data = {
          id_dentista: this.consulta.id_dentista,
          duracao: this.consulta.duracao,
          data: this.consulta.data,
        };

        api
          .post(`/horario/getdisponiveis`, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.horarios = response.data.data;
            console.log(this.horarios);
            this.erroHorarios = null;
          })
          .catch(() => {
            this.erroHorarios = null;
          });
      }
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

<style lang="scss" scoped>
label span {
  margin-left: 5px;
}
</style>
