<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Cadastrar Cobertura do Convênio</h2>
      </div>
      <form @submit.prevent="sendCobertura">
        <div>
          <label for="procedimento">Procedimento*</label>
          <select
            v-if="procedimentos"
            name="procedimento"
            id="procedimento"
            required
            v-model="cobertura.procedimento"
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
        <div>
          <label for="porcentagem">Porcentagem*</label>
          <input
            type="number"
            step="1"
            min="1"
            max="100"
            required
            :disabled="!procedimentos"
            v-model="cobertura.porcentagem"
            name="porcentagem"
            id="porcentagem"
          />
        </div>
        <button :disabled="!procedimentos">Adicionar</button>
      </form>
      <div v-if="coberturas" class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Procedimento</th>
              <th>Cobertura</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cobertura in coberturas" :key="cobertura.id">
              <td class="icon">
                <img
                  @click="deleteCobertura(cobertura.id, cobertura.procedimento)"
                  src="@/assets/trash.svg"
                  title="Excluir"
                  alt="Excluir"
                />
              </td>
              <td>{{ cobertura.procedimento }}</td>
              <td>{{ cobertura.porcentagem }}%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import Loading from "@/components/Loading.vue";

export default {
  name: "CoberturaConvenio",
  components: {
    Loading,
  },
  props: {
    convenio: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cobertura: {
        convenio: this.convenio.id,
        procedimento: null,
        porcentagem: 1,
      },
      erro: null,
      coberturas: null,
      procedimentos: null,
    };
  },
  created() {
    this.getCoberturas();
    this.getProcedimentos();
  },
  methods: {
    sendCobertura() {
      api
        .post("/cobertura/send", this.cobertura, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Cadastrado!",
            text: response.data.data,
            onClose: () => {
              this.getCoberturas();
              this.getProcedimentos();
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.getCoberturas();
              this.getProcedimentos();
            }
          });
        })
        .catch((response) => {
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: response.response.data.data,
            onClose: () => {
              this.getCoberturas();
              this.getProcedimentos();
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.getCoberturas();
              this.getProcedimentos();
            }
          });
        });
    },
    deleteCobertura(id, procedimento) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o cobertura para o procedimento '${procedimento}'?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/cobertura/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
                onClose: () => {
                  this.getCoberturas();
                  this.getProcedimentos();
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.getCoberturas();
                  this.getProcedimentos();
                }
              });

              this.getConvenios();
            })
            .catch((response) => {
              this.$swal({
                icon: "error",
                title: "Erro!",
                text: response.data.data,
                onClose: () => {
                  this.getCoberturas();
                  this.getProcedimentos();
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  this.getCoberturas();
                  this.getProcedimentos();
                }
              });
            });
        }
      });
    },
    getCoberturas() {
      this.coberturas = null;

      api
        .get(`/cobertura/get/${this.convenio.id}`)
        .then((response) => {
          this.coberturas = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    getProcedimentos() {
      this.procedimentos = null;

      api
        .get(`/cobertura/procedimentos/${this.convenio.id}`)
        .then((response) => {
          this.procedimentos = response.data.data;
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
  grid-template-columns: 2fr 1fr 1fr;
  justify-items: stretch;
}
</style>
