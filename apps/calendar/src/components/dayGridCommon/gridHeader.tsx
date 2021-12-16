import { FunctionComponent, h } from 'preact';

import DayName from '@src/components/dayGridCommon/dayName';
import { cls, toPercent } from '@src/helpers/css';

import { CalendarViewType } from '@t/components/common';
import { CalendarMonthOptions, CalendarWeekOptions } from '@t/store';
import { Template, TemplateMonthDayName, TemplateWeekDay } from '@t/template';

type TemplateDayNames = (TemplateWeekDay | TemplateMonthDayName)[];

interface Props {
  dayNames: TemplateDayNames;
  theme?: DayNameTheme;
  options?: CalendarMonthOptions | CalendarWeekOptions;
  marginLeft?: number;
  templateType: keyof Template;
  gridInfo: GridInfo[];
  type?: CalendarViewType;
}

const defaultDayNameOptions = {
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

const GridHeader: FunctionComponent<Props> = ({
  dayNames = [],
  theme = defaultDayNameTheme,
  options = defaultDayNameOptions,
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

export default GridHeader;
