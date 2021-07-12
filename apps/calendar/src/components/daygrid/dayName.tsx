import { FunctionComponent, h } from 'preact';

import Template from '@src/components/template';
import { Template as TemplateType, TemplateMonthDayName, TemplateWeekDay } from '@src/model';
import { Day, isWeekend } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { getDayName } from '@src/util/dayName';

interface Props {
  dayname: TemplateWeekDay | TemplateMonthDayName;
  dayIndex: Day;
  style: {
    width: CSSValue;
    left: CSSValue;
  };
  templateType: keyof TemplateType;
  type?: 'week' | 'month';
}

const DayName: FunctionComponent<Props> = ({ dayname, dayIndex, style, templateType, type }) => (
  <div className={cls('dayname-item', type)} style={style}>
    <span className={cls({ [`holiday-${getDayName(dayIndex)}`]: isWeekend(dayIndex) })}>
      <Template template={templateType} model={dayname} />
    </span>
  </div>
);

export default DayName;
