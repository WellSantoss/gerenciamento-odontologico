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
            date: "2022-03-09 10:00:00",
            backgroundColor: "#a55eea",
          },
          {
            title: "Manutenção",
            date: "2022-03-09 12:00:00",
            backgroundColor: "#fed330",
          },
          {
            title: "Canal",
            date: "2022-03-09 14:00:00",
            backgroundColor: "#fc5c65",
          },
        ],
        eventClick: function (info) {
          info.jsEvent.preventDefault(); // don't let the browser navigate

          alert(info.event.title);

          if (info.event.url) {
            window.open(info.event.url);
          }
        },
      },
    };
  },
  methods: {
    handleDateClick(arg) {
      alert("date click! " + arg.dateStr);
      console.log(arg);
    },
  },
};
</script>

<style>
.searchComponent {
  margin-bottom: 32px !important;
}
</style>
