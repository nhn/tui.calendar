import { FunctionComponent, h } from 'preact';

import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { isFunction } from '@src/utils/type';

interface Props {
  confirm?: () => void;
}

export const ConfirmPopupButton: FunctionComponent<Props> = ({ confirm }) => {
  const { hide } = useDispatch('popup');

  const onClickHandler = () => {
    hide();

    if (isFunction(confirm)) {
      confirm();
    }
  };

  return (
    <button type="button" className={cls('popup-button', 'popup-confirm')} onClick={onClickHandler}>
      <span>Save</span>
    </button>
  );
};
