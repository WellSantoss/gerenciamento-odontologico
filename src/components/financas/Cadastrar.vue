<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Cadastrar Transação</h2>
      </div>
      <form @submit.prevent="sendTransacao">
        <div class="full">
          <span class="label">Operação*</span>
          <input
            required
            v-model="transacao.operacao"
            type="radio"
            value="Receita"
            name="operacao"
            id="receita"
          />
          <label class="radio" for="receita">Receita</label>
          <input
            required
            v-model="transacao.operacao"
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
            v-model="transacao.data"
            type="datetime-local"
            name="data"
            id="data"
          />
        </div>
        <div>
          <label for="valor">Valor*</label>
          <input
            required
            v-model="transacao.valor"
            type="number"
            step="0.01"
            name="valor"
            id="valor"
          />
        </div>
        <div class="full">
          <label for="nome">Tipo*</label>
          <select
            v-if="transacao.operacao == 'Receita'"
            required
            v-model="transacao.tipo"
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
            required
            v-model="transacao.tipo"
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
            v-model="transacao.descricao"
            name="descricao"
            id="descricao"
          ></textarea>
        </div>
        <div class="buttons">
          <button>Cadastrar</button>
          <button @click.prevent="closeModal" class="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "CadastrarTransacao",
  data() {
    return {
      transacao: {
        id_usuario: this.$store.state.usuario.id,
        data: "",
        operacao: "Despesa",
        tipo: "",
        valor: 0,
        descricao: "",
      },
    };
  },
  methods: {
    sendTransacao() {
      api
        .post("/financas/send", this.transacao, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Cadastrado!",
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
