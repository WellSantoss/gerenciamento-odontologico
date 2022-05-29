<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
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
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import AgendarConsulta from "@/components/consultas/Agendar.vue";
import EditarConsulta from "@/components/consultas/Editar.vue";
import api from "@/api.js";

export default {
  name: "Consultas",
  components: {
    Search,
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
    };
  },
  created() {
    this.getConsultas();
  },
  computed: {
    query() {
      return this.$route.query.q ? `/${this.$route.query.q}` : "";
    },
  },
  watch: {
    query() {
      this.getConsultas();
    },
  },
  methods: {
    getConsultas() {
      this.consultas = null;

      api
        .get(`/consulta/getall${this.query}`)
        .then((response) => {
          console.log(response);
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
