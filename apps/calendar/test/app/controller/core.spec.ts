import { ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import TZDate from '@src/time/date';
import array from '@src/util/array';
import {
  getCollisionGroup,
  getLastRowInColumn,
  CollisionGroup,
  getMatrices,
  limitRenderRange,
  getScheduleInDateRangeFilter,
} from '@src/controller/core';
import Collection from '@src/util/collection';

describe('Base.Core', () => {
  let mockData: ScheduleData[];
  let scheduleList: Schedule[];
  let expected;
  let actual;

  beforeEach(() => {
    mockData = [
      {
        title: 'A',
        isAllDay: false,
        start: '2015-05-01T10:20:00',
        end: '2015-05-01T10:40:00',
        category: 'time',
      },
      {
        title: 'B',
        isAllDay: false,
        start: '2015-05-01T10:30:00',
        end: '2015-05-01T11:30:00',
        category: 'time',
      },
      {
        title: 'C',
        isAllDay: false,
        start: '2015-05-01T11:20:00',
        end: '2015-05-01T12:00:00',
        category: 'time',
      },
      {
        title: 'D',
        isAllDay: false,
        start: '2015-05-01T10:50:00',
        end: '2015-05-01T11:10:00',
        category: 'time',
      },
      {
        title: 'E',
        isAllDay: false,
        start: '2015-05-01T13:20:00',
        end: '2015-05-01T13:40:00',
        category: 'time',
      },
      {
        title: 'F',
        isAllDay: false,
        start: '2015-05-01T14:00:00',
        end: '2015-05-01T14:20:00',
        category: 'time',
      },
      {
        title: 'G',
        isAllDay: false,
        start: '2015-05-01T14:10:00',
        end: '2015-05-01T14:20:00',
        category: 'time',
      },
      {
        title: 'H',
        isAllDay: false,
        start: '2015-05-01T16:00:00',
        end: '2015-05-01T18:00:00',
        category: 'time',
      },
      {
        title: 'I',
        isAllDay: false,
        start: '2015-05-01T17:00:00',
        end: '2015-05-01T20:00:00',
        category: 'time',
      },
      {
        title: 'J',
        isAllDay: false,
        start: '2015-05-01T19:00:00',
        end: '2015-05-01T21:00:00',
        category: 'time',
      },
      {
        title: '물고기 밥주기',
        isAllDay: false,
        start: '2015-05-01T22:00:00',
        end: '2015-05-01T22:10:00',
        category: 'time',
      },
    ];
    scheduleList = mockData.map((data) => Schedule.create(data)).sort(array.compare.schedule.asc);
  });

  describe('getCollisionGroup()', () => {
    it('Get collision group properly.', () => {
      actual = getCollisionGroup(scheduleList);
      expected = [
        [
          scheduleList[0].cid(),
          scheduleList[1].cid(),
          scheduleList[2].cid(),
          scheduleList[3].cid(),
        ],
        [scheduleList[4].cid()],
        [scheduleList[5].cid(), scheduleList[6].cid()],
        [scheduleList[7].cid(), scheduleList[8].cid(), scheduleList[9].cid()],
        [scheduleList[10].cid()],
      ];

      expect(actual).toEqual(expected);
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
    let collection: Collection<Schedule>;
    let collisionGroup: CollisionGroup;

    beforeEach(() => {
      collection = new Collection<Schedule>((model) => {
        return model.cid();
      });
      collection.add(...scheduleList);
      collisionGroup = getCollisionGroup(scheduleList);
    });

    it('can calculate matrices accuratly.', () => {
      expected = [
        [[scheduleList[0], scheduleList[1]], [scheduleList[2]], [scheduleList[3]]],
        [[scheduleList[4]]],
        [[scheduleList[5], scheduleList[6]]],
        [[scheduleList[7], scheduleList[8]], [scheduleList[9]]],
        [[scheduleList[10]]],
      ];
      actual = getMatrices(collection, collisionGroup);

      expect(actual).toEqual(expected);
    });
  });

  describe('limitRenderRange', () => {
    let viewModelColl: Collection<ScheduleViewModel>;

    beforeEach(() => {
      viewModelColl = new Collection((viewModel) => {
        return viewModel.cid();
      });
    });

    it('fill renderStarts, renderEnds to each view model in collection.', () => {
      // 5/1 10:20 ~ 5/1 10:40
      viewModelColl.add(ScheduleViewModel.create(scheduleList[0]));

      const limit1 = new TZDate('2015-05-01T10:30:00');
      const limit2 = new TZDate('2015-05-01T10:40:00');

      limitRenderRange(limit1, limit2, viewModelColl);

      const viewModel = viewModelColl.single();

      expect(viewModel).not.toBeNull();

      if (viewModel) {
        expect(viewModel.renderStarts).toEqual(limit1);
        expect(viewModel.renderEnds).toBeUndefined();
      }
    });
  });

  describe('getScheduleInDateRangeFilter', () => {
    let viewModelColl: Collection<ScheduleViewModel>;

    beforeEach(() => {
      viewModelColl = new Collection((viewModel) => {
        return viewModel.cid();
      });
    });

    it('filter schedules properly.', () => {
      let filter;
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
      viewModelColl.add(ScheduleViewModel.create(scheduleList[0]));

      // A: 09:30 ~ 10:10
      d1 = new TZDate('2015-05-01T09:30:00');
      d2 = new TZDate('2015-05-01T10:10:00');
      filter = getScheduleInDateRangeFilter(d1, d2);

      expect(viewModelColl.find(filter).length).toBe(0);

      // B: 09:30 ~ 10:20
      d1 = new TZDate('2015-05-01T09:30:00');
      d2 = new TZDate('2015-05-01T10:20:00');
      filter = getScheduleInDateRangeFilter(d1, d2);

      expect(viewModelColl.find(filter).length).toBe(1);

      // C: 09:30 ~ 10:30
      d1 = new TZDate('2015-05-01T09:30:00');
      d2 = new TZDate('2015-05-01T10:30:00');
      filter = getScheduleInDateRangeFilter(d1, d2);

      expect(viewModelColl.find(filter).length).toBe(1);

      // D: 10:20 ~ 10:30
      d1 = new TZDate('2015-05-01T10:20:00');
      d2 = new TZDate('2015-05-01T10:30:00');
      filter = getScheduleInDateRangeFilter(d1, d2);

      expect(viewModelColl.find(filter).length).toBe(1);

      // E: 10:25 ~ 10:35
      d1 = new TZDate('2015-05-01T10:25:00');
      d2 = new TZDate('2015-05-01T10:35:00');
      filter = getScheduleInDateRangeFilter(d1, d2);

      expect(viewModelColl.find(filter).length).toBe(1);

      // F: 10:30 ~ 10:40
      d1 = new TZDate('2015-05-01T10:30:00');
      d2 = new TZDate('2015-05-01T10:40:00');
      filter = getScheduleInDateRangeFilter(d1, d2);

      expect(viewModelColl.find(filter).length).toBe(1);

      // G: 10:30 ~ 10:50
      d1 = new TZDate('2015-05-01T10:30:00');
      d2 = new TZDate('2015-05-01T10:50:00');
      filter = getScheduleInDateRangeFilter(d1, d2);

      expect(viewModelColl.find(filter).length).toBe(1);

      // H: 10:40 ~ 10:50
      d1 = new TZDate('2015-05-01T10:40:00');
      d2 = new TZDate('2015-05-01T10:50:00');
      filter = getScheduleInDateRangeFilter(d1, d2);

      expect(viewModelColl.find(filter).length).toBe(1);

      // I: 10:50 ~ 10:55
      d1 = new TZDate('2015-05-01T10:50:00');
      d2 = new TZDate('2015-05-01T10:55:00');
      filter = getScheduleInDateRangeFilter(d1, d2);

      expect(viewModelColl.find(filter).length).toBe(0);

      // L: 10:10 ~ 10:50
      d1 = new TZDate('2015-05-01T10:10:00');
      d2 = new TZDate('2015-05-01T10:50:00');
      filter = getScheduleInDateRangeFilter(d1, d2);

      expect(viewModelColl.find(filter).length).toBe(1);
    });
  });
});
