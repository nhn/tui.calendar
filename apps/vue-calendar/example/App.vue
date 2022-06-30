<template>
  <div>
    <h1>🍞📅 TOAST UI Calendar + Vue</h1>
    <ToastUICalendar
      ref="calendar"
      style="height: 800px"
      :view="'month'"
      :use-detail-popup="true"
      :month="month"
      :theme="theme"
      :template="{
        popupDetailTitle: getTemplateForPopupDetailTitle,
      }"
      :grid-selection="true"
      :calendars="calendars"
      :events="events"
      @selectDateTime="onSelectDateTime"
    />
  </div>
</template>

<script>
import ToastUICalendar from '../src/Calendar';
import '@toast-ui/calendar/toastui-calendar.css';

const YEAR = 2022;
const MONTH = 5;
const DATE = 15;

export default {
  components: {
    ToastUICalendar,
  },
  data() {
    return {
      month: {
        dayNames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        visibleWeeksCount: 3,
        narrowWeekend: true,
        startDayOfWeek: 1,
      },
      theme: {
        month: {
          dayName: {
            backgroundColor: 'yellow',
          },
          weekend: {
            backgroundColor: 'gray',
          },
        },
      },
      calendars: [{ id: 'cal1', name: 'Personal' }],
      events: [
        {
          id: '1',
          calendarId: 'cal1',
          title: 'Lunch',
          category: 'time',
          start: new Date(YEAR, MONTH, DATE, 12, 0),
          end: new Date(YEAR, MONTH, DATE, 13, 30),
        },
        {
          id: '2',
          calendarId: 'cal1',
          title: 'Coffee Break',
          category: 'time',
          start: new Date(YEAR, MONTH, DATE, 15, 0),
          end: new Date(YEAR, MONTH, DATE, 15, 30),
        },
      ],
    };
  },
  mounted() {
    const calendarInstance = this.$refs.calendar.getInstance();

    calendarInstance.setDate(new Date(YEAR, MONTH, DATE));
  },
  methods: {
    getTemplateForPopupDetailTitle({ title }) {
      return `Event: ${title}`;
    },
    onSelectDateTime({ start, end }) {
      return alert(`Select ${start} ~ ${end}`);
    },
  },
};
</script>
