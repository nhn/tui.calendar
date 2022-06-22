import { h } from 'preact';
import { useCallback, useMemo } from 'preact/hooks';

import { Template } from '@src/components/template';
import { addTimeGridPrefix, timeFormats } from '@src/components/timeGrid';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { TEST_IDS } from '@src/test/testIds';
import type TZDate from '@src/time/date';
import { getDateDifference } from '@src/time/datetime';

import type { TimeUnit } from '@t/events';

const classNames = {
  now: addTimeGridPrefix('current-time'),
  dayDifference: addTimeGridPrefix('day-difference'),
};

interface Props {
  unit: TimeUnit;
  top: number;
  now: TZDate;
  zonedNow: TZDate;
}

export function NowIndicatorLabel({ unit, top, now, zonedNow }: Props) {
  const color = useTheme(useCallback((theme) => theme.week.nowIndicatorLabel.color, []));

  const dateDifference = useMemo(() => {
    return getDateDifference(zonedNow, now);
  }, [zonedNow, now]);

  const model = {
    unit,
    time: zonedNow,
    format: timeFormats[unit],
  };

  return (
    <div
      className={cls(classNames.now)}
      style={{ top: toPercent(top), color }}
      data-testid={TEST_IDS.NOW_INDICATOR_LABEL}
    >
      {dateDifference !== 0 && (
        <span className={cls(classNames.dayDifference)}>{`[${
          dateDifference > 0 ? '+' : '-'
        }${Math.abs(dateDifference)}]`}</span>
      )}
      <Template template="timegridNowIndicatorLabel" param={model} as="span" />
    </div>
  );
}
