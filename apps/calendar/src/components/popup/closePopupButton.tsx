import { h } from 'preact';

import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { isFunction } from '@src/utils/type';

interface Props {
  close?: () => void;
}

const classNames = {
  closeButton: cls('popup-button', 'popup-close'),
  closeIcon: cls('icon', 'ic-close'),
};

export function ClosePopupButton({ close }: Props) {
  const { hide } = useDispatch('popup');

  const onClickHandler = () => {
    hide();

    if (isFunction(close)) {
      close();
    }
  };

  return (
    <button type="button" className={classNames.closeButton} onClick={onClickHandler}>
      <i className={classNames.closeIcon} />
    </button>
  );
}
