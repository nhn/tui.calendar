import { h, RenderableProps } from 'preact';
import range from 'tui-code-snippet/array/range';

import { TimeGrid } from '@src/components/timegrid/timegrid';
import { cls } from '@src/util/cssHelper';
import { ScheduleData } from '@src/model';
import { addHours, toStartOfDay, addDate } from '@src/time/datetime';
import TZDate from '@src/time/date';
import normalEvents from '@stories/data/events.json';
import { createRandomEvents } from '@stories/util/randomEvents';
import { createEventModels } from '@stories/helper/event';

export default { title: 'TimeGrid' };

function Wrapper({ children }: RenderableProps<any>) {
  return (
    <div className={cls('layout')} style={{ overflow: 'hidden', height: '100%' }}>
      {children}
    </div>
  );
}

function toThisWeek(date: TZDate) {
  const today = toStartOfDay(new TZDate());
  const adjustForWeekStart = today.getDay();
  const day = date.getDay();

  date.setFullYear(today.getFullYear(), today.getMonth(), today.getDate() - adjustForWeekStart);

  return addDate(date, day);
}

function getNormalEvents() {
  return normalEvents.map((event) => {
    const start = toThisWeek(new TZDate(event.start));
    const end = toThisWeek(new TZDate(event.end));

    return {
      ...event,
      start,
      end,
    };
  });
}

function getEvents() {
  const start = toStartOfDay(new TZDate());
  const adjustForWeekStart = start.getDay();
  const disabledAMEvents: ScheduleData[] = range(0, 7).map((date) => {
    const eventStart = addDate(start, date - adjustForWeekStart);

    return {
      category: 'background',
      start: eventStart,
      end: addHours(eventStart, 9),
      bgColor: 'rgba(100, 100, 100, .3)',
    };
  });
  const disabledPMEvents: ScheduleData[] = range(0, 7).map((date) => {
    const eventStart = addDate(start, date - adjustForWeekStart);

    return {
      category: 'background',
      start: addHours(eventStart, 18),
      end: addHours(eventStart, 24),
      bgColor: 'rgba(100, 100, 100, .3)',
    };
  });
  const disabledLunchEvents: ScheduleData[] = range(0, 7).map((date) => {
    const eventStart = addDate(start, date - adjustForWeekStart);

    return {
      category: 'background',
      start: addHours(eventStart, 12),
      end: addHours(eventStart, 13),
      bgColor: 'rgba(23, 255, 100, .3)',
    };
  });
  const data: ScheduleData[] = disabledAMEvents.concat(
    disabledPMEvents,
    disabledLunchEvents,
    getNormalEvents()
  );

  return createEventModels(data);
}

export const basic = () => {
  const events = getEvents();

  return (
    <Wrapper>
      <TimeGrid events={events} />
    </Wrapper>
  );
};

export const randomEvents = () => {
  const today = new TZDate();
  const start = addDate(new TZDate(), -today.getDay());
  const end = addDate(start, 6);
  const data: ScheduleData[] = createRandomEvents('week', start, end);
  const eventModels = createEventModels(data);

  return (
    <Wrapper>
      <TimeGrid events={eventModels} />
    </Wrapper>
  );
};

export const multipleTimezones = () => {
  const timezones = [
    {
      displayLabel: 'Local Time',
      tooltip: 'Local',
    },
    {
      timezoneOffset: 420,
      displayLabel: 'GMT-08:00',
      tooltip: 'Los Angeles',
    },
    {
      timezoneOffset: -180,
      displayLabel: 'GMT+3',
      tooltip: 'Moscow Standard Time',
    },
  ];

  const eventModels = getEvents();

  return (
    <Wrapper>
      <TimeGrid timezones={timezones} timesWidth={60} events={eventModels} />
    </Wrapper>
  );
};
multipleTimezones.story = {
  name: 'Multiple timezones',
};
