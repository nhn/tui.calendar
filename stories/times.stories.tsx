import { h, RenderableProps } from 'preact';
import range from 'tui-code-snippet/array/range';

import { Times } from '@src/components/timegrid/times';
import TZDate from '@src/time/date';
import {
  format,
  addDate,
  addMonth,
  toStartOfMonth,
  toStartOfYear,
  addYear,
  addMinutes
} from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import extend from 'tui-code-snippet/object/extend';
import { MultipleTimezones } from '@src/components/timegrid/multipleTimezones';

export default {
  title: 'Times'
};

interface WrapperProps {
  style?: Record<string, any>;
  width: number;
  position: string;
}

function Wrapper({ children, style, width, position }: RenderableProps<WrapperProps>) {
  return (
    <div className={cls('layout')} style={extend({ width, position }, style)}>
      {children}
    </div>
  );
}

Wrapper.defaultProps = {
  position: 'relative',
  width: 200
};

export const minutesInAnHour = () => {
  const now = new TZDate();
  now.setMinutes(0, 0, 0);

  const times = range(0, 60, 10).map(minutes => {
    const d = addMinutes(now, minutes);
    const display = format(d, 'HH:mm');

    return {
      date: d,
      display
    };
  });

  return (
    <Wrapper>
      <Times
        unit="minute"
        times={times}
        showCurrentTime
        currentTime={new TZDate()}
        showFirst
        showLast
      />
    </Wrapper>
  );
};
minutesInAnHour.story = {
  name: 'Every 10 mins in an hour'
};

export const hoursInADay = () => (
  <Wrapper>
    <Times showCurrentTime currentTime={new TZDate()} />
  </Wrapper>
);
hoursInADay.story = {
  name: '24 hours'
};

export const hoursInOfficeHour = () => (
  <Wrapper>
    <Times start={9} end={18} showFirst showLast showCurrentTime />
  </Wrapper>
);
hoursInOfficeHour.story = {
  name: 'From 9 to 18 hour'
};

export const datesInAWeek = () => {
  const month = addDate(new TZDate(), -3);
  const times = range(0, 8).map(date => {
    const d = addDate(month, date);
    const display = format(d, 'MM.DD');

    return {
      date: d,
      display
    };
  });

  return (
    <Wrapper>
      <Times
        unit="date"
        times={times}
        showCurrentTime
        currentTime={new TZDate()}
        showFirst
        showLast
      />
    </Wrapper>
  );
};
datesInAWeek.story = {
  name: 'Dates in a week'
};

export const datesInAMonth = () => {
  const month = toStartOfMonth(new TZDate());
  const times = range(0, 30).map(date => {
    const d = addDate(month, date);
    const display = format(d, 'MM.DD');

    return {
      date: d,
      display
    };
  });

  return (
    <Wrapper>
      <Times
        unit="date"
        times={times}
        showCurrentTime
        currentTime={new TZDate()}
        showFirst
        showLast
      />
    </Wrapper>
  );
};

datesInAMonth.story = {
  name: 'Dates in a month'
};

export const monthsInAnYear = () => {
  const startOfYear = toStartOfYear(new TZDate());
  const times = range(0, 13).map(month => {
    const d = addMonth(startOfYear, month);
    const display = format(d, 'MM.DD');

    return {
      date: d,
      display
    };
  });

  return (
    <Wrapper>
      <Times unit="month" times={times} showCurrentTime currentTime={new TZDate()} showFirst />
    </Wrapper>
  );
};
monthsInAnYear.story = {
  name: 'Months in an year'
};

export const yearsInDecade = () => {
  const startOfYear = toStartOfYear(new TZDate());
  const times = range(0, 11).map(year => {
    const d = addYear(startOfYear, year);
    const display = format(d, 'YYYY');

    return {
      date: d,
      display
    };
  });

  const currentTime = new TZDate('2022-03-24T10:10:10');

  return (
    <Wrapper>
      <Times
        unit="year"
        times={times}
        showCurrentTime
        currentTime={currentTime}
        showFirst
        showLast
      />
    </Wrapper>
  );
};
yearsInDecade.story = {
  name: 'An year in 10 years'
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
    },
    {
      timezoneOffset: 0,
      displayLabel: 'GMT+0',
      tooltip: 'GMT'
    }
  ];

  return (
    <Wrapper style={{ height: '500px', width: '300px' }}>
      <MultipleTimezones timezones={timezones} showTimezoneLabel={timezones.length > 1} />
    </Wrapper>
  );
};
