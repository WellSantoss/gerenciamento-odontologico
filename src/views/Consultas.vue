<template>
  <div class="content">
    <SearchDentista
      @busca="handle"
      @cadastrar="modalCadastrar = !modalCadastrar"
    />
    <transition mode="out-in">
      <div v-if="consultas" class="cards">
        <div
          v-for="consulta in consultas"
          @click="editarConsulta(consulta.id)"
          :key="consulta.id"
          class="card"
        >
          <h3>
            {{ consulta.data.split(" ")[0] | formatDate }}
            {{ consulta.data.split(" ")[1] }} - {{ consulta.status }}
          </h3>
          <span class="label">Dentista</span>
          <p>{{ consulta.dentista }}</p>
          <span class="label">Paciente</span>
          <p>{{ consulta.paciente }}</p>
        </div>
      </div>
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <AgendarConsulta
        v-if="modalCadastrar"
        @close-modal="closeModalCadastrar"
      />
      <EditarConsulta
        v-if="consultaSelecionada"
        :consultaSelecionada="consultaSelecionada"
        @close-modal="closeModalEditar"
      />
    </transition>
  </div>
</template>

<script>
import SearchDentista from "@/components/SearchDentista.vue";
import Loading from "@/components/Loading.vue";
import AgendarConsulta from "@/components/consultas/Agendar.vue";
import EditarConsulta from "@/components/consultas/Editar.vue";
import api from "@/api.js";

export default {
  name: "Consultas",
  components: {
    SearchDentista,
    Loading,
    AgendarConsulta,
    EditarConsulta,
  },
  data() {
    return {
      erro: null,
      modalCadastrar: false,
      consultaSelecionada: null,
      consultas: null,
      dentista: "",
    };
  },
  created() {
    this.getConsultas();
  },
  computed: {
    query() {
      return this.$route.query.paciente ? this.$route.query.paciente : null;
    },
  },
  methods: {
    handle(e) {
      this.dentista = e;
      this.getConsultas();
    },
    getConsultas() {
      this.consultas = null;
      let url = `/consulta/getall`;

      if (this.dentista) {
        url = `/consulta/getdentista/${this.dentista}`;
        this.$router.replace({ name: this.$route.name });
      } else if (this.query) {
        url = `/consulta/getpaciente/${this.query}`;
      }

      api
        .get(url)
        .then((response) => {
          this.consultas = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getConsultas();
    },
    closeModalEditar() {
      this.consultaSelecionada = null;
      this.getConsultas();
    },
    editarConsulta(id) {
      const consulta = this.consultas.filter((consulta) => {
        return consulta.id == id;
      });

      this.consultaSelecionada = consulta[0];
    },
    closeModal(e) {
      this.consultaSelecionada = null;

      if (e.target === e.currentTarget) {
        this.modalView = !this.modalView;
      }
    },
  },
};
</script>
