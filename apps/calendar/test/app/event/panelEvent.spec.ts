import { getViewModels } from '@src/event/panelEvent';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { createDate } from '@test/helper';

import type { Cells } from '@t/panel';

describe('getViewModels', () => {
  let cells: Cells;

  const data = [
    { start: createDate(2021, 4, 30), end: createDate(2021, 5, 2) }, // Fri ~ Sun
    { start: createDate(2021, 5, 2), end: createDate(2021, 5, 4) }, // Sun ~ Tue
    { start: createDate(2021, 5, 4), end: createDate(2021, 5, 6) }, // Tue ~ Thu
  ];

  it('should return sorted viewModels', () => {
    // Sun ~ Sat
    cells = [2, 3, 4, 5, 6, 7, 8].map((d) => createDate(2021, 5, d));
    const events = data.map((e) => Schedule.create(e));

    const result = getViewModels(events, cells);
    const viewModels = events.map((event) => ScheduleViewModel.create(event));

    expect(result).toEqual(viewModels);
  });
});
