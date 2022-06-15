import { h } from 'preact';

import { useDispatch, useStore } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { popupSelector } from '@src/selectors';
import { isFunction, isPresent } from '@src/utils/type';

export function PopupOverlay() {
  const popups = useStore(popupSelector);
  const { hideAllPopup } = useDispatch('popup');

  const shownPopupParam = Object.values(popups).find((popup) => isPresent(popup));
  const isPopupShown = isPresent(shownPopupParam);

  const onClick = (ev: MouseEvent) => {
    ev.stopPropagation();

    hideAllPopup();
    if (isPopupShown && isFunction(shownPopupParam.close)) {
      shownPopupParam.close();
    }
  };

  return (
    <div
      className={cls('popup-overlay')}
      style={{ display: isPopupShown ? 'block' : 'none' }}
      onClick={onClick}
    />
  );
}
