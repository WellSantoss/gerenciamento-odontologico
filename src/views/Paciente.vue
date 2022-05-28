<template>
  <div v-if="paciente.infos" class="content">
    <div class="card">
      <div class="title">
        <h2>{{ paciente.infos.nome }}</h2>
        <div>
          <img
            src="@/assets/edit.svg"
            @click="editarInfos = !editarInfos"
            title="Editar"
            alt="Editar"
          />
          <img
            src="@/assets/trash.svg"
            @click="deletePaciente"
            title="Excluir"
            alt="Excluir"
          />
        </div>
      </div>
      <div class="items">
        <div>
          <span class="label">CPF</span>
          <p>{{ paciente.infos.cpf }}</p>
        </div>
        <div>
          <span class="label">Data de Nascimento</span>
          <p>{{ paciente.infos.data_nascimento | formatDate }}</p>
        </div>
        <div>
          <span class="label">Telefone</span>
          <p>{{ paciente.infos.telefone }}</p>
        </div>
        <div>
          <span class="label">CEP</span>
          <p>{{ paciente.infos.cep }}</p>
        </div>
        <div>
          <span class="label">Estado</span>
          <p>{{ paciente.infos.estado }}</p>
        </div>
        <div>
          <span class="label">Cidade</span>
          <p>{{ paciente.infos.cidade }}</p>
        </div>
        <div>
          <span class="label">Bairro</span>
          <p>{{ paciente.infos.bairro }}</p>
        </div>
        <div>
          <span class="label">Rua</span>
          <p>{{ paciente.infos.rua }}</p>
        </div>
        <div>
          <span class="label">Número</span>
          <p>{{ paciente.infos.numero }}</p>
        </div>
        <div>
          <span class="label">Convênio</span>
          <p>{{ paciente.infos.convenio }}</p>
        </div>
      </div>
    </div>
    <div v-if="consultas" class="card consultas">
      <div class="title">
        <h2>Últimas Consultas</h2>
        <img src="@/assets/arrow-right.svg" alt="editar" />
      </div>
      <div class="cards">
        <div v-for="consulta in consultas" :key="consulta.id" class="card">
          <h3>
            {{ consulta.data }} {{ consulta.hora }} - {{ consulta.status }}
          </h3>
          <span class="label">Dentista</span>
          <p>{{ consulta.dentista }}</p>
          <span class="label">Paciente</span>
          <p>{{ consulta.paciente }}</p>
        </div>
      </div>
    </div>
    <div v-if="procedimentos" class="card">
      <div class="title">
        <h2>Procedimentos a Realizar</h2>
        <img src="@/assets/arrow-right.svg" alt="editar" />
      </div>
      <div class="cards">
        <div
          v-for="procedimento in procedimentos"
          :key="procedimento.id"
          class="card"
        >
          <span class="label">Procedimento</span>
          <p>{{ procedimento.procedimento }}</p>
          <span class="label">Dente</span>
          <p>{{ procedimento.dente }}</p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="title">
        <h2>Informações Clínicas</h2>
        <img
          src="@/assets/edit.svg"
          @click="editarObs = !editarObs"
          title="Editar"
          alt="Editar"
        />
      </div>
      <div class="items">
        <div>
          <span class="label">Queixa Atual</span>
          <p>
            {{ paciente.obs.queixa_atual ? paciente.obs.queixa_atual : "-" }}
          </p>
        </div>
        <div>
          <span class="label">Medicações</span>
          <p>{{ paciente.obs.medicacoes ? paciente.obs.medicacoes : "-" }}</p>
        </div>
        <div>
          <span class="label">Alergias</span>
          <p>{{ paciente.obs.alergias ? paciente.obs.alergias : "-" }}</p>
        </div>
        <div>
          <span class="label">Doenças</span>
          <p>{{ paciente.obs.doencas ? paciente.obs.doencas : "-" }}</p>
        </div>
        <div>
          <span class="label">Cirurgias</span>
          <p>{{ paciente.obs.cirurgias ? paciente.obs.cirurgias : "-" }}</p>
        </div>
        <div>
          <span class="label">Tipo de Sangramento</span>
          <p>
            {{
              paciente.obs.tipo_sangramento
                ? paciente.obs.tipo_sangramento
                : "-"
            }}
          </p>
        </div>
        <div>
          <span class="label">Tipo de Cicatrização</span>
          <p>
            {{
              paciente.obs.tipo_cicatrizacao
                ? paciente.obs.tipo_cicatrizacao
                : "-"
            }}
          </p>
        </div>
        <div>
          <span class="label">Falta de Ar</span>
          <p>{{ paciente.obs.falta_de_ar ? paciente.obs.falta_de_ar : "-" }}</p>
        </div>
        <div>
          <span class="label">Gestante</span>
          <p>{{ paciente.obs.gestante ? paciente.obs.gestante : "-" }}</p>
        </div>
        <div>
          <span class="label">Observações</span>
          <p>{{ paciente.obs.observacoes ? paciente.obs.observacoes : "-" }}</p>
        </div>
      </div>
    </div>
    <transition>
      <EditarInfos
        :paciente="paciente.infos"
        v-if="editarInfos"
        @close-modal="closeModalInfos"
      />
      <EditarObs
        :obs="paciente.obs"
        :paciente="{ id: paciente.infos.id, nome: paciente.infos.nome }"
        v-if="editarObs"
        @close-modal="closeModalObs"
      />
    </transition>
  </div>
  <Loading v-else />
</template>

<script>
import api from "@/api.js";
import Loading from "@/components/Loading.vue";
import EditarInfos from "@/components/pacientes/EditarInfos.vue";
import EditarObs from "@/components/pacientes/EditarObs.vue";

export default {
  name: "Paciente",
  props: ["id"],
  components: {
    Loading,
    EditarInfos,
    EditarObs,
  },
  data() {
    return {
      paciente: {
        infos: null,
        obs: null,
      },
      procedimentos: null,
      consultas: null,
      editarInfos: false,
      editarObs: false,
    };
  },
  created() {
    this.getPaciente();
  },
  methods: {
    closeModalInfos() {
      this.editarInfos = !this.editarInfos;
      this.getPaciente();
    },
    closeModalObs() {
      this.editarObs = !this.editarObs;
      this.getPaciente();
    },
    deletePaciente() {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o paciente '${this.paciente.infos.nome}'?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/paciente/delete/${this.id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
              });

              this.$router.push(`/pacientes`);
            })
            .catch((response) => {
              this.$swal({
                icon: "error",
                title: "Erro!",
                text: response.data.data,
              });
            });
        }
      });
    },
    getPaciente() {
      this.paciente.infos = null;
      this.paciente.obs = null;

      api
        .get(`/paciente/get/${this.id}`)
        .then((response) => {
          this.paciente.infos = response.data.data.infos;
          this.paciente.obs = response.data.data.obs;
        })
        .catch(() => {
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: "Não foi possível encontrar o paciente!",
            onClose: this.$router.push(`/pacientes`),
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.title {
  img {
    cursor: pointer;
  }

  & > div {
    display: flex;
    gap: 20px;
  }
}

.card {
  padding-bottom: 16px;
  cursor: default;

  .card {
    padding-bottom: 0px;
  }
}

.cards {
  padding-top: 0;
}

.consultas {
  margin: 32px 0px;
}
</style>
