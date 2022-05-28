<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <transition mode="out-in">
      <div v-if="procedimentos" class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Ativo?</th>
              <th>Procedimento</th>
              <th>Especialidade</th>
              <th>Tempo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="procedimento in procedimentos" :key="procedimento.id">
              <td class="icon">
                <img
                  @click="viewProcedimento(procedimento.id)"
                  src="@/assets/edit.svg"
                  title="Editar"
                  alt="Editar"
                />
              </td>
              <td class="icon">
                <img
                  @click="
                    deleteProcedimento(
                      procedimento.id,
                      procedimento.procedimento
                    )
                  "
                  src="@/assets/trash.svg"
                  title="Excluir"
                  alt="Excluir"
                />
              </td>
              <td>{{ procedimento.ativo ? "Sim" : "Não" }}</td>
              <td>{{ procedimento.procedimento }}</td>
              <td>{{ procedimento.especialidade }}</td>
              <td>{{ procedimento.tempo }}</td>
              <td>{{ procedimento.valor | formatCurrency }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <CadastrarProcedimento
        v-if="modalCadastrar"
        @close-modal="closeModalCadastrar"
      />
      <EditarProcedimento
        :procedimento="procedimentoSelecionado"
        v-if="procedimentoSelecionado"
        @close-modal="closeModalEditar"
      />
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import CadastrarProcedimento from "@/components/procedimentos/Cadastrar.vue";
import EditarProcedimento from "@/components/procedimentos/Editar.vue";
import api from "@/api.js";

export default {
  name: "Procedimentos",
  components: {
    Search,
    Loading,
    CadastrarProcedimento,
    EditarProcedimento,
  },
  data() {
    return {
      erro: null,
      modalCadastrar: false,
      procedimentoSelecionado: null,
      procedimentos: null,
    };
  },
  created() {
    this.getProcedimentos();
  },
  computed: {
    query() {
      return this.$route.query.q ? `/${this.$route.query.q}` : "";
    },
  },
  watch: {
    query() {
      this.getProcedimentos();
    },
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getProcedimentos();
    },
    closeModalEditar() {
      this.procedimentoSelecionado = null;
      this.getProcedimentos();
    },
    getProcedimentos() {
      this.procedimentos = null;

      api
        .get(`/procedimento/get${this.query}`)
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
            .delete(`/procedimento/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
              });

              this.getProcedimentos();
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
    viewProcedimento(id) {
      const procedimento = this.procedimentos.filter((procedimento) => {
        return procedimento.id == id;
      });

      this.procedimentoSelecionado = procedimento[0];
    },
  },
};
</script>
