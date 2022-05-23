import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { Template } from '@src/components/template';
import { addTimeGridPrefix, timeFormats } from '@src/components/timeGrid';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import type TZDate from '@src/time/date';

import type { TimeUnit } from '@t/events';

const classNames = {
  currentTime: addTimeGridPrefix('current-time'),
};

interface Props {
  unit: TimeUnit;
  top: number;
  time: TZDate;
}

export function CurrentTimeLabel({ unit, top, time }: Props) {
  const color = useTheme(useCallback((theme) => theme.week.currentTime.color, []));

  const model = {
    unit,
    time,
    format: timeFormats[unit],
  };

  return (
    <div className={cls(classNames.currentTime)} style={{ top: toPercent(top), color }}>
      <Template template="timegridCurrentTime" param={model} as="span" />
    </div>
  );
}
