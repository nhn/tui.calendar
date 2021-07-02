import { FunctionComponent, h } from 'preact';

import DayName from '@src/components/daygrid/dayName';
import { Template, TemplateMonthDayName, TemplateWeekDay } from '@src/model';
import { cls } from '@src/util/cssHelper';
import { toPercent, toPx } from '@src/util/units';
import { isNumber } from '@src/util/utils';

import type { CalendarMonthOption, CalendarWeekOption } from '@t/store';

type TemplateDayNames = (TemplateWeekDay | TemplateMonthDayName)[];

interface Props {
  dayNames: TemplateDayNames;
  theme?: DayNameTheme;
  options?: CalendarMonthOption | CalendarWeekOption;
  marginLeft?: number;
  templateType: keyof Template;
  gridInfo: GridInfo[];
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

const DayNames: FunctionComponent<Props> = ({
  dayNames = [],
  theme = defaultDayNameTheme,
  options = defaultDayNameOption,
  marginLeft = defaultMarginLeft,
  templateType,
  gridInfo,
}) => {
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

  return (
    <div className={cls('daynames')} style={style}>
      {(dayNames as TemplateDayNames).map((dayName, index) => (
        <DayName
          templateType={templateType}
          dayname={dayName}
          dayIndex={dayName.day}
          key={`dayNames-${dayName.day}`}
          style={{
            ...dayNameStyle,
            width: toPercent(gridInfo[index].width),
            left: toPercent(gridInfo[index].left),
          }}
        />
      ))}
    </div>
  );
};

export default DayNames;
