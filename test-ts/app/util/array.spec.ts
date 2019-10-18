/* eslint-disable no-undefined */
import array from '@src/util/array';
import { ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';
import pluck from 'tui-code-snippet/collection/pluck';
import inArray from 'tui-code-snippet/array/inArray';

describe('common/array', function() {
  describe('common compare methods', function() {
    describe('compare.num', function() {
      it('asc', function() {
        const arr = [8, 3, 11, 29, 31, 55, 25, 1];
        arr.sort(array.compare.num.asc);

        expect(arr).toEqual([1, 3, 8, 11, 25, 29, 31, 55]);
      });
    });

    describe('Schedule', function() {
      let mockData: ScheduleData[];
      let schedules: Schedule[];

      beforeEach(function() {
        mockData = fixture.load('schedule_set_string2.json');
        schedules = [];
      });

      afterEach(function() {
        fixture.cleanup();
      });

      it('isAllDay ASC, start ASC, duration DESC, id ASC', function() {
        mockData.forEach(data => {
          schedules.push(Schedule.create(data));
        });

        schedules.sort(array.compare.schedule.asc);

        expect(pluck(schedules, 'title')).toEqual([
          'hunting',
          '평가기간',
          'drawing study',
          'meeting',
          'physical training',
          'logical training2',
          'logical training'
        ]);
      });

      it('duration', function() {
        const expected = ['B', 'A'];

        const fixtures = [
          {
            title: 'A',
            isAllDay: false,
            start: '2015/05/03 12:00:00',
            end: '2015/05/03 12:10:00'
          },
          {
            title: 'B',
            isAllDay: false,
            start: '2015/05/03 12:00:00',
            end: '2015/05/03 12:20:00'
          }
        ];

        fixtures.forEach(data => {
          schedules.push(Schedule.create(data));
        });

        schedules.sort(array.compare.schedule.asc);

        expect(pluck(schedules, 'title')).toEqual(expected);
      });
    });
  });

  describe('binary search', function() {
    let arr: string[];

    beforeEach(function() {
      arr = ['B', 'Z', 'a', 'c', 'd', 'e', 'f', 'x']; // asc
    });

    it('return correct index to insertion.', function() {
      arr = ['CA', 'WA'];

      expect(array.bsearch(arr, 'TX')).toBe(-1);
    });

    it('search item index using binary search.', function() {
      expect(array.bsearch(arr, 'd')).toBe(4);
      expect(array.bsearch(arr, 'f')).toBe(6);
      expect(array.bsearch(arr, 'B')).not.toBe(1);
      expect(array.bsearch(arr, 'q')).toBeLessThan(0);
    });

    it('it can be used to insert the element.', function() {
      arr.splice(Math.abs(array.bsearch(arr, 'g')), 0, 'g');

      expect(inArray('g', arr)).toBe(7);
    });

    it('search by custom functions.', function() {
      const items = [{ a: 'B' }, { a: 'e' }, { a: 'f' }, { a: 'x' }, { a: 'z' }]; // asc

      expect(
        array.bsearch(items, 'f', item => {
          return item.a;
        })
      ).toBe(2);
    });

    it('can search complicated sort type array.', function() {
      interface Item {
        f: number;
        s: number;
      }

      const items = [
        {
          f: 2,
          s: 13
        },
        {
          f: 1,
          s: 5
        },
        {
          f: 1,
          s: 3
        },
        {
          f: 2,
          s: 2
        },
        {
          f: 0,
          s: 15
        },
        {
          f: 8,
          s: 1
        },
        {
          f: 5,
          s: 12
        },
        {
          f: 5,
          s: 2
        }
      ];

      // f ASC, b DESC
      function compare(a: Item, b: Item) {
        if (a.f > b.f) {
          return 1;
        }
        if (a.f < b.f) {
          return -1;
        }
        if (a.s > b.s) {
          return -1;
        }
        if (a.s < b.s) {
          return 1;
        }

        return 0;
      }
      items.sort(compare);

      expect(array.bsearch(items, { f: 5 }, undefined, compare)).toBe(5);
      expect(array.bsearch(items, { f: 5, s: 2 }, undefined, compare)).toBe(6);
    });
  });
});
