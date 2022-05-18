import { h } from 'preact';
import { memo } from 'preact/compat';
import { useCallback, useMemo } from 'preact/hooks';

import { Template } from '@src/components/template';
import { addTimeGridPrefix } from '@src/components/timeGrid';
import { CurrentTimeLabel } from '@src/components/timeGrid/currentTimeLabel';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { weekTimeGridLeftSelector } from '@src/selectors/theme';
import { timezonesSelector } from '@src/selectors/timezone';
import TZDate from '@src/time/date';
import { addMinutes, setTimeStrToDate } from '@src/time/datetime';
import { calculateTimezoneOffset } from '@src/time/timezone';
import { isNil, isPresent } from '@src/utils/type';

import type { TimeGridRow } from '@t/grid';

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
  currentTimeIndicatorState: {
    top: number;
    now: TZDate;
  } | null;
}

function HourRows({
  rowsInfo,
  isPrimary,
  borderRight,
  width,
  currentTimeIndicatorState,
}: HourRowsProps) {
  return (
    <div
      role="rowgroup"
      className={cls(classNames.hourRows)}
      style={{ width: toPercent(width), borderRight }}
    >
      {rowsInfo.map(({ date, top, className }) => (
        <div key={date.getTime()} className={className} style={{ top: toPercent(top) }} role="row">
          <Template
            template={`timegridDisplay${isPrimary ? 'Primary' : ''}Time`}
            model={{ time: date }}
            as="span"
          />
        </div>
      ))}
      {isPresent(currentTimeIndicatorState) && (
        <CurrentTimeLabel
          unit="hour"
          top={currentTimeIndicatorState.top}
          time={currentTimeIndicatorState.now}
          diffFromPrimaryTimezone={rowsInfo[0].diffFromPrimaryTimezone}
        />
      )}
    </div>
  );
}

interface Props {
  timeGridRows: TimeGridRow[];
  currentTimeIndicatorState: { top: number; now: TZDate } | null;
}

export const TimeColumn = memo(function TimeColumn({
  timeGridRows,
  currentTimeIndicatorState,
}: Props) {
  const timezones = useStore(timezonesSelector);
  const { width, borderRight, backgroundColor } = useTheme(weekTimeGridLeftSelector);

  const rowsByHour = useMemo(
    () => timeGridRows.filter((_, index) => index % 2 === 0 || index === timeGridRows.length - 1),
    [timeGridRows]
  );
  const hourRowsPropsMapper = useCallback(
    (row: TimeGridRow, index: number, diffFromPrimaryTimezone?: number) => {
      const shouldHideRow = ({ top: rowTop, height: rowHeight }: TimeGridRow) => {
        if (isNil(currentTimeIndicatorState)) {
          return false;
        }

        const indicatorTop = currentTimeIndicatorState.top;

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
    [rowsByHour, currentTimeIndicatorState]
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
      const primaryTimezoneOffset = calculateTimezoneOffset(primaryTimezone.timezoneName);
      const currentTimezoneOffset = calculateTimezoneOffset(timezoneName);
      const diffFromPrimaryTimezone = currentTimezoneOffset - primaryTimezoneOffset;

      return rowsByHour.map((row, index) =>
        hourRowsPropsMapper(row, index, diffFromPrimaryTimezone)
      );
    });
  }, [hourRowsPropsMapper, otherTimezones, primaryTimezone, rowsByHour]);

  return (
    <div
      className={cls(classNames.timeColumn)}
      style={{ width, backgroundColor }}
      data-testid="timegrid-time-column"
    >
      {otherTimezoneHourRowsProps.map((rowsInfo) => (
        <HourRows
          key={rowsInfo[0].diffFromPrimaryTimezone}
          rowsInfo={rowsInfo}
          isPrimary={false}
          borderRight={borderRight}
          width={hourRowsWidth}
          currentTimeIndicatorState={currentTimeIndicatorState}
        />
      ))}
      <HourRows
        rowsInfo={primaryTimezoneHourRowsProps}
        isPrimary={true}
        borderRight={borderRight}
        width={hourRowsWidth}
        currentTimeIndicatorState={currentTimeIndicatorState}
      />
    </div>
  );
});
