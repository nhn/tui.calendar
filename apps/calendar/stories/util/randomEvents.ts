import Chance from 'chance';
import moment from 'moment-timezone';
import TZDate from '@src/time/date';
import { ScheduleData, ViewType, CalendarData } from '@src/model';
import { calendars } from '@stories/util/mockCalendars';
import { ScheduleCategory } from '@src/model/schedule';

const chance = new Chance();
const EVENT_CATEGORY: ScheduleCategory[] = ['milestone', 'task'];

// eslint-disable-next-line complexity
function generateTime(event: ScheduleData, renderStart: TZDate, renderEnd: TZDate) {
  const startDate = moment(renderStart.getTime());
  let endDate = moment(renderEnd.getTime());
  const diffDate = endDate.diff(startDate, 'days');

  event.isAllDay = chance.bool({ likelihood: 30 });
  if (event.isAllDay) {
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
  if (event.isAllDay) {
    endDate.add(chance.integer({ min: 0, max: 3 }), 'days');
  }

  event.end = endDate.add(chance.integer({ min: 1, max: 4 }), 'hour').toDate();

  if (!event.isAllDay && chance.bool({ likelihood: 20 })) {
    event.goingDuration = chance.integer({ min: 30, max: 120 });
    event.comingDuration = chance.integer({ min: 30, max: 120 });

    if (chance.bool({ likelihood: 50 })) {
      event.end = event.start;
    }
  }
}

function generateNames() {
  const names = [];
  const length = chance.integer({ min: 1, max: 10 });

  for (let i = 0; i < length; i += 1) {
    names.push(chance.name());
  }

  return names;
}

function generateRandomEvent(calendar: CalendarData, renderStart: TZDate, renderEnd: TZDate) {
  const event: ScheduleData = {
    raw: {
      creator: {},
    },
  };

  event.id = chance.guid();
  event.calendarId = calendar.id;

  event.title = chance.sentence({ words: 3 });
  event.body = chance.bool({ likelihood: 20 }) ? chance.sentence({ words: 10 }) : '';
  event.isReadOnly = chance.bool({ likelihood: 20 });
  generateTime(event, renderStart, renderEnd);

  event.isPrivate = chance.bool({ likelihood: 10 });
  event.location = chance.address();
  event.attendees = chance.bool({ likelihood: 70 }) ? generateNames() : [];
  event.recurrenceRule = chance.bool({ likelihood: 20 }) ? 'repeated events' : '';

  event.color = calendar.color;
  event.bgColor = calendar.bgColor;
  event.dragBgColor = calendar.dragBgColor;
  event.borderColor = calendar.borderColor;

  if (event.category === 'milestone') {
    event.color = event.bgColor;
    event.bgColor = 'transparent';
    event.dragBgColor = 'transparent';
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

export function generateRandomEvents(
  viewName: ViewType = 'week',
  renderStart: TZDate,
  renderEnd: TZDate
) {
  const events: ScheduleData[] = [];

  calendars.forEach((calendar) => {
    let length = 10;
    if (viewName === 'month') {
      length = 3;
    } else if (viewName === 'day') {
      length = 4;
    }
    for (let i = 0; i < length; i += 1) {
      const event = generateRandomEvent(calendar, renderStart, renderEnd);
      events.push(event);
    }
  });

  return events;
}
