<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Cadastrar Usuário</h2>
      </div>
      <form @submit.prevent="sendUsuario">
        <div>
          <span class="label">Ativo?</span>
          <input required type="radio" value="1" name="ativo" id="ativo-sim" />
          <label class="radio" for="ativo-sim">Sim</label>
          <input required type="radio" value="0" name="ativo" id="ativo-nao" />
          <label class="radio" for="ativo-nao">Não</label>
        </div>
        <div>
          <span class="label">Administrador?</span>
          <input
            required
            type="radio"
            value="1"
            name="administrador"
            id="administrador-sim"
          />
          <label class="radio" for="administrador-sim">Sim</label>
          <input
            required
            type="radio"
            value="0"
            name="administrador"
            id="administrador-nao"
          />
          <label class="radio" for="administrador-nao">Não</label>
        </div>
        <div class="full">
          <div>
            <label for="foto">Foto</label>
            <input required type="file" name="foto" id="foto" />
          </div>
        </div>
        <div class="full">
          <label for="nome">Nome</label>
          <input required type="text" name="nome" id="nome" />
        </div>
        <div class="full">
          <label for="usuario">Usuário</label>
          <input required type="text" name="usuario" id="usuario" />
        </div>
        <div class="full">
          <label for="senha">Senha</label>
          <input required type="password" name="senha" id="senha" />
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
  name: "CadastrarUsuario",
  methods: {
    sendUsuario(event) {
      const formData = new FormData(event.target);

      api
        .post("/usuario/send", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Cadastrado!",
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
            text: response.data.data,
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
      this.$emit("close-modal-cadastrar");
    },
  },
};
</script>
