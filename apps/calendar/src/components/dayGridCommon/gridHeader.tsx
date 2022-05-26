import { h } from 'preact';

import { DayName } from '@src/components/dayGridCommon/dayName';
import { DEFAULT_DAYNAME_MARGIN_LEFT } from '@src/constants/style';
import { cls, toPercent } from '@src/helpers/css';

import type { CalendarViewType } from '@t/components/common';
import type { CalendarMonthOptions, CalendarWeekOptions } from '@t/store';
import type { TemplateMonthDayName, TemplateWeekDayName } from '@t/template';
import type { CommonTheme, MonthTheme, WeekTheme } from '@t/theme';
import type { CellStyle } from '@t/time/datetime';

type TemplateDayNames = (TemplateWeekDayName | TemplateMonthDayName)[];

export type DaynameTheme = {
  common: {
    saturday: CommonTheme['saturday'];
    holiday: CommonTheme['holiday'];
    today: CommonTheme['today'];
    dayname: CommonTheme['dayname'];
  };
  week?: {
    pastDay: WeekTheme['pastDay'];
    today: WeekTheme['today'];
    dayname: WeekTheme['dayname'];
  };
  month?: {
    dayname: MonthTheme['dayname'];
  };
};

interface Props {
  type: CalendarViewType;
  dayNames: TemplateDayNames;
  theme: DaynameTheme;
  options?: CalendarMonthOptions | CalendarWeekOptions;
  marginLeft?: string;
  rowStyleInfo: CellStyle[];
}

export function GridHeader({
  dayNames,
  theme,
  marginLeft = DEFAULT_DAYNAME_MARGIN_LEFT,
  rowStyleInfo,
  type = 'month',
}: Props) {
  const { backgroundColor = 'white' } = theme[type]?.dayname ?? {};

  return (
    <div
      className={cls('daynames', type)}
      style={{
        backgroundColor,
        marginLeft,
      }}
    >
      {(dayNames as TemplateDayNames).map((dayName, index) => (
        <DayName
          type={type}
          key={`dayNames-${dayName.day}`}
          dayname={dayName}
          style={{
            width: toPercent(rowStyleInfo[index].width),
            left: toPercent(rowStyleInfo[index].left),
          }}
          theme={theme}
        />
      ))}
    </div>
  );
}
