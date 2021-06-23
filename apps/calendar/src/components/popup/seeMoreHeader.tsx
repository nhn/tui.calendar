import { FunctionComponent, h } from 'preact';

import CloseButton from '@src/components/popup/closeButton';
import SeeMoreTitle from '@src/components/popup/seeMoreTitle';
import TZDate from '@src/time/date';
import { cls } from '@src/util/cssHelper';

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
