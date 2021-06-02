import { h, FunctionComponent } from 'preact';

import SeeMoreTitle from '@src/components/popup/seeMoreTitle';
import CloseButton from '@src/components/popup/closeButton';

import { cls } from '@src/util/cssHelper';
import TZDate from '@src/time/date';

interface MoreHeaderProps {
  date: TZDate;
}

const SeeMoreHeader: FunctionComponent<MoreHeaderProps> = ({ date }) => {
  return (
    <div className={cls('see-more-header')}>
      <SeeMoreTitle date={date} />
      <CloseButton />
    </div>
  );
};

export default SeeMoreHeader;
