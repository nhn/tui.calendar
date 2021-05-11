import { h, FunctionComponent } from 'preact';
import { useActions } from '@src/components/hooks/store';
import { cls } from '@src/util/cssHelper';

import SeeMoreTitle from '@src/components/popup/seeMoreTitle';

interface MoreHeaderProps {
  date: number;
  day: string;
}

const SeeMoreHeader: FunctionComponent<MoreHeaderProps> = (props) => {
  const { date, day } = props;
  const { hide } = useActions('layerPopup');

  return (
    <div className={cls('see-more-header')}>
      <SeeMoreTitle date={date} day={day} />
      <button type="button" className={cls('see-more-close')} onClick={hide}>
        <i className={[cls('icon'), cls('ic-close')].join(' ')} />
      </button>
    </div>
  );
};

export default SeeMoreHeader;
