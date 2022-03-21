import { h } from 'preact';

import { Template } from '@src/components/template';
import { addTimeGridPrefix, timeFormats } from '@src/components/timeGrid';
import { useTheme } from '@src/contexts/theme';
import { cls, toPercent } from '@src/helpers/css';
import TZDate from '@src/time/date';

import { TimeUnit } from '@t/events';

const classNames = {
  currentTime: addTimeGridPrefix('current-time'),
};

interface Props {
  unit: TimeUnit;
  top: number;
  time: TZDate;
}

export function CurrentTimeLabel({ unit, top, time }: Props) {
  const {
    week: { currentTime },
  } = useTheme();

  const model = {
    unit,
    time,
    format: timeFormats[unit],
  };

  return (
    <div
      className={cls(classNames.currentTime)}
      style={{ top: toPercent(top), color: currentTime.color }}
    >
      <Template template="timegridCurrentTime" model={model} as="span" />
    </div>
  );
}
