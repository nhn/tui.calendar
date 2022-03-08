import { h } from 'preact';

import { Template } from '@src/components/template';
import { useEventBus } from '@src/contexts/eventBus';
import { useTheme } from '@src/contexts/theme';
import { cls } from '@src/helpers/css';
import { getDayName } from '@src/helpers/dayName';
import { Day, isSunday, isWeekend, toFormat } from '@src/time/datetime';

import { CalendarViewType } from '@t/components/common';
import { Template as TemplateType, TemplateMonthDayName, TemplateWeekDayName } from '@t/template';

interface Props {
  dayname: TemplateWeekDayName | TemplateMonthDayName;
  dayIndex: Day;
  style: {
    width: CSSValue;
    left: CSSValue;
  };
  templateType: keyof TemplateType;
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
  const { common: commonTheme } = useTheme();

  const dayNameStyle = { color: isSunday(dayIndex) ? commonTheme.holiday.color : null };

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
