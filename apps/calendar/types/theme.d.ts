import type { DeepPartial } from 'ts-essentials';

type CommonTheme = {
  backgroundColor: string;
  border: string;
  gridSelection: {
    backgroundColor: string;
    border: string;
  };
  dayname: { color: string };
  holiday: { color: string };
  saturday: { color: string };
  today: { color: string };
};

type WeekDayNameTheme = {
  borderLeft: string;
  borderTop: string;
  borderBottom: string;
  backgroundColor: string;
};

type MonthDayNameTheme = {
  borderLeft: string;
  backgroundColor: string;
};

type DayGridTheme = {
  borderRight: string;
  backgroundColor: string;
};

type DayGridLeftTheme = {
  borderRight: string;
  backgroundColor: string;
  width: string;
};

type TimeGridLeftTheme = {
  borderRight: string;
  backgroundColor: string;
  width: string;
};

type WeekTheme = {
  dayname: WeekDayNameTheme;
  dayGrid: DayGridTheme;
  dayGridLeft: DayGridLeftTheme;
  timeGrid: { borderRight: string };
  timeGridLeft: TimeGridLeftTheme;
  timeGridLeftAdditionalTimezone: { backgroundColor: string };
  timeGridHalfHour: { borderBottom: string };
  currentTime: { color: string };
  currentTimeLinePast: { border: string };
  currentTimeLineBullet: { backgroundColor: string };
  currentTimeLineToday: { border: string };
  currentTimeLineFuture: { border: string };
  pastTime: { color: string };
  futureTime: { color: string };
  weekend: { backgroundColor: string };
  today: { color: string; backgroundColor: string };
  pastDay: { color: string };
  panelResizer: { border: string };
  gridSelection: { color: string };
};

type MonthTheme = {
  dayExceptThisMonth: { color: string };
  dayname: MonthDayNameTheme;
  holidayExceptThisMonth: { color: string };
  moreView: {
    backgroundColor: string;
    border: string;
    boxShadow: string;
  };
  moreViewTitle: {
    backgroundColor: string;
  };
  weekend: { backgroundColor: string };
};

type ThemeState = {
  common: CommonTheme;
  week: WeekTheme;
  month: MonthTheme;
};

type ThemeDispatchers = {
  setTheme: (theme: DeepPartial<ThemeState>) => void;
  setCommonTheme: (commonTheme: DeepPartial<CommonTheme>) => void;
  setWeekTheme: (weekTheme: DeepPartial<WeekTheme>) => void;
  setMonthTheme: (monthTheme: DeepPartial<MonthTheme>) => void;
};

type ThemeStore = ThemeState & {
  dispatch: ThemeDispatchers;
};
