/* eslint-disable no-undefined */
import Calendar from '@toast-ui/calendar';
import Vue from 'vue';

export default Vue.component('ToastUICalendar', {
  name: 'ToastUICalendar',
  props: {
    view: String,
    useFormPopup: {
      type: Boolean,
      default: () => undefined,
    },
    useDetailPopup: {
      type: Boolean,
      default: () => undefined,
    },
    isReadOnly: {
      type: Boolean,
      default: () => undefined,
    },
    usageStatistics: {
      type: Boolean,
      default: () => undefined,
    },
    eventFilter: Function,
    week: Object,
    month: Object,
    gridSelection: {
      type: [Object, Boolean],
      default: () => undefined,
    },
    timezone: Object,
    theme: Object,
    template: Object,
    calendars: Array,
    events: Array,
  },
  data() {
    return {
      calendarInstance: null,
    };
  },
  watch: {
    view(value) {
      this.calendarInstance.changeView(value);
    },
    useFormPopup(value) {
      this.calendarInstance.setOptions({ useFormPopup: value });
    },
    useDetailPopup(value) {
      this.calendarInstance.setOptions({ useDetailPopup: value });
    },
    isReadOnly(value) {
      this.calendarInstance.setOptions({ isReadOnly: value });
    },
    eventFilter(value) {
      this.calendarInstance.setOptions({ eventFilter: value });
    },
    week(value) {
      this.calendarInstance.setOptions({ week: value });
    },
    month(value) {
      this.calendarInstance.setOptions({ month: value });
    },
    gridSelection(value) {
      this.calendarInstance.setOptions({ gridSelection: value });
    },
    timezone(value) {
      this.calendarInstance.setOptions({ timezone: value });
    },
    theme(value) {
      this.calendarInstance.setTheme(value);
    },
    template(value) {
      this.calendarInstance.setOptions({ template: value });
    },
    calendars(value) {
      this.calendarInstance.setCalendars(value);
    },
    events(value) {
      this.calendarInstance.clear();
      this.calendarInstance.createEvents(value);
    },
  },
  mounted() {
    this.calendarInstance = new Calendar(this.$refs.container, {
      defaultView: this.view,
      useFormPopup: this.useFormPopup,
      useDetailPopup: this.useDetailPopup,
      isReadOnly: this.isReadOnly,
      usageStatistics: this.usageStatistics,
      eventFilter: this.eventFilter,
      week: this.week,
      month: this.month,
      gridSelection: this.gridSelection,
      timezone: this.timezone,
      theme: this.theme,
      template: this.template,
      calendars: this.calendars,
    });
    this.addEventListeners();
    this.calendarInstance.createEvents(this.events);
  },
  beforeDestroy() {
    this.calendarInstance.off();
    this.calendarInstance.destroy();
  },
  methods: {
    addEventListeners() {
      Object.keys(this.$listeners).forEach((eventName) => {
        this.calendarInstance.on(eventName, (...args) => this.$emit(eventName, ...args));
      });
    },
    getRootElement() {
      return this.$refs.container;
    },
    getInstance() {
      return this.calendarInstance;
    },
  },
  template: '<div ref="container" class="toastui-vue-calendar" />',
});
