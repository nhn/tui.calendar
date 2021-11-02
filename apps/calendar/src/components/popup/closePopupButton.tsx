import { FunctionComponent, h } from 'preact';

import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/util/cssHelper';
import { isFunction } from '@src/util/utils';

interface Props {
  close?: () => void;
}

export const ClosePopupButton: FunctionComponent<Props> = ({ close }) => {
  const { hide } = useDispatch('popup');

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
