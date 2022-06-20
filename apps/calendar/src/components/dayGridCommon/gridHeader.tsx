import { h } from 'preact';

import { DayName } from '@src/components/dayGridCommon/dayName';
import { DEFAULT_DAY_NAME_MARGIN_LEFT } from '@src/constants/style';
import { useTheme } from '@src/contexts/themeStore';
import { cls, toPercent } from '@src/helpers/css';

import type { CalendarViewType } from '@t/components/common';
import type { CalendarMonthOptions, CalendarWeekOptions } from '@t/store';
import type { TemplateMonthDayName, TemplateWeekDayName } from '@t/template';
import type { CommonTheme, MonthTheme, ThemeState, WeekTheme } from '@t/theme';
import type { CellStyle } from '@t/time/datetime';

type TemplateDayNames = (TemplateWeekDayName | TemplateMonthDayName)[];

export type DayNameThemes = {
  common: {
    saturday: CommonTheme['saturday'];
    holiday: CommonTheme['holiday'];
    today: CommonTheme['today'];
    dayName: CommonTheme['dayName'];
  };
  week?: {
    pastDay: WeekTheme['pastDay'];
    today: WeekTheme['today'];
    dayName: WeekTheme['dayName'];
  };
  month?: {
    dayName: MonthTheme['dayName'];
  };
};

interface Props {
  type: CalendarViewType;
  dayNames: TemplateDayNames;
  options?: CalendarMonthOptions | CalendarWeekOptions;
  marginLeft?: string;
  rowStyleInfo: CellStyle[];
}

function weekDayNameSelector(theme: ThemeState): DayNameThemes {
  return {
    common: {
      saturday: theme.common.saturday,
      holiday: theme.common.holiday,
      today: theme.common.today,
      dayName: theme.common.dayName,
    },
    week: {
      pastDay: theme.week.pastDay,
      today: theme.week.today,
      dayName: theme.week.dayName,
    },
  };
}

function monthDayNameSelector(theme: ThemeState): DayNameThemes {
  return {
    common: {
      saturday: theme.common.saturday,
      holiday: theme.common.holiday,
      today: theme.common.today,
      dayName: theme.common.dayName,
    },
    month: {
      dayName: theme.month.dayName,
    },
  };
}

export function GridHeader({
  dayNames,
  marginLeft = DEFAULT_DAY_NAME_MARGIN_LEFT,
  rowStyleInfo,
  type = 'month',
}: Props) {
  const theme = useTheme(type === 'month' ? monthDayNameSelector : weekDayNameSelector);
  const { backgroundColor = 'white', borderLeft = null, ...rest } = theme[type]?.dayName ?? {};
  const { borderTop = null, borderBottom = null } = rest as WeekTheme['dayName'];

  return (
    <div
      data-testid={`grid-header-${type}`}
      className={cls('day-names', type)}
      style={{
        backgroundColor,
        borderTop,
        borderBottom,
      }}
    >
      <div className={cls('day-name-container')} style={{ marginLeft }}>
        {(dayNames as TemplateDayNames).map((dayName, index) => (
          <DayName
            type={type}
            key={`dayNames-${dayName.day}`}
            dayName={dayName}
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
