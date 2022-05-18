import { h } from 'preact';
import { useCallback, useMemo } from 'preact/hooks';

import { Template } from '@src/components/template';
import { addTimeGridPrefix, timeFormats } from '@src/components/timeGrid';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { currentTimeLabelTestId } from '@src/test/testIds';
import type TZDate from '@src/time/date';
import { addMinutes, getDateDifference } from '@src/time/datetime';
import { isNil } from '@src/utils/type';

import type { TimeUnit } from '@t/events';

const classNames = {
  currentTime: addTimeGridPrefix('current-time'),
  dayDifference: addTimeGridPrefix('day-difference'),
};

interface Props {
  unit: TimeUnit;
  top: number;
  time: TZDate;
  diffFromPrimaryTimezone?: number;
}

export function CurrentTimeLabel({ unit, top, time, diffFromPrimaryTimezone = 0 }: Props) {
  const color = useTheme(useCallback((theme) => theme.week.currentTime.color, []));

  const zonedTime = addMinutes(time, diffFromPrimaryTimezone);
  const dateDifference = useMemo(() => {
    if (isNil(diffFromPrimaryTimezone)) {
      return 0;
    }

    return getDateDifference(zonedTime, time);
  }, [diffFromPrimaryTimezone, time, zonedTime]);

  const model = {
    unit,
    time: zonedTime,
    format: timeFormats[unit],
  };

  return (
    <div
      className={cls(classNames.currentTime)}
      style={{ top: toPercent(top), color }}
      data-testid={currentTimeLabelTestId}
    >
      {dateDifference !== 0 && (
        <span className={cls(classNames.dayDifference)}>{`[${
          dateDifference > 0 ? '+' : '-'
        }${Math.abs(dateDifference)}]`}</span>
      )}
      <Template template="timegridCurrentTime" model={model} as="span" />
    </div>
  );
}
