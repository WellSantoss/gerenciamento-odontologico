<template>
  <div class="content">
    <Search />
    <div class="cards">
      <div v-for="consulta in consultas" :key="consulta.id" class="card">
        <h3>{{ consulta.data }} - {{ consulta.status }}</h3>
        <span class="label">Dentista</span>
        <p>{{ consulta.dentista }}</p>
        <span class="label">Paciente</span>
        <p>{{ consulta.paciente }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "@/components/Search.vue";

export default {
  name: "Consultas",
  components: {
    Search,
  },
  data() {
    return {
      consultas: [
        {
          id: 1,
          status: "Confirmado",
          data: "10/12/2021 14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
        },
        {
          id: 2,
          status: "Confirmado",
          data: "10/12/2021 14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
        },
        {
          id: 3,
          status: "Confirmado",
          data: "10/12/2021 14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
        },
        {
          id: 4,
          status: "Confirmado",
          data: "10/12/2021 14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
        },
        {
          id: 5,
          status: "Confirmado",
          data: "10/12/2021 14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
        },
        {
          id: 6,
          status: "Confirmado",
          data: "10/12/2021 14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
        },
        {
          id: 7,
          status: "Confirmado",
          data: "10/12/2021 14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
        },
        {
          id: 8,
          status: "Confirmado",
          data: "10/12/2021 14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
        },
      ],
    };
  },
};
</script>

<style></style>
