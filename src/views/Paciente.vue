<template>
  <div class="content">
    <div class="card">
      <div class="title">
        <h2>{{ paciente.nome }}</h2>
        <img src="@/assets/edit.svg" alt="editar" />
      </div>
      <div class="items">
        <div>
          <span class="label">CPF</span>
          <p>{{ paciente.infosPessoais.cpf }}</p>
        </div>
        <div>
          <span class="label">Data de Nascimento</span>
          <p>{{ paciente.infosPessoais.dataNascimento }}</p>
        </div>
        <div>
          <span class="label">Telefone</span>
          <p>{{ paciente.infosPessoais.telefone }}</p>
        </div>
        <div>
          <span class="label">E-mail</span>
          <p>{{ paciente.infosPessoais.email }}</p>
        </div>
        <div>
          <span class="label">CEP</span>
          <p>{{ paciente.infosPessoais.cep }}</p>
        </div>
        <div>
          <span class="label">Cidade</span>
          <p>{{ paciente.infosPessoais.cidade }}</p>
        </div>
        <div>
          <span class="label">Bairro</span>
          <p>{{ paciente.infosPessoais.bairro }}</p>
        </div>
        <div>
          <span class="label">Rua</span>
          <p>{{ paciente.infosPessoais.rua }}</p>
        </div>
        <div>
          <span class="label">Número</span>
          <p>{{ paciente.infosPessoais.numero }}</p>
        </div>
        <div>
          <span class="label">Convênio</span>
          <p>{{ paciente.infosPessoais.convenio }}</p>
        </div>
      </div>
    </div>
    <div class="card consultas">
      <div class="title">
        <h2>Últimas Consultas</h2>
        <img src="@/assets/arrow-right.svg" alt="editar" />
      </div>
      <div class="cards">
        <div
          v-for="consulta in paciente.ultimasConsultas"
          :key="consulta.id"
          class="card"
        >
          <h3>
            {{ consulta.data }} {{ consulta.hora }} - {{ consulta.status }}
          </h3>
          <span class="label">Dentista</span>
          <p>{{ consulta.dentista }}</p>
          <span class="label">Paciente</span>
          <p>{{ consulta.paciente }}</p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="title">
        <h2>Procedimentos a Realizar</h2>
        <img src="@/assets/arrow-right.svg" alt="editar" />
      </div>
      <div class="cards">
        <div
          v-for="(procedimento, index) in paciente.proximosProcedimentos"
          :key="index"
          class="card"
        >
          <span class="label">Procedimento</span>
          <p>{{ procedimento.procedimento }}</p>
          <span class="label">Dente</span>
          <p>{{ procedimento.dente }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Paciente",
  props: ["id"],
  data() {
    return {
      paciente: {
        nome: "José Carlos",
        infosPessoais: {
          cpf: "123.456.789-00",
          dataNascimento: "11/11/1995",
          telefone: "(18) 99999-9999",
          email: "jose@gmail.com",
          cep: "12345-678",
          cidade: "Birigui",
          bairro: "Bairro Alto",
          rua: "Rua Azul",
          numero: "12345",
          convenio: "Padrão",
        },
        observacoesClinicas: {
          queixaAtual: "Dor de Dente",
          medicacoes: "-",
          alergias: "-",
          doencas: "-",
          cirurgias: "-",
          tipoSangramento: "Normal",
          tipoSicatrizacao: "Normal",
          faltaAr: "Não Possui",
          gestante: "Não",
          observações: "-",
        },
        proximosProcedimentos: [
          {
            procedimento: "Restauração",
            dente: "Incisivo Central Decíduo Superior Direito",
          },
          {
            procedimento: "Restauração",
            dente: "Incisivo Central Decíduo Inferior Direito",
          },
          {
            procedimento: "Restauração",
            dente: "Incisivo Central Decíduo Superior Esquerdo",
          },
        ],
        ultimasConsultas: [
          {
            id: 2,
            status: "Confirmado",
            data: "11/05/2022",
            hora: "14:00",
            dentista: "Mariana Ribeiro",
            paciente: "José Carlos",
          },
          {
            id: 3,
            status: "Confirmado",
            data: "12/05/2022",
            hora: "14:00",
            dentista: "Mariana Ribeiro",
            paciente: "José Carlos",
          },
          {
            id: 4,
            status: "Confirmado",
            data: "13/05/2022",
            hora: "14:00",
            dentista: "Mariana Ribeiro",
            paciente: "José Carlos",
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding-bottom: 16px;
  cursor: default;

  .card {
    padding-bottom: 0px;
  }
}

.cards {
  padding-top: 0;
}

.consultas {
  margin: 32px 0px;
}
</style>
