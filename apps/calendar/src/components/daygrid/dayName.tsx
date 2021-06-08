import { h, FunctionComponent } from 'preact';

import Template from '@src/components/template';

import { Day, isWeekend } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { getDayName } from '@src/util/dayName';
import { CSSValue } from '@t/components/daygrid/cell';
import { Template as TemplateType, TemplateMonthDayName } from '@src/model';

interface DayNameProps {
  dayname: TemplateMonthDayName;
  dayIndex: Day;
  style: Pick<
    DayNameTheme,
    'fontSize' | 'fontWeight' | 'textAlign' | 'paddingLeft' | 'paddingRight'
  > & {
    lineHeight: string;
    width: CSSValue;
    left: CSSValue;
  };
  templateType: keyof TemplateType;
}

const DayName: FunctionComponent<DayNameProps> = (props) => {
  const { dayname, dayIndex, style, templateType } = props;

  return (
    <div className={cls('dayname-item')} style={style}>
      <span className={isWeekend(dayIndex) ? cls(`holiday-${getDayName(dayIndex)}`) : ''}>
        <Template template={templateType} model={dayname} />
      </span>
    </div>
  );
};

export default DayName;
