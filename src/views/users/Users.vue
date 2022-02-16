<template>
  <div class="content">
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
                @click="modalDelete = !modalDelete"
                src="../../assets/trash.svg"
                alt="Excluir"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition>
      <div class="modal" v-if="modalEdit">
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
              <button @click.prevent="modalEdit = !modalEdit" class="close">
                Cancelar
              </button>
              <button>Salvar</button>
            </div>
          </form>
        </div>
      </div>
      <div class="modal alert" @click="cliqueModal" v-if="modalDelete">
        <div>
          <div class="title">
            <h2>{{ currentUser.name }}</h2>
          </div>

          <p>
            Excluir o usuário selecionado? Está ação não poderá ser desfeita.
          </p>

          <div class="buttons">
            <button @click.prevent="modalDelete = !modalDelete">
              Cancelar
            </button>
            <button class="close">Excluir</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      modalEdit: false,
      modalDelete: false,
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
};
</script>

<style lang="scss" scoped></style>
