import { Fragment, h } from 'preact';

import { Template } from '@src/components/template';
import { addTimeGridPrefix } from '@src/components/timeGrid';
import { useStore } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import TZDate from '@src/time/date';
import { calculateTimezoneOffset } from '@src/time/timezone';
import { isUndefined } from '@src/utils/type';

import type { CalendarState } from '@t/store';

interface Props {
  label: string | null;
  offset: number | null;
  tooltip: string;
  width: number;
  left: number;
}

function timezoneSelector(state: CalendarState) {
  return state.options.timezone.zones ?? [];
}

function TimezoneLabel({ label, offset, tooltip, width = 100, left }: Props) {
  return (
    <div
      title={tooltip}
      className={cls(addTimeGridPrefix('timezone-label'))}
      style={{
        width: toPercent(width),
        height: toPercent(100),
        left: toPercent(left),
      }}
    >
      <Template
        template="timezoneDisplayLabel"
        model={{ displayLabel: label, timezoneOffset: offset }}
        as="span"
      />
    </div>
  );
}

export function TimezoneLabels() {
  const timezones = useStore(timezoneSelector);
  const timezoneLabelProps = timezones.map(({ displayLabel, timezoneName, tooltip }) => {
    return !isUndefined(displayLabel)
      ? { label: displayLabel, offset: null, tooltip: tooltip ?? timezoneName }
      : {
          label: null,
          offset: calculateTimezoneOffset(new TZDate(), timezoneName),
          tooltip: tooltip ?? timezoneName,
        };
  });

  const [primaryTimezone, ...restTimezones] = timezoneLabelProps;
  const subTimezones = restTimezones.reverse();

  const timezonesCount = timezones.length;
  const timezoneLabelWidth = 100 / timezonesCount;

  if (timezones.length <= 1) {
    return null;
  }

  return (
    <Fragment>
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
    </Fragment>
  );
}