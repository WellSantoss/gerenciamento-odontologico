<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <transition mode="out-in">
      <div v-if="convenios" class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Endereco</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="convenio in convenios" :key="convenio.id">
              <td class="icon">
                <img
                  @click="
                    coberturaConvenio = {
                      id: convenio.id,
                      convenio: convenio.nome,
                    }
                  "
                  src="@/assets/procedure.svg"
                  title="Cobertura do Convênio"
                  alt="Cobertura do Convênio"
                />
              </td>
              <td class="icon">
                <img
                  @click="viewConvenio(convenio.id)"
                  src="@/assets/edit.svg"
                  title="Editar"
                  alt="Editar"
                />
              </td>
              <td class="icon">
                <img
                  @click="deleteConvenio(convenio.id, convenio.nome)"
                  src="@/assets/trash.svg"
                  title="Excluir"
                  alt="Excluir"
                />
              </td>
              <td>{{ convenio.nome }}</td>
              <td>{{ convenio.telefone }}</td>
              <td>{{ convenio.endereco }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <CadastrarConvenio
        v-if="modalCadastrar"
        @close-modal="closeModalCadastrar"
      />
      <EditarConvenio
        :convenio="convenioSelecionado"
        v-if="convenioSelecionado"
        @close-modal="closeModalEditar"
      />
      <CoberturaConvenio
        :convenio="coberturaConvenio"
        v-if="coberturaConvenio"
        @close-modal="closeModalCobertura"
      />
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import CadastrarConvenio from "@/components/convenios/Cadastrar.vue";
import CoberturaConvenio from "@/components/convenios/Cobertura.vue";
import EditarConvenio from "@/components/convenios/Editar.vue";
import api from "@/api.js";

export default {
  name: "Convenios",
  components: {
    Search,
    Loading,
    CadastrarConvenio,
    CoberturaConvenio,
    EditarConvenio,
  },
  data() {
    return {
      edit: false,
      erro: null,
      modalCadastrar: false,
      convenioSelecionado: null,
      coberturaConvenio: null,
      convenios: null,
    };
  },
  created() {
    this.getConvenios();
  },
  computed: {
    idConvenioLogado() {
      return this.$store.state.convenio.id;
    },
    query() {
      return this.$route.query.q ? `/${this.$route.query.q}` : "";
    },
  },
  watch: {
    query() {
      this.getConvenios();
    },
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getConvenios();
    },
    closeModalEditar() {
      this.convenioSelecionado = null;
      this.getConvenios();
    },
    closeModalCobertura() {
      this.coberturaConvenio = null;
      this.getConvenios();
    },
    getConvenios() {
      this.convenios = null;

      api
        .get(`/convenio/get${this.query}`)
        .then((response) => {
          this.convenios = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    deleteConvenio(id, convenio) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o convênio '${convenio}'?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/convenio/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
              });

              this.getConvenios();
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
    viewConvenio(id) {
      const convenio = this.convenios.filter((convenio) => {
        return convenio.id == id;
      });

      this.convenioSelecionado = convenio[0];
    },
  },
};
</script>
