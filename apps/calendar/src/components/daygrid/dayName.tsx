import { FunctionComponent, h } from 'preact';

import Template from '@src/components/template';
import { Template as TemplateType, TemplateMonthDayName, TemplateWeekDay } from '@src/model';
import { Day, isWeekend } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { getDayName } from '@src/util/dayName';

import { CSSValue } from '@t/components/daygrid/cell';

interface Props {
  dayname: TemplateWeekDay | TemplateMonthDayName;
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

const DayName: FunctionComponent<Props> = (props) => {
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
