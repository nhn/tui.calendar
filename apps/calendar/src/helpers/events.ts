import { createEventCollection } from '@src/controller/base';
import type EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';
import { millisecondsFrom, MS_EVENT_MIN_DURATION } from '@src/time/datetime';
import { calculateTimezoneOffset } from '@src/time/timezone';
import type Collection from '@src/utils/collection';

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

export function getVisibleEventCollection(
  events: Collection<EventModel>,
  timezoneName: string | 'Local' = 'Local'
) {
  const visibleEvents = events.toArray().filter((eventModel) => eventModel.isVisible);

  if (timezoneName !== 'Local') {
    const localTimezoneOffset = new Date().getTimezoneOffset();

    visibleEvents.forEach((eventModel) => {
      const startOffset =
        localTimezoneOffset - calculateTimezoneOffset(eventModel.start, timezoneName);
      const endOffset = localTimezoneOffset - calculateTimezoneOffset(eventModel.end, timezoneName);
      eventModel.start = new TZDate(eventModel.start.getTime() + startOffset * 60 * 1000);
      eventModel.end = new TZDate(eventModel.end.getTime() + endOffset * 60 * 1000);
    });
  }

  return createEventCollection<EventModel>(...visibleEvents);
}
