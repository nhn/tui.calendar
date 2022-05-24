/* eslint-disable no-undefined */
import pluck from 'tui-code-snippet/collection/pluck';

import EventModel from '@src/model/eventModel';
import array from '@src/utils/array';

import type { EventObject } from '@t/events';

describe('common/array', () => {
  describe('common compare methods', () => {
    describe('compare.num', () => {
      it('asc', () => {
        const arr = [8, 3, 11, 29, 31, 55, 25, 1];
        arr.sort(array.compare.num.asc);

        expect(arr).toEqual([1, 3, 8, 11, 25, 29, 31, 55]);
      });
    });

    describe('EventModel', () => {
      let mockData: EventObject[];
      let events: EventModel[];

      beforeEach(() => {
        mockData = [
          {
            title: 'hunting',
            isAllday: true,
            start: '2015/05/01',
            end: '2015/05/02',
          },
          {
            title: 'meeting',
            isAllday: false,
            start: '2015/05/03 12:30:00',
            end: '2015/05/03 16:00:00',
          },
          {
            title: 'physical training',
            isAllday: false,
            start: '2015/05/03 18:30:00',
            end: '2015/05/03 19:30:00',
          },
          {
            title: 'logical training2',
            isAllday: false,
            start: '2015/05/03 18:30:00',
            end: '2015/05/03 19:20:00',
          },
          {
            title: 'logical training',
            isAllday: false,
            start: '2015/05/03 18:30:00',
            end: '2015/05/03 19:20:00',
          },
          {
            title: '평가기간',
            isAllday: true,
            start: '2015/05/03',
            end: '2015/05/12',
          },
          {
            title: 'drawing study',
            isAllday: true,
            start: '2015/05/04 18:40:00',
            end: '2015/05/04 19:40:00',
          },
        ];
        events = [];
      });

      it('isAllday ASC, start ASC, duration DESC, id ASC', () => {
        mockData.forEach((data) => {
          events.push(new EventModel(data));
        });

        events.sort(array.compare.event.asc);

        expect(pluck(events, 'title')).toEqual([
          'hunting',
          '평가기간',
          'drawing study',
          'meeting',
          'physical training',
          'logical training2',
          'logical training',
        ]);
      });

      it('duration', () => {
        const expected = ['B', 'A'];

        const fixtures = [
          {
            title: 'A',
            isAllday: false,
            start: '2015/05/03 12:00:00',
            end: '2015/05/03 12:10:00',
          },
          {
            title: 'B',
            isAllday: false,
            start: '2015/05/03 12:00:00',
            end: '2015/05/03 12:20:00',
          },
        ];

        fixtures.forEach((data) => {
          events.push(new EventModel(data));
        });

        events.sort(array.compare.event.asc);

        expect(pluck(events, 'title')).toEqual(expected);
      });
    });
  });

  describe('binary search', () => {
    let arr: string[];

    beforeEach(() => {
      arr = ['B', 'Z', 'a', 'c', 'd', 'e', 'f', 'x']; // asc
    });

    it('return correct index to insertion.', () => {
      arr = ['CA', 'WA'];

      expect(array.bsearch(arr, 'TX')).toBe(-1);
    });

    it('search item index using binary search.', () => {
      expect(array.bsearch(arr, 'd')).toBe(4);
      expect(array.bsearch(arr, 'f')).toBe(6);
      expect(array.bsearch(arr, 'B')).not.toBe(1);
      expect(array.bsearch(arr, 'q')).toBeLessThan(0);
    });

    it('can be used to insert the element.', () => {
      arr.splice(Math.abs(array.bsearch(arr, 'g')), 0, 'g');

      expect(arr.indexOf('g')).toBe(7);
    });

    it('search by custom functions.', () => {
      const items = [{ a: 'B' }, { a: 'e' }, { a: 'f' }, { a: 'x' }, { a: 'z' }]; // asc

      expect(
        array.bsearch(items, 'f', (item) => {
          return item.a;
        })
      ).toBe(2);
    });

    it('can search complicated sort type array.', () => {
      interface Item {
        f: number;
        s: number;
      }

      const items = [
        {
          f: 2,
          s: 13,
        },
        {
          f: 1,
          s: 5,
        },
        {
          f: 1,
          s: 3,
        },
        {
          f: 2,
          s: 2,
        },
        {
          f: 0,
          s: 15,
        },
        {
          f: 8,
          s: 1,
        },
        {
          f: 5,
          s: 12,
        },
        {
          f: 5,
          s: 2,
        },
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
