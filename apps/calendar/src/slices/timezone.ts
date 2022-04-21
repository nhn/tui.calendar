import produce from 'immer';

import { isNil } from '@src/utils/type';

import type { Options, TimezoneConfig } from '@t/options';
import type { CalendarState, CalendarStore, SetState } from '@t/store';

export interface TimezoneSlice {
  timezone: {
    primaryTimezone: string | 'Local';
    zones: TimezoneConfig[];
    customOffsetCalculator?: ((primaryTimezoneName: string, timestamp: number) => number) | null;
  };
}

export interface TimezoneDispatchers {
  setTimezones: (timezones: TimezoneConfig[]) => void;
  setCustomOffsetCalculator: (
    calculator: ((primaryTimezoneName: string, timestamp: number) => number) | null
  ) => void;
}

export function createTimezoneSlice(timezoneOption?: Options['timezone']): TimezoneSlice {
  const { zones, customOffsetCalculator } = timezoneOption ?? {};

  if (isNil(zones) || zones.length === 0) {
    return {
      timezone: {
        primaryTimezone: 'Local',
        zones: [],
      },
    };
  }

  return {
    timezone: {
      primaryTimezone: zones[0].timezoneName ?? 'Local',
      zones,
      customOffsetCalculator: customOffsetCalculator ?? null,
    },
  };
}

export function createTimezoneDispatchers(set: SetState<CalendarStore>): TimezoneDispatchers {
  return {
    setTimezones: (timezones: TimezoneConfig[]) =>
      set(
        produce((state: CalendarState) => {
          state.timezone.zones = timezones;
        })
      ),
    setCustomOffsetCalculator: (
      calculator: ((primaryTimezoneName: string, timestamp: number) => number) | null
    ) =>
      set(
        produce((state: CalendarState) => {
          state.timezone.customOffsetCalculator = calculator;
        })
      ),
  };
}
