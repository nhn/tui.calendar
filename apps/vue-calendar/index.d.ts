import type Vue from 'vue';
import type Calendar from '@toast-ui/calendar';

declare module '@toast-ui/calendar' {
  export default class VueCalendar extends Vue {
    getRootElement(): HTMLDivElement;
    getInstance(): Calendar; 
  }
}

declare module '@toast-ui/calendar/ie11' {
  export default class VueCalendar extends Vue {
    getRootElement(): HTMLDivElement;
    getInstance(): Calendar; 
  }
}

declare module '@toast-ui/calendar/esm' {
  export default class VueCalendar extends Vue {
    getRootElement(): HTMLDivElement;
    getInstance(): Calendar; 
  }
}