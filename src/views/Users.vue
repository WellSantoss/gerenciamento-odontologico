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
            <th>Cargo</th>
            <th>Usuário</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="icon">
              <img
                @click="viewUser(user.id)"
                src="@/assets/search.svg"
                alt="Visualizar"
              />
            </td>
            <td class="icon">
              <img
                @click="editUser(user.id)"
                src="@/assets/edit.svg"
                alt="Editar"
              />
            </td>
            <td class="icon">
              <img
                @click="deleteUser(user.id)"
                src="@/assets/trash.svg"
                alt="Excluir"
              />
            </td>
            <td>{{ user.active ? "Sim" : "Não" }}</td>
            <td class="profile">
              <img :src="require(`@/assets/${user.image}`)" alt="Editar" />
              <p>{{ user.name }}</p>
            </td>
            <td>{{ user.position }}</td>
            <td>{{ user.user }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition>
      <div class="modal" @click="closeModal" v-if="modalView">
        <div>
          <div class="title">
            <h2>{{ currentUser.name }}</h2>
          </div>
          <form action="/usuarios">
            <span class="label">Ativo?</span>
            <input
              type="radio"
              value="1"
              :disabled="!edit"
              v-model="currentUser.active"
              name="ativo"
              id="sim"
            />
            <label class="radio" for="sim">Sim</label>
            <input
              type="radio"
              value="0"
              :disabled="!edit"
              v-model="currentUser.active"
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
              :value="currentUser.name"
              :v-model="currentUser.name"
            />
            <label for="user">Usuário</label>
            <input
              type="text"
              name="user"
              id="user"
              :disabled="!edit"
              :value="currentUser.user"
              :v-model="currentUser.user"
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

export default {
  name: "Users",
  components: {
    Search,
  },
  data() {
    return {
      modalView: false,
      edit: false,
      currentUser: {
        id: 1,
        name: "Mariana Ribeiro",
        image: "profile.jpg",
        active: 1,
        position: "Administrador",
        user: "mariana_ribeiro@dentalweb.com",
      },
      users: [
        {
          id: 1,
          name: "Mariana Ribeiro",
          image: "profile.jpg",
          active: true,
          position: "Administrador",
          user: "mariana_ribeiro@dentalweb.com",
        },
        {
          id: 2,
          name: "Mariana Ribeiro",
          image: "profile.jpg",
          active: true,
          position: "Administrador",
          user: "mariana_ribeiro@dentalweb.com",
        },
        {
          id: 3,
          name: "Mariana Ribeiro",
          image: "profile.jpg",
          active: true,
          position: "Administrador",
          user: "mariana_ribeiro@dentalweb.com",
        },
      ],
    };
  },
  methods: {
    deleteUser(user) {
      this.$swal({
        icon: "warning",
        title: "Atenção!",
        text: `Excluir o usuário "${user}"?`,
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
