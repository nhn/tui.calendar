import produce from 'immer';
import range from 'tui-code-snippet/array/range';

import { getDayName } from '@src/helpers/dayName';
import { Day } from '@src/time/datetime';
import { mergeObject } from '@src/utils/object';

import { EventModelData } from '@t/events';
import { Option } from '@t/option';
import {
  CalendarMonthOption,
  CalendarState,
  CalendarStore,
  CalendarWeekOption,
  SetState,
} from '@t/store';

function initializeDayNames(startDayOfWeek = 0) {
  return [...range(startDayOfWeek, 7), ...range(startDayOfWeek)].map((day) => getDayName(day));
}

function initializeWeekOption(weekOption: Option['week'] = {}): CalendarWeekOption {
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
    ...weekOption,
  };
}

function initializeMonthOption(monthOption: Option['month']): CalendarMonthOption {
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
    ...monthOption,
  };

  if (!month.daynames.length) {
    month.daynames = initializeDayNames(month.startDayOfWeek);
  }

  return month;
}

// @TODO: some of options has default values. so it should be `Required` type.
// But it needs a complex type such as `DeepRequired`.
// maybe leveraging library like `ts-essential` might be helpful.
export type OptionSlice = {
  option: Omit<Required<Option>, 'template' | 'calendars' | 'theme' | 'timezone'>;
};

export type OptionDispatchers = {
  setOptions: (newOption: Partial<OptionSlice['option']>) => void;
};

// eslint-disable-next-line complexity
export function createOptionSlice(option: Option = {}): OptionSlice {
  return {
    option: {
      defaultView: option?.defaultView ?? 'week',
      taskView: option?.taskView ?? true,
      eventView: option?.eventView ?? true,
      useCreationPopup: option?.useCreationPopup ?? false,
      useDetailPopup: option?.useDetailPopup ?? false,
      disableDblClick: option?.disableDblClick ?? false,
      disableClick: option?.disableClick ?? false,
      isReadOnly: option?.isReadOnly ?? false,
      week: initializeWeekOption(option.week),
      month: initializeMonthOption(option.month),
      usageStatistics: option?.usageStatistics ?? true,
    },
  };
}

export function createOptionDispatchers(set: SetState<CalendarStore>): OptionDispatchers {
  return {
    setOptions: (newOption: Partial<OptionSlice['option']> = {}) =>
      set(
        produce((state: CalendarState) => {
          mergeObject(state.option, newOption);
        })
      ),
  };
}
