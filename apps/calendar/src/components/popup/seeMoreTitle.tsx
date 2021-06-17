import { h, FunctionComponent } from 'preact';

import Template from '@src/components/template';

import { pick } from '@src/util/utils';
import { cls } from '@src/util/cssHelper';
import TZDate from '@src/time/date';
import { toFormat } from '@src/time/datetime';
import { useTheme } from '@src/components/provider/theme';

interface MoreTitleProps {
  date: TZDate;
}

const SeeMoreTitle: FunctionComponent<MoreTitleProps> = ({ date }) => {
  const { month } = useTheme();
  const style = pick(
    month.moreViewTitle,
    'height',
    'marginBottom',
    'backgroundColor',
    'borderBottom',
    'padding'
  );

  const moreTitle = {
    ymd: toFormat(date, 'YYYY-MM-DD'),
    day: date.getDay(),
    date: date.getDate(),
  };

  return (
    <div className={cls('more-title')} style={style}>
      <Template template="monthMoreTitleDate" model={moreTitle} />
    </div>
  );
};

export default SeeMoreTitle;
