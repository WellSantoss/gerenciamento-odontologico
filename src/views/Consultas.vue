<template>
  <div class="content">
    <Search @cadastrar="modalCadastrar = !modalCadastrar" />
    <transition>
      <div v-if="consultas" class="cards">
        <div
          v-for="(consulta, index) in consultas"
          @click="viewUser(index)"
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
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <AgendarConsulta
        v-if="modalCadastrar"
        @close-modal="closeModalCadastrar"
      />
    </transition>
    <transition>
      <div class="modal" @click="closeModal" v-if="modalView">
        <div>
          <div class="title">
            <h2>{{ consultaSelecionada.status }}</h2>
            <p>{{ consultaSelecionada.paciente }}</p>
          </div>
          <form action="/usuarios">
            <div>
              <label for="nome">Dentista</label>
              <input
                :disabled="!edit"
                type="text"
                name="nome"
                id="nome"
                :value="consultaSelecionada.dentista"
                :v-model="consultaSelecionada.dentista"
              />
            </div>
            <div>
              <label for="nome">Paciente</label>
              <input
                :disabled="!edit"
                type="text"
                name="nome"
                id="nome"
                :value="consultaSelecionada.paciente"
                :v-model="consultaSelecionada.paciente"
              />
            </div>
            <div>
              <label for="nome">Data</label>
              <input
                :disabled="!edit"
                type="text"
                name="nome"
                id="nome"
                :value="consultaSelecionada.data"
                :v-model="consultaSelecionada.data"
              />
            </div>
            <div>
              <label for="nome">Hora</label>
              <input
                :disabled="!edit"
                type="text"
                name="nome"
                id="nome"
                :value="consultaSelecionada.hora"
                :v-model="consultaSelecionada.hora"
              />
            </div>
            <div>
              <label for="nome">Valor</label>
              <input
                :disabled="!edit"
                type="text"
                name="nome"
                id="nome"
                :value="consultaSelecionada.valor"
                :v-model="consultaSelecionada.valor"
              />
            </div>
            <div>
              <label for="nome">Pago?</label>
              <select v-model="consultaSelecionada.pago" name="pago" id="pago">
                <option value="false">Não</option>
                <option value="true">Sim</option>
              </select>
            </div>
            <div>
              <label for="nome">Status</label>
              <input
                :disabled="!edit"
                type="text"
                name="nome"
                id="nome"
                :value="consultaSelecionada.status"
                :v-model="consultaSelecionada.status"
              />
            </div>
            <div class="title full">
              <h2>Procedimentos</h2>
            </div>
            <div class="full">
              <div
                v-for="procedimento in consultaSelecionada.procedimentos"
                :key="procedimento.id"
                class="procedimento"
              >
                <h3 class="full">{{ procedimento.procedimento }}</h3>
                <div>
                  <label for="nome">Finalizado?</label>
                  <select
                    v-model="procedimento.finalizado"
                    name="pago"
                    id="pago"
                  >
                    <option value="false">Não</option>
                    <option value="true">Sim</option>
                  </select>
                </div>
                <div>
                  <label for="nome">Dente</label>
                  <input
                    :disabled="!edit"
                    type="text"
                    name="nome"
                    id="nome"
                    :value="procedimento.dente"
                    :v-model="procedimento.dente"
                  />
                </div>
                <div class="full">
                  <label for="nome">Observações</label>
                  <textarea
                    name="observacoes"
                    id="observacoes"
                    :value="procedimento.observacoes"
                    :v-model="procedimento.observacoes"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="buttons full">
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
import AgendarConsulta from "@/components/consultas/Agendar.vue";

export default {
  name: "Consultas",
  components: {
    Search,
    AgendarConsulta,
  },
  data() {
    return {
      erro: null,
      modalCadastrar: false,
      modalView: false,
      edit: false,
      consultaSelecionada: null,
      consultas: [
        {
          id: 1,
          status: "Confirmado",
          data: "10/05/2022",
          hora: "14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
          valor: 90.8,
          pago: true,
          procedimentos: [
            {
              finalizado: true,
              procedimento: "Restauração",
              dente: "Incisivo Central Decíduo Superior Direito",
              observacoes: "teste",
            },
            {
              finalizado: true,
              procedimento: "Manutenção",
              dente: "-",
              observacoes: "",
            },
          ],
        },
        {
          id: 2,
          status: "Confirmado",
          data: "11/05/2022",
          hora: "14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
          valor: 90.8,
          pago: true,
          procedimentos: [
            {
              finalizado: true,
              procedimento: "Restauração",
              dente: "Incisivo Central Decíduo Superior Direito",
              observacoes: "",
            },
          ],
        },
        {
          id: 3,
          status: "Confirmado",
          data: "12/05/2022",
          hora: "14:00",
          dentista: "Mariana Ribeiro",
          paciente: "José Carlos",
          valor: 90.8,
          pago: true,
          procedimentos: [
            {
              finalizado: true,
              procedimento: "Restauração",
              dente: "Incisivo Central Decíduo Superior Direito",
              observacoes: "",
            },
          ],
        },
      ],
    };
  },
  methods: {
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
    },
    viewUser(index) {
      this.consultaSelecionada = this.consultas[index];

      this.modalView = !this.modalView;
      this.edit = false;
    },
    closeModal(e) {
      this.consultaSelecionada = null;

      if (e.target === e.currentTarget) {
        this.modalView = !this.modalView;
      }
    },
  },
};
</script>
