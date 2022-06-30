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
import { isSaturday, isSunday, toFormat } from '@src/time/datetime';
import { capitalize } from '@src/utils/string';
import { isNil } from '@src/utils/type';

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
  isToday,
}: {
  date: TZDate;
  theme: { common: CommonTheme; month: MonthTheme };
  renderDate: TZDate;
  isToday: boolean;
}) {
  const dayIndex = date.getDay();
  const thisMonth = renderDate.getMonth();
  const isSameMonth = thisMonth === date.getMonth();

  const {
    common: { holiday, saturday, today, dayName },
    month: { dayExceptThisMonth, holidayExceptThisMonth },
  } = theme;

  if (isToday) {
    return today.color;
  }

  if (isSunday(dayIndex)) {
    return isSameMonth ? holiday.color : holidayExceptThisMonth.color;
  }

  if (isSaturday(dayIndex)) {
    return isSameMonth ? saturday.color : dayExceptThisMonth.color;
  }

  if (!isSameMonth) {
    return dayExceptThisMonth.color;
  }

  return dayName.color;
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
  const height = theme.month.gridCell[`${type}Height`];

  const ymd = toFormat(date, 'YYYYMMDD');
  const todayYmd = toFormat(getNow(), 'YYYYMMDD');
  const isToday = ymd === todayYmd;
  const templateParam = {
    date: toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    hiddenEventCount: exceedCount,
    isOtherMonth: date.getMonth() !== renderDate.getMonth(),
    isToday: ymd === todayYmd,
    month: date.getMonth(),
    ymd,
  };
  const gridCellDateStyle = { color: getDateColor({ date, theme, isToday, renderDate }) };
  const monthGridTemplate = `monthGrid${capitalize(type)}` as TemplateName;

  if (isNil(height)) {
    return null;
  }

  return (
    <div className={cls(`grid-cell-${type}`)} style={{ height }}>
      <span className={cls('grid-cell-date')} style={gridCellDateStyle}>
        <Template template={monthGridTemplate} param={templateParam} />
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
