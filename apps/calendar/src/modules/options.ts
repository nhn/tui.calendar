import { ScheduleData } from '@src/model';
import { Day } from '@src/time/datetime';
import { getDayName } from '@src/util/dayName';
import { includes, range } from '@src/util/utils';
import { Options } from '@t/option';
import { InitStoreData, OptionData } from '@t/store';

function initializeDayNames(startDayOfWeek = 0) {
  return range(startDayOfWeek, 7)
    .concat(range(startDayOfWeek))
    .map((day) => getDayName(day));
}

function getInitialOptions(optionsData: Options = {}): OptionData {
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
    ...optionsData.month,
  };

  if (!month.daynames.length) {
    month.daynames = initializeDayNames(month.startDayOfWeek);
  }

  return {
    month,
  };
}

const options = {
  name: 'options',
  state: (initStoreData: InitStoreData) => getInitialOptions(initStoreData.options),
};

export default options;
