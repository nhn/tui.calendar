import { createEventCollection } from '@src/controller/base';
import {
  getExceedCount,
  getGridWidthAndLeftPercentValues,
  getRenderedEventUIModels,
  getWidth,
  isWithinHeight,
} from '@src/helpers/grid';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';

import { createDate } from '@test/helper';

import { CalendarData } from '@t/events';
import { Cells } from '@t/panel';

const data = [
  { start: createDate(2021, 4, 30), end: createDate(2021, 5, 2) }, // Fri ~ Sun
  { start: createDate(2021, 5, 2), end: createDate(2021, 5, 4) }, // Sun ~ Tue
  { start: createDate(2021, 5, 4), end: createDate(2021, 5, 6) }, // Tue ~ Thu
];

describe('gridHelper', () => {
  describe('isWithinHeight', () => {
    it('should return a callback function that checks whether do not exceed height of container', () => {
      expect(isWithinHeight(100, 20)({ top: 1 } as EventUIModel)).toBe(true);
      expect(isWithinHeight(100, 20)({ top: 6 } as EventUIModel)).toBe(false);
    });
  });

  describe('getExceedCount', () => {
    it('should calculate the number of events that exceed height of container', () => {
      const uiModels = data.map((e) => {
        const event = EventModel.create(e);
        event.isAllDay = true;

        return EventUIModel.create(event);
      });

      expect(getExceedCount(uiModels, 200, 30)).toBe(0);
    });
  });

  it('getRenderedEventUIModels', () => {
    const narrowWeekend = false;
    const cells: Cells = [
      new TZDate(2021, 5, 2),
      new TZDate(2021, 5, 3),
      new TZDate(2021, 5, 4),
      new TZDate(2021, 5, 5),
    ];
    const calendarData: CalendarData = {
      calendars: [],
      events: createEventCollection(),
      idsOfDay: {},
    };

    expect(getRenderedEventUIModels(cells, calendarData, narrowWeekend)).toEqual({
      uiModels: [],
      gridDateEventModelMap: {},
    });
  });

  describe('getGridWidthAndLeftPercentValues', () => {
    const totalWidth = 100;
    let narrowWeekend: boolean;
    let cells: Cells;

    describe('narrowWeekend is true', () => {
      beforeAll(() => {
        narrowWeekend = true;
      });

      it('should return single PanelEventInfo', () => {
        cells = [createDate(2021, 4, 16)];

        const { widthList, leftList } = getGridWidthAndLeftPercentValues(
          cells,
          narrowWeekend,
          totalWidth
        );

        expect(widthList).toHaveLength(1);
        expect(widthList).toEqual([100]);
        expect(leftList).toHaveLength(1);
        expect(leftList).toEqual([0]);
      });

      it('should return PanelEventInfo list (only weekday)', () => {
        // Mon, Tue, Wed, Thu, Fri
        cells = [12, 13, 14, 15, 16].map((d) => createDate(2021, 4, d));

        const { widthList, leftList } = getGridWidthAndLeftPercentValues(
          cells,
          narrowWeekend,
          totalWidth
        );

        expect(widthList).toHaveLength(5);
        expect(widthList).toEqual([20, 20, 20, 20, 20]);
        expect(leftList).toHaveLength(5);
        expect(leftList).toEqual([0, 20, 40, 60, 80]);
      });

      it('should return PanelEventInfo list (only weekend)', () => {
        // Sat, Sun
        cells = [17, 18].map((d) => createDate(2021, 4, d));

        const { widthList, leftList } = getGridWidthAndLeftPercentValues(
          cells,
          narrowWeekend,
          totalWidth
        );

        expect(widthList).toHaveLength(2);
        expect(widthList).toEqual([50, 50]);
        expect(leftList).toHaveLength(2);
        expect(leftList).toEqual([0, 50]);
      });

      it('should return PanelEventInfo list', () => {
        // Thu, Fri, Sat
        cells = [15, 16, 17].map((d) => createDate(2021, 4, d));

        const { widthList, leftList } = getGridWidthAndLeftPercentValues(
          cells,
          narrowWeekend,
          totalWidth
        );

        expect(widthList).toHaveLength(3);
        expect(widthList).toEqual([40, 40, 20]);
        expect(leftList).toHaveLength(3);
        expect(leftList).toEqual([0, 40, 80]);
      });
    });

    describe('narrowWeekend is false', () => {
      beforeAll(() => {
        narrowWeekend = false;
      });

      it('should return single grid width and left percent value', () => {
        cells = [createDate(2021, 4, 16)];

        const { widthList, leftList } = getGridWidthAndLeftPercentValues(
          cells,
          narrowWeekend,
          totalWidth
        );

        expect(widthList).toHaveLength(1);
        expect(widthList).toEqual([100]);
        expect(leftList).toHaveLength(1);
        expect(leftList).toEqual([0]);
      });

      it('should return list for grid width and left percent values (only weekday)', () => {
        // Mon, Tue, Wed, Thu, Fri
        cells = [12, 13, 14, 15, 16].map((d) => createDate(2021, 4, d));

        const { widthList, leftList } = getGridWidthAndLeftPercentValues(
          cells,
          narrowWeekend,
          totalWidth
        );

        expect(widthList).toHaveLength(5);
        expect(widthList).toEqual([20, 20, 20, 20, 20]);
        expect(leftList).toHaveLength(5);
        expect(leftList).toEqual([0, 20, 40, 60, 80]);
      });

      it('should return list for grid width and left percent values (only weekend)', () => {
        // Sat, Sun
        cells = [17, 18].map((d) => createDate(2021, 4, d));

        const { widthList, leftList } = getGridWidthAndLeftPercentValues(
          cells,
          narrowWeekend,
          totalWidth
        );

        expect(widthList).toHaveLength(2);
        expect(widthList).toEqual([50, 50]);
        expect(leftList).toHaveLength(2);
        expect(leftList).toEqual([0, 50]);
      });

      it('should return list for grid width and left percent values', () => {
        // Thu, Fri, Sat, Sun
        cells = [15, 16, 17, 18].map((d) => createDate(2021, 4, d));

        const { widthList, leftList } = getGridWidthAndLeftPercentValues(
          cells,
          narrowWeekend,
          totalWidth
        );

        expect(widthList).toHaveLength(4);
        expect(widthList).toEqual([25, 25, 25, 25]);
        expect(leftList).toHaveLength(4);
        expect(leftList).toEqual([0, 25, 50, 75]);
      });
    });
  });

  describe('getWidth', () => {
    it('should return sum of width', () => {
      const widthList = [1, 2, 3, 4, 5];
      const { length } = widthList;

      for (let start = 0; start < length; start += 1) {
        for (let end = start; end < length; end += 1) {
          const result = getWidth(widthList, start, end);
          let sum = 0;

          for (let i = start; i <= end; i += 1) {
            sum += widthList[i];
          }

          expect(result).toBe(sum);
        }
      }
    });
  });
});
