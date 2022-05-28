<template>
  <div class="modal" @click="verificaCloseModal">
    <div>
      <div class="title">
        <h2>Editar Usuário</h2>
        <p>{{ usuario.nome }}</p>
      </div>
      <form @submit.prevent="updateUsuario">
        <div>
          <span class="label">Ativo?*</span>
          <input
            required
            type="radio"
            value="1"
            :disabled="!editar"
            v-model="usuario.ativo"
            name="ativo"
            id="ativo-sim"
          />
          <label class="radio" for="ativo-sim">Sim</label>
          <input
            required
            type="radio"
            value="0"
            :disabled="!editar"
            v-model="usuario.ativo"
            name="ativo"
            id="ativo-nao"
          />
          <label class="radio" for="ativo-nao">Não</label>
        </div>
        <div>
          <span class="label">Administrador?*</span>
          <input
            required
            type="radio"
            value="1"
            :disabled="!editar"
            v-model="usuario.administrador"
            name="administrador"
            id="administrador-sim"
          />
          <label class="radio" for="administrador-sim">Sim</label>
          <input
            required
            type="radio"
            value="0"
            :disabled="!editar"
            v-model="usuario.administrador"
            name="administrador"
            id="administrador-nao"
          />
          <label class="radio" for="administrador-nao">Não</label>
        </div>
        <div class="img-full full">
          <img
            :src="`http://localhost/gerenciamento-odontologico-api/upload/${usuario.foto}`"
            alt=""
          />
          <div>
            <label for="foto">Foto</label>
            <input type="file" name="foto" id="foto" :disabled="!editar" />
          </div>
        </div>
        <div class="full">
          <label for="nome">Nome*</label>
          <input
            required
            type="text"
            name="nome"
            id="nome"
            :disabled="!editar"
            :value="usuario.nome"
            :v-model="usuario.nome"
          />
        </div>
        <div class="full">
          <label for="usuario">Usuário*</label>
          <input
            required
            type="text"
            name="usuario"
            id="usuario"
            :disabled="!editar"
            :value="usuario.usuario"
            :v-model="usuario.usuario"
          />
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
  name: "EditarUsuario",
  props: {
    usuario: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editar: false,
    };
  },
  methods: {
    updateUsuario(event) {
      const formData = new FormData(event.target);

      api
        .post(`/usuario/update/${this.usuario.id}`, formData, {
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

<style lang="scss" scoped>
.img-full {
  display: flex;
  gap: 16px;

  img {
    height: 63px;
  }

  & > div {
    flex: 1;
  }
}
</style>
