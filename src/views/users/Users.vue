<template>
  <div class="content">
    <Search />
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Ativo?</th>
            <th>Nome</th>
            <th>Cargo</th>
            <th>Usuário</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.active ? "Sim" : "Não" }}</td>
            <td class="profile">
              <img :src="require(`@/assets/${user.image}`)" alt="Editar" />
              <p>{{ user.name }}</p>
            </td>
            <td>{{ user.position }}</td>
            <td>{{ user.user }}</td>
            <td class="icon">
              <img
                @click="modalEdit = !modalEdit"
                src="../../assets/edit.svg"
                alt="Editar"
              />
            </td>
            <td class="icon">
              <img
                @click="deleteUser(user.name)"
                src="../../assets/trash.svg"
                alt="Excluir"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition>
      <div class="modal" @click="closeModal" v-if="modalEdit">
        <div>
          <div class="title">
            <h2>{{ currentUser.name }}</h2>
          </div>
          <form action="/usuarios">
            <span class="label">Ativo?</span>
            <input
              type="radio"
              value="1"
              v-model="currentUser.active"
              name="ativo"
              id="sim"
            />
            <label class="radio" for="sim">Sim</label>
            <input
              type="radio"
              value="0"
              v-model="currentUser.active"
              name="ativo"
              id="nao"
            />
            <label class="radio" for="nao">Não</label>
            <span class="label">Foto</span>
            <img
              style="margin-bottom: 16px"
              src="../../assets/profile.jpg"
              alt=""
            />
            <label for="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              :value="currentUser.name"
              :v-model="currentUser.name"
            />
            <label for="user">Usuário</label>
            <input
              type="text"
              name="user"
              id="user"
              :value="currentUser.user"
              :v-model="currentUser.user"
            />
            <div class="buttons">
              <button @click.prevent="saveUser">Salvar</button>
              <button @click.prevent="modalEdit = !modalEdit" class="close">
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
      modalEdit: false,
      currentUser: {
        name: "Mariana Ribeiro",
        image: "profile.jpg",
        active: 1,
        position: "Administrador",
        user: "mariana_ribeiro@dentalweb.com",
      },
      users: [
        {
          name: "Mariana Ribeiro",
          image: "profile.jpg",
          active: true,
          position: "Administrador",
          user: "mariana_ribeiro@dentalweb.com",
        },
        {
          name: "Mariana Ribeiro",
          image: "profile.jpg",
          active: true,
          position: "Administrador",
          user: "mariana_ribeiro@dentalweb.com",
        },
        {
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
    saveUser() {
      this.modalEdit = !this.modalEdit;

      this.$swal({
        icon: "success",
        title: "Alterado!",
        text: "Usuário alterado com sucesso!",
      });
    },
    closeModal(e) {
      if (e.target === e.currentTarget) {
        this.modalEdit = !this.modalEdit;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
