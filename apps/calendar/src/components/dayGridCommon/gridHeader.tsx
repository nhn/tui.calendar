import { h } from 'preact';

import { DayName } from '@src/components/dayGridCommon/dayName';
import { DEFAULT_DAYNAME_MARGIN_LEFT } from '@src/constants/style';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';

import type { CalendarViewType } from '@t/components/common';
import type { CalendarMonthOptions, CalendarWeekOptions } from '@t/store';
import type { TemplateMonthDayName, TemplateWeekDayName } from '@t/template';
import type { CommonTheme, MonthTheme, ThemeState, WeekTheme } from '@t/theme';
import type { CellStyle } from '@t/time/datetime';

type TemplateDayNames = (TemplateWeekDayName | TemplateMonthDayName)[];

export type Dayname = {
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
  options?: CalendarMonthOptions | CalendarWeekOptions;
  marginLeft?: string;
  rowStyleInfo: CellStyle[];
}

function weekDaynameSelector(theme: ThemeState): Dayname {
  return {
    common: {
      saturday: theme.common.saturday,
      holiday: theme.common.holiday,
      today: theme.common.today,
      dayname: theme.common.dayname,
    },
    week: {
      pastDay: theme.week.pastDay,
      today: theme.week.today,
      dayname: theme.week.dayname,
    },
  };
}

function monthDaynameSelector(theme: ThemeState): Dayname {
  return {
    common: {
      saturday: theme.common.saturday,
      holiday: theme.common.holiday,
      today: theme.common.today,
      dayname: theme.common.dayname,
    },
    month: {
      dayname: theme.month.dayname,
    },
  };
}

export function GridHeader({
  dayNames,
  marginLeft = DEFAULT_DAYNAME_MARGIN_LEFT,
  rowStyleInfo,
  type = 'month',
}: Props) {
  const theme = useTheme(type === 'month' ? monthDaynameSelector : weekDaynameSelector);
  const { backgroundColor = 'white', borderLeft = null, ...rest } = theme[type]?.dayname ?? {};
  const { borderTop = null, borderBottom = null } = rest as WeekTheme['dayname'];

  return (
    <div
      data-testid={`grid-header-${type}`}
      className={cls('daynames', type)}
      style={{
        backgroundColor,
        borderTop,
        borderBottom,
      }}
    >
      <div className={cls('dayname-container')} style={{ marginLeft }}>
        {(dayNames as TemplateDayNames).map((dayName, index) => (
          <DayName
            type={type}
            key={`dayNames-${dayName.day}`}
            dayname={dayName}
            style={{
              width: toPercent(rowStyleInfo[index].width),
              left: toPercent(rowStyleInfo[index].left),
              borderLeft,
            }}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}
