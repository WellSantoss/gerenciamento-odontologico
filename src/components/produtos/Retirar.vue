<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Retirar Estoque</h2>
        <p>{{ produto.nome }}</p>
      </div>
      <form @submit.prevent="retirarProduto">
        <div class="full">
          <label for="estoque">Quantidade*</label>
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
  name: "RetirarProduto",
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
  computed: {
    idUsuario() {
      return this.$store.state.usuario.id;
    },
  },
  methods: {
    retirarProduto() {
      api
        .post(
          `/retirada/send`,
          {
            produto: this.produto.id,
            usuario: this.idUsuario,
            quantidade: this.quantidade,
          },
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
