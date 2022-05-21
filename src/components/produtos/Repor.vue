<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Repor Estoque</h2>
        <p>{{ produto.nome }}</p>
      </div>
      <form @submit.prevent="reporProduto">
        <div class="full">
          <label for="estoque">Quantidade</label>
          <input
            required
            type="number"
            step="1"
            min="1"
            v-model="quantidade"
            name="quantidade"
            id="quantidade"
          />
        </div>
        <div class="buttons">
          <button>Salvar</button>
          <button @click.prevent="closeModal" class="close">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  name: "ReporProduto",
  props: {
    produto: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantidade: 1,
    };
  },
  created() {
    console.log(this.produto);
  },
  methods: {
    reporProduto() {
      api
        .post(
          `/produto/refound/${this.produto.id}`,
          { quantidade: this.quantidade },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Atualizado!",
            text: response.data.data,
            onClose: this.closeModal(),
          }).then((result) => {
            if (result.isConfirmed) {
              this.closeModal();
            }
          });
        })
        .catch((response) => {
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: response.response.data.data,
            onClose: this.closeModal(),
          }).then((result) => {
            if (result.isConfirmed) {
              this.closeModal();
            }
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
