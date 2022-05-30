<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Editar Consulta</h2>
        <p>{{ consulta.status }}</p>
      </div>
      <form @submit.prevent="updateConsulta">
        <div class="full">
          <label for="usuario">Agendado por</label>
          <input
            disabled
            type="text"
            name="usuario"
            id="usuario"
            v-model="consulta.usuario"
          />
        </div>
        <div>
          <label for="paciente">Paciente</label>
          <input
            disabled
            type="text"
            name="paciente"
            id="paciente"
            v-model="consulta.paciente"
          />
        </div>
        <div>
          <label for="dentista">Dentista</label>
          <input
            disabled
            type="text"
            name="dentista"
            id="dentista"
            v-model="consulta.dentista"
          />
        </div>
        <div>
          <label for="data">Data</label>
          <input
            disabled
            v-model="consulta.data"
            type="datetime-local"
            name="data"
            id="data"
          />
        </div>
        <div>
          <label for="valor">Valor</label>
          <input
            disabled
            type="text"
            name="valor"
            id="valor"
            v-model="consulta.valor"
          />
        </div>
        <div>
          <label for="status">Status*</label>
          <select required name="status" id="status" v-model="consulta.status">
            <option value="A Confirmar">A Confirmar</option>
            <option value="Confirmado">Confirmado</option>
            <option value="No Local">No Local</option>
            <option value="Atendido">Atendido</option>
            <option value="Não Compareceu">Não Compareceu</option>
          </select>
        </div>
        <div>
          <label for="pago">Pago?*</label>
          <select required name="pago" id="pago" v-model="consulta.pago">
            <option value="1">Sim</option>
            <option value="0">Não</option>
          </select>
        </div>
        <div class="title full">
          <h2>Procedimentos</h2>
        </div>
        <div v-if="cargo != 'Atendente'" class="add full">
          <div>
            <label for="procedimento">Procedimento*</label>
            <select
              v-if="procedimentos"
              name="procedimento"
              id="procedimento"
              v-model="sendProcedimento.id_procedimento"
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
              placeholder="Nenhum disponível"
            />
          </div>
          <button @click.prevent="sendEspecialidade" :disabled="!procedimentos">
            Adicionar
          </button>
        </div>
        <div v-if="procedimentosRealizados" class="full">
          <div
            v-for="procedimento in procedimentosRealizados"
            :key="procedimento.id"
            class="procedimento"
          >
            <h3 class="full">
              {{ procedimento.procedimento }}
              <img
                v-if="procedimentosRealizados.length > 1"
                @click="
                  deleteProcedimento(procedimento.id, procedimento.procedimento)
                "
                src="@/assets/trash.svg"
                title="Excluir"
                alt="Excluir"
              />
            </h3>
            <div>
              <label for="finalizado">Finalizado?</label>
              <select
                :disabled="!(cargo != 'Atendente')"
                v-model="procedimento.finalizado"
                name="finalizado"
                id="finalizado"
              >
                <option value="0">Não</option>
                <option value="1">Sim</option>
              </select>
            </div>
            <div>
              <label for="dente">Local</label>
              <input
                :disabled="!(cargo != 'Atendente')"
                type="text"
                name="dente"
                id="dente"
                v-model="procedimento.dente"
              />
            </div>
            <div class="full">
              <label for="observacoes">Observações</label>
              <textarea
                :disabled="!(cargo != 'Atendente')"
                name="observacoes"
                id="observacoes"
                v-model="procedimento.observacoes"
              ></textarea>
            </div>
          </div>
        </div>
        <p v-else-if="erro" class="erro">{{ erro }}</p>
        <Loading v-else />
        <div class="buttons full">
          <button>Salvar</button>
          <button @click.prevent="closeModal" class="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import Loading from "@/components/Loading.vue";

export default {
  name: "EditarConsulta",
  props: {
    consultaSelecionada: {
      type: Object,
      required: true,
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      erro: null,
      consulta: null,
      sendProcedimento: {
        id_procedimento: null,
        id_consulta: null,
      },
      procedimentosRealizados: null,
      procedimentos: null,
    };
  },
  created() {
    this.sendProcedimento.id_consulta = this.consultaSelecionada.id;
    this.consulta = this.consultaSelecionada;
    this.consulta.data = this.consultaSelecionada.data.replace(" ", "T");
    this.getRealizados();
    this.getProcedimentos();
  },
  computed: {
    cargo() {
      return this.$store.state.cargo;
    },
  },
  methods: {
    sendEspecialidade() {
      if (this.sendProcedimento.id_procedimento) {
        api
          .post("/realizado/send", this.sendProcedimento, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.$swal({
              icon: "success",
              title: "Cadastrado!",
              text: response.data.data,
              onClose: this.getRealizados(),
            });
          })
          .catch((response) => {
            this.$swal({
              icon: "error",
              title: "Erro!",
              text: response.response.data.data,
              onClose: this.getRealizados(),
            });
          });

        this.sendProcedimento.id_procedimento = null;
      }
    },
    getRealizados() {
      this.procedimentosRealizados = null;

      api
        .get(`/realizado/get/${this.consulta.id}`)
        .then((response) => {
          this.procedimentosRealizados = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    getProcedimentos() {
      this.procedimentos = null;

      api
        .get(`/procedimento/getdentista/${this.consulta.id_dentista}`)
        .then((response) => {
          this.procedimentos = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    deleteProcedimento(id, procedimento) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o procedimento '${procedimento}'?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/realizado/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
                onClose: this.getRealizados(),
              });
            })
            .catch((response) => {
              this.$swal({
                icon: "error",
                title: "Erro!",
                text: response.data.data,
                onClose: this.getRealizados(),
              });
            });
        }
      });
    },
    updateConsulta() {
      const data = {
        consulta: this.consulta,
        procedimentos: this.procedimentosRealizados,
        id_usuario: this.$store.state.usuario.id,
      };

      api
        .post(`/consulta/update/${this.consulta.id}`, data, {
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

<style lang="scss" scoped>
.title.full {
  margin-bottom: 0px;
}

.procedimento {
  margin-top: 16px;
}

h3.full {
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    cursor: pointer;
  }
}

.add {
  display: grid;
  grid-template-columns: 3fr 1fr;
  justify-items: stretch;
  gap: 16px;

  button {
    align-self: end;
    width: 100%;
  }
}
</style>
