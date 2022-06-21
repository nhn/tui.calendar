import { h } from 'preact';
import { memo } from 'preact/compat';
import { useCallback, useMemo } from 'preact/hooks';

import { Template } from '@src/components/template';
import { addTimeGridPrefix } from '@src/components/timeGrid';
import { NowIndicatorLabel } from '@src/components/timeGrid/nowIndicatorLabel';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { useTZConverter } from '@src/hooks/timezone/useTZConverter';
import {
  showNowIndicatorOptionSelector,
  timezonesCollapsedOptionSelector,
} from '@src/selectors/options';
import { weekTimeGridLeftSelector } from '@src/selectors/theme';
import { timezonesSelector } from '@src/selectors/timezone';
import TZDate from '@src/time/date';
import { addMinutes, setTimeStrToDate } from '@src/time/datetime';
import { isNil, isPresent } from '@src/utils/type';

import type { TimeGridRow } from '@t/grid';
import type { ThemeState } from '@t/theme';

const classNames = {
  timeColumn: addTimeGridPrefix('time-column'),
  hourRows: addTimeGridPrefix('hour-rows'),
  time: addTimeGridPrefix('time'),
  timeLabel: addTimeGridPrefix('time-label'),
  first: addTimeGridPrefix('time-first'),
  last: addTimeGridPrefix('time-last'),
  hidden: addTimeGridPrefix('time-hidden'),
};

interface HourRowsProps {
  rowsInfo: {
    date: TZDate;
    top: number;
    className: string;
    diffFromPrimaryTimezone?: number;
  }[];
  isPrimary: boolean;
  borderRight?: string;
  width: number;
  nowIndicatorState: {
    top: number;
    now: TZDate;
  } | null;
}

function backgroundColorSelector(theme: ThemeState) {
  return {
    primaryTimezoneBackgroundColor: theme.week.timeGridLeft.backgroundColor,
    subTimezoneBackgroundColor: theme.week.timeGridLeftAdditionalTimezone.backgroundColor,
  };
}

function timeColorSelector(theme: ThemeState) {
  return {
    pastTimeColor: theme.week.pastTime.color,
    futureTimeColor: theme.week.futureTime.color,
  };
}

function HourRows({ rowsInfo, isPrimary, borderRight, width, nowIndicatorState }: HourRowsProps) {
  const showNowIndicator = useStore(showNowIndicatorOptionSelector);
  const { primaryTimezoneBackgroundColor, subTimezoneBackgroundColor } =
    useTheme(backgroundColorSelector);
  const { pastTimeColor, futureTimeColor } = useTheme(timeColorSelector);
  const zonedNow = isPresent(nowIndicatorState)
    ? addMinutes(nowIndicatorState.now, rowsInfo[0].diffFromPrimaryTimezone ?? 0)
    : null;

  const backgroundColor = isPrimary ? primaryTimezoneBackgroundColor : subTimezoneBackgroundColor;

  return (
    <div
      role="rowgroup"
      className={cls(classNames.hourRows)}
      style={{ width: toPercent(width), borderRight, backgroundColor }}
    >
      {rowsInfo.map(({ date, top, className }) => {
        const isPast = isPresent(zonedNow) && date < zonedNow;
        const color = isPast ? pastTimeColor : futureTimeColor;

        return (
          <div
            key={date.getTime()}
            className={className}
            style={{
              top: toPercent(top),
              color,
            }}
            role="row"
          >
            <Template
              template={`timegridDisplay${isPrimary ? 'Primary' : ''}Time`}
              param={{ time: date }}
              as="span"
            />
          </div>
        );
      })}
      {showNowIndicator && isPresent(nowIndicatorState) && isPresent(zonedNow) && (
        <NowIndicatorLabel
          unit="hour"
          top={nowIndicatorState.top}
          now={nowIndicatorState.now}
          zonedNow={zonedNow}
        />
      )}
    </div>
  );
}

interface Props {
  timeGridRows: TimeGridRow[];
  nowIndicatorState: { top: number; now: TZDate } | null;
}

export const TimeColumn = memo(function TimeColumn({ timeGridRows, nowIndicatorState }: Props) {
  const showNowIndicator = useStore(showNowIndicatorOptionSelector);
  const timezones = useStore(timezonesSelector);
  const timezonesCollapsed = useStore(timezonesCollapsedOptionSelector);

  const tzConverter = useTZConverter();
  const { width, borderRight } = useTheme(weekTimeGridLeftSelector);

  const rowsByHour = useMemo(
    () => timeGridRows.filter((_, index) => index % 2 === 0 || index === timeGridRows.length - 1),
    [timeGridRows]
  );
  const hourRowsPropsMapper = useCallback(
    (row: TimeGridRow, index: number, diffFromPrimaryTimezone?: number) => {
      const shouldHideRow = ({ top: rowTop, height: rowHeight }: TimeGridRow) => {
        if (!showNowIndicator || isNil(nowIndicatorState)) {
          return false;
        }

        const indicatorTop = nowIndicatorState.top;

        return rowTop - rowHeight <= indicatorTop && indicatorTop <= rowTop + rowHeight;
      };

      const isFirst = index === 0;
      const isLast = index === rowsByHour.length - 1;
      const className = cls(classNames.time, {
        [classNames.first]: isFirst,
        [classNames.last]: isLast,
        [classNames.hidden]: shouldHideRow(row),
      });
      let date = setTimeStrToDate(new TZDate(), isLast ? row.endTime : row.startTime);
      if (isPresent(diffFromPrimaryTimezone)) {
        date = addMinutes(date, diffFromPrimaryTimezone);
      }

      return {
        date,
        top: row.top,
        className,
        diffFromPrimaryTimezone,
      };
    },
    [rowsByHour, nowIndicatorState, showNowIndicator]
  );

  const [primaryTimezone, ...otherTimezones] = timezones;
  const hourRowsWidth = otherTimezones.length > 0 ? 100 / (otherTimezones.length + 1) : 100;
  const primaryTimezoneHourRowsProps = rowsByHour.map((row, index) =>
    hourRowsPropsMapper(row, index)
  );
  const otherTimezoneHourRowsProps = useMemo(() => {
    if (otherTimezones.length === 0) {
      return [];
    }

    return otherTimezones.reverse().map((timezone) => {
      const { timezoneName } = timezone;
      const primaryTimezoneOffset = tzConverter(primaryTimezone.timezoneName).getTimezoneOffset();
      const currentTimezoneOffset = tzConverter(timezoneName).getTimezoneOffset();
      const diffFromPrimaryTimezone = currentTimezoneOffset - primaryTimezoneOffset;

      return rowsByHour.map((row, index) =>
        hourRowsPropsMapper(row, index, diffFromPrimaryTimezone)
      );
    });
  }, [hourRowsPropsMapper, otherTimezones, primaryTimezone, rowsByHour, tzConverter]);

  return (
    <div
      className={cls(classNames.timeColumn)}
      style={{ width }}
      data-testid="timegrid-time-column"
    >
      {!timezonesCollapsed &&
        otherTimezoneHourRowsProps.map((rowsInfo) => (
          <HourRows
            key={rowsInfo[0].diffFromPrimaryTimezone}
            rowsInfo={rowsInfo}
            isPrimary={false}
            borderRight={borderRight}
            width={hourRowsWidth}
            nowIndicatorState={nowIndicatorState}
          />
        ))}
      <HourRows
        rowsInfo={primaryTimezoneHourRowsProps}
        isPrimary={true}
        borderRight={borderRight}
        width={timezonesCollapsed ? 100 : hourRowsWidth}
        nowIndicatorState={nowIndicatorState}
      />
    </div>
  );
});
