import { FunctionComponent, h } from 'preact';

import CloseButton from '@src/components/popup/closeButton';
import SeeMoreTitle from '@src/components/popup/seeMoreTitle';
import TZDate from '@src/time/date';
import { cls } from '@src/util/cssHelper';

interface Props {
  date: TZDate;
}

const SeeMoreHeader: FunctionComponent<Props> = ({ date }) => {
  return (
    <div className={cls('see-more-header')}>
      <SeeMoreTitle date={date} />
      <CloseButton />
    </div>
  );
};

export default SeeMoreHeader;
