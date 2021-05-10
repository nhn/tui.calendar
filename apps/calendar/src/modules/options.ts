import { ScheduleData } from '@src/model';
import { getDayName } from '@src/util/dayName';
import { includes, range } from '@src/util/utils';
import { Options } from '@t/option';
import { InitStoreData, OptionData } from '@t/store';

function initializeDayNames(startDayOfWeek = 0) {
  return range(startDayOfWeek, 7)
    .concat(range(startDayOfWeek))
    .map((day) => getDayName(day));
}

function getOptionData(optionsData: Options = {}): OptionData {
  const month = {
    daynames: [],
    visibleWeeksCount: 6,
    workweek: false,
    narrowWeekend: false,
    startDayOfWeek: 0,
    isAlways6Week: true,
    moreLayerSize: { width: null, height: null },
    grid: {
      header: { height: 31 },
      footer: { height: 31 },
    },
    visibleScheduleCount: 6,
    scheduleFilter: (schedule: ScheduleData) =>
      !!schedule.isVisible && includes(['allday', 'time'], schedule.category),
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
  state: (initStoreData: InitStoreData) => getOptionData(initStoreData.options),
};

export default options;
