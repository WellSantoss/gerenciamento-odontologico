<template>
  <div class="content">
    <Search class="searchComponent" />
    <FullCalendar :options="calendarOptions" />
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
      calendarOptions: {
        locale: ptbrLocale,
        plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",
        headerToolbar: { center: "dayGridMonth,timeGridWeek,timeGridDay" },
        dateClick: this.handleDateClick,
        events: [
          {
            title: "Restauração",
            date: "2022-04-09 10:00:00",
            backgroundColor: "#a55eea",
          },
          {
            title: "Manutenção",
            date: "2022-04-09 12:00:00",
            backgroundColor: "#fed330",
          },
          {
            title: "Canal",
            date: "2022-04-09 14:00:00",
            backgroundColor: "#fc5c65",
          },
        ],
      },
    };
  },
  methods: {
    handleDateClick(date) {
      alert("date click! " + date.dateStr);
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
