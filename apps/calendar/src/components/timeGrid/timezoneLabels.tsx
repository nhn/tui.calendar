import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { Template } from '@src/components/template';
import { addTimeGridPrefix } from '@src/components/timeGrid';
import { TimezoneCollapseButton } from '@src/components/timeGrid/timezoneCollapseButton';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';
import { useTZConverter } from '@src/hooks/timezone/useTZConverter';
import {
  showTimezoneCollapseButtonOptionSelector,
  timezonesCollapsedOptionSelector,
} from '@src/selectors/options';
import { weekTimeGridLeftSelector } from '@src/selectors/theme';
import { timezonesSelector } from '@src/selectors/timezone';
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
        param={{ displayLabel: label, timezoneOffset: offset }}
        as="span"
      />
    </div>
  );
}

function useTimezoneCollapseOptions() {
  const showTimezoneCollapseButton = useStore(showTimezoneCollapseButtonOptionSelector);
  const timezonesCollapsed = useStore(timezonesCollapsedOptionSelector);

  return useMemo(() => {
    return {
      showTimezoneCollapseButton,
      timezonesCollapsed,
    };
  }, [showTimezoneCollapseButton, timezonesCollapsed]);
}

export function TimezoneLabels({ top }: { top: number | null }) {
  const timezones = useStore(timezonesSelector);
  const { width } = useTheme(weekTimeGridLeftSelector);

  const tzConverter = useTZConverter();
  const { showTimezoneCollapseButton, timezonesCollapsed } = useTimezoneCollapseOptions();

  if (timezones.length <= 1) {
    return null;
  }

  const timezoneLabelProps = timezones.map(({ displayLabel, timezoneName, tooltip }) => {
    return !isUndefined(displayLabel)
      ? { label: displayLabel, offset: null, tooltip: tooltip ?? timezoneName }
      : {
          label: null,
          offset: tzConverter(timezoneName).getTimezoneOffset(),
          tooltip: tooltip ?? timezoneName,
        };
  });

  const [primaryTimezone, ...restTimezones] = timezoneLabelProps;
  const subTimezones = restTimezones.reverse();

  const timezonesCount = timezonesCollapsed ? 1 : timezones.length;
  const timezoneLabelWidth = 100 / timezonesCount;

  return (
    <div
      style={{
        top,
        width,
      }}
      role="columnheader"
      className={cls('timezone-labels-slot')}
    >
      {!timezonesCollapsed &&
        subTimezones.map((subTimezone, index) => (
          <TimezoneLabel
            key={`subTimezone-${subTimezone.label ?? subTimezone.offset}`}
            width={timezoneLabelWidth}
            left={timezoneLabelWidth * index}
            {...subTimezone}
          />
        ))}
      {showTimezoneCollapseButton && <TimezoneCollapseButton isCollapsed={timezonesCollapsed} />}
      <TimezoneLabel
        width={timezoneLabelWidth}
        left={timezoneLabelWidth * subTimezones.length}
        {...primaryTimezone}
      />
    </div>
  );
}
