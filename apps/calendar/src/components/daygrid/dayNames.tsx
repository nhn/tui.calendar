import { h, FunctionComponent } from 'preact';

import { cls } from '@src/util/cssHelper';
import { getGridLeftAndWidth } from '@src/time/datetime';
import { toPercent, toPx } from '@src/util/units';
import { isNumber } from '@src/util/utils';
import { useStore } from '@src/components/hooks/store';
import DayName from '@src/components/daygrid/dayName';

import { CalendarMonthOption } from '@t/store';
import { DayNameItem } from '@t/components/daygrid/dayNames';

export interface DayNamesProps {
  dayNames: DayNameItem[];
  theme?: DayNameTheme;
  options?: CalendarMonthOption;
}

const defaultDayNameOption = {
  narrowWeekend: false,
  startDayOfWeek: 0,
  workweek: false,
};

const MonthDayNames: FunctionComponent<DayNamesProps> = (props) => {
  const { dayNames = [], options = defaultDayNameOption } = props;
  const { narrowWeekend, startDayOfWeek, workweek } = options;

  const { state } = useStore('theme');
  const dayNameTheme = state.month.dayname;

  const {
    height,
    borderLeft,
    paddingLeft,
    paddingRight,
    backgroundColor,
    fontSize,
    fontWeight,
    textAlign,
  } = dayNameTheme;

  const style = {
    height,
    borderLeft,
    backgroundColor,
  };

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
    <div className={cls('month-dayname')} style={style}>
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
  );
};

export default MonthDayNames;
