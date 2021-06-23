import { FunctionComponent, h } from 'preact';

import { cls } from '@src/util/cssHelper';
import { isFunction } from '@src/util/utils';

import { useActions } from '../hooks/store';

interface Props {
  close?: () => void;
}

const CloseButton: FunctionComponent<Props> = ({ close }) => {
  const { hide } = useActions('layerPopup');

  const onClickHandler = () => {
    hide();

    if (isFunction(close)) {
      close();
    }
  };

  return (
    <button type="button" className={cls('popup-close')} onClick={onClickHandler}>
      <i className={[cls('icon'), cls('ic-close')].join(' ')} />
    </button>
  );
};

export default CloseButton;
