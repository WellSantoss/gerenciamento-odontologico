<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <transition mode="out-in">
      <div v-if="usuarios" class="table">
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
                  @click="viewUser(usuario.id)"
                  src="@/assets/edit.svg"
                  alt="Editar"
                />
              </td>
              <td class="icon">
                <img
                  v-if="idUsuarioLogado != usuario.id"
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
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <CadastrarUsuario
        v-if="modalCadastrar"
        @close-modal-cadastrar="closeModalCadastrar"
      />
      <EditarUsuario
        :usuario="usuarioSelecionado"
        v-if="usuarioSelecionado"
        @close-modal-editar="closeModalEditar"
      />
    </transition>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import CadastrarUsuario from "@/components/usuarios/Cadastrar.vue";
import EditarUsuario from "@/components/usuarios/Editar.vue";
import api from "@/api.js";

export default {
  name: "Usuarios",
  components: {
    Search,
    Loading,
    CadastrarUsuario,
    EditarUsuario,
  },
  data() {
    return {
      edit: false,
      erro: null,
      modalCadastrar: false,
      usuarioSelecionado: null,
      usuarios: null,
    };
  },
  created() {
    this.getUsers();
  },
  computed: {
    idUsuarioLogado() {
      return this.$store.state.usuario.id;
    },
    query() {
      return this.$route.query.q ? `/${this.$route.query.q}` : "";
    },
  },
  watch: {
    query() {
      this.getUsers();
    },
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getUsers();
    },
    closeModalEditar() {
      this.usuarioSelecionado = null;
      this.getUsers();
    },
    getUsers() {
      this.usuarios = null;

      api
        .get(`/usuario/get${this.query}`)
        .then((response) => {
          this.usuarios = response.data.data;
        })
        .catch((response) => {
          this.erro = response.response.data.data;
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
  },
};
</script>
