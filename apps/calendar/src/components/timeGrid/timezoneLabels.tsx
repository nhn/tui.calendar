import { h } from 'preact';

import { Template } from '@src/components/template';
import { addTimeGridPrefix } from '@src/components/timeGrid';
import { useStore } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import { timezonesSelector } from '@src/selectors/timezone';
import { calculateTimezoneOffset } from '@src/time/timezone';
import { isUndefined } from '@src/utils/type';

interface TimezoneLabelProps {
  label: string | null;
  offset: number | null;
  tooltip: string;
  width: number;
  left: number;
}

function TimezoneLabel({ label, offset, tooltip, width = 100, left }: TimezoneLabelProps) {
  return (
    <div
      title={tooltip}
      className={cls(addTimeGridPrefix('timezone-label'))}
      style={{
        width: toPercent(width),
        height: toPercent(100),
        left: toPercent(left),
      }}
      role="gridcell"
    >
      <Template
        template="timezoneDisplayLabel"
        model={{ displayLabel: label, timezoneOffset: offset }}
        as="span"
      />
    </div>
  );
}

export function TimezoneLabels({ top }: { top: number | null }) {
  const timezones = useStore(timezonesSelector);

  if (timezones.length <= 1) {
    return null;
  }

  const timezoneLabelProps = timezones.map(({ displayLabel, timezoneName, tooltip }) => {
    return !isUndefined(displayLabel)
      ? { label: displayLabel, offset: null, tooltip: tooltip ?? timezoneName }
      : {
          label: null,
          offset: calculateTimezoneOffset(timezoneName),
          tooltip: tooltip ?? timezoneName,
        };
  });

  const [primaryTimezone, ...restTimezones] = timezoneLabelProps;
  const subTimezones = restTimezones.reverse();

  const timezonesCount = timezones.length;
  const timezoneLabelWidth = 100 / timezonesCount;

  return (
    <div
      style={{
        top,
        width: 120, // TODO: use theme value
      }}
      role="columnheader"
      className={cls('timezone-labels-slot')}
    >
      {subTimezones.map((subTimezone, index) => (
        <TimezoneLabel
          key={`subTimezone-${subTimezone.label ?? subTimezone.offset}`}
          width={timezoneLabelWidth}
          left={timezoneLabelWidth * index}
          {...subTimezone}
        />
      ))}
      <TimezoneLabel
        width={timezoneLabelWidth}
        left={timezoneLabelWidth * subTimezones.length}
        {...primaryTimezone}
      />
    </div>
  );
}
