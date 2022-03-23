import { collidesWith } from '@src/helpers/events';
import { createDate } from '@src/test/helpers';
import TZDate from '@src/time/date';

describe('collidesWith', () => {
  it('should calculate collision only from start and end dates, if travel time is not used', () => {
    const hasCollision = collidesWith({
      start: Number(createDate(2021, 5, 14)),
      end: Number(createDate(2021, 5, 16)),
      targetStart: Number(createDate(2021, 5, 16)),
      targetEnd: Number(createDate(2021, 5, 17)),
      goingDuration: 0,
      comingDuration: 30,
      targetGoingDuration: 30,
      targetComingDuration: 0,
      usingTravelTime: false,
    });

    expect(hasCollision).toBe(false);
  });

  it('should calculate collision with start time, end time and travel time, when using travel time (for date)', () => {
    const hasCollision = collidesWith({
      start: Number(createDate(2021, 5, 14)),
      end: Number(createDate(2021, 5, 16)),
      targetStart: Number(createDate(2021, 5, 16)),
      targetEnd: Number(createDate(2021, 5, 17)),
      goingDuration: 0,
      comingDuration: 30,
      targetGoingDuration: 30,
      targetComingDuration: 3,
      usingTravelTime: true,
    });
    expect(hasCollision).toBe(true);
  });

  it('should calculate collision with start time, end time and travel time, when using travel time (for time)', () => {
    const hasCollision = collidesWith({
      start: Number(new TZDate(2021, 4, 16, 9)),
      end: Number(new TZDate(2021, 4, 16, 10)),
      targetStart: Number(new TZDate(2021, 4, 16, 11)),
      targetEnd: Number(new TZDate(2021, 4, 16, 12)),
      goingDuration: 30,
      comingDuration: 60,
      targetGoingDuration: 30,
      targetComingDuration: 30,
      usingTravelTime: true,
    });
    expect(hasCollision).toBe(true);
  });

  it('should not have a collision when there is no overlap between two times', () => {
    const hasCollision = collidesWith({
      start: Number(new TZDate(2021, 4, 16, 9)),
      end: Number(new TZDate(2021, 4, 16, 10)),
      targetStart: Number(new TZDate(2021, 4, 16, 11)),
      targetEnd: Number(new TZDate(2021, 4, 16, 12)),
      goingDuration: 30,
      comingDuration: 0,
      targetGoingDuration: 0,
      targetComingDuration: 30,
      usingTravelTime: true,
    });

    expect(hasCollision).toBe(false);
  });
});
