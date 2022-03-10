import { h } from 'preact';

import { DayName } from '@src/components/dayGridCommon/dayName';
import { cls, toPercent } from '@src/helpers/css';

import { CalendarViewType } from '@t/components/common';
import { CalendarMonthOptions, CalendarWeekOptions } from '@t/store';
import { Template, TemplateMonthDayName, TemplateWeekDayName } from '@t/template';
import { CellStyle } from '@t/time/datetime';

type TemplateDayNames = (TemplateWeekDayName | TemplateMonthDayName)[];

interface Props {
  dayNames: TemplateDayNames;
  theme?: DayNameTheme;
  options?: CalendarMonthOptions | CalendarWeekOptions;
  marginLeft?: number;
  templateType: keyof Template;
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
