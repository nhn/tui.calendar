import type { CalendarState } from '@t/store';

export const primaryTimezoneSelector = (state: CalendarState) =>
  state.options?.timezone?.zones?.[0]?.timezoneName ?? 'Local';

export const customOffsetCalculatorSelector = (state: CalendarState) =>
  state.options?.timezone?.customOffsetCalculator;

export const timezonesSelector = (state: CalendarState) => state.options.timezone.zones ?? [];
