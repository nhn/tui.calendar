import { h, FunctionComponent } from 'preact';

import { useActions } from '../hooks/store';
import { cls } from '@src/util/cssHelper';

const CloseButton: FunctionComponent = () => {
  const { hide } = useActions('layerPopup');

  return (
    <button type="button" className={cls('popup-close')} onClick={hide}>
      <i className={[cls('icon'), cls('ic-close')].join(' ')} />
    </button>
  );
};

export default CloseButton;
