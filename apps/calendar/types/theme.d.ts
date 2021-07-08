type CommonTheme = {
  backgroundColor: string;
  border: string;
  creationGuide: {
    backgroundColor: string;
    border: string;
  };
  dayname: { color: string };
  holiday: { color: string };
  saturday: { color: string };
  today: { color: string };
};

type ScheduleTheme = {
  borderRadius: string;
  height: string;
  marginLeft: string;
  marginRight: string;
  marginTop: string;
};

type DayNameTheme = {
  borderLeft: string;
  backgroundColor: string;
};

type WeekTheme = {
  dayname: DayNameTheme;
  dayGridSchedule: ScheduleTheme;
};

// @TODO: remove border, margin, padding after removing from theme
type MonthTheme = {
  day: { fontSize: string };
  dayExceptThisMonth: { color: string };
  dayname: DayNameTheme;
  holidayExceptThisMonth: { color: string };
  moreView: {
    backgroundColor: string;
    border: string;
    boxShadow: string;
    paddingBottom: string;
  };
  moreViewList: { padding: string };
  moreViewTitle: {
    backgroundColor: string;
    borderBottom: string;
    height: string;
    marginBottom: string;
    padding: string;
  };
  schedule: ScheduleTheme;
  weekend: { backgroundColor: string };
  daygrid: {
    cell: { paddingTop: string; paddingBottom: string };
    cellBar: { height: string };
  };
};
