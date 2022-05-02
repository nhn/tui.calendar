import { createEventCollection } from '@src/controller/base';
import type EventModel from '@src/model/eventModel';
import { millisecondsFrom, MS_EVENT_MIN_DURATION } from '@src/time/datetime';
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
    timedEvents = createEventCollection(),
    totalEvents = createEventCollection(),
  }: Record<
    'timedEvents' | 'totalEvents',
    Collection<EventModel>
  > = visibleEventsCollection.groupBy((eventModel) =>
    eventModel.category === 'time' ? 'timedEvents' : 'totalEvents'
  );

  timedEvents.each((eventModel) => {
    const clonedEventModel = clone(eventModel);
    clonedEventModel.start = clonedEventModel.start.tz(timezoneName);
    clonedEventModel.end = clonedEventModel.end.tz(timezoneName);
    totalEvents.add(clonedEventModel);
  });

  return totalEvents;
}
