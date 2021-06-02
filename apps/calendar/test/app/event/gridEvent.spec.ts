import { setViewModelsInfo } from '@src/event/gridEvent';
import { createDate } from '@test/helper';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';

import type { CalendarWeekOption } from '@t/store';

describe('gridEvent', () => {
  const data = [
    { start: createDate(2021, 5, 10), end: createDate(2021, 5, 11) }, // Mon ~ Tue
    { start: createDate(2021, 5, 10), end: createDate(2021, 5, 14) }, // Mon ~ Fri
    { start: createDate(2021, 5, 12), end: createDate(2021, 5, 13) }, // Wed ~ Thu
  ];
  const cells = [9, 10, 11, 12, 13].map((day) => createDate(2021, 5, day)); // Sun ~ Thu

  it('should set viewModels style', () => {
    const viewModels = data.map((e) => {
      const event = Schedule.create(e);
      event.isAllDay = true;

      return ScheduleViewModel.create(event);
    });

    setViewModelsInfo(viewModels, cells, {} as CalendarWeekOption);

    const top = [0, 1, 0];
    const left = [20, 20, 60];
    const width = [40, 80, 40];
    const exceedRight = [false, true, false];

    for (let i = 0; i < 3; i += 1) {
      expect(viewModels[i].top).toBe(top[i]);
      expect(viewModels[i].left).toBe(left[i]);
      expect(viewModels[i].width).toBe(width[i]);
      expect(viewModels[i].exceedRight).toBe(exceedRight[i]);
    }
  });
});
