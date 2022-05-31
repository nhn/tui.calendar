import Chance from 'chance';
import moment from 'moment-timezone';

import { createDateMatrixOfMonth } from '@src/helpers/grid';
import EventModel from '@src/model/eventModel';
import type TZDate from '@src/time/date';

import { calendars } from '@stories/util/mockCalendars';

import type { EventCategory, EventObject } from '@t/events';
import type { CalendarInfo, ViewType } from '@t/options';

const chance = new Chance();
const EVENT_CATEGORY: EventCategory[] = ['milestone', 'task'];

// eslint-disable-next-line complexity
function createTime(event: EventObject, renderStart: TZDate, renderEnd: TZDate) {
  const startDate = moment(renderStart.getTime());
  let endDate = moment(renderEnd.getTime());
  const diffDate = endDate.diff(startDate, 'days');

  event.isAllday = chance.bool({ likelihood: 30 });
  if (event.isAllday) {
    event.category = 'allday';
  } else if (chance.bool({ likelihood: 30 })) {
    event.category = EVENT_CATEGORY[chance.integer({ min: 0, max: 1 })];
    if (event.category === EVENT_CATEGORY[1]) {
      event.dueDateClass = 'morning';
    }
  } else {
    event.category = 'time';
  }

  startDate.add(chance.integer({ min: 0, max: diffDate }), 'days');
  startDate.hours(chance.integer({ min: 0, max: 23 }));
  startDate.minutes(chance.bool() ? 0 : 30);
  event.start = startDate.toDate();

  endDate = moment(startDate);
  if (event.isAllday) {
    endDate.add(chance.integer({ min: 0, max: 3 }), 'days');
  }

  event.end = endDate.add(chance.integer({ min: 1, max: 4 }), 'hour').toDate();

  if (!event.isAllday && chance.bool({ likelihood: 20 })) {
    event.goingDuration = chance.integer({ min: 30, max: 120 });
    event.comingDuration = chance.integer({ min: 30, max: 120 });

    if (chance.bool({ likelihood: 50 })) {
      event.end = event.start;
    }
  }
}

function createNames() {
  const names = [];
  const length = chance.integer({ min: 1, max: 10 });

  for (let i = 0; i < length; i += 1) {
    names.push(chance.name());
  }

  return names;
}

function createRandomEvent(calendar: CalendarInfo, renderStart: TZDate, renderEnd: TZDate) {
  const event: EventObject = {
    raw: {
      creator: {},
    },
  };

  event.id = chance.guid();
  event.calendarId = calendar.id;

  event.title = chance.sentence({ words: 3 });
  event.body = chance.bool({ likelihood: 20 }) ? chance.sentence({ words: 10 }) : '';
  event.isReadOnly = chance.bool({ likelihood: 20 });
  createTime(event, renderStart, renderEnd);

  event.isPrivate = chance.bool({ likelihood: 10 });
  event.location = chance.address();
  event.attendees = chance.bool({ likelihood: 70 }) ? createNames() : [];
  event.recurrenceRule = chance.bool({ likelihood: 20 }) ? 'repeated events' : '';

  event.color = calendar.color;
  event.backgroundColor = calendar.backgroundColor;
  event.dragBackgroundColor = calendar.dragBackgroundColor;
  event.borderColor = calendar.borderColor;

  if (event.category === 'milestone') {
    event.color = event.backgroundColor;
    event.backgroundColor = 'transparent';
    event.dragBackgroundColor = 'transparent';
    event.borderColor = 'transparent';
  }

  event.raw.memo = chance.sentence();
  event.raw.creator.name = chance.name();
  event.raw.creator.avatar = chance.avatar();
  event.raw.creator.company = chance.company();
  event.raw.creator.email = chance.email();
  event.raw.creator.phone = chance.phone();

  if (chance.bool({ likelihood: 20 })) {
    const travelTime = chance.minute();
    event.goingDuration = travelTime;
    event.comingDuration = travelTime;
  }

  return event;
}

const defaultEventCount = { month: 3, week: 10, day: 4 };

export function createRandomEvents(
  viewName: ViewType,
  renderStart: TZDate,
  renderEnd: TZDate,
  eventCount?: number
) {
  const view = viewName ?? 'week';
  const events: EventObject[] = [];
  const count = eventCount ?? defaultEventCount[view];

  calendars.forEach((calendar) => {
    for (let i = 0; i < count; i += 1) {
      const event = createRandomEvent(calendar, renderStart, renderEnd);
      events.push(event);
    }
  });

  return events;
}

export function createRandomEventModelsForMonth(length = defaultEventCount.month) {
  const calendar = createDateMatrixOfMonth(new Date(), {});
  const data = createRandomEvents(
    'month',
    calendar[0][0],
    calendar[calendar.length - 1][6],
    length
  );

  return data.map((event: EventObject) => new EventModel(event));
}
