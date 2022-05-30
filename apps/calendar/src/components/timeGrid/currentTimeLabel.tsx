import { h } from 'preact';
import { useCallback, useMemo } from 'preact/hooks';

import { Template } from '@src/components/template';
import { addTimeGridPrefix, timeFormats } from '@src/components/timeGrid';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { currentTimeLabelTestId } from '@src/test/testIds';
import type TZDate from '@src/time/date';
import { getDateDifference } from '@src/time/datetime';

import type { TimeUnit } from '@t/events';

const classNames = {
  currentTime: addTimeGridPrefix('current-time'),
  dayDifference: addTimeGridPrefix('day-difference'),
};

interface Props {
  unit: TimeUnit;
  top: number;
  currentTime: TZDate;
  zonedCurrentTime: TZDate;
}

export function CurrentTimeLabel({ unit, top, currentTime, zonedCurrentTime }: Props) {
  const color = useTheme(useCallback((theme) => theme.week.currentTime.color, []));

  const dateDifference = useMemo(() => {
    return getDateDifference(zonedCurrentTime, currentTime);
  }, [zonedCurrentTime, currentTime]);

  const model = {
    unit,
    time: zonedCurrentTime,
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
      <Template template="timegridCurrentTime" param={model} as="span" />
    </div>
  );
}
