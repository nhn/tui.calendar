import TZDate from '@src/time/date';
import { collidesWith } from '@src/util/events';
import { createDate } from '@test/helper';

describe('events util', () => {
  describe('collidesWith', () => {
    it('should check for conflicts for the date', () => {
      const hasCollision = collidesWith({
        start: Number(createDate(2021, 5, 14)),
        end: Number(createDate(2021, 5, 16)),
        targetStart: Number(createDate(2021, 5, 15)),
        targetEnd: Number(createDate(2021, 5, 17)),
        goingDuration: 0,
        comingDuration: 30,
        targetGoingDuration: 0,
        targetComingDuration: 30,
      });
      expect(hasCollision).toBe(true);
    });

    it('should check for conflicts for the time', () => {
      const hasCollision = collidesWith({
        start: Number(new TZDate(2021, 4, 16, 9)),
        end: Number(new TZDate(2021, 4, 16, 10)),
        targetStart: Number(new TZDate(2021, 4, 16, 11)),
        targetEnd: Number(new TZDate(2021, 4, 16, 12)),
        goingDuration: 30,
        comingDuration: 60,
        targetGoingDuration: 30,
        targetComingDuration: 30,
      });
      expect(hasCollision).toBe(true);
    });
  });
});
