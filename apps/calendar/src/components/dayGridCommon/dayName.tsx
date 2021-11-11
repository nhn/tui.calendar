import { FunctionComponent, h } from 'preact';

import Template from '@src/components/template';
import { cls } from '@src/helpers/css';
import { getDayName } from '@src/helpers/dayName';
import { Day, isWeekend } from '@src/time/datetime';

import { CalendarViewType } from '@t/components/common';
import { Template as TemplateType, TemplateMonthDayName, TemplateWeekDay } from '@t/template';

interface Props {
  dayname: TemplateWeekDay | TemplateMonthDayName;
  dayIndex: Day;
  style: {
    width: CSSValue;
    left: CSSValue;
  };
  templateType: keyof TemplateType;
  type?: CalendarViewType;
}

const DayName: FunctionComponent<Props> = ({ dayname, dayIndex, style, templateType, type }) => (
  <div className={cls('dayname-item', type)} style={style}>
    <span className={cls({ [`holiday-${getDayName(dayIndex)}`]: isWeekend(dayIndex) })}>
      <Template template={templateType} model={dayname} />
    </span>
  </div>
);

export default DayName;
