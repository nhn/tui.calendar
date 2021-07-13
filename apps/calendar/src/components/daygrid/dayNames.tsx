import { FunctionComponent, h } from 'preact';

import DayName from '@src/components/daygrid/dayName';
import { Template, TemplateMonthDayName, TemplateWeekDay } from '@src/model';
import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';

import { ComponentType } from '@t/components/common';
import type { CalendarMonthOption, CalendarWeekOption } from '@t/store';

type TemplateDayNames = (TemplateWeekDay | TemplateMonthDayName)[];

interface Props {
  dayNames: TemplateDayNames;
  theme?: DayNameTheme;
  options?: CalendarMonthOption | CalendarWeekOption;
  marginLeft?: number;
  templateType: keyof Template;
  gridInfo: GridInfo[];
  type?: ComponentType;
}

const defaultDayNameOption = {
  narrowWeekend: false,
  startDayOfWeek: 0,
  workweek: false,
  timezones: [],
};
const defaultDayNameTheme = {
  borderLeft: '1px solid #ddd',
  backgroundColor: 'inherit',
};
const defaultMarginLeft = 0;

const DayNames: FunctionComponent<Props> = ({
  dayNames = [],
  theme = defaultDayNameTheme,
  options = defaultDayNameOption,
  marginLeft = defaultMarginLeft,
  templateType,
  gridInfo,
  type = 'month',
}) => {
  const { borderLeft, backgroundColor } = theme;

  return (
    <div
      className={cls('daynames', type)}
      style={{
        borderLeft,
        backgroundColor,
        marginLeft,
      }}
    >
      {(dayNames as TemplateDayNames).map((dayName, index) => (
        <DayName
          templateType={templateType}
          dayname={dayName}
          dayIndex={dayName.day}
          key={`dayNames-${dayName.day}`}
          style={{
            width: toPercent(gridInfo[index].width),
            left: toPercent(gridInfo[index].left),
          }}
          type={type}
        />
      ))}
    </div>
  );
};

export default DayNames;
