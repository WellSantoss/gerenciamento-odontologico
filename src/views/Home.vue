<template>
  <div class="content">
    <Search class="searchComponent" />
    <FullCalendar :options="calendarOptions" />
    <transition>
      <div class="modal" @click="closeModal" v-if="modalEvent">
        <div>
          <div class="title">
            <h2>{{ currentEvent.procedimento }}</h2>
            <p>Paciente: {{ currentEvent.paciente }}</p>
            <p></p>
          </div>
          <form action="/usuarios">
            <label for="user">Paciente</label>
            <input
              type="text"
              name="user"
              id="user"
              :value="currentEvent.paciente"
              :v-model="currentEvent.paciente"
            />
            <div class="duo">
              <div>
                <label for="nome">Dentista</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  :value="currentEvent.dentista"
                  :v-model="currentEvent.dentista"
                />
              </div>
              <div>
                <label for="nome">Procedimento</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  :value="currentEvent.procedimento"
                  :v-model="currentEvent.procedimento"
                />
              </div>
            </div>
            <div class="duo">
              <div>
                <label for="nome">Data</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  :value="currentEvent.data"
                  :v-model="currentEvent.data"
                />
              </div>
              <div>
                <label for="user">Status</label>
                <input
                  type="text"
                  name="user"
                  id="user"
                  :value="currentEvent.status"
                  :v-model="currentEvent.status"
                />
              </div>
            </div>
            <div class="duo">
              <div>
                <label for="nome">Valor</label>
                <input
                  type="text"
                  name="nome"
                  id="nome"
                  :value="currentEvent.valor"
                  :v-model="currentEvent.valor"
                />
              </div>
              <div>
                <label for="pago">Pago?</label>
                <select v-model="currentEvent.pago" name="pago" id="pago">
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </select>
              </div>
            </div>

            <div class="buttons">
              <button @click.prevent="saveUser">Salvar</button>
              <button @click.prevent="modalEvent = !modalEvent" class="close">
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
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptbrLocale from "@fullcalendar/core/locales/pt-br";

export default {
  name: "Home",
  components: {
    Search,
    FullCalendar,
  },
  data() {
    return {
      modalEvent: false,
      currentEvent: {
        data: "24/01/2022",
        status: "Administrador",
        pago: true,
        valor: "R$ 50,00",
        dentista: "Mariana Ribeiro",
        procedimento: "Restauração",
        paciente: "José Carlos",
        cpfPaciente: "123.456.789-00",
      },
      calendarOptions: {
        locale: ptbrLocale,
        plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        headerToolbar: { center: "dayGridMonth,timeGridWeek,timeGridDay" },
        dateClick: this.handleDateClick,
        eventClick: this.handleEventClick,
        events: [
          {
            title: "Restauração",
            date: "2022-04-19 10:00:00",
            backgroundColor: "#a55eea",
          },
          {
            title: "Manutenção",
            date: "2022-04-19 12:00:00",
            backgroundColor: "#fed330",
          },
          {
            title: "Canal",
            date: "2022-04-19 14:00:00",
            backgroundColor: "#fc5c65",
          },
        ],
      },
    };
  },
  methods: {
    handleDateClick(date) {
      console.log(date);
      this.modalEvent = !this.modalEvent;
    },
    handleEventClick(event) {
      console.log(event);
      this.modalEvent = !this.modalEvent;
    },
    closeModal(e) {
      if (e.target === e.currentTarget) {
        this.modalEvent = !this.modalEvent;
      }
    },
  },
};
</script>

<style>
.searchComponent {
  margin-bottom: 32px !important;
}
</style>
