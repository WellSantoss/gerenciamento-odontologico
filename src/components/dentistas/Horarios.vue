<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Horários de Atendimento</h2>
        <p>{{ dentista.nome }}</p>
      </div>
      <form @submit.prevent="sendHorario">
        <div>
          <label for="dia_semana">Dia*</label>
          <select
            name="dia_semana"
            id="dia_semana"
            required
            v-model="horario.dia_semana"
          >
            <option value="1">Domingo</option>
            <option value="2">Segunda-Feira</option>
            <option value="3">Terça-Feira</option>
            <option value="4">Quarta-Feira</option>
            <option value="5">Quinta-Feira</option>
            <option value="6">Sexta-Feira</option>
            <option value="7">Sábado</option>
          </select>
        </div>
        <div>
          <label for="inicio">Início*</label>
          <input
            required
            type="time"
            v-model="horario.inicio"
            name="inicio"
            id="inicio"
          />
        </div>
        <div>
          <label for="termino">Final*</label>
          <input
            required
            type="time"
            v-model="horario.termino"
            :min="horario.inicio"
            name="termino"
            id="termino"
          />
        </div>
        <button>Adicionar</button>
      </form>
      <div v-if="horarios" class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Dia</th>
              <th>Início</th>
              <th>Final</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="horario in horarios" :key="horario.id">
              <td class="icon">
                <img
                  @click="
                    deleteHorario(horario.id, formataDia(horario.dia_semana))
                  "
                  src="@/assets/trash.svg"
                  title="Excluir"
                  alt="Excluir"
                />
              </td>
              <td>{{ formataDia(horario.dia_semana) }}</td>
              <td>{{ horario.inicio }}</td>
              <td>{{ horario.termino }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="erro" v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import Loading from "@/components/Loading.vue";

export default {
  name: "HorarioConvenio",
  components: {
    Loading,
  },
  props: {
    dentista: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      horario: {
        id_dentista: this.dentista.id,
        dia_semana: null,
        inicio: null,
        termino: null,
      },
      erro: null,
      horarios: null,
    };
  },
  created() {
    this.getHorarios();
  },
  methods: {
    formataDia(dia) {
      switch (dia) {
        case 1:
          return "Domingo";
        case 2:
          return "Segunda-Feira";
        case 3:
          return "Terça-Feira";
        case 4:
          return "Quarta-Feira";
        case 5:
          return "Quinta-Feira";
        case 6:
          return "Sexta-Feira";
        case 7:
          return "Sábado";
        default:
          return "-";
      }
    },
    sendHorario() {
      api
        .post("/horario/send", this.horario, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.horario.dia_semana = null;
          this.horario.inicio = null;
          this.horario.termino = null;

          this.$swal({
            icon: "success",
            title: "Cadastrado!",
            text: response.data.data,
            onClose: this.getHorarios(),
          });
        })
        .catch((response) => {
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: response.response.data.data,
            onClose: this.getHorarios(),
          });
        });
    },
    deleteHorario(id, dia) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o horario de ${dia}?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/horario/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
                onClose: this.getHorarios(),
              });

              this.getConvenios();
            })
            .catch((response) => {
              this.$swal({
                icon: "error",
                title: "Erro!",
                text: response.data.data,
                onClose: this.getHorarios(),
              });
            });
        }
      });
    },
    getHorarios() {
      this.horarios = null;

      api
        .get(`/horario/get/${this.dentista.id}`)
        .then((response) => {
          this.horarios = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
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

<style lang="scss" scoped>
form {
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: stretch;
}

@media screen and (max-width: 575px) {
  form {
    grid-template-columns: 1fr;

    & > div {
      grid-column: span 1;
    }
  }
}
</style>
