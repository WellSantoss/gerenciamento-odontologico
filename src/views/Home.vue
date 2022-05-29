<template>
  <div class="content">
    <SearchDentista
      style="margin-bottom: 32px"
      @busca="handle"
      @cadastrar="modalCadastrar = !modalCadastrar"
    />
    <transition>
      <FullCalendar v-if="consultas" :options="calendarOptions" />
      <p v-else-if="erro">{{ erro }}</p>
      <Loading v-else />
    </transition>
    <transition>
      <AgendarConsulta
        v-if="modalCadastrar"
        @close-modal="closeModalCadastrar"
      />
      <EditarConsulta
        v-if="consultaSelecionada"
        :consultaSelecionada="consultaSelecionada"
        @close-modal="closeModalEditar"
      />
    </transition>
  </div>
</template>

<script>
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptbrLocale from "@fullcalendar/core/locales/pt-br";
import Loading from "@/components/Loading.vue";
import SearchDentista from "@/components/SearchDentista.vue";
import AgendarConsulta from "@/components/consultas/Agendar.vue";
import EditarConsulta from "@/components/consultas/Editar.vue";
import api from "@/api.js";

export default {
  name: "Home",
  components: {
    FullCalendar,
    Loading,
    AgendarConsulta,
    SearchDentista,
    EditarConsulta,
  },
  data() {
    return {
      consultas: null,
      dentistas: null,
      dentista: "",
      erro: null,
      modalCadastrar: false,
      consultaSelecionada: null,
      calendarOptions: {
        locale: ptbrLocale,
        plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        headerToolbar: { center: "dayGridMonth,timeGridWeek,timeGridDay" },
        eventClick: this.editarConsulta,
        events: [],
      },
    };
  },
  created() {
    this.getConsultas();
  },
  methods: {
    handle(e) {
      this.dentista = e;
      this.getConsultas();
    },
    getConsultas() {
      let url = `/consulta/getall`;
      this.consultas = null;

      if (this.dentista) {
        url = `/consulta/getdentista/${this.dentista}`;
      }

      api
        .get(url)
        .then((response) => {
          this.consultas = response.data.data;
          this.setEvents();
        })
        .catch((response) => {
          this.erro = response.response.data.data;
        });
    },
    setEvents() {
      if (this.consultas) {
        this.calendarOptions.events = [];

        this.consultas.forEach((consulta) => {
          const event = {
            id: consulta.id,
            title: consulta.paciente,
            date: consulta.data,
            backgroundColor: consulta.cor,
          };

          this.calendarOptions.events.push(event);
        });
      }
    },
    closeModalCadastrar() {
      this.modalCadastrar = !this.modalCadastrar;
      this.getConsultas();
    },
    closeModalEditar() {
      this.consultaSelecionada = null;
      this.getConsultas();
    },
    editarConsulta(event) {
      const id = event.event.id;
      const consulta = this.consultas.filter((consulta) => {
        return consulta.id == id;
      });

      this.consultaSelecionada = consulta[0];
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
