import { h } from 'preact';

import type { Dayname } from '@src/components/dayGridCommon/gridHeader';
import { Template } from '@src/components/template';
import { useEventBus } from '@src/contexts/eventBus';
import { cls } from '@src/helpers/css';
import { getDayName } from '@src/helpers/dayName';
import { usePrimaryTimezone } from '@src/hooks/timezone/usePrimaryTimezone';
import type { TemplateName } from '@src/template/default';
import type TZDate from '@src/time/date';
import { isSameDate, isSaturday, isSunday, isWeekend, toFormat } from '@src/time/datetime';

import type { CalendarViewType, StyleProp } from '@t/components/common';
import type { TemplateMonthDayName, TemplateWeekDayName } from '@t/template';

interface Props {
  type: CalendarViewType;
  dayname: TemplateWeekDayName | TemplateMonthDayName;
  style: StyleProp;
  theme: Dayname;
}

function isWeekDayName(
  type: 'week' | 'month',
  dayname: Props['dayname']
): dayname is TemplateWeekDayName {
  return type === 'week';
}

function getWeekDaynameColor({
  dayname,
  theme,
  today,
}: {
  dayname: TemplateWeekDayName;
  theme: Props['theme'];
  today: TZDate;
}) {
  const { day, dateInstance } = dayname;
  const isToday = isSameDate(today, dateInstance);
  const isPastDay = !isToday && dateInstance < today;

  if (isSunday(day)) {
    return theme.common.holiday.color;
  }
  if (isPastDay) {
    return theme.week?.pastDay.color;
  }
  if (isSaturday(day)) {
    return theme.common.saturday.color;
  }
  if (isToday) {
    return theme.week?.today.color;
  }

  return theme.common.dayname.color;
}

function getMonthDaynameColor({
  dayname,
  theme,
}: {
  dayname: TemplateMonthDayName;
  theme: Props['theme'];
}) {
  const { day } = dayname;

  if (isSunday(day)) {
    return theme.common.holiday.color;
  }
  if (isSaturday(day)) {
    return theme.common.saturday.color;
  }

  return theme.common.dayname.color;
}

export function DayName({ dayname, style, type, theme }: Props) {
  const eventBus = useEventBus();
  const [, getNow] = usePrimaryTimezone();
  const today = getNow();
  const { day } = dayname;
  const color =
    type === 'week'
      ? getWeekDaynameColor({ dayname: dayname as TemplateWeekDayName, theme, today })
      : getMonthDaynameColor({ dayname: dayname as TemplateMonthDayName, theme });

  const templateType = `${type}Dayname` as TemplateName;

  const handleClick = () => {
    if (isWeekDayName(type, dayname)) {
      eventBus.fire('clickDayname', { date: toFormat(dayname.dateInstance, 'YYYY-MM-DD') });
    }
  };

  return (
    <div className={cls('dayname-item', type)} style={style}>
      <span
        className={cls({ [`holiday-${getDayName(day)}`]: isWeekend(day) })}
        style={{ color }}
        onClick={handleClick}
      >
        <Template template={templateType} param={dayname} />
      </span>
    </div>
  );
}
