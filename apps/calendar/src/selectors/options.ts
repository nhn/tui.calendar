import type { CalendarState } from '@t/store';

export const showTimezoneCollapseButtonOptionSelector = (state: CalendarState) =>
  state.options.week.showTimezoneCollapseButton ?? false;

export const timezonesCollapsedOptionSelector = (state: CalendarState) =>
  state.options.week.timezonesCollapsed ?? false;
