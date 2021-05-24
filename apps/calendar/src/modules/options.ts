import { ScheduleData } from '@src/model';
import { Day } from '@src/time/datetime';
import { getDayName } from '@src/util/dayName';
import { includes, range } from '@src/util/utils';

import type { Options } from '@t/option';
import type { CalendarMonthOption, CalendarWeekOption, InitStoreData, OptionData } from '@t/store';

function initializeDayNames(startDayOfWeek = 0) {
  return range(startDayOfWeek, 7)
    .concat(range(startDayOfWeek))
    .map((day) => getDayName(day));
}

function initializeWeekOption(optionsData: Options = {}): CalendarWeekOption {
  return {
    startDayOfWeek: 0,
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
    ...optionsData.week,
  };
}

function initializeMonthOption(optionsData: Options = {}): CalendarMonthOption {
  const month = {
    daynames: [],
    visibleWeeksCount: 6,
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
    ...optionsData.month,
  };

  if (!month.daynames.length) {
    month.daynames = initializeDayNames(month.startDayOfWeek);
  }

  return month;
}

function getInitialOptions(optionsData: Options = {}): OptionData {
  return {
    month: initializeMonthOption(optionsData),
    week: initializeWeekOption(optionsData),
  };
}

const options = {
  name: 'options',
  state: (initStoreData: InitStoreData) => getInitialOptions(initStoreData.options),
};

export default options;
