import { h, RenderableProps } from 'preact';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { cls } from '@src/util/cssHelper';
import { ScheduleData } from '@src/model';
import Schedule from '@src/model/schedule';
import { addHours, toStartOfDay, addDate } from '@src/time/datetime';
import TZDate from '@src/time/date';
import range from 'tui-code-snippet/array/range';

export default { title: 'TimeGrid' };

function Wrapper({ children }: RenderableProps<any>) {
  return (
    <div className={cls('layout')} style={{ overflow: 'hidden', height: '600px' }}>
      {children}
    </div>
  );
}

export const basic = () => {
  return (
    <Wrapper>
      <TimeGrid />
    </Wrapper>
  );
};

export const multipleTimezones = () => {
  const timezones = [
    {
      displayLabel: 'Local Time',
      tooltip: 'Local'
    },
    {
      timezoneOffset: 420,
      displayLabel: 'GMT-08:00',
      tooltip: 'Los Angeles'
    },
    {
      timezoneOffset: -180,
      displayLabel: 'GMT+3',
      tooltip: 'Moscow Standard Time'
    }
  ];

  const start = toStartOfDay(new TZDate());
  const disabledAMEvents: ScheduleData[] = range(0, 7).map(date => {
    return {
      category: 'background',
      start: addDate(start, date),
      end: addHours(addDate(start, date), 9),
      bgColor: 'rgba(100, 100, 100, .3)'
    };
  });
  const disabledPMEvents: ScheduleData[] = range(0, 7).map(date => {
    return {
      category: 'background',
      start: addHours(addDate(start, date), 18),
      end: addHours(addDate(start, date), 24),
      bgColor: 'rgba(100, 100, 100, .3)'
    };
  });
  const disabledLunchEvents: ScheduleData[] = range(0, 7).map(date => {
    return {
      category: 'background',
      start: addHours(addDate(start, date), 12),
      end: addHours(addDate(start, date), 13),
      bgColor: 'rgba(23, 255, 100, .3)'
    };
  });
  const data: ScheduleData[] = disabledAMEvents.concat(disabledPMEvents, disabledLunchEvents);
  const events = data.map((event: ScheduleData) => Schedule.create(event));

  return (
    <Wrapper>
      <TimeGrid timezones={timezones} timesWidth={60} events={events} />
    </Wrapper>
  );
};
multipleTimezones.story = {
  name: 'Multiple timezones'
};
