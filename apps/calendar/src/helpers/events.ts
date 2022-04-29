import type EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';
import { millisecondsFrom, MS_EVENT_MIN_DURATION, MS_PER_MINUTES } from '@src/time/datetime';
import { calculateTimezoneOffset, getLocalTimezoneOffset } from '@src/time/timezone';
import type Collection from '@src/utils/collection';
import { clone } from '@src/utils/object';

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
  const visibleEventsCollection = events.filter((eventModel) => eventModel.isVisible);

  if (timezoneName === 'Local' || visibleEventsCollection.size === 0) {
    return visibleEventsCollection;
  }

  const {
    timedEvents,
    totalEvents,
  }: Record<
    'timedEvents' | 'totalEvents',
    Collection<EventModel>
  > = visibleEventsCollection.groupBy((eventModel) =>
    eventModel.category === 'time' ? 'timedEvents' : 'totalEvents'
  );

  const localTimezoneOffset = getLocalTimezoneOffset();

  timedEvents.each((eventModel) => {
    const startOffset =
      localTimezoneOffset - calculateTimezoneOffset(eventModel.start, timezoneName);
    const endOffset = localTimezoneOffset - calculateTimezoneOffset(eventModel.end, timezoneName);

    const clonedEventModel = clone(eventModel);
    clonedEventModel.start = new TZDate(eventModel.start.getTime() - startOffset * MS_PER_MINUTES);
    clonedEventModel.end = new TZDate(eventModel.end.getTime() - endOffset * MS_PER_MINUTES);
    totalEvents.add(clonedEventModel);
  });

  return totalEvents;
}
