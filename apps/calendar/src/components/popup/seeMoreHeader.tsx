import { h, FunctionComponent } from 'preact';

import SeeMoreTitle from '@src/components/popup/seeMoreTitle';
import CloseButton from '@src/components/popup/closeButton';

import { cls } from '@src/util/cssHelper';

interface MoreHeaderProps {
  date: number;
  day: string;
}

const SeeMoreHeader: FunctionComponent<MoreHeaderProps> = (props) => {
  const { date, day } = props;

  return (
    <div className={cls('see-more-header')}>
      <SeeMoreTitle date={date} day={day} />
      <CloseButton />
    </div>
  );
};

export default SeeMoreHeader;
