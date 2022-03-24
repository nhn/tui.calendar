import { createEventCollection } from '@src/controller/base';
import EventModel from '@src/model/eventModel';
import { millisecondsFrom, MS_EVENT_MIN_DURATION } from '@src/time/datetime';
import Collection from '@src/utils/collection';

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
  if (Math.abs(end - start) < MS_EVENT_MIN_DURATION) {
    end += MS_EVENT_MIN_DURATION;
  }

  if (Math.abs(end - start) < MS_EVENT_MIN_DURATION) {
    end += MS_EVENT_MIN_DURATION;
  }

  if (usingTravelTime) {
    start -= millisecondsFrom('minute', goingDuration);
    end += millisecondsFrom('minute', comingDuration);
    targetStart -= millisecondsFrom('minute', targetGoingDuration);
    targetEnd += millisecondsFrom('minute', targetComingDuration);
  }

  return hasCollision(start, end, targetStart, targetEnd);
}

export function isSameEvent(event: EventModel, eventId: string, calendarId: string) {
  return event.id === eventId && event.calendarId === calendarId;
}

export function isVisibleEvent(event: EventModel) {
  return event.isVisible;
}

export function getVisibleEventCollection(events: Collection<EventModel>) {
  const visibleEvents = events.toArray().filter((eventModel) => eventModel.isVisible);

  return createEventCollection<EventModel>(...visibleEvents);
}
