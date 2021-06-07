import { h, FunctionComponent } from 'preact';

import { Day, isWeekend } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { getDayName } from '@src/util/dayName';
import { CSSValue } from '@t/components/daygrid/cell';

interface DayNameProps {
  dayname: string;
  dayIndex: Day;
  style: Pick<
    DayNameTheme,
    'fontSize' | 'fontWeight' | 'textAlign' | 'paddingLeft' | 'paddingRight'
  > & {
    lineHeight: string;
    width: CSSValue;
    left: CSSValue;
  };
}

const DayName: FunctionComponent<DayNameProps> = (props) => {
  const { dayname, dayIndex, style } = props;

  return (
    <div className={cls('dayname-item')} style={style}>
      <span className={isWeekend(dayIndex) ? cls(`holiday-${getDayName(dayIndex)}`) : ''}>
        {dayname}
      </span>
    </div>
  );
};

export default DayName;