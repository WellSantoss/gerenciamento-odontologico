<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <transition mode="out-in">
      <div v-if="financas || resumo" class="table">
        <div v-if="resumo" class="cards">
          <div class="card">
            <h3>Receitas</h3>
            <p>{{ resumo.receitas | formatCurrency }}</p>
          </div>
          <div class="card">
            <h3>Despesas</h3>
            <p>{{ resumo.despesas | formatCurrency }}</p>
          </div>
          <div class="card">
            <h3>Total</h3>
            <p :class="{ red: resumo.total < 0, blue: resumo.total > 0 }">
              {{ resumo.total | formatCurrency }}
            </p>
          </div>
        </div>
        <table v-if="financas">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Data</th>
              <th>Usuário</th>
              <th>Operação</th>
              <th>Tipo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transacao in financas" :key="transacao.id">
              <td class="icon">
                <img
                  @click="viewTransacao(transacao.id)"
                  src="@/assets/edit.svg"
                  alt="Editar"
                />
              </td>
              <td class="icon">
                <img
                  @click="deleteTransacao(transacao.id)"
                  src="@/assets/trash.svg"
                  alt="Excluir"
                />
              </td>
              <td>{{ transacao.data | formatDate }}</td>
              <td>{{ transacao.usuario }}</td>
              <td>{{ transacao.operacao }}</td>
              <td>{{ transacao.tipo }}</td>
              <td>{{ transacao.valor | formatCurrency }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="message" v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <CadastrarTransacao
        v-if="modalCadastrar"
        @close-modal="closeModalCadastrar"
      />
      <EditarTransacao
        :transacao="transacaoSelecionada"
        v-if="transacaoSelecionada"
        @close-modal="closeModalEditar"
      />
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import CadastrarTransacao from "@/components/financas/Cadastrar.vue";
import EditarTransacao from "@/components/financas/Editar.vue";
import api from "@/api.js";

export default {
  name: "Financas",
  components: {
    Search,
    Loading,
    CadastrarTransacao,
    EditarTransacao,
  },
  data() {
    return {
      edit: false,
      erro: null,
      modalCadastrar: false,
      transacaoSelecionada: null,
      financas: null,
      resumo: null,
    };
  },
  created() {
    this.getFinancas();
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getFinancas();
    },
    closeModalEditar() {
      this.transacaoSelecionada = null;
      this.getFinancas();
    },
    getFinancas() {
      this.financas = null;
      this.resumo = null;

      api
        .get(`/financas/get`)
        .then((response) => {
          this.financas = response.data.data.financas;
          this.resumo = response.data.data.resumo[0];
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    deleteTransacao(id) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir a transação selecionada?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/financas/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
              });

              this.getFinancas();
            })
            .catch((response) => {
              this.$swal({
                icon: "error",
                title: "Erro!",
                text: response.response.data.data,
              });
            });
        }
      });
    },
    viewTransacao(id) {
      const transacao = this.financas.filter((transacao) => {
        return transacao.id == id;
      });

      this.transacaoSelecionada = transacao[0];
    },
  },
};
</script>
