import { ScheduleData } from '@src/model';
import { includes } from '@src/util/utils';
import { Options } from '@t/option';
import { InitStoreData, OptionData } from '@t/store';

function getOptionData(optionsData: Options = {}): OptionData {
  const month = {
    daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
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
    visibleScheduleCount: 10, // @TODO: 어디에 사용되는지 확인 필요
    scheduleFilter: (schedule: ScheduleData) =>
      !!schedule.isVisible && includes(['allday', 'time'], schedule.category),
    ...optionsData.month,
  };

  return {
    month,
  };
}

const options = {
  name: 'options',
  state: (initStoreData: InitStoreData) => getOptionData(initStoreData.options),
};

export default options;
