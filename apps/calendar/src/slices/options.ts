import produce from 'immer';
import range from 'tui-code-snippet/array/range';

import { getDayName } from '@src/helpers/dayName';
import { Day } from '@src/time/datetime';
import { mergeObject } from '@src/utils/object';

import { EventModelData } from '@t/events';
import { Options } from '@t/options';
import {
  CalendarMonthOptions,
  CalendarState,
  CalendarStore,
  CalendarWeekOptions,
  SetState,
} from '@t/store';

function initializeDayNames(startDayOfWeek = 0) {
  return [...range(startDayOfWeek, 7), ...range(startDayOfWeek)].map((day) => getDayName(day));
}

function initializeWeekOptions(weekOptions: Options['week'] = {}): CalendarWeekOptions {
  return {
    startDayOfWeek: Day.SUN,
    daynames: [],
    narrowWeekend: false,
    workweek: false,
    showTimezoneCollapseButton: false,
    timezonesCollapsed: false,
    timezones: [
      {
        timezoneOffset: 540,
        displayLabel: 'GMT+09:00',
        tooltip: 'Seoul',
      },
    ],
    hourStart: 0,
    hourEnd: 24,
    ...weekOptions,
  };
}

function initializeMonthOptions(monthOptions: Options['month']): CalendarMonthOptions {
  const month = {
    daynames: [],
    visibleWeeksCount: 0,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: Day.SUN,
    isAlways6Week: true,
    moreLayerSize: { width: null, height: null },
    grid: {
      header: { height: 31 },
      footer: { height: 31 },
    },
    visibleEventCount: 6,
    eventFilter: (event: Required<EventModelData>) =>
      event.isVisible && ['allday', 'time'].includes(event.category),
    ...monthOptions,
  };

  if (!month.daynames.length) {
    month.daynames = initializeDayNames(month.startDayOfWeek);
  }

  return month;
}

// @TODO: some of options has default values. so it should be `Required` type.
// But it needs a complex type such as `DeepRequired`.
// maybe leveraging library like `ts-essential` might be helpful.
export type OptionsSlice = {
  options: Omit<Required<Options>, 'template' | 'calendars' | 'theme' | 'timezone'>;
};

export type OptionsDispatchers = {
  setOptions: (newOptions: Partial<OptionsSlice['options']>) => void;
};

// eslint-disable-next-line complexity
export function createOptionsSlice(options: Options = {}): OptionsSlice {
  return {
    options: {
      defaultView: options.defaultView ?? 'week',
      taskView: options.taskView ?? true,
      eventView: options.eventView ?? true,
      useCreationPopup: options.useCreationPopup ?? false,
      useDetailPopup: options.useDetailPopup ?? false,
      disableDblClick: options.disableDblClick ?? false,
      disableClick: options.disableClick ?? false,
      isReadOnly: options.isReadOnly ?? false,
      week: initializeWeekOptions(options.week),
      month: initializeMonthOptions(options.month),
      usageStatistics: options.usageStatistics ?? true,
    },
  };
}

export function createOptionsDispatchers(set: SetState<CalendarStore>): OptionsDispatchers {
  return {
    setOptions: (newOptions: Partial<OptionsSlice['options']> = {}) =>
      set(
        produce((state: CalendarState) => {
          mergeObject(state.options, newOptions);
        })
      ),
  };
}
