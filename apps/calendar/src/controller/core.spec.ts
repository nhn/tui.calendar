import {
  getCollisionGroup,
  getEventInDateRangeFilter,
  getLastRowInColumn,
  getMatrices,
  limitRenderRange,
} from '@src/controller/core';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import array from '@src/utils/array';
import Collection from '@src/utils/collection';

import type { CollisionGroup, EventObject } from '@t/events';

describe('Base.Core', () => {
  let mockData: EventObject[];
  let eventList: EventModel[];
  let expected;
  let actual;

  beforeEach(() => {
    mockData = [
      {
        title: 'A',
        isAllday: false,
        start: '2015-05-01T10:20:00',
        end: '2015-05-01T10:40:00',
        category: 'time',
      },
      {
        title: 'B',
        isAllday: false,
        start: '2015-05-01T10:30:00',
        end: '2015-05-01T11:30:00',
        category: 'time',
      },
      {
        title: 'C',
        isAllday: false,
        start: '2015-05-01T11:20:00',
        end: '2015-05-01T12:00:00',
        category: 'time',
      },
      {
        title: 'D',
        isAllday: false,
        start: '2015-05-01T10:50:00',
        end: '2015-05-01T11:10:00',
        category: 'time',
      },
      {
        title: 'E',
        isAllday: false,
        start: '2015-05-01T13:20:00',
        end: '2015-05-01T13:40:00',
        category: 'time',
      },
      {
        title: 'F',
        isAllday: false,
        start: '2015-05-01T14:00:00',
        end: '2015-05-01T14:20:00',
        category: 'time',
      },
      {
        title: 'G',
        isAllday: false,
        start: '2015-05-01T14:10:00',
        end: '2015-05-01T14:20:00',
        category: 'time',
      },
      {
        title: 'H',
        isAllday: false,
        start: '2015-05-01T16:00:00',
        end: '2015-05-01T18:00:00',
        category: 'time',
      },
      {
        title: 'I',
        isAllday: false,
        start: '2015-05-01T17:00:00',
        end: '2015-05-01T20:00:00',
        category: 'time',
      },
      {
        title: 'J',
        isAllday: false,
        start: '2015-05-01T19:00:00',
        end: '2015-05-01T21:00:00',
        category: 'time',
      },
      {
        title: '물고기 밥주기',
        isAllday: false,
        start: '2015-05-01T22:00:00',
        end: '2015-05-01T22:10:00',
        category: 'time',
      },
    ];
    eventList = mockData.map((data) => new EventModel(data)).sort(array.compare.event.asc);
  });

  describe('getCollisionGroup()', () => {
    it('Get collision group properly.', () => {
      actual = getCollisionGroup(eventList);
      expected = [
        [eventList[0].cid(), eventList[1].cid(), eventList[2].cid(), eventList[3].cid()],
        [eventList[4].cid()],
        [eventList[5].cid(), eventList[6].cid()],
        [eventList[7].cid(), eventList[8].cid(), eventList[9].cid()],
        [eventList[10].cid()],
      ];

      expect(actual).toEqual(expected);
    });

    describe('When calculating the collision, it is affected by the travel time.', () => {
      let collisionEventList: EventModel[];

      beforeEach(() => {
        const events: EventObject[] = [
          {
            title: 'A',
            isAllday: false,
            start: '2015-05-01T10:20:00',
            end: '2015-05-01T10:40:00',
            category: 'time',
            goingDuration: 0,
            comingDuration: 20,
          },
          {
            title: 'B',
            isAllday: false,
            start: '2015-05-01T10:40:00',
            end: '2015-05-01T11:50:00',
            category: 'time',
            goingDuration: 10,
            comingDuration: 10,
          },
          {
            title: 'C',
            isAllday: false,
            start: '2015-05-01T11:00:00',
            end: '2015-05-01T12:00:00',
            category: 'time',
            goingDuration: 30,
            comingDuration: 30,
          },
          {
            title: 'D',
            isAllday: false,
            start: '2015-05-01T12:00:00',
            end: '2015-05-01T13:00:00',
            category: 'time',
            goingDuration: 10,
            comingDuration: 10,
          },
        ];

        collisionEventList = events
          .map((data) => new EventModel(data))
          .sort(array.compare.event.asc);
      });

      it('should get collision group properly with travel time.', () => {
        expect(getCollisionGroup(collisionEventList, true)).toEqual([
          [
            collisionEventList[0].cid(),
            collisionEventList[1].cid(),
            collisionEventList[2].cid(),
            collisionEventList[3].cid(),
          ],
        ]);
      });

      it('should get collision group properly without travel time.', () => {
        expect(getCollisionGroup(collisionEventList, false)).toEqual([
          [collisionEventList[0].cid()],
          [collisionEventList[1].cid(), collisionEventList[2].cid()],
          [collisionEventList[3].cid()],
        ]);
      });
    });
  });

  describe('getLastRowInColumn()', () => {
    let test: Array<Array<number | undefined>>;

    beforeEach(() => {
      test = [
        [1, 1, 1],
        // eslint-disable-next-line no-undefined
        [1, undefined, 3],
        // eslint-disable-next-line no-undefined
        [4, undefined, undefined],
      ];
    });

    it('return -1 when column not exist.', () => {
      const result = getLastRowInColumn(test, 4);

      expect(result).toBe(-1);
    });

    it('can calculate last row in column in 2d array.', () => {
      const result = getLastRowInColumn(test, 0);

      expect(result).toBe(2);
    });
  });

  describe('getMatrices()', () => {
    let collection: Collection<EventModel>;
    let collisionGroup: CollisionGroup;

    beforeEach(() => {
      collection = new Collection<EventModel>((model) => {
        return model.cid();
      });
    });

    it('can calculate matrices accurately.', () => {
      collection.add(...eventList);
      collisionGroup = getCollisionGroup(eventList);

      expected = [
        [[eventList[0], eventList[1]], [eventList[2]], [eventList[3]]],
        [[eventList[4]]],
        [[eventList[5], eventList[6]]],
        [[eventList[7], eventList[8]], [eventList[9]]],
        [[eventList[10]]],
      ];
      actual = getMatrices(collection, collisionGroup);

      expect(actual).toEqual(expected);
    });

    describe('When calculating matrices, it is affected by the travel time.', () => {
      let matrixEventList: EventModel[];

      beforeEach(() => {
        const events: EventObject[] = [
          {
            title: 'A',
            isAllday: false,
            start: '2015-05-01T10:20:00',
            end: '2015-05-01T10:40:00',
            category: 'time',
            goingDuration: 0,
            comingDuration: 20,
          },
          {
            title: 'B',
            isAllday: false,
            start: '2015-05-01T10:40:00',
            end: '2015-05-01T11:50:00',
            category: 'time',
            goingDuration: 10,
            comingDuration: 10,
          },
          {
            title: 'C',
            isAllday: false,
            start: '2015-05-01T11:00:00',
            end: '2015-05-01T12:00:00',
            category: 'time',
            goingDuration: 30,
            comingDuration: 30,
          },
          {
            title: 'D',
            isAllday: false,
            start: '2015-05-01T12:00:00',
            end: '2015-05-01T13:00:00',
            category: 'time',
            goingDuration: 10,
            comingDuration: 10,
          },
        ];

        matrixEventList = events.map((data) => new EventModel(data)).sort(array.compare.event.asc);
        collection.add(...matrixEventList);
      });

      afterEach(() => {
        collection.clear();
      });

      it('can calculate matrices accurately with travel time', () => {
        const usingTravelTime = true;
        collisionGroup = getCollisionGroup(matrixEventList, usingTravelTime);

        expect(getMatrices(collection, collisionGroup, usingTravelTime)).toEqual([
          [[matrixEventList[0], matrixEventList[1], matrixEventList[2]], [matrixEventList[3]]],
        ]);
      });

      it('can calculate matrices accurately without travel time', () => {
        const usingTravelTime = false;
        collisionGroup = getCollisionGroup(matrixEventList, usingTravelTime);

        expect(getMatrices(collection, collisionGroup, usingTravelTime)).toEqual([
          [[matrixEventList[0]]],
          [[matrixEventList[1], matrixEventList[2]]],
          [[matrixEventList[3]]],
        ]);
      });
    });
  });

  describe('limitRenderRange', () => {
    let uiModelCollection: Collection<EventUIModel>;

    beforeEach(() => {
      uiModelCollection = new Collection((uiModel) => {
        return uiModel.cid();
      });
    });

    it('fill renderStarts, renderEnds to each ui model in collection.', () => {
      // 5/1 10:20 ~ 5/1 10:40
      uiModelCollection.add(new EventUIModel(eventList[0]));

      const limit1 = new TZDate('2015-05-01T10:30:00');
      const limit2 = new TZDate('2015-05-01T10:40:00');

      limitRenderRange(limit1, limit2, uiModelCollection);

      const uiModel = uiModelCollection.getFirstItem();

      expect(uiModel).not.toBeNull();

      if (uiModel) {
        expect(uiModel.renderStarts).toEqual(limit1);
        expect(uiModel.renderEnds).toBeUndefined();
      }
    });
  });

  describe('getEventInDateRangeFilter', () => {
    let uiModelCollection: Collection<EventUIModel>;

    beforeEach(() => {
      uiModelCollection = new Collection((uiModel) => {
        return uiModel.cid();
      });
    });

    it('filter events properly.', () => {
      let filterFn;
      let d1;
      let d2;

      //                     start ------------- end
      // A ownStart - ownEnd
      // B ownStart -------- ownEnd
      // C ownStart ------------------ ownEnd
      // D                   ownSta -- ownEnd
      // E                           ownS - ownE
      // F                            ownSta --- ownEn
      // G                             ownStart ------------------- ownEnd
      // H                                        ownS ------------ ownEnd
      // I                                               ownStart - ownEnd
      // L ownStart ----------------------------------------------- ownEnd

      // 10:20 ~ 10:40
      uiModelCollection.add(new EventUIModel(eventList[0]));

      // A: 09:30 ~ 10:10
      d1 = new TZDate('2015-05-01T09:30:00');
      d2 = new TZDate('2015-05-01T10:10:00');
      filterFn = getEventInDateRangeFilter(d1, d2);

      expect(uiModelCollection.filter(filterFn).size).toBe(0);

      // B: 09:30 ~ 10:20
      d1 = new TZDate('2015-05-01T09:30:00');
      d2 = new TZDate('2015-05-01T10:20:00');
      filterFn = getEventInDateRangeFilter(d1, d2);

      expect(uiModelCollection.filter(filterFn).size).toBe(1);

      // C: 09:30 ~ 10:30
      d1 = new TZDate('2015-05-01T09:30:00');
      d2 = new TZDate('2015-05-01T10:30:00');
      filterFn = getEventInDateRangeFilter(d1, d2);

      expect(uiModelCollection.filter(filterFn).size).toBe(1);

      // D: 10:20 ~ 10:30
      d1 = new TZDate('2015-05-01T10:20:00');
      d2 = new TZDate('2015-05-01T10:30:00');
      filterFn = getEventInDateRangeFilter(d1, d2);

      expect(uiModelCollection.filter(filterFn).size).toBe(1);

      // E: 10:25 ~ 10:35
      d1 = new TZDate('2015-05-01T10:25:00');
      d2 = new TZDate('2015-05-01T10:35:00');
      filterFn = getEventInDateRangeFilter(d1, d2);

      expect(uiModelCollection.filter(filterFn).size).toBe(1);

      // F: 10:30 ~ 10:40
      d1 = new TZDate('2015-05-01T10:30:00');
      d2 = new TZDate('2015-05-01T10:40:00');
      filterFn = getEventInDateRangeFilter(d1, d2);

      expect(uiModelCollection.filter(filterFn).size).toBe(1);

      // G: 10:30 ~ 10:50
      d1 = new TZDate('2015-05-01T10:30:00');
      d2 = new TZDate('2015-05-01T10:50:00');
      filterFn = getEventInDateRangeFilter(d1, d2);

      expect(uiModelCollection.filter(filterFn).size).toBe(1);

      // H: 10:40 ~ 10:50
      d1 = new TZDate('2015-05-01T10:40:00');
      d2 = new TZDate('2015-05-01T10:50:00');
      filterFn = getEventInDateRangeFilter(d1, d2);

      expect(uiModelCollection.filter(filterFn).size).toBe(1);

      // I: 10:50 ~ 10:55
      d1 = new TZDate('2015-05-01T10:50:00');
      d2 = new TZDate('2015-05-01T10:55:00');
      filterFn = getEventInDateRangeFilter(d1, d2);

      expect(uiModelCollection.filter(filterFn).size).toBe(0);

      // L: 10:10 ~ 10:50
      d1 = new TZDate('2015-05-01T10:10:00');
      d2 = new TZDate('2015-05-01T10:50:00');
      filterFn = getEventInDateRangeFilter(d1, d2);

      expect(uiModelCollection.filter(filterFn).size).toBe(1);
    });
  });
});
