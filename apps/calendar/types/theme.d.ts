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

type DayNameTheme = {
  height: number | string;
  borderLeft: number;
  paddingRight: number;
  paddingLeft: number;
  backgroundColor: string;
  fontSize: number;
  fontWeight: string | number;
  textAlign: string;
};

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
  schedule: {
    borderRadius: string;
    height: string;
    marginLeft: string;
    marginRight: string;
    marginTop: string;
  };
  weekend: { backgroundColor: string };
};
