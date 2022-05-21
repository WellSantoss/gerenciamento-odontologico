<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <transition mode="out-in">
      <div v-if="especialidades" class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="especialidade in especialidades" :key="especialidade.id">
              <td class="icon">
                <img
                  @click="viewEspecialidade(especialidade.id)"
                  src="@/assets/edit.svg"
                  title="Editar"
                  alt="Editar"
                />
              </td>
              <td class="icon">
                <img
                  @click="
                    deleteEspecialidade(especialidade.id, especialidade.nome)
                  "
                  src="@/assets/trash.svg"
                  title="Excluir"
                  alt="Excluir"
                />
              </td>
              <td>{{ especialidade.nome }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <CadastrarEspecialidade
        v-if="modalCadastrar"
        @close-modal="closeModalCadastrar"
      />
      <EditarEspecialidade
        :especialidade="especialidadeSelecionada"
        v-if="especialidadeSelecionada"
        @close-modal="closeModalEditar"
      />
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import CadastrarEspecialidade from "@/components/especialidades/Cadastrar.vue";
import EditarEspecialidade from "@/components/especialidades/Editar.vue";
import api from "@/api.js";

export default {
  name: "Especialidades",
  components: {
    Search,
    Loading,
    CadastrarEspecialidade,
    EditarEspecialidade,
  },
  data() {
    return {
      erro: null,
      modalCadastrar: false,
      especialidadeSelecionada: null,
      especialidades: null,
    };
  },
  created() {
    this.getEspecialidades();
  },
  computed: {
    query() {
      return this.$route.query.q ? `/${this.$route.query.q}` : "";
    },
  },
  watch: {
    query() {
      this.getEspecialidades();
    },
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getEspecialidades();
    },
    closeModalEditar() {
      this.especialidadeSelecionada = null;
      this.getEspecialidades();
    },
    getEspecialidades() {
      this.especialidades = null;

      api
        .get(`/especialidade/get${this.query}`)
        .then((response) => {
          this.especialidades = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    deleteEspecialidade(id, especialidade) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir a especialidade '${especialidade}'?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/especialidade/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
              });

              this.getEspecialidades();
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
    viewEspecialidade(id) {
      const especialidade = this.especialidades.filter((especialidade) => {
        return especialidade.id == id;
      });

      this.especialidadeSelecionada = especialidade[0];
    },
  },
};
</script>
