<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Editar Transação</h2>
      </div>
      <form @submit.prevent="updateUsuario">
        <div class="full">
          <span class="label">Operação*</span>
          <input
            required
            :disabled="!editar"
            v-model="sTransacao.operacao"
            type="radio"
            value="Receita"
            name="operacao"
            id="receita"
          />
          <label class="radio" for="receita">Receita</label>
          <input
            required
            :disabled="!editar"
            v-model="sTransacao.operacao"
            type="radio"
            value="Despesa"
            name="operacao"
            id="despesa"
          />
          <label class="radio" for="despesa">Despesa</label>
        </div>
        <div>
          <label for="data">Data*</label>
          <input
            required
            :disabled="!editar"
            v-model="sTransacao.data"
            type="datetime-local"
            name="data"
            id="data"
          />
        </div>
        <div>
          <label for="valor">Valor*</label>
          <input
            required
            :disabled="!editar"
            v-model="sTransacao.valor"
            type="number"
            step="0.01"
            name="valor"
            id="valor"
          />
        </div>
        <div class="full">
          <label for="nome">Tipo*</label>
          <select
            v-if="sTransacao.operacao == 'Receita'"
            :disabled="!editar"
            required
            v-model="sTransacao.tipo"
            name="tipo"
            id="tipo"
          >
            <option value="Recebimento de Consulta">
              Recebimento de Consulta
            </option>
            <option value="Recebimento de Convênio">
              Recebimento de Convênio
            </option>
            <option value="Outros">Outros</option>
          </select>
          <select
            v-else
            :disabled="!editar"
            required
            v-model="sTransacao.tipo"
            name="tipo"
            id="tipo"
          >
            <option value="Compra de Produtos">Compra de Produtos</option>
            <option value="Pagamento de Funcionários">
              Pagamento de Funcionários
            </option>
            <option value="Despesas Fixas">Despesas Fixas</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <div class="full">
          <label for="descricao">Descrição</label>
          <textarea
            :disabled="!editar"
            v-model="sTransacao.descricao"
            name="descricao"
            id="descricao"
          ></textarea>
        </div>
        <div class="buttons">
          <button v-if="editar">Salvar</button>
          <button v-else @click.prevent="editar = !editar">Editar</button>
          <button @click.prevent="closeModal" class="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "EditarTransacao",
  props: {
    transacao: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sTransacao: this.transacao,
      editar: false,
    };
  },
  created() {
    this.sTransacao.data = this.sTransacao.data.replace(" ", "T");
  },
  methods: {
    updateUsuario(event) {
      const formData = new FormData(event.target);

      api
        .post(`/financas/update/${this.sTransacao.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
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
