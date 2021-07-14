import { FunctionComponent, h } from 'preact';

import { useActions } from '@src/components/hooks/store';
import { cls } from '@src/util/cssHelper';
import { isFunction } from '@src/util/utils';

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
      <i className={cls('icon', 'ic-close')} />
    </button>
  );
};

export default CloseButton;
