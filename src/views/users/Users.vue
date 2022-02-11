<template>
  <div class="content">
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ativo</th>
            <th>Cargo</th>
            <th>Usuário</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td class="profile">
              <img :src="require(`@/assets/${user.image}`)" alt="Editar" />
              {{ user.name }}
            </td>
            <td>{{ user.active ? "Sim" : "Não" }}</td>
            <td>{{ user.position }}</td>
            <td>{{ user.user }}</td>
            <td class="icon">
              <img src="../../assets/edit.svg" alt="Editar" />
            </td>
            <td class="icon">
              <img src="../../assets/trash.svg" alt="Excluir" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
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
