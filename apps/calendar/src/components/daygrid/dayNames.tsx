import { h, FunctionComponent } from 'preact';

import { cls } from '@src/util/cssHelper';
import { getGridLeftAndWidth } from '@src/time/datetime';
import { toPercent, toPx } from '@src/util/units';
import { isNumber } from '@src/util/utils';
import DayName from '@src/components/daygrid/dayName';

import type { CalendarMonthOption, CalendarWeekOption } from '@t/store';
import { Template, TemplateMonthDayName } from '@src/model';

export interface DayNamesProps {
  dayNames: TemplateMonthDayName[];
  theme?: DayNameTheme;
  options?: CalendarMonthOption | CalendarWeekOption;
  marginLeft?: number;
  templateType: keyof Template;
}

const defaultDayNameOption = {
  narrowWeekend: false,
  startDayOfWeek: 0,
  workweek: false,
  timezones: [],
};
const defaultDayNameTheme = {
  height: '42px',
  borderLeft: '1px solid #ddd',
  paddingLeft: '8px',
  paddingRight: '8px',
  fontSize: '13px',
  backgroundColor: 'inherit',
  fontWeight: 'normal',
  textAlign: 'left',
};
const defaultMarginLeft = 0;

const DayNames: FunctionComponent<DayNamesProps> = ({
  dayNames = [],
  theme = defaultDayNameTheme,
  options = defaultDayNameOption,
  marginLeft = defaultMarginLeft,
  templateType,
}) => {
  const { narrowWeekend = false, startDayOfWeek = 0, workweek = false } = options;

  const {
    height,
    borderLeft,
    paddingLeft,
    paddingRight,
    backgroundColor,
    fontSize,
    fontWeight,
    textAlign,
  } = theme;

  const style = {
    height,
    borderLeft,
    backgroundColor,
    marginLeft,
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
    <div className={cls('daynames')} style={style}>
      {dayNames.map((dayName, index) => (
        <DayName
          templateType={templateType}
          dayname={dayName}
          dayIndex={dayName.day}
          key={`dayNames-${dayName.label}-${dayName.day}`}
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

export default DayNames;
