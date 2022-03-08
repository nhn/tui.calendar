import { h } from 'preact';

import { MoreEventsButton } from '@src/components/dayGridMonth/moreEventsButton';
import { Template } from '@src/components/template';
import { useTheme } from '@src/contexts/theme';
import { cls } from '@src/helpers/css';
import Theme from '@src/theme';
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

function getDateColor(date: TZDate, theme: Theme) {
  const dayIndex = date.getDay();
  const thisMonth = new TZDate().getMonth();
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

export function CellHeader({
  type = CellBarType.header,
  exceedCount = 0,
  date,
  onClickExceedCount,
}: Props) {
  const theme = useTheme();

  const ymd = toFormat(date, 'YYYYMMDD');
  const todayYmd = toFormat(new TZDate(), 'YYYYMMDD');
  const model = {
    date: toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    hiddenEventCount: exceedCount,
    isOtherMonth: true, // @TODO: 현재 렌더링된 월간뷰와 셀 날짜의 월을 비교
    isToday: ymd === todayYmd,
    month: date.getMonth(),
    ymd,
  };
  const gridCellDateStyle = { color: getDateColor(date, theme) };

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
