import { FunctionComponent, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import { cls } from '@src/util/cssHelper';
import { getGridLeftAndWidth } from '@src/time/datetime';
import DayName from '@src/components/daygrid/dayName';
import { toPercent, toPx } from '@src/util/units';
import { isNumber } from '@src/util/utils';

import type { DayNameItem } from '@t/components/daygrid/dayNames';

interface Props {
  dayNames: DayNameItem[];
  timezoneWidth?: number;
}

const defaultTimezoneWidth = 60;

export const WeekDayNames: FunctionComponent<Props> = ({
  dayNames = [],
  timezoneWidth = defaultTimezoneWidth,
}) => {
  const { state: options } = useStore('options');
  const {
    narrowWeekend = false,
    startDayOfWeek = 0,
    workweek = false,
    timezones = [],
  } = options.week;
  const marginLeft = toPx(timezones.length * timezoneWidth);

  const { state: theme } = useStore('theme');
  const { height, paddingLeft, paddingRight, fontSize, fontWeight, textAlign } = theme.week.dayname;

  const dayNameStyle = {
    fontSize,
    fontWeight,
    textAlign,
    paddingLeft,
    paddingRight,
    lineHeight: isNumber(height) ? toPx(height) : height,
  };

  const grids = getGridLeftAndWidth(dayNames.length, narrowWeekend, startDayOfWeek, workweek);

  return (
    <div className={cls('week-dayname')}>
      <div className={cls('week-dayname-leftmargin')} style={{ marginLeft }}>
        {dayNames.map(({ name, dayIndex }, index) => (
          <DayName
            dayname={name}
            dayIndex={dayIndex}
            key={`dayNames-${name}-${dayIndex}`}
            style={{
              ...dayNameStyle,
              width: toPercent(grids[index].width),
              left: toPercent(grids[index].left),
            }}
          />
        ))}
      </div>
    </div>
  );
};
