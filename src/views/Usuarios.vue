<template>
  <div class="content">
    <Search />
    <div class="table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th>Ativo?</th>
            <th>Nome</th>
            <!-- <th>Cargo</th> -->
            <th>Usuário</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usuario in usuarios" :key="usuario.id">
            <td class="icon">
              <img
                @click="viewUser(usuario.id)"
                src="@/assets/search.svg"
                alt="Visualizar"
              />
            </td>
            <td class="icon">
              <img
                @click="editUser(usuario.id)"
                src="@/assets/edit.svg"
                alt="Editar"
              />
            </td>
            <td class="icon">
              <img
                @click="deleteUser(usuario.id)"
                src="@/assets/trash.svg"
                alt="Excluir"
              />
            </td>
            <td>{{ usuario.ativo ? "Sim" : "Não" }}</td>
            <td class="profile">
              <img
                :src="`http://localhost/gerenciamento-odontologico-api/upload/${usuario.foto}`"
                alt="Editar"
              />
              <p>{{ usuario.nome }}</p>
            </td>
            <!-- <td>{{ usuario.position }}</td> -->
            <td>{{ usuario.usuario }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition>
      <div class="modal" @click="closeModal" v-if="modalView">
        <div>
          <div class="title">
            <h2>{{ currentUser.nome }}</h2>
          </div>
          <form action="/usuarios">
            <span class="label">Ativo?</span>
            <input
              type="radio"
              value="1"
              :disabled="!edit"
              v-model="currentUser.ativo"
              name="ativo"
              id="sim"
            />
            <label class="radio" for="sim">Sim</label>
            <input
              type="radio"
              value="0"
              :disabled="!edit"
              v-model="currentUser.ativo"
              name="ativo"
              id="nao"
            />
            <label class="radio" for="nao">Não</label>
            <span class="label">Foto</span>
            <img
              style="margin-bottom: 16px"
              src="@/assets/profile.jpg"
              alt=""
            />
            <label for="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              :disabled="!edit"
              :value="currentUser.nome"
              :v-model="currentUser.nome"
            />
            <label for="usuario">Usuário</label>
            <input
              type="text"
              name="usuario"
              id="usuario"
              :disabled="!edit"
              :value="currentUser.usuario"
              :v-model="currentUser.usuario"
            />
            <div class="buttons">
              <button v-if="edit" @click.prevent="saveUser">Salvar</button>
              <button v-else @click.prevent="edit = true">Editar</button>
              <button @click.prevent="modalView = !modalView" class="close">
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
import api from "@/api.js";

export default {
  name: "Usuarios",
  components: {
    Search,
  },
  data() {
    return {
      modalView: false,
      edit: false,
      currentUser: {
        id: 1,
        nome: "Mariana Ribeiro",
        foto: "profile.jpg",
        ativo: 1,
        position: "Administrador",
        usuario: "mariana_ribeiro@dentalweb.com",
      },
      usuarios: null,
    };
  },
  created() {
    api.get("/usuario/get").then((response) => {
      this.usuarios = response.data.data;
    });
  },
  methods: {
    deleteUser(usuario) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o usuário "${usuario}"?`,
        footer: "*Está ação não poderá ser desfeita.",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Excluir",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            icon: "success",
            title: "Excluído!",
            text: "Usuário excluído com sucesso!",
          });
        }
      });
    },
    viewUser() {
      this.modalView = !this.modalView;
      this.edit = false;
    },
    editUser() {
      this.modalView = !this.modalView;
      this.edit = true;
    },
    saveUser() {
      this.modalView = !this.modalView;

      this.$swal({
        icon: "success",
        title: "Alterado!",
        text: "Usuário alterado com sucesso!",
      });
    },
    closeModal(e) {
      if (e.target === e.currentTarget) {
        this.modalView = !this.modalView;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
