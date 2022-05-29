<template>
  <div class="content">
    <Search class="searchComponent" />
    <transition>
      <FullCalendar :options="calendarOptions" />
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
            date: "2022-05-29 10:00:00",
            backgroundColor: "#a55eea",
            description: "Lecture",
          },
          {
            title: "Manutenção",
            date: "2022-05-29 12:00:00",
            backgroundColor: "#fed330",
            description: "Lecture",
          },
          {
            title: "Canal",
            date: "2022-05-29 14:00:00",
            backgroundColor: "#fc5c65",
            description: "Lecture",
          },
        ],
      },
    };
  },
  methods: {
    handleDateClick(date) {
      console.log(date);
    },
    handleEventClick(event) {
      console.log(event);
    },
  },
};
</script>

<style>
.searchComponent {
  margin-bottom: 32px !important;
}
</style>
