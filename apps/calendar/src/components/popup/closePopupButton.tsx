import { h } from 'preact';

import { Template } from '@src/components/template';
import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { isFunction } from '@src/utils/type';

interface Props {
  type: 'moreEvents' | 'form';
  close?: () => void;
}

const classNames = {
  closeButton: cls('popup-button', 'popup-close'),
  closeIcon: cls('icon', 'ic-close'),
};

export function ClosePopupButton({ type, close }: Props) {
  const { hideAllPopup } = useDispatch('popup');

  const onClickHandler = () => {
    hideAllPopup();

    if (isFunction(close)) {
      close();
    }
  };

  const children =
    type === 'moreEvents' ? (
      <Template template="monthMoreClose" model="close" />
    ) : (
      <i className={classNames.closeIcon} />
    );

  return (
    <button type="button" className={classNames.closeButton} onClick={onClickHandler}>
      {children}
    </button>
  );
}
