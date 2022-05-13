import { h } from 'preact';

import range from 'tui-code-snippet/array/range';

import { Times } from '@src/components/timeGrid/times';
import TZDate from '@src/time/date';
import {
  addDate,
  addMinutes,
  addMonths,
  addYear,
  toFormat,
  toStartOfMonth,
  toStartOfYear,
} from '@src/time/datetime';

import { ProviderWrapper } from '@stories/util/providerWrapper';

export default { title: 'Components/Times', component: Times };

export const minutesInAnHour = () => {
  const now = new TZDate();
  now.setMinutes(0, 0, 0);

  const times = range(0, 60, 10).map((minutes) => {
    const d = addMinutes(now, minutes);
    const display = toFormat(d, 'HH:mm');

    return {
      date: d,
      display,
    };
  });

  return (
    <ProviderWrapper>
      <Times
        unit="minute"
        times={times}
        showCurrentTime
        currentTime={new TZDate()}
        showFirst
        showLast
      />
    </ProviderWrapper>
  );
};
minutesInAnHour.storyName = 'Every 10 mins in an hour';

export const hoursInADay = () => (
  <ProviderWrapper>
    <Times showCurrentTime currentTime={new TZDate()} />
  </ProviderWrapper>
);
hoursInADay.storyName = '24 hours';

export const hoursInOfficeHour = () => (
  <ProviderWrapper>
    <Times start={9} end={18} showFirst showLast showCurrentTime />
  </ProviderWrapper>
);
hoursInOfficeHour.storyName = 'From 9 to 18 hour';

export const datesInAWeek = () => {
  const month = addDate(new TZDate(), -3);
  const times = range(0, 8).map((date) => {
    const d = addDate(month, date);
    const display = toFormat(d, 'MM.DD');

    return {
      date: d,
      display,
    };
  });

  return (
    <ProviderWrapper>
      <Times
        unit="date"
        times={times}
        showCurrentTime
        currentTime={new TZDate()}
        showFirst
        showLast
      />
    </ProviderWrapper>
  );
};
datesInAWeek.storyName = 'Dates in a week';

export const datesInAMonth = () => {
  const month = toStartOfMonth(new TZDate());
  const times = range(0, 30).map((date) => {
    const d = addDate(month, date);
    const display = toFormat(d, 'MM.DD');

    return {
      date: d,
      display,
    };
  });

  return (
    <ProviderWrapper>
      <Times
        unit="date"
        times={times}
        showCurrentTime
        currentTime={new TZDate()}
        showFirst
        showLast
      />
    </ProviderWrapper>
  );
};

datesInAMonth.storyName = 'Dates in a month';

export const monthsInAnYear = () => {
  const startOfYear = toStartOfYear(new TZDate());
  const times = range(0, 13).map((month) => {
    const d = addMonths(startOfYear, month);
    const display = toFormat(d, 'MM.DD');

    return {
      date: d,
      display,
    };
  });

  return (
    <ProviderWrapper>
      <Times unit="month" times={times} showCurrentTime currentTime={new TZDate()} showFirst />
    </ProviderWrapper>
  );
};
monthsInAnYear.storyName = 'Months in an year';

export const yearsInDecade = () => {
  const startOfYear = toStartOfYear(new TZDate());
  const times = range(0, 11).map((year) => {
    const d = addYear(startOfYear, year);
    const display = toFormat(d, 'YYYY');

    return {
      date: d,
      display,
    };
  });

  const currentTime = new TZDate('2022-03-24T10:10:10');

  return (
    <ProviderWrapper>
      <Times
        unit="year"
        times={times}
        showCurrentTime
        currentTime={currentTime}
        showFirst
        showLast
      />
    </ProviderWrapper>
  );
};
yearsInDecade.storyName = 'An year in 10 years';
