import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import { Template } from '@src/components/template';
import { useEventBus } from '@src/contexts/eventBus';
import { useTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { getDayName } from '@src/helpers/dayName';
import type { TemplateName } from '@src/template/default';
import type { Day } from '@src/time/datetime';
import { isSunday, isWeekend, toFormat } from '@src/time/datetime';

import type { CalendarViewType } from '@t/components/common';
import type { TemplateMonthDayName, TemplateWeekDayName } from '@t/template';

interface Props {
  dayname: TemplateWeekDayName | TemplateMonthDayName;
  dayIndex: Day;
  style: {
    width: CSSValue;
    left: CSSValue;
  };
  templateType: Extract<TemplateName, 'weekDayname' | 'monthDayname'>;
  type: CalendarViewType;
}

function isWeekDayName(
  type: 'week' | 'month',
  dayname: Props['dayname']
): dayname is TemplateWeekDayName {
  return type === 'week';
}

export function DayName({ dayname, dayIndex, style, templateType, type }: Props) {
  const eventBus = useEventBus();
  const color = useTheme(useCallback((theme) => theme.common.holiday.color, []));

  const dayNameStyle = { color: isSunday(dayIndex) ? color : null };

  const handleClick = () => {
    if (isWeekDayName(type, dayname)) {
      eventBus.fire('clickDayname', { date: toFormat(dayname.dateInstance, 'YYYY-MM-DD') });
    }
  };

  return (
    <div className={cls('dayname-item', type)} style={style}>
      <span
        className={cls({ [`holiday-${getDayName(dayIndex)}`]: isWeekend(dayIndex) })}
        style={dayNameStyle}
        onClick={handleClick}
      >
        <Template template={templateType} model={dayname} />
      </span>
    </div>
  );
}
