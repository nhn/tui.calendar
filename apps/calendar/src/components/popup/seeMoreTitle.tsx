import { h, FunctionComponent } from 'preact';

import { useStore } from '@src/components/hooks/store';
import { pick } from '@src/util/utils';
import { cls } from '@src/util/cssHelper';

interface MoreTitleProps {
  date: number;
  day: string;
}

const SeeMoreTitle: FunctionComponent<MoreTitleProps> = ({ date, day }) => {
  const { state } = useStore('theme');
  const style = pick(
    state.month.moreViewTitle,
    'height',
    'marginBottom',
    'backgroundColor',
    'borderBottom',
    'padding'
  );

  return (
    <div className={cls('more-title')} style={style}>
      <span className={cls('more-title-date')}>{date}</span>{' '}
      <span className={cls('more-title-day')}>{day}</span>
    </div>
  );
};

export default SeeMoreTitle;
