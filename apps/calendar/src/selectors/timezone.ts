import type { CalendarState } from '@t/store';

export const primaryTimezoneSelector = (state: CalendarState) =>
  state.options?.timezone?.zones?.[0]?.timezoneName ?? 'Local';
