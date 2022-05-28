<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <transition mode="out-in">
      <div v-if="pacientes" class="table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>CPF</th>
              <th>Convênio</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="paciente in pacientes"
              :key="paciente.id"
              @click="$router.push(`/paciente/${paciente.id}`)"
            >
              <td>{{ paciente.nome }}</td>
              <td>{{ paciente.telefone }}</td>
              <td>{{ paciente.cpf }}</td>
              <td>{{ paciente.convenio }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <CadastrarFornecedor
        v-if="modalCadastrar"
        @close-modal="closeModalCadastrar"
      />
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import CadastrarFornecedor from "@/components/pacientes/Cadastrar.vue";
import api from "@/api.js";
// import router from "router";

export default {
  name: "Pacientes",
  components: {
    Search,
    Loading,
    CadastrarFornecedor,
  },
  data() {
    return {
      edit: false,
      erro: null,
      modalCadastrar: false,
      pacienteSelecionado: null,
      pacientes: null,
    };
  },
  created() {
    this.getPacientes();
  },
  computed: {
    query() {
      return this.$route.query.q ? `/${this.$route.query.q}` : "";
    },
  },
  watch: {
    query() {
      this.getPacientes();
    },
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getPacientes();
    },
    getPacientes() {
      this.pacientes = null;

      api
        .get(`/paciente/get${this.query}`)
        .then((response) => {
          this.pacientes = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
tbody tr {
  cursor: pointer;
}
</style>
