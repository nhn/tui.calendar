import type Calendar from '../src/factory/calendar';

declare global {
  interface Window {
    $cal: Calendar;
  }
}
