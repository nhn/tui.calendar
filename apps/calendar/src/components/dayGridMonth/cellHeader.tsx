import { h } from 'preact';
import { useMemo } from 'preact/hooks';

import { MoreEventsButton } from '@src/components/dayGridMonth/moreEventsButton';
import { Template } from '@src/components/template';
import { CellBarType } from '@src/constants/grid';
import { useStore } from '@src/contexts/calendarStore';
import { useCommonTheme, useMonthTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { usePrimaryTimezone } from '@src/hooks/timezone/usePrimaryTimezone';
import { viewSelector } from '@src/selectors';
import type { TemplateName } from '@src/template/default';
import type TZDate from '@src/time/date';
import { isSameDate, isSaturday, isSunday, toFormat } from '@src/time/datetime';
import { capitalize } from '@src/utils/string';

import type { CommonTheme, MonthTheme } from '@t/theme';

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
  const isToday = isSameDate(date, renderDate);

  const {
    common: { holiday, saturday, today, dayname },
    month: { dayExceptThisMonth, holidayExceptThisMonth },
  } = theme;

  if (isSunday(dayIndex)) {
    return isSameMonth ? holiday.color : holidayExceptThisMonth.color;
  }

  if (isSaturday(dayIndex)) {
    return isSameMonth ? saturday.color : dayExceptThisMonth.color;
  }

  if (isToday) {
    return today.color;
  }

  return dayname.color;
}

function useCellHeaderTheme() {
  const common = useCommonTheme();
  const month = useMonthTheme();

  return useMemo(() => ({ common, month }), [common, month]);
}

export function CellHeader({
  type = CellBarType.header,
  exceedCount = 0,
  date,
  onClickExceedCount,
}: Props) {
  const { renderDate } = useStore(viewSelector);

  const [, getNow] = usePrimaryTimezone();
  const theme = useCellHeaderTheme();

  const ymd = toFormat(date, 'YYYYMMDD');
  const todayYmd = toFormat(getNow(), 'YYYYMMDD');
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
  const monthGridTemplate = `monthGrid${capitalize(type)}` as TemplateName;

  return (
    <div className={cls(`grid-cell-${type}`)}>
      <span className={cls('grid-cell-date')} style={gridCellDateStyle}>
        <Template template={monthGridTemplate} param={model} />
      </span>
      {exceedCount ? (
        <MoreEventsButton
          type={type}
          number={exceedCount}
          onClickButton={onClickExceedCount}
          className={cls('grid-cell-more-events')}
        />
      ) : null}
    </div>
  );
}
