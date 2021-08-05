import { Option, ScheduleData } from '@src/model';
import { Day } from '@src/time/datetime';
import { getDayName } from '@src/util/dayName';
import { includes, range } from '@src/util/utils';

import { CalendarMonthOption, CalendarStore, CalendarWeekOption, SetState } from '@t/store';

function initializeDayNames(startDayOfWeek = 0) {
  return range(startDayOfWeek, 7)
    .concat(range(startDayOfWeek))
    .map((day) => getDayName(day));
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
    visibleScheduleCount: 6,
    scheduleFilter: (schedule: Required<ScheduleData>) =>
      schedule.isVisible && includes(['allday', 'time'], schedule.category),
    ...monthOption,
  };

  if (!month.daynames.length) {
    month.daynames = initializeDayNames(month.startDayOfWeek);
  }

  return month;
}

export type OptionSlice = Omit<Option, 'template' | 'calendars' | 'theme'>;

export type OptionDispatchers = {
  setOptions: (newOption: OptionSlice) => void;
};

// eslint-disable-next-line complexity
export function createOptionSlice(option: Option = {}): OptionSlice {
  return {
    defaultView: option?.defaultView ?? 'week',
    taskView: option?.taskView ?? true,
    scheduleView: option?.scheduleView ?? true,
    useCreationPopup: option?.useCreationPopup ?? false,
    useDetailPopup: option?.useDetailPopup ?? false,
    disableDblClick: option?.disableDblClick ?? false,
    disableClick: option?.disableClick ?? false,
    isReadOnly: option?.isReadOnly ?? false,
    week: initializeWeekOption(option.week),
    month: initializeMonthOption(option.month),
  };
}

export function createOptionDispatchers(set: SetState<CalendarStore>): OptionDispatchers {
  return {
    setOptions: (newOption: OptionSlice = {}) =>
      set((state) => ({
        option: {
          ...state.option,
          ...newOption,
        },
      })),
  };
}
