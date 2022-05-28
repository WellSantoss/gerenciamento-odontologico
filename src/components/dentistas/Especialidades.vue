<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Cadastrar Especialidades</h2>
        <p>{{ dentista.nome }}</p>
      </div>
      <form @submit.prevent="sendAtribuicao">
        <div>
          <label for="especialidade">Especialidade*</label>
          <select
            v-if="especialidades"
            name="especialidade"
            id="especialidade"
            required
            v-model="atribuicao.id_especialidade"
          >
            <option
              v-for="especialidade in especialidades"
              :key="especialidade.id"
              :value="especialidade.id"
            >
              {{ especialidade.nome }}
            </option>
          </select>
          <input
            v-else
            type="text"
            :disabled="!especialidades"
            placeholder="Nenhuma disponível"
          />
        </div>
        <button :disabled="!especialidades">Adicionar</button>
      </form>
      <div v-if="atribuicoes" class="table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Especialidade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="atribuicao in atribuicoes" :key="atribuicao.id">
              <td class="icon">
                <img
                  @click="
                    deleteAtribuicao(atribuicao.id, atribuicao.especialidade)
                  "
                  src="@/assets/trash.svg"
                  title="Excluir"
                  alt="Excluir"
                />
              </td>
              <td>{{ atribuicao.especialidade }}</td>
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
  name: "AtribuicaoConvenio",
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
      atribuicao: {
        id_dentista: this.dentista.id,
        id_especialidade: null,
      },
      erro: null,
      atribuicoes: null,
      especialidades: null,
    };
  },
  created() {
    this.get();
  },
  methods: {
    get() {
      this.getAtribuicoes();
      this.getEspecialidades();
    },
    sendAtribuicao() {
      api
        .post("/atribuicao/send", this.atribuicao, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Cadastrado!",
            text: response.data.data,
            onClose: this.get(),
          });
        })
        .catch((response) => {
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: response.response.data.data,
            onClose: this.get(),
          });
        });
    },
    deleteAtribuicao(id, especialidade) {
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
            .delete(`/atribuicao/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
                onClose: this.get(),
              });
            })
            .catch((response) => {
              this.$swal({
                icon: "error",
                title: "Erro!",
                text: response.data.data,
                onClose: this.get(),
              });
            });
        }
      });
    },
    getAtribuicoes() {
      this.atribuicoes = null;

      api
        .get(`/atribuicao/get/${this.dentista.id}`)
        .then((response) => {
          this.atribuicoes = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    getEspecialidades() {
      this.especialidades = null;

      api
        .get(`/atribuicao/especialidades/${this.dentista.id}`)
        .then((response) => {
          this.especialidades = response.data.data;
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
  grid-template-columns: 3fr 1fr;
  justify-items: stretch;
}
</style>
