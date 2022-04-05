import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { MoreEventsButton } from '@src/components/dayGridMonth/moreEventsButton';
import { Template } from '@src/components/template';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { viewSelector } from '@src/selectors';
import { commonThemeSelector, monthThemeSelector } from '@src/selectors/theme';
import TZDate from '@src/time/date';
import { Day, toFormat } from '@src/time/datetime';

enum CellBarType {
  header = 'header',
  footer = 'footer',
}

interface Props {
  type?: CellBarType;
  exceedCount?: number;
  date: TZDate;
  onClickExceedCount: () => void;
}

function getDateColor({
  date,
  theme,
  renderDate,
}: {
  date: TZDate;
  theme: { common: CommonTheme; month: MonthTheme };
  renderDate: TZDate;
}) {
  const dayIndex = date.getDay();
  const thisMonth = renderDate.getMonth();
  const isSameMonth = thisMonth === date.getMonth();

  const {
    common: { holiday, saturday, today },
    month: { dayExceptThisMonth, holidayExceptThisMonth },
  } = theme;

  if (dayIndex === Day.SUN) {
    return isSameMonth ? holiday.color : holidayExceptThisMonth.color;
  }

  if (isSameMonth) {
    return dayIndex === Day.SAT ? saturday.color : today.color;
  }

  return dayExceptThisMonth.color;
}

function useCellHeaderTheme() {
  const common = useTheme(commonThemeSelector);
  const month = useTheme(monthThemeSelector);

  return useMemo(() => ({ common, month }), [common, month]);
}

export function CellHeader({
  type = CellBarType.header,
  exceedCount = 0,
  date,
  onClickExceedCount,
}: Props) {
  const { renderDate } = useStore(viewSelector);
  const theme = useCellHeaderTheme();

  const ymd = toFormat(date, 'YYYYMMDD');
  const todayYmd = toFormat(new TZDate(), 'YYYYMMDD');
  const model = {
    date: toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    hiddenEventCount: exceedCount,
    isOtherMonth: date.getMonth() !== renderDate.getMonth(),
    isToday: ymd === todayYmd,
    month: date.getMonth(),
    ymd,
  };
  const gridCellDateStyle = { color: getDateColor({ date, theme, renderDate }) };

  return (
    <div className={cls(`grid-cell-${type}`)}>
      <span className={cls('grid-cell-date')} style={gridCellDateStyle}>
        <Template template="monthGridHeader" model={model} />
      </span>
      {exceedCount ? (
        <MoreEventsButton
          number={exceedCount}
          onClickButton={onClickExceedCount}
          className={cls('grid-cell-more-events')}
        />
      ) : null}
    </div>
  );
}
