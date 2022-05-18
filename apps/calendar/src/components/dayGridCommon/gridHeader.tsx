import { h } from 'preact';

import { DayName } from '@src/components/dayGridCommon/dayName';
import { cls, toPercent } from '@src/helpers/css';
import type { TemplateName } from '@src/template/default';

import type { CalendarViewType } from '@t/components/common';
import type { CalendarMonthOptions, CalendarWeekOptions } from '@t/store';
import type { TemplateMonthDayName, TemplateWeekDayName } from '@t/template';
import type { MonthDayNameTheme } from '@t/theme';
import type { CellStyle } from '@t/time/datetime';

type TemplateDayNames = (TemplateWeekDayName | TemplateMonthDayName)[];

interface Props {
  dayNames: TemplateDayNames;
  theme?: MonthDayNameTheme;
  options?: CalendarMonthOptions | CalendarWeekOptions;
  marginLeft?: number;
  templateType: Extract<TemplateName, 'weekDayname' | 'monthDayname'>;
  rowStyleInfo: CellStyle[];
  type?: CalendarViewType;
}

const defaultDayNameTheme = {
  borderLeft: '1px solid #ddd',
  backgroundColor: 'inherit',
};
const defaultMarginLeft = 0;

export function GridHeader({
  dayNames = [],
  theme = defaultDayNameTheme,
  marginLeft = defaultMarginLeft,
  templateType,
  rowStyleInfo,
  type = 'month',
}: Props) {
  const { backgroundColor } = theme;

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
          templateType={templateType}
          dayname={dayName}
          dayIndex={dayName.day}
          key={`dayNames-${dayName.day}`}
          style={{
            width: toPercent(rowStyleInfo[index].width),
            left: toPercent(rowStyleInfo[index].left),
          }}
          type={type}
        />
      ))}
    </div>
  );
}
