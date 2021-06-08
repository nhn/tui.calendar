import { getViewModels } from '@src/util/panelEvent';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { createDate } from '@test/helper';

describe('getViewModels', () => {
  const data = [
    { start: createDate(2021, 4, 30), end: createDate(2021, 5, 2) }, // Fri ~ Sun
    { start: createDate(2021, 5, 2), end: createDate(2021, 5, 4) }, // Sun ~ Tue
    { start: createDate(2021, 5, 4), end: createDate(2021, 5, 6) }, // Tue ~ Thu
  ];

  it('should return sorted viewModels', () => {
    // Sun ~ Sat
    const eventModels = data.map((e) => ScheduleViewModel.create(Schedule.create(e)));

    const result = getViewModels([[eventModels]]);

    expect(result).toEqual(eventModels);
  });
});
