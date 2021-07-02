import { FunctionComponent, h } from 'preact';

import { useTheme } from '@src/components/hooks/theme';
import Template from '@src/components/template';
import TZDate from '@src/time/date';
import { toFormat } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { pick } from '@src/util/utils';

interface Props {
  date: TZDate;
}

const SeeMoreTitle: FunctionComponent<Props> = ({ date }) => {
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
