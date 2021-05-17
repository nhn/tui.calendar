import { millisecondsFrom, MILLISECONDS_SCHEDULE_MIN_DURATION } from '@src/time/datetime';

type CollisionParam = {
  start: number;
  end: number;
  targetStart: number;
  targetEnd: number;
  goingDuration: number;
  comingDuration: number;
  targetGoingDuration: number;
  targetComingDuration: number;
  usingTravelTime: boolean;
};

function hasCollision(start: number, end: number, targetStart: number, targetEnd: number) {
  return (
    (targetStart > start && targetStart < end) ||
    (targetEnd > start && targetEnd < end) ||
    (targetStart <= start && targetEnd >= end)
  );
}

export function collidesWith({
  start,
  end,
  targetStart,
  targetEnd,
  goingDuration,
  comingDuration,
  targetGoingDuration,
  targetComingDuration,
  usingTravelTime,
}: CollisionParam) {
  if (Math.abs(end - start) < MILLISECONDS_SCHEDULE_MIN_DURATION) {
    end += MILLISECONDS_SCHEDULE_MIN_DURATION;
  }

  if (Math.abs(end - start) < MILLISECONDS_SCHEDULE_MIN_DURATION) {
    end += MILLISECONDS_SCHEDULE_MIN_DURATION;
  }

  if (usingTravelTime) {
    start -= millisecondsFrom('minute', goingDuration);
    end += millisecondsFrom('minute', comingDuration);
    targetStart -= millisecondsFrom('minute', targetGoingDuration);
    targetEnd += millisecondsFrom('minute', targetComingDuration);
  }

  if (hasCollision(start, end, targetStart, targetEnd)) {
    return true;
  }

  return false;
}
