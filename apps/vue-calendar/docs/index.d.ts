import Vue from 'vue';
import TuiCalendar from 'tui-calendar';

type FunctionKeys<T extends object> = {[K in keyof T]: T[K] extends Function ? K : never}[keyof T];

type CalendarFnKeys = FunctionKeys<TuiCalendar>;

export class Calendar extends Vue {
  public invoke<T extends CalendarFnKeys>(fname: T, ...args: Parameters<TuiCalendar[T]>): ReturnType<TuiCalendar[T]>;
  public getRootElement(): HTMLElement;
}
