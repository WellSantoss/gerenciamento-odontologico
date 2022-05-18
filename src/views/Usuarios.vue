<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <div class="table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>Ativo?</th>
            <th>Administrador?</th>
            <th>Nome</th>
            <th>Usuário</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td class="icon">
              <img
                @click="
                  viewUser(usuario.id);
                  edit = true;
                "
                src="@/assets/edit.svg"
                alt="Editar"
              />
            </td>
            <td class="icon">
              <img
                @click="deleteUser(usuario.id, usuario.nome)"
                src="@/assets/trash.svg"
                alt="Excluir"
              />
            </td>
            <td>{{ usuario.ativo ? "Sim" : "Não" }}</td>
            <td>{{ usuario.administrador ? "Sim" : "Não" }}</td>
            <td class="profile">
              <img
                :src="`http://localhost/gerenciamento-odontologico-api/upload/${usuario.foto}`"
                alt="Editar"
              />
              <p>{{ usuario.nome }}</p>
            </td>
            <td>{{ usuario.usuario }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition>
      <CadastrarUsuario
        v-if="modalCadastrar"
        @close-modal-cadastrar="modalCadastrar = !modalCadastrar"
      />
    </transition>
    <transition>
      <div class="modal" @click="closeModal" v-if="usuarioSelecionado">
        <div>
          <div class="title">
            <h2>{{ usuarioSelecionado.nome }}</h2>
          </div>
          <form @submit.prevent="updateUsuario($event, usuarioSelecionado.id)">
            <div>
              <span class="label">Ativo?</span>
              <input
                type="radio"
                value="1"
                :disabled="!edit"
                v-model="usuarioSelecionado.ativo"
                name="ativo"
                id="ativo-sim"
              />
              <label class="radio" for="ativo-sim">Sim</label>
              <input
                type="radio"
                value="0"
                :disabled="!edit"
                v-model="usuarioSelecionado.ativo"
                name="ativo"
                id="ativo-nao"
              />
              <label class="radio" for="ativo-nao">Não</label>
            </div>
            <div>
              <span class="label">Administrador?</span>
              <input
                type="radio"
                value="1"
                :disabled="!edit"
                v-model="usuarioSelecionado.administrador"
                name="administrador"
                id="administrador-sim"
              />
              <label class="radio" for="administrador-sim">Sim</label>
              <input
                type="radio"
                value="0"
                :disabled="!edit"
                v-model="usuarioSelecionado.administrador"
                name="administrador"
                id="administrador-nao"
              />
              <label class="radio" for="administrador-nao">Não</label>
            </div>
            <div class="full">
              <!-- <span class="label">Foto</span> -->
              <img
                :src="`http://localhost/gerenciamento-odontologico-api/upload/${usuarioSelecionado.foto}`"
                alt=""
              />
              <div>
                <label for="foto">Foto</label>
                <input type="file" name="foto" id="foto" :disabled="!edit" />
              </div>
            </div>
            <div>
              <label for="nome">Nome</label>
              <input
                type="text"
                name="nome"
                id="nome"
                :disabled="!edit"
                :value="usuarioSelecionado.nome"
                :v-model="usuarioSelecionado.nome"
              />
            </div>
            <div>
              <label for="usuario">Usuário</label>
              <input
                type="text"
                name="usuario"
                id="usuario"
                :disabled="!edit"
                :value="usuarioSelecionado.usuario"
                :v-model="usuarioSelecionado.usuario"
              />
            </div>
            <div class="buttons">
              <button v-if="edit">Salvar</button>
              <button v-else @click.prevent="edit = true">Editar</button>
              <button @click.prevent="usuarioSelecionado = null" class="close">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import CadastrarUsuario from "@/components/usuarios/Cadastrar.vue";
import api from "@/api.js";

export default {
  name: "Usuarios",
  components: {
    Search,
    CadastrarUsuario,
  },
  data() {
    return {
      edit: false,
      modalCadastrar: false,
      usuarioSelecionado: null,
      usuarios: null,
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    updateUsuario(event, id) {
      const formData = new FormData(event.target);

      api
        .post(`/usuario/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$swal({
            icon: "success",
            title: "Atualizado!",
            text: response.data.data,
          });

          this.usuarioSelecionado = null;
          this.getUsers();
        })
        .catch((response) => {
          this.$swal({
            icon: "error",
            title: "Erro!",
            text: response.data.data,
          });
        });
    },
    getUsers() {
      this.usuarios = null;

      api.get("/usuario/get").then((response) => {
        this.usuarios = response.data.data;
      });
    },
    deleteUser(id, usuario) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o usuário '${usuario}'?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/usuario/delete/${id}`)
            .then((response) => {
              this.$swal({
                icon: "success",
                title: "Excluído!",
                text: response.data.data,
              });

              this.getUsers();
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
    viewUser(id) {
      const usuario = this.usuarios.filter((usuario) => {
        return usuario.id == id;
      });

      this.usuarioSelecionado = usuario[0];
    },
    closeModal(e) {
      if (e.target === e.currentTarget) {
        this.edit = false;
        this.usuarioSelecionado = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.full {
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
