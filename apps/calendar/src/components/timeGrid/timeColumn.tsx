import { h } from 'preact';
import { memo } from 'preact/compat';
import { useCallback, useMemo } from 'preact/hooks';

import { Template } from '@src/components/template';
import { addTimeGridPrefix } from '@src/components/timeGrid';
import { CurrentTimeLabel } from '@src/components/timeGrid/currentTimeLabel';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import TZDate from '@src/time/date';
import { setTimeStrToDate } from '@src/time/datetime';
import { isNil, isPresent } from '@src/utils/type';

import type { TimeGridRow } from '@t/grid';

const classNames = {
  times: addTimeGridPrefix('times'),
  time: addTimeGridPrefix('time'),
  timeLabel: addTimeGridPrefix('time-label'),
  first: addTimeGridPrefix('time-first'),
  last: addTimeGridPrefix('time-last'),
  hidden: addTimeGridPrefix('time-hidden'),
};

interface Props {
  timeGridRows: TimeGridRow[];
  columnWidth: number;
  currentTimeIndicatorState: { top: number; now: TZDate } | null;
}

// TODO: replace MultipleTimezones component
export const TimeColumn = memo(function TimeColumn({
  timeGridRows,
  columnWidth,
  currentTimeIndicatorState,
}: Props) {
  const shouldHideRow = (row: TimeGridRow) => {
    if (isNil(currentTimeIndicatorState)) {
      return false;
    }

    const indicatorTop = currentTimeIndicatorState.top;
    const rowTop = row.top;
    const rowHeight = row.height;

    return rowTop - rowHeight <= indicatorTop && indicatorTop <= rowTop + rowHeight;
  };

  const { borderRight, backgroundColor } = useTheme(
    useCallback((theme) => theme.week.timeGridLeft, [])
  );

  const rowsByHour = useMemo(
    () => timeGridRows.filter((_, index) => index % 2 === 0 || index === timeGridRows.length - 1),
    [timeGridRows]
  );

  return (
    <div
      className={cls(classNames.times)}
      style={{ width: columnWidth, borderRight, backgroundColor }}
      data-testid="timegrid-time-column"
    >
      {/* timezone 갯수에 따라 렌더링 필요 */}
      {rowsByHour.map((row, index) => {
        const isFirst = index === 0;
        const isLast = index === rowsByHour.length - 1;
        const className = cls(classNames.time, {
          [classNames.first]: isFirst,
          [classNames.last]: isLast,
          [classNames.hidden]: shouldHideRow(row),
        });
        const top = toPercent(row.top);
        const date = setTimeStrToDate(new TZDate(), isLast ? row.endTime : row.startTime);

        return (
          <div key={`slot-${row.startTime}`} className={className} style={{ top }}>
            <Template template="timegridDisplayPrimaryTime" model={{ time: date }} as="span" />
          </div>
        );
      })}
      {isPresent(currentTimeIndicatorState) && (
        <CurrentTimeLabel
          unit="hour"
          top={currentTimeIndicatorState.top}
          time={currentTimeIndicatorState.now}
        />
      )}
    </div>
  );
});
