import type { DeepPartial } from 'ts-essentials';

export type CommonTheme = {
  backgroundColor: string;
  border: string;
  gridSelection: {
    backgroundColor: string;
    border: string;
  };
  dayName: { color: string };
  holiday: { color: string };
  saturday: { color: string };
  today: { color: string };
};

export type WeekDayNameTheme = {
  borderLeft: string;
  borderTop: string;
  borderBottom: string;
  backgroundColor: string;
};

export type MonthDayNameTheme = {
  borderLeft: string;
  backgroundColor: string;
};

export type DayGridTheme = {
  borderRight: string;
  backgroundColor: string;
};

export type DayGridLeftTheme = {
  borderRight: string;
  backgroundColor: string;
  width: string;
};

export type TimeGridLeftTheme = {
  borderRight: string;
  backgroundColor: string;
  width: string;
};

export type WeekTheme = {
  dayName: WeekDayNameTheme;
  dayGrid: DayGridTheme;
  dayGridLeft: DayGridLeftTheme;
  timeGrid: { borderRight: string };
  timeGridLeft: TimeGridLeftTheme;
  timeGridLeftAdditionalTimezone: { backgroundColor: string };
  timeGridHalfHourLine: { borderBottom: string };
  timeGridHourLine: { borderBottom: string };
  nowIndicatorLabel: { color: string };
  nowIndicatorPast: { border: string };
  nowIndicatorBullet: { backgroundColor: string };
  nowIndicatorToday: { border: string };
  nowIndicatorFuture: { border: string };
  pastTime: { color: string };
  futureTime: { color: string };
  weekend: { backgroundColor: string };
  today: { color: string; backgroundColor: string };
  pastDay: { color: string };
  panelResizer: { border: string };
  gridSelection: { color: string };
};

export type MonthTheme = {
  dayExceptThisMonth: { color: string };
  dayName: MonthDayNameTheme;
  holidayExceptThisMonth: { color: string };
  moreView: {
    backgroundColor: string;
    border: string;
    boxShadow: string;
    width: number | null;
    height: number | null;
  };
  moreViewTitle: {
    backgroundColor: string;
  };
  gridCell: {
    headerHeight: number | null;
    footerHeight: number | null;
  };
  weekend: { backgroundColor: string };
};

export type ThemeState = {
  common: CommonTheme;
  week: WeekTheme;
  month: MonthTheme;
};

export type ThemeDispatchers = {
  setTheme: (theme: DeepPartial<ThemeState>) => void;
  setCommonTheme: (commonTheme: DeepPartial<CommonTheme>) => void;
  setWeekTheme: (weekTheme: DeepPartial<WeekTheme>) => void;
  setMonthTheme: (monthTheme: DeepPartial<MonthTheme>) => void;
};

export type ThemeStore = ThemeState & {
  dispatch: ThemeDispatchers;
};
